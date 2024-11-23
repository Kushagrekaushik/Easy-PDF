import React, { useState, useRef } from "react";
import { FaFileWord } from "react-icons/fa6";
import axios from "axios";

function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [convertStatus, setConvertStatus] = useState(""); 
  const [downloadError, setDownloadError] = useState("");
  const [convertedFile, setConvertedFile] = useState(""); 
  const [metadata, setMetadata] = useState(null);
  const fileInputRef = useRef(null); 

  axios.defaults.withCredentials=true;
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setConvertStatus("");
    setDownloadError("");
    setConvertedFile("");
    setMetadata(null);
  };

  
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      setConvertStatus("Please select a file");
      return;
    }

    if (!selectedFile.name.endsWith(".docx")) {
      setConvertStatus("Please upload a .docx file");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setConvertStatus("Converting...");
      const response = await axios.post("https://easy-pdf-eta.vercel.app/convertFile", formData, {
        responseType: "json",
      });

      if (response.data.downloadLink) {
        setConvertedFile(response.data.downloadLink); 
        setMetadata({
          filename: response.data.filename || selectedFile.name,
          size: (selectedFile.size / 1024).toFixed(2) + " KB", 
        });
        setConvertStatus("File Converted Successfully");
      } else {
        setDownloadError("Conversion failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setConvertStatus("");
      setDownloadError("Error occurred during conversion. Please try again.");
    }
  };


  const handleDownload = async () => {
    if (convertedFile) {
      try {
        const response = await axios.get(`https://easy-pdf-eta.vercel.app${convertedFile}`, {
          responseType: "blob",
        });

       
        const blob = new Blob([response.data], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = metadata.filename.replace(".docx", ".pdf"); 
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        
        fileInputRef.current.value = "";
        setSelectedFile(null);
        setConvertedFile("");
        setConvertStatus("");
        setMetadata(null);
      } catch (error) {
        console.error("Error during file download:", error);
        setDownloadError("Failed to download file.");
      }
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto container px-6 py-3 md:px-40">
      <div className="flex h-screen items-center justify-center">
        <div className="border-2 border-dashed px-4 py-2 md:px-8 md:py-6 border-indigo-400 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-4">Convert Docx to PDF Online</h1>
          <p className="text-sm text-center mb-5">
            Easily convert Docx documents to PDF format online.
          </p>

          <div className="flex flex-col items-center space-y-4">
            <input
              type="file"
              accept=".docx"
              onChange={handleFileChange}
              className="hidden"
              id="FileInput"
              ref={fileInputRef} 
            />
            <label
              htmlFor="FileInput"
              className="w-full flex items-center justify-center px-4 py-6 bg-gray-100 text-gray-700 rounded-lg shadow-lg cursor-pointer border-blue-300 hover:bg-blue-700 duration-300 hover:text-white"
            >
              <FaFileWord className="text-3xl mr-3" />
              <span className="text-2xl mr-2">
                {selectedFile ? selectedFile.name : "Choose File"}
              </span>
            </label>
            <button
              onClick={handleSubmit}
              disabled={!selectedFile || convertStatus === "Converting..."}
              className="text-white bg-blue-500 hover:bg-blue-700 disabled:bg-gray-400 disabled:pointer-events-none duration-300 font-bold px-4 py-2 rounded-lg"
            >
              {convertStatus === "Converting..." ? "Converting..." : "Convert File"}
            </button>

            <div className="text-center">
              {convertStatus && <p className="text-green-500">{convertStatus}</p>}
              {downloadError && <p className="text-red-500">{downloadError}</p>}
            </div>

            {metadata && (
              <div className="bg-gray-200 p-4 rounded-lg shadow-lg mt-4">
                <h3 className="text-lg font-semibold">Metadata:</h3>
                <p>Filename: {metadata.filename}</p>
                <p>Size: {metadata.size}</p>
              </div>
            )}

            {convertedFile && (
              <button
                onClick={handleDownload}
                className="mt-4 text-white bg-green-500 hover:bg-green-700 duration-300 font-bold px-4 py-2 rounded-lg"
              >
                Download Converted File
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
