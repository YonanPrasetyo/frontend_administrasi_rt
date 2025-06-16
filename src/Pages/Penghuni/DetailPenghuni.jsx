import { useParams, Link } from "react-router-dom";
import { getPenghuniDetail } from "../../Api/PenghuniService";
import { useEffect, useState } from "react";

const DetailPenghuni = () => {
  const { id } = useParams();

  const [penghuni, setPenghuni] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchPenghuni = async () => {
      try {
        const response = await getPenghuniDetail(id);
        setPenghuni(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching penghuni:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchPenghuni();
  }, [id]);

  console.log(penghuni);

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Detail Penghuni</h1>
        <Link
          to={`/penghuni/edit/${id}`}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Edit
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            {penghuni.nama_lengkap}
          </h2>
          <p className="text-sm text-gray-500">
            Status: {penghuni.status_penghuni}
          </p>
        </div>
        <div className="px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Nomor Telepon
              </h3>
              <p className="mt-1 text-sm text-gray-900">
                {penghuni.nomor_telepon}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Status Pernikahan
              </h3>
              <p className="mt-1 text-sm text-gray-900">
                {penghuni.status_nikah}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Tanggal Masuk
              </h3>
              <p className="mt-1 text-sm text-gray-900">
                {penghuni.tanggal_masuk || "-"}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Tanggal Keluar
              </h3>
              <p className="mt-1 text-sm text-gray-900">
                {penghuni.tanggal_keluar || "-"}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Nomor Rumah</h3>
              <p className="mt-1 text-sm text-gray-900">
                {penghuni.nomor_rumah || "-"}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Foto KTP</h3>
              <div className="mt-2 max-h-96 overflow-y-auto border border-gray-300">
                <img
                  src={penghuni.foto_ktp_url}
                  alt={penghuni.foto_ktp_filename}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <Link to="/penghuni" className="text-indigo-600 hover:text-indigo-900">
          &larr; Kembali ke Daftar Penghuni
        </Link>
      </div>
    </div>
  );
};

export default DetailPenghuni;
