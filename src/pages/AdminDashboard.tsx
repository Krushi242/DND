import React, { useEffect, useState } from 'react';
import { ChevronRight, Download, Filter, RefreshCcw } from 'lucide-react';
import AdminContactsSection from '../components/admin/AdminContactsSection';
import AdminGallerySection from '../components/admin/AdminGallerySection';
import AdminOverview from '../components/admin/AdminOverview';
import AdminProductsSection from '../components/admin/AdminProductsSection';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminVideosSection from '../components/admin/AdminVideosSection';
import type { AdminSection, Contact } from '../components/admin/types';
import { getApiUrl } from '../utils/api';
import { createGalleryItem, getGalleryItems, removeGalleryItem } from '../utils/gallery';
import type { GalleryItem } from '../utils/gallery';
import { createProductItem, getProductItems, updateProductItem } from '../utils/products';
import type { ProductItem, ProductPayload } from '../utils/products';
import { createVideoItem, getVideoItems, removeVideoItem } from '../utils/videos';
import type { VideoItem } from '../utils/videos';
import { toVideoEmbedUrl } from '../utils/mediaLinks';

const AdminDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AdminSection>('overview');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [videoItems, setVideoItems] = useState<VideoItem[]>([]);
  const [productItems, setProductItems] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [galleryLoading, setGalleryLoading] = useState(true);
  const [videoLoading, setVideoLoading] = useState(true);
  const [productLoading, setProductLoading] = useState(true);
  const [gallerySaving, setGallerySaving] = useState(false);
  const [videoSaving, setVideoSaving] = useState(false);
  const [productSaving, setProductSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [galleryError, setGalleryError] = useState<string | null>(null);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [productError, setProductError] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<GalleryItem | null>(null);
  const [deleteVideoTarget, setDeleteVideoTarget] = useState<VideoItem | null>(null);
  const [galleryForm, setGalleryForm] = useState({
    title: '',
    category: '',
    src: '',
  });
  const [productForm, setProductForm] = useState<ProductPayload>({
    name: '',
    display_order: 1,
    is_active: 1,
    variants: [{ title: '', image: '', description: '', display_order: 1, is_active: 1 }],
  });
  const [videoSrc, setVideoSrc] = useState('');

  const inquiryTypeLabels: Record<string, string> = {
    sales: 'Sales & Dealership',
    product: 'Product Information',
    support: 'Agronomy Support',
    other: 'Other',
  };

  const formatDate = (value: string) => {
    const date = new Date(value);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await fetch(getApiUrl('/api/contacts'));
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      setContacts(data);
      setError(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const fetchGallery = async () => {
    setGalleryLoading(true);
    try {
      const items = await getGalleryItems();
      setGalleryItems(items);
      setGalleryError(null);
    } catch (err: unknown) {
      setGalleryError(err instanceof Error ? err.message : 'Unable to load gallery items.');
    } finally {
      setGalleryLoading(false);
    }
  };

  const fetchVideos = async () => {
    setVideoLoading(true);
    try {
      const items = await getVideoItems();
      setVideoItems(items);
      setVideoError(null);
    } catch (err: unknown) {
      setVideoError(err instanceof Error ? err.message : 'Unable to load videos.');
    } finally {
      setVideoLoading(false);
    }
  };

  const fetchProducts = async () => {
    setProductLoading(true);
    try {
      const items = await getProductItems();
      setProductItems(items);
      setProductError(null);
    } catch (err: unknown) {
      setProductError(err instanceof Error ? err.message : 'Unable to load products.');
    } finally {
      setProductLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
    fetchGallery();
    fetchVideos();
    fetchProducts();
  }, []);

  const filteredContacts =
    filter === 'all' ? contacts : contacts.filter((contact) => contact.inquiry_type === filter);

  const handleGalleryFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGalleryError(null);
    setGalleryForm({
      ...galleryForm,
      [e.target.name]: e.target.value,
    });
  };

  const addGalleryItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setGalleryError(null);

    if (!galleryForm.title.trim() || !galleryForm.category.trim() || !galleryForm.src.trim()) {
      setGalleryError('Please add title, category, and image before saving.');
      return;
    }

    setGallerySaving(true);
    try {
      const createdItem = await createGalleryItem({
        title: galleryForm.title.trim(),
        category: galleryForm.category.trim(),
        src: galleryForm.src.trim(),
      });

      if (createdItem) {
        setGalleryItems((prev) => [createdItem, ...prev]);
      } else {
        await fetchGallery();
      }

      setGalleryForm({ title: '', category: '', src: '' });
      setIsGalleryModalOpen(false);
    } catch (err: unknown) {
      setGalleryError(err instanceof Error ? err.message : 'Unable to save gallery item.');
    } finally {
      setGallerySaving(false);
    }
  };

  const deleteGalleryItem = async () => {
    if (!deleteTarget) {
      return;
    }

    try {
      await removeGalleryItem(deleteTarget.id);
      setGalleryItems((prev) => prev.filter((item) => item.id !== deleteTarget.id));
      setDeleteTarget(null);
      setGalleryError(null);
    } catch (err: unknown) {
      setGalleryError(err instanceof Error ? err.message : 'Unable to delete gallery item.');
    }
  };

  const addVideoItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setVideoError(null);

    if (!videoSrc.trim()) {
      setVideoError('Please add a video URL before saving.');
      return;
    }

    setVideoSaving(true);
    try {
      const createdItem = await createVideoItem(videoSrc.trim());

      if (createdItem) {
        setVideoItems((prev) => [createdItem, ...prev]);
      } else {
        await fetchVideos();
      }

      setVideoSrc('');
      setIsVideoModalOpen(false);
    } catch (err: unknown) {
      setVideoError(err instanceof Error ? err.message : 'Unable to save video.');
    } finally {
      setVideoSaving(false);
    }
  };

  const buildProductPayloadFromItem = (
    item: ProductItem,
    overrides?: Partial<ProductPayload>
  ): ProductPayload => ({
    name: overrides?.name ?? item.name,
    display_order: overrides?.display_order ?? item.displayOrder,
    is_active: overrides?.is_active ?? (item.isActive ? 1 : 0),
    variants:
      overrides?.variants ??
      item.variants.map((variant) => ({
        id: variant.id,
        title: variant.title,
        image: variant.image,
        description: variant.description,
        display_order: variant.displayOrder,
        is_active: variant.isActive ? 1 : 0,
      })),
  });

  const addProductItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setProductError(null);

    if (!productForm.name.trim()) {
      setProductError('Please add product name before saving.');
      return;
    }

    const cleanedVariants = productForm.variants.map((variant) => ({
      id: variant.id,
      title: variant.title.trim(),
      image: variant.image.trim(),
      description: variant.description.trim(),
      display_order: Number(variant.display_order) || 0,
      is_active: variant.is_active,
    }));

    if (cleanedVariants.length === 0 || cleanedVariants.some((variant) => !variant.title || !variant.image || !variant.description)) {
      setProductError('Please complete each variant title, image, and description before saving.');
      return;
    }

    setProductSaving(true);
    try {
      const payload = {
        name: productForm.name.trim(),
        display_order: Number(productForm.display_order) || 0,
        is_active: productForm.is_active,
        variants: cleanedVariants,
      };

      if (editingProduct) {
        const updatedItem = await updateProductItem(editingProduct.id, payload);

        if (updatedItem) {
          setProductItems((prev) =>
            prev.map((item) => (item.id === editingProduct.id ? updatedItem : item))
          );
        } else {
          await fetchProducts();
        }
      } else {
        const createdItem = await createProductItem(payload);

        if (createdItem) {
          setProductItems((prev) => [createdItem, ...prev]);
        } else {
          await fetchProducts();
        }
      }

      setProductForm({
        name: '',
        display_order: 1,
        is_active: 1,
        variants: [{ title: '', image: '', description: '', display_order: 1, is_active: 1 }],
      });
      setEditingProduct(null);
      setIsProductModalOpen(false);
    } catch (err: unknown) {
      setProductError(err instanceof Error ? err.message : editingProduct ? 'Unable to update product.' : 'Unable to save product.');
    } finally {
      setProductSaving(false);
    }
  };

  const updateProductVisibility = async (item: ProductItem, isActive: boolean) => {
    try {
      const updatedItem = await updateProductItem(
        item.id,
        buildProductPayloadFromItem(item, { is_active: isActive ? 1 : 0 })
      );

      if (updatedItem) {
        setProductItems((prev) => prev.map((entry) => (entry.id === item.id ? updatedItem : entry)));
      } else {
        await fetchProducts();
      }

      setProductError(null);
    } catch (err: unknown) {
      setProductError(err instanceof Error ? err.message : 'Unable to update product visibility.');
    }
  };

  const updateProductOrder = async (item: ProductItem, displayOrder: number) => {
    try {
      const updatedItem = await updateProductItem(
        item.id,
        buildProductPayloadFromItem(item, { display_order: displayOrder })
      );

      if (updatedItem) {
        setProductItems((prev) => prev.map((entry) => (entry.id === item.id ? updatedItem : entry)));
      } else {
        await fetchProducts();
      }

      setProductError(null);
    } catch (err: unknown) {
      setProductError(err instanceof Error ? err.message : 'Unable to update product order.');
    }
  };

  const deleteVideoItem = async () => {
    if (!deleteVideoTarget) {
      return;
    }

    try {
      await removeVideoItem(deleteVideoTarget.id);
      setVideoItems((prev) => prev.filter((item) => item.id !== deleteVideoTarget.id));
      setDeleteVideoTarget(null);
      setVideoError(null);
    } catch (err: unknown) {
      setVideoError(err instanceof Error ? err.message : 'Unable to delete video.');
    }
  };

  const downloadCSV = () => {
    const headers = ['ID', 'Name', 'Phone', 'Email', 'Company', 'City', 'Inquiry Type', 'Message', 'Date'];
    const csvContent = [
      headers.join(','),
      ...filteredContacts.map((contact) =>
        [
          contact.id,
          `"${contact.name}"`,
          `"${contact.phone}"`,
          `"${contact.email}"`,
          `"${contact.company}"`,
          `"${contact.city}"`,
          `"${inquiryTypeLabels[contact.inquiry_type] || 'Other'}"`,
          `"${contact.message.replace(/"/g, '""')}"`,
          `"${formatDate(contact.created_at)} ${new Date(contact.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}"`,
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `contacts_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getInquiryBadge = (type: string) => {
    const colors: Record<string, string> = {
      sales: 'bg-blue-100 text-blue-700 border-blue-200',
      product: 'bg-[#F26A21]/10 text-[#F26A21] border-[#F26A21]/20',
      support: 'bg-[#005948]/10 text-[#005948] border-[#005948]/20',
      other: 'bg-gray-100 text-gray-700 border-gray-200',
    };
    const color = colors[type] || colors.other;

    return (
      <span className={`inline-flex min-w-[140px] items-center justify-center rounded-full border px-3 py-2 text-[12px] font-medium leading-none whitespace-nowrap ${color}`}>
        {inquiryTypeLabels[type] || inquiryTypeLabels.other}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-[#1E293B]">
      <div className="grid min-h-screen xl:grid-cols-[280px_minmax(0,1fr)]">
        <AdminSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          contactsCount={contacts.length}
          galleryCount={galleryItems.length}
          videosCount={videoItems.length}
          productsCount={productItems.length}
        />

        <main className="p-4 md:p-6 xl:px-10 xl:py-10">
          <div className="mx-auto w-full max-w-[1240px]">
            <div className="mb-6 rounded-[10px] border border-[#DDE7E3] bg-white/90 p-5 md:p-6">
              <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h1 className="text-3xl font-bold tracking-[-0.02em] text-[#12263F] md:text-4xl">Admin Dashboard</h1>
                    <span className="rounded-full bg-[#005948] px-3 py-1 text-sm font-semibold text-white">
                      {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
                    </span>
                  </div>
                  <p className="mt-3 max-w-xl text-[15px] leading-7 text-[#5B6B82]">
                    Manage incoming inquiries, review lead quality, and update gallery, videos, and product content that appears on the public website.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {(activeSection === 'overview' || activeSection === 'contacts') && (
                    <>
                      <button
                        onClick={downloadCSV}
                        className="flex items-center gap-2 rounded-[10px] bg-[#F26A21] px-4 py-3 font-medium text-white shadow-sm transition-colors hover:bg-[#e05a12]"
                      >
                        <Download size={18} />
                        Export CSV
                      </button>
                      <button
                        onClick={fetchContacts}
                        className="flex items-center gap-2 rounded-[10px] border border-[#D9E2EC] bg-white px-4 py-3 font-medium text-[#475569] transition-colors hover:bg-gray-50"
                      >
                        <RefreshCcw size={18} className={loading ? 'animate-spin' : ''} />
                        Refresh
                      </button>
                    </>
                  )}

                  {activeSection === 'contacts' && (
                    <div className="relative">
                      <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="appearance-none rounded-[10px] border border-[#D9E2EC] bg-white py-3 pl-10 pr-10 font-medium text-[#475569] focus:outline-none focus:ring-2 focus:ring-[#005948]/20"
                      >
                        <option value="all">All Inquiries</option>
                        <option value="sales">Sales & Dealership</option>
                        <option value="product">Product Info</option>
                        <option value="support">Agronomy Support</option>
                        <option value="other">Other</option>
                      </select>
                      <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={18} />
                      <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-[#94A3B8]" size={16} />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {(activeSection === 'overview' || activeSection === 'contacts') && (
              <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-[10px] border border-[#DDE7E3] bg-white p-6">
                  <p className="text-sm font-medium text-[#64748B]">Total Inquiries</p>
                  <p className="mt-3 text-4xl font-bold text-[#12263F]">{contacts.length}</p>
                  <div className="mt-4 h-1.5 w-16 rounded-full bg-[#005948]"></div>
                </div>
                <div className="rounded-[10px] border border-[#E1E7FF] bg-white p-6">
                  <p className="text-sm font-medium text-[#64748B]">Sales Leads</p>
                  <p className="mt-3 text-4xl font-bold text-blue-600">{contacts.filter((contact) => contact.inquiry_type === 'sales').length}</p>
                  <div className="mt-4 h-1.5 w-16 rounded-full bg-blue-600"></div>
                </div>
                <div className="rounded-[10px] border border-[#FFE6D7] bg-white p-6">
                  <p className="text-sm font-medium text-[#64748B]">Product Inquiries</p>
                  <p className="mt-3 text-4xl font-bold text-[#F26A21]">{contacts.filter((contact) => contact.inquiry_type === 'product').length}</p>
                  <div className="mt-4 h-1.5 w-16 rounded-full bg-[#F26A21]"></div>
                </div>
                <div className="rounded-[10px] border border-[#DDE7E3] bg-white p-6">
                  <p className="text-sm font-medium text-[#64748B]">Support Requests</p>
                  <p className="mt-3 text-4xl font-bold text-[#005948]">{contacts.filter((contact) => contact.inquiry_type === 'support').length}</p>
                  <div className="mt-4 h-1.5 w-16 rounded-full bg-[#005948]"></div>
                </div>
              </div>
            )}

            {activeSection === 'overview' && (
              <AdminOverview
                contacts={contacts}
                galleryItems={galleryItems}
                formatDate={formatDate}
                getInquiryBadge={getInquiryBadge}
              />
            )}

            {activeSection === 'contacts' && (
              <AdminContactsSection
                error={error}
                loading={loading}
                contacts={contacts}
                filteredContacts={filteredContacts}
                formatDate={formatDate}
                getInquiryBadge={getInquiryBadge}
                onRetry={fetchContacts}
              />
            )}

            {activeSection === 'gallery' && (
              <AdminGallerySection
                galleryItems={galleryItems}
                galleryForm={galleryForm}
                isAddModalOpen={isGalleryModalOpen}
                deleteTarget={deleteTarget}
                galleryError={galleryError}
                isLoading={galleryLoading}
                isSaving={gallerySaving}
                onFieldChange={handleGalleryFieldChange}
                onSubmit={addGalleryItem}
                onRequestDelete={setDeleteTarget}
                onConfirmDelete={deleteGalleryItem}
                onOpenModal={() => setIsGalleryModalOpen(true)}
                onCloseModal={() => {
                  setIsGalleryModalOpen(false);
                  setGalleryError(null);
                  setGalleryForm({ title: '', category: '', src: '' });
                }}
                onCloseDeleteModal={() => setDeleteTarget(null)}
              />
            )}

            {activeSection === 'videos' && (
              <AdminVideosSection
                videoItems={videoItems}
                videoSrc={videoSrc}
                videoError={videoError}
                isAddModalOpen={isVideoModalOpen}
                deleteTarget={deleteVideoTarget}
                isLoading={videoLoading}
                isSaving={videoSaving}
                onUrlChange={(e) => {
                  setVideoError(null);
                  setVideoSrc(toVideoEmbedUrl(e.target.value));
                }}
                onSubmit={addVideoItem}
                onOpenModal={() => setIsVideoModalOpen(true)}
                onCloseModal={() => {
                  setIsVideoModalOpen(false);
                  setVideoError(null);
                  setVideoSrc('');
                }}
                onRequestDelete={setDeleteVideoTarget}
                onConfirmDelete={deleteVideoItem}
                onCloseDeleteModal={() => setDeleteVideoTarget(null)}
              />
            )}

            {activeSection === 'products' && (
              <AdminProductsSection
                productItems={productItems}
                productForm={productForm}
                isAddModalOpen={isProductModalOpen}
                productError={productError}
                isLoading={productLoading}
                isSaving={productSaving}
                onProductNameChange={(value) => {
                  setProductError(null);
                  setProductForm((prev) => ({ ...prev, name: value }));
                }}
                onProductOrderChange={(value) => {
                  setProductError(null);
                  setProductForm((prev) => ({ ...prev, display_order: value }));
                }}
                onProductStatusToggle={() => {
                  setProductError(null);
                  setProductForm((prev) => ({ ...prev, is_active: prev.is_active === 1 ? 0 : 1 }));
                }}
                onVariantFieldChange={(index, field, value) => {
                  setProductError(null);
                  setProductForm((prev) => ({
                    ...prev,
                    variants: prev.variants.map((variant, variantIndex) =>
                      variantIndex === index ? { ...variant, [field]: value } : variant
                    ),
                  }));
                }}
                onAddVariant={() => {
                  setProductError(null);
                  setProductForm((prev) => ({
                    ...prev,
                    variants: [
                      ...prev.variants,
                      {
                        title: '',
                        image: '',
                        description: '',
                        display_order: prev.variants.length + 1,
                        is_active: 1,
                      },
                    ],
                  }));
                }}
                onRemoveVariant={(index) => {
                  setProductError(null);
                  setProductForm((prev) => ({
                    ...prev,
                    variants: prev.variants.filter((_, variantIndex) => variantIndex !== index),
                  }));
                }}
                onSubmit={addProductItem}
                onRequestEdit={(item) => {
                  setProductError(null);
                  setEditingProduct(item);
                  setProductForm({
                    name: item.name,
                    variants: item.variants.length > 0
                      ? item.variants.map((variant) => ({
                          title: variant.title,
                          image: variant.image,
                          description: variant.description,
                          display_order: variant.displayOrder,
                          is_active: variant.isActive ? 1 : 0,
                          id: variant.id,
                        }))
                      : [{ title: '', image: '', description: '', display_order: 1, is_active: 1 }],
                    display_order: item.displayOrder,
                    is_active: item.isActive ? 1 : 0,
                  });
                  setIsProductModalOpen(true);
                }}
                onRequestStatusChange={updateProductVisibility}
                onQuickOrderSave={updateProductOrder}
                onOpenModal={() => {
                  setEditingProduct(null);
                  setProductError(null);
                  setProductForm({
                    name: '',
                    display_order: 1,
                    is_active: 1,
                    variants: [{ title: '', image: '', description: '', display_order: 1, is_active: 1 }],
                  });
                  setIsProductModalOpen(true);
                }}
                onCloseModal={() => {
                  setIsProductModalOpen(false);
                  setEditingProduct(null);
                  setProductError(null);
                  setProductForm({
                    name: '',
                    display_order: 1,
                    is_active: 1,
                    variants: [{ title: '', image: '', description: '', display_order: 1, is_active: 1 }],
                  });
                }}
                isEditing={Boolean(editingProduct)}
              />
            )}

            <div className="mt-8 text-center text-sm text-[#94A3B8]">
              <p>&copy; {new Date().getFullYear()} DRD Plantech LLP - Admin Portal</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
