import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useNavigate } from "react-router-dom";
import MAGAZINES from "./magazines";

// Worker setup
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const MagazineCover = ({ slug, width }) => {
  const navigate = useNavigate();
  const [numPages, setNumPages] = useState(null);

  const handleLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div
      className="cursor-pointer hover:scale-105 transition-transform"
      onClick={() => navigate(`/revista/${slug}`)}
    >
      <Document
        file={MAGAZINES[slug].path}
        onLoadSuccess={handleLoadSuccess}
        loading={<div className="p-4 text-gray-500">Loading...</div>}
      >
        {/* Only render page 1 (cover) */}
        <Page
          pageNumber={1}
          renderTextLayer={false}
          renderAnnotationLayer={false}
          width={width || 200} // adjust thumbnail size
        />
      </Document>
   
    </div>
  );
};

export default MagazineCover;
