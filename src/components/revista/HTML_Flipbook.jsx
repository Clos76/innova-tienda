import { useState, useEffect, useCallback, useRef } from "react";
import React from "react";
import { Document, Page, pdfjs } from "react-pdf";
import HTMLFlipBook from "react-pageflip";
import {
  BookmarkIcon,
  ChevronDownIcon,
  HomeIcon,
  ArrowLeftIcon,
  Bookmark,
  BookmarkCheck,
  X,
  Eye,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import MAGAZINES from "./data/magazines";


// Worker config
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

// Available magazines


// ForwardRef component for flipbook pages
const FlipBookPage = React.forwardRef((props, ref) => (
  <div className={`page ${props.className || ""}`} ref={ref}>
    {props.children}
  </div>
));

const Book = () => {

  const [bookSize, setBookSize] = useState({ width: 400, height: 520 });
  const containerRef = useRef(null);
//loading section
  const [isLoading, setIsLoading] = useState(true);
 

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;

        let newWidth;
        if (containerWidth <= 325) {
          // small phones
          newWidth = 300;
        }
        else if (containerWidth <= 425) {
          // tablet breakpoint
          newWidth = 400;
        }
        else if (containerWidth <= 768) {
          // tablet breakpoint
          newWidth = 360;
        } else if (containerWidth <= 1024) {
          // tablet breakpoint
          newWidth = 470;
        }
        else {
          // desktops and bigger screens
          newWidth = 550;
        }

        const newHeight = Math.round(newWidth * 1.4); // keep aspect ratio
        setBookSize({ width: newWidth, height: newHeight });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const { slug } = useParams();
  const navigate = useNavigate();

  // Basic states
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [scale, setScale] = useState(1.0);

  // UI states
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [showMagazineList, setShowMagazineList] = useState(false);
  const [showBookmarkList, setShowBookmarkList] = useState(false);
  const flipBookRef = useRef(null);
  
  // NEW: Track expected page for bookmark navigation
  const expectedPageRef = useRef(null);
  const bookmarkNavigatingRef = useRef(false);

  // Magazine data
  const currentMagazine = MAGAZINES[slug] ? slug : "mayo-2025"; // fallback
  const magazineExists = MAGAZINES[currentMagazine];

  // Bookmarks state - using new array format like the Swiper version
  const [bookmarks, setBookmarks] = useState([]);
  const [bookmarksLoaded, setBookmarksLoaded] = useState(false);

  // Safe localStorage operations
  const loadBookmarks = useCallback(() => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        const savedBookmarks = localStorage.getItem(`magazine-bookmarks-${currentMagazine}`);
        if (savedBookmarks) {
          const parsed = JSON.parse(savedBookmarks);
          setBookmarks(Array.isArray(parsed) ? parsed : []);
        }
      }
    } catch (error) {
      console.error("Error loading bookmarks:", error);
    } finally {
      setBookmarksLoaded(true);
    }
  }, [currentMagazine]);

  const saveBookmarks = useCallback(
    (newBookmarks) => {
      try {
        if (
          typeof window !== "undefined" &&
          window.localStorage &&
          bookmarksLoaded
        ) {
          localStorage.setItem(
            `magazine-bookmarks-${currentMagazine}`,
            JSON.stringify(newBookmarks)
          );
        }
      } catch (error) {
        console.error("Error saving bookmarks:", error);
      }
    },
    [bookmarksLoaded, currentMagazine]
  );

  // Load bookmarks on component mount
  useEffect(() => {
    loadBookmarks();
  }, [loadBookmarks]);

  // Save bookmarks when they change (but only after initial load)
  useEffect(() => {
    if (bookmarksLoaded) {
      saveBookmarks(bookmarks);
    }
  }, [bookmarks, saveBookmarks, bookmarksLoaded]);

  // Responsive resize - ONLY mobile detection, keeping existing logic
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Reset states when magazine changes
  useEffect(() => {
    setNumPages(null);
    setCurrentPage(0);
    setShowBookmarks(false);
    setShowMagazineList(false);
    setShowBookmarkList(false);
    setBookmarks([]);
    expectedPageRef.current = null;
    bookmarkNavigatingRef.current = false;
    // Reset flipbook ref
    if (flipBookRef.current) {
      flipBookRef.current = null;
    }
  }, [currentMagazine]);

  // If magazine doesn't exist, show error message
  if (!magazineExists) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Revista no encontrada
          </h1>
          <p className="text-gray-600 mb-6">
            La revista "{currentMagazine}" no existe.
          </p>
          <button
            onClick={() => navigate("/revista")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Volver a Revistas
          </button>
        </div>
      </div>
    );
  }

  const renderPages = () => {
    if (!numPages) return [];

    const pages = [];
    for (let i = 1; i <= numPages; i++) {
      pages.push(
        <FlipBookPage
          key={`page_${i}`}
          className="bg-white flex items-center justify-center"
        >
          <Page
            pageNumber={i}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            width={bookSize.width}
            scale={scale}
          />
        </FlipBookPage>
      );
    }
    return pages;
  };

  // Bookmark functions using new array format
  const toggleBookmark = () => {
    const pageToBookmark = currentPage + 1; // Convert to 1-based
    const exists = bookmarks.some((b) => b.page === pageToBookmark);

    if (exists) {
      const newBookmarks = bookmarks.filter((b) => b.page !== pageToBookmark);
      setBookmarks(newBookmarks);
    } else {
      const newBookmark = {
        page: pageToBookmark,
        timestamp: Date.now(),
        title: `Página ${pageToBookmark}`
      };
      const newBookmarks = [...bookmarks, newBookmark].sort((a, b) => a.page - b.page);
      setBookmarks(newBookmarks);
    }
  };

  // NEW APPROACH: Temporarily remove onFlip handler during navigation
  const goToBookmark = (page) => {
    if (!flipBookRef.current?.pageFlip) return;
    
    const targetIndex = page - 1; // Convert to 0-based index
    
    //debug
   // console.log(`Navigating to page ${page} (index ${targetIndex})`);
    
    // Disable flip handler
    bookmarkNavigatingRef.current = true;
    
    // Store the original onFlip handler
    const flipBookElement = flipBookRef.current;
    
    // Temporarily remove the event listener by setting a flag
    expectedPageRef.current = targetIndex;
    
    // Immediately update our state
    setCurrentPage(targetIndex);
    
    try {
      // Try direct flip
      flipBookRef.current.pageFlip().flip(targetIndex);
      
      // Wait for animation and force final state
      setTimeout(() => {
        setCurrentPage(targetIndex);
        
        // Double-check after animation
        setTimeout(() => {
          if (flipBookRef.current?.pageFlip) {
            const actualPage = flipBookRef.current.pageFlip().getCurrentPageIndex();
            //debug
            //console.log(`Expected: ${targetIndex}, Actual: ${actualPage}`);
            
            if (actualPage !== targetIndex) {
              // Force it again if needed
              try {
                flipBookRef.current.pageFlip().flip(targetIndex);
                setCurrentPage(targetIndex);
              } catch (e) {
                console.warn('Second attempt failed:', e);
              }
            }
          }
          
          // Re-enable flip handler
          setTimeout(() => {
            bookmarkNavigatingRef.current = false;
            expectedPageRef.current = null;
          }, 500);
          
        }, 1000);
      }, 100);
      
    } catch (error) {
      console.warn('Error flipping to page:', error);
      bookmarkNavigatingRef.current = false;
      expectedPageRef.current = null;
    }
    
    setShowBookmarkList(false);
  };

  const removeBookmark = (indexToRemove) => {
    const newBookmarks = bookmarks.filter((_, i) => i !== indexToRemove);
    setBookmarks(newBookmarks);
  };

  const changeMagazine = (magazineKey) => {
    if (magazineKey !== currentMagazine) {
      navigate(`/revista/${magazineKey}`);
      setShowMagazineList(false);
    }
  };

  // Check if current page is bookmarked
  const isCurrentPageBookmarked = bookmarks.some((b) => b.page === currentPage + 1);

  // Zoom functions
  const zoomIn = () => setScale(prev => Math.min(prev + 0.2, 3.0));
  const zoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.5));

  const handleDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setIsLoading(false); //done loading when PDF is ready
  };

  // COMPLETELY BLOCK handleFlip during bookmark navigation
  const handleFlip = (e) => {
   // Completely ignore ALL flip events during bookmark navigation //need this to prevent it from just flipping one page back and actually flipping to many pages back
    if (bookmarkNavigatingRef.current) {
      //debug
    //  console.log('Ignoring flip event during bookmark navigation:', e?.data);
      return;
    }
    
    if (e && typeof e.data === "number") {
     // console.log('Normal flip to page:', e.data + 1);
      setCurrentPage(e.data);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="w-full px-2 sm:px-4 py-4 sm:py-6">
        <div className="flex flex-col items-center max-w-6xl mx-auto">

          {/* Header */}
          <div className="w-full mb-4 sm:mb-6 text-center px-2">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 mb-2">
              Revista Digital
            </h1>
            <p className="text-slate-600 text-sm sm:text-base">
              Edición: {MAGAZINES[currentMagazine]?.title}
            </p>

            <div className="mt-4 flex justify-center space-x-4">
              <button
                onClick={() => navigate("/revista")}
                className="bg-blue-400 hover:bg-blue-500 rounded-lg text-white px-4 py-2 text-sm sm:text-base transition-all duration-200 hover:shadow-lg"
              >
                Regresar a ediciones
              </button>

              {/* Magazine Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowMagazineList(!showMagazineList)}
                  className="flex items-center space-x-2 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors"
                >
                  <span className="text-sm font-medium">
                    {MAGAZINES[currentMagazine]?.title}
                  </span>
                  <ChevronDownIcon className="w-4 h-4" />
                </button>

                {showMagazineList && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50 max-h-80 overflow-y-auto">
                    {Object.entries(MAGAZINES).map(([key, magazine]) => (
                      <button
                        key={key}
                        onClick={() => changeMagazine(key)}
                        className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${currentMagazine === key
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-700"
                          }`}
                      >
                        <div className="text-sm font-medium">{magazine.title}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* PDF Document Container - ONLY mobile centering changes */}
          <div className="w-full max-w-6xl mb-4 sm:mb-6 relative">
            {/* Controls */}
            <div className="absolute top-2 sm:top-4 right-2 sm:right-4 z-10 flex space-x-2">
              <button
                onClick={zoomOut}
                className="p-2 sm:p-3 rounded-full bg-white shadow-lg hover:bg-gray-50"
                title="Zoom Out"
              >
                <ZoomOut size={16} />
              </button>
              <button
                onClick={zoomIn}
                className="p-2 sm:p-3 rounded-full bg-white shadow-lg hover:bg-gray-50"
                title="Zoom In"
              >
                <ZoomIn size={16} />
              </button>
            </div>

            {/* Magazine Viewer - Enhanced mobile centering ONLY */}
            <div
              className={`flex justify-center bg-white rounded-lg shadow-xl ${isMobile ? "p-10" : "p-4 sm:p-10"
                }`}
            >
              <div ref={containerRef} className="w-full flex justify-center">
                <Document
                  file={MAGAZINES[currentMagazine].path}
                  onLoadSuccess={handleDocumentLoadSuccess}
                  loading="Cargando revista..."
                  error="Error cargando PDF"
                >
                  <HTMLFlipBook
                    width={bookSize.width}
                    height={bookSize.height}
                    showCover={true}
                    flippingTime={800}
                    maxShadowOpacity={0.3}
                    usePortrait={isMobile}
                    onFlip={handleFlip}
                    ref={flipBookRef}
                  >
                    {renderPages()}
                  </HTMLFlipBook>
                </Document>
              </div>
            </div>

          </div>

          {/* Bookmark Section */}
          <div className="w-full max-w-4xl">
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
                    className={`px-3 py-1.5 text-sm rounded-md transition-colors ${isCurrentPageBookmarked
                      ? "bg-red-100 text-red-700 hover:bg-red-200"
                      : "bg-amber-100 text-amber-700 hover:bg-amber-200"
                      }`}
                  >
                    {isCurrentPageBookmarked ? "Quitar" : "Agregar"}
                  </button>

                  {bookmarks.length > 0 && (
                    <button
                      onClick={() => setShowBookmarkList(!showBookmarkList)}
                      className="flex items-center space-x-1 px-3 py-1.5 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                    >
                      <Eye size={14} />
                      <span className="hidden sm:inline">
                        {showBookmarkList ? "Ocultar" : "Ver"}
                      </span>
                    </button>
                  )}
                </div>
              </div>

              {showBookmarkList && bookmarks.length > 0 && (
                <div className="border-t pt-3">
                  <div className="max-h-40 overflow-y-auto">
                    <div className="space-y-2">
                      {bookmarks.map((bookmark, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 bg-slate-50 rounded-md hover:bg-slate-100 transition-colors"
                        >
                          <button
                            onClick={() => goToBookmark(bookmark.page)}
                            className="flex items-center space-x-2 text-left flex-1"
                          >
                            <BookmarkCheck className="text-amber-500" size={16} />
                            <div>
                              <div className="text-sm font-medium text-slate-700">
                                {bookmark.title}
                              </div>
                              <div className="text-xs text-slate-500 hidden sm:block">
                                {new Date(bookmark.timestamp).toLocaleDateString()}
                              </div>
                            </div>
                          </button>
                          <button
                            onClick={() => removeBookmark(index)}
                            className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {bookmarks.length === 0 && showBookmarkList && (
                <div className="border-t pt-3 text-center text-sm text-slate-500">
                  No hay marcadores aún.
                </div>
              )}
            </div>
          </div>

          {/* Page Info */}
          {numPages && (
            <div className="w-full max-w-4xl mt-4 text-center py-4 text-sm text-gray-600 bg-white rounded-lg shadow-md">
              Página {currentPage + 1} de {numPages} • {MAGAZINES[currentMagazine]?.title}
              {isCurrentPageBookmarked && (
                <span className="ml-2 text-yellow-600">
                  <BookmarkIcon className="w-4 h-4 inline fill-current" />
                </span>
              )}
            </div>
          )}

        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {showMagazineList && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowMagazineList(false)}
        />
      )}
    </div>
  );
};

export default Book;