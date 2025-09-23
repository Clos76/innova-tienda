import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Calendar, Eye, Download } from 'lucide-react';
import Footer from '../footer';
import MAGAZINES from './data/magazines';
import MagazineCover from './data/magazineCover';

// Memoized MagazineCard to prevent unnecessary re-renders
const MagazineCard = React.memo(({ magazine, isCompact = false, handleReadMagazine, handleDownloadMagazine }) => {
    if (isCompact) {
        return (
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
                <div className="relative w-full h-110 overflow-hidden rounded-t-xl bg-white pt-4 pb-4">
                    <div 
                        className="w-full h-full flex items-center justify-center"
                        onClick={() => handleReadMagazine(magazine)}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="w-full h-full [&>div]:w-full [&>div]:h-full [&>div]:flex [&>div]:items-center [&>div]:justify-center [&_canvas]:max-w-none [&_canvas]:w-full [&_canvas]:h-full [&_canvas]:object-cover">
                            <MagazineCover 
                                slug={magazine.slug} 
                                className="w-full h-full"
                                width={340}
                            />
                        </div>
                    </div>
                    {magazine.featured && (
                        <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full z-10">
                            Featured
                        </span>
                    )}
                </div>

                <div className="p-4">
                    <h4 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem] flex justify-center">
                        {magazine.titleMain}
                    </h4>

                    <div className="flex items-center justify-center text-gray-500 text-sm mb-3 ">
                        <Calendar className="w-4 h-4 mr-1 flex-shrink-0" />
                        <span className="truncate">{magazine.date}</span>
                    </div>

                    <div className="flex space-x-2">
                        {/* Show read button if magazine has path or embedUrl */}
                        {(magazine.path || magazine.embedUrl) && (
                            <button
                                onClick={() => handleReadMagazine(magazine)}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center"
                            >
                                <Eye className="w-4 h-4 mr-1" /> Leer
                            </button>
                        )}
                        {magazine.downloadUrl && magazine.downloadUrl !== "#" && (
                            <button
                                onClick={() => handleDownloadMagazine(magazine)}
                                className="p-2 border border-gray-300 hover:border-gray-400 text-gray-700 rounded-lg transition-colors duration-200 flex-shrink-0"
                            >
                                <Download className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // Regular card for main grid
    return (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden mb-6">
            <div className="flex flex-col sm:flex-row">
                <div className="sm:w-3/6 flex-shrink-0 relative overflow-hidden rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none">
                    <div className="w-full h-64 sm:h-full [&>div]:w-full [&>div]:h-full [&>div]:flex [&>div]:items-center [&>div]:justify-center [&_canvas]:max-w-none [&_canvas]:w-full [&_canvas]:h-full [&_canvas]:object-cover [&>div>p]:hidden">
                        {/* [&>div>p]:hidden hides the duplicate magazine title from MagazineCover component */}
                        <MagazineCover slug={magazine.slug} width={280} />
                    </div>
                </div>
                <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-gray-900 leading-tight">
                            {magazine.title}
                        </h3>
                        {magazine.featured && (
                            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full ml-2 flex-shrink-0">
                                Featured
                            </span>
                        )}
                    </div>

                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">{magazine.description}</p>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center text-gray-500 text-sm">
                            <Calendar className="w-4 h-4 mr-1" /> {magazine.date}
                        </div>

                        <div className="flex space-x-2">
                            {/* Show read button if magazine has path or embedUrl */}
                            {(magazine.path || magazine.embedUrl) && (
                                <button
                                    onClick={() => handleReadMagazine(magazine)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center"
                                >
                                    <Eye className="w-4 h-4 mr-1" /> Leer
                                </button>
                            )}
                            {magazine.downloadUrl && magazine.downloadUrl !== "#" && (
                                <button
                                    onClick={() => handleDownloadMagazine(magazine)}
                                    className="border border-gray-300 hover:border-gray-400 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center"
                                >
                                    <Download className="w-4 h-4 mr-1" /> Descargar
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

const MagazineSection = () => {
    const navigate = useNavigate();
    const carouselRef = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [carouselSettings, setCarouselSettings] = useState({ itemsToShow: 3, itemsToScroll: 1 });

    //this is from old allMagazines, now created a component named magazines.jsx where all mags are at.
    const allMagazines = Object.entries(MAGAZINES).map(([slug, data], index) => ({
        id: index + 1,
        slug,
        ...data,
    }));

    const topMagazines = allMagazines.slice(0, 6);
    const carouselMagazines = allMagazines.slice(6);

    const handleReadMagazine = (magazine) => navigate(`/revista/${magazine.slug}`);
    const handleDownloadMagazine = (magazine) => {
        if (magazine.downloadUrl && magazine.downloadUrl !== "#") {
            window.open(magazine.downloadUrl, '_blank');
        }
    };

    // Debounced resize handler
    const handleResize = useCallback(() => {
        const width = window.innerWidth;
        if (width < 640) setCarouselSettings({ itemsToShow: 1, itemsToScroll: 1 });
        else if (width < 1024) setCarouselSettings({ itemsToShow: 2, itemsToScroll: 1 });
        else setCarouselSettings({ itemsToShow: 3, itemsToScroll: 1 });
    }, []);

    useEffect(() => {
        handleResize();
        let timeout;
        const resizeListener = () => {
            clearTimeout(timeout);
            timeout = setTimeout(handleResize, 150);
        };
        window.addEventListener('resize', resizeListener);
        return () => window.removeEventListener('resize', resizeListener);
    }, [handleResize]);

    // Carousel navigation using ref
    useEffect(() => {
        if (carouselRef.current) {
            const translateX = -(currentSlide * (100 / carouselSettings.itemsToShow));
            carouselRef.current.style.transform = `translateX(${translateX}%)`;
        }
    }, [currentSlide, carouselSettings.itemsToShow]);

    const nextSlide = () => {
        const maxSlide = Math.max(0, carouselMagazines.length - carouselSettings.itemsToShow);
        setCurrentSlide((prev) => (prev + carouselSettings.itemsToScroll > maxSlide ? 0 : prev + carouselSettings.itemsToScroll));
    };

    const prevSlide = () => {
        const maxSlide = Math.max(0, carouselMagazines.length - carouselSettings.itemsToShow);
        setCurrentSlide((prev) => (prev - carouselSettings.itemsToScroll < 0 ? maxSlide : prev - carouselSettings.itemsToScroll));
    };

    const totalSlides = Math.ceil(carouselMagazines.length / carouselSettings.itemsToShow);
    const currentSlideIndex = Math.floor(currentSlide / carouselSettings.itemsToScroll);

    const leftColumn = topMagazines.filter((_, index) => index % 2 === 0);
    const rightColumn = topMagazines.filter((_, index) => index % 2 === 1);

    return (
        <section className="py-12 bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Revistas Digitales</h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Mantente informado con nuestras últimas publicaciones...
                    </p>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Da click a la imagen para leer revista
                    </p>
                </div>

                {/* Top 6 Magazines */}
                <div className="mb-16">
                    <div className="lg:hidden">
                        {topMagazines.map((magazine) => (
                            <MagazineCard
                                key={magazine.id}
                                magazine={magazine}
                                handleReadMagazine={handleReadMagazine}
                                handleDownloadMagazine={handleDownloadMagazine}
                            />
                        ))}
                    </div>
                    <div className="hidden lg:grid lg:grid-cols-2 lg:gap-8">
                        <div>{leftColumn.map((m) => <MagazineCard key={m.id} magazine={m} handleReadMagazine={handleReadMagazine} handleDownloadMagazine={handleDownloadMagazine} />)}</div>
                        <div>{rightColumn.map((m) => <MagazineCard key={m.id} magazine={m} handleReadMagazine={handleReadMagazine} handleDownloadMagazine={handleDownloadMagazine} />)}</div>
                    </div>
                </div>

                {/* Carousel - FIXED VERSION */}
                {carouselMagazines.length > 0 && (
                    <div className="mb-12">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl font-bold text-gray-900">Ediciones Anteriores</h3>
                            <div className="flex space-x-2">
                                <button onClick={prevSlide} className="p-2 rounded-full bg-white shadow-md hover:shadow-lg text-gray-600 hover:text-gray-800 transition-all duration-200"><ChevronLeft className="w-5 h-5" /></button>
                                <button onClick={nextSlide} className="p-2 rounded-full bg-white shadow-md hover:shadow-lg text-gray-600 hover:text-gray-800 transition-all duration-200"><ChevronRight className="w-5 h-5" /></button>
                            </div>
                        </div>

                        <div className="overflow-hidden rounded-lg">
                            <div 
                                ref={carouselRef} 
                                className="flex transition-transform duration-300 ease-in-out"
                                style={{ 
                                    gap: '1rem', // 16px gap between cards
                                    paddingLeft: '0.5rem', // Small padding to prevent edge cut-off
                                    paddingRight: '0.5rem'
                                }}
                            >
                                {carouselMagazines.map((magazine, index) => (
                                    <div
                                        key={`${magazine.id}-${index}`}
                                        className="flex-shrink-0"
                                        style={{ 
                                            width: `calc(${100 / carouselSettings.itemsToShow}% - ${(carouselSettings.itemsToShow - 1) * 16 / carouselSettings.itemsToShow}px)`
                                        }}
                                    >
                                        <MagazineCard
                                            magazine={magazine}
                                            isCompact
                                            handleReadMagazine={handleReadMagazine}
                                            handleDownloadMagazine={handleDownloadMagazine}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-center mt-6 space-x-2">
                            {Array.from({ length: totalSlides }, (_, i) => (
                                <button key={i} onClick={() => setCurrentSlide(i * carouselSettings.itemsToScroll)}
                                    className={`w-3 h-3 rounded-full transition-all duration-200 ${currentSlideIndex === i ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'}`} />
                            ))}
                        </div>
                    </div>
                )}

                <div className="text-center mb-6">
                    <a href="/innova-shop" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 hover:shadow-lg transform hover:-translate-y-1 inline-block">
                        Regresar a Tienda
                    </a>
                </div>
            </div>
            <Footer />
        </section>
    );
};

export default MagazineSection;