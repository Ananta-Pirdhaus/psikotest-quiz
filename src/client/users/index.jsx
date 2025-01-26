import React, { useEffect, useState } from "react";
import UserPeserta from "./components/users";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function Index() {
  const [data, setData] = useState({
    jurusan: [],
    perguruanTinggi: [],
    sekolah: [],
    kelas: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const responses = await Promise.all([
          axios.get(`${BASE_URL}jurusan`),
          axios.get(`${BASE_URL}perguruan-tinggi`),
          axios.get(`${BASE_URL}sekolah`),
          axios.get(`${BASE_URL}kelas?status=Active`),
        ]);

        setData({
          jurusan: responses[0]?.data || [],
          perguruanTinggi: responses[1]?.data || [],
          sekolah: responses[2]?.data || [],
          kelas: responses[3]?.data || [],
        });
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-purple-50">
        <button
          type="button"
          className="pointer-events-none inline-block rounded bg-gradient-to-r from-purple-400 to-purple-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-lg transition duration-150 ease-in-out disabled:opacity-70"
          disabled
        >
          <div
            className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-white border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          ></div>
          <span className="ml-2">Loading...</span>
        </button>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <UserPeserta
      data={data}
      jurusan={data.jurusan}
      perguruanTinggi={data.perguruanTinggi}
      sekolah={data.sekolah}
      kelas={data.kelas}
    />
  );
}

export default Index;
