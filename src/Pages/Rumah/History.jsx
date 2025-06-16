import { getHistoryByRumah } from "../../Api/RumahService";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const History = () => {
  const { id } = useParams();

  const [historyData, setHistoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getHistoryByRumah(id);
        setHistoryData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message || "Terjadi kesalahan");
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
        Detail Rumah
      </h2>
      <div className="mb-6 space-y-1">
        <p>
          <span className="font-semibold text-gray-700">Nomor Rumah:</span>{" "}
          {historyData.rumah.nomor_rumah}
        </p>
        <p>
          <span className="font-semibold text-gray-700">Status Rumah:</span>{" "}
          {historyData.rumah.status_rumah}
        </p>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
        Riwayat Pembayaran
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm rounded-md overflow-hidden">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Tanggal</th>
              <th className="px-4 py-2 text-left">Tahun</th>
              <th className="px-4 py-2 text-left">Bulan</th>
              <th className="px-4 py-2 text-left">Jenis</th>
              <th className="px-4 py-2 text-left">Total</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {historyData.history.map((item) => (
              <tr key={item.id_pembayaran} className="hover:bg-gray-50">
                <td className="px-4 py-2">{item.tanggal}</td>
                <td className="px-4 py-2">{item.tahun}</td>
                <td className="px-4 py-2">{item.bulan}</td>
                <td className="px-4 py-2 capitalize">{item.jenis}</td>
                <td className="px-4 py-2 font-medium text-green-600">
                  Rp{item.total.toLocaleString("id-ID")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
