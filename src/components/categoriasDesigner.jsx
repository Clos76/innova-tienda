import { Link } from "react-router-dom";
import dresses from "../assets/dresses.jpg";
import jeans from "../assets/pants.jpg";
import hoodies from "../assets/hoodies.jpg";
import shirts from "../assets/shirts.jpg";
import shoes from "../assets/shoes.jpg";
import purse from "../assets/bags.jpg";
import gsuits from "../assets/girl-suits.jpg";
import msuits from "../assets/mens-suits.jpg";

export default function CategoriasDesigner({ designerId = null, showTitle = true }) {
  const categories = [
    {
      id: 'vestidos',
      name: 'Vestidos',
      image: dresses,
      path: designerId ? `/designer/${designerId}?category=vestidos` : '/productos/vestidos',
      hoverColor: 'hover:bg-[#f9f7f3]'
    },
    {
      id: 'jeans',
      name: 'Jeans',
      image: jeans,
      path: designerId ? `/designer/${designerId}?category=jeans` : '/productos/jeans',
      hoverColor: 'hover:bg-[#f9f7f3]'
    },
    {
      id: 'hoodies',
      name: 'Hoodies',
      image: hoodies,
      path: designerId ? `/designer/${designerId}?category=hoodies` : '/productos/hoodies',
      hoverColor: 'hover:bg-[#faedcd]'
    },
    {
      id: 'camisas',
      name: 'Camisas',
      image: shirts,
      path: designerId ? `/designer/${designerId}?category=camisas` : '/productos/camisas',
      hoverColor: 'hover:bg-[#faedcd]'
    },
    {
      id: 'calzado',
      name: 'Calzado',
      image: shoes,
      path: designerId ? `/designer/${designerId}?category=calzado` : '/productos/calzado',
      hoverColor: 'hover:bg-[#eff6e0]'
    },
    {
      id: 'bolsas',
      name: 'Bolsas',
      image: purse,
      path: designerId ? `/designer/${designerId}?category=bolsas` : '/productos/bolsas',
      hoverColor: 'hover:bg-[#eff6e0]'
    },
    {
      id: 'dama-profesional',
      name: 'Profesional',
      image: gsuits,
      path: designerId ? `/designer/${designerId}?category=dama-profesional` : '/productos/dama-profesional',
      hoverColor: 'hover:bg-[#b0c4b1]'
    },
    {
      id: 'trajes',
      name: 'Trajes',
      image: msuits,
      path: designerId ? `/designer/${designerId}?category=trajes` : '/productos/trajes',
      hoverColor: 'hover:bg-[#b0c4b1]'
    }
  ];

  return (
    <div className="container mx-auto p-4">
      {showTitle && (
        <div className="text-center pt-3">
          <h1 className="text-3xl font-bold mb-6 text-[#023047]">
            {designerId ? 'Categorías Disponibles' : 'Nuestros Productos'}
          </h1>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div 
            key={category.id}
            className={`bg-white text-center p-4 rounded-lg shadow-md transition-all duration-300 ${category.hoverColor} hover:shadow-lg hover:transform hover:-translate-y-1`}
          >
            <div className="mb-4 rounded-lg overflow-hidden">
              <img 
                src={category.image} 
                alt={category.name} 
                className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <h2 className="text-lg font-semibold mb-4 text-black">
              {category.name}
            </h2>
            <div className="flex justify-center">
              <Link to={category.path}>
                <button className="px-4 py-2 text-[#0081a7] border border-[#0081a7] hover:border-transparent hover:bg-[#00afb9] hover:text-white rounded transition-all duration-300 hover:shadow-md">
                  Ver inventario
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}