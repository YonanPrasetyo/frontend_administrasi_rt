import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPenghuniList } from "../../Api/PenghuniService";
import {
  addPenghuni,
  removePenghuni,
  getRumahDetail,
} from "../../Api/RumahService";

const DetailRumah = () => {
  const { id } = useParams();
  const [selectedPenghuni, setSelectedPenghuni] = useState("");
  const [availablePenghuni, setAvailablePenghuni] = useState([]);
  const [rumah, setRumah] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingPenghuni, setLoadingPenghuni] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [rumahResponse, penghuniResponse] = await Promise.all([
          getRumahDetail(id),
          getPenghuniList(),
        ]);
        const penghuni = penghuniResponse.data.filter((penghuni) => penghuni.tanggal_masuk === null);
        setAvailablePenghuni(penghuni);
        setRumah(rumahResponse.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleTambahPenghuni = async () => {
    try {
      setLoading(true);
      await addPenghuni(rumah.id_rumah, {id_penghuni: selectedPenghuni});

      // Refresh data
      const response = await getRumahDetail(id);
      setRumah(response.data);
      setSelectedPenghuni("");
      setLoading(false);
      setLoadingPenghuni(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
      setLoadingPenghuni(false);
    }
  };

  const handleKeluarkanPenghuni = async (idPenghuniRumah) => {
    try {
      setLoading(true);
      await removePenghuni(rumah.id_rumah, {id_penghuni: idPenghuniRumah});

      const response = await getRumahDetail(id);
      setRumah(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;
  }

  if (!rumah) {
    return <div className="text-center py-4">Data rumah tidak ditemukan</div>;
  }

  const penghuniAktif = rumah.penghuni_rumah?.filter((p) => p.tanggal_keluar === null) || [];
  const penghuniHistori = rumah.penghuni_rumah?.filter((p) => p.tanggal_keluar !== null) || [];
  console.log("Available Penghuni:", availablePenghuni);
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Detail Rumah No. {rumah.nomor_rumah}
        </h1>
      </div>

      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Tambah Penghuni Baru
        </h2>
        <div className="flex items-end space-x-4">
          <div className="flex-1">
            <label
              htmlFor="penghuni"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Pilih Penghuni
            </label>
            {!loadingPenghuni ? (
              <div className="animate-pulse h-8 bg-gray-200 rounded"></div>
            ) : (
              <select
                id="penghuni"
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={selectedPenghuni}
                onChange={(e) => setSelectedPenghuni(e.target.value)}
              >
                <option value="">-- Pilih Penghuni --</option>
                {availablePenghuni.length > 0 ? (
                  availablePenghuni.map((penghuni) => (
                    <option
                      key={penghuni.id_penghuni}
                      value={penghuni.id_penghuni}
                    >
                      {penghuni.nama_lengkap}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    Tidak ada penghuni tersedia
                  </option>
                )}
              </select>
            )}
          </div>
          <button
            onClick={handleTambahPenghuni}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
            disabled={!selectedPenghuni || loading}
          >
            {loading ? "Memproses..." : "Tambahkan"}
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Informasi Rumah</h2>
        </div>
        <div className="px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Nomor Rumah</h3>
              <p className="mt-1 text-sm text-gray-900">{rumah.nomor_rumah}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Status</h3>
              <p className="mt-1 text-sm text-gray-900">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    rumah.status_rumah === "tidak dihuni"
                      ? "bg-red-100 text-red-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {rumah.status_rumah}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Penghuni Aktif</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Masuk
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {penghuniAktif.length > 0 ? (
                penghuniAktif.map((penghuni) => (
                  <tr key={penghuni.id_penghuni_rumah}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {penghuni.nama_lengkap}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {penghuni.status_penghuni}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(penghuni.tanggal_masuk).toLocaleDateString(
                        "id-ID"
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() =>
                          handleKeluarkanPenghuni(penghuni.id_penghuni)
                        }
                        className="text-red-600 hover:text-red-900 disabled:opacity-50"
                        disabled={loading}
                      >
                        {loading ? "Memproses..." : "Keluarkan"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    Tidak ada penghuni aktif
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            Histori Penghuni
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Masuk
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Keluar
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {penghuniHistori.length > 0 ? (
                penghuniHistori.map((penghuni) => (
                  <tr key={penghuni.id_penghuni_rumah}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {penghuni.nama_lengkap}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {penghuni.status_penghuni}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(penghuni.tanggal_masuk).toLocaleDateString(
                        "id-ID"
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(penghuni.tanggal_keluar).toLocaleDateString(
                        "id-ID"
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    Tidak ada histori penghuni
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4">
        <Link to="/rumah" className="text-indigo-600 hover:text-indigo-900">
          &larr; Kembali ke Daftar Rumah
        </Link>
      </div>
    </div>
  );
};

export default DetailRumah;
