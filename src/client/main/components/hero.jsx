import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BASE_URL}bakat`;

export default function BakatGrid() {
  const [bakat, setBakat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBakat, setSelectedBakat] = useState(null);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        if (response.data.status === "success") {
          setBakat(response.data.data);
        }
      })
      .catch(() => {
        setError("Gagal mengambil data bakat.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section
      className="py-16 bg-gradient-to-t  from-amber-100 to-amber-500"
      id="informasi-bakat"
    >
      <div className="container mx-auto px-4">
        <h3 className="text-center text-3xl font-bold text-amber-900 mb-8">
          Informasi Bakat
          <div className="line bg-amber-700 w-24 h-1 mx-auto mt-2"></div>
        </h3>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {bakat.map((item) => (
              <div
                key={item.id}
                className="relative group cursor-pointer overflow-hidden rounded-xl shadow-xl border-b-4 border-t-8  border-amber-600"
                onClick={() => setSelectedBakat(item)}
              >
                <img
                  src={item.icon}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-start justify-start p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h2 className="text-white text-lg font-bold">{item.name}</h2>
                  <h4 className="text-white text-sm">
                    {item.short_description}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedBakat && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center relative">
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                onClick={() => setSelectedBakat(null)}
              >
                &times;
              </button>
              <img
                src={selectedBakat.icon}
                alt={selectedBakat.name}
                className="w-24 h-24 mx-auto mb-4"
              />
              <h4 className="text-2xl font-bold mb-2">{selectedBakat.name}</h4>
              <p className="text-gray-600 mb-2">
                {selectedBakat.short_description}
              </p>
              <div
                className="text-gray-700 text-sm"
                dangerouslySetInnerHTML={{
                  __html: selectedBakat.full_description,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
