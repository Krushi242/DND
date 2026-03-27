import React from 'react';
import { Images, Plus, Trash2, X } from 'lucide-react';
import type { GalleryItem } from '../../utils/gallery';

interface AdminGallerySectionProps {
  galleryItems: GalleryItem[];
  galleryForm: {
    title: string;
    category: string;
    src: string;
  };
  isAddModalOpen: boolean;
  deleteTarget: GalleryItem | null;
  galleryError: string | null;
  onFieldChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onRequestDelete: (item: GalleryItem) => void;
  onConfirmDelete: () => void;
  onOpenModal: () => void;
  onCloseModal: () => void;
  onCloseDeleteModal: () => void;
}

const AdminGallerySection: React.FC<AdminGallerySectionProps> = ({
  galleryItems,
  galleryForm,
  isAddModalOpen,
  deleteTarget,
  galleryError,
  onFieldChange,
  onFileChange,
  onSubmit,
  onRequestDelete,
  onConfirmDelete,
  onOpenModal,
  onCloseModal,
  onCloseDeleteModal,
}) => {
  return (
    <>
      <div className="overflow-hidden rounded-[10px] border border-[#E2E8F0] bg-white">
      <div className="flex flex-col gap-3 border-b border-[#E2E8F0] bg-[#F8FAFC] px-6 py-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-semibold text-[#1E293B]">
            <Images size={20} className="text-[#005948]" />
            Gallery Manager
          </h2>
          <p className="mt-1 text-sm text-[#64748B]">Add gallery details here and they will show on the Gallery page.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex w-fit rounded-full bg-[#005948]/10 px-3 py-1 text-sm font-medium text-[#005948]">
            {galleryItems.length} Items
          </span>
          <button
            type="button"
            onClick={onOpenModal}
            className="inline-flex items-center gap-2 rounded-[10px] bg-[#F26A21] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#e05a12]"
          >
            <Plus size={16} />
            Add
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {galleryItems.length === 0 ? (
            <div className="rounded-[10px] border border-dashed border-[#CBD5E1] bg-[#F8FAFC] px-6 py-12 text-center text-[#64748B]">
              No gallery items found.
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {galleryItems.map((item) => (
                <div key={item.id} className="overflow-hidden rounded-[10px] border border-[#E2E8F0] bg-white">
                  <div className="aspect-[4/3] bg-[#F8FAFC]">
                    <img src={item.src} alt={item.title} className="h-full w-full object-contain" />
                  </div>
                  <div className="space-y-2 p-4">
                    <span className="inline-flex rounded-full bg-[#F26A21]/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-[#F26A21]">
                      {item.category}
                    </span>
                    <h3 className="text-base font-semibold text-[#1E293B]">{item.title}</h3>
                    <button
                      type="button"
                      onClick={() => onRequestDelete(item)}
                      className="inline-flex items-center gap-2 rounded-[10px] border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>

    {isAddModalOpen && (
      <div className="fixed inset-0 z-[120] flex items-center justify-center bg-[#0f172a]/55 p-4">
        <div className="w-full max-w-[560px] rounded-[10px] border border-[#DDE7E3] bg-white shadow-[0_30px_80px_rgba(15,23,42,0.22)]">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] px-6 py-5">
            <div>
              <h3 className="text-xl font-semibold text-[#1E293B]">Add Gallery Item</h3>
              <p className="mt-1 text-sm text-[#64748B]">Upload an image directly from your device.</p>
            </div>
            <button
              type="button"
              onClick={onCloseModal}
              className="rounded-full p-2 text-[#64748B] transition-colors hover:bg-[#F1F5F9] hover:text-[#1E293B]"
            >
              <X size={18} />
            </button>
          </div>

          <form onSubmit={onSubmit} className="space-y-4 p-6">
            <div>
              <label htmlFor="gallery-title" className="mb-2 block text-sm font-medium text-[#334155]">Title</label>
              <input
                id="gallery-title"
                name="title"
                type="text"
                value={galleryForm.title}
                onChange={onFieldChange}
                className="w-full rounded-[10px] border border-[#CBD5E1] bg-white px-4 py-3 text-sm text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#005948]/20"
                placeholder="French Beans"
              />
            </div>

            <div>
              <label htmlFor="gallery-category" className="mb-2 block text-sm font-medium text-[#334155]">Category</label>
              <input
                id="gallery-category"
                name="category"
                type="text"
                value={galleryForm.category}
                onChange={onFieldChange}
                className="w-full rounded-[10px] border border-[#CBD5E1] bg-white px-4 py-3 text-sm text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#005948]/20"
                placeholder="Vegetable"
              />
            </div>

            <div>
              <label htmlFor="gallery-file" className="mb-2 block text-sm font-medium text-[#334155]">Choose Image</label>
              <input
                id="gallery-file"
                type="file"
                accept="image/*"
                onChange={onFileChange}
                className="w-full rounded-[10px] border border-[#CBD5E1] bg-white px-4 py-3 text-sm text-[#1E293B] file:mr-3 file:rounded-[10px] file:border-0 file:bg-[#005948] file:px-3 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-[#00483f]"
              />
            </div>

            {galleryError && (
              <div className="rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {galleryError}
              </div>
            )}

            {galleryForm.src && (
              <div className="overflow-hidden rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC]">
                <div className="aspect-[4/3] bg-[#F8FAFC] p-3">
                  <img src={galleryForm.src} alt={galleryForm.title || 'Selected gallery preview'} className="h-full w-full object-contain" />
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onCloseModal}
                className="rounded-[10px] border border-[#D9E2EC] bg-white px-4 py-3 text-sm font-medium text-[#475569] transition-colors hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-[10px] bg-[#F26A21] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#e05a12]"
              >
                <Plus size={16} />
                Add To Gallery
              </button>
            </div>
          </form>
        </div>
      </div>
    )}

    {deleteTarget && (
      <div className="fixed inset-0 z-[125] flex items-center justify-center bg-[#0f172a]/60 p-4">
        <div className="w-full max-w-[420px] rounded-[10px] border border-[#DDE7E3] bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.22)]">
          <h3 className="text-xl font-semibold text-[#1E293B]">Delete Gallery Item?</h3>
          <p className="mt-2 text-sm leading-6 text-[#64748B]">
            This will remove <span className="font-semibold text-[#1E293B]">{deleteTarget.title}</span> from the gallery. Please confirm before deleting.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
            <button
              type="button"
              onClick={onCloseDeleteModal}
              className="rounded-[10px] border border-[#D9E2EC] bg-white px-4 py-3 text-sm font-medium text-[#475569] transition-colors hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirmDelete}
              className="inline-flex items-center gap-2 rounded-[10px] bg-red-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default AdminGallerySection;
