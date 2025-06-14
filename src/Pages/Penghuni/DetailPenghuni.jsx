import { useParams, Link } from "react-router-dom";

const DetailPenghuni = () => {
  const { id } = useParams();

  // In a real app, you would fetch the data based on the id
  const penghuni = {
    id: id,
    nama: "John Doe",
    kamar: "A1",
    telepon: "08123456789",
    email: "john@example.com",
    tanggalMasuk: "2023-01-15",
    alamat: "Jl. Contoh No. 123",
    ktp: "1234567890123456",
  };

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
          <h2 className="text-lg font-medium text-gray-900">{penghuni.nama}</h2>
          <p className="text-sm text-gray-500">Kamar: {penghuni.kamar}</p>
        </div>
        <div className="px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Nomor Telepon
              </h3>
              <p className="mt-1 text-sm text-gray-900">{penghuni.telepon}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Email</h3>
              <p className="mt-1 text-sm text-gray-900">{penghuni.email}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Tanggal Masuk
              </h3>
              <p className="mt-1 text-sm text-gray-900">
                {penghuni.tanggalMasuk}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Alamat</h3>
              <p className="mt-1 text-sm text-gray-900">{penghuni.alamat}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Nomor KTP</h3>
              <p className="mt-1 text-sm text-gray-900">{penghuni.ktp}</p>
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
