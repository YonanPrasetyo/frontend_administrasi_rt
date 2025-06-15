import { useNavigate } from "react-router-dom";
import { createPenghuni } from "../../Api/PenghuniService";

const AddPenghuni = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    createPenghuni(data);

    navigate("/penghuni");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Tambah Penghuni</h1>

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
                <option value="">Pilih Status Tinggal</option>
                <option value="kontrak">Kontrak</option>
                <option value="tetap">Tetap</option>
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
                <option value="">Pilih Status Pernikahan</option>
                <option value="belum">Belum Menikah</option>
                <option value="sudah">Sudah Menikah</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Foto KTP
              </label>
              <input
                type="file"
                name="foto_ktp"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                accept="image/jpeg,image/png,image/jpg"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Format: JPEG, PNG, JPG (Maksimal 2MB)
              </p>
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

export default AddPenghuni;
