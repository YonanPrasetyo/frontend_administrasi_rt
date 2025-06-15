import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getRumahList, deleteRumah } from "../../Api/RumahService";

const RumahList = () => {
  const [rumah, setRumah] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRumahList();
        setRumah(data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus rumah ini?")) {
      try {
        await deleteRumah(id);
        setRumah(rumah.filter((item) => item.id_rumah !== id));
      } catch (err) {
        console.error("Error deleting rumah:", err);
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
        <h1 className="text-2xl font-bold">Daftar Rumah</h1>
        <Link
          to="/rumah/add"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Tambah Rumah
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nomor Rumah
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Jumalh Penghuni
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pembayaran Terakhir
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pembayaran
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rumah.map((rumah) => (
              <tr key={rumah.id_rumah}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {rumah.nomor_rumah}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {rumah.jumlah_penghuni_rumah}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      rumah.status_rumah === "tidak dihuni"
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {rumah.status_rumah}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {rumah.bulan_pembayaran_terakhir === null &&
                  rumah.tahun_pembayaran_terakhir === null
                    ? "Belum ada pembayaran"
                    : `${rumah.bulan_pembayaran_terakhir}  ${rumah.tahun_pembayaran_terakhir}`}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {rumah.status_rumah === "dihuni" ? (
                    <Link
                      to={`/pembayaran/add/${rumah.id_rumah}`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Pembayaran
                    </Link>
                  ) : (
                    "Tidak dihuni"
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <Link
                    to={`/rumah/detail/${rumah.id_rumah}`}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Detail
                  </Link>
                  <Link
                    to={`/rumah/edit/${rumah.id_rumah}`}
                    className="text-yellow-600 hover:text-yellow-900"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(rumah.id_rumah)}
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

export default RumahList;
