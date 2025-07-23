import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Heart, Filter, Grid, List } from "lucide-react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

export default function DesignerProfile() {
    const { designerId } = useParams();
    const navigate = useNavigate();
    
    const [designer, setDesigner] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [viewMode, setViewMode] = useState('grid');
    const [sortBy, setSortBy] = useState('name');

    // Categories from your existing categorias component
    const categories = [
        { id: 'all', name: 'Todos', path: '' },
        { id: 'vestidos', name: 'Vestidos', path: '/productos/vestidos' },
        { id: 'jeans', name: 'Jeans', path: '/productos/jeans' },
        { id: 'hoodies', name: 'Hoodies', path: '/productos/hoodies' },
        { id: 'camisas', name: 'Camisas', path: '/productos/camisas' },
        { id: 'calzado', name: 'Calzado', path: '/productos/calzado' },
        { id: 'bolsas', name: 'Bolsas', path: '/productos/bolsas' },
        { id: 'dama-profesional', name: 'Profesional', path: '/productos/dama-profesional' },
        { id: 'trajes', name: 'Trajes', path: '/productos/trajes' }
    ];

    useEffect(() => {
        const fetchDesignerData = async () => {
            try {
                setLoading(true);
                
                // Fetch designer info
                const designerDoc = await getDocs(
                    query(collection(db, "designers"), where("id", "==", designerId))
                );
                
                if (!designerDoc.empty) {
                    const designerData = designerDoc.docs[0].data();
                    setDesigner({ id: designerDoc.docs[0].id, ...designerData });
                } else {
                    setError("Diseñador no encontrado");
                    return;
                }

                // Fetch designer's products
                const productsSnapshot = await getDocs(
                    query(collection(db, "products"), where("designerId", "==", designerId))
                );
                
                const productsData = productsSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                
                setProducts(productsData);
                setError(null);
            } catch (err) {
                console.error("Error fetching designer data:", err);
                setError("Error al cargar información del diseñador");
            } finally {
                setLoading(false);
            }
        };

        if (designerId) {
            fetchDesignerData();
        }
    }, [designerId]);

    // Filter and sort products
    const filteredAndSortedProducts = products
        .filter(product => {
            if (selectedCategory === 'all') return true;
            return product.category === selectedCategory;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'price-low':
                    return (a.price || 0) - (b.price || 0);
                case 'price-high':
                    return (b.price || 0) - (a.price || 0);
                case 'newest':
                    return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
                default:
                    return 0;
            }
        });

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0081a7] mx-auto mb-4"></div>
                    <p className="text-gray-600">Cargando información del diseñador...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">{error}</p>
                    <button
                        onClick={() => navigate('/designers')}
                        className="px-4 py-2 bg-[#0081a7] text-white rounded hover:bg-[#00afb9] transition-colors"
                    >
                        Volver a Diseñadores
                    </button>
                </div>
            </div>
        );
    }

    if (!designer) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header with Designer Info */}
            <div className="bg-white shadow-sm">
                <div className="container mx-auto px-4 py-6">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center text-[#0081a7] hover:text-[#00afb9] mb-4 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Volver
                    </button>

                    {/* Designer Profile */}
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-gray-100 shadow-lg">
                            <img
                                src={designer.imageUrls?.[0] || '/placeholder-designer.jpg'}
                                alt={designer.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.src = '/placeholder-designer.jpg';
                                }}
                            />
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-3xl md:text-4xl font-bold text-[#023047] mb-2">
                                {designer.name}
                            </h1>
                            {designer.brand && (
                                <h2 className="text-xl md:text-2xl text-[#0081a7] font-semibold mb-3">
                                    {designer.brand}
                                </h2>
                            )}
                            {designer.description && (
                                <p className="text-gray-600 max-w-2xl leading-relaxed">
                                    {designer.description}
                                </p>
                            )}
                            <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                                <span className="px-3 py-1 bg-[#0081a7] text-white text-sm rounded-full">
                                    {products.length} productos
                                </span>
                                {designer.specialties && designer.specialties.map((specialty, index) => (
                                    <span key={index} className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-full">
                                        {specialty}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters and Controls */}
            <div className="container mx-auto px-4 py-6">
                <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                        {/* Category Filter */}
                        <div className="flex items-center gap-2">
                            <Filter className="w-5 h-5 text-gray-500" />
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0081a7]"
                            >
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Sort and View Controls */}
                        <div className="flex items-center gap-4">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0081a7]"
                            >
                                <option value="name">Nombre A-Z</option>
                                <option value="price-low">Precio: Menor a Mayor</option>
                                <option value="price-high">Precio: Mayor a Menor</option>
                                <option value="newest">Más Recientes</option>
                            </select>

                            <div className="flex border border-gray-300 rounded overflow-hidden">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 ${viewMode === 'grid' ? 'bg-[#0081a7] text-white' : 'bg-white text-gray-600'}`}
                                >
                                    <Grid className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 ${viewMode === 'list' ? 'bg-[#0081a7] text-white' : 'bg-white text-gray-600'}`}
                                >
                                    <List className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Products Grid/List */}
                {filteredAndSortedProducts.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg mb-4">
                            {selectedCategory === 'all' 
                                ? "Este diseñador aún no tiene productos disponibles" 
                                : `No hay productos en la categoría "${categories.find(c => c.id === selectedCategory)?.name}"`
                            }
                        </p>
                        {selectedCategory !== 'all' && (
                            <button
                                onClick={() => setSelectedCategory('all')}
                                className="px-4 py-2 text-[#0081a7] border border-[#0081a7] rounded hover:bg-[#0081a7] hover:text-white transition-colors"
                            >
                                Ver todos los productos
                            </button>
                        )}
                    </div>
                ) : (
                    <div className={viewMode === 'grid' 
                        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
                        : "space-y-4"
                    }>
                        {filteredAndSortedProducts.map((product) => (
                            <div
                                key={product.id}
                                className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow ${
                                    viewMode === 'list' ? 'flex items-center p-4' : 'p-4'
                                }`}
                            >
                                {viewMode === 'grid' ? (
                                    <>
                                        <div className="aspect-square mb-4 rounded-lg overflow-hidden bg-gray-100">
                                            <img
                                                src={product.imageUrls?.[0] || '/placeholder-product.jpg'}
                                                alt={product.name}
                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                                onError={(e) => {
                                                    e.target.src = '/placeholder-product.jpg';
                                                }}
                                            />
                                        </div>
                                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                                            {product.name}
                                        </h3>
                                        {product.price && (
                                            <p className="text-[#0081a7] font-bold text-lg mb-3">
                                                ${product.price.toLocaleString()}
                                            </p>
                                        )}
                                        <div className="flex gap-2">
                                            <button className="flex-1 px-3 py-2 bg-[#0081a7] text-white rounded text-sm hover:bg-[#00afb9] transition-colors">
                                                <ShoppingCart className="w-4 h-4 inline mr-1" />
                                                Comprar
                                            </button>
                                            <button className="p-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                                                <Heart className="w-4 h-4 text-gray-600" />
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 mr-4">
                                            <img
                                                src={product.imageUrls?.[0] || '/placeholder-product.jpg'}
                                                alt={product.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.src = '/placeholder-product.jpg';
                                                }}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-900 mb-1">
                                                {product.name}
                                            </h3>
                                            {product.price && (
                                                <p className="text-[#0081a7] font-bold text-lg mb-2">
                                                    ${product.price.toLocaleString()}
                                                </p>
                                            )}
                                            <p className="text-gray-600 text-sm line-clamp-2">
                                                {product.description}
                                            </p>
                                        </div>
                                        <div className="flex flex-col gap-2 ml-4">
                                            <button className="px-4 py-2 bg-[#0081a7] text-white rounded text-sm hover:bg-[#00afb9] transition-colors whitespace-nowrap">
                                                Ver Detalles
                                            </button>
                                            <button className="p-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                                                <Heart className="w-4 h-4 text-gray-600 mx-auto" />
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}