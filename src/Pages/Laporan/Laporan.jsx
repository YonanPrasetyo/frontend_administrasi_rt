import { laporanPerBulan } from "../../Api/DashboardService";
import { useState, useEffect } from "react";

const Laporan = () => {
  const [laporan, setLaporan] = useState({});
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLaporan = async () => {
      try {
        const response = await laporanPerBulan();
        setLaporan(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchLaporan();
  }, []);

  const toggleDropdown = (key, type) => {
    const current = `${key}-${type}`;
    setActiveDropdown(activeDropdown === current ? null : current);
  };

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Laporan Keuangan
        </h1>
        <p className="text-gray-600">
          Ringkasan pendapatan dan pengeluaran per bulan
        </p>
      </div>

      <div className="grid gap-6">
        {laporan.per_bulan
          .sort((a, b) => b.key.localeCompare(a.key))
          .map((item) => {
            const key = item.key;
            const pendapatan = laporan.pembayaran?.[key]?.data || [];
            const pengeluaran = laporan.pengeluaran?.[key]?.data || [];
            const isPendapatanOpen = activeDropdown === `${key}-pendapatan`;
            const isPengeluaranOpen = activeDropdown === `${key}-pengeluaran`;

            return (
              <div
                key={key}
                className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                  <h2 className="text-xl font-bold text-white">
                    {new Intl.DateTimeFormat("id-ID", {
                      month: "long",
                      year: "numeric",
                    }).format(new Date(item.tahun, item.bulan - 1))}
                  </h2>
                </div>

                {/* Summary Cards */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-green-800">
                            Total Pendapatan
                          </p>
                          <p className="text-lg font-bold text-green-900">
                            Rp{" "}
                            {Number(item.total_pendapatan).toLocaleString(
                              "id-ID"
                            )}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 7.414V11a1 1 0 102 0V7.414l1.293 1.293a1 1 0 001.414-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-red-800">
                            Total Pengeluaran
                          </p>
                          <p className="text-lg font-bold text-red-900">
                            Rp{" "}
                            {Number(item.total_pengeluaran).toLocaleString(
                              "id-ID"
                            )}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-blue-800">
                            Sisa Saldo
                          </p>
                          <p className="text-lg font-bold text-blue-900">
                            Rp {Number(item.sisa_saldo).toLocaleString("id-ID")}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-purple-800">
                            Saldo Akhir
                          </p>
                          <p className="text-lg font-bold text-purple-900">
                            Rp{" "}
                            {Number(item.saldo_berjalan).toLocaleString(
                              "id-ID"
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => toggleDropdown(key, "pendapatan")}
                      className={`flex-1 inline-flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white transition-colors duration-200 ${
                        isPendapatanOpen
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Detail Pendapatan
                      <svg
                        className={`w-4 h-4 ml-2 transition-transform duration-200 ${
                          isPendapatanOpen ? "rotate-180" : ""
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>

                    <button
                      onClick={() => toggleDropdown(key, "pengeluaran")}
                      className={`flex-1 inline-flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white transition-colors duration-200 ${
                        isPengeluaranOpen
                          ? "bg-red-600 hover:bg-red-700"
                          : "bg-red-500 hover:bg-red-600"
                      }`}
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Detail Pengeluaran
                      <svg
                        className={`w-4 h-4 ml-2 transition-transform duration-200 ${
                          isPengeluaranOpen ? "rotate-180" : ""
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Dropdown Pendapatan */}
                  {isPendapatanOpen && (
                    <div className="mt-6 border-t border-gray-200 pt-6">
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Detail Pendapatan
                        </h3>
                      </div>
                      {pendapatan.length === 0 ? (
                        <div className="text-center py-8">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                          <p className="mt-2 text-sm text-gray-500">
                            Tidak ada data pendapatan
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {pendapatan.map((d) => (
                            <div
                              key={d.id_pembayaran}
                              className="bg-green-50 border border-green-200 rounded-lg p-4"
                            >
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-green-800 capitalize">
                                    {d.jenis}, Nomor Rumah {d.rumah.nomor_rumah}
                                  </p>
                                  <p className="text-xs text-green-600 mt-1">
                                    {new Date(d.tanggal).toLocaleDateString(
                                      "id-ID",
                                      {
                                        weekday: "long",
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                      }
                                    )}
                                  </p>
                                </div>
                                <div className="mt-2 sm:mt-0 sm:ml-4">
                                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                    Rp {Number(d.total).toLocaleString("id-ID")}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Dropdown Pengeluaran */}
                  {isPengeluaranOpen && (
                    <div className="mt-6 border-t border-gray-200 pt-6">
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 7.414V11a1 1 0 102 0V7.414l1.293 1.293a1 1 0 001.414-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Detail Pengeluaran
                        </h3>
                      </div>
                      {pengeluaran.length === 0 ? (
                        <div className="text-center py-8">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                          <p className="mt-2 text-sm text-gray-500">
                            Tidak ada data pengeluaran
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {pengeluaran.map((d) => (
                            <div
                              key={d.id_pengeluaran}
                              className="bg-red-50 border border-red-200 rounded-lg p-4"
                            >
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-red-800">
                                    {d.nama}
                                  </p>
                                  <p className="text-xs text-red-600 mt-1">
                                    {new Date(d.tanggal).toLocaleDateString(
                                      "id-ID",
                                      {
                                        weekday: "long",
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                      }
                                    )}
                                  </p>
                                  {d.keterangan && (
                                    <p className="text-xs text-red-500 mt-1 italic">
                                      {d.keterangan}
                                    </p>
                                  )}
                                </div>
                                <div className="mt-2 sm:mt-0 sm:ml-4">
                                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                                    Rp{" "}
                                    {Number(d.jumlah).toLocaleString("id-ID")}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Laporan;
