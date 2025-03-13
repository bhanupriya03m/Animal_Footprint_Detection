import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { UploadCloud, Camera, Trash2 } from "lucide-react";

export default function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [prediction, setPrediction] = useState(null); // Store predicted class

  // --- File Upload Logic ---
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image")) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setPrediction(null); // Reset prediction on new image upload
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("image")) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setPrediction(null); // Reset prediction on new image upload
    }
  };

  // --- Open Camera for Photo Capture ---
  const startCamera = async () => {
    try {
      const cameraStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(cameraStream);
      videoRef.current.srcObject = cameraStream;
      videoRef.current.play();
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  // --- Capture Photo from Camera ---
  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Match canvas to video resolution
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageUrl = canvas.toDataURL("image/png");

    setPreview(imageUrl);
    setSelectedFile(null); // We only have data URL
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    setStream(null);
    setPrediction(null); // Reset prediction on new capture
  };

  // --- Submit to FastAPI ---
  const handleSubmit = async () => {
    if (!preview && !selectedFile) {
      alert("Please select or capture a footprint first!");
      return;
    }
    try {
      let formData = new FormData();

      // If the user uploaded a file from disk
      if (selectedFile) {
        formData.append("file", selectedFile);
      } 
      // If the user captured from camera => preview is dataURL
      else if (preview) {
        // Convert dataURL to Blob
        const res = await fetch(preview);
        const blob = await res.blob();
        formData.append("file", blob, "footprint.png");
      }

      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      
      // ✅ Extract the correct key 'predicted_class'
      if (data.predicted_class) {
        setPrediction(data.predicted_class); // ✅ Set prediction state correctly
      } else if (data.error) {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("Error submitting footprint:", error);
      alert("An error occurred while submitting the footprint.");
    }
  };

  // --- Remove Preview ---
  const removePreview = () => {
    setPreview(null);
    setSelectedFile(null);
    setPrediction(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#005266] to-[#9D2450] text-white">
      {/* Navbar */}
      <nav className="bg-[#005266]/90 shadow-md py-5 px-8 flex justify-between items-center">
        <Link to="/" className="text-[#D7FF00] text-2xl font-bold">WildTrack</Link>
        <Link
          to="/"
          className="bg-[#D7FF00] text-[#005266] px-6 py-2 rounded-full font-semibold hover:bg-white transition"
        >
          Back to Home
        </Link>
      </nav>

      {/* Upload Section */}
      <div className="container mx-auto px-6 py-12">
        <motion.div
          className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg text-gray-800"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-center text-[#005266] mb-6">
            Upload or Capture Footprint
          </h2>

          {/* Drag & Drop Upload */}
          <div
            className="border-2 border-dashed border-[#005266] rounded-xl p-10 text-center bg-gray-100 hover:bg-gray-200 transition"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <UploadCloud className="mx-auto text-[#005266] h-12 w-12 mb-4" />
            <p className="text-gray-700">Drag & drop an image here</p>
            <p className="text-gray-500">or</p>
            <label className="bg-[#005266] text-white px-6 py-2 rounded-full font-semibold cursor-pointer mt-2 inline-block">
              Browse Files
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>

          {/* Camera Capture Button */}
          <div className="flex justify-center mt-6">
            <button
              className="flex items-center space-x-2 bg-[#D7FF00] text-[#005266] px-6 py-3 rounded-full font-semibold hover:bg-white transition"
              onClick={startCamera}
            >
              <Camera className="h-5 w-5" /> <span>Open Camera</span>
            </button>
          </div>

          {/* Live Camera Preview */}
          {stream && (
            <div className="mt-6 text-center">
              <video
                ref={videoRef}
                autoPlay
                className="mx-auto rounded-lg shadow-md w-[400px] h-[400px] object-cover"
              />
              <button
                className="mt-4 bg-[#005266] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#003B4A] transition"
                onClick={capturePhoto}
              >
                Capture Photo
              </button>
            </div>
          )}

          {/* Image Preview & Prediction */}
          {preview && (
            <div className="mt-6 text-center">
              <img
                src={preview}
                alt="Footprint"
                className="mx-auto rounded-lg shadow-md w-[400px] h-[400px] object-cover"
              />
              <div className="flex justify-center space-x-4 mt-4">
                <button className="bg-red-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-600 transition" onClick={removePreview}>
                  <Trash2 className="h-5 w-5 inline-block mr-2" /> Remove
                </button>
                <button className="bg-[#005266] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#003B4A] transition" onClick={handleSubmit}>
                  Submit Footprint
                </button>
              </div>
              {prediction && (
                <div className="mt-4 text-[#005266] text-xl font-bold">
                  Predicted Animal: {prediction}
                </div>
              )}
            </div>
          )}

          <canvas ref={canvasRef} className="hidden"></canvas>
        </motion.div>
      </div>
    </div>
  );
}
