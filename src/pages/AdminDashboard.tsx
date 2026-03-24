import React, { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, Building2, MessageSquare, Calendar, RefreshCcw, Filter, ChevronRight } from 'lucide-react';

interface Contact {
  id: number;
  name: string;
  phone: string;
  email: string;
  company: string;
  city: string;
  inquiry_type: string;
  message: string;
  created_at: string;
}

const AdminDashboard: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/contacts');
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

  useEffect(() => {
    fetchContacts();
  }, []);

  const filteredContacts = filter === 'all' 
    ? contacts 
    : contacts.filter(c => c.inquiry_type === filter);

  const getInquiryBadge = (type: string) => {
    const colors: Record<string, string> = {
      sales: 'bg-blue-100 text-blue-700 border-blue-200',
      product: 'bg-green-100 text-green-700 border-green-200',
      support: 'bg-amber-100 text-amber-700 border-amber-200',
      other: 'bg-gray-100 text-gray-700 border-gray-200'
    };
    const color = colors[type] || colors.other;
    return (
      <span className={`px-2 py-1 rounded-full text-[12px] font-medium border ${color} capitalize`}>
        {type}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#1E293B] flex items-center gap-3">
              Admin Dashboard
              <span className="text-sm font-normal bg-[#005948] text-white px-3 py-1 rounded-full">
                Contacts
              </span>
            </h1>
            <p className="text-[#64748B] mt-1">Manage and view all incoming inquiries from the contact form.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={fetchContacts}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E2E8F0] rounded-lg text-[#475569] font-medium hover:bg-gray-50 transition-colors shadow-sm"
            >
              <RefreshCcw size={18} className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
            <div className="relative">
              <select 
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="appearance-none pl-10 pr-10 py-2 bg-white border border-[#E2E8F0] rounded-lg text-[#475569] font-medium focus:outline-none focus:ring-2 focus:ring-[#005948]/20 transition-all shadow-sm"
              >
                <option value="all">All Inquiries</option>
                <option value="sales">Sales & Dealership</option>
                <option value="product">Product Info</option>
                <option value="support">Agronomy Support</option>
                <option value="other">Other</option>
              </select>
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={18} />
              <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] rotate-90" size={16} />
            </div>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm">
            <p className="text-[#64748B] text-sm font-medium mb-1">Total Inquiries</p>
            <p className="text-3xl font-bold text-[#1E293B]">{contacts.length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm">
            <p className="text-[#64748B] text-sm font-medium mb-1">Sales Leads</p>
            <p className="text-3xl font-bold text-blue-600">{contacts.filter(c => c.inquiry_type === 'sales').length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm">
            <p className="text-[#64748B] text-sm font-medium mb-1">Product Inquiries</p>
            <p className="text-3xl font-bold text-green-600">{contacts.filter(c => c.inquiry_type === 'product').length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm">
            <p className="text-[#64748B] text-sm font-medium mb-1">Support Requests</p>
            <p className="text-3xl font-bold text-amber-600">{contacts.filter(c => c.inquiry_type === 'support').length}</p>
          </div>
        </div>

        {/* Table/Content */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-md overflow-hidden">
          {error && (
            <div className="p-8 text-center bg-red-50">
              <p className="text-red-600 font-medium">Error: {error}</p>
              <button 
                onClick={fetchContacts}
                className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Try Again
              </button>
            </div>
          )}

          {!error && loading && contacts.length === 0 ? (
            <div className="p-20 flex flex-col items-center justify-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#005948]"></div>
              <p className="text-[#64748B]">Loading contact submissions...</p>
            </div>
          ) : !error && filteredContacts.length === 0 ? (
            <div className="p-20 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="text-gray-400" size={32} />
              </div>
              <h3 className="text-lg font-semibold text-[#1E293B]">No inquiries found</h3>
              <p className="text-[#64748B]">No submissions match your current filter.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                    <th className="px-6 py-4 text-[13px] font-semibold text-[#475569] uppercase tracking-wider">Contact Info</th>
                    <th className="px-6 py-4 text-[13px] font-semibold text-[#475569] uppercase tracking-wider">Details</th>
                    <th className="px-6 py-4 text-[13px] font-semibold text-[#475569] uppercase tracking-wider">Type</th>
                    <th className="px-6 py-4 text-[13px] font-semibold text-[#475569] uppercase tracking-wider">Message</th>
                    <th className="px-6 py-4 text-[13px] font-semibold text-[#475569] uppercase tracking-wider text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9]">
                  {filteredContacts.map((contact) => (
                    <tr key={contact.id} className="hover:bg-[#F8FAFC] transition-colors group">
                      <td className="px-6 py-5 align-top">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-9 h-9 rounded-full bg-[#005948]/10 text-[#005948] flex items-center justify-center font-bold">
                            {contact.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-semibold text-[#1E293B] whitespace-nowrap">{contact.name}</span>
                        </div>
                        <div className="flex flex-col gap-1.5 ml-12">
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
                          <div className="flex items-center gap-2 text-sm text-[#334155] font-medium">
                            <Building2 size={14} className="text-[#94A3B8]" /> {contact.company}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-[#64748B]">
                            <MapPin size={14} className="text-[#94A3B8]" /> {contact.city}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 align-top">
                        {getInquiryBadge(contact.inquiry_type)}
                      </td>
                      <td className="px-6 py-5 align-top max-w-md">
                        <div className="bg-[#F1F5F9] p-3 rounded-lg text-sm text-[#475569] line-clamp-3 group-hover:line-clamp-none transition-all cursor-default relative">
                          <MessageSquare size={14} className="absolute -top-2 -left-2 bg-white rounded-full p-0.5 shadow-sm text-[#64748B]" />
                          {contact.message}
                        </div>
                      </td>
                      <td className="px-6 py-5 align-top text-right">
                        <div className="flex flex-col items-end gap-1">
                          <div className="flex items-center gap-1.5 text-[13px] font-medium text-[#1E293B]">
                             <Calendar size={14} className="text-[#94A3B8]" /> {new Date(contact.created_at).toLocaleDateString()}
                          </div>
                          <span className="text-[12px] text-[#94A3B8]">{new Date(contact.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      
      {/* Footer Info */}
      <div className="mt-8 text-center text-sm text-[#94A3B8]">
        <p>&copy; {new Date().getFullYear()} DRD Plantech LLP - Admin Portal</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
