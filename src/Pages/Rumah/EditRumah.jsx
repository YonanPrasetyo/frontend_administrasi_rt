import { useNavigate, useParams } from "react-router-dom";
import { updateRumah, getRumahDetail } from "../../Api/RumahService";
import { useState, useEffect } from "react";

const EditRumah = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [rumah, setRumah] = useState({
    data: {
      nomor_rumah: "",
    },
  });

  useEffect(() => {
    const fetchRumah = async () => {
      try {
        const response = await getRumahDetail(id);
        setRumah(response);
      } catch (error) {
        console.error("Error fetching rumah:", error);
      }
    };

    fetchRumah();
  }, [id]);


  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    updateRumah(id, data);

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
                name = "nomor_rumah"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                defaultValue={rumah.data.nomor_rumah}
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
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRumah;
