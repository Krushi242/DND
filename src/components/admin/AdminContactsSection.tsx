import React from 'react';
import { Building2, Calendar, Mail, MapPin, MessageSquare, Phone } from 'lucide-react';
import type { Contact } from './types';

interface AdminContactsSectionProps {
  error: string | null;
  loading: boolean;
  contacts: Contact[];
  filteredContacts: Contact[];
  formatDate: (value: string) => string;
  getInquiryBadge: (type: string) => React.ReactNode;
  onRetry: () => void;
}

const AdminContactsSection: React.FC<AdminContactsSectionProps> = ({
  error,
  loading,
  contacts,
  filteredContacts,
  formatDate,
  getInquiryBadge,
  onRetry,
}) => {
  return (
    <div className="overflow-hidden rounded-[10px] border border-[#E2E8F0]">
      {error && (
        <div className="bg-red-50 p-8 text-center">
          <p className="font-medium text-red-600">Error: {error}</p>
          <button onClick={onRetry} className="mt-4 rounded-[10px] bg-red-600 px-6 py-2 text-white transition hover:bg-red-700">
            Try Again
          </button>
        </div>
      )}

      {!error && loading && contacts.length === 0 ? (
        <div className="flex flex-col items-center justify-center space-y-4 p-20">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-[#005948]"></div>
          <p className="text-[#64748B]">Loading contact submissions...</p>
        </div>
      ) : !error && filteredContacts.length === 0 ? (
        <div className="p-20 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <MessageSquare className="text-gray-400" size={32} />
          </div>
          <h3 className="text-lg font-semibold text-[#1E293B]">No inquiries found</h3>
          <p className="text-[#64748B]">No submissions match your current filter.</p>
        </div>
      ) : (
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200">
          <div className="min-w-[1000px] md:min-w-0">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC]">
                  <th className="px-6 py-4 text-[13px] font-semibold uppercase tracking-wider text-[#475569]">Contact Info</th>
                  <th className="px-6 py-4 text-[13px] font-semibold uppercase tracking-wider text-[#475569]">Details</th>
                  <th className="w-[180px] px-6 py-4 text-[13px] font-semibold uppercase tracking-wider text-[#475569]">Type</th>
                  <th className="px-6 py-4 text-[13px] font-semibold uppercase tracking-wider text-[#475569]">Message</th>
                  <th className="px-6 py-4 text-right text-[13px] font-semibold uppercase tracking-wider text-[#475569]">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {filteredContacts.map((contact) => (
                  <tr key={contact.id} className="group transition-colors hover:bg-[#F8FAFC]">
                    <td className="px-6 py-5 align-top">
                      <div className="mb-2 flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#005948]/10 font-bold text-[#005948]">
                          {contact.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="whitespace-nowrap font-semibold text-[#1E293B]">{contact.name}</span>
                      </div>
                      <div className="ml-12 flex flex-col gap-1.5">
                        <a href={`mailto:${contact.email}`} className="flex items-center gap-2 text-sm text-[#64748B] hover:text-[#005948]">
                          <Mail size={14} /> {contact.email}
                        </a>
                        <a href={`tel:${contact.phone}`} className="flex items-center gap-2 text-sm text-[#64748B] hover:text-[#005948]">
                          <Phone size={14} /> {contact.phone}
                        </a>
                      </div>
                    </td>
                    <td className="px-6 py-5 align-top">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2 text-sm font-medium text-[#334155]">
                          <Building2 size={14} className="text-[#94A3B8]" /> {contact.company}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[#64748B]">
                          <MapPin size={14} className="text-[#94A3B8]" /> {contact.city}
                        </div>
                      </div>
                    </td>
                    <td className="w-[180px] px-6 py-5 align-top">{getInquiryBadge(contact.inquiry_type)}</td>
                    <td className="max-w-md px-6 py-5 align-top">
                      <div className="relative break-all rounded-[10px] bg-[#F1F5F9] p-3 text-sm text-[#475569]">
                        <MessageSquare size={14} className="absolute -left-2 -top-2 rounded-full bg-white p-0.5 text-[#64748B] shadow-sm" />
                        {contact.message}
                      </div>
                    </td>
                    <td className="px-6 py-5 align-top text-right">
                      <div className="flex flex-col items-end gap-1">
                        <div className="flex items-center gap-1.5 text-[13px] font-medium text-[#1E293B]">
                          <Calendar size={14} className="text-[#94A3B8]" /> {formatDate(contact.created_at)}
                        </div>
                        <span className="text-[12px] text-[#94A3B8]">
                          {new Date(contact.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContactsSection;
