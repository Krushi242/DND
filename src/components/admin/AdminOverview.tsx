import React from 'react';
import type { GalleryItem } from '../../utils/gallery';
import type { Contact } from './types';

interface AdminOverviewProps {
  contacts: Contact[];
  galleryItems: GalleryItem[];
  formatDate: (value: string) => string;
  getInquiryBadge: (type: string) => React.ReactNode;
}

const AdminOverview: React.FC<AdminOverviewProps> = ({
  contacts,
  galleryItems,
  formatDate,
  getInquiryBadge,
}) => {
  const recentContacts = contacts.slice(0, 3);
  const recentGalleryItems = galleryItems.slice(0, 3);

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <div className="overflow-hidden rounded-[10px] border border-[#E2E8F0] bg-white">
        <div className="border-b border-[#E2E8F0] bg-[#F8FAFC] px-6 py-5">
          <h2 className="text-xl font-semibold text-[#1E293B]">Recent Inquiries</h2>
          <p className="mt-1 text-sm text-[#64748B]">The latest submissions received from the website.</p>
        </div>
        <div className="divide-y divide-[#F1F5F9]">
          {recentContacts.map((contact) => (
            <div key={contact.id} className="flex flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between">
              <div className="min-w-0">
                <p className="truncate font-semibold text-[#1E293B]">{contact.name}</p>
                <p className="mt-1 truncate text-sm text-[#64748B]">{contact.email}</p>
                <p className="mt-1 truncate text-sm text-[#64748B]">{contact.company} · {contact.city}</p>
              </div>
              <div className="flex flex-col items-start gap-2 md:items-end">
                {getInquiryBadge(contact.inquiry_type)}
                <span className="text-sm text-[#64748B]">{formatDate(contact.created_at)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-[10px] border border-[#E2E8F0] bg-white p-6">
          <h2 className="text-xl font-semibold text-[#1E293B]">Pipeline Snapshot</h2>
          <div className="mt-5 space-y-4">
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-[#64748B]">Sales & Dealership</span>
                <span className="font-semibold text-[#1E293B]">{contacts.filter((c) => c.inquiry_type === 'sales').length}</span>
              </div>
              <div className="h-2 rounded-full bg-[#E9EEF5]">
                <div className="h-2 rounded-full bg-blue-600" style={{ width: `${contacts.length ? (contacts.filter((c) => c.inquiry_type === 'sales').length / contacts.length) * 100 : 0}%` }}></div>
              </div>
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-[#64748B]">Product Information</span>
                <span className="font-semibold text-[#1E293B]">{contacts.filter((c) => c.inquiry_type === 'product').length}</span>
              </div>
              <div className="h-2 rounded-full bg-[#E9EEF5]">
                <div className="h-2 rounded-full bg-[#F26A21]" style={{ width: `${contacts.length ? (contacts.filter((c) => c.inquiry_type === 'product').length / contacts.length) * 100 : 0}%` }}></div>
              </div>
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-[#64748B]">Agronomy Support</span>
                <span className="font-semibold text-[#1E293B]">{contacts.filter((c) => c.inquiry_type === 'support').length}</span>
              </div>
              <div className="h-2 rounded-full bg-[#E9EEF5]">
                <div className="h-2 rounded-full bg-[#005948]" style={{ width: `${contacts.length ? (contacts.filter((c) => c.inquiry_type === 'support').length / contacts.length) * 100 : 0}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[10px] border border-[#E2E8F0] bg-white p-6">
          <h2 className="text-xl font-semibold text-[#1E293B]">Gallery Preview</h2>
          <p className="mt-1 text-sm text-[#64748B]">Latest media entries configured for the public gallery.</p>
          <div className="mt-5 grid grid-cols-3 gap-3">
            {recentGalleryItems.map((item) => (
              <div key={item.id} className="overflow-hidden rounded-[10px] border border-[#E2E8F0]">
                <div className="aspect-square bg-[#E2E8F0]">
                  <img src={item.src} alt={item.title} className="h-full w-full object-cover" />
                </div>
                <div className="p-3">
                  <p className="truncate text-sm font-semibold text-[#1E293B]">{item.title}</p>
                  <p className="mt-1 truncate text-xs text-[#64748B]">{item.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
