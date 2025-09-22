import React, { useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from "react-pdf";
// Updated CSS imports for newer react-pdf versions
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min?url";

// FIXED: Added .pdf extension
const pdf = "/revistaPDF/abril-2024/magazine.pdf";

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

const Pages = React.forwardRef(({ children }, ref) => (
  <div className="demoPage bg-white shadow-lg" ref={ref}>
    {children}
  </div>
));
Pages.displayName = "Pages";

export default function Flipbook() {
  const [numPages, setNumPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState([]);

  // Debug function to log info
  const addDebugInfo = (message) => {
    console.log(message);
    setDebugInfo(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  useEffect(() => {
    addDebugInfo("Component mounted");
    addDebugInfo(`PDF path: ${pdf}`);
    addDebugInfo(`Worker src: ${pdfjs.GlobalWorkerOptions.workerSrc}`);
    
    // Test if PDF is accessible
    fetch(pdf)
      .then(response => {
        addDebugInfo(`PDF fetch response: ${response.status} ${response.statusText}`);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        return response.blob();
      })
      .then(blob => {
        addDebugInfo(`PDF file size: ${blob.size} bytes`);
        addDebugInfo(`PDF file type: ${blob.type}`);
      })
      .catch(err => {
        addDebugInfo(`PDF fetch error: ${err.message}`);
      });
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    addDebugInfo(`PDF loaded successfully! Pages: ${numPages}`);
    setNumPages(numPages);
    setLoading(false);
  };

  const onDocumentLoadError = (error) => {
    addDebugInfo(`PDF loading error: ${error.message}`);
    console.error("Full PDF loading error:", error);
    setError(error.message);
    setLoading(false);
  };

  const onSourceError = (error) => {
    addDebugInfo(`PDF source error: ${error.message}`);
  };

  if (loading) {
    return (
      <div className="h-screen w-screen flex flex-col justify-center items-center bg-gray-900 gap-4">
        <div className="text-white text-xl">Loading magazine...</div>
        <div className="text-sm text-gray-400">Path: {pdf}</div>
        
        {/* Debug information */}
        <div className="bg-gray-800 p-4 rounded-lg max-w-2xl max-h-60 overflow-y-auto">
          <h3 className="text-white font-bold mb-2">Debug Info:</h3>
          {debugInfo.map((info, index) => (
            <div key={index} className="text-xs text-green-400 font-mono">
              {info}
            </div>
          ))}
        </div>
        
        {/* Manual test button */}
        <button 
          onClick={() => {
            addDebugInfo("Manual PDF test initiated");
            window.open(pdf, '_blank');
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Test PDF in New Tab
        </button>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-screen flex flex-col justify-center items-center bg-gray-900 gap-4">
        <div className="text-red-400 text-xl">Error loading PDF</div>
        <div className="text-gray-400 text-sm max-w-md text-center">{error}</div>
        <div className="text-gray-500 text-xs">
          Make sure the PDF file exists at: {pdf}
        </div>
        
        {/* Debug information */}
        <div className="bg-gray-800 p-4 rounded-lg max-w-2xl max-h-60 overflow-y-auto">
          <h3 className="text-white font-bold mb-2">Debug Log:</h3>
          {debugInfo.map((info, index) => (
            <div key={index} className="text-xs text-green-400 font-mono">
              {info}
            </div>
          ))}
        </div>
        
        <button 
          onClick={() => {
            setError(null);
            setLoading(true);
            setDebugInfo([]);
            addDebugInfo("Retry initiated");
          }}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Retry Loading
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col gap-5 justify-center items-center bg-gray-900 overflow-hidden">
      <h1 className="text-3xl text-white text-center font-bold">Magazine FlipBook</h1>

      <Document 
        file={pdf} 
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onDocumentLoadError}
        onSourceError={onSourceError}
        onLoadProgress={({ loaded, total }) => {
          addDebugInfo(`Loading progress: ${loaded}/${total}`);
        }}
        options={{
          cMapUrl: 'https://unpkg.com/pdfjs-dist@3.4.120/cmaps/',
          cMapPacked: true,
        }}
        loading={
          <div className="text-white flex flex-col items-center gap-2">
            <div>Loading PDF...</div>
            <div className="text-sm text-gray-400">Path: {pdf}</div>
          </div>
        }
      >
        {numPages > 0 && (
          <HTMLFlipBook 
            width={400} 
            height={570}
            size="stretch"
            minWidth={315}
            maxWidth={1000}
            minHeight={400}
            maxHeight={1533}
            showCover={true}
            flippingTime={1000}
            usePortrait={true}
            startPage={0}
            drawShadow={true}
            className="demo-book"
          >
            {[...Array(numPages).keys()].map((pNum) => (
              <Pages key={pNum}>
                <Page
                  pageNumber={pNum + 1}
                  width={400}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  className="pdf-page"
                />
              </Pages>
            ))}
          </HTMLFlipBook>
        )}
      </Document>
      
      {numPages > 0 && (
        <div className="text-gray-400 text-sm">
          {numPages} pages loaded
        </div>
      )}
      
      {/* Debug panel - remove this in production */}
      <div className="fixed bottom-4 right-4 bg-black bg-opacity-75 text-white p-3 rounded-lg text-xs max-w-sm max-h-32 overflow-y-auto">
        <div className="font-bold mb-1">Debug Log:</div>
        {debugInfo.slice(-5).map((info, index) => (
          <div key={index} className="text-green-400 font-mono">
            {info}
          </div>
        ))}
      </div>
    </div>
  );
}