import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRumahDetail } from "../../Api/RumahService";
import { createPembayaran } from "../../Api/PembayaranService";

const AddPembayaran = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [rumah, setRumah] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getRumahDetail(id);
        setRumah(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const penghuniAktif =
    rumah.penghuni_rumah?.filter((p) => p.tanggal_keluar === null) || [];

  const optionsPenghuni = penghuniAktif.map((penghuni) => (
    <option key={penghuni.id_penghuni} value={penghuni.id_penghuni}>
      {penghuni.nama_lengkap}
    </option>
  ));

  let month = new Date().getMonth() + 1;
  month = month.toString();

  const Bulan = [
    { value: "1", label: "Januari" },
    { value: "2", label: "Februari" },
    { value: "3", label: "Maret" },
    { value: "4", label: "April" },
    { value: "5", label: "Mei" },
    { value: "6", label: "Juni" },
    { value: "7", label: "Juli" },
    { value: "8", label: "Agustus" },
    { value: "9", label: "September" },
    { value: "10", label: "Oktober" },
    { value: "11", label: "November" },
    { value: "12", label: "Desember" },
  ];

  const optionsBulan = Bulan.map((bulan) => (
    <option key={bulan.value} value={bulan.value} selected={month === bulan.value ? true : false}>
    {bulan.label}
  </option>
  ));

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    data["id_rumah"] = id;
    createPembayaran(data);
    navigate("/pembayaran");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Tambah Pembayaran</h1>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="mb-6">
          <h6 className="text-gray-500 text-sm font-medium">Pembayaran Terakhir</h6>
          <p className="text-lg font-bold">
            {rumah.bulan_pembayaran_terakhir} {rumah.tahun_pembayaran_terakhir}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Penghuni
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
                name="id_penghuni"
              >
                <option value="">Pilih Penghuni</option>
                {optionsPenghuni}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Jenis Iuran
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
                name="jenis"
              >
                <option value="">Pilih Jenis Iuran</option>
                <option value="iuran satpam">Iuran Satpam</option>
                <option value="iuran kebersihan">Iuran Kebersihan</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tahun
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                defaultValue={new Date().getFullYear()}
                required
                name="tahun"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bulan
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
                name="bulan"
              >
                <option value="">Pilih Bulan</option>
                {optionsBulan}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tanggal Pembayaran
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
                defaultValue={new Date().toISOString().split("T")[0]}
                name="tanggal"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Berapa Kali Pembayaran
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
                defaultValue={1}
                name="total_bulan"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate("/pembayaran")}
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

export default AddPembayaran;
