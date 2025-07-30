import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, where, serverTimestamp } from "firebase/firestore";
import { ref,uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "../firebase";
import { Plus, Edit2, Trash2, Save, X, Image as ImageIcon, Upload } from "lucide-react";

//Pagina de Gestion de Productos, una vez seleccionado al diseñador, va a esta pagina, de aqui 
//el admin puede ver los productos registrados del diseñador, CRUD, 


function DesignerProductManager({ designerId, designerName }) {
  const [formData, setFormData] = useState({
    categoria: "",
    nombre: "",
    descripcion: "",
    precio: "",
    composicion: "",
    descripcionExtendida: "",
    materiales: "",
    guiaDeCuidados: "",
    tallas: [],
    published: false //controlled in ui
  });
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const categories = [
    "vestidos", "jeans", "hoodies", "camisas", "calzado",
    "bolsas", "dama-profesional", "trajes"
  ];

  // Fetch designer's products
  useEffect(() => {
    fetchProducts();
  }, [designerId]);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const q = query(
        collection(db, "productos"),
        where("designerId", "==", designerId)
      );
      const snapshot = await getDocs(q);
      const productsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilesChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const resetForm = () => {
    setFormData({
      categoria: "",
      nombre: "",
      descripcion: "",
      precio: "",
      composicion: "",
      descripcionExtendida: "",
      materiales: "",
      guiaDeCuidados: "",
      tallas: [],
      published: false //ranking
    });
    setFiles([]);
    setEditingProduct(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nombre || !formData.categoria || !formData.precio) {
      alert("Por favor completa los campos obligatorios: nombre, categoría y precio.");
      return;
    }

    if (!editingProduct && !files.length) {
      alert("Selecciona al menos una imagen para el producto nuevo.");
      return;
    }

    setIsUploading(true);

    try {
      let imagenes = editingProduct?.imagenes || [];

      // Upload new images if any
      if (files.length > 0) {
        const uploadPromises = files.map(async (file) => {
          const storageRef = ref(storage, `productos/${designerId}/${Date.now()}_${file.name}`);
          await uploadBytes(storageRef, file);
          const url = await getDownloadURL(storageRef);
          return url;
        });
        const newImages = await Promise.all(uploadPromises);
        imagenes = [...imagenes, ...newImages];
      }

      // const productData = {
      //   ...formData,
      //   precio: parseFloat(formData.precio),
      //   imagenes,
      //   designerId,
      //   designerName,
      //   updatedAt: new Date(),
      // };

      //normalize price 
      const parsedPrice = Number(formData.precio);
      const precio = isNaN(parsedPrice) ? 0 : parsedPrice;


      if (editingProduct) {
// Update existing product
        const productData = {
          categoria: formData.categoria, 
          nombre: formData.nombre, 
          descripcion: formData.descripcion, 
          precio, 
          composicion: formData.composicion, 
          descripcionExtendida: formData.descripcionExtendida, 
          materiales: formData.materiales, 
          guiaDeCuidados: formData.guiaDeCuidados,
          tallas: formData.tallas, 
          imagenes, 
          designerId, 
          designerName, 
          published: !!formData.published, 
          updatedAt: serverTimestamp(),
        }
        
        await updateDoc(doc(db, "productos", editingProduct.id), productData);
        alert("Producto actualizado exitosamente!");
      } else {
        // Create new product Initialize counters --for ranking
        const productData = {
          categoria: formData.categoria, 
          nombre: formData.nombre, 
          descripcion: formData.descripcion,
          precio, 
          composicion: formData.composicion,
          descripcionExtendida: formData.descripcionExtendida, 
          materiales: formData.materiales,
          guiaDeCuidados: formData.guiaDeCuidados,
          tallas: formData.tallas, 
          imagenes, 
          designerId,
          designerName, 
          published: !!formData.published,
          totalSold: 0,  //initialize counter ranking
          soldBySize: {}, //optional per-size map
          createdAt: serverTimestamp(), 
          updatedAt: serverTimestamp(),

        };


        await addDoc(collection(db, "productos"),productData);
        alert("Producto agregado exitosamente!");
      }

      resetForm();
      fetchProducts();
    } catch (error) {
      console.error("Error al guardar el producto:", error);
      alert("Ocurrió un error al guardar el producto.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleEdit = (product) => {
    setFormData({
      categoria: product.categoria || "",
      nombre: product.nombre || "",
      descripcion: product.descripcion || "",
      precio: product.precio?.toString() || "",
      composicion: product.composicion || "",
      descripcionExtendida: product.descripcionExtendida || "",
      materiales: product.materiales || "",
      guiaDeCuidados: product.guiaDeCuidados || "",
      tallas: product.tallas || [],
      published: !!product.published,
    });
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (product) => {
    if (!window.confirm(`¿Estás seguro que deseas eliminar "${product.nombre}"?`)) {
      return;
    }

    try {
      // Delete images from storage
      if (product.imagenes && product.imagenes.length > 0) {
        const deletePromises = product.imagenes.map(async (imageUrl) => {
          try {
            const imageRef = ref(storage, imageUrl);
           
            await deleteObject(imageRef);
          } catch (error) {
            console.warn("Could not delete image:", error);
          }
        });
        await Promise.all(deletePromises);
      }

      // Delete document
      await deleteDoc(doc(db, "productos", product.id));
      alert("Producto eliminado exitosamente!");
      fetchProducts();
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      alert("Ocurrió un error al eliminar el producto.");
    }
  };

  const removeImage = (imageUrl) => {
    if (editingProduct) {
      const updatedImages = editingProduct.imagenes.filter(img => img !== imageUrl);
      setEditingProduct({ ...editingProduct, imagenes: updatedImages });
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0081a7] mx-auto mb-4"></div>
          <p>Cargando productos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#023047]">Gestión de Productos</h1>
          <p className="text-gray-600">Diseñador: {designerName}</p>
          <p className="text-sm text-gray-500">{products.length} productos registrados</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center px-4 py-2 bg-[#0081a7] text-white rounded hover:bg-[#00afb9] transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Producto
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
            </h2>
            <button
              onClick={resetForm}
              className="p-2 hover:bg-gray-100 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Basic Info */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Categoría *</label>
                <select
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#0081a7]"
                  required
                >
                  <option value="">Selecciona una categoría</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Nombre *</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#0081a7]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Precio *</label>
                <input
                  type="number"
                  name="precio"
                  value={formData.precio}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#0081a7]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Descripción</label>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  rows="3"
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#0081a7]"
                />
              </div>
            </div>

            {/* Additional Details */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Composición</label>
                <input
                  type="text"
                  name="composicion"
                  value={formData.composicion}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#0081a7]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Materiales</label>
                <input
                  type="text"
                  name="materiales"
                  value={formData.materiales}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#0081a7]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Guía de Cuidados</label>
                <input
                  type="text"
                  name="guiaDeCuidados"
                  value={formData.guiaDeCuidados}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#0081a7]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Descripción Extendida</label>
                <textarea
                  name="descripcionExtendida"
                  value={formData.descripcionExtendida}
                  onChange={handleChange}
                  rows="3"
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#0081a7]"
                />
              </div>
            </div>

            {/* Sizes */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Tallas disponibles:</label>
              <div className="flex flex-wrap gap-4">
                {["XXS", "XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                  <label key={size} className="flex items-center">
                    <input
                      type="checkbox"
                      value={size}
                      checked={formData.tallas.includes(size)}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFormData((prev) => ({
                          ...prev,
                          tallas: prev.tallas.includes(value)
                            ? prev.tallas.filter((s) => s !== value)
                            : [...prev.tallas, value]
                        }));
                      }}
                      className="mr-2"
                    />
                    <span className="text-sm">{size}</span>
                  </label>
                ))}
              </div>
            </div>


                {/** Visibility of item */}
            <div className="md:col-span-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => 
                    setFormData((prev) => ({...prev, published:e.target.checked}))
                  }
                />
                <span className="text-sm">Publicar este producto</span>
              </label>
              <p className="text-xs">
                {formData.published? "Publicado": "Borrador"}
              </p>
            </div>

            {/* Images */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Imágenes</label>

              {/* Existing images (when editing) */}
              {editingProduct && editingProduct.imagenes && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Imágenes actuales:</p>
                  <div className="grid grid-cols-4 gap-2">
                    {editingProduct.imagenes.map((imageUrl, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={imageUrl}
                          alt={`Producto ${index + 1}`}
                          className="w-full h-20 object-cover rounded border"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(imageUrl)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="border-2 border-dashed border-gray-300 rounded p-4">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFilesChange}
                  className="w-full"
                />
                <p className="text-sm text-gray-500 mt-1">
                  {editingProduct ? 'Agregar más imágenes (opcional)' : 'Selecciona al menos una imagen *'}
                </p>
              </div>

              {files.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600">
                    {files.length} archivo(s) seleccionado(s)
                  </p>
                </div>
              )}
            </div>

            {/* Submit buttons */}
            <div className="md:col-span-2 flex gap-4 pt-4">
              <button
                type="submit"
                disabled={isUploading}
                className="flex items-center px-6 py-2 bg-[#0081a7] text-white rounded hover:bg-[#00afb9] transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4 mr-2" />
                {isUploading ? 'Guardando...' : (editingProduct ? 'Actualizar' : 'Guardar')}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Products List */}
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">Productos Registrados</h3>
        </div>

        {products.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No hay productos registrados</p>
            <p className="text-sm">Agrega tu primer producto usando el botón superior</p>
          </div>
        ) : (
          <div className="divide-y">
            {products.map((product) => (
              <div key={product.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {product.imagenes?.[0] && (
                      <img
                        src={product.imagenes[0]}
                        alt={product.nombre}
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                    <div>
                      <h4 className="font-semibold">{product.nombre}</h4>
                      <p className="text-sm text-gray-600">{product.categoria}</p>
                      <p className="text-[#0081a7] font-semibold">
                        ${product.precio?.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(product)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DesignerProductManager;