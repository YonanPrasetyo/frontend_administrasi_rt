import { useNavigate, useParams } from "react-router-dom";
import { getPengeluaranDetail, updatePengeluaran } from "../../Api/PengeluaranService";
import { useState, useEffect } from "react";

const EditPengeluaran = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pengeluaran, setPengeluaran] = useState([])

  useEffect(() => {
    const fetchPengeluaran = async () => {
      try {
        const response = await getPengeluaranDetail(id);
        setPengeluaran(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching pengeluaran:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchPengeluaran();
  }, [id]);  

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    updatePengeluaran(id, data);

    navigate("/pengeluaran");
  };

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Pengeluaran</h1>

      <div className="bg-white shadow rounded-lg p-6">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tanggal
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
                name="tanggal"
                defaultValue={pengeluaran.tanggal}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Pengeluaran
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
                name="nama"
                defaultValue={pengeluaran.nama}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Jumlah
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
                name="jumlah"
                defaultValue={pengeluaran.jumlah}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Keterangan
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={3}
                name="keterangan"
                defaultValue={pengeluaran.keterangan ?? ""}
              ></textarea>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate("/pengeluaran")}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPengeluaran;
