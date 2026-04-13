import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'

import Login from './pages/Login'
import SellerDashboard from './pages/SellerDashboard'
import CarsList from './pages/CarsList'
import CarDetail from './pages/CarDetail'
import AdminDashboard from './pages/AdminDashboard'
import UserProfile from './pages/UserProfile'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
        <Routes>
          <Route path="/" element={<CarsList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/seller" element={<SellerDashboard />} />
          <Route path="/car/:id" element={<CarDetail />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/profile/:id" element={<UserProfile />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
