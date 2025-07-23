import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { User, Package } from "lucide-react";
import DesignerProductManager from "../components/ProductoIngresoDesigner";
import AddDesigner from "../pages/addDesigner";

function DesignerProductSelector() {
  const [designers, setDesigners] = useState([]);
  const [selectedDesigner, setSelectedDesigner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddDesigner, setShowAddDesigner] = useState(false);

  useEffect(() => {
    fetchDesigners();
  }, []);

  const fetchDesigners = async () => {
    try {
      setLoading(true);
      const snapshot = await getDocs(collection(db, "designers"));
      const designersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setDesigners(designersData);
    } catch (error) {
      console.error("Error fetching designers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDesignerAdded = () => {
    fetchDesigners();
    setShowAddDesigner(false);
  };

  if (selectedDesigner) {
    return (
      <div>
        {/* Back button */}
        <div className="container mx-auto p-4">
          <button
            onClick={() => setSelectedDesigner(null)}
            className="mb-4 flex items-center text-[#0081a7] hover:text-[#00afb9] transition-colors"
          >
            ← Volver a selección de diseñadores
          </button>
        </div>
        
        <DesignerProductManager 
          designerId={selectedDesigner.id}
          designerName={selectedDesigner.name}
        />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0081a7] mx-auto mb-4"></div>
          <p>Cargando diseñadores...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[#023047] mb-2">
          Gestión de Productos por Diseñador
        </h1>
        <p className="text-gray-600">
          Selecciona un diseñador para gestionar sus productos
        </p>
      </div>

      {/* Add Designer Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Gestionar Diseñadores</h2>
          <button
            onClick={() => setShowAddDesigner(!showAddDesigner)}
            className="px-4 py-2 bg-[#0081a7] text-white rounded hover:bg-[#00afb9] transition-colors"
          >
            {showAddDesigner ? 'Ocultar Formulario' : 'Agregar Diseñador'}
          </button>
        </div>
        
        {showAddDesigner && (
          <div className="border-t pt-4">
            <AddDesigner onDesignerAdded={handleDesignerAdded} />
          </div>
        )}
      </div>

      {/* Designers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {designers.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <User className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              No hay diseñadores registrados
            </h3>
            <p className="text-gray-500 mb-4">
              Agrega el primer diseñador para comenzar a gestionar productos
            </p>
            <button
              onClick={() => setShowAddDesigner(true)}
              className="px-6 py-3 bg-[#0081a7] text-white rounded hover:bg-[#00afb9] transition-colors"
            >
              Agregar Primer Diseñador
            </button>
          </div>
        ) : (
          designers.map((designer) => (
            <div
              key={designer.id}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6 cursor-pointer border border-gray-100"
              onClick={() => setSelectedDesigner(designer)}
            >
              <div className="text-center">
                {/* Designer Image */}
                <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden bg-gray-100">
                  <img
                    src={designer.imageUrls?.[0] || '/placeholder-designer.jpg'}
                    alt={designer.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/placeholder-designer.jpg';
                    }}
                  />
                </div>

                {/* Designer Info */}
                <h3 className="font-bold text-lg text-[#023047] mb-1">
                  {designer.name}
                </h3>
                {designer.brand && (
                  <p className="text-[#0081a7] font-semibold mb-2">
                    {designer.brand}
                  </p>
                )}
                {designer.description && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {designer.description}
                  </p>
                )}

                {/* Action Button */}
                <div className="flex items-center justify-center text-[#0081a7] hover:text-[#00afb9] transition-colors">
                  <Package className="w-4 h-4 mr-2" />
                  <span className="font-semibold">Gestionar Productos</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {designers.length > 0 && (
        <div className="text-center mt-8">
          <p className="text-gray-500">
            Haz clic en cualquier diseñador para gestionar sus productos
          </p>
        </div>
      )}
    </div>
  );
}

export default DesignerProductSelector;