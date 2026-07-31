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
  RefreshCw,
  ArrowUpDown,
  X,
  Star,
  CheckCircle,
  AlertCircle
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
  const [sortBy, setSortBy] = useState('newest');
  const [deleteDialog, setDeleteDialog] = useState({ open: false, product: null });
  const [previewProduct, setPreviewProduct] = useState(null);
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

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p => p.name?.toLowerCase().includes(q) || (typeof p.category === 'string' ? p.category : p.category?.name)?.toLowerCase().includes(q));
    }

    // Category filter
    if (categoryFilter !== 'All') {
      list = list.filter(p => (typeof p.category === 'string' ? p.category : p.category?.name) === categoryFilter);
    }

    // Sort
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name-asc') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'stock-asc') {
      list.sort((a, b) => a.stock - b.stock);
    } else {
      // newest
      list.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    }

    setFilteredProducts(list);
  }, [searchQuery, categoryFilter, sortBy, products]);

  const handleDeleteConfirm = async () => {
    if (!deleteDialog.product) return;
    setIsDeleting(true);
    try {
      await deleteAdminProduct(deleteDialog.product._id);
      toast.success('Product permanently deleted from MongoDB.');
      setProducts((prev) => prev.filter((p) => p._id !== deleteDialog.product._id));
      setDeleteDialog({ open: false, product: null });
    } catch (err) {
      toast.error(err.message || 'Failed to delete product.');
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
      {/* Search, Filter & Sort Bar */}
      <div className="bg-cream border border-beige rounded-2xl p-4 shadow-warm-sm flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search products by name or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-ivory border border-beige rounded-xl text-xs sm:text-sm text-earth placeholder-muted focus:outline-none focus:ring-2 focus:ring-sage/40"
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted shrink-0" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-ivory border border-beige rounded-xl px-3 py-2 text-xs sm:text-sm text-earth focus:outline-none focus:ring-2 focus:ring-sage/40 cursor-pointer"
          >
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4 text-muted shrink-0" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-ivory border border-beige rounded-xl px-3 py-2 text-xs sm:text-sm text-earth focus:outline-none focus:ring-2 focus:ring-sage/40 cursor-pointer"
          >
            <option value="newest">Newest First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A-Z</option>
            <option value="stock-asc">Stock: Low to High</option>
          </select>
        </div>

        {/* Refresh */}
        <button
          onClick={loadProducts}
          className="p-2.5 border border-beige bg-ivory rounded-xl text-muted hover:text-sage transition-colors cursor-pointer"
          title="Refresh List"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Products Table */}
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
            {/* Table Header */}
            <div className="hidden md:grid grid-cols-12 gap-3 px-5 py-3 bg-ivory border-b border-beige text-[11px] font-bold uppercase tracking-wider text-muted">
              <div className="col-span-4">Product</div>
              <div className="col-span-2 text-center">Category</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-1 text-center">Stock</div>
              <div className="col-span-1 text-center">Status</div>
              <div className="col-span-2 text-center">Actions</div>
            </div>

            <div className="divide-y divide-beige/60">
              {filteredProducts.map((product) => {
                const categoryName = typeof product.category === 'object' ? product.category?.name : product.category;
                const status = product.isActive === false || product.status === 'Inactive'
                  ? 'Inactive'
                  : (product.stock === 0 ? 'Out of Stock' : (product.status || 'Active'));

                return (
                  <div
                    key={product._id}
                    className="flex flex-col md:grid md:grid-cols-12 gap-3 items-start md:items-center px-5 py-4 hover:bg-ivory transition-colors"
                  >
                    {/* Product Info */}
                    <div className="col-span-4 flex items-center gap-3 w-full">
                      <img
                        src={product.images?.[0] || 'https://images.unsplash.com/photo-1528458909336-e7a0adfac1d5?auto=format&fit=crop&q=80&w=200'}
                        alt={product.name}
                        className="w-14 h-14 rounded-xl object-cover bg-beige shrink-0 border border-beige/60"
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-earth line-clamp-1">{product.name}</p>
                        <p className="text-[11px] text-muted">{product.material || 'Handcrafted'}</p>
                        {product.discountPrice && product.discountPrice < product.price && (
                          <span className="text-[10px] font-bold bg-terracotta/10 text-terracotta px-1.5 py-0.5 rounded-md mt-0.5 inline-block">
                            SALE
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Category */}
                    <div className="col-span-2 md:text-center">
                      <span className="text-xs font-medium bg-beige/50 text-charcoal px-2.5 py-1 rounded-lg border border-beige">
                        {categoryName}
                      </span>
                    </div>

                    {/* Price */}
                    <div className="col-span-2 md:text-center">
                      <p className="text-sm font-bold text-earth">₹{product.price?.toLocaleString()}</p>
                      {product.discountPrice && (
                        <p className="text-[10px] text-muted line-through">₹{product.discountPrice?.toLocaleString()}</p>
                      )}
                    </div>

                    {/* Stock */}
                    <div className="col-span-1 md:text-center">
                      <span className={`text-xs font-bold ${product.stock > 5 ? 'text-success' : product.stock > 0 ? 'text-warning' : 'text-error'}`}>
                        {product.stock > 0 ? `${product.stock} pcs` : '0'}
                      </span>
                    </div>

                    {/* Status */}
                    <div className="col-span-1 md:text-center">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        status === 'Active' ? 'bg-success/10 text-success border-success/30' :
                        status === 'Draft' ? 'bg-warning/10 text-warning border-warning/30' :
                        'bg-error/10 text-error border-error/30'
                      }`}>
                        {status}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="col-span-2 flex items-center gap-2 md:justify-center flex-wrap">
                      <button
                        onClick={() => setPreviewProduct(product)}
                        title="Preview Product Modal"
                        className="p-2 rounded-xl border border-beige text-muted hover:text-sage hover:border-sage/40 hover:bg-sage/10 transition-all cursor-pointer"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
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
                        className="p-2 rounded-xl border border-beige text-muted hover:text-error hover:border-error/40 hover:bg-error/10 transition-all cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Product Preview Modal */}
      {previewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-earth/50 backdrop-blur-xs animate-fadeIn">
          <div className="bg-cream border border-beige rounded-2xl max-w-2xl w-full p-6 shadow-warm-md relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setPreviewProduct(null)}
              className="absolute top-4 right-4 p-1.5 rounded-xl border border-beige text-earth hover:bg-beige/40 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-terracotta text-xs font-bold uppercase tracking-wider mb-2">
              <span>PRODUCT PREVIEW</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-2">
              <img
                src={previewProduct.images?.[0] || 'https://images.unsplash.com/photo-1528458909336-e7a0adfac1d5?auto=format&fit=crop&q=80&w=600'}
                alt={previewProduct.name}
                className="w-full aspect-square object-cover rounded-2xl border border-beige bg-ivory"
              />

              <div className="space-y-4">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-earth">{previewProduct.name}</h3>
                  <p className="text-xs text-muted mt-1">{typeof previewProduct.category === 'object' ? previewProduct.category?.name : previewProduct.category}</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-earth">₹{previewProduct.price?.toLocaleString()}</span>
                  {previewProduct.discountPrice && (
                    <span className="text-sm text-muted line-through">₹{previewProduct.discountPrice?.toLocaleString()}</span>
                  )}
                </div>

                <p className="text-xs text-earth/80 leading-relaxed">{previewProduct.description}</p>

                <div className="space-y-2 text-xs border-t border-beige/60 pt-3">
                  <p><strong className="text-earth">Material:</strong> {previewProduct.material || 'Organic Linen'}</p>
                  <p><strong className="text-earth">Stock:</strong> {previewProduct.stock} in stock</p>
                  {previewProduct.sizes && (
                    <p><strong className="text-earth">Sizes:</strong> {Array.isArray(previewProduct.sizes) ? previewProduct.sizes.join(', ') : previewProduct.sizes}</p>
                  )}
                  {previewProduct.colors && (
                    <p><strong className="text-earth">Colors:</strong> {Array.isArray(previewProduct.colors) ? previewProduct.colors.join(', ') : previewProduct.colors}</p>
                  )}
                </div>

                <div className="pt-2">
                  <Link
                    to={`/admin/products/edit/${previewProduct._id}`}
                    onClick={() => setPreviewProduct(null)}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 bg-sage text-cream text-xs font-bold rounded-xl hover:bg-sage-dark transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit Product</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
