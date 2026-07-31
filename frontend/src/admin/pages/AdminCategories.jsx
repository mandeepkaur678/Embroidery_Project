import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Tag, X, Check, Loader2, Image as ImageIcon } from 'lucide-react';
import { AdminLayout } from '../components/AdminLayout';
import { getAdminCategories, createAdminCategory, updateAdminCategory, deleteAdminCategory, getAdminProducts } from '../../services/adminService';
import { toast } from 'sonner';

export const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '', image: '', isActive: true });
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const [catData, prodData] = await Promise.all([
        getAdminCategories(),
        getAdminProducts(),
      ]);
      setCategories(catData);
      setProducts(prodData);
    } catch {
      toast.error('Failed to load categories.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadCategories(); }, []);

  const getProductCount = (categoryName) => {
    return products.filter(p => (typeof p.category === 'string' ? p.category : p.category?.name) === categoryName).length;
  };

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setFormData({ name: '', description: '', image: '', isActive: true });
    setFormOpen(true);
  };

  const handleOpenEdit = (cat) => {
    setEditingCategory(cat);
    setFormData({
      name: cat.name,
      description: cat.description || '',
      image: cat.image || '',
      isActive: cat.isActive !== undefined ? cat.isActive : true,
    });
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
      setFormData({ name: '', description: '', image: '', isActive: true });
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
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-sage hover:bg-sage-dark text-cream text-xs font-bold rounded-xl shadow-warm-sm transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Category</span>
        </button>
      }
    >
      {/* Add / Edit Form Modal/Card */}
      {formOpen && (
        <div className="bg-cream border border-sage/30 rounded-2xl p-5 sm:p-6 shadow-warm-md space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-beige/60 pb-3">
            <h3 className="font-serif text-lg font-bold text-earth">
              {editingCategory ? 'Edit Category' : 'New Category'}
            </h3>
            <button onClick={() => setFormOpen(false)} className="p-1.5 text-muted hover:text-earth rounded-lg hover:bg-beige/40 cursor-pointer">
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
              <label className="block text-xs font-bold text-earth uppercase tracking-wider">Category Image URL</label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData(p => ({ ...p, image: e.target.value }))}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3.5 py-2.5 bg-ivory border border-beige rounded-xl text-sm text-earth placeholder-muted focus:outline-none focus:ring-2 focus:ring-sage/40"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-earth uppercase tracking-wider">Description</label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData(p => ({ ...p, description: e.target.value }))}
              placeholder="Brief category description..."
              className="w-full px-3.5 py-2.5 bg-ivory border border-beige rounded-xl text-sm text-earth placeholder-muted focus:outline-none focus:ring-2 focus:ring-sage/40 resize-none"
            />
          </div>

          <div className="flex items-center gap-3 pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-earth uppercase tracking-wider select-none">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData(p => ({ ...p, isActive: e.target.checked }))}
                className="w-4 h-4 rounded border-beige text-sage focus:ring-sage/30 accent-sage cursor-pointer"
              />
              <span>Active Category</span>
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button onClick={() => setFormOpen(false)} className="px-4 py-2 text-xs font-semibold text-earth border border-beige rounded-xl hover:bg-beige/40 cursor-pointer">Cancel</button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2 bg-sage hover:bg-sage-dark text-cream text-xs font-bold rounded-xl disabled:opacity-60 shadow-warm-sm cursor-pointer"
            >
              {saving ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /><span>Saving...</span></> : <><Check className="w-3.5 h-3.5" /><span>{editingCategory ? 'Update' : 'Create'} Category</span></>}
            </button>
          </div>
        </div>
      )}

      {/* Categories Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => <div key={i} className="h-36 bg-beige/40 rounded-2xl animate-pulse" />)}
        </div>
      ) : categories.length === 0 ? (
        <div className="bg-cream border border-beige rounded-2xl p-14 text-center space-y-3">
          <Tag className="w-10 h-10 text-sage mx-auto" />
          <p className="font-serif text-xl font-bold text-earth">No categories yet</p>
          <p className="text-sm text-muted">Create your first product category above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => {
            const count = cat.count !== undefined ? cat.count : getProductCount(cat.name);
            const status = cat.isActive !== false ? 'Active' : 'Inactive';

            return (
              <div key={cat._id} className="bg-cream border border-beige rounded-2xl p-5 shadow-warm-sm hover:shadow-warm-md transition-all group space-y-4">
                <div className="flex items-center gap-3">
                  {cat.image ? (
                    <img src={cat.image} alt={cat.name} className="w-14 h-14 rounded-xl object-cover border border-beige shrink-0 bg-ivory" />
                  ) : (
                    <div className="w-14 h-14 rounded-xl bg-sage/10 text-sage flex items-center justify-center shrink-0 border border-beige">
                      <Tag className="w-6 h-6" />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <p className="text-sm font-bold text-earth truncate">{cat.name}</p>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${status === 'Active' ? 'bg-success/10 text-success border-success/30' : 'bg-beige text-muted border-beige'}`}>
                        {status}
                      </span>
                    </div>
                    <p className="text-[11px] font-medium text-sage mt-0.5">{count} {count === 1 ? 'product' : 'products'}</p>
                  </div>
                </div>

                {cat.description && (
                  <p className="text-xs text-muted leading-relaxed line-clamp-2">{cat.description}</p>
                )}

                <div className="flex items-center gap-2 pt-2 border-t border-beige/60">
                  <button
                    onClick={() => handleOpenEdit(cat)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-[11px] font-semibold text-earth border border-beige rounded-xl hover:bg-beige/40 transition-colors cursor-pointer"
                  >
                    <Edit className="w-3.5 h-3.5 text-sage" /> Edit
                  </button>
                  {deleteConfirm === cat._id ? (
                    <div className="flex items-center gap-1">
                      <button onClick={() => handleDelete(cat)} className="px-2.5 py-1.5 text-[11px] font-bold text-cream bg-rose rounded-xl hover:bg-rose/90 cursor-pointer">Confirm</button>
                      <button onClick={() => setDeleteConfirm(null)} className="px-2.5 py-1.5 text-[11px] font-semibold text-earth border border-beige rounded-xl hover:bg-beige/40 cursor-pointer">Cancel</button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirm(cat._id)}
                      className="px-3 py-1.5 text-[11px] font-semibold text-rose border border-rose/30 rounded-xl hover:bg-rose/10 transition-colors cursor-pointer"
                      title="Delete category"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </AdminLayout>
  );
};
