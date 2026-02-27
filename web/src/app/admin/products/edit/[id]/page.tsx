'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { fetchProductAdmin, updateProduct, clearError, clearCurrentProduct } from '@/lib/slices/productSlice';
import { fetchCategories } from '@/lib/slices/categorySlice';
import MultipleImageUpload from '@/components/MultipleImageUpload';
import { FiSave, FiX, FiInfo, FiDollarSign, FiImage, FiSettings, FiPlus } from 'react-icons/fi';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const dispatch = useAppDispatch();
  const productId = params.id as string;
  const { currentProduct, isLoading, error } = useAppSelector((state) => state.product);
  const { categories } = useAppSelector((state) => state.category);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    shortDescription: '',
    price: '',
    discountedPrice: '',
    stock: '',
    sku: '',
    model: '',
    mainImage: '',
    images: [] as string[],
    features: [] as { name: string, value: string }[],
    shippingWeight: '',
    status: 'active',
    rating: '',
    isNewArrival: false,
    isBestSeller: false,
    showProductDetails: true,
  });

  const [isLoadingProduct, setIsLoadingProduct] = useState(true);

  useEffect(() => {
    dispatch(fetchCategories());
    if (productId) {
      dispatch(fetchProductAdmin(productId));
    }

    return () => {
      dispatch(clearCurrentProduct());
    };
  }, [dispatch, productId]);

  useEffect(() => {
    if (currentProduct) {
      setFormData({
        name: currentProduct.name || '',
        category: typeof currentProduct.category === 'object' ? currentProduct.category._id : currentProduct.category || '',
        shortDescription: currentProduct.shortDescription || '',
        price: currentProduct.price?.toString() || '',
        discountedPrice: currentProduct.discountedPrice?.toString() || '',
        stock: currentProduct.stock?.toString() || '',
        sku: currentProduct.sku || '',
        model: (currentProduct as any).model || '',
        mainImage: (currentProduct as any).mainImage || currentProduct.image || '',
        images: (currentProduct as any).images || [],
        features: (currentProduct as any).features || [],
        shippingWeight: currentProduct.shippingWeight?.toString() || '',
        status: currentProduct.status || 'active',
        rating: (currentProduct as any).rating?.toString() || '',
        isNewArrival: (currentProduct as any).isNewArrival || false,
        isBestSeller: (currentProduct as any).isBestSeller || false,
        showProductDetails: (currentProduct as any).showProductDetails !== false, // Defaults to true if undefined
      });
      setIsLoadingProduct(false);
    }
  }, [currentProduct]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleFeatureChange = (index: number, field: 'name' | 'value', value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index][field] = value;
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => {
    setFormData(prev => ({ ...prev, features: [...prev.features, { name: '', value: '' }] }));
  };

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearError());

    // Client-side validation
    const missingFields = [];
    if (!formData.name) missingFields.push('name');
    if (!formData.category) missingFields.push('category');
    if (!formData.price) missingFields.push('price');
    if (!formData.stock) missingFields.push('stock');
    if (!formData.sku) missingFields.push('sku');
    if (!formData.mainImage) missingFields.push('mainImage');
    if (!formData.shippingWeight) missingFields.push('shippingWeight');

    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    try {
      const productData = {
        name: formData.name.trim(),
        category: formData.category,
        shortDescription: formData.shortDescription?.trim() || undefined,
        price: parseFloat(formData.price),
        discountedPrice: formData.discountedPrice ? parseFloat(formData.discountedPrice) : undefined,
        stock: parseInt(formData.stock),
        sku: formData.sku.trim(),
        model: formData.model.trim() || undefined,
        mainImage: formData.mainImage,
        images: formData.images || [],
        features: formData.features.filter(f => f.name.trim() !== '' && f.value.trim() !== ''),
        shippingWeight: parseFloat(formData.shippingWeight),
        status: formData.status as 'active' | 'inactive',
        rating: formData.rating ? parseFloat(formData.rating) : undefined,
        isNewArrival: formData.isNewArrival,
        isBestSeller: formData.isBestSeller,
        showProductDetails: formData.showProductDetails,
      };

      await dispatch(updateProduct({ id: productId, data: productData })).unwrap();
      router.push('/admin/products');
    } catch (err: any) {
      console.error('Product update error:', err);
    }
  };

  if (isLoadingProduct) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
          <p className="text-gray-500 font-medium">Loading product details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Edit Product</h1>
          <p className="text-gray-500 mt-2">Update product information and settings.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="px-4 py-2 border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 font-medium rounded-lg transition-colors flex items-center gap-2"
          >
            <FiX size={18} />
            Cancel
          </button>
          <button
            form="edit-product-form"
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-black text-white font-medium rounded-lg hover:bg-zinc-800 transition-all shadow-sm hover:shadow active:scale-95 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <FiSave size={18} />}
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 font-medium flex items-center gap-3">
          <FiInfo size={20} />
          {error}
        </div>
      )}

      <form id="edit-product-form" onSubmit={handleSubmit} className="space-y-8">

        {/* Basic Info */}
        <section className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center gap-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <FiInfo size={20} />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Basic Information</h2>
          </div>
          <div className="p-6 grid gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder:text-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all appearance-none"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all appearance-none"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Short Description
              </label>
              <textarea
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder:text-gray-400"
              />
            </div>
          </div>
        </section>

        {/* Pricing & Stock */}
        <section className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center gap-3">
            <div className="p-2 bg-green-50 text-green-600 rounded-lg">
              <FiDollarSign size={20} />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Price & Inventory</h2>
          </div>

          <div className="p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="md:col-span-2 lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Base Price <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full pl-8 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                />
              </div>
            </div>

            <div className="md:col-span-2 lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sale Price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                <input
                  type="number"
                  name="discountedPrice"
                  value={formData.discountedPrice}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className="w-full pl-8 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                />
              </div>
            </div>

            <div className="md:col-span-2 lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stock Quantity <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
              />
            </div>

            <div className="md:col-span-2 lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SKU <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all uppercase font-mono text-sm"
              />
            </div>
          </div>
        </section>

        {/* Features & Model */}
        <section className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                <FiInfo size={20} />
              </div>
              <h2 className="text-lg font-bold text-gray-900">Product Details & Features</h2>
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <span className="text-sm font-medium text-gray-700">Display Section</span>
              <div className="relative inline-flex items-center">
                <input
                  type="checkbox"
                  name="showProductDetails"
                  checked={formData.showProductDetails}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
              </div>
            </label>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Model Number
              </label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all font-mono text-sm"
                placeholder="e.g. FRB084137Y75"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Features List
                </label>
                <button
                  type="button"
                  onClick={addFeature}
                  className="text-sm text-[#C5A059] hover:text-[#B8935A] font-medium flex items-center gap-1"
                >
                  <FiPlus size={16} /> Add Feature
                </button>
              </div>

              <div className="space-y-3">
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={feature.name}
                        onChange={(e) => handleFeatureChange(index, 'name', e.target.value)}
                        placeholder="e.g. Metal"
                        className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        value={feature.value}
                        onChange={(e) => handleFeatureChange(index, 'value', e.target.value)}
                        placeholder="e.g. 14kt Yellow Gold"
                        className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="p-2.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100 mt-0.5"
                    >
                      <FiX size={18} />
                    </button>
                  </div>
                ))}
                {formData.features.length === 0 && (
                  <p className="text-sm text-gray-500 italic text-center py-4 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                    No features added. Click "Add Feature" to create a list.
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Media */}
        <section className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center gap-3">
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
              <FiImage size={20} />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Product Images</h2>
          </div>
          <div className="p-6">
            <MultipleImageUpload
              mainImage={formData.mainImage}
              images={formData.images}
              onMainImageChange={(url) => setFormData(prev => ({ ...prev, mainImage: url }))}
              onImagesChange={(urls) => setFormData(prev => ({ ...prev, images: urls }))}
            />
          </div>
        </section>

        {/* Shipping & Additional Settings */}
        <section className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center gap-3">
            <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
              <FiSettings size={20} />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Shipping & Settings</h2>
          </div>
          <div className="p-6 grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Shipping Weight (grams) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="shippingWeight"
                  value={formData.shippingWeight}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">g</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Initial Rating
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  min="0"
                  max="5"
                  step="0.1"
                  className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">/ 5</span>
              </div>
            </div>

            <div className="md:col-span-2 border-t border-gray-100 pt-6 mt-2">
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="flex items-start gap-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="checkbox"
                    name="isNewArrival"
                    checked={formData.isNewArrival}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                  />
                  <div>
                    <span className="block text-sm font-bold text-gray-900">New Arrival</span>
                    <span className="block text-xs text-gray-500 mt-0.5">Mark this product as a new addition to the catalog.</span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="checkbox"
                    name="isBestSeller"
                    checked={formData.isBestSeller}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                  />
                  <div>
                    <span className="block text-sm font-bold text-gray-900">Best Seller</span>
                    <span className="block text-xs text-gray-500 mt-0.5">Highlight this product as a top selling item.</span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </section>

      </form>
    </div>
  );
}
