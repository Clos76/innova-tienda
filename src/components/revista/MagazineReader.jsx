import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import HTMLFlipBook from "react-pageflip";
import { ChevronLeft, ChevronRight, Bookmark, BookmarkCheck, X, Eye } from "lucide-react";

export default function MagazineFlip() {
  const { slug } = useParams();
  const bookRef = useRef(null);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [bookmarks, setBookmarks] = useState([]);
  const [showBookmarkList, setShowBookmarkList] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Enhanced responsive sizing with better mobile handling
  const [bookSize, setBookSize] = useState({ width: 500, height: 700 });

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const isMobileScreen = screenWidth < 640; // Changed from 768 to 640 for better mobile detection
      const isTabletScreen = screenWidth >= 640 && screenWidth < 1024;

      setIsMobile(isMobileScreen);
      setIsTablet(isTabletScreen);

      let width, height;

      if (isMobileScreen) {
        // Mobile: single page view with better viewport usage
        const availableWidth = screenWidth - 16; // 8px padding on each side
        const availableHeight = screenHeight - 200; // Account for header and controls
        
        width = Math.min(availableWidth, 350);
        height = Math.min(width * 1.4, availableHeight);
        
        // Ensure minimum readable size
        if (height < 400) {
          height = 400;
          width = height / 1.4;
        }
      } else if (isTabletScreen) {
        // Tablet: spread view
        const availableWidth = screenWidth - 32;
        const availableHeight = screenHeight - 180;
        
        width = Math.min(availableWidth, 800);
        height = Math.min(width * 0.7, availableHeight);
      } else {
        // Desktop: full spread view
        const availableWidth = screenWidth - 48;
        const availableHeight = screenHeight - 160;
        
        width = Math.min(availableWidth, 1200);
        height = Math.min(width * 0.7, availableHeight);
      }

      setBookSize({ width, height });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Load images
  useEffect(() => {
    const images = allImages[slug];
    if (!images) return;

    const pageArray = Object.keys(images)
      .sort((a, b) => {
        const getNumber = (str) => parseInt(str.match(/(\d+)\.jpg$/)[1], 10);
        return getNumber(a) - getNumber(b);
      })
      .map((key) => images[key].default);

    setPages(pageArray);
  }, [slug]);

  // Load bookmarks from localStorage
  useEffect(() => {
    const savedBookmarks = localStorage.getItem(`magazine-bookmarks-${slug}`);
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }
  }, [slug]);

  // Save bookmarks to localStorage
  const saveBookmarks = (newBookmarks) => {
    setBookmarks(newBookmarks);
    localStorage.setItem(`magazine-bookmarks-${slug}`, JSON.stringify(newBookmarks));
  };

  const handleBookmark = () => {
    const pageToBookmark = currentPage;
    const existingIndex = bookmarks.findIndex(b => b.page === pageToBookmark);

    if (existingIndex >= 0) {
      const newBookmarks = bookmarks.filter((_, index) => index !== existingIndex);
      saveBookmarks(newBookmarks);
    } else {
      const newBookmark = {
        page: pageToBookmark,
        timestamp: Date.now(),
        title: `Page ${pageToBookmark + 1}`
      };
      const newBookmarks = [...bookmarks, newBookmark].sort((a, b) => a.page - b.page);
      saveBookmarks(newBookmarks);
    }
  };

  const goToBookmark = (page) => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flip(page);
      setShowBookmarkList(false);
    }
  };

  const removeBookmark = (indexToRemove) => {
    const newBookmarks = bookmarks.filter((_, index) => index !== indexToRemove);
    saveBookmarks(newBookmarks);
  };

  const isCurrentPageBookmarked = bookmarks.some(b => b.page === currentPage);

  const handlePrevPage = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipPrev();
    }
  };

  const handleNextPage = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipNext();
    }
  };

  if (!pages.length) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-slate-600 mx-auto mb-4"></div>
          <p className="text-slate-700 text-base sm:text-lg">Loading magazine pages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="w-full px-2 sm:px-4 py-4 sm:py-6">
        <div className="flex flex-col items-center max-w-7xl mx-auto">

          {/* Magazine Header - More responsive */}
          <div className="w-full mb-4 sm:mb-6 text-center px-2">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 mb-2">
              Revistas Digital
            </h1>
            <p className="text-slate-600 text-sm sm:text-base break-words">
              Edición: {slug?.replace('-', ' ').toUpperCase()}
            </p>
            {!isMobile && (
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Vista de página doble. Haz clic en los bordes para navegar
              </p>
            )}

            {/* Back button - more responsive */}
            <div className="mt-4">
              <button className="bg-blue-400 hover:bg-blue-500 rounded-lg sm:rounded-xl text-white px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base lg:text-lg transition-all duration-200 hover:shadow-lg">
                <a href="/revista" className="block w-full h-full">
                  Regresar a ediciones
                </a>
              </button>
            </div>
          </div>

          {/* FlipBook Container - Better responsive handling */}
          <div className="relative mb-4 sm:mb-6 flex justify-center w-full">
            <div className="overflow-hidden" style={{ 
              maxWidth: '100vw',
              display: 'flex',
              justifyContent: 'center'
            }}>
              <HTMLFlipBook
                width={isMobile ? bookSize.width : bookSize.width / 2}
                height={bookSize.height}
                ref={bookRef}
                onFlip={(e) => setCurrentPage(e.data)}
                showCover={true}
                className="shadow-xl sm:shadow-2xl"
                size="fixed"
                minWidth={isMobile ? bookSize.width : bookSize.width / 2}
                maxWidth={isMobile ? bookSize.width : bookSize.width / 2}
                minHeight={bookSize.height}
                maxHeight={bookSize.height}
                drawShadow={true}
                flippingTime={600}
                usePortrait={isMobile}
                mobileScrollSupport={true}
                maxShadowOpacity={0.5}
                startPage={0}
                autoSize={false}
              >
                {pages.map((src, index) => (
                  <div
                    key={index}
                    className="page bg-white overflow-hidden"
                    style={{
                      margin: 0,
                      padding: 0,
                      border: "none",
                      boxShadow: "none",
                    }}
                  >
                    <img
                      src={src}
                      alt={`Page ${index + 1}`}
                      className="w-full h-full object-contain"
                      loading="lazy"
                      style={{ display: "block" }}
                    />
                  </div>
                ))}
              </HTMLFlipBook>
            </div>
          </div>

          {/* Enhanced Navigation Controls - Better mobile layout */}
          <div className="w-full max-w-2xl px-2">
            {/* Main Navigation */}
            <div className="flex items-center justify-between bg-white rounded-lg shadow-md p-2 sm:p-4 mb-3 sm:mb-4">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 0}
                className="flex items-center justify-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 bg-slate-600 text-white rounded-md sm:rounded-lg hover:bg-slate-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors duration-200 min-w-0 flex-shrink-0"
              >
                <ChevronLeft size={isMobile ? 14 : 20} />
                <span className="hidden sm:inline text-sm sm:text-base">Previo</span>
              </button>

              <div className="text-center flex-1 mx-2 sm:mx-4 min-w-0">
                <div className="text-xs sm:text-sm lg:text-base font-medium text-slate-800 truncate">
                  Página {currentPage + 1} de {pages.length}
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 sm:h-2 mt-1 sm:mt-2">
                  <div
                    className="bg-slate-600 h-1.5 sm:h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentPage + 1) / pages.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <button
                onClick={handleNextPage}
                disabled={currentPage === pages.length - 1}
                className="flex items-center justify-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 bg-slate-600 text-white rounded-md sm:rounded-lg hover:bg-slate-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors duration-200 min-w-0 flex-shrink-0"
              >
                <span className="hidden sm:inline text-sm sm:text-base">Próximo</span>
                <ChevronRight size={isMobile ? 14 : 20} />
              </button>
            </div>

            {/* Enhanced Bookmark Controls - Better mobile layout */}
            <div className="bg-white rounded-lg shadow-md p-2 sm:p-4">
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <div className="flex items-center space-x-1 sm:space-x-2 min-w-0">
                  {isCurrentPageBookmarked ? (
                    <BookmarkCheck className="text-amber-500 flex-shrink-0" size={isMobile ? 16 : 20} />
                  ) : (
                    <Bookmark className="text-slate-400 flex-shrink-0" size={isMobile ? 16 : 20} />
                  )}
                  <span className="text-xs sm:text-sm lg:text-base font-medium text-slate-700 truncate">
                    Marcador ({bookmarks.length})
                  </span>
                </div>

                <div className="flex space-x-1 sm:space-x-2 flex-shrink-0">
                  <button
                    onClick={handleBookmark}
                    className={`px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm rounded-md transition-colors duration-200 ${
                      isCurrentPageBookmarked
                        ? "bg-red-100 text-red-700 hover:bg-red-200"
                        : "bg-amber-100 text-amber-700 hover:bg-amber-200"
                    }`}
                  >
                    {isCurrentPageBookmarked ? "Quitar" : "Agregar"}
                  </button>

                  {bookmarks.length > 0 && (
                    <button
                      onClick={() => setShowBookmarkList(!showBookmarkList)}
                      className="flex items-center space-x-1 px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors duration-200"
                    >
                      <Eye size={isMobile ? 12 : 14} />
                      <span className="hidden sm:inline">{showBookmarkList ? "Ocultar" : "Ver"}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Bookmark List - Mobile optimized */}
              {showBookmarkList && bookmarks.length > 0 && (
                <div className="border-t pt-2 sm:pt-3">
                  <div className="max-h-32 sm:max-h-40 overflow-y-auto">
                    <div className="space-y-1 sm:space-y-2">
                      {bookmarks.map((bookmark, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-1.5 sm:p-2 bg-slate-50 rounded-md hover:bg-slate-100 transition-colors duration-200"
                        >
                          <button
                            onClick={() => goToBookmark(bookmark.page)}
                            className="flex items-center space-x-1 sm:space-x-2 text-left flex-1 min-w-0"
                          >
                            <BookmarkCheck className="text-amber-500 flex-shrink-0" size={isMobile ? 12 : 16} />
                            <div className="min-w-0 flex-1">
                              <div className="text-xs sm:text-sm font-medium text-slate-700 truncate">
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
                            <X size={isMobile ? 12 : 14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {bookmarks.length > 3 && (
                    <div className="text-xs text-slate-500 text-center mt-1 sm:mt-2">
                      Desplázate para ver todos los marcadores
                    </div>
                  )}
                </div>
              )}

              {bookmarks.length === 0 && showBookmarkList && (
                <div className="border-t pt-2 sm:pt-3 text-center text-xs sm:text-sm text-slate-500">
                  Aún no hay marcadores. Haz clic en «Agregar» para marcar esta página.
                </div>
              )}
            </div>
          </div>

          {/* Instructions - More responsive */}
          <div className="mt-3 sm:mt-4 text-center px-4 max-w-sm sm:max-w-md">
            {isMobile ? (
              <div className="text-xs sm:text-sm text-slate-500">
                💡 Tip: toca los bordes de las páginas para pasar, o usa los botones de navegación.
              </div>
            ) : (
              <div className="text-xs sm:text-sm text-slate-500">
                📖 Haz clic en los bordes de la página o usa las flechas del teclado para navegar.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}