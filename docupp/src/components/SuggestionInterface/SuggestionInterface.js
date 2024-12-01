"use client";
import React, { useState } from 'react';
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2'


const SuggestionInterface = ({ documentId }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false); // Track if suggestions are loaded

  // Fetch suggestions from the API
  const fetchSuggestions = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5555/documents/${documentId}/suggestions`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('JWT')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch suggestions');
      }

      const data = await response.json();
      setSuggestions(data.suggestions);
      setIsLoaded(true); // Mark that suggestions are loaded
    } catch (err) {
      console.error(err.message);
    }
  };

  // Handle accept suggestion action
  const handleAccept = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:5555/suggestions/accept/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('JWT')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to accept suggestion');
      }

      const data = await response.json();
      Swal.fire({
        icon: "success",
        title: "Suggestion accepted",
        showConfirmButton: false,
        timer: 2000
      });

      // Re-fetch suggestions to show updated list
      fetchSuggestions();

    } catch (err) {
      console.error(err.message);
      Swal.fire({
        icon: "warning",
        title: "Failed to accept suggestion",
        showConfirmButton: false,
        timer: 2000
      });
    }
  };

  // Handle reject suggestion action
  const handleReject = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:5555/suggestions/deny/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('JWT')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to deny suggestion');
      }

      const data = await response.json();
      Swal.fire({
        icon: "warning",
        title: "Suggestion denied",
        showConfirmButton: false,
        timer: 2000
      }); 

      // Re-fetch suggestions to show updated list
      fetchSuggestions();

    } catch (err) {
      console.error(err.message);
      Swal.fire({
        icon: "warning",
        title: "Failed to deny suggestion",
        showConfirmButton: false,
        timer: 2000
      }); 
    }
  };

  return (
    <>
  <div className="container mx-auto mt-4 px-4">
      {/* Heading Section */}
      <div className="flex flex-col mb-8">
        <div className="max-w-lg">
          <h1 className="text-3xl font-bold mb-2" >Suggestions</h1>
          <p className="text-gray-600" >
            Review and apply suggestions generated by DocuApp AI for document improvements.
          </p>
        </div>
      </div>

      

      {/* Suggestions Section */}
      <div className="section">
        <div className="container mx-auto">
          
          {/* Suggestions List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
            {suggestions.length > 0 &&
              suggestions.map((suggestion) => (
                <div
                  className="bg-white p-4 rounded shadow"
                  key={suggestion.id}
                >
                  <p className="text-gray-800">{suggestion.suggestion_text}</p>
                  <div className="mt-4 flex space-x-4">
                    <button
                      onClick={() => handleAccept(suggestion.id)}
                      className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded hover:bg-green-600"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(suggestion.id)}
                      className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
          </div>

          {/* Load Suggestions Button */}
          {!isLoaded && (
            <div className="text-center">
              <button
                onClick={fetchSuggestions}
                className="px-6 py-3 bg-black text-white rounded shadow hover:bg-gray-800"
              >
                Load Suggestions
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default SuggestionInterface;
