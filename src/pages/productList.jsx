import { useParams, Link, useLocation } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import BannerCarousel from "../components/carrousel"
import Footer from "../components/footer.jsx";




//carousel images to use element carrousel
import bannerImage from "../assets/shoes.jpg";
import car from "../assets/shirts.jpg";
import group from "../assets/pants.jpg";
import girl from "../assets/male.png"

const images = [
    { src: bannerImage, alt: "Banner principal" },
    { src: car, alt: "Chica en carro" },
    { src: group, alt: "Grupo de modelos" },
    { src: girl, alt: "Pasarela" }
]




function ProductList() {
   
    const {designerId, categoria }= useParams();
    const [productos, setProducts] = useState([]);

    // console.log("designerId:", designerId, "categoria: ", categoria); //debug



    useEffect(() => {
        const fetchProducts = async () => {
            let q;

            if (designerId && categoria) {
                // console.log("Buscando productos de disenador", designerId, "y categoria", categoria); //debug
                q = query
                    (collection(db, "productos"),
                        where("designerId", "==", designerId),
                        where("categoria", "==", categoria)

                    );

            } else if (designerId) {
                // console.log("Buscando producto solo por disenador", designerId); //debug
                q = query
                (collection(db, "productos"),
                    where("designerId","==",  designerId)
                );
    
            }else {
                console.log("Buscando todos los productos");
        q = collection(db, "productos")
    }


const snapshot = await getDocs(q);
const productsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

// console.log("Productos obtenidos:", productsData) //debug
setProducts(productsData);
    };

fetchProducts();
  }, [designerId, categoria]);


return (




    <div className="w-screen overflow-hidden p-10">

        <div className="mb-6">
            <BannerCarousel images={images} />
        </div>

        {/**return home container */}
        <div className="mb-6">
            <Link
                to="/innova-shop"
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:gb-blue-700">
                ← Volver a Diseñadores
            </Link>

        </div>


        <h1 className="text-2xl font-bold capitalize mb-6">Categoría: {categoria}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
            {productos.map(prod => (
                <Link to={`/producto/${prod.id}`} key={prod.id} data-cy="product-link" className="bg-white p-4 shadow rounded hover:bg-gray-100">
                    <img src={prod.imagenes?.[0]} alt={prod.nombre} className="h-48 w-full object-cover mb-2 rounded" />
                    <h2 className="text-lg font-semibold">{prod.nombre}</h2>
                    <p className="text-sm text-gray-600">{prod.diseñador}</p>
                    <p className="text-black font-semibold">${prod.precio}</p>
                </Link>
            ))}
        </div>
        <Footer />

    </div>
);
}

export default ProductList;
