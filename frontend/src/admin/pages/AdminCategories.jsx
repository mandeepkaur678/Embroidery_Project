import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Tag, X, Check, Loader2 } from 'lucide-react';
import { AdminLayout } from '../components/AdminLayout';
import { getAdminCategories, createAdminCategory, updateAdminCategory, deleteAdminCategory } from '../../services/adminService';
import { toast } from 'sonner';

export const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const data = await getAdminCategories();
      setCategories(data);
    } catch {
      toast.error('Failed to load categories.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadCategories(); }, []);

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setFormData({ name: '', description: '' });
    setFormOpen(true);
  };

  const handleOpenEdit = (cat) => {
    setEditingCategory(cat);
    setFormData({ name: cat.name, description: cat.description || '' });
    setFormOpen(true);
  };

  const handleSave = async () => {
    if (!formData.name.trim()) { toast.error('Category name is required.'); return; }
    setSaving(true);
    try {
      if (editingCategory) {
        const updated = await updateAdminCategory(editingCategory._id, formData);
        setCategories(prev => prev.map(c => c._id === editingCategory._id ? updated : c));
        toast.success('Category updated successfully.');
      } else {
        const created = await createAdminCategory(formData);
        setCategories(prev => [...prev, created]);
        toast.success('Category created successfully.');
      }
      setFormOpen(false);
      setFormData({ name: '', description: '' });
    } catch (err) {
      toast.error(err.message || 'Failed to save category.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (cat) => {
    try {
      await deleteAdminCategory(cat._id);
      setCategories(prev => prev.filter(c => c._id !== cat._id));
      toast.success('Category deleted successfully.');
      setDeleteConfirm(null);
    } catch {
      toast.error('Failed to delete category.');
    }
  };

  return (
    <AdminLayout
      title="Category Management"
      subtitle={`${categories.length} product categories configured`}
      actions={
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-sage hover:bg-sage-dark text-cream text-xs font-bold rounded-xl shadow-warm-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Category</span>
        </button>
      }
    >
      {/* Add / Edit Form */}
      {formOpen && (
        <div className="bg-cream border border-sage/30 rounded-2xl p-5 shadow-warm-md space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-earth">
              {editingCategory ? 'Edit Category' : 'New Category'}
            </h3>
            <button onClick={() => setFormOpen(false)} className="p-1.5 text-muted hover:text-earth rounded-lg hover:bg-beige/40">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-earth uppercase tracking-wider">Category Name <span className="text-error">*</span></label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                placeholder="e.g. Embroidered Clothing"
                className="w-full px-3.5 py-2.5 bg-ivory border border-beige rounded-xl text-sm text-earth placeholder-muted focus:outline-none focus:ring-2 focus:ring-sage/40"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-earth uppercase tracking-wider">Description</label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData(p => ({ ...p, description: e.target.value }))}
                placeholder="Brief description (optional)"
                className="w-full px-3.5 py-2.5 bg-ivory border border-beige rounded-xl text-sm text-earth placeholder-muted focus:outline-none focus:ring-2 focus:ring-sage/40"
              />
            </div>
          </div>
          <div className="flex items-center justify-end gap-3 pt-1">
            <button onClick={() => setFormOpen(false)} className="px-4 py-2 text-xs font-semibold text-earth border border-beige rounded-xl hover:bg-beige/40">Cancel</button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2 bg-sage hover:bg-sage-dark text-cream text-xs font-bold rounded-xl disabled:opacity-60 shadow-warm-sm"
            >
              {saving ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /><span>Saving...</span></> : <><Check className="w-3.5 h-3.5" /><span>{editingCategory ? 'Update' : 'Create'} Category</span></>}
            </button>
          </div>
        </div>
      )}

      {/* Categories Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => <div key={i} className="h-28 bg-beige/40 rounded-2xl animate-pulse" />)}
        </div>
      ) : categories.length === 0 ? (
        <div className="bg-cream border border-beige rounded-2xl p-14 text-center space-y-3">
          <Tag className="w-10 h-10 text-sage mx-auto" />
          <p className="font-serif text-xl font-bold text-earth">No categories yet</p>
          <p className="text-sm text-muted">Create your first product category above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <div key={cat._id} className="bg-cream border border-beige rounded-2xl p-5 shadow-warm-sm hover:shadow-warm-md transition-all group space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-sage/10 text-sage flex items-center justify-center shrink-0">
                    <Tag className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-earth">{cat.name}</p>
                    <p className="text-[11px] text-muted">{cat.count || 0} products</p>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${cat.status === 'Active' ? 'bg-success/10 text-success border border-success/30' : 'bg-beige text-muted border border-beige'}`}>
                  {cat.status || 'Active'}
                </span>
              </div>

              {cat.description && (
                <p className="text-xs text-muted leading-relaxed line-clamp-2">{cat.description}</p>
              )}

              <div className="flex items-center gap-2 pt-1 border-t border-beige/60">
                <button
                  onClick={() => handleOpenEdit(cat)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-[11px] font-semibold text-earth border border-beige rounded-xl hover:bg-beige/40 transition-colors"
                >
                  <Edit className="w-3.5 h-3.5" /> Edit
                </button>
                {deleteConfirm === cat._id ? (
                  <div className="flex items-center gap-1">
                    <button onClick={() => handleDelete(cat)} className="px-2 py-1.5 text-[11px] font-bold text-cream bg-error rounded-xl hover:bg-error/90">Confirm</button>
                    <button onClick={() => setDeleteConfirm(null)} className="px-2 py-1.5 text-[11px] font-semibold text-earth border border-beige rounded-xl hover:bg-beige/40">Cancel</button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirm(cat._id)}
                    className="px-3 py-1.5 text-[11px] font-semibold text-error border border-error/30 rounded-xl hover:bg-error/10 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};
