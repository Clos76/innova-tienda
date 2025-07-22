import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase"; // Ajusta si es necesario

function AddDesigner() {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    description: "",
    slug: "",
    instagram: "",
    website: ""
  });

  const [images, setImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 4); // Limit to 4 images
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length === 0) return alert("Selecciona al menos una imagen (máx 4).");

    try {
      setIsUploading(true);

      const uploadPromises = images.map(async (img) => {
        // Changed from 'diseñadores' to 'disenadores' to match Firebase rules
        const imgRef = ref(storage, `designers/${Date.now()}_${img.name}`);
        await uploadBytes(imgRef, img);
        return await getDownloadURL(imgRef);
      });

      const imageUrls = await Promise.all(uploadPromises);

      // Also update Firestore collection name to match (optional but recommended for consistency)
      await addDoc(collection(db, "designers"), {
        ...formData,
        imageUrls,
        createdAt: serverTimestamp(),
      });

      alert("Diseñador agregado exitosamente.");
      setFormData({ name: "", brand: "", description: "", slug: "", instagram: "", website: "" });
      setImages([]);
      e.target.reset();
    } catch (error) {
      console.error("Error al subir diseñador:", error);
      alert("Error al guardar el diseñador.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Agregar Diseñador</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Nombre" className="border p-2 w-full" />
        <input name="brand" value={formData.brand} onChange={handleChange} placeholder="Marca" className="border p-2 w-full" />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Descripción" className="border p-2 w-full" />
        <input name="slug" value={formData.slug} onChange={handleChange} placeholder="Slug (ej: carlos-hernandez)" className="border p-2 w-full" />
        <input name="instagram" value={formData.instagram} onChange={handleChange} placeholder="Instagram (opcional)" className="border p-2 w-full" />
        <input name="website" value={formData.website} onChange={handleChange} placeholder="Sitio web (opcional)" className="border p-2 w-full" />

        <input type="file" accept="image/*" onChange={handleImageChange} multiple className="border p-2 w-full" />
        <p className="text-sm text-gray-500">Puedes subir hasta 4 imágenes.</p>

        <button type="submit" disabled={isUploading} className="bg-blue-600 text-white px-4 py-2 rounded">
          {isUploading ? "Subiendo..." : "Guardar Diseñador"}
        </button>
      </form>
    </div>
  );
}

export default AddDesigner;