import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Header.css'; // Custom CSS file

function Header() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="app-header d-flex justify-content-between align-items-center p-3 mb-4 shadow-sm">
      <div>
        <h4 className="m-0">Welcome, {user?.name}</h4>
        <small className="text-muted">Role: {user?.role}</small>
      </div>
      <button className="btn btn-outline-danger" onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
}

export default Header;
