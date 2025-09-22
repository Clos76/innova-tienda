import React, { useState } from 'react';

export default function SimplePdfTest() {
  const [testResults, setTestResults] = useState({});
  const [selectedSlug, setSelectedSlug] = useState('mayo-2025');
  
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
  
  const currentPdfUrl = allPdfs[selectedSlug];
  
  const testPdfAccess = async (url) => {
    try {
      console.log('Testing URL:', url);
      const response = await fetch(url);
      
      const result = {
        status: response.status,
        ok: response.ok,
        contentType: response.headers.get('content-type'),
        contentLength: response.headers.get('content-length'),
        cors: response.headers.get('access-control-allow-origin'),
        url: response.url
      };
      
      if (response.ok) {
        const blob = await response.blob();
        result.size = blob.size;
        result.type = blob.type;
        result.success = true;
        
        // Test if it's actually a PDF
        const arrayBuffer = await blob.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer.slice(0, 4));
        const header = String.fromCharCode.apply(null, uint8Array);
        result.isPdf = header === '%PDF';
      }
      
      console.log('Test result:', result);
      return result;
    } catch (error) {
      console.error('Test error:', error);
      return {
        success: false,
        error: error.message,
        name: error.name,
        stack: error.stack
      };
    }
  };

  const runTest = async () => {
    setTestResults({ loading: true });
    const result = await testPdfAccess(currentPdfUrl);
    setTestResults(result);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">PDF Loading Diagnostics</h1>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Test Configuration</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Select Magazine:</label>
              <select 
                value={selectedSlug}
                onChange={(e) => setSelectedSlug(e.target.value)}
                className="w-full p-2 border rounded"
              >
                {Object.keys(allPdfs).map(slug => (
                  <option key={slug} value={slug}>{slug}</option>
                ))}
              </select>
            </div>
            
            <div className="mb-4">
              <p><strong>PDF Path:</strong> {currentPdfUrl}</p>
              <p><strong>Full URL:</strong> <code className="text-sm bg-gray-100 px-1">{window.location.origin + currentPdfUrl}</code></p>
            </div>

            <button 
              onClick={runTest}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full mb-4"
            >
              Run Connectivity Test
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Test Results</h2>
            
            {testResults.loading && <p className="text-blue-600">Testing PDF access...</p>}
            
            {testResults && !testResults.loading && (
              <div className="text-sm">
                {testResults.success ? (
                  <div className="text-green-600">
                    ✅ <strong>PDF Accessible</strong>
                    <ul className="mt-2 space-y-1">
                      <li>Status: {testResults.status}</li>
                      <li>Content-Type: {testResults.contentType}</li>
                      <li>Size: {testResults.size} bytes</li>
                      <li>Is PDF: {testResults.isPdf ? 'Yes' : 'No'}</li>
                      {testResults.cors && <li>CORS: {testResults.cors}</li>}
                    </ul>
                  </div>
                ) : (
                  <div className="text-red-600">
                    ❌ <strong>PDF Not Accessible</strong>
                    <ul className="mt-2 space-y-1">
                      <li>Error: {testResults.error}</li>
                      <li>Status: {testResults.status || 'N/A'}</li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Method 1: Direct iframe */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Method 1: Direct iframe</h3>
            <div className="border-2 border-gray-200 rounded">
              <iframe 
                src={currentPdfUrl} 
                width="100%" 
                height="400px"
                className="rounded"
                title="PDF Direct iframe"
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              If you see the PDF here, the file is accessible but react-pdf might have issues.
            </p>
          </div>

          {/* Method 2: Object tag */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Method 2: Object tag</h3>
            <div className="border-2 border-gray-200 rounded">
              <object 
                data={currentPdfUrl} 
                type="application/pdf" 
                width="100%" 
                height="400px"
                className="rounded"
              >
                <p className="p-4 text-center text-gray-500">PDF cannot be displayed with object tag.</p>
              </object>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Alternative method using HTML object tag.
            </p>
          </div>

          {/* Method 3: Embed tag */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Method 3: Embed tag</h3>
            <div className="border-2 border-gray-200 rounded">
              <embed 
                src={currentPdfUrl} 
                type="application/pdf" 
                width="100%" 
                height="400px"
                className="rounded"
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Using HTML embed tag for PDF display.
            </p>
          </div>

          {/* Method 4: External PDF.js viewer */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Method 4: PDF.js Viewer</h3>
            <div className="border-2 border-gray-200 rounded">
              <iframe 
                src={`https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(window.location.origin + currentPdfUrl)}`}
                width="100%" 
                height="400px"
                className="rounded"
                title="PDF.js External Viewer"
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Using Mozilla's hosted PDF.js viewer.
            </p>
          </div>
        </div>

        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Troubleshooting Guide</h3>
          <ul className="text-sm space-y-2">
            <li><strong>If iframe works but react-pdf doesn't:</strong> This indicates a react-pdf configuration issue.</li>
            <li><strong>If no method works:</strong> The PDF file path is incorrect or the file doesn't exist.</li>
            <li><strong>If connectivity test fails:</strong> Check your public folder structure and file names.</li>
            <li><strong>If connectivity test passes but viewers fail:</strong> There might be a CORS or MIME type issue.</li>
          </ul>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600 mb-4">
            Open browser console to see detailed logs and error messages.
          </p>
        </div>
      </div>
    </div>
  );
}