import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

function AddProduct() {
  const [formData, setFormData] = useState({
    categoria: "",
    nombre: "",
    descripcion: "",
    diseñador: "",
    precio: "",
    imagenes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imagenesArray = formData.imagenes.split(",").map((url) => url.trim());

    try {
      await addDoc(collection(db, "productos"), {
        categoria: formData.categoria,
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        diseñador: formData.diseñador,
        precio: parseFloat(formData.precio),
        imagenes: imagenesArray,
      });
      alert("Producto agregado exitosamente!");
      setFormData({
        categoria: "",
        nombre: "",
        descripcion: "",
        diseñador: "",
        precio: "",
        imagenes: "",
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Agregar Producto</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="categoria" value={formData.categoria} onChange={handleChange} placeholder="Categoría" className="border p-2 w-full" />
        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" className="border p-2 w-full" />
        <input type="text" name="descripcion" value={formData.descripcion} onChange={handleChange} placeholder="Descripción" className="border p-2 w-full" />
        <input type="text" name="diseñador" value={formData.diseñador} onChange={handleChange} placeholder="Diseñador" className="border p-2 w-full" />
        <input type="number" name="precio" value={formData.precio} onChange={handleChange} placeholder="Precio" className="border p-2 w-full" />
        <textarea name="imagenes" value={formData.imagenes} onChange={handleChange} placeholder="Imagenes (separadas por coma)" className="border p-2 w-full" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Guardar</button>
      </form>
    </div>
  );
}

export default AddProduct;
