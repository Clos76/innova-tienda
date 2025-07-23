import { Link } from "react-router-dom";
import dresses from "../assets/dresses.jpg";
import jeans from "../assets/pants.jpg";
import hoodies from "../assets/hoodies.jpg";
import shirts from "../assets/shirts.jpg";
import shoes from "../assets/shoes.jpg";
import purse from "../assets/bags.jpg";
import gsuits from "../assets/girl-suits.jpg";
import msuits from "../assets/mens-suits.jpg";

export default function Categorias() {
  return (
    <div className="container mx-auto p-4">

      <div className="text-center pt-3">
        <h1 className="text-3xl font-bold mb-6">Nuestros Productos</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Vestidos */}
        <div className="bg-white text-center p-4 rounded shadow hover:bg-[#f9f7f3]">
          <img src={dresses} alt="dresses" />
          <h2 className="text-lg font-semibold mb-2 text-black pt-4">Vestidos</h2>
          <div className="flex gap-4 justify-center">
            <Link to="/productos/vestidos">
              <button className="px-4 py-2 text-[#0081a7] border border-[#0081a7] hover:border-transparent hover:bg-[#00afb9] hover:text-white rounded">
                Ver inventario
              </button>
            </Link>
          </div>
        </div>

        {/* Jeans */}
        <div className="bg-white text-center p-4 rounded shadow hover:bg-[#f9f7f3]">
          <img src={jeans} alt="jeans" />
          <h2 className="text-lg font-semibold mb-2 text-black pt-4">Jeans</h2>
          <div className="flex gap-4 justify-center">
            <Link to="/productos/jeans">
              <button className="px-4 py-2 text-[#0081a7] border border-[#0081a7] hover:border-transparent hover:bg-[#00afb9] hover:text-white rounded">
                Ver inventario
              </button>
            </Link>
          </div>
        </div>

        {/* Hoodies */}
        <div className="bg-white text-center p-4 rounded shadow hover:bg-[#faedcd]">
          <img src={hoodies} alt="hoodies" />
          <h2 className="text-lg font-semibold mb-2 text-black pt-4">Hoodies</h2>
          <div className="flex gap-4 justify-center">
           <Link to="/productos/hoodies" >
            <button className="px-4 py-2 text-[#0081a7] border border-[#0081a7] hover:border-transparent hover:bg-[#00afb9] hover:text-white rounded">
              Ver inventario
            </button>
           </Link>
          </div>
        </div>

        {/* Shirts */}
        <div className="bg-white text-center p-4 rounded shadow hover:bg-[#faedcd]">
          <img src={shirts} alt="shirts" />
          <h2 className="text-lg font-semibold mb-2 text-black pt-4">Camisas</h2>
          <div className="flex gap-4 justify-center">
            <Link to="/productos/camisas" >
            <button className="px-4 py-2 text-[#0081a7] border border-[#0081a7] hover:border-transparent hover:bg-[#00afb9] hover:text-white rounded">
              Ver inventario
            </button>
            
            </Link>
          </div>
        </div>

        {/* Shoes */}
        <div className="bg-white text-center p-4 rounded shadow hover:bg-[#eff6e0]">
          <img src={shoes} alt="shoes" />
          <h2 className="text-lg font-semibold mb-2 text-black pt-4">Calzado</h2>
          <div className="flex gap-4 justify-center">
           <Link to="/productos/calzado" >
            <button className="px-4 py-2 text-[#0081a7] border border-[#0081a7] hover:border-transparent hover:bg-[#00afb9] hover:text-white rounded">
              Ver inventario
            </button>
           </Link>
          </div>
        </div>

        {/* Purse */}
        <div className="bg-white text-center p-4 rounded shadow hover:bg-[#eff6e0]">
          <img src={purse} alt="purse" />
          <h2 className="text-lg font-semibold mb-2 text-black pt-4">Bolsas</h2>
          <div className="flex gap-4 justify-center">
            <Link to="/productos/bolsas" >
            <button className="px-4 py-2 text-[#0081a7] border border-[#0081a7] hover:border-transparent hover:bg-[#00afb9] hover:text-white rounded">
              Ver inventario
            </button>
            </Link>
          </div>
        </div>

        {/* Girls Suits */}
        <div className="bg-white text-center p-4 rounded shadow hover:bg-[#b0c4b1]">
          <img src={gsuits} alt="girls suits" />
          <h2 className="text-lg font-semibold mb-2 text-black pt-4">Profesional</h2>
          <div className="flex gap-4 justify-center">
           <Link to="/productos/dama-profesional" >
            <button className="px-4 py-2 text-[#0081a7] border border-[#0081a7] hover:border-transparent hover:bg-[#00afb9] hover:text-white rounded">
              Ver inventario
            </button>
           </Link>
          </div>
        </div>

        {/* Mens Suits */}
        <div className="bg-white text-center p-4 rounded shadow hover:bg-[#b0c4b1]">
          <img src={msuits} alt="mens suits" />
          <h2 className="text-lg font-semibold mb-2 text-black pt-4">Trajes</h2>
          <div className="flex gap-4 justify-center">
            <Link to="/productos/trajes" >
            <button className="px-4 py-2 text-[#0081a7] border border-[#0081a7] hover:border-transparent hover:bg-[#00afb9] hover:text-white rounded">
              Ver inventario
            </button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}