import { useNavigate, useParams } from "react-router-dom";

const EditPengeluaran = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Sample data
  const pengeluaran = {
    id: id,
    tanggal: "2023-01-15",
    kategori: "Listrik",
    jumlah: "500000",
    keterangan: "Pembayaran PLN",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to update data
    navigate("/pengeluaran");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Pengeluaran</h1>

      <div className="bg-white shadow rounded-lg p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tanggal
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                defaultValue={pengeluaran.tanggal}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kategori
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                defaultValue={pengeluaran.kategori}
                required
              >
                <option value="Listrik">Listrik</option>
                <option value="Air">Air</option>
                <option value="Kebersihan">Kebersihan</option>
                <option value="Perbaikan">Perbaikan</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Jumlah
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                defaultValue={pengeluaran.jumlah}
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Keterangan
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={3}
                defaultValue={pengeluaran.keterangan}
                required
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
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPengeluaran;
