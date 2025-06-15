import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPengeluaranList } from "../../Api/PengeluaranService";

const PengeluaranList = () => {
  const [pengeluaran, setPengeluaran] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPengeluaranList();
        setPengeluaran(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  console.log(pengeluaran);
  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Daftar Pengeluaran</h1>
        <Link
          to="/pengeluaran/add"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Tambah Pengeluaran
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tanggal
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kategori
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Jumlah
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Keterangan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pengeluaran.map((pengeluaran) => (
              <tr key={pengeluaran.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {pengeluaran.tanggal}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {pengeluaran.nama}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  Rp. {pengeluaran.jumlah.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {pengeluaran.keterangan}
                </td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <Link
                    to={`/pengeluaran/edit/${pengeluaran.id_pengeluaran}`}
                    className="text-yellow-600 hover:text-yellow-900"
                  >
                    Edit
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

export default PengeluaranList;
