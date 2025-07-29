import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase";
import AddDesigner from "./addDesigner";
import DesignerProductSelector from "../components/designerProductSelector";
import { Link } from "react-router-dom";

function AddProductWithImages() {
  const [formData, setFormData] = useState({
    categoria: "",
    nombre: "",
    descripcion: "",
    diseñador: "",
    precio: "",
    composicion: "",
    descripcionExtendida: "",
    materiales: "",
    guiaDeCuidados: "",
    tallas: []
  });
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  // Manejo de inputs de texto
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Manejo de archivos múltiples
  const handleFilesChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica
    if (!files.length) {
      alert("Selecciona al menos una imagen o video.");
      return;
    }

    setIsUploading(true);

    try {
      // Subir todos los archivos al storage
      const uploadPromises = files.map(async (file) => {
        const storageRef = ref(storage, `productos/${Date.now()}_${file.name}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        return url;
      });

      const imagenes = await Promise.all(uploadPromises);

      // Guardar en Firestore
      await addDoc(collection(db, "productos"), {
        ...formData,
        precio: parseFloat(formData.precio),
        imagenes,
        creadoEn: new Date(),
      });

      alert("Producto subido exitosamente!");
      // Reset
      setFormData({
        categoria: "",
        nombre: "",
        descripcion: "",
        diseñador: "",
        precio: "",
        composicion: "",
        descripcionExtendida: "",
        materiales: "",
        guiaDeCuidados: "",
        tallas: []

      });
      setFiles([]);
      e.target.reset();
    } catch (error) {
      console.error("Error al subir el producto:", error);
      alert("Ocurrió un error al subir el producto.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">

      < DesignerProductSelector />
      <hr className="my-8 border-t" />

      {/** 
      *<h1 className="text-2xl font-bold mb-4">Agregar Producto</h1>
     
      *  <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="categoria" value={formData.categoria} onChange={handleChange} placeholder="Categoría" className="border p-2 w-full" />
        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" className="border p-2 w-full" />
        <input type="text" name="descripcion" value={formData.descripcion} onChange={handleChange} placeholder="Descripción" className="border p-2 w-full" />
        <input type="text" name="diseñador" value={formData.diseñador} onChange={handleChange} placeholder="Diseñador" className="border p-2 w-full" />
        <input type="number" name="precio" value={formData.precio} onChange={handleChange} placeholder="Precio" className="border p-2 w-full" />
        <input type="file" multiple accept="image/*,video/*" onChange={handleFilesChange} className="border p-2 w-full" />
        <input type="text" name="composicion" value={formData.composicion} onChange={handleChange} placeholder="Composicion del producto" className="border p-2 w-full" />
        <input type="text" name="materiales" value={formData.materiales} onChange={handleChange} placeholder="Materiales" className="border p-2 w-full" />
        <input type="text" name="guiaDeCuidados" value={formData.guiaDeCuidados} onChange={handleChange} placeholder="Guia de Cuidados" className="border p-2 w-full" />
        <input type="text" name="descripcionExtendida" value={formData.descripcionExtendida} onChange={handleChange} placeholder="Descripcion Extendida" className="border p-2 w-full" />


        
        <div className="mb-4">
          <label className="block font-medium mb-1">Tallas disponible:</label>
          {["XXS", "S", "M", "L", "XL", "XXL"].map((size) => (
            <label key={size} className="mr-4">
              <input type="checkbox"
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
              />
              <span className="ml-1">{size}</span>
            </label>
          ))}
        </div>
        <button type="submit" disabled={isUploading} className="bg-blue-600 text-white px-4 py-2 rounded">
          {isUploading ? "Subiendo..." : "Guardar Producto"}
        </button>
      </form>
      * 
      */}

         {/**return home container */}
        <div className="mb-6">
            <Link
                to="/innova-shop"
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:gb-blue-700">
                ← Volver a Diseñadores
            </Link>

        </div>
    </div>

      

  );
}

export default AddProductWithImages;


