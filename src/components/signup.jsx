import { useState } from "react";

//firebase
import { db } from "../firebase"
import { addDoc, collection, serverTimestamp, Timestamp } from "firebase/firestore";



export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    participante: "voluntario",
    subscribe: false,
    message: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "registros"), {
        ...formData,
        timeStamp: serverTimestamp(),
      });

      // Aquí puedes conectar con Firebase, Mailchimp, etc.
      console.log("Formulario enviado:", formData);

      alert("Gracias por registrarte. Nos pondremos en contacto contigo.");
      setFormData({
        name:"", 
        email: "", 
        phone:"", 
        participante:"voluntario", 
        subscribe:false,
        message:"",
      });

    }catch (error) {
      console.error("Error al guardar en Firebase:", error);
      alert("Hubo un error al enviar tu formulario. Intentalo mas tarde.")
    }
  };

  return (
    <section className="w-full min-h-screen bg-black flex items-center justify-center py-4">
      <div className="w-full max-w-4xl bg-white p-10 sm:p-14 rounded shadow-md flex flex-col justify-center h-full">
        <h1 className="text-2xl font-bold text-center mb-4 text-blue-900">
          ¿Te gustaría apoyar el proyecto?
        </h1>
        <p className="text-center mb-6 text-gray-700">
          Llena el siguiente formulario para tener más información.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Teléfono
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border rounded-md"
              maxLength={10}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ¿Cómo te gustaría participar?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm text-gray-800">
              {[
                { label: "Voluntario", value: "voluntario" },
                { label: "Estudiante", value: "estudiante" },
                { label: "Donante", value: "donante" },
                { label: "Patrocinador", value: "patrocinador" },
                { label: "Servicio Social", value: "servicio" },
                { label: "Practicante", value: "practicante" },
              ].map(({ label, value }) => (
                <label key={value} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="participante"
                    value={value}
                    checked={formData.participante === value}
                    onChange={handleChange}
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>


          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="subscribe"
              id="subscribe"
              checked={formData.subscribe}
              onChange={handleChange}
            />
            <label htmlFor="subscribe" className="text-sm text-gray-700">
              Suscribirme al boletín informativo
            </label>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Mensaje (opcional)</label>
            <textarea name="message" id="message" value={formData.message} onChange={handleChange} rows={4} className="mt-1 block w-full px-4 py-2 border rounded-md" placeholder="¿Hay algo más que te gustaría compartir?"></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Enviar
          </button>
        </form>
      </div>
    </section>
  );
}
