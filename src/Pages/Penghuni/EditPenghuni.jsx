import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updatePenghuni, getPenghuniDetail } from "../../Api/PenghuniService";

const EditPenghuni = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [penghuni, setPenghuni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getPenghuniDetail(id);
        setPenghuni(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  console.log(penghuni);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log(data);
    updatePenghuni(id, data);

    navigate("/penghuni");
  };

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Penghuni</h1>

      <div className="bg-white shadow rounded-lg p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                name="nama_lengkap"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
                defaultValue={penghuni.nama_lengkap}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nomor Telepon
              </label>
              <input
                type="tel"
                name="nomor_telepon"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
                defaultValue={penghuni.nomor_telepon}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status Penghuni
              </label>
              <select
                name="status_penghuni"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              >
                <option
                  value="kontrak"
                  selected={penghuni.status_penghuni === "kontrak"}
                >
                  Kontrak
                </option>
                <option
                  value="tetap"
                  selected={penghuni.status_penghuni === "tetap"}
                >
                  Tetap
                </option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status Pernikahan
              </label>
              <select
                name="status_nikah"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              >
                <option
                  value="belum"
                  selected={penghuni.status_nikah === "belum"}
                >
                  Belum Menikah
                </option>
                <option
                  value="sudah"
                  selected={penghuni.status_nikah === "sudah"}
                >
                  Sudah Menikah
                </option>
              </select>
            </div>

            <div className="">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Foto KTP
              </label>
              <input
                type="file"
                name="foto_ktp"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                accept="image/jpeg,image/png,image/jpg"
              />
              <p className="text-xs text-gray-500 mt-1">
                Format: JPEG, PNG, JPG (Maksimal 2MB)
              </p>
              <span className="text-sm text-gray-600">
                File Saat ini: {penghuni.foto_ktp_filename}
              </span>
            </div>
            <div className="mt-2 max-h-96 overflow-y-auto border border-gray-300">
              <img
                src={penghuni.foto_ktp_url}
                alt={penghuni.foto_ktp_filename}
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate("/penghuni")}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPenghuni;
