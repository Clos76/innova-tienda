import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../utils/cartUtils";
import { useCart } from "../context/cartContext";




// ===== Product Card =====
const ProductCard = ({ product, onAddToCart, className = "" }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const navigate = useNavigate();
    const {dispatch } = useCart(); //pull dispatch from context


    // button for view prod
    const handleViewProduct = () => {
        navigate(`/producto/${product.id}`)
    }

    //button for add to cart 
    const handleAddCart = () => {
        if (product.tallas?.length > 0 && !product.selectedSize) {
            alert("Por favor seleccione una talla.");
            return;
        }
        addToCart(dispatch, product);
    }

    return (


        <div className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${className}`}>
            <div className="relative aspect-square bg-gray-100">
                {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    </div>
                )}
                <img
                    src={product.imagen || "/api/placeholder/300/300"}
                    alt={product.nombre || "Producto"}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                    onLoad={() => setImageLoaded(true)}
                    onError={(e) => {
                        e.currentTarget.src = "/api/placeholder/300/300";
                        setImageLoaded(true);
                    }}
                />

                {product.rank && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        #{product.rank}
                    </div>
                )}
            </div>

            <div className="p-4">
                <h3 className="font-semibold text-gray-900 text-lg mb-1 line-clamp-2">
                    {product.nombre}
                </h3>

                {product.designerName && (
                    <p className="text-sm text-blue-600 mb-2 font-medium">by {product.designerName}</p>
                )}

                <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold text-gray-900">
                        {product._priceDisplay}
                    </span>
                    <span className="text-sm text-gray-500">
                        {product._soldLabel}
                    </span>
                </div>

                {/**  
                {!!product.availableSizes?.length && (
                    <div className="flex flex-wrap gap-1 mb-3">
                        {product.availableSizes.slice(0, 3).map((size, i) => (
                            <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded border">
                                {size}
                            </span>
                        ))}
                        {product.availableSizes.length > 3 && (
                            <span className="px-2 py-1 text-gray-700 text-xs rounded border">
                                +{product.availableSizes.length - 3}
                            </span>
                        )}
                    </div>
                )}
                    */}

                <button
                    className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors duration-200 font-medium"
                    onClick={handleViewProduct}
                    aria-label={`Ver ${product.nombre}`}
                >
                    Ver Producto
                </button>
                {/** 
                <button
                    className="w-full bg-black text-white mt-2 mb-2 py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-200 font-medium"
                    onClick={() => handleAddCart(product)}
                    aria-label={`Agregar ${product.nombre} al carrito`}
                >
                    Agregar al Carito
                </button>
                */}
            </div>
        </div>
    );
};

export default ProductCard;