import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard } from "swiper/modules";
import { Bookmark, BookmarkCheck, X, Eye, ZoomIn, ZoomOut, AlertCircle } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// At the top of your file, make sure you have all imports:
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Try this more reliable worker configuration:
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

// OR if that doesn't work, use the CDN version:
// pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

// For this demo, we'll simulate the router params
const useParams = () => ({ slug: "mayo-2025" });

const allPdfs = {
  "mayo-2025": "/revistaPDF/mayo-2025/magazine.pdf",
  "marzo-2025": "/revistaPDF/marzo-2025/magazine.pdf",
  "febrero-2025": "/revistaPDF/febrero-2025/magazine.pdf",
  "diciembre-2024": "/revistaPDF/diciembre-2024/magazine.pdf",
  "julio-2024": "/revistaPDF/julio-2024/magazine.pdf",
  "junio-2024": "/revistaPDF/junio-2024/magazine.pdf",
  "mayo-2024": "/revistaPDF/mayo-2024/magazine.pdf",
  "abril-2024": "/revistaPDF/abril-2024/magazine.pdf",
  "marzo-2024": "/revistaPDF/marzo-2024/magazine.pdf",
  "febrero-2024": "/revistaPDF/febrero-2024/magazine.pdf",
  "enero-2024": "/revistaPDF/enero-2024/magazine.pdf",
  "diciembre-2023": "/revistaPDF/diciembre-2023/magazine.pdf",
  "noviembre-2023": "/revistaPDF/noviembre-2023/magazine.pdf",
};

export default function PdfMagazineSwiper() {
  const { slug } = useParams();
  const swiperRef = useRef(null);
  const [numPages, setNumPages] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showBookmarkList, setShowBookmarkList] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [pdfError, setPdfError] = useState(null);
  const [scale, setScale] = useState(1.0);
  const [pageWidth, setPageWidth] = useState(null);
  const [loadingMethod, setLoadingMethod] = useState('react-pdf'); // 'react-pdf' or 'iframe'
  const [debugInfo, setDebugInfo] = useState({});

  const pdfUrl = allPdfs[slug];

  // Test PDF accessibility first
  useEffect(() => {
    const testPdfAccess = async () => {
      if (!pdfUrl) return;

      try {
        console.log('Testing PDF access:', window.location.origin + pdfUrl);
        const response = await fetch(pdfUrl);
        const result = {
          status: response.status,
          ok: response.ok,
          contentType: response.headers.get('content-type'),
          size: (await response.blob()).size
        };

        setDebugInfo(result);
        console.log('PDF test result:', result);

        if (!result.ok) {
          setPdfError(new Error(`PDF not accessible: ${result.status}`));
          setIsLoading(false);
        }
      } catch (error) {
        console.error('PDF test failed:', error);
        setDebugInfo({ error: error.message });
        setPdfError(error);
        setIsLoading(false);
      }
    };

    testPdfAccess();
  }, [pdfUrl]);

  // Responsive sizing
  useEffect(() => {
    const updatePageWidth = () => {
      const containerWidth = window.innerWidth;
      if (containerWidth < 640) {
        setPageWidth(containerWidth - 32);
        setScale(0.8);
      } else if (containerWidth < 1024) {
        setPageWidth(containerWidth - 64);
        setScale(1.0);
      } else {
        setPageWidth(Math.min(800, containerWidth - 128));
        setScale(1.2);
      }
    };

    updatePageWidth();
    window.addEventListener('resize', updatePageWidth);
    return () => window.removeEventListener('resize', updatePageWidth);
  }, []);


  useEffect(() => {
    // Add a timeout to catch if react-pdf never loads
    const timeout = setTimeout(() => {
      if (isLoading && !pdfError) {
        console.warn('PDF loading timeout, switching to iframe');
        setLoadingMethod('iframe');
        setIsLoading(false);
        setNumPages(24); // Estimate
      }
    }, 10000); // 10 second timeout

    return () => clearTimeout(timeout);
  }, [isLoading, pdfError]);

  // Create slide groups for PDF pages
  const createSlideGroups = () => {
    if (!numPages) return [];

    const groups = [];
    groups.push([{ pageNum: 1 }]); // Cover page alone

    for (let i = 2; i <= numPages; i += 2) {
      const group = [{ pageNum: i }];
      if (i + 1 <= numPages) {
        group.push({ pageNum: i + 1 });
      }
      groups.push(group);
    }

    return groups;
  };

  const slideGroups = createSlideGroups();

  // Get current page info
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

  // In-memory bookmark storage
  const [bookmarkStorage, setBookmarkStorage] = useState({});

  useEffect(() => {
    const saved = bookmarkStorage[`bookmarks-${slug}`];
    if (saved) setBookmarks(saved);
  }, [slug, bookmarkStorage]);

  // Bookmark functions
  const saveBookmarks = (newBookmarks) => {
    setBookmarks(newBookmarks);
    setBookmarkStorage(prev => ({
      ...prev,
      [`bookmarks-${slug}`]: newBookmarks
    }));
  };

  const toggleBookmark = () => {
    const pageToBookmark = currentPageInfo.start;
    const exists = bookmarks.some(b => b.page === pageToBookmark);

    if (exists) {
      saveBookmarks(bookmarks.filter(b => b.page !== pageToBookmark));
    } else {
      const newBookmark = {
        page: pageToBookmark,
        timestamp: Date.now(),
        title: `Página ${pageToBookmark}`
      };
      saveBookmarks([...bookmarks, newBookmark].sort((a, b) => a.page - b.page));
    }
  };

  const goToBookmark = (page) => {
    if (swiperRef.current?.swiper) {
      let slideIndex = page === 1 ? 0 : Math.floor((page - 2) / 2) + 1;
      swiperRef.current.swiper.slideTo(slideIndex);
      setShowBookmarkList(false);
    }
  };

  const removeBookmark = (indexToRemove) => {
    saveBookmarks(bookmarks.filter((_, i) => i !== indexToRemove));
  };

  const isCurrentPageBookmarked = bookmarks.some(b => b.page === currentPageInfo.start);

  // Zoom functions
  const zoomIn = () => setScale(prev => Math.min(prev + 0.2, 3.0));
  const zoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.5));

  // Switch to iframe method
  const switchToIframe = () => {
    setLoadingMethod('iframe');
    setIsLoading(false);
    setNumPages(24); // Estimate for demo
  };

  // Early returns for error states
  if (!slug || !pdfUrl) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-slate-700 text-lg mb-4">Revista no encontrada.</p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
            Regresar a ediciones
          </button>
        </div>
      </div>
    );
  }

  if (isLoading && loadingMethod === 'react-pdf') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
        <div className="text-center max-w-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-600 mx-auto mb-4"></div>
          <p className="text-slate-700 text-lg">Cargando revista PDF...</p>
          <p className="text-slate-500 text-sm mt-2">{slug}</p>
          <p className="text-slate-400 text-xs mt-1 break-all">{pdfUrl}</p>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-left">
            <h3 className="font-semibold mb-2 flex items-center">
              <AlertCircle size={16} className="mr-2" />
              Debug Info
            </h3>
            <div className="text-xs space-y-1">
              <p>Status: {debugInfo.status || 'Testing...'}</p>
              <p>Content-Type: {debugInfo.contentType || 'Unknown'}</p>
              <p>Size: {debugInfo.size ? `${Math.round(debugInfo.size / 1024)}KB` : 'Unknown'}</p>
              {debugInfo.error && <p className="text-red-600">Error: {debugInfo.error}</p>}
            </div>
          </div>

          <button
            onClick={switchToIframe}
            className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm"
          >
            Switch to iframe method
          </button>
        </div>
      </div>
    );
  }

  if (pdfError && loadingMethod === 'react-pdf') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <p className="text-slate-700 text-lg mb-2">Error cargando PDF con react-pdf</p>
          <p className="text-slate-500 text-sm mb-4">
            {pdfError?.message || 'Error desconocido'}
          </p>
          <div className="space-y-2">
            <button
              onClick={switchToIframe}
              className="block bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg w-full"
            >
              Usar iframe method
            </button>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Ver PDF directamente
            </a>
            <button className="block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-full">
              Regresar a ediciones
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render iframe method if react-pdf fails
  if (loadingMethod === 'iframe') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="w-full px-2 sm:px-4 py-4 sm:py-6">
          <div className="flex flex-col items-center max-w-6xl mx-auto">

            {/* Header */}
            <div className="w-full mb-4 sm:mb-6 text-center px-2">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 mb-2">
                Revista Digital PDF
              </h1>
              <p className="text-slate-600 text-sm sm:text-base">
                Edición: {slug?.replace('-', ' ').toUpperCase()}
              </p>
              <div className="mt-2 text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded">
                Usando método iframe (react-pdf falló)
              </div>
              <div className="mt-4">
                <button className="bg-blue-400 hover:bg-blue-500 rounded-lg text-white px-4 py-2 text-sm sm:text-base transition-all duration-200 hover:shadow-lg">
                  Regresar a ediciones
                </button>
              </div>
            </div>

            {/* PDF iframe fallback */}
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden">
              <iframe
                src={pdfUrl}
                width="100%"
                height="800px"
                className="border-0"
                title={`PDF Magazine - ${slug}`}
              />
            </div>

            {/* Simple navigation for iframe method */}
            <div className="w-full max-w-4xl mt-6 space-y-3">
              <div className="bg-white rounded-lg shadow-md p-4 text-center">
                <p className="text-sm text-gray-600 mb-2">
                  PDF cargado usando iframe. Use los controles del navegador PDF para navegar.
                </p>
                <div className="flex justify-center space-x-4">
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    Abrir en nueva pestaña
                  </a>
                  <button
                    onClick={() => window.location.reload()}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    Reintentar react-pdf
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // REACT-PDF METHOD - with better error handling and timeout
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="w-full px-2 sm:px-4 py-4 sm:py-6">
        <div className="flex flex-col items-center max-w-6xl mx-auto">

          {/* Header */}
          <div className="w-full mb-4 sm:mb-6 text-center px-2">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 mb-2">
              Revista Digital PDF
            </h1>
            <p className="text-slate-600 text-sm sm:text-base">
              Edición: {slug?.replace('-', ' ').toUpperCase()}
            </p>
            <div className="mt-4">
              <button className="bg-blue-400 hover:bg-blue-500 rounded-lg text-white px-4 py-2 text-sm sm:text-base transition-all duration-200 hover:shadow-lg">
                Regresar a ediciones
              </button>
            </div>
          </div>

          {/* PDF Document Container */}
          <div className="w-full max-w-6xl mb-4 sm:mb-6 relative">
            {/* Try to load PDF with react-pdf first */}
            <div className="pdf-container">
              <Swiper
                ref={swiperRef}
                onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
                navigation={{ prevEl: '.custom-prev', nextEl: '.custom-next' }}
                pagination={{ type: "fraction", el: '.custom-pagination' }}
                keyboard={{ enabled: true }}
                spaceBetween={0}
                slidesPerView={1}
                modules={[Navigation, Pagination, Keyboard]}
                className="pdf-magazine-swiper"
              >
                {slideGroups.map((group, slideIndex) => (
                  <SwiperSlide key={slideIndex}>
                    <div className="flex justify-center items-stretch w-full gap-2">
                      {group.map((pageData, pageIndexInGroup) => {
                        const isLeftPage = pageIndexInGroup === 0;
                        const isCoverPage = slideIndex === 0;
                        const isSinglePage = group.length === 1;

                        return (
                          <div
                            key={pageData.pageNum}
                            className={`relative bg-white overflow-hidden ${isCoverPage || isSinglePage
                              ? 'mx-auto rounded-lg shadow-xl'
                              : isLeftPage
                                ? 'rounded-l-lg shadow-lg'
                                : 'rounded-r-lg shadow-lg'
                              }`}
                          >
                            {/* Mock page for demo since react-pdf isn't available */}
                            <div
                              className="bg-white border shadow-lg flex flex-col items-center justify-center text-gray-600"

                            >
                              <Document
                                file={pdfUrl}
                                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                                loading={<div>Cargando PDF...</div>}
                                error={<div>Error cargando PDF</div>}
                              >
                                <Page
                                  pageNumber={pageData.pageNum}
                                  width={pageWidth}
                                  scale={scale}
                                  loading={<div>Cargando página...</div>}
                                  error={<div>Error cargando página</div>}
                                />
                              </Document>
                              <div className="text-4xl font-bold mb-4">{pageData.pageNum}</div>
                              <div className="text-sm">Página de revista</div>
                              <div className="text-xs text-gray-400 mt-2">
                                {isCoverPage ? 'Portada' : 'Contenido'}
                              </div>
                            </div>
                            <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                              {pageData.pageNum}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Controls */}
            <div className="absolute top-2 sm:top-4 right-2 sm:right-4 z-10 flex space-x-2">
              <button onClick={zoomOut} className="p-2 sm:p-3 rounded-full bg-white shadow-lg hover:bg-gray-50">
                <ZoomOut size={16} />
              </button>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Método de carga:</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setLoadingMethod('react-pdf')}
                    className={`px-3 py-1 text-xs rounded ${loadingMethod === 'react-pdf' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                  >
                    react-pdf
                  </button>
                  <button
                    onClick={switchToIframe}
                    className={`px-3 py-1 text-xs rounded ${loadingMethod === 'iframe' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                  >
                    iframe
                  </button>
                </div>
              </div>
            </div>

            {/* Bookmark Section */}
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
                    className={`px-3 py-1.5 text-sm rounded-md ${isCurrentPageBookmarked
                      ? "bg-red-100 text-red-700 hover:bg-red-200"
                      : "bg-amber-100 text-amber-700 hover:bg-amber-200"
                      }`}
                  >
                    {isCurrentPageBookmarked ? "Quitar" : "Agregar"}
                  </button>

                  {bookmarks.length > 0 && (
                    <button
                      onClick={() => setShowBookmarkList(!showBookmarkList)}
                      className="flex items-center space-x-1 px-3 py-1.5 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
                    >
                      <Eye size={14} />
                      <span className="hidden sm:inline">{showBookmarkList ? "Ocultar" : "Ver"}</span>
                    </button>
                  )}
                </div>
              </div>

              {showBookmarkList && bookmarks.length > 0 && (
                <div className="border-t pt-3">
                  <div className="max-h-40 overflow-y-auto">
                    <div className="space-y-2">
                      {bookmarks.map((bookmark, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded-md hover:bg-slate-100">
                          <button
                            onClick={() => goToBookmark(bookmark.page)}
                            className="flex items-center space-x-2 text-left flex-1"
                          >
                            <BookmarkCheck className="text-amber-500" size={16} />
                            <div>
                              <div className="text-sm font-medium text-slate-700">Página {bookmark.page}</div>
                              <div className="text-xs text-slate-500 hidden sm:block">
                                {new Date(bookmark.timestamp).toLocaleDateString()}
                              </div>
                            </div>
                          </button>
                          <button
                            onClick={() => removeBookmark(index)}
                            className="p-1 text-slate-400 hover:text-red-500"
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

            {/* Debug Info */}
            <div className="w-full max-w-4xl bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">🔧 Troubleshooting</h3>
              <div className="text-sm space-y-1">
                <p><strong>Current method:</strong> {loadingMethod}</p>
                <p><strong>PDF URL:</strong> {pdfUrl}</p>
                <p><strong>Debug info:</strong> {JSON.stringify(debugInfo)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
