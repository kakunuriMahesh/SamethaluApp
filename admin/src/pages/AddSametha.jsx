import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { addSametha } from '../services/api';
import toast from 'react-hot-toast';
import { MdArrowBack } from 'react-icons/md';

const CATEGORIES = ['life', 'wisdom', 'humor', 'experience', 'education', 'work', 'family', 'nature', 'other'];

const initForm = {
  samethaTelugu: '', samethaEnglish: '',
  meaningTelugu: '', meaningEnglish: '',
  explanationTelugu: '', exampleTelugu: '',
  category: 'life', tags: '', isActive: true,
};

export default function AddSametha() {
  const [form, setForm] = useState(initForm);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      await addSametha(payload);
      toast.success('Sametha added successfully!');
      navigate('/samethalu');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add sametha');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link to="/samethalu" className="btn btn-secondary btn-sm btn-icon"><MdArrowBack /></Link>
          <div>
            <h1>Add New Sametha</h1>
            <p>Fill in the Telugu details below. English fields are optional.</p>
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
                onChange={handleChange} required placeholder="సామెత తెలుగులో రాయండి..." />
            </div>
            <div className="form-group">
              <label className="form-label">Meaning Telugu <span>*</span></label>
              <textarea className="form-textarea" name="meaningTelugu" value={form.meaningTelugu}
                onChange={handleChange} required placeholder="తెలుగు అర్థం..." />
            </div>
            <div className="form-group">
              <label className="form-label">Explanation Telugu <span>*</span></label>
              <textarea className="form-textarea" name="explanationTelugu" value={form.explanationTelugu}
                onChange={handleChange} required placeholder="వివరణ తెలుగులో..." />
            </div>
            <div className="form-group">
              <label className="form-label">Example Telugu <span className="optional-badge">(optional)</span></label>
              <textarea className="form-textarea" name="exampleTelugu" value={form.exampleTelugu}
                onChange={handleChange} placeholder="ఉదాహరణ..." style={{ minHeight: '70px' }} />
            </div>

            <div className="form-section-title">English Translation (Optional)</div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Sametha English <span className="optional-badge">(optional)</span></label>
                <input className="form-input" name="samethaEnglish" value={form.samethaEnglish}
                  onChange={handleChange} placeholder="English proverb..." />
              </div>
              <div className="form-group">
                <label className="form-label">Meaning English <span className="optional-badge">(optional)</span></label>
                <input className="form-input" name="meaningEnglish" value={form.meaningEnglish}
                  onChange={handleChange} placeholder="English meaning..." />
              </div>
            </div>

            <div className="form-section-title">Metadata</div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Category <span>*</span></label>
                <select className="form-select" name="category" value={form.category} onChange={handleChange}>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Tags <span className="optional-badge">(comma separated)</span></label>
                <input className="form-input" name="tags" value={form.tags}
                  onChange={handleChange} placeholder="wisdom, life, humor..." />
              </div>
            </div>
            <div className="form-group">
              <div className="toggle-wrap">
                <label className="toggle">
                  <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} />
                  <span className="toggle-slider" />
                </label>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Active (visible in app)</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Adding...' : '✚ Add Sametha'}
              </button>
              <Link to="/samethalu" className="btn btn-secondary">Cancel</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
