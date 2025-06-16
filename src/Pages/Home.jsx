import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { getDashboardData } from "../Api/DashboardService";

const Home = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDashboardData();
        setDashboardData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Buat grafik setelah data dimuat
  useEffect(() => {
    if (!dashboardData) return;

    const labels = dashboardData.per_bulan.map(
      (item) => `${item.bulan}/${item.tahun}`
    );

    const pendapatan = dashboardData.per_bulan.map((item) =>
      parseInt(item.total_pendapatan)
    );
    const pengeluaran = dashboardData.per_bulan.map((item) =>
      parseInt(item.total_pengeluaran)
    );
    const saldo = dashboardData.per_bulan.map((item) =>
      parseInt(item.saldo)
    );

    // Hapus grafik lama jika sudah ada
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Buat grafik baru
    const ctx = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Pendapatan",
            data: pendapatan,
            borderColor: "rgba(54, 162, 235, 1)",
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            fill: true,
            tension: 0.3,
          },
          {
            label: "Pengeluaran",
            data: pengeluaran,
            borderColor: "rgba(255, 99, 132, 1)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            fill: true,
            tension: 0.3,
          },
          {
            label: "Saldo",
            data: saldo,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            fill: true,
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => `Rp ${context.formattedValue}`,
            },
          },
        },
        scales: {
          y: {
            ticks: {
              callback: (value) => `Rp ${value}`,
            },
          },
        },
      },
    });
  }, [dashboardData]);

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error)
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;


  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Total Penghuni</h3>
          <p className="text-2xl font-bold">{dashboardData.penghuni}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Total Rumah</h3>
          <p className="text-2xl font-bold">{dashboardData.rumah}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Total Saldo</h3>
          <p className="text-2xl font-bold">
            Rp {dashboardData.total_saldo.toLocaleString()}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">
            Pendapatan Bulan Ini
          </h3>
          <p className="text-2xl font-bold">
            Rp {parseInt(dashboardData.pembayaran_bulan_ini).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">
          Grafik Pendapatan vs Pengeluaran
        </h2>
        <canvas ref={chartRef} height="100"></canvas>
      </div>
    </div>
  );
};

export default Home;
