import { Link } from "react-router-dom";

const PengeluaranList = () => {
  // Sample data
  const pengeluaranList = [
    {
      id: 1,
      kategori: "Listrik",
      jumlah: "Rp 500,000",
      tanggal: "2023-01-15",
      keterangan: "Pembayaran PLN",
    },
    {
      id: 2,
      kategori: "Air",
      jumlah: "Rp 300,000",
      tanggal: "2023-01-20",
      keterangan: "Pembayaran PDAM",
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Daftar Pengeluaran</h1>
        <Link
          to="/pengeluaran/add"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Tambah Pengeluaran
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tanggal
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kategori
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Jumlah
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Keterangan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pengeluaranList.map((pengeluaran) => (
              <tr key={pengeluaran.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {pengeluaran.tanggal}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {pengeluaran.kategori}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {pengeluaran.jumlah}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {pengeluaran.keterangan}
                </td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <Link
                    to={`/pengeluaran/detail/${pengeluaran.id}`}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Detail
                  </Link>
                  <Link
                    to={`/pengeluaran/edit/${pengeluaran.id}`}
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

export default PengeluaranList;
