import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ArrowLeft, Plus, Loader2, Upload, X, Star, ImageIcon, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { AdminLayout } from '../components/AdminLayout';
import { createAdminProduct, getAdminCategories } from '../../services/adminService';
import { uploadImageFiles } from '../../services/uploadService';
import { productSchema } from '../../schemas/productSchema';

const FormField = ({ label, error, children, required }) => (
  <div className="space-y-1.5">
    <label className="block text-xs font-bold text-earth uppercase tracking-wider">
      {label} {required && <span className="text-error">*</span>}
    </label>
    {children}
    {error && <p className="text-xs text-error font-medium flex items-center gap-1">{error}</p>}
  </div>
);

const inputClass = "w-full px-3.5 py-2.5 bg-ivory border border-beige rounded-xl text-sm text-earth placeholder-muted focus:outline-none focus:ring-2 focus:ring-sage/40 focus:border-sage/50 transition-all";

export const AddProduct = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]); // File objects
  const [previewUrls, setPreviewUrls] = useState([]); // Local blob previews
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [urlImages, setUrlImages] = useState([]); // URL-based images
  const [categories, setCategories] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: { stock: 10, featured: false, status: 'Active' }
  });

  React.useEffect(() => {
    getAdminCategories().then(cats => setCategories(cats.map(c => typeof c === 'string' ? { _id: c, name: c } : c)));
  }, []);

  // Handle file selection — create local previews immediately
  const handleFiles = (files) => {
    const imageFiles = Array.from(files).filter(f => f.type.startsWith('image/'));
    if (imageFiles.length === 0) {
      toast.error('Please select valid image files (PNG, JPG, WebP, GIF, AVIF, etc.)');
      return;
    }
    const newPreviews = imageFiles.map(f => URL.createObjectURL(f));
    setUploadedFiles(prev => [...prev, ...imageFiles]);
    setPreviewUrls(prev => [...prev, ...newPreviews]);
    toast.success(`${imageFiles.length} image(s) selected`);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleFileSelect = (e) => {
    if (e.target.files) handleFiles(e.target.files);
    e.target.value = ''; // reset so same file can be re-selected
  };

  const removeFile = (index) => {
    URL.revokeObjectURL(previewUrls[index]);
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const addUrlImage = () => {
    const url = imageUrlInput.trim();
    if (!url) return;
    if (urlImages.includes(url)) {
      toast.error('This URL is already added');
      return;
    }
    setUrlImages(prev => [...prev, url]);
    setImageUrlInput('');
  };

  const removeUrlImage = (index) => {
    setUrlImages(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
    const totalImages = uploadedFiles.length + urlImages.length;
    if (totalImages === 0) {
      toast.error('Please add at least one product image (upload a file or add an image URL).');
      return;
    }

    setIsSubmitting(true);
    try {
      let finalImages = [...urlImages];

      // Upload local files to backend first
      if (uploadedFiles.length > 0) {
        setIsUploading(true);
        toast.info('Uploading product images to server...');
        try {
          const uploadedUrls = await uploadImageFiles(uploadedFiles);
          finalImages = [...uploadedUrls, ...urlImages];
          setIsUploading(false);
        } catch (uploadErr) {
          // Fallback: use base64 previews (works if backend upload fails)
          console.warn('Server upload failed, using local previews:', uploadErr.message);
          setIsUploading(false);
          // Convert files to base64 as fallback
          const base64Images = await Promise.all(
            uploadedFiles.map(
              (file) =>
                new Promise((resolve) => {
                  const reader = new FileReader();
                  reader.onload = (e) => resolve(e.target.result);
                  reader.readAsDataURL(file);
                })
            )
          );
          finalImages = [...base64Images, ...urlImages];
        }
      }

      await createAdminProduct({
        ...data,
        images: finalImages,
        category: data.category,
        sizes: data.sizes ? data.sizes.split(',').map(s => s.trim()).filter(Boolean) : [],
        colors: data.colors ? data.colors.split(',').map(c => c.trim()).filter(Boolean) : [],
        featured: data.featured,
        isFeatured: data.featured,
        status: data.status,
      });

      toast.success('Product created successfully!', {
        description: `"${data.name}" is now live in your store.`,
      });
      navigate('/admin/products');
    } catch (err) {
      toast.error(err.message || 'Failed to create product.');
    } finally {
      setIsSubmitting(false);
      setIsUploading(false);
    }
  };

  const allPreviews = [...previewUrls, ...urlImages];

  return (
    <AdminLayout
      title="Add New Product"
      subtitle="Create a handcrafted embroidery product with pricing, variants, and images"
      actions={
        <button
          onClick={() => navigate('/admin/products')}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-earth border border-beige rounded-xl hover:bg-beige/40 transition-colors cursor-pointer"
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
            <textarea
              {...register('description')}
              rows={4}
              placeholder="Describe this handcrafted product in detail..."
              className={`${inputClass} resize-none`}
            />
          </FormField>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Category" error={errors.category?.message} required>
              <select {...register('category')} className={inputClass}>
                <option value="">Select a category</option>
                {categories.map((c) => (
                  <option key={c._id ?? c} value={c._id ?? c}>
                    {c.name || c}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Material" error={errors.material?.message} required>
              <input {...register('material')} type="text" placeholder="e.g. Organic Linen, Cotton, Chanderi Silk" className={inputClass} />
            </FormField>
          </div>
        </div>

        {/* Pricing & Inventory */}
        <div className="bg-cream border border-beige rounded-2xl p-5 sm:p-6 shadow-warm-sm space-y-5">
          <h3 className="font-serif text-lg font-bold text-earth border-b border-beige pb-3">Pricing & Stock</h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FormField label="Selling Price (₹)" error={errors.price?.message} required>
              <input {...register('price')} type="number" step="1" min="0" placeholder="1899" className={inputClass} />
            </FormField>

            <FormField label="Discount Price (₹)" error={errors.discountPrice?.message}>
              <input {...register('discountPrice')} type="number" step="1" min="0" placeholder="1499 (optional)" className={inputClass} />
            </FormField>

            <FormField label="Stock Quantity" error={errors.stock?.message} required>
              <input {...register('stock')} type="number" min="0" placeholder="20" className={inputClass} />
            </FormField>
          </div>
        </div>

        {/* Variants & Settings */}
        <div className="bg-cream border border-beige rounded-2xl p-5 sm:p-6 shadow-warm-sm space-y-5">
          <h3 className="font-serif text-lg font-bold text-earth border-b border-beige pb-3">Variants & Status</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Available Sizes" error={errors.sizes?.message}>
              <input {...register('sizes')} type="text" placeholder="S, M, L, XL (comma separated)" className={inputClass} />
              <p className="text-[11px] text-muted">Separate sizes with commas</p>
            </FormField>

            <FormField label="Available Colors" error={errors.colors?.message}>
              <input {...register('colors')} type="text" placeholder="Cream, Sage Green, Terracotta" className={inputClass} />
              <p className="text-[11px] text-muted">Separate colors with commas</p>
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

        {/* Product Images — File Upload + URL */}
        <div className="bg-cream border border-beige rounded-2xl p-5 sm:p-6 shadow-warm-sm space-y-5">
          <div className="flex items-center justify-between border-b border-beige pb-3">
            <h3 className="font-serif text-lg font-bold text-earth">Product Images</h3>
            <span className="text-xs text-earth-muted">
              Supports PNG, JPG, WebP, GIF, AVIF, SVG — any image format
            </span>
          </div>

          {/* Drag & Drop Upload Zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
              isDragging ? 'border-sage bg-sage/10 scale-[1.01]' : 'border-beige bg-ivory/50 hover:bg-ivory hover:border-sage/40'
            }`}
          >
            <Upload className="w-10 h-10 text-sage mx-auto mb-3" />
            <p className="text-sm font-bold text-earth">Drag & drop product images here</p>
            <p className="text-[11px] text-muted mt-1 mb-4">
              or click Browse to select files — any image type accepted
            </p>
            <label className="inline-block px-5 py-2 bg-sage text-cream text-xs font-semibold rounded-xl cursor-pointer hover:bg-sage-dark transition-colors">
              Browse Files
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleFileSelect}
              />
            </label>
          </div>

          {/* Add Image by URL */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-earth uppercase tracking-wider">Or Add Image URL</label>
            <div className="flex items-center gap-2">
              <input
                type="url"
                value={imageUrlInput}
                onChange={(e) => setImageUrlInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addUrlImage())}
                placeholder="https://images.unsplash.com/..."
                className={inputClass}
              />
              <button
                type="button"
                onClick={addUrlImage}
                className="px-4 py-2.5 bg-earth text-cream text-xs font-bold rounded-xl hover:bg-charcoal shrink-0 cursor-pointer"
              >
                Add URL
              </button>
            </div>
          </div>

          {/* Image Previews Grid */}
          {allPreviews.length > 0 && (
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sage" />
                <p className="text-xs font-bold text-earth uppercase tracking-wider">
                  {allPreviews.length} image(s) ready
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {previewUrls.map((url, idx) => (
                  <div key={`file-${idx}`} className="relative group rounded-xl overflow-hidden border border-beige bg-ivory aspect-square">
                    <img src={url} alt={`Upload ${idx + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeFile(idx)}
                      className="absolute top-1.5 right-1.5 p-1 bg-rose-600 text-white rounded-full opacity-90 hover:opacity-100 transition-opacity cursor-pointer shadow-warm-sm"
                      title="Remove image"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    {idx === 0 && allPreviews.length > 0 && (
                      <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 bg-earth/80 text-cream text-[9px] font-bold rounded-md backdrop-blur-xs">
                        Main
                      </span>
                    )}
                    <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 bg-sage/80 text-cream text-[9px] font-bold rounded-md">
                      File
                    </span>
                  </div>
                ))}
                {urlImages.map((url, idx) => (
                  <div key={`url-${idx}`} className="relative group rounded-xl overflow-hidden border border-beige bg-ivory aspect-square">
                    <img src={url} alt={`URL ${idx + 1}`} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
                    <button
                      type="button"
                      onClick={() => removeUrlImage(idx)}
                      className="absolute top-1.5 right-1.5 p-1 bg-rose-600 text-white rounded-full opacity-90 hover:opacity-100 transition-opacity cursor-pointer shadow-warm-sm"
                      title="Remove URL"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 bg-earth/80 text-cream text-[9px] font-bold rounded-md">
                      URL
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {allPreviews.length === 0 && (
            <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700">
              <ImageIcon className="w-4 h-4 shrink-0" />
              <span>At least one product image is required before submitting.</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="px-5 py-2.5 text-xs font-semibold text-earth border border-beige rounded-xl hover:bg-beige/40 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-sage hover:bg-sage-dark text-cream text-xs font-bold rounded-xl shadow-warm-sm transition-all duration-200 disabled:opacity-60 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{isUploading ? 'Uploading Images...' : 'Creating Product...'}</span>
              </>
            ) : (
              <><Plus className="w-4 h-4" /><span>Create Product</span></>
            )}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
};
