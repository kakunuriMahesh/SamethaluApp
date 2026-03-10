import { NavLink, useNavigate } from 'react-router-dom';
import {
  MdDashboard, MdFormatListBulleted, MdAdd, MdLogout, MdMenu
} from 'react-icons/md';

const navItems = [
  { to: '/dashboard', icon: <MdDashboard />, label: 'Dashboard' },
  { to: '/samethalu', icon: <MdFormatListBulleted />, label: 'All Samethalu' },
  { to: '/add', icon: <MdAdd />, label: 'Add Sametha' },
];

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h2>🌿 సామెతలు</h2>
        <p>Admin Panel</p>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          >
            <span className="icon">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-footer">
        <button className="sidebar-link btn-danger" onClick={handleLogout}>
          <span className="icon"><MdLogout /></span>
          Logout
        </button>
      </div>
    </aside>
  );
}
