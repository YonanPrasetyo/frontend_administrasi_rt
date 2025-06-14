import { Link } from "react-router-dom";

const PembayaranList = () => {
  // Sample data
  const pembayaranList = [
    {
      id: 1,
      penghuni: "John Doe",
      rumah: "A1",
      bulan: "Januari 2023",
      jumlah: "Rp 1,500,000",
      tanggal: "2023-01-05",
      status: "Lunas",
    },
    {
      id: 2,
      penghuni: "Jane Smith",
      rumah: "B2",
      bulan: "Januari 2023",
      jumlah: "Rp 2,000,000",
      tanggal: "2023-01-10",
      status: "Lunas",
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Daftar Pembayaran</h1>
        <Link
          to="/pembayaran/add"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Tambah Pembayaran
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Penghuni
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rumah
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bulan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Jumlah
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tanggal
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pembayaranList.map((pembayaran) => (
              <tr key={pembayaran.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {pembayaran.penghuni}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {pembayaran.rumah}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {pembayaran.bulan}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {pembayaran.jumlah}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {pembayaran.tanggal}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      pembayaran.status === "Lunas"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {pembayaran.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <Link
                    to={`/pembayaran/detail/${pembayaran.id}`}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Detail
                  </Link>
                  <Link
                    to={`/pembayaran/edit/${pembayaran.id}`}
                    className="text-yellow-600 hover:text-yellow-900"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PembayaranList;
