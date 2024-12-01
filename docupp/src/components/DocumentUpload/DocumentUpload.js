"use client";

import { useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { PulseLoader } from "react-spinners";
import Swal from 'sweetalert2';

const DocumentUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    setLoading(true);
  
    if (!selectedFile) {
      alert("Please select a file first.");
      setLoading(false);
      return;
    }
  
    const formData = new FormData();
    formData.append("file", selectedFile);
  
    try {
      console.log("Uploading file:", selectedFile);
  
      const response = await fetch("http://127.0.0.1:5555/documents/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JWT")}`,
        },
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Error uploading document");
      }
  
      const data = await response.json();
      setErrorMessage(""); // Clear error message on successful upload
      Swal.fire({
        icon: "success",
        title: "Document uploaded and processed successfully",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      console.error("Error uploading document:", error.message);
      Swal.fire({
        icon: "warning",
        title: "Error uploading document",
        showConfirmButton: false,
        timer: 2000,
      });
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className=" bg-gray-50 py-12">
      <div className=" mx-auto px-4">
        <div className="relative flex flex-col-reverse px-4 py-16 mx-auto lg:block lg:flex-col lg:py-32 xl:py-48 md:px-8 sm:max-w-xl md:max-w-full">
          <div className="z-0 flex justify-center h-full -mx-4 overflow-hidden lg:pt-24 lg:pb-16 lg:pr-8 xl:pr-0 lg:w-1/2 lg:absolute lg:justify-end lg:bottom-0 lg:left-0 lg:items-center">
            <img
              src="https://images.unsplash.com/photo-1695891888323-661dbe27dc79?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDYyfHx8ZW58MHx8fHx8"
              className="object-cover object-right w-full h-auto lg:w-auto lg:h-full"
              alt=""
            />
          </div>
          <div className="relative flex justify-end max-w-xl mx-auto xl:pr-32 lg:max-w-screen-xl">
            <div className="mb-16 lg:pr-5 lg:max-w-lg lg:mb-0">
              <div className="w-full ">
                <div>
                  <h2 className="text-3xl flex gap-2 font-bold mb-4 text-gray-800">
                    Upload Your Document
                    {/* <span className="inline-block  text-purple-400">
                      Document
                    </span> */}
                  </h2>
                  <p
                    className="text-gray-600 mb-6"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    Please upload documents using the button below. Supported
                    formats include .pdf,.doc,.docx,.txt.
                  </p>

                  <div className="mb-6" >
                  <label htmlFor="fileInput">Upload File</label>
                    <input
                      id="fileInput"
                      type="file"
                      onChange={handleFileChange}
                      className="block w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                      accept=".pdf,.doc,.docx,.txt"
                    />
                  </div>

                  <button
                    className={`flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg shadow hover:bg-gray-800 transition`}
                    onClick={handleUpload}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <PulseLoader color="white" />
                        <span>Uploading</span>
                      </>
                    ) : (
                      <>
                        <IoCloudUploadOutline size={20} />
                        <span>Upload Document</span>
                      </>
                    )}
                  </button>

                  {errorMessage && (
                    <p
                      className="mt-3 text-red-600"
                      data-aos="fade-up"
                      data-aos-delay="500"
                    >
                      {errorMessage}
                    </p>
                  )}

                  {selectedFile && (
                    <p
                      className="mt-3 text-gray-700"
                      data-aos="fade-up"
                      data-aos-delay="500"
                    >
                      Selected file: {selectedFile.name}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentUpload;
