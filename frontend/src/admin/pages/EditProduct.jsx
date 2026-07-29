import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ArrowLeft, Save, Loader2, Image, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { AdminLayout } from '../components/AdminLayout';
import { getAdminProductById, updateAdminProduct } from '../../services/adminService';
import { productSchema } from '../../schemas/productSchema';

const CATEGORIES = ['Embroidered Clothing', 'Home Decor', 'Bags & Pouches', 'Accessories', 'Custom Embroidery'];

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

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({
    resolver: yupResolver(productSchema),
  });

  const watchedImage = watch('imageUrl');

  useEffect(() => {
    const load = async () => {
      try {
        const product = await getAdminProductById(id);
        if (!product) { setNotFound(true); return; }
        reset({
          name: product.name || '',
          description: product.description || '',
          price: product.price || '',
          originalPrice: product.originalPrice || '',
          category: product.category || '',
          imageUrl: product.images?.[0] || '',
          stock: product.stock ?? 10,
          material: product.material || '',
          sizes: Array.isArray(product.sizes) ? product.sizes.join(', ') : (product.sizes || ''),
          colors: Array.isArray(product.colors) ? product.colors.join(', ') : (product.colors || ''),
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

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await updateAdminProduct(id, data);
      toast.success('Product updated successfully!', {
        description: `"${data.name}" has been updated in your store.`
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
      subtitle="Update the details of this handcrafted product"
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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-3xl">

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
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </FormField>
            <FormField label="Material" error={errors.material?.message} required>
              <input {...register('material')} type="text" placeholder="e.g. Organic Linen" className={inputClass} />
            </FormField>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-cream border border-beige rounded-2xl p-5 sm:p-6 shadow-warm-sm space-y-5">
          <h3 className="font-serif text-lg font-bold text-earth border-b border-beige pb-3">Pricing & Inventory</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FormField label="Selling Price (₹)" error={errors.price?.message} required>
              <input {...register('price')} type="number" step="1" min="0" placeholder="1899" className={inputClass} />
            </FormField>
            <FormField label="Original Price (₹)" error={errors.originalPrice?.message}>
              <input {...register('originalPrice')} type="number" step="1" min="0" placeholder="2499" className={inputClass} />
            </FormField>
            <FormField label="Stock Quantity" error={errors.stock?.message} required>
              <input {...register('stock')} type="number" min="0" placeholder="10" className={inputClass} />
            </FormField>
          </div>
        </div>

        {/* Variants */}
        <div className="bg-cream border border-beige rounded-2xl p-5 sm:p-6 shadow-warm-sm space-y-5">
          <h3 className="font-serif text-lg font-bold text-earth border-b border-beige pb-3">Variants & Options</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Available Sizes" error={errors.sizes?.message}>
              <input {...register('sizes')} type="text" placeholder="S, M, L, XL" className={inputClass} />
            </FormField>
            <FormField label="Available Colors" error={errors.colors?.message}>
              <input {...register('colors')} type="text" placeholder="Sage Green, Terracotta" className={inputClass} />
            </FormField>
          </div>
        </div>

        {/* Image */}
        <div className="bg-cream border border-beige rounded-2xl p-5 sm:p-6 shadow-warm-sm space-y-4">
          <h3 className="font-serif text-lg font-bold text-earth border-b border-beige pb-3">Product Image</h3>
          <FormField label="Image URL" error={errors.imageUrl?.message} required>
            <input {...register('imageUrl')} type="url" placeholder="https://images.unsplash.com/..." className={inputClass} />
          </FormField>
          {watchedImage && (
            <div className="mt-2">
              <p className="text-xs font-semibold text-earth mb-2">Preview:</p>
              <img src={watchedImage} alt="Preview" className="w-36 h-36 object-cover rounded-xl border border-beige bg-ivory" onError={(e) => { e.target.style.display = 'none'; }} />
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-3">
          <button type="button" onClick={() => navigate('/admin/products')} className="px-5 py-2.5 text-xs font-semibold text-earth border border-beige rounded-xl hover:bg-beige/40 transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={isSubmitting} className="inline-flex items-center gap-2 px-6 py-2.5 bg-sage hover:bg-sage-dark text-cream text-xs font-bold rounded-xl shadow-warm-sm transition-all duration-200 disabled:opacity-60">
            {isSubmitting ? (
              <><Loader2 className="w-4 h-4 animate-spin" /><span>Updating...</span></>
            ) : (
              <><Save className="w-4 h-4" /><span>Update Product</span></>
            )}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
};
