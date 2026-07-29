import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Package,
  Filter,
  RefreshCw
} from 'lucide-react';
import { AdminLayout } from '../components/AdminLayout';
import { DeleteProductDialog } from '../components/DeleteProductDialog';
import { getAdminProducts, deleteAdminProduct } from '../../services/adminService';
import { toast } from 'sonner';

export const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [deleteDialog, setDeleteDialog] = useState({ open: false, product: null });
  const [isDeleting, setIsDeleting] = useState(false);

  const categories = ['All', 'Embroidered Clothing', 'Home Decor', 'Bags & Pouches', 'Accessories', 'Custom Embroidery'];

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await getAdminProducts();
      setProducts(data);
      setFilteredProducts(data);
    } catch (err) {
      toast.error('Failed to load products.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadProducts(); }, []);

  useEffect(() => {
    let list = [...products];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p => p.name?.toLowerCase().includes(q) || p.category?.toLowerCase().includes(q));
    }
    if (categoryFilter !== 'All') {
      list = list.filter(p => p.category === categoryFilter);
    }
    setFilteredProducts(list);
  }, [searchQuery, categoryFilter, products]);

  const handleDeleteConfirm = async () => {
    if (!deleteDialog.product) return;
    setIsDeleting(true);
    try {
      await deleteAdminProduct(deleteDialog.product._id);
      toast.success('Product deleted successfully.');
      setProducts(prev => prev.filter(p => p._id !== deleteDialog.product._id));
      setDeleteDialog({ open: false, product: null });
    } catch (err) {
      toast.error('Failed to delete product.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AdminLayout
      title="Product Management"
      subtitle={`${filteredProducts.length} products in your handcrafted collection`}
      actions={
        <Link
          to="/admin/products/add"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-sage hover:bg-sage-dark text-cream text-xs font-bold rounded-xl shadow-warm-sm transition-all duration-200"
        >
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </Link>
      }
    >
      {/* Search & Filters Bar */}
      <div className="bg-cream border border-beige rounded-2xl p-4 shadow-warm-sm flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search products by name or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-ivory border border-beige rounded-xl text-sm text-earth placeholder-muted focus:outline-none focus:ring-2 focus:ring-sage/40"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted shrink-0" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-ivory border border-beige rounded-xl px-3 py-2 text-sm text-earth focus:outline-none focus:ring-2 focus:ring-sage/40 cursor-pointer"
          >
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <button
          onClick={loadProducts}
          className="p-2.5 border border-beige bg-ivory rounded-xl text-muted hover:text-sage transition-colors"
          title="Refresh"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Products Table/Grid */}
      <div className="bg-cream border border-beige rounded-2xl shadow-warm-sm overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex items-center gap-4 animate-pulse">
                <div className="w-14 h-14 bg-beige rounded-xl shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-beige rounded w-1/3" />
                  <div className="h-3 bg-beige rounded w-1/4" />
                </div>
                <div className="h-4 bg-beige rounded w-1/6" />
                <div className="h-4 bg-beige rounded w-16" />
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-14 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-sage/10 text-sage flex items-center justify-center mx-auto">
              <Package className="w-7 h-7" />
            </div>
            <p className="font-serif text-xl font-bold text-earth">No products found</p>
            <p className="text-sm text-muted">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <>
            {/* Desktop Table Header */}
            <div className="hidden md:grid grid-cols-12 gap-3 px-5 py-3 bg-ivory border-b border-beige text-[11px] font-bold uppercase tracking-wider text-muted">
              <div className="col-span-5">Product</div>
              <div className="col-span-2 text-center">Category</div>
              <div className="col-span-1 text-center">Price</div>
              <div className="col-span-1 text-center">Stock</div>
              <div className="col-span-3 text-center">Actions</div>
            </div>

            <div className="divide-y divide-beige/60">
              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="flex flex-col md:grid md:grid-cols-12 gap-3 md:gap-3 items-start md:items-center px-5 py-4 hover:bg-ivory transition-colors"
                >
                  {/* Product Info */}
                  <div className="col-span-5 flex items-center gap-3 w-full">
                    <img
                      src={product.images?.[0]}
                      alt={product.name}
                      className="w-14 h-14 rounded-xl object-cover bg-beige shrink-0 border border-beige/60"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-earth line-clamp-1">{product.name}</p>
                      <p className="text-[11px] text-muted">{product.material}</p>
                      {product.discountPercent > 0 && (
                        <span className="text-[10px] font-bold bg-sage/10 text-sage px-1.5 py-0.5 rounded-md">
                          {product.discountPercent}% OFF
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Category */}
                  <div className="col-span-2 md:text-center">
                    <span className="text-xs font-medium bg-beige/50 text-charcoal px-2 py-1 rounded-lg border border-beige">
                      {product.category}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="col-span-1 md:text-center">
                    <p className="text-sm font-bold text-earth">₹{product.price?.toLocaleString()}</p>
                    {product.originalPrice && (
                      <p className="text-[10px] text-muted line-through">₹{product.originalPrice?.toLocaleString()}</p>
                    )}
                  </div>

                  {/* Stock */}
                  <div className="col-span-1 md:text-center">
                    <span className={`text-xs font-bold ${product.stock > 5 ? 'text-success' : product.stock > 0 ? 'text-warning' : 'text-error'}`}>
                      {product.stock > 0 ? product.stock : 'Out'}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="col-span-3 flex items-center gap-2 md:justify-center flex-wrap">
                    <a
                      href={`/shop`}
                      target="_blank"
                      rel="noreferrer"
                      title="Preview on Store"
                      className="p-2 rounded-xl border border-beige text-muted hover:text-sage hover:border-sage/40 hover:bg-sage/10 transition-all"
                    >
                      <Eye className="w-4 h-4" />
                    </a>
                    <Link
                      to={`/admin/products/edit/${product._id}`}
                      title="Edit Product"
                      className="p-2 rounded-xl border border-beige text-muted hover:text-gold hover:border-gold/40 hover:bg-gold/10 transition-all"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => setDeleteDialog({ open: true, product })}
                      title="Delete Product"
                      className="p-2 rounded-xl border border-beige text-muted hover:text-error hover:border-error/40 hover:bg-error/10 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <DeleteProductDialog
        isOpen={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, product: null })}
        onConfirm={handleDeleteConfirm}
        productName={deleteDialog.product?.name || ''}
        isDeleting={isDeleting}
      />
    </AdminLayout>
  );
};
