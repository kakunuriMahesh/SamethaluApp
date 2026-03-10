import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { listSamethalu, deleteSametha } from '../services/api';
import { MdSearch, MdEdit, MdDelete, MdAdd, MdChevronLeft, MdChevronRight } from 'react-icons/md';
import toast from 'react-hot-toast';

const CATEGORIES = ['all', 'life', 'wisdom', 'humor', 'experience', 'education', 'work', 'family', 'nature', 'other'];

export default function SamethaList() {
  const [samethalu, setSamethalu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [deleteId, setDeleteId] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: 15 };
      if (search) params.search = search;
      if (category && category !== 'all') params.category = category;
      const res = await listSamethalu(params);
      setSamethalu(res.data.data);
      setTotalPages(res.data.pages);
      setTotal(res.data.total);
    } catch (err) {
      toast.error('Failed to load samethalu');
    } finally {
      setLoading(false);
    }
  }, [page, search, category]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleDelete = async () => {
    try {
      await deleteSametha(deleteId);
      toast.success('Sametha deleted');
      setDeleteId(null);
      fetchData();
    } catch {
      toast.error('Delete failed');
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>All Samethalu</h1>
        <p>{total} total samethalu in the database</p>
      </div>
      <div className="page-body">
        <div className="search-bar">
          <div className="search-input-wrap">
            <MdSearch />
            <input
              className="search-input"
              placeholder="Search samethalu..."
              value={search}
              onChange={handleSearch}
            />
          </div>
          <select
            className="form-select"
            style={{ width: '160px' }}
            value={category}
            onChange={(e) => { setCategory(e.target.value); setPage(1); }}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c === 'all' ? '' : c}>{c === 'all' ? 'All Categories' : c}</option>
            ))}
          </select>
          <Link to="/add" className="btn btn-primary"><MdAdd /> Add New</Link>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Sametha (Telugu)</th>
                <th>Category</th>
                <th>English</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6}><div className="loading-center"><div className="spinner" /><span>Loading...</span></div></td></tr>
              ) : samethalu.length === 0 ? (
                <tr><td colSpan={6}><div className="empty-state"><div className="emoji">🌿</div><p>No samethalu found</p></div></td></tr>
              ) : (
                samethalu.map((s, idx) => (
                  <tr key={s._id}>
                    <td style={{ color: 'var(--text-muted)', width: '40px' }}>{(page - 1) * 15 + idx + 1}</td>
                    <td>
                      <div style={{ fontWeight: 500, fontSize: '0.95rem', maxWidth: '300px' }}>{s.samethaTelugu}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '2px' }}>
                        {s.meaningTelugu?.slice(0, 60)}{s.meaningTelugu?.length > 60 ? '...' : ''}
                      </div>
                    </td>
                    <td><span className="badge badge-cat">{s.category}</span></td>
                    <td>{s.hasEnglish ? <span className="badge badge-english">Yes</span> : <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>No</span>}</td>
                    <td><span className={`badge ${s.isActive ? 'badge-active' : 'badge-inactive'}`}>{s.isActive ? 'Active' : 'Inactive'}</span></td>
                    <td>
                      <div className="action-btns">
                        <Link to={`/edit/${s._id}`} className="btn btn-secondary btn-sm btn-icon" title="Edit">
                          <MdEdit />
                        </Link>
                        <button className="btn btn-danger btn-sm btn-icon" title="Delete" onClick={() => setDeleteId(s._id)}>
                          <MdDelete />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {!loading && totalPages > 1 && (
            <div className="pagination">
              <span>Page {page} of {totalPages} · {total} total</span>
              <div className="pagination-btns">
                <button className="btn btn-secondary btn-sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
                  <MdChevronLeft />
                </button>
                <button className="btn btn-secondary btn-sm" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
                  <MdChevronRight />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {deleteId && (
        <div className="modal-overlay" onClick={() => setDeleteId(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3>Delete Sametha</h3>
            <p>Are you sure you want to permanently delete this sametha? This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setDeleteId(null)}>Cancel</button>
              <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
