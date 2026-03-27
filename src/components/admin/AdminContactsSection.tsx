import React, { useMemo, useState } from 'react';
import { Building2, Calendar, ChevronRight, Mail, MapPin, MessageSquare, Phone, X } from 'lucide-react';
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
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const contactDetailRows = useMemo(() => {
    if (!selectedContact) {
      return [];
    }

    return [
      { label: 'Name', value: selectedContact.name },
      { label: 'Email', value: selectedContact.email },
      { label: 'Phone', value: selectedContact.phone },
      { label: 'Company', value: selectedContact.company || '-' },
      { label: 'City', value: selectedContact.city || '-' },
      { label: 'Inquiry Type', value: getInquiryBadge(selectedContact.inquiry_type) },
      { label: 'Date', value: formatDate(selectedContact.created_at) },
      {
        label: 'Time',
        value: new Date(selectedContact.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
      { label: 'Message', value: selectedContact.message || '-' },
    ];
  }, [formatDate, getInquiryBadge, selectedContact]);

  return (
    <>
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
        <>
        <div className="divide-y divide-[#E2E8F0] md:hidden">
          {filteredContacts.map((contact) => (
            <button
              key={contact.id}
              type="button"
              onClick={() => setSelectedContact(contact)}
              className="w-full bg-white px-5 py-4 text-left transition-colors hover:bg-[#F8FAFC]"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#005948]/10 font-bold text-[#005948]">
                  {contact.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-base font-semibold text-[#1E293B]">{contact.name}</p>
                      <p className="mt-1 truncate text-sm text-[#64748B]">{contact.email}</p>
                    </div>
                    <ChevronRight size={18} className="mt-1 shrink-0 text-[#94A3B8]" />
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {getInquiryBadge(contact.inquiry_type)}
                    <span className="text-xs font-medium text-[#94A3B8]">
                      {formatDate(contact.created_at)}
                    </span>
                  </div>

                  <div className="mt-3 grid gap-2 text-sm text-[#475569]">
                    <div className="flex items-center gap-2">
                      <Phone size={14} className="text-[#94A3B8]" />
                      <span className="truncate">{contact.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 size={14} className="text-[#94A3B8]" />
                      <span className="truncate">{contact.company || '-'}</span>
                    </div>
                  </div>

                  <div className="mt-3 rounded-[10px] bg-[#F8FAFC] px-3 py-2 text-sm text-[#64748B]">
                    Tap to view full inquiry details
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="hidden overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200 md:block">
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
        </>
      )}
    </div>

    {selectedContact && (
      <div className="fixed inset-0 z-[130] flex items-center justify-center bg-[#0f172a]/60 p-4">
        <div className="flex max-h-[calc(100vh-2rem)] w-full max-w-[760px] flex-col overflow-hidden rounded-[14px] border border-[#DDE7E3] bg-white shadow-[0_30px_80px_rgba(15,23,42,0.22)]">
          <div className="flex items-start justify-between gap-4 border-b border-[#E2E8F0] px-5 py-4 md:px-6">
            <div>
              <h3 className="text-xl font-semibold text-[#1E293B]">Contact Details</h3>
              <p className="mt-1 text-sm text-[#64748B]">Full inquiry information for mobile-friendly viewing.</p>
            </div>
            <button
              type="button"
              onClick={() => setSelectedContact(null)}
              className="rounded-full p-2 text-[#64748B] transition-colors hover:bg-[#F1F5F9] hover:text-[#1E293B]"
            >
              <X size={18} />
            </button>
          </div>

          <div className="overflow-y-auto p-5 md:p-6">
            <div className="overflow-hidden rounded-[12px] border border-[#E2E8F0]">
              <table className="w-full border-collapse text-left">
                <tbody className="divide-y divide-[#E2E8F0]">
                  {contactDetailRows.map((row) => (
                    <tr key={row.label} className="align-top">
                      <th className="w-[34%] bg-[#F8FAFC] px-4 py-3 text-sm font-semibold text-[#334155] md:px-5">
                        {row.label}
                      </th>
                      <td className="px-4 py-3 text-sm text-[#475569] md:px-5">
                        {row.label === 'Email' ? (
                          <a href={`mailto:${selectedContact.email}`} className="break-all text-[#0B5E52] hover:underline">
                            {selectedContact.email}
                          </a>
                        ) : row.label === 'Phone' ? (
                          <a href={`tel:${selectedContact.phone}`} className="text-[#0B5E52] hover:underline">
                            {selectedContact.phone}
                          </a>
                        ) : row.label === 'Message' ? (
                          <div className="whitespace-pre-wrap break-words leading-6">{selectedContact.message}</div>
                        ) : (
                          row.value
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default AdminContactsSection;
