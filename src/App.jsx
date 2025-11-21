import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SocketProvider } from './context/SocketContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './pages/Chat';
import Rewards from './pages/Rewards';
import Tasks from './pages/Tasks';
import Tournament from './pages/Tournament';
import AdminDashboard from './pages/AdminDashboard';
import Profile from './pages/Profile';
import Teams from './pages/Teams';
import MatchSimulation from './pages/MatchSimulation';
import Rules from './pages/Rules';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Navbar from './components/Navbar';

function App() {
  return (
    <SocketProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/rewards" element={<Rewards />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/tournaments" element={<Tournament />} />
              <Route path="/matches" element={<Tournament />} />
              <Route path="/matches/:id" element={<MatchSimulation />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/rules" element={<Rules />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
            </Routes>
          </div>
        </div>
      </Router>
    </SocketProvider>
  );
}

export default App;
