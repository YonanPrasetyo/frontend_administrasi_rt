import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPenghuniList, deletePenghuni } from "../../Api/PenghuniService";

const PenghuniList = () => {
  const [penghuni, setPenghuni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPenghuniList();
        setPenghuni(data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus penghuni ini?")) {
      try {
        await deletePenghuni(id);
        setPenghuni(penghuni.filter((item) => item.id_penghuni !== id));
      } catch (err) {
        console.error("Error deleting penghuni:", err);
      }
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error)
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Daftar Penghuni</h1>
        <Link
          to="/penghuni/add"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Tambah Penghuni
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nama Lengkap
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nomor Rumah
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status Tinggal
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nomor Telepon
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status Pernikahan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {penghuni.map((p) => (
              <tr key={p.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {p.nama_lengkap}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {p.nomor_rumah}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {p.status_penghuni}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {p.nomor_telepon}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {p.status_nikah}
                </td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <Link
                    to={`/penghuni/detail/${p.id_penghuni}`}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Detail
                  </Link>
                  <Link
                    to={`/penghuni/edit/${p.id_penghuni}`}
                    className="text-yellow-600 hover:text-yellow-900"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(p.id_penghuni)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PenghuniList;
