// src/components/FileUpload.jsx

import React, { useState } from "react";
import { uploadToPinata } from "../utils/pinataUploader.js";

function FileUpload() {
  const [file, setFile] = useState(null);
  const [ipfsUrl, setIpfsUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setIpfsUrl("");
    setError("");
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const result = await uploadToPinata(file);
      setIpfsUrl(`https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        Upload File to IPFS (via Pinata)
      </h2>
      <input type="file" onChange={handleFileChange} />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
        onClick={handleUpload}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {ipfsUrl && (
        <div className="mt-4">
          ✅ File uploaded! IPFS URL:{" "}
          <a
            href={ipfsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            {ipfsUrl}
          </a>
        </div>
      )}

      {error && <div className="text-red-500 mt-4">❌ {error}</div>}
    </div>
  );
}

export default FileUpload;
