import { Routes, Route } from 'react-router-dom';
import CarsList from './pages/CarsList';
import CarDetail from './pages/CarDetail';
import Login from './pages/Login';
import SellerDashboard from './pages/SellerDashboard';
import UserProfile from './pages/UserProfile';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<CarsList />} />
      <Route path="/car/:id" element={<CarDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/seller" element={<SellerDashboard />} />
      <Route path="/profile/:id" element={<UserProfile />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}
