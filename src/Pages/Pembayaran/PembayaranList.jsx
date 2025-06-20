import { Link } from "react-router-dom";
import { useState } from "react";
import { getPembayaranList, deletePembayaran } from "../../Api/PembayaranService";

const PembayaranList = () => {
  const [pembayaran, setPembayaran] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useState(() => {
    const fetchData = async () => {
      try {
        const response = await getPembayaranList();
        setPembayaran(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  })

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus pembayaran ini?")) {
      try {
        await deletePembayaran(id);
        setPembayaran(pembayaran.filter((item) => item.id_pembayaran !== id));
      } catch (err) {
        console.error("Error deleting pembayaran:", err);
      }
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Daftar Pembayaran</h1>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Penghuni
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nomor Rumah
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tanggal Pembayaran
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Jenis Iuran
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Jumlah
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Iuran Bulan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pembayaran.map((pembayaran) => (
              <tr key={pembayaran.id_pembayaran}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {pembayaran.penghuni}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {pembayaran.nomor_rumah}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {pembayaran.tanggal}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {pembayaran.jenis}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  Rp. {pembayaran.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {pembayaran.bulan} {pembayaran.tahun}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      pembayaran.status === "Lunas"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {pembayaran.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <Link
                    onClick={() => handleDelete(pembayaran.id_pembayaran)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Hapus
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PembayaranList;
