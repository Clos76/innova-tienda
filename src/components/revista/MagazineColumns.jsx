import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Calendar, Eye, Download } from 'lucide-react';

const MagazineSection = () => {
    const navigate = useNavigate();
    const [magazineCovers, setMagazineCovers] = useState({});
    const [currentSlide, setCurrentSlide] = useState(0);

    // Import all magazine cover images
    const allImages = {
        "mayo-2025": import.meta.glob("/src/assets/revista/mayo-2025/*.jpg", { eager: true }),
        "marzo-2025": import.meta.glob("/src/assets/revista/marzo-2025.pdf/*.jpg", { eager: true }),
        "febrero-2025": import.meta.glob("/src/assets/revista/febrero-2025/*.jpg", { eager: true }),
        "diciembre-2024": import.meta.glob("/src/assets/revista/diciembre-2024/*.jpg", { eager: true }),
        "julio-2024": import.meta.glob("/src/assets/revista/julio-2024/*.jpg", { eager: true }),
        "junio-2024": import.meta.glob("/src/assets/revista/junio-2024/*.jpg", { eager: true }),
        "mayo-2024": import.meta.glob("/src/assets/revista/mayo-2024/*.jpg", { eager: true }),
        "marzo-2024": import.meta.glob("/src/assets/revista/marzo-2024/*.jpg", { eager: true }),
        "febrero-2024": import.meta.glob("/src/assets/revista/febrero-2024/*.jpg", { eager: true }),
        "diciembre-2023": import.meta.glob("/src/assets/revista/diciembre-2023/*.jpg", { eager: true }),
        "noviembre-2023": import.meta.glob("/src/assets/revista/noviembre-2023/*.jpg", { eager: true }),
        "enero-2024": import.meta.glob("/src/assets/revista/enero-2024/*.jpg", { eager: true }),
        "abril-2024": import.meta.glob("/src/assets/revista/abril-2024/*.jpg", { eager: true }),

    };

    // Load magazine covers
    useEffect(() => {
        const loadCovers = () => {
            const covers = {};

            Object.keys(allImages).forEach(slug => {
                try {
                    const images = allImages[slug];
                    if (images && Object.keys(images).length > 0) {
                        const sortedKeys = Object.keys(images).sort((a, b) => {
                            const getNumber = (str) => parseInt(str.match(/(\d+)\.jpg$/)?.[1] || "0", 10);
                            return getNumber(a) - getNumber(b);
                        });

                        if (sortedKeys.length > 0) {
                            covers[slug] = images[sortedKeys[0]].default;
                        }
                    }
                } catch (error) {
                    console.error(`Error loading cover for ${slug}:`, error);
                }
            });

            setMagazineCovers(covers);
        };

        loadCovers();
    }, []);

    // Full magazine data
    const allMagazines = [
        {
            id: 1,
            slug: "mayo-2025",
            title: "Innovamoda Fashion Magazine Mayo",
            description: "Es la revista digital de InnovaModa, un espacio dedicado a resaltar el talento, la creatividad y la innovación de la industria de la moda.",
            date: "Mayo 2025",
            image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop",
            embedUrl: "https://innovamoda.org/3d-flip-book/mayo-2025/#mayo-2025/1/",
            featured: true
        },
        {
            id: 2,
            slug: "marzo-2025",
            title: "Innova Fashion Magazine Marzo",
            description: "Meet the amazing volunteers who dedicate their time and energy to making our mission possible. Stories of inspiration and dedication.",
            date: "Marzo 2025",
            image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=300&fit=crop",
            embedUrl: "https://innovamoda.org/3d-flip-book/marzo-2025/#marzo-2025/1/",
        },
        {
            id: 3,
            slug: "febrero-2025",
            title: "Innova Fashion Magazine Febrero",
            description: "Es un placer darles la bienvenida a una nueva edición de Innovamoda Fashion Magazine, donde celebramos el estilo, la creatividad y las tendencias que nos inspiran cada día.",
            date: "Febrero 2025",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
            downloadUrl: "#",
            embedUrl: "https://innovamoda.org/3d-flip-book/febrero-2025/#febrero-2025/1/",
        },
        {
            id: 4,
            slug: "diciembre-2024",
            title: "Innova Fashion Magazine Samantha Ayala",
            description: "A nuestra comunidad de Innovamoda: Con profunda gratitud y emoción, queremos dedicar estas palabras a todas las personas que hicieron posible la realización de Innovamoda Fashion Experience.",
            date: "Diciembre 2024",
            image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
            downloadUrl: "#",
            embedUrl: "https://innovamoda.org/3d-flip-book/diciembre-2024/#diciembre-2024/1/",
        },
        {
            id: 5,
            slug: "julio-2024",
            title: "Descubre Isadora Villalvazo",
            description: "En esta edición de Julio, hemos preparado contenido exclusivo que captura la esencia del verano y la vibrante creatividad de la temporada.",
            date: "Julio 2024",
            image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&h=300&fit=crop",
            downloadUrl: "#",
            embedUrl: "https://innovamoda.org/3d-flip-book/julio-2024/#julio-2024/1/",
        },
        {
            id: 6,
            slug: "junio-2024",
            title: "El Estudio, un colectivo liderado por mujeres emprendedoras",
            description: "Estamos llenos de alegría al celebrar nuestro primer aniversario. Ha sido un año emocionante, lleno de moda, estilo y tendencias…",
            date: "Junio 2024",
            image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=300&fit=crop",
            downloadUrl: "#",
            embedUrl: "https://innovamoda.org/3d-flip-book/junio-2024/#junio-2024/1/",
        },
        {
            id: 7,
            slug: "mayo-2024",
            title: "Innovación y Creatividad Mayo",
            description: "Una edición especial dedicada a la innovación y creatividad en el mundo de la moda, explorando nuevas tendencias y técnicas.",
            date: "Mayo 2024",
            image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop",
            downloadUrl: "#",
            embedUrl: "https://innovamoda.org/3d-flip-book/mayo-2024/#mayo-2024/1/",
        },
        {
            id: 8,
            slug: "abril-2024",
            title: "Primavera Fashion Collection",
            description: "Descubre las últimas colecciones de primavera y las tendencias que marcarán la temporada. Una edición llena de color y frescura.",
            date: "Abril 2024",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
            downloadUrl: "#",
            embedUrl: "https://innovamoda.org/3d-flip-book/abril-2024/#abril-2024/1/",
        },
        {
            id: 9,
            slug: "marzo-2024",
            title: "Mujeres en la Moda",
            description: "Un homenaje a las mujeres que han transformado la industria de la moda, sus historias de éxito y su impacto en la comunidad.",
            date: "Marzo 2024",
            image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
            downloadUrl: "#",
            embedUrl: "https://innovamoda.org/3d-flip-book/marzo-2024/#marzo-2024/1/",
        }

        ,
        {
            id: 10,
            slug: "febrero-2024",
            title: "El Estudio, un colectivo liderado por mujeres emprendedoras",
            description: "Estamos llenos de alegría al celebrar nuestro primer aniversario. Ha sido un año emocionante, lleno de moda, estilo y tendencias…",
            date: "Febrero 2024",
            image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=300&fit=crop",
            downloadUrl: "#",
            embedUrl: "https://innovamoda.org/3d-flip-book/junio-2024/#junio-2024/1/",
        },
        {
            id: 11,
            slug: "enero-2024",
            title: "Innovación y Creatividad Mayo",
            description: "Una edición especial dedicada a la innovación y creatividad en el mundo de la moda, explorando nuevas tendencias y técnicas.",
            date: "Enero 2024",
            image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop",
            downloadUrl: "#",
            embedUrl: "https://innovamoda.org/3d-flip-book/mayo-2024/#mayo-2024/1/",
        },
        {
            id: 12,
            slug: "diciembre-2023",
            title: "Primavera Fashion Collection",
            description: "Descubre las últimas colecciones de primavera y las tendencias que marcarán la temporada. Una edición llena de color y frescura.",
            date: "Diciembre 2023",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
            downloadUrl: "#",
            embedUrl: "https://innovamoda.org/3d-flip-book/abril-2024/#abril-2024/1/",
        },
        {
            id: 13,
            slug: "noviembre-2023",
            title: "Mujeres en la Moda",
            description: "Un homenaje a las mujeres que han transformado la industria de la moda, sus historias de éxito y su impacto en la comunidad.",
            date: "Noviembre 2023",
            image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
            downloadUrl: "#",
            embedUrl: "https://innovamoda.org/3d-flip-book/marzo-2024/#marzo-2024/1/",
        }
    ];

    // Split magazines: top 6 and remaining for carousel
    const topMagazines = allMagazines.slice(0, 6);
    const carouselMagazines = allMagazines.slice(6);

    const handleReadMagazine = (magazine) => {
        if (magazine.embedUrl) {
            navigate(`/revista/${magazine.slug}`);
        }
    };

    const handleDownloadMagazine = (magazine) => {
        if (magazine.downloadUrl && magazine.downloadUrl !== "#") {
            window.open(magazine.downloadUrl, '_blank');
        }
    };

    // Responsive carousel settings
    const [carouselSettings, setCarouselSettings] = useState({
        itemsToShow: 3,
        itemsToScroll: 1
    });

    useEffect(() => {
        const updateCarouselSettings = () => {
            const width = window.innerWidth;
            if (width < 640) {
                setCarouselSettings({ itemsToShow: 1, itemsToScroll: 1 });
            } else if (width < 1024) {
                setCarouselSettings({ itemsToShow: 2, itemsToScroll: 1 });
            } else {
                setCarouselSettings({ itemsToShow: 3, itemsToScroll: 1 });
            }
        };

        updateCarouselSettings();
        window.addEventListener('resize', updateCarouselSettings);
        return () => window.removeEventListener('resize', updateCarouselSettings);
    }, []);

    // Carousel navigation
    const nextSlide = () => {
        const maxSlide = Math.max(0, carouselMagazines.length - carouselSettings.itemsToShow);
        setCurrentSlide((prev) => {
            const nextSlide = prev + carouselSettings.itemsToScroll;
            return nextSlide > maxSlide ? 0 : nextSlide;
        });
    };

    const prevSlide = () => {
        const maxSlide = Math.max(0, carouselMagazines.length - carouselSettings.itemsToShow);
        setCurrentSlide((prev) => {
            const prevSlideVal = prev - carouselSettings.itemsToScroll;
            return prevSlideVal < 0 ? maxSlide : prevSlideVal;
        });
    };

    // Calculate how many slides we have
    const totalSlides = Math.ceil(carouselMagazines.length / carouselSettings.itemsToShow);
    const currentSlideIndex = Math.floor(currentSlide / carouselSettings.itemsToScroll);

    const MagazineCard = ({ magazine, isCompact = false }) => {
        const coverImage = magazineCovers[magazine.slug] || magazine.image;

        if (isCompact) {
            // Compact card for carousel
            return (
                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
                    <div className="relative">
                        <img
                            src={coverImage}
                            alt={magazine.title}
                            className="w-full h-130 object-cover"
                            onError={(e) => {
                                e.target.src = magazine.image;
                            }}
                        />
                        {magazine.featured && (
                            <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                                Featured
                            </span>
                        )}
                    </div>

                    <div className="p-4">
                        <h4 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
                            {magazine.title}
                        </h4>

                        <div className="flex items-center text-gray-500 text-sm mb-3">
                            <Calendar className="w-4 h-4 mr-1 flex-shrink-0" />
                            <span className="truncate">{magazine.date}</span>
                        </div>

                        <div className="flex space-x-2">
                            {magazine.embedUrl && (
                                <button
                                    onClick={() => handleReadMagazine(magazine)}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center"
                                >
                                    <Eye className="w-4 h-4 mr-1" />
                                    Leer
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
                    <div className="sm:w-2/5 flex-shrink-0">
                        <img
                            src={coverImage}
                            alt={magazine.title}
                            className="w-full h-48 sm:h-full object-cover"
                            onError={(e) => {
                                e.target.src = magazine.image;
                            }}
                        />
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

                        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                            {magazine.description}
                        </p>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center text-gray-500 text-sm">
                                <Calendar className="w-4 h-4 mr-1" />
                                {magazine.date}
                            </div>

                            <div className="flex space-x-2">
                                {magazine.embedUrl && (
                                    <button
                                        onClick={() => handleReadMagazine(magazine)}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center"
                                    >
                                        <Eye className="w-4 h-4 mr-1" />
                                        Leer
                                    </button>
                                )}
                                {magazine.downloadUrl && magazine.downloadUrl !== "#" && (
                                    <button
                                        onClick={() => handleDownloadMagazine(magazine)}
                                        className="border border-gray-300 hover:border-gray-400 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center"
                                    >
                                        <Download className="w-4 h-4 mr-1" />
                                        Descargar
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // Split top magazines into two columns for desktop
    const leftColumn = topMagazines.filter((_, index) => index % 2 === 0);
    const rightColumn = topMagazines.filter((_, index) => index % 2 === 1);

    return (
        <section className="py-12 bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Revistas Digitales
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Mantente informado con nuestras últimas publicaciones, que incluyen historias de la comunidad,
                        informes de impacto y perspectivas sobre nuestra misión en curso.
                    </p>
                </div>

                {/* Top 6 Magazines */}
                <div className="mb-16">
                    {/* Mobile Layout - Single Column */}
                    <div className="lg:hidden">
                        {topMagazines.map((magazine) => (
                            <MagazineCard key={magazine.id} magazine={magazine} />
                        ))}
                    </div>

                    {/* Desktop Layout - Two Columns */}
                    <div className="hidden lg:grid lg:grid-cols-2 lg:gap-8">
                        {/* Left Column */}
                        <div>
                            {leftColumn.map((magazine) => (
                                <MagazineCard key={magazine.id} magazine={magazine} />
                            ))}
                        </div>

                        {/* Right Column */}
                        <div>
                            {rightColumn.map((magazine) => (
                                <MagazineCard key={magazine.id} magazine={magazine} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Carousel Section for Remaining Magazines */}
                {carouselMagazines.length > 0 && (
                    <div className="mb-12">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl font-bold text-gray-900">
                                Ediciones Anteriores
                            </h3>
                            <div className="flex space-x-2">
                                <button
                                    onClick={prevSlide}
                                    className="p-2 rounded-full bg-white shadow-md hover:shadow-lg text-gray-600 hover:text-gray-800 transition-all duration-200"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={nextSlide}
                                    className="p-2 rounded-full bg-white shadow-md hover:shadow-lg text-gray-600 hover:text-gray-800 transition-all duration-200"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Carousel */}
                        <div className="overflow-hidden rounded-lg">
                            <div
                                className="flex transition-transform duration-300 ease-in-out gap-4"
                                style={{
                                    transform: `translateX(-${currentSlide * (100 / carouselSettings.itemsToShow)}%)`,
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
                                        <MagazineCard magazine={magazine} isCompact={true} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Carousel Indicators */}
                        <div className="flex justify-center mt-6 space-x-2">
                            {Array.from({ length: totalSlides }, (_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentSlide(i * carouselSettings.itemsToScroll)}
                                    className={`w-3 h-3 rounded-full transition-all duration-200 ${currentSlideIndex === i ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'
                                        }`}
                                />
                            ))}
                        </div>

                        {/* Carousel Info */}
                        <div className="text-center mt-3 text-sm text-gray-500">
                            Mostrando {Math.min(currentSlide + carouselSettings.itemsToShow, carouselMagazines.length)} de {carouselMagazines.length} ediciones anteriores
                        </div>
                    </div>
                )}

                {/* Back to Store Button */}
                <div className="text-center">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 hover:shadow-lg transform hover:-translate-y-1">
                        <a href="/innova-shop">Regresar a Tienda</a>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default MagazineSection;