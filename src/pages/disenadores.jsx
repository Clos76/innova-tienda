import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react"; // Added useRef import
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
    const carouselRef = useRef(null);


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

            }catch(err) {
                console.error("Error fetching designers:", err);
                setError("Error al cargar diseñadores");
            }finally {
                setLoading(false)
            }
        };
        fetchDesigners();
    }, []);

    //min swipe distance in px
    const minSwipeDistance = 50;

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === designers.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? designers.length - 1 : prevIndex - 1
        );
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    //touch handlers for mobile
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

    if (!designers || designers.length === 0) {
        return <div className="text-center p-8">No hay diseñadores disponibles</div>;
    }

    return (
        <div className="container mx-auto p-2 sm:p-4 max-w-6xl">
            {/** Header */}
            <div className="text-center pt-2 sm:pt-3 mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-[#023047]">DISEÑADORES</h1>
                <p className="text-sm sm:text-base text-gray-600">Descubre nuestros talentosos diseñadores</p>
            </div>

            {/** Carousel container */}
            <div className="relative">
                {/** Main with Touch Support */}
                <div
                    className="flex items-center justify-center"
                    ref={carouselRef}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                >
                    {/** Left Arrow hidden on small screens */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-1 sm:left-4 z-10 p-2 sm:p-3 rounded-full bg-white shadow-lg hover:bg-gray-50 hover:shadow-xl transition-all duration-200 border border-gray-200 hidden xs:block"
                        aria-label="Diseñador previo"
                    >
                        <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-[#0081a7]" />
                    </button>

                    {/** Designer Card */}
                    <div className="w-full max-w-xs sm:max-w-md mx-4 sm:mx-16">
                        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-4 sm:p-6 lg:p-8 text-center border border-gray-100">
                            {/** Image */}
                            <div className="mb-4 sm:mb-6">
                                <div className="relative mx-auto w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden bg-gray-100 shadow-inner">
                                    <img
                                        src={designers[currentIndex].imageUrls?.[0]} //shows first image
                                        alt={designers[currentIndex].name}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                        onError={(e) => {
                                            e.target.src = '/placeholder-designer.jpg'; // Fallback image
                                        }}
                                    />
                                </div>
                            </div>

                            {/** Designer Info */}
                            <div className="space-y-2 sm:space-y-3">
                                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#023047] leading-tight">
                                    {designers[currentIndex].name}
                                </h2>
                                {designers[currentIndex].brand && (
                                    <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-[#0081a7] uppercase tracking-wide">
                                        {designers[currentIndex].brand}
                                    </h3>
                                )}
                                {designers[currentIndex].description && (
                                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed px-2">
                                        {designers[currentIndex].description}
                                    </p>
                                )}
                            </div>

                            {/** Action button */}
                            <div className="mt-6 sm:mt-8">
                                <button
                                    onClick={() => onDesignerClick(designers[currentIndex])}
                                    className="px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base text-[#0081a7] border-2 border-[#0081a7] hover:border-transparent hover:bg-[#00afb9] hover:text-white rounded-full font-semibold transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 w-full sm:w-auto"
                                >
                                    Ver Colecciones
                                </button>
                            </div>
                        </div>
                    </div>

                    {/** Right Arrow hidden on small screens */}
                    <button
                        onClick={nextSlide}
                        className="absolute right-1 sm:right-4 z-10 p-2 sm:p-3 rounded-full bg-white shadow-lg hover:bg-gray-50 hover:shadow-xl transition-all duration-200 border border-gray-200 hidden xs:block"
                        aria-label="Próximo diseñador"
                    >
                        <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-[#0081a7]" />
                    </button>
                </div>

                {/** Dots indicators for small screens */}
                <div className="flex justify-center mt-6 sm:mt-8 space-x-2">
                    {designers.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${index === currentIndex
                                ? "bg-[#0081a7] shadow-md"
                                : "bg-gray-300 hover:bg-gray-400"
                                }`}
                            aria-label={`Ve a diseñador ${index + 1}`}
                        />
                    ))}
                </div>

                {/** Designer counter */}
                <div className="text-center mt-3 sm:mt-4">
                    <span className="text-sm text-gray-500">
                        {currentIndex + 1} de {designers.length}
                    </span>
                </div>

                {/** Mobile nav hint */}
                <div className="text-center mt-2 sm:hidden">
                    <span className="text-xs text-gray-400">
                        Desliza para navegar
                    </span>
                </div>
            </div>
        </div>
    );
}