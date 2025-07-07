import { useParams, Link } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import BannerCarousel from "../components/carrousel"
import Footer from "../components/footer.jsx";

//carousel images
import bannerImage from "../assets/shoes.jpg";
import car from "../assets/shirts.jpg";
import group from "../assets/pants.jpg";
import girl from "../assets/male.png"

const images = [
    {src: bannerImage, alt: "Banner principal"},
    {src:car, alt: "Chica en carro"}, 
    {src: group, alt: "Grupo de modelos"},
    {src: girl, alt: "Pasarela"}
]


function ProductList() {
    const { categoria } = useParams();
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const q = query(collection(db, "productos"), where("categoria", "==", categoria));
            const querySnapshot = await getDocs(q);
            const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            console.log("Fetched items:", items); // ✅ Debug log
            console.log("Parametro recibido", categoria); //debug

            setProductos(items);
        };
        fetchData();
    }, [categoria]);

    return (


         

        <div className="w-screen overflow-hidden p-10">

           <div className="mb-6">
            <BannerCarousel images={images} />
           </div>

            {/**return home container */}
            <div className="mb-6">
                <Link
                    to="/"
                    className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:gb-blue-700">
                    ← Volver a Productos
                </Link>

            </div>


            <h1 className="text-2xl font-bold capitalize mb-6">Categoría: {categoria}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
                {productos.map(prod => (
                    <Link to={`/producto/${prod.id}`} key={prod.id} className="bg-white p-4 shadow rounded hover:bg-gray-100">
                        <img src={prod.imagenes?.[0]} alt={prod.nombre} className="h-48 w-full object-cover mb-2 rounded" />
                        <h2 className="text-lg font-semibold">{prod.nombre}</h2>
                        <p className="text-sm text-gray-600">{prod.diseñador}</p>
                        <p className="text-black font-semibold">${prod.precio}</p>
                    </Link>
                ))}
            </div>
<Footer/>

        </div>
    );
}

export default ProductList;
