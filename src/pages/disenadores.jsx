import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase"

export default function DesignersCarousel({ onDesignerClick }) {
    const [designers, setDesigners] = useState([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const [itemsPerView, setItemsPerView] = useState(1);
    const carouselRef = useRef(null);

    // Update items per view based on screen size
    useEffect(() => {
        const updateItemsPerView = () => {
            const width = window.innerWidth;
            if (width >= 1280) { // xl breakpoint
                setItemsPerView(4);
            } else if (width >= 1024) { // lg breakpoint
                setItemsPerView(3);
            } else if (width >= 640) { // sm breakpoint
                setItemsPerView(2);
            } else {
                setItemsPerView(1);
            }
        };

        updateItemsPerView();
        window.addEventListener('resize', updateItemsPerView);
        return () => window.removeEventListener('resize', updateItemsPerView);
    }, []);

    useEffect(() => {
        const fetchDesigners = async () => {
            try{
                setLoading(true);
                const snapshot = await getDocs(collection(db, "designers"));
                const data = snapshot.docs.map(doc => ({
                    id: doc.id, 
                    ...doc.data()
                }));
                setDesigners(data);
                setError(null);
            } catch(err) {
                console.error("Error fetching designers:", err);
                setError("Error al cargar diseñadores");
            } finally {
                setLoading(false)
            }
        };
        fetchDesigners();
    }, []);

    // Calculate max index based on items per view
    const maxIndex = Math.max(0, designers.length - itemsPerView);

    // Min swipe distance in px
    const minSwipeDistance = 50;

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => {
            const newIndex = prevIndex + itemsPerView;
            return newIndex > maxIndex ? 0 : newIndex;
        });
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => {
            const newIndex = prevIndex - itemsPerView;
            return newIndex < 0 ? maxIndex : newIndex;
        });
    };

    const goToSlide = (index) => {
        if (index <= maxIndex) {
            setCurrentIndex(index);
        }
    };

    // Touch handlers for mobile
    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            nextSlide();
        } else if (isRightSwipe) {
            prevSlide();
        }
    };

    if (loading) {
        return <div className="text-center p-8">Cargando diseñadores...</div>;
    }

    if (error) {
        return <div className="text-center p-8 text-red-600">{error}</div>;
    }

    if (!designers || designers.length === 0) {
        return <div className="text-center p-8">No hay diseñadores disponibles</div>;
    }

    // Get visible designers based on current index and items per view
    const getVisibleDesigners = () => {
        return designers.slice(currentIndex, currentIndex + itemsPerView);
    };

    return (
        <div className="container mx-auto p-2 sm:p-4 max-w-7xl">
            {/** Header */}
            <div className="text-center pt-2 sm:pt-3 mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-[#023047]">DISEÑADORES GANADORES</h1>
                <p className="text-sm sm:text-base text-gray-600">Descubre nuestros talentosos diseñadores</p>
            </div>

            {/** Carousel container */}
            <div className="relative">
                {/** Main carousel with Touch Support */}
                <div
                    className="flex items-center justify-center"
                    ref={carouselRef}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                >
                    {/** Left Arrow */}
                    {maxIndex > 0 && (
                        <button
                            onClick={prevSlide}
                            className="absolute left-1 sm:left-4 z-10 p-2 sm:p-3 rounded-full bg-white shadow-lg hover:bg-gray-50 hover:shadow-xl transition-all duration-200 border border-gray-200"
                            aria-label="Diseñadores previos"
                        >
                            <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-[#0081a7]" />
                        </button>
                    )}

                    {/** Designer Cards Grid */}
                    <div className="w-full max-w-xs sm:max-w-none mx-4 sm:mx-16">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                            {getVisibleDesigners().map((designer, index) => (
                                <div
                                    key={designer.id}
                                    className="bg-white rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-4 sm:p-6 text-center border border-gray-100"
                                >
                                    {/** Image */}
                                    <div className="mb-4 sm:mb-6">
                                        <div className="relative mx-auto w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden bg-gray-100 shadow-inner">
                                            <img
                                                src={designer.imageUrls?.[0]}
                                                alt={designer.name}
                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                                onError={(e) => {
                                                    e.target.src = '/placeholder-designer.jpg';
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/** Designer Info */}
                                    <div className="space-y-2 sm:space-y-3">
                                        <h2 className="text-sm sm:text-lg lg:text-xl font-bold text-[#023047] leading-tight">
                                            {designer.name}
                                        </h2>
                                        {designer.brand && (
                                            <h3 className="text-xs sm:text-sm lg:text-base font-semibold text-[#0081a7] uppercase tracking-wide">
                                                {designer.brand}
                                            </h3>
                                        )}
                                        {designer.description && (
                                            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed px-1 line-clamp-3">
                                                {designer.description}
                                            </p>
                                        )}
                                    </div>

                                    {/** Action button */}
                                    <div className="mt-4 sm:mt-6">
                                        <button
                                            onClick={() => onDesignerClick(designer)}
                                            className="px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm text-[#0081a7] border-2 border-[#0081a7] hover:border-transparent hover:bg-[#00afb9] hover:text-white rounded-full font-semibold transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 w-full"
                                        >
                                            Ver Colecciones
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/** Right Arrow */}
                    {maxIndex > 0 && (
                        <button
                            onClick={nextSlide}
                            className="absolute right-1 sm:right-4 z-10 p-2 sm:p-3 rounded-full bg-white shadow-lg hover:bg-gray-50 hover:shadow-xl transition-all duration-200 border border-gray-200"
                            aria-label="Próximos diseñadores"
                        >
                            <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-[#0081a7]" />
                        </button>
                    )}
                </div>

                {/** Dots indicators - only show if there are multiple pages */}
                {maxIndex > 0 && (
                    <div className="flex justify-center mt-6 sm:mt-8 space-x-2">
                        {Array.from({ length: Math.ceil(designers.length / itemsPerView) }).map((_, pageIndex) => {
                            const slideIndex = pageIndex * itemsPerView;
                            return (
                                <button
                                    key={pageIndex}
                                    onClick={() => goToSlide(slideIndex)}
                                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${
                                        slideIndex === currentIndex
                                            ? "bg-[#0081a7] shadow-md"
                                            : "bg-gray-300 hover:bg-gray-400"
                                    }`}
                                    aria-label={`Ve a la página ${pageIndex + 1}`}
                                />
                            );
                        })}
                    </div>
                )}

                {/** Designer counter */}
                <div className="text-center mt-3 sm:mt-4">
                    <span className="text-sm text-gray-500">
                        Mostrando {Math.min(currentIndex + itemsPerView, designers.length)} de {designers.length} diseñadores
                    </span>
                </div>

                {/** Mobile nav hint - only show on single item view */}
                {itemsPerView === 1 && maxIndex > 0 && (
                    <div className="text-center mt-2 sm:hidden">
                        <span className="text-xs text-gray-400">
                            Desliza para navegar
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}