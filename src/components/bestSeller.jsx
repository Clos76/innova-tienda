import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where, orderBy, limit as fbLimit } from "firebase/firestore";
import { db } from "../firebase";

// ===== Product Card =====
const ProductCard = ({ product, onAddToCart, className = "" }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

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

        <button
          className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors duration-200 font-medium"
          onClick={() => onAddToCart?.(product)}
          aria-label={`Agregar ${product.nombre} al carrito`}
        >
          Agregar a Carrito
        </button>
      </div>
    </div>
  );
};

// ===== Main Best Sellers =====
export default function BestSeller({
  title = "Best Sellers",
  limit = 6,
  className = "",
  onAddToCart,
  designerId = null,         // optional: filter by designer
  sizeKey = null,            // optional: show soldBySize for this size (e.g., "M")
  priceInCents = true,       // set false if you store price in dollars
  usePublishedOnly = true,   // only show published products
  showRanking = true
}) {
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fmtPrice = (value) => {
    if (value == null) return "$0.00";
    const num = Number(value);
    if (!Number.isFinite(num)) return "$0.00";
    const dollars = priceInCents ? num / 100 : num;
    return dollars.toLocaleString(undefined, { style: "currency", currency: "USD" });
  };

  const fetchBestSellers = async () => {
    try {
      setLoading(true);
      setError(null);

      // Build a safe query against "productos"
      const constraints = [collection(db, "productos")];
      if (usePublishedOnly) constraints.push(where("published", "==", true));
      if (designerId) constraints.push(where("designerId", "==", designerId));
      constraints.push(orderBy("totalSold", "desc"));
      constraints.push(fbLimit(limit));

      const q = query(...constraints);
      const snap = await getDocs(q);

      const products = snap.docs.map((d, idx) => {
        const data = d.data() || {};
        const imagen =
          Array.isArray(data.imagenes) && data.imagenes.length > 0
            ? data.imagenes[0]
            : data.imagen || "/api/placeholder/300/300";

        // Decide which "sold" number to show:
        const sizeSold =
          sizeKey && data.soldBySize && typeof data.soldBySize[sizeKey] === "number"
            ? data.soldBySize[sizeKey]
            : null;

        const _soldLabel = sizeSold != null
          ? `${sizeSold} sold (size ${sizeKey})`
          : `${Number(data.totalSold || 0)} sold`;

        return {
          id: d.id,
          nombre: data.nombre || "Producto",
          precio: data.precio ?? 0,
          imagen,
          totalSold: Number(data.totalSold || 0),
          soldBySize: data.soldBySize || {},
          availableSizes: Array.isArray(data.tallas) ? data.tallas : [],
          designerName: data.designerName || null,
          description: data.descripcion || data.descripcionExtendida || null,
          categoria: data.categoria || null,
          rank: showRanking ? idx + 1 : null,

          // ui helpers
          _priceDisplay: fmtPrice(data.precio),
          _soldLabel
        };
      });

      setBestSellers(products);
    } catch (err) {
      console.error("Error fetching best sellers: ", err);
      setError("Failed to fetch best sellers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBestSellers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, designerId, sizeKey, usePublishedOnly, priceInCents]);

  if (loading) {
    return (
      <div className={`w-full bg-black py-12 px-4 ${className}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
            {title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(Math.min(4, limit))].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                <div className="aspect-square bg-gray-300" />
                <div className="p-4">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-6 bg-gray-300 rounded mb-3 w-1/2"></div>
                  <div className="h-10 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`w-full bg-black py-12 px-4 ${className}`}>
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h2>
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={fetchBestSellers}
            className="bg-white text-black px-6 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full bg-black py-12 px-4 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{title}</h2>
          <p className="text-gray-300 text-lg">
            Discover our most popular items loved by customers
          </p>
        </div>

        {bestSellers.length === 0 ? (
          <div className="text-center text-gray-300 py-12 ">
            <p className="text-xl mb-4">No best seller found</p>
            <p className="text-gray-400">Check back soon for popular items!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                className="hover:scale-105 transition-transform duration-200"
              />
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <button className="bg-white text-black px-8 py-3 rounded-md hover:bg-gray-100 transition-colors duration-200 font-medium">
            View All Products
          </button>
        </div>
      </div>
    </div>
  );
}
