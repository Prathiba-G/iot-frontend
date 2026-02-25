import { useEffect, useState, useRef } from "react";

const API_URL = import.meta.env.VITE_API_URL;
if (!API_URL) {
  console.error("VITE_API_URL is not defined");
}

export default function Admin() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const fileInputRef = useRef(null);

  const fetchImages = async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const res = await fetch(`${API_URL}/api/images`, {
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: "Unknown error" }));
        throw new Error(errorData.error || `Failed to fetch images (${res.status})`);
      }
      
      const data = await res.json();
      setImages(data);
    } catch (err) {
      let errorMessage = "Failed to load images";
      
      if (err.name === "AbortError") {
        errorMessage = "Request timed out. Please check your connection.";
      } else if (err.message === "Failed to fetch") {
        errorMessage = "Cannot connect to server. Please ensure the backend is running.";
      } else {
        errorMessage = err.message || "Failed to load images";
      }
      
      setMessage({ type: "error", text: errorMessage });
      console.error("Fetch images error:", err);
    }
  };


  useEffect(() => {
    fetchImages();
  }, []);

  const handleUpload = async (file) => {
    if (!file) {
      setMessage({ type: "error", text: "Please select a file first" });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const formData = new FormData();
      formData.append("image", file);

      // Create an AbortController for timeout handling
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const res = await fetch(`${API_URL}/api/upload`, {
        method: "POST",
        body: formData,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Check if response is ok before parsing JSON
      let data;
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();
        data = { error: text || "Server returned non-JSON response" };
      }

      if (!res.ok) {
        throw new Error(data.error || `Upload failed with status ${res.status}`);
      }

      setMessage({ type: "success", text: data.message || "Upload successful!" });
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      // Refresh images list
      await fetchImages();
    } catch (err) {
      let errorMessage = "Upload failed. Please try again.";
      
      if (err.name === "AbortError") {
        errorMessage = "Upload timed out. Please check your connection and try again.";
      } else if (err.message === "Failed to fetch") {
        errorMessage = "Cannot connect to server. Please ensure the backend is running on port 5000.";
      } else if (err.message.includes("NetworkError")) {
        errorMessage = "Network error. Please check your internet connection.";
      } else {
        errorMessage = err.message || "Upload failed. Please try again.";
      }
      
      setMessage({ type: "error", text: errorMessage });
      console.error("Upload error:", err);
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async (filename) => {
    if (!confirm("Are you sure you want to delete this image?")) return;
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const res = await fetch(`${API_URL}/api/images/${filename}`, {
        method: "DELETE",
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: "Delete failed" }));
        throw new Error(data.error || `Delete failed (${res.status})`);
      }

      setMessage({ type: "success", text: "Image deleted successfully" });
      await fetchImages();
    } catch (err) {
      let errorMessage = "Delete failed";
      
      if (err.name === "AbortError") {
        errorMessage = "Request timed out. Please try again.";
      } else if (err.message === "Failed to fetch") {
        errorMessage = "Cannot connect to server. Please ensure the backend is running.";
      } else {
        errorMessage = err.message || "Delete failed";
      }
      
      setMessage({ type: "error", text: errorMessage });
      console.error("Delete error:", err);
    }
  };


  return (
    <section style={{ padding: 40 }}>
      <h1>Admin Gallery</h1>

      {message.text && (
        <div
          style={{
            padding: "10px 15px",
            marginBottom: 15,
            borderRadius: 4,
            backgroundColor: message.type === "error" ? "#ffebee" : "#e8f5e9",
            color: message.type === "error" ? "#c62828" : "#2e7d32",
            border: `1px solid ${message.type === "error" ? "#ef9a9a" : "#a5d6a7"}`,
          }}
        >
          {message.text}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        disabled={loading}
        onChange={(e) => handleUpload(e.target.files[0])}
      />

      {loading && <p style={{ marginTop: 10, color: "#666" }}>Uploading...</p>}

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 20 }}>
        {images.map((img) => (
          <div key={img} style={{ textAlign: "center" }}>
            <img
              src={`${API_URL}/uploads/${img}`}
              width={120}
              height={120}
              style={{ objectFit: "cover", display: "block" }}
              alt=""
            />
            <button 
              onClick={() => handleDelete(img)}
              style={{ marginTop: 5 }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
