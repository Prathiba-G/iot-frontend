import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;
if (!API_URL) {
  console.error("VITE_API_URL is not defined");
}

export default function Gallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/images`)
      .then((res) => res.json())
      .then(setImages);
  }, []);

  if (images.length === 0) {
    return <p style={{ padding: 40 }}>No images uploaded yet.</p>;
  }

  return (
    <section style={{ padding: 40 }}>
      <h1>Project Gallery</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 16,
        }}
      >
        {images.map((img) => (
          <img
            key={img}
            src={`${API_URL}/images/${img}`}
            alt=""
            style={{ width: "100%", height: 180, objectFit: "cover" }}
          />
        ))}
      </div>
    </section>
  );
}
