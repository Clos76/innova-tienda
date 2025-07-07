import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import Footer from "../components/footer";
import CollapsibleItem from "../components/collapsibleItem";
import RelatedByDesigner from "../components/relatedByDesigner";
import ImageTextOnRight from "../components/textOnRight";
import dresses from "../assets/red.jpg"
//quantity para cart
import { useCart } from "../context/cartContext";
import paymentMethods from "../assets/paymentMethods.png"


function ProductDetail() {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [mainImage, setMainImage] = useState(null); // <-- nuevo estado
    const [selectedSize, setSelectedSize] = useState("");
    const { dispatch } = useCart(); //define dispatch as func useCart()



    //cart adding items 
    const [quantity, setQuantity] = useState(1);
    const increaseQuantity = () => {
        setQuantity((prev) => prev + 1);
    };

    const decreaseQuantity = () => {
        setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
    }

    //add to cart action
    const handleAddCart = () => {
        // If sizes are required but none selected
        if (producto.tallas?.length > 0 && !selectedSize) {
            alert("Por favor seleccione una talla.");
            return;
        }
        //added for the checkout cart.
        dispatch({
            type: "ADD_ITEM",
            payload: {
                id: id,
                nombre: producto.nombre,
                precio: producto.precio,
                cantidad: quantity,
                talla: selectedSize || null,
                imagen: mainImage
            }
        })

        // Build alert message
        const sizeText = selectedSize ? `Talla: ${selectedSize}, ` : "";
        alert(`"${producto.nombre}" (${sizeText}Cantidad: ${quantity}x) agregado al carrito`);
    };



    useEffect(() => {
        const fetchProduct = async () => {
            const docRef = doc(db, "productos", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setProducto(data);
                setMainImage(data.imagenes?.[0]); // <-- establecer imagen principal
            }
        };
        fetchProduct();
    }, [id]);

    if (!producto) return <div className="p-4">Cargando...</div>;

        //taxes
    const basePrice = (producto.precio / 1.16).toFixed(2);
    const tax = (producto.precio - basePrice).toFixed(2);



    return (


        <div className="w-full overflow-hidden p-6">




            {/* return home container */}
            <div className="mb-6">
                <Link
                    to="/"
                    className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    ← Volver a Productos
                </Link>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 w-full">


                {/* thumbnails */}
                <div className="flex lg:flex-col overflow-x-auto gap-2">
                    {producto.imagenes?.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`thumb-${index}`}
                            className={`w-20 h-20 object-cover rounded cursor-pointer border ${mainImage === img ? "border-blue-500" : "border-gray-300"
                                }`}
                            onClick={() => setMainImage(img)}
                        />
                    ))}
                </div>



                {/* main image */}
                <div className="flex justify-center w-full max-w-lg mx-auto lg:max-w-full lg:h-[600px] rounded overflow-hidden ">
                    {mainImage && (
                        <img
                            src={mainImage}
                            alt={producto.nombre}
                            className=" w-full max-h-full object-contain  "
                        />
                    )}
                </div>





                {/* product info */}
                <div className="">
                    <h1 className="text-3xl font-bold text-gray-600 mb-2 ">{producto.nombre}</h1>
                    <p className="text-lg text-gray-700 mb-2">
                        Diseñador: {producto.diseñador}
                    </p>
                    <p className="text-xl font-semibold text-black mb-4 space-y-1">
                        Total: ${producto.precio.toFixed(2)} MXN <br />

                        <span className="text-sm text-gray-600">+ IVA</span>
                    </p>

                    <p className="text-gray mb-4">{producto.descripcion}</p>

                    {/**Size section  */}
                    {producto.tallas?.length > 0 && (
                        <div className="mb-4">
                            <span className="tex-gray-700 mr-2">Talla:</span>
                            <div className="flex flex-wrap gap-2 mt-1">
                                {producto.tallas.map((size) => (
                                    <button key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-3 py-1 border rounded ${selectedSize === size
                                            ? "bg-black text-white"
                                            : "bg-white text-black hover:bg-gray-100"
                                            }`}
                                    >
                                        {size}

                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/** Counter for Cart */}
                    <div className="flex items-center gap-4 mb-4 ">
                        <span className="text-gray-700">Cantidad:</span>
                        <div className="flex items-center border rounded overflow-hidden">
                            <button type="button" onClick={decreaseQuantity} className="px-3 py-1 bg-gray-200 hover:bg-gray-300">
                                -
                            </button>
                            <span className="px-4">{quantity}</span>
                            <button type="button" onClick={increaseQuantity} className="px-3 py-1 bg-gray-200 hover:bg-gray-300">
                                +
                            </button>

                        </div>
                    </div>


                    <div>
                        <button
                            onClick={handleAddCart}
                            className=" p-4 sm:p-8 lg:p-8 text-sm md-text-base mt-4 w-full px-6 py-2 bg-green-600 text-white hover:bg-blue-400 rounded"
                        >
                            Añadir al Carrito
                        </button>
                    </div>

                    <div className="align-center">
                        <button className="p-4 sm:p-8 lg:p-8 mt-4 w-full px-6 py-2 bg-black text-white hover:bg-gray-800 rounded">
                            Comprar Ahora
                        </button>
                    </div>
                    <img
                        src={paymentMethods}
                        alt="Métodos de pago"
                        className="inline w-full mt-2 centered border-t pt-2 border-b "
                    />
                    <div className="mt-6 text-sm text-gray-700 space-y-2 ">
                        <p><strong>15 dias para devoluciones sin costo</strong> (excepto en productos personalizados)</p>
                        <p>Tu compra es cifrada y segura</p>


                    </div>

                    {/**Collapsible section */}
                    <div className="mt-6 border-t">


                        {producto.descripcionExtendida && (
                            <CollapsibleItem title="Descripcion">
                                {producto.descripcionExtendida}
                            </CollapsibleItem>
                        )}

                        {producto.guiaDeCuidados && (
                            <CollapsibleItem title="Guia de Cuidados" className="text-">
                                {producto.guiaDeCuidados}
                            </CollapsibleItem>
                        )}

                        {producto.materiales && (
                            <CollapsibleItem title="Materiales">
                                {producto.materiales}
                            </CollapsibleItem>
                        )}

                        {producto.composicion && (
                            <CollapsibleItem title="Composicion">
                                {producto.composicion}
                            </CollapsibleItem>
                        )}




                    </div>



                </div>
            </div>

            <div>
                <RelatedByDesigner currentProductId={id}
                    diseñador={producto.diseñador} />
            </div>

            <div>
                <ImageTextOnRight

                    imageSrc={dresses}
                    imageAlt="Dresses"
                    title1="Porque Innova Store?"
                    text1="Plataforma Tijuanense dedicada a desarrollar y promover al nuevo talento de la industria de la moda creando un espacio donde pueden demostrar su creatividad."
                    title2="Diseño MEXICANO"
                    text2="Espacio que reúne a los diseñadores ganadores de nuestro concurso y a diseñadores internacionales en una misma pasarela, complementado con conferencias magistrales donde expertos de la industria de la moda abordan distintas temáticas conforme a las tendencias del momento."

                />
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
}

export default ProductDetail;
