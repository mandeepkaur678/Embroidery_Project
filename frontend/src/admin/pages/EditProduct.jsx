import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ArrowLeft, Save, Loader2, Image, AlertCircle, Upload, X, Star } from 'lucide-react';
import { toast } from 'sonner';
import { AdminLayout } from '../components/AdminLayout';
import { getAdminProductById, updateAdminProduct, getAdminCategories } from '../../services/adminService';
import { productSchema } from '../../schemas/productSchema';

const FormField = ({ label, error, children, required }) => (
  <div className="space-y-1.5">
    <label className="block text-xs font-bold text-earth uppercase tracking-wider">
      {label} {required && <span className="text-error">*</span>}
    </label>
    {children}
    {error && <p className="text-xs text-error font-medium">{error}</p>}
  </div>
);

const inputClass = "w-full px-3.5 py-2.5 bg-ivory border border-beige rounded-xl text-sm text-earth placeholder-muted focus:outline-none focus:ring-2 focus:ring-sage/40 focus:border-sage/50 transition-all";

export const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagesList, setImagesList] = useState([]);
  const [imageInput, setImageInput] = useState('');
  const [categories, setCategories] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(productSchema),
  });

  useEffect(() => {
    const load = async () => {
      try {
        const [product, cats] = await Promise.all([
          getAdminProductById(id),
          getAdminCategories(),
        ]);
        setCategories(cats.map(c => c.name || c));

        if (!product) { setNotFound(true); return; }

        setImagesList(product.images || []);

        reset({
          name: product.name || '',
          description: product.description || '',
          price: product.price || '',
          discountPrice: product.discountPrice || '',
          originalPrice: product.originalPrice || '',
          category: typeof product.category === 'object' ? product.category._id || product.category.name : product.category || '',
          stock: product.stock ?? 10,
          material: product.material || '',
          sizes: Array.isArray(product.sizes) ? product.sizes.join(', ') : (product.sizes || ''),
          colors: Array.isArray(product.colors) ? product.colors.join(', ') : (product.colors || ''),
          featured: product.featured || false,
          status: product.status || 'Active',
        });
      } catch (err) {
        setNotFound(true);
        toast.error('Failed to load product details.');
      } finally {
        setLoadingProduct(false);
      }
    };
    load();
  }, [id, reset]);

  const handleAddImage = () => {
    if (!imageInput.trim()) return;
    if (imagesList.includes(imageInput.trim())) {
      toast.error('Image URL already added');
      return;
    }
    setImagesList([...imagesList, imageInput.trim()]);
    setImageInput('');
  };

  const handleRemoveImage = (index) => {
    setImagesList(imagesList.filter((_, i) => i !== index));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setImagesList(prev => [...prev, event.target.result]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setImagesList(prev => [...prev, event.target.result]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await updateAdminProduct(id, {
        ...data,
        images: imagesList,
      });
      toast.success('Product updated successfully!', {
        description: `"${data.name}" has been updated.`
      });
      navigate('/admin/products');
    } catch (err) {
      toast.error(err.message || 'Failed to update product.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingProduct) {
    return (
      <AdminLayout title="Edit Product">
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-3 text-muted">
            <Loader2 className="w-8 h-8 animate-spin text-sage" />
            <span className="text-sm">Loading product details...</span>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (notFound) {
    return (
      <AdminLayout title="Product Not Found">
        <div className="text-center py-20 space-y-4">
          <div className="w-14 h-14 rounded-full bg-error/10 text-error flex items-center justify-center mx-auto">
            <AlertCircle className="w-7 h-7" />
          </div>
          <p className="font-serif text-xl font-bold text-earth">Product not found</p>
          <p className="text-sm text-muted">The product you're looking for doesn't exist.</p>
          <button onClick={() => navigate('/admin/products')} className="px-5 py-2.5 bg-sage text-cream text-xs font-bold rounded-xl">
            Back to Products
          </button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title="Edit Product"
      subtitle="Update handcrafted embroidery product details, stock, pricing, and images"
      actions={
        <button
          onClick={() => navigate('/admin/products')}
          className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold text-earth border border-beige rounded-xl hover:bg-beige/40 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Products</span>
        </button>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-4xl">

        {/* Basic Info */}
        <div className="bg-cream border border-beige rounded-2xl p-5 sm:p-6 shadow-warm-sm space-y-5">
          <h3 className="font-serif text-lg font-bold text-earth border-b border-beige pb-3">Basic Information</h3>
          <FormField label="Product Name" error={errors.name?.message} required>
            <input {...register('name')} type="text" placeholder="e.g. Floral Hand Embroidered Kurta" className={inputClass} />
          </FormField>
          <FormField label="Description" error={errors.description?.message} required>
            <textarea {...register('description')} rows={4} placeholder="Describe this handcrafted product..." className={`${inputClass} resize-none`} />
          </FormField>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Category" error={errors.category?.message} required>
              <select {...register('category')} className={inputClass}>
                <option value="">Select a category</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </FormField>
            <FormField label="Material" error={errors.material?.message} required>
              <input {...register('material')} type="text" placeholder="e.g. Organic Linen" className={inputClass} />
            </FormField>
          </div>
        </div>

        {/* Pricing & Stock */}
        <div className="bg-cream border border-beige rounded-2xl p-5 sm:p-6 shadow-warm-sm space-y-5">
          <h3 className="font-serif text-lg font-bold text-earth border-b border-beige pb-3">Pricing & Inventory</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FormField label="Selling Price (₹)" error={errors.price?.message} required>
              <input {...register('price')} type="number" step="1" min="0" placeholder="1899" className={inputClass} />
            </FormField>
            <FormField label="Discount Price (₹)" error={errors.discountPrice?.message}>
              <input {...register('discountPrice')} type="number" step="1" min="0" placeholder="1499 (optional)" className={inputClass} />
            </FormField>
            <FormField label="Stock Quantity" error={errors.stock?.message} required>
              <input {...register('stock')} type="number" min="0" placeholder="10" className={inputClass} />
            </FormField>
          </div>
        </div>

        {/* Variants & Status */}
        <div className="bg-cream border border-beige rounded-2xl p-5 sm:p-6 shadow-warm-sm space-y-5">
          <h3 className="font-serif text-lg font-bold text-earth border-b border-beige pb-3">Variants & Status</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Available Sizes" error={errors.sizes?.message}>
              <input {...register('sizes')} type="text" placeholder="S, M, L, XL" className={inputClass} />
            </FormField>
            <FormField label="Available Colors" error={errors.colors?.message}>
              <input {...register('colors')} type="text" placeholder="Sage Green, Terracotta" className={inputClass} />
            </FormField>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <FormField label="Product Status">
              <select {...register('status')} className={inputClass}>
                <option value="Active">Active (Visible in Store)</option>
                <option value="Draft">Draft (Hidden from Store)</option>
                <option value="Inactive">Inactive</option>
              </select>
            </FormField>
            <div className="flex items-center gap-3 pt-6">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-earth uppercase tracking-wider select-none">
                <input
                  type="checkbox"
                  {...register('featured')}
                  className="w-4 h-4 rounded border-beige text-sage focus:ring-sage/30 accent-sage cursor-pointer"
                />
                <span className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-gold fill-gold" />
                  Mark as Featured Product
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Multiple Product Images */}
        <div className="bg-cream border border-beige rounded-2xl p-5 sm:p-6 shadow-warm-sm space-y-5">
          <h3 className="font-serif text-lg font-bold text-earth border-b border-beige pb-3">Multiple Product Images</h3>

          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all ${isDragging ? 'border-sage bg-sage/10' : 'border-beige bg-ivory/50 hover:bg-ivory'}`}
          >
            <Upload className="w-8 h-8 text-sage mx-auto mb-2" />
            <p className="text-xs font-bold text-earth">Drag & drop product images here</p>
            <p className="text-[11px] text-muted mt-1">or browse files from your computer</p>
            <label className="mt-3 inline-block px-4 py-1.5 bg-sage text-cream text-xs font-semibold rounded-xl cursor-pointer hover:bg-sage-dark transition-colors">
              Browse Files
              <input type="file" multiple accept="image/*" className="hidden" onChange={handleFileSelect} />
            </label>
          </div>

          <div className="space-y-2 pt-2">
            <label className="block text-xs font-bold text-earth uppercase tracking-wider">Or Add Image URL</label>
            <div className="flex items-center gap-2">
              <input
                type="url"
                value={imageInput}
                onChange={(e) => setImageInput(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className={inputClass}
              />
              <button
                type="button"
                onClick={handleAddImage}
                className="px-4 py-2.5 bg-earth text-cream text-xs font-bold rounded-xl hover:bg-charcoal shrink-0 cursor-pointer"
              >
                Add Image
              </button>
            </div>
          </div>

          {imagesList.length > 0 && (
            <div className="space-y-2 pt-2">
              <p className="text-xs font-bold text-earth uppercase tracking-wider">Product Images ({imagesList.length})</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {imagesList.map((img, idx) => (
                  <div key={idx} className="relative group rounded-xl overflow-hidden border border-beige bg-ivory aspect-square">
                    <img src={img} alt={`Product ${idx + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-1.5 right-1.5 p-1 bg-rose text-white rounded-full opacity-90 hover:opacity-100 transition-opacity cursor-pointer shadow-warm-sm"
                      title="Remove image"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    {idx === 0 && (
                      <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 bg-earth/80 text-cream text-[9px] font-bold rounded-md backdrop-blur-xs">
                        Main Image
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-3">
          <button type="button" onClick={() => navigate('/admin/products')} className="px-5 py-2.5 text-xs font-semibold text-earth border border-beige rounded-xl hover:bg-beige/40 transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={isSubmitting} className="inline-flex items-center gap-2 px-6 py-2.5 bg-sage hover:bg-sage-dark text-cream text-xs font-bold rounded-xl shadow-warm-sm transition-all duration-200 disabled:opacity-60 cursor-pointer">
            {isSubmitting ? (
              <><Loader2 className="w-4 h-4 animate-spin" /><span>Updating Product...</span></>
            ) : (
              <><Save className="w-4 h-4" /><span>Update Product</span></>
            )}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
};
