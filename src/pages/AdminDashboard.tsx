import React, { useEffect, useState } from 'react';
import { ChevronRight, Download, Filter, RefreshCcw } from 'lucide-react';
import AdminContactsSection from '../components/admin/AdminContactsSection';
import AdminGallerySection from '../components/admin/AdminGallerySection';
import AdminOverview from '../components/admin/AdminOverview';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminVideosSection from '../components/admin/AdminVideosSection';
import type { AdminSection, Contact } from '../components/admin/types';
import { getApiUrl } from '../utils/api';
import { createGalleryItem, getGalleryItems, removeGalleryItem } from '../utils/gallery';
import type { GalleryItem } from '../utils/gallery';
import { createVideoItem, getVideoItems, removeVideoItem } from '../utils/videos';
import type { VideoItem } from '../utils/videos';

const optimizeGalleryImage = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      const maxSize = 1600;
      const scale = Math.min(maxSize / image.width, maxSize / image.height, 1);
      const width = Math.round(image.width * scale);
      const height = Math.round(image.height * scale);
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      canvas.width = width;
      canvas.height = height;

      if (!context) {
        URL.revokeObjectURL(objectUrl);
        reject(new Error('Unable to prepare image preview.'));
        return;
      }

      context.fillStyle = '#ffffff';
      context.fillRect(0, 0, width, height);
      context.drawImage(image, 0, 0, width, height);

      const optimized = canvas.toDataURL('image/webp', 0.82);
      URL.revokeObjectURL(objectUrl);
      resolve(optimized);
    };

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Selected image could not be processed.'));
    };

    image.src = objectUrl;
  });

const AdminDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AdminSection>('overview');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [videoItems, setVideoItems] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [galleryError, setGalleryError] = useState<string | null>(null);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<GalleryItem | null>(null);
  const [deleteVideoTarget, setDeleteVideoTarget] = useState<VideoItem | null>(null);
  const [galleryForm, setGalleryForm] = useState({
    title: '',
    category: '',
    src: '',
  });
  const [videoSrc, setVideoSrc] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);

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
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchGallery = async () => {
    try {
      const items = await getGalleryItems();
      setGalleryItems(items);
      setGalleryError(null);
    } catch (err: any) {
      setGalleryError(err.message || 'Unable to load gallery items.');
    }
  };

  const fetchVideos = async () => {
    try {
      const items = await getVideoItems();
      setVideoItems(items);
      setVideoError(null);
    } catch (err: any) {
      setVideoError(err.message || 'Unable to load videos.');
    }
  };

  useEffect(() => {
    fetchContacts();
    fetchGallery();
    fetchVideos();
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

  const handleGalleryFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    setGalleryError(null);

    try {
      const optimizedImage = await optimizeGalleryImage(file);
      setGalleryForm((prev) => ({
        ...prev,
        src: optimizedImage,
      }));
    } catch (err: any) {
      setGalleryError(err.message || 'Unable to read the selected image.');
    }
  };

  const addGalleryItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setGalleryError(null);

    if (!galleryForm.title.trim() || !galleryForm.category.trim() || !galleryForm.src.trim()) {
      setGalleryError('Please add title, category, and image before saving.');
      return;
    }

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
    } catch (err: any) {
      setGalleryError(err.message || 'Unable to save gallery item.');
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
    } catch (err: any) {
      setGalleryError(err.message || 'Unable to delete gallery item.');
    }
  };

  const addVideoItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setVideoError(null);

    if (!videoFile) {
      setVideoError('Please choose a video before saving.');
      return;
    }

    try {
      const createdItem = await createVideoItem(videoFile);

      if (createdItem) {
        setVideoItems((prev) => [createdItem, ...prev]);
      } else {
        await fetchVideos();
      }

      if (videoSrc) {
        URL.revokeObjectURL(videoSrc);
      }
      setVideoSrc('');
      setVideoFile(null);
      setIsVideoModalOpen(false);
    } catch (err: any) {
      setVideoError(err.message || 'Unable to save video.');
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
    } catch (err: any) {
      setVideoError(err.message || 'Unable to delete video.');
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
                    Manage incoming inquiries, review lead quality, and update gallery and video content that appears on the public website.
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
                onFieldChange={handleGalleryFieldChange}
                onFileChange={handleGalleryFileChange}
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
                onFileChange={async (e) => {
                  const file = e.target.files?.[0];

                  if (!file) {
                    return;
                  }

                  setVideoError(null);

                  try {
                    if (videoSrc) {
                      URL.revokeObjectURL(videoSrc);
                    }

                    const nextVideoSrc = URL.createObjectURL(file);
                    setVideoFile(file);
                    setVideoSrc(nextVideoSrc);
                  } catch (err: any) {
                    setVideoError(err.message || 'Unable to read the selected video.');
                  }
                }}
                onSubmit={addVideoItem}
                onOpenModal={() => setIsVideoModalOpen(true)}
                onCloseModal={() => {
                  if (videoSrc) {
                    URL.revokeObjectURL(videoSrc);
                  }
                  setIsVideoModalOpen(false);
                  setVideoError(null);
                  setVideoSrc('');
                  setVideoFile(null);
                }}
                onRequestDelete={setDeleteVideoTarget}
                onConfirmDelete={deleteVideoItem}
                onCloseDeleteModal={() => setDeleteVideoTarget(null)}
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
