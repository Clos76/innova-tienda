import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard } from "swiper/modules";
import { Bookmark, BookmarkCheck, X, Eye } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Footer from "../footer";

const allImages = {
  "mayo-2025": import.meta.glob("/src/assets/revista/mayo-2025/*.jpg", { eager: true }),
  "marzo-2025": import.meta.glob("/src/assets/revista/marzo-2025.pdf/*.jpg", { eager: true }),
  "febrero-2025": import.meta.glob("/src/assets/revista/febrero-2025/*.jpg", { eager: true }),
  "diciembre-2024": import.meta.glob("/src/assets/revista/diciembre-2024/*.jpg", { eager: true }),
  "julio-2024": import.meta.glob("/src/assets/revista/julio-2024/*.jpg", { eager: true }),
  "junio-2024": import.meta.glob("/src/assets/revista/junio-2024/*.jpg", { eager: true }),
  "mayo-2024": import.meta.glob("/src/assets/revista/mayo-2024/*.jpg", { eager: true }),
  "abril-2024": import.meta.glob("/src/assets/revista/abril-2024/*.jpg", { eager: true }),
  "marzo-2024": import.meta.glob("/src/assets/revista/marzo-2024/*.jpg", { eager: true }),
  "febrero-2024": import.meta.glob("/src/assets/revista/febrero-2024/*.jpg", { eager: true }),
  "enero-2024": import.meta.glob("/src/assets/revista/enero-2024/*.jpg", { eager: true }),
  "diciembre-2023": import.meta.glob("/src/assets/revista/diciembre-2023/*.jpg", { eager: true }),
  "noviembre-2023": import.meta.glob("/src/assets/revista/noviembre-2023/*.jpg", { eager: true }),
};

export default function MagazineSwiper() {
  const { slug } = useParams();
  const swiperRef = useRef(null);
  const [pages, setPages] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showBookmarkList, setShowBookmarkList] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load images
  useEffect(() => {
    try {
      const images = allImages[slug];
      if (!images) {
        setIsLoading(false);
        return;
      }

      const pageArray = Object.keys(images)
        .sort((a, b) => {
          const getNumber = (str) => parseInt(str.match(/(\d+)\.jpg$/)?.[1] || "0", 10);
          return getNumber(a) - getNumber(b);
        })
        .map((key) => images[key].default);

      setPages(pageArray);
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading images:", error);
      setIsLoading(false);
    }
  }, [slug]);

  // Load bookmarks
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`magazine-bookmarks-${slug}`);
      if (saved) setBookmarks(JSON.parse(saved));
    } catch (error) {
      console.error("Error loading bookmarks:", error);
    }
  }, [slug]);

  // Create slide groups: first page alone, then pairs
  const createSlideGroups = () => {
    if (!pages.length) return [];

    const groups = [];

    // First slide: cover page only
    groups.push([{ src: pages[0], pageNum: 1 }]);

    // Remaining slides: pairs of pages
    for (let i = 1; i < pages.length; i += 2) {
      const group = [{ src: pages[i], pageNum: i + 1 }];
      if (i + 1 < pages.length) {
        group.push({ src: pages[i + 1], pageNum: i + 2 });
      }
      groups.push(group);
    }

    return groups;
  };

  const slideGroups = createSlideGroups();

  // Get current page numbers being displayed
  const getCurrentPageInfo = () => {
    if (slideGroups.length === 0 || currentSlide >= slideGroups.length) {
      return { start: 1, end: 1, isCover: true };
    }

    const group = slideGroups[currentSlide];
    const isCover = currentSlide === 0;

    if (isCover) {
      return { start: 1, end: 1, isCover: true };
    }

    const start = group[0].pageNum;
    const end = group.length === 2 ? group[1].pageNum : start;

    return { start, end, isCover: false };
  };

  const currentPageInfo = getCurrentPageInfo();

  const saveBookmarks = (newBookmarks) => {
    setBookmarks(newBookmarks);
    localStorage.setItem(`magazine-bookmarks-${slug}`, JSON.stringify(newBookmarks));
  };

  const toggleBookmark = () => {
    const pageToBookmark = currentPageInfo.start - 1; // Convert to 0-based index
    const exists = bookmarks.some((b) => b.page === pageToBookmark);

    if (exists) {
      saveBookmarks(bookmarks.filter((b) => b.page !== pageToBookmark));
    } else {
      const newBookmark = {
        page: pageToBookmark,
        timestamp: Date.now(),
        title: `Página ${pageToBookmark + 1}`
      };
      saveBookmarks([...bookmarks, newBookmark].sort((a, b) => a.page - b.page));
    }
  };

  const goToBookmark = (page) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      let slideIndex;

      if (page === 0) {
        slideIndex = 0; // Cover page
      } else {
        slideIndex = Math.floor((page - 1) / 2) + 1; // Calculate slide for page spreads
      }

      swiperRef.current.swiper.slideTo(slideIndex);
      setShowBookmarkList(false);
    }
  };

  const removeBookmark = (indexToRemove) => {
    saveBookmarks(bookmarks.filter((_, i) => i !== indexToRemove));
  };

  const isCurrentPageBookmarked = bookmarks.some((b) => b.page === (currentPageInfo.start - 1));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-slate-600 mx-auto mb-4"></div>
          <p className="text-slate-700 text-sm sm:text-lg">Cargando páginas de la revista...</p>
        </div>
      </div>
    );
  }

  if (!pages.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-slate-700 text-lg">No se encontraron páginas para esta edición.</p>
          <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
            <a href="/revista">Regresar a ediciones</a>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="w-full px-2 sm:px-4 py-4 sm:py-6">
        <div className="flex flex-col items-center max-w-6xl mx-auto">

          {/* Header */}
          <div className="w-full mb-4 sm:mb-6 text-center px-2">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 mb-2">
              Revistas Digital
            </h1>
            <p className="text-slate-600 text-sm sm:text-base">
              Edición: {slug?.replace('-', ' ').toUpperCase()}
            </p>

            <div className="mt-4">
              <button className="bg-blue-400 hover:bg-blue-500 rounded-lg text-white px-4 py-2 text-sm sm:text-base transition-all duration-200 hover:shadow-lg">
                <a href="/revista" className="block w-full h-full">
                  Regresar a ediciones
                </a>
              </button>
            </div>
          </div>

          {/* Swiper Container */}
          <div className="w-full max-w-6xl mb-4 sm:mb-6 relative">
            <Swiper
              ref={swiperRef}
              onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
              navigation={{
                prevEl: '.custom-prev',
                nextEl: '.custom-next',
              }}
              pagination={{
                type: "fraction",
                el: '.custom-pagination'
              }}
              keyboard={{
                enabled: true,
                onlyInViewport: true,
              }}
              spaceBetween={0}
              slidesPerView={1}
              modules={[Navigation, Pagination, Keyboard]}
              className="magazine-swiper"
              style={{
                '--swiper-navigation-color': '#475569',
                '--swiper-pagination-color': '#475569',
              }}
            >
              {slideGroups.map((group, slideIndex) => (
                <SwiperSlide key={slideIndex}>
                  <div className="flex justify-center items-stretch w-full max-w-4xl mx-auto">
                    {group.map((pageData, pageIndexInGroup) => {
                      const isLeftPage = pageIndexInGroup === 0;
                      const isCoverPage = slideIndex === 0;
                      const isSinglePage = group.length === 1;

                      return (
                        <div
                          key={pageData.pageNum}
                          className={`relative bg-white overflow-hidden aspect-[3/4] ${isCoverPage || isSinglePage
                            ? 'max-w-md mx-auto rounded-lg shadow-xl'
                            : isLeftPage
                              ? 'flex-1 rounded-l-lg'
                              : 'flex-1 rounded-r-lg'
                            }`}
                          style={{
                            boxShadow: isCoverPage || isSinglePage
                              ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                              : isLeftPage
                                ? '-4px 0 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.1)'
                                : '4px 0 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.1)'
                          }}
                        >
                          <img
                            src={pageData.src}
                            alt={`Página ${pageData.pageNum}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />

                          {/* Page number indicator */}
                          <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                            {pageData.pageNum}
                          </div>

                          {/* Spine line removed - no more white line between pages */}
                        </div>
                      );
                    })}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Bookmark Button */}
            <button
              onClick={toggleBookmark}
              className={`absolute top-2 sm:top-4 right-2 sm:right-4 z-10 p-2 sm:p-3 rounded-full shadow-lg transition-all duration-200 ${isCurrentPageBookmarked
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-amber-500 hover:bg-amber-600 text-white"
                }`}
            >
              {isCurrentPageBookmarked ? (
                <BookmarkCheck size={16} />
              ) : (
                <Bookmark size={16} />
              )}
            </button>
          </div>

          {/* Custom Navigation and Controls */}
          <div className="w-full max-w-4xl space-y-3 sm:space-y-4 px-2">

            {/* Navigation Bar */}
            <div className="flex items-center justify-between bg-white rounded-lg shadow-md p-3 sm:p-4">
              <button className="custom-prev flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 bg-slate-600 text-white rounded-md hover:bg-slate-700 transition-colors duration-200">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15,18 9,12 15,6"></polyline>
                </svg>
                <span className="hidden sm:inline text-sm">Anterior</span>
              </button>

              <div className="flex flex-col items-center flex-1 mx-4">
                <div className="custom-pagination text-sm sm:text-base font-medium text-slate-800 mb-2"></div>
                <div className="text-xs text-slate-500 mb-1">
                  {currentPageInfo.isCover
                    ? "Portada"
                    : currentPageInfo.start === currentPageInfo.end
                      ? `Página ${currentPageInfo.start}`
                      : `Páginas ${currentPageInfo.start}-${currentPageInfo.end}`
                  }
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-slate-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentPageInfo.end / pages.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <button className="custom-next flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 bg-slate-600 text-white rounded-md hover:bg-slate-700 transition-colors duration-200">
                <span className="hidden sm:inline text-sm">Siguiente</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9,18 15,12 9,6"></polyline>
                </svg>
              </button>
            </div>

            {/* Bookmark Controls */}
            <div className="bg-white rounded-lg shadow-md p-3 sm:p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  {isCurrentPageBookmarked ? (
                    <BookmarkCheck className="text-amber-500" size={18} />
                  ) : (
                    <Bookmark className="text-slate-400" size={18} />
                  )}
                  <span className="text-sm sm:text-base font-medium text-slate-700">
                    Marcadores ({bookmarks.length})
                  </span>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={toggleBookmark}
                    className={`px-3 py-1.5 text-sm rounded-md transition-colors duration-200 ${isCurrentPageBookmarked
                      ? "bg-red-100 text-red-700 hover:bg-red-200"
                      : "bg-amber-100 text-amber-700 hover:bg-amber-200"
                      }`}
                  >
                    {isCurrentPageBookmarked ? "Quitar" : "Agregar"}
                  </button>

                  {bookmarks.length > 0 && (
                    <button
                      onClick={() => setShowBookmarkList(!showBookmarkList)}
                      className="flex items-center space-x-1 px-3 py-1.5 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors duration-200"
                    >
                      <Eye size={14} />
                      <span className="hidden sm:inline">{showBookmarkList ? "Ocultar" : "Ver"}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Bookmark List */}
              {showBookmarkList && bookmarks.length > 0 && (
                <div className="border-t pt-3">
                  <div className="max-h-40 overflow-y-auto">
                    <div className="space-y-2">
                      {bookmarks.map((bookmark, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 bg-slate-50 rounded-md hover:bg-slate-100 transition-colors duration-200"
                        >
                          <button
                            onClick={() => goToBookmark(bookmark.page)}
                            className="flex items-center space-x-2 text-left flex-1 min-w-0"
                          >
                            <BookmarkCheck className="text-amber-500 flex-shrink-0" size={16} />
                            <div className="min-w-0 flex-1">
                              <div className="text-sm font-medium text-slate-700">
                                Página {bookmark.page + 1}
                              </div>
                              <div className="text-xs text-slate-500 hidden sm:block">
                                {new Date(bookmark.timestamp).toLocaleDateString()}
                              </div>
                            </div>
                          </button>
                          <button
                            onClick={() => removeBookmark(index)}
                            className="p-1 text-slate-400 hover:text-red-500 transition-colors duration-200 flex-shrink-0"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {bookmarks.length > 3 && (
                    <div className="text-xs text-slate-500 text-center mt-2">
                      Desplázate para ver todos los marcadores
                    </div>
                  )}
                </div>
              )}

              {bookmarks.length === 0 && showBookmarkList && (
                <div className="border-t pt-3 text-center text-sm text-slate-500">
                  Aún no hay marcadores. Haz clic en «Agregar» para marcar esta página.
                </div>
              )}
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-4 text-center px-4 max-w-md">
            <div className="text-xs sm:text-sm text-slate-500">
              {currentPageInfo.isCover
                ? "📖 Portada de la revista. Haz clic en 'Siguiente' para ver páginas dobles"
                : "📖 Navega por páginas dobles usando las flechas o teclas ← →"
              }
            </div>
          </div>
        </div>

       
      </div>

      <style jsx>{`
        .magazine-swiper {
          width: 100%;
          height: auto;
        }
        
        .magazine-swiper .swiper-button-next,
        .magazine-swiper .swiper-button-prev {
          display: none !important;
        }
        
        .magazine-swiper .swiper-pagination {
          display: none !important;
        }

        .magazine-swiper .swiper-wrapper {
          align-items: center;
        }
        
        .magazine-swiper .swiper-slide {
          height: auto;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .magazine-swiper .swiper-slide img {
          display: block;
          width: 100%;
          height: auto;
          object-fit: cover;
          user-select: none;
          pointer-events: none;
        }

        /* Remove any potential overlays or hover effects */
        .magazine-swiper .swiper-slide::before,
        .magazine-swiper .swiper-slide::after {
          display: none !important;
        }
        
        .magazine-swiper .swiper-slide:hover::before,
        .magazine-swiper .swiper-slide:hover::after {
          display: none !important;
        }
        
        /* Disable any swiper overlays */
        .magazine-swiper .swiper-lazy-preloader,
        .magazine-swiper .swiper-slide-shadow,
        .magazine-swiper .swiper-slide-shadow-left,
        .magazine-swiper .swiper-slide-shadow-right {
          display: none !important;
        }
        
        /* Remove any cursor effects */
        .magazine-swiper .swiper-slide {
          cursor: default;
        }

        @media (max-width: 767px) {
          .magazine-swiper .swiper-slide img {
            max-height: 70vh;
            object-fit: contain;
          }
        }
      `}</style>

       <Footer/>
    </div>
  );
}