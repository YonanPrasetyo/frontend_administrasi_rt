import { useNavigate } from "react-router-dom";
import { createRumah } from "../../Api/RumahService";

const AddRumah = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log(data);
    createRumah(data);

    navigate("/rumah");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Tambah Rumah</h1>

      <div className="bg-white shadow rounded-lg p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nomor Rumah
              </label>
              <input
                type="text"
                name="nomor_rumah"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
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
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRumah;
