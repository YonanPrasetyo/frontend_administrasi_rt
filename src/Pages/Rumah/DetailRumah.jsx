import { useParams, Link } from "react-router-dom";

const DetailRumah = () => {
  const { id } = useParams();

  // Sample data
  const rumah = {
    id: id,
    nomor: "A1",
    type: "Single",
    harga: "Rp 1,500,000",
    status: "Terisi",
    fasilitas: "AC, Kamar Mandi Dalam, WiFi",
    luas: "4x6 m",
    penghuni: "John Doe",
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Detail Rumah</h1>
        <Link
          to={`/rumah/edit/${id}`}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Edit
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            Rumah No. {rumah.nomor}
          </h2>
          <p className="text-sm text-gray-500">Type: {rumah.type}</p>
        </div>
        <div className="px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Harga Sewa</h3>
              <p className="mt-1 text-sm text-gray-900">{rumah.harga}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Status</h3>
              <p className="mt-1 text-sm text-gray-900">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    rumah.status === "Terisi"
                      ? "bg-red-100 text-red-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {rumah.status}
                </span>
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Luas</h3>
              <p className="mt-1 text-sm text-gray-900">{rumah.luas}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Penghuni</h3>
              <p className="mt-1 text-sm text-gray-900">
                {rumah.penghuni || "-"}
              </p>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-sm font-medium text-gray-500">Fasilitas</h3>
              <p className="mt-1 text-sm text-gray-900">{rumah.fasilitas}</p>
            </div>
          </div>
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
