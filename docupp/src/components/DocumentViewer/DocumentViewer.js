"use client";
import { useEffect } from 'react';
import SuggestionInterface from "@/components/SuggestionInterface/SuggestionInterface"; 
import { IoCloudDownloadOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { fetchDocument } from '@/redux/slices/sliceActions';

const DocumentViewer = () => {
  const dispatch = useDispatch();
  const {documents, loading, error} = useSelector(state => state.document);
  const documentId = documents?.data?.latest_document?.id;
  const improvedDocument = documents?.data?.latest_document?.improved_content
  const originalDocument = documents?.data?.latest_document?.original_content

  useEffect(() => {
    dispatch(fetchDocument())
  }, []);

  // Function to handle export to Word
  const exportToWord = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5555/export-document/${documentId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('JWT')}`, 
        },
      });

      if (!response.ok) {
        throw new Error('Failed to export document');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'improved_document.docx'); // Name of the file
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (err) {
      console.error('Error exporting document:', err);
    }
  };

  return (
  <div className="section document-viewer-section bg-gray-100 py-8">
  <div className="container mx-auto px-4">
    
    {/* Heading Section */}
    <div className="mb-8 text-center" data-aos="fade-up">
      <h2 className="text-3xl font-bold text-purple-400">
        View Documents
      </h2>
      <p className="text-gray-600 mt-2">
        View the original document with its improved version side by side.
      </p>
    </div>
    
    {/* Document Display Section */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      
      {/* Original Document */}
      <div data-aos="fade-up" data-aos-delay="100">
        <div className="document-section bg-white p-4 shadow rounded">
          <h3 className="text-lg font-semibold  mb-2">Original Document</h3>
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <p className="text-gray-700">{originalDocument || "Loading original document..."}</p>
          )}
        </div>
      </div>
      
      {/* Improved Document */}
      <div data-aos="fade-up" data-aos-delay="200">
        <div className="document-section bg-white p-4 shadow rounded">
          <h3 className="text-lg font-semibold mb-2">Improved Document</h3>
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <p className="text-gray-700">{improvedDocument || "Loading improved document..."}</p>
          )}

          {/* Export Button */}
          <div className="mt-4">
            <button
              className="flex items-center gap-2 upload-button bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
              onClick={exportToWord}
            >
              <IoCloudDownloadOutline size={20}/> 
              <span>Download</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* SuggestionInterface */}
    {documentId && <SuggestionInterface documentId={documentId} />}
  </div>
</div>


  );
};

export default DocumentViewer;
