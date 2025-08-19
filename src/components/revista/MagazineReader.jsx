import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import HTMLFlipBook from "react-pageflip";
import { ChevronLeft, ChevronRight, Bookmark, BookmarkCheck, X, Eye } from "lucide-react";

const allImages = {
  "mayo-2025": import.meta.glob("/public/mayo-2025/*.jpg", { eager: true }),
  "marzo-2025": import.meta.glob("/public/marzo-2025.pdf/*.jpg", { eager: true }),
  "febrero-2025": import.meta.glob("/public/febrero-2025/*.jpg", { eager: true }),
  "diciembre-2024": import.meta.glob("/public/diciembre-2024/*.jpg", { eager: true }),


};

export default function MagazineFlip() {
  const { slug } = useParams();
  const bookRef = useRef(null);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [bookmarks, setBookmarks] = useState([]);
  const [showBookmarkList, setShowBookmarkList] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Enhanced responsive sizing with spread view support
  const [bookSize, setBookSize] = useState({ width: 500, height: 700 });

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const isMobileScreen = screenWidth < 768;
      const isTabletScreen = screenWidth >= 768 && screenWidth < 1024;
      const isLargeScreen = screenWidth >= 1024;

      setIsMobile(isMobileScreen);
      setIsTablet(isTabletScreen);

      let width, height;

      if (isMobileScreen) {
        // Mobile: single page view - more generous sizing
        width = Math.min(screenWidth - 24, 400);
        height = Math.min(width * 1.5, screenHeight - 180);
      } else if (isTabletScreen) {
        // Tablet: spread view but smaller - increased size
        width = Math.min(screenWidth - 32, 900);
        height = Math.min(width * 0.75, screenHeight - 160);
      } else {
        // Desktop/Large tablet: full spread view - much larger
        width = Math.min(screenWidth - 48, 1200);
        height = Math.min(width * 0.75, screenHeight - 140);
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
      // Remove existing bookmark
      const newBookmarks = bookmarks.filter((_, index) => index !== existingIndex);
      saveBookmarks(newBookmarks);
    } else {
      // Add new bookmark
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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-600 mx-auto mb-4"></div>
          <p className="text-slate-700 text-lg">Loading magazine pages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-2 sm:px-4 py-4 sm:py-8">
      <div className="flex flex-col items-center max-w-7xl mx-auto">

        {/* Magazine Header */}
        <div className="mb-4 sm:mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
            Magazine Viewer
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Issue: {slug?.replace('-', ' ').toUpperCase()}
          </p>
          {!isMobile && (
            <p className="text-xs text-slate-500 mt-1">
              Double-page spread view • Click edges to navigate
            </p>
          )}
        </div>

        {/* FlipBook Container */}
      <div className="relative mb-6">
  <HTMLFlipBook
    width={isMobile ? bookSize.width : bookSize.width / 2}
    height={bookSize.height}
    ref={bookRef}
    onFlip={(e) => setCurrentPage(e.data)}
    showCover={true}
    className="shadow-2xl no-gap"
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


        {/* Enhanced Navigation Controls */}
        <div className="w-full max-w-2xl">
          {/* Main Navigation */}
          <div className="flex items-center justify-between bg-white rounded-lg shadow-md p-3 sm:p-4 mb-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <ChevronLeft size={isMobile ? 16 : 20} />
              <span className="hidden sm:inline">Previous</span>
            </button>

            <div className="text-center flex-1 mx-4">
              <div className="text-sm sm:text-base font-medium text-slate-800">
                Page {currentPage + 1} of {pages.length}
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                <div
                  className="bg-slate-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentPage + 1) / pages.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <button
              onClick={handleNextPage}
              disabled={currentPage === pages.length - 1}
              className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight size={isMobile ? 16 : 20} />
            </button>
          </div>

          {/* Enhanced Bookmark Controls */}
          <div className="bg-white rounded-lg shadow-md p-3 sm:p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                {isCurrentPageBookmarked ? (
                  <BookmarkCheck className="text-amber-500" size={20} />
                ) : (
                  <Bookmark className="text-slate-400" size={20} />
                )}
                <span className="text-sm sm:text-base font-medium text-slate-700">
                  Bookmarks ({bookmarks.length})
                </span>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={handleBookmark}
                  className={`px-3 py-1.5 text-sm rounded-md transition-colors duration-200 ${isCurrentPageBookmarked
                      ? "bg-red-100 text-red-700 hover:bg-red-200"
                      : "bg-amber-100 text-amber-700 hover:bg-amber-200"
                    }`}
                >
                  {isCurrentPageBookmarked ? "Remove" : "Add"}
                </button>

                {bookmarks.length > 0 && (
                  <button
                    onClick={() => setShowBookmarkList(!showBookmarkList)}
                    className="flex items-center space-x-1 px-3 py-1.5 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors duration-200"
                  >
                    <Eye size={14} />
                    <span>{showBookmarkList ? "Hide" : "View"}</span>
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
                          className="flex items-center space-x-2 text-left flex-1"
                        >
                          <BookmarkCheck className="text-amber-500 flex-shrink-0" size={16} />
                          <div>
                            <div className="text-sm font-medium text-slate-700">
                              Page {bookmark.page + 1}
                            </div>
                            <div className="text-xs text-slate-500">
                              {new Date(bookmark.timestamp).toLocaleDateString()}
                            </div>
                          </div>
                        </button>
                        <button
                          onClick={() => removeBookmark(index)}
                          className="p-1 text-slate-400 hover:text-red-500 transition-colors duration-200"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {bookmarks.length > 3 && (
                  <div className="text-xs text-slate-500 text-center mt-2">
                    Scroll to see all bookmarks
                  </div>
                )}
              </div>
            )}

            {bookmarks.length === 0 && showBookmarkList && (
              <div className="border-t pt-3 text-center text-sm text-slate-500">
                No bookmarks yet. Click "Add" to bookmark this page.
              </div>
            )}
          </div>
        </div>

        {/* Mobile Touch Instructions */}
        {isMobile && (
          <div className="mt-4 text-center text-xs sm:text-sm text-slate-500 max-w-sm">
            💡 Tip: Tap the edges of pages to flip, or use the navigation buttons above
          </div>
        )}

        {/* Large Screen Instructions */}
        {!isMobile && (
          <div className="mt-4 text-center text-xs sm:text-sm text-slate-500 max-w-md">
            📖 Enjoying the spread view? Click page edges or use arrow keys to navigate
          </div>
        )}
      </div>
    </div>
  );
}