import { useNavigate, useParams } from "react-router-dom";

const EditRumah = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Sample data
  const rumah = {
    id: id,
    nomor: "A1",
    type: "Single",
    harga: "1500000",
    status: "Terisi",
    fasilitas: "AC, Kamar Mandi Dalam, WiFi",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to update data
    navigate("/rumah");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Rumah</h1>

      <div className="bg-white shadow rounded-lg p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nomor Rumah
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                defaultValue={rumah.nomor}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                defaultValue={rumah.type}
                required
              >
                <option value="Single">Single</option>
                <option value="Double">Double</option>
                <option value="Family">Family</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Harga Sewa
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                defaultValue={rumah.harga}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                defaultValue={rumah.status}
                required
              >
                <option value="Kosong">Kosong</option>
                <option value="Terisi">Terisi</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fasilitas
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={3}
                defaultValue={rumah.fasilitas}
              ></textarea>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate("/rumah")}
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

export default EditRumah;
