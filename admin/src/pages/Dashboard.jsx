import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getStats } from '../services/api';
import { MdAdd, MdFormatListBulleted, MdTranslate } from 'react-icons/md';
import { FaLeaf } from 'react-icons/fa';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStats()
      .then((res) => setStats(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div>
      <div className="page-header"><h1>Dashboard</h1><p>Overview of your samethalu collection</p></div>
      <div className="page-body"><div className="loading-center"><div className="spinner" /><span>Loading stats...</span></div></div>
    </div>
  );

  const categories = stats?.categories || [];

  return (
    <div>
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Overview of your samethalu collection</p>
      </div>
      <div className="page-body">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon gold"><FaLeaf /></div>
            <div className="stat-info">
              <h3>{stats?.total ?? 0}</h3>
              <p>Total Samethalu</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon green"><MdFormatListBulleted /></div>
            <div className="stat-info">
              <h3>{stats?.active ?? 0}</h3>
              <p>Active Samethalu</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon blue"><MdTranslate /></div>
            <div className="stat-info">
              <h3>{stats?.withEnglish ?? 0}</h3>
              <p>With English</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon purple">🗂️</div>
            <div className="stat-info">
              <h3>{categories.length}</h3>
              <p>Categories</p>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div className="card">
            <div className="section-header">
              <h2>Quick Actions</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link to="/add" className="btn btn-primary" style={{ justifyContent: 'center' }}>
                <MdAdd /> Add New Sametha
              </Link>
              <Link to="/samethalu" className="btn btn-secondary" style={{ justifyContent: 'center' }}>
                <MdFormatListBulleted /> View All Samethalu
              </Link>
            </div>
          </div>

          <div className="card">
            <div className="section-header">
              <h2>Categories Breakdown</h2>
            </div>
            <div className="category-grid">
              {categories.map((cat) => (
                <div className="category-item" key={cat._id}>
                  <span>{cat._id || 'other'}</span>
                  <span className="category-count">{cat.count}</span>
                </div>
              ))}
              {categories.length === 0 && <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No data yet</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
