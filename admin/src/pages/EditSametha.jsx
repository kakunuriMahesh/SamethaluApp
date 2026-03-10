import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getSamethaById, updateSametha } from '../services/api';
import toast from 'react-hot-toast';
import { MdArrowBack } from 'react-icons/md';

const CATEGORIES = ['life', 'wisdom', 'humor', 'experience', 'education', 'work', 'family', 'nature', 'other'];

export default function EditSametha() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    getSamethaById(id)
      .then((res) => {
        const d = res.data.data;
        setForm({
          samethaTelugu: d.samethaTelugu || '',
          samethaEnglish: d.samethaEnglish || '',
          meaningTelugu: d.meaningTelugu || '',
          meaningEnglish: d.meaningEnglish || '',
          explanationTelugu: d.explanationTelugu || '',
          exampleTelugu: d.exampleTelugu || '',
          category: d.category || 'other',
          tags: (d.tags || []).join(', '),
          isActive: d.isActive !== false,
        });
      })
      .catch(() => toast.error('Failed to load sametha'))
      .finally(() => setFetching(false));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
        hasEnglish: !!(form.samethaEnglish && form.meaningEnglish),
      };
      await updateSametha(id, payload);
      toast.success('Sametha updated!');
      navigate('/samethalu');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="loading-center"><div className="spinner" /><span>Loading...</span></div>;
  if (!form) return <div className="empty-state"><p>Sametha not found</p></div>;

  return (
    <div>
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link to="/samethalu" className="btn btn-secondary btn-sm btn-icon"><MdArrowBack /></Link>
          <div>
            <h1>Edit Sametha</h1>
            <p>Update the details below and save</p>
          </div>
        </div>
      </div>
      <div className="page-body">
        <div className="card" style={{ maxWidth: '760px' }}>
          <form onSubmit={handleSubmit}>
            <div className="form-section-title">Telugu Details (Required)</div>
            <div className="form-group">
              <label className="form-label">Sametha Telugu <span>*</span></label>
              <input className="form-input" name="samethaTelugu" value={form.samethaTelugu}
                onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Meaning Telugu <span>*</span></label>
              <textarea className="form-textarea" name="meaningTelugu" value={form.meaningTelugu}
                onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Explanation Telugu <span>*</span></label>
              <textarea className="form-textarea" name="explanationTelugu" value={form.explanationTelugu}
                onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Example Telugu <span className="optional-badge">(optional)</span></label>
              <textarea className="form-textarea" name="exampleTelugu" value={form.exampleTelugu}
                onChange={handleChange} style={{ minHeight: '70px' }} />
            </div>

            <div className="form-section-title">English Translation (Optional)</div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Sametha English</label>
                <input className="form-input" name="samethaEnglish" value={form.samethaEnglish} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="form-label">Meaning English</label>
                <input className="form-input" name="meaningEnglish" value={form.meaningEnglish} onChange={handleChange} />
              </div>
            </div>

            <div className="form-section-title">Metadata</div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-select" name="category" value={form.category} onChange={handleChange}>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Tags <span className="optional-badge">(comma separated)</span></label>
                <input className="form-input" name="tags" value={form.tags} onChange={handleChange} />
              </div>
            </div>
            <div className="form-group">
              <div className="toggle-wrap">
                <label className="toggle">
                  <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} />
                  <span className="toggle-slider" />
                </label>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Active</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Saving...' : '✓ Save Changes'}
              </button>
              <Link to="/samethalu" className="btn btn-secondary">Cancel</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
