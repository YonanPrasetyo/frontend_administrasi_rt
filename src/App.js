import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Laporan from "./Pages/Laporan/Laporan"
import PenghuniList from "./Pages/Penghuni/PenghuniList";
import AddPenghuni from "./Pages/Penghuni/AddPenghuni";
import EditPenghuni from "./Pages/Penghuni/EditPenghuni";
import DetailPenghuni from "./Pages/Penghuni/DetailPenghuni";
import RumahList from "./Pages/Rumah/RumahList";
import AddRumah from "./Pages/Rumah/AddRumah";
import EditRumah from "./Pages/Rumah/EditRumah";
import DetailRumah from "./Pages/Rumah/DetailRumah";
import PembayaranList from "./Pages/Pembayaran/PembayaranList";
import AddPembayaran from "./Pages/Pembayaran/AddPembayaran";
import PengeluaranList from "./Pages/Pengeluaran/PengeluaranList";
import AddPengeluaran from "./Pages/Pengeluaran/AddPengeluaran";
import EditPengeluaran from "./Pages/Pengeluaran/EditPengeluaran";
import Layout from "./Components/Layout";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/laporan" element={<Laporan />} />

          {/* Penghuni Routes */}
          <Route path="/penghuni" element={<PenghuniList />} />
          <Route path="/penghuni/add" element={<AddPenghuni />} />
          <Route path="/penghuni/edit/:id" element={<EditPenghuni />} />
          <Route path="/penghuni/detail/:id" element={<DetailPenghuni />} />

          {/* Rumah Routes */}
          <Route path="/rumah" element={<RumahList />} />
          <Route path="/rumah/add" element={<AddRumah />} />
          <Route path="/rumah/edit/:id" element={<EditRumah />} />
          <Route path="/rumah/detail/:id" element={<DetailRumah />} />

          {/* Pembayaran Routes */}
          <Route path="/pembayaran" element={<PembayaranList />} />
          <Route path="/pembayaran/add/:id" element={<AddPembayaran />} />

          {/* Pengeluaran Routes */}
          <Route path="/pengeluaran" element={<PengeluaranList />} />
          <Route path="/pengeluaran/add" element={<AddPengeluaran />} />
          <Route path="/pengeluaran/edit/:id" element={<EditPengeluaran />} />
          
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
