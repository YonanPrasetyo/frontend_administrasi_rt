const Home = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stats Cards */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Total Penghuni</h3>
          <p className="text-2xl font-bold">24</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Total Rumah</h3>
          <p className="text-2xl font-bold">10</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">
            Pembayaran Bulan Ini
          </h3>
          <p className="text-2xl font-bold">Rp 5,000,000</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">
            Pengeluaran Bulan Ini
          </h3>
          <p className="text-2xl font-bold">Rp 1,200,000</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
