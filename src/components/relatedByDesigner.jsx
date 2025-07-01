import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect, useState, useRef } from "react";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

function RelatedByDesigner({ currentProductId, diseñador }) {
  const [productosRelacionados, setProductosRelacionados] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchProductos = async () => {
      if (!diseñador) return;
      const q = query(
        collection(db, "productos"),
        where("diseñador", "==", diseñador)
      );
      const querySnapshot = await getDocs(q);
      const productos = [];
      querySnapshot.forEach((doc) => {
        if (doc.id !== currentProductId) {
          productos.push({ id: doc.id, ...doc.data() });
        }
      });
      setProductosRelacionados(productos);
    };

    fetchProductos();
  }, [diseñador, currentProductId]);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  if (productosRelacionados.length === 0) return null;

  return (
    <div className="mt-10 relative">
      <h2 className="text-2xl font-semibold mb-4">Más de {diseñador}</h2>
      <div className="relative">
        {/* Left Button */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white border rounded-full p-2 z-10 shadow-md hover:bg-gray-100"
        >
          <ChevronLeft />
        </button>

        {/* Carousel container */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto space-x-4 scrollbar-hide px-10"
        >
          {productosRelacionados.map((prod) => (
            <Link
              to={`/producto/${prod.id}`}
              key={prod.id}
              className="min-w-[200px]  m-4 rounded p-8 hover:shadow flex-shrink-0 transition-transform duration-300 transform hover:-translate-y-2 hover:shadow-lg hover:scale-105"
            >
              <img
                src={prod.imagenes?.[0]}
                alt={prod.nombre}
                className="w-full h-40 object-cover rounded mb-2"
              />
              <h3 className="text-md font-bold">{prod.nombre}</h3>
              <p className="text-gray-600 text-sm">${prod.precio}</p>
            </Link>
          ))}
        </div>

        {/* Right Button */}
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white border rounded-full p-2 z-10 shadow-md hover:bg-gray-100"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}

export default RelatedByDesigner;
