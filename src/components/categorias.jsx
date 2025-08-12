import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import BestSeller from "../components/BestSeller";
import dresses from "../assets/dresses.jpg";
import jeans from "../assets/pants.jpg";
import hoodies from "../assets/hoodies.jpg";
import shirts from "../assets/shirts.jpg";
import shoes from "../assets/shoes.jpg";
import purse from "../assets/bags.jpg";
import gsuits from "../assets/girl-suits.jpg";
import msuits from "../assets/mens-suits.jpg";
import DesignerProfileSection from "../components/designerProfile2Col"

export default function Categorias() {
    const { designerId } = useParams();
  const [designer, setDesigner] = useState(null);
  const [loadingDesigner, setLoadingDesigner] = useState(false);

  useEffect(() => {
    const fetchDesigner = async () => {
      if (!designerId) return;

      try {
        setLoadingDesigner(true);
        const designerDoc = await getDoc(doc(db, "designers", designerId));

        if (designerDoc.exists()) {
          setDesigner({ id: designerDoc.id, ...designerDoc.data() });
        } else {
          console.warn("Designer not found:", designerId);
        }
      } catch (error) {
        console.error("Error fetching designer:", error);
      } finally {
        setLoadingDesigner(false);
      }
    };

    fetchDesigner();
  }, [designerId]);
 
  return (
    <div className="container mx-auto p-4">
      {/**return home container */}
      <div className="mb-6">
        <Link
          to="/innova-shop"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          ← Volver a Diseñadores
        </Link>
      </div>

      {/* Designer Profile Section - Two Column Layout */}
      <DesignerProfileSection/>

      {/* Categories Header */}
      <div className="text-center pt-3 mb-8">
        <h2 className="text-3xl font-bold text-[#023047]">
          {designer ? `Colecciones de ${designer.name}` : 'Nuestros Productos'}
        </h2>
        <p className="text-gray-600 mt-2">Explora nuestras categorías de productos</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Vestidos */}
        <div className="bg-white text-center p-4 rounded-lg shadow-lg hover:shadow-xl hover:bg-[#f9f7f3] transition-all duration-300 transform hover:scale-105">
          <div className="overflow-hidden rounded-lg mb-4">
            <img src={dresses} alt="dresses" className="w-full h-48 object-cover hover:scale-110 transition-transform duration-300" />
          </div>
          <h3 className="text-lg font-semibold mb-3 text-black">Vestidos</h3>
          <div className="flex gap-4 justify-center">
            <Link to={`/designer/${designerId}/categories/vestidos`}>
              <button className="px-4 py-2 text-[#0081a7] border-2 border-[#0081a7] hover:border-transparent hover:bg-[#00afb9] hover:text-white rounded-full font-medium transition-all duration-200">
                Ver inventario
              </button>
            </Link>
          </div>
        </div>

        {/* Jeans */}
        <div className="bg-white text-center p-4 rounded-lg shadow-lg hover:shadow-xl hover:bg-[#f9f7f3] transition-all duration-300 transform hover:scale-105">
          <div className="overflow-hidden rounded-lg mb-4">
            <img src={jeans} alt="jeans" className="w-full h-48 object-cover hover:scale-110 transition-transform duration-300" />
          </div>
          <h3 className="text-lg font-semibold mb-3 text-black">Jeans</h3>
          <div className="flex gap-4 justify-center">
            <Link to={`/designer/${designerId}/categories/jeans`}>
              <button className="px-4 py-2 text-[#0081a7] border-2 border-[#0081a7] hover:border-transparent hover:bg-[#00afb9] hover:text-white rounded-full font-medium transition-all duration-200">
                Ver inventario
              </button>
            </Link>
          </div>
        </div>

        {/* Hoodies */}
        <div className="bg-white text-center p-4 rounded-lg shadow-lg hover:shadow-xl hover:bg-[#faedcd] transition-all duration-300 transform hover:scale-105">
          <div className="overflow-hidden rounded-lg mb-4">
            <img src={hoodies} alt="hoodies" className="w-full h-48 object-cover hover:scale-110 transition-transform duration-300" />
          </div>
          <h3 className="text-lg font-semibold mb-3 text-black">Hoodies</h3>
          <div className="flex gap-4 justify-center">
           <Link to={`/designer/${designerId}/categories/hoodies`} >
            <button className="px-4 py-2 text-[#0081a7] border-2 border-[#0081a7] hover:border-transparent hover:bg-[#00afb9] hover:text-white rounded-full font-medium transition-all duration-200">
              Ver inventario
            </button>
           </Link>
          </div>
        </div>

        {/* Shirts */}
        <div className="bg-white text-center p-4 rounded-lg shadow-lg hover:shadow-xl hover:bg-[#faedcd] transition-all duration-300 transform hover:scale-105">
          <div className="overflow-hidden rounded-lg mb-4">
            <img src={shirts} alt="shirts" className="w-full h-48 object-cover hover:scale-110 transition-transform duration-300" />
          </div>
          <h3 className="text-lg font-semibold mb-3 text-black">Camisas</h3>
          <div className="flex gap-4 justify-center">
            <Link to={`/designer/${designerId}/categories/camisas`}>
            <button className="px-4 py-2 text-[#0081a7] border-2 border-[#0081a7] hover:border-transparent hover:bg-[#00afb9] hover:text-white rounded-full font-medium transition-all duration-200">
              Ver inventario
            </button>
            </Link>
          </div>
        </div>

        {/* Shoes */}
        <div className="bg-white text-center p-4 rounded-lg shadow-lg hover:shadow-xl hover:bg-[#eff6e0] transition-all duration-300 transform hover:scale-105">
          <div className="overflow-hidden rounded-lg mb-4">
            <img src={shoes} alt="shoes" className="w-full h-48 object-cover hover:scale-110 transition-transform duration-300" />
          </div>
          <h3 className="text-lg font-semibold mb-3 text-black">Calzado</h3>
          <div className="flex gap-4 justify-center">
           <Link to={`/designer/${designerId}/categories/calzado`} >
            <button className="px-4 py-2 text-[#0081a7] border-2 border-[#0081a7] hover:border-transparent hover:bg-[#00afb9] hover:text-white rounded-full font-medium transition-all duration-200">
              Ver inventario
            </button>
           </Link>
          </div>
        </div>

        {/* Purse */}
        <div className="bg-white text-center p-4 rounded-lg shadow-lg hover:shadow-xl hover:bg-[#eff6e0] transition-all duration-300 transform hover:scale-105">
          <div className="overflow-hidden rounded-lg mb-4">
            <img src={purse} alt="purse" className="w-full h-48 object-cover hover:scale-110 transition-transform duration-300" />
          </div>
          <h3 className="text-lg font-semibold mb-3 text-black">Bolsas</h3>
          <div className="flex gap-4 justify-center">
            <Link to={`/designer/${designerId}/categories/bolsas`} >
            <button className="px-4 py-2 text-[#0081a7] border-2 border-[#0081a7] hover:border-transparent hover:bg-[#00afb9] hover:text-white rounded-full font-medium transition-all duration-200">
              Ver inventario
            </button>
            </Link>
          </div>
        </div>

        {/* Girls Suits */}
        <div className="bg-white text-center p-4 rounded-lg shadow-lg hover:shadow-xl hover:bg-[#b0c4b1] transition-all duration-300 transform hover:scale-105">
          <div className="overflow-hidden rounded-lg mb-4">
            <img src={gsuits} alt="girls suits" className="w-full h-48 object-cover hover:scale-110 transition-transform duration-300" />
          </div>
          <h3 className="text-lg font-semibold mb-3 text-black">Profesional</h3>
          <div className="flex gap-4 justify-center">
           <Link to={`/designer/${designerId}/categories/profesional`} >
            <button className="px-4 py-2 text-[#0081a7] border-2 border-[#0081a7] hover:border-transparent hover:bg-[#00afb9] hover:text-white rounded-full font-medium transition-all duration-200">
              Ver inventario
            </button>
           </Link>
          </div>
        </div>

        {/* Mens Suits */}
        <div className="bg-white text-center p-4 rounded-lg shadow-lg hover:shadow-xl hover:bg-[#b0c4b1] transition-all duration-300 transform hover:scale-105">
          <div className="overflow-hidden rounded-lg mb-4">
            <img src={msuits} alt="mens suits" className="w-full h-48 object-cover hover:scale-110 transition-transform duration-300" />
          </div>
          <h3 className="text-lg font-semibold mb-3 text-black">Trajes</h3>
          <div className="flex gap-4 justify-center">
            <Link to={`/designer/${designerId}/categories/trajes`} >
            <button className="px-4 py-2 text-[#0081a7] border-2 border-[#0081a7] hover:border-transparent hover:bg-[#00afb9] hover:text-white rounded-full font-medium transition-all duration-200">
              Ver inventario
            </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Designer's Best Sellers Section */}
      {designerId && designer && (
        <div className="mt-16">
          <BestSeller
            title={`Best Sellers de ${designer.name}`}
            designerId={designerId}
            limit={4}
            className="bg-[#231C1C]"
            showRanking={true}
            onAddToCart={(product) => {
              // Handle add to cart functionality here
              console.log("Add to cart:", product);
            }}
          />
        </div>
      )}
    </div>
  );
}