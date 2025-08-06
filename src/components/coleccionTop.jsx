import React from "react";
import ganador1 from "../assets/ganador1.png";
import ganador2 from "../assets/ganador2.png";
import inicioMarca from "../assets/InicioMarca.png";




export default function TopCollection() {
  const topProducts = [
    {
      id: 1,
      image:ganador2,
      title: "Verano",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et vestibulum lectus.",
      designer: {
        name: "Sofia Martinez",
        id: "sofia-martinez",
      },
    },
    {
      id: 2,
      image:inicioMarca,
      title: "Primavera",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et vestibulum lectus.",
      designer: {
        name: "Carlos Rivera",
        id: "carlos-rivera",
      },
    },
    {
      id: 3,
      image:ganador1, 
      title: "Invierno",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et vestibulum lectus.",
      designer: {
        name: "Ana Lopez",
        id: "ana-lopez",
      },
    },
  ];

  const handleDesignerClick = (designerId) => {
    console.log(`Navigate to designer: ${designerId}`);
  };

  return (
    <div className="w-full bg-[#231C1C] text-center py-12 px-4">
      <h1 className="text-5xl mb-12 font-bold text-white">Colección Top</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {topProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
          >
            {/* Product Image */}
            <div className="relative w-full h-64 overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
              <div className="absolute inset-0 bg-opacity-0 hover:bg-opacity-20 transition-all duration-300"></div>
            </div>

            {/* Product Info */}
            <div className="p-6 text-center">
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                {product.title}
              </h2>

              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                {product.description}
              </p>

              {/* <div className="border-t pt-4">
                <p className="text-gray-500 text-xs mb-2">Diseñador</p>
                <button
                  onClick={() => handleDesignerClick(product.designer.id)}
                  className="text-blue-600 hover:text-blue-800 font-semibold text-sm transition-colors duration-200 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded px-1"
                >
                  {product.designer.name}
                </button>
              </div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
