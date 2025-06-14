import { useNavigate, useParams } from "react-router-dom";

const EditPenghuni = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // In a real app, you would fetch the data based on the id
  const penghuni = {
    id: id,
    nama: "John Doe",
    kamar: "A1",
    telepon: "08123456789",
    email: "john@example.com",
    tanggalMasuk: "2023-01-15",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to update data
    navigate("/penghuni");
  };

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
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                defaultValue={penghuni.nama}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nomor Kamar
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                defaultValue={penghuni.kamar}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nomor Telepon
              </label>
              <input
                type="tel"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                defaultValue={penghuni.telepon}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                defaultValue={penghuni.email}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tanggal Masuk
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                defaultValue={penghuni.tanggalMasuk}
                required
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

export default EditPenghuni;
