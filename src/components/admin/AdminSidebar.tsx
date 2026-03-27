import React from 'react';
import { ExternalLink, FolderKanban, Inbox, LayoutDashboard, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';
import type { AdminSection } from './types';
import { clearAdminSession } from '../../utils/adminAuth';

interface AdminSidebarProps {
  activeSection: AdminSection;
  onSectionChange: (section: AdminSection) => void;
  contactsCount: number;
  galleryCount: number;
}

const navItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'contacts', label: 'Contacts', icon: Inbox },
  { id: 'gallery', label: 'Gallery', icon: FolderKanban },
] as const;

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeSection,
  onSectionChange,
  contactsCount,
  galleryCount,
}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAdminSession();
    navigate('/admin/login', { replace: true });
  };

  return (
    <aside className="min-h-screen border-b border-[#DDE7E3] bg-[#0B5E52] text-white xl:border-b-0 xl:border-r xl:border-r-white/10">
      <div className="flex h-full min-h-screen flex-col p-5 md:p-6 xl:sticky xl:top-0 xl:h-screen">
        <div className="rounded-[10px] border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <img src={logo} alt="DRD Plantech logo" className="h-[58px] w-[54px] rounded-md object-contain" />
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-[0.26em] text-white/55">Admin Panel</p>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-[0.24em] text-white/45">Workspace</p>
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              const count =
                item.id === 'contacts'
                  ? contactsCount
                  : item.id === 'gallery'
                    ? galleryCount
                    : undefined;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSectionChange(item.id)}
                  className={`flex w-full items-center gap-3 rounded-[10px] px-4 py-3 text-left transition-all ${
                    isActive
                      ? 'bg-white text-[#0B5E52] shadow-lg shadow-black/10'
                      : 'text-white/82 hover:bg-white/8'
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{item.label}</span>
                  {count !== undefined ? (
                    <span className={`ml-auto rounded-full px-2 py-0.5 text-xs ${isActive ? 'bg-[#0B5E52]/10 text-[#0B5E52]' : 'bg-white/12'}`}>
                      {count}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-10 rounded-[10px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.10),rgba(255,255,255,0.03))] p-4">
          <p className="text-sm font-semibold">Quick Notes</p>
          <p className="mt-2 text-sm leading-6 text-white/72">
            Review fresh leads, switch between sections quickly, and manage media content for the public gallery.
          </p>
          <a
            href="/gallery"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-white"
          >
            Open Gallery
            <ExternalLink size={14} />
          </a>
        </div>

        <div className="mt-auto pt-8 text-sm text-white/55">
          <button
            type="button"
            onClick={handleLogout}
            className="mb-4 inline-flex items-center gap-2 rounded-[10px] border border-white/10 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-white/8"
          >
            <LogOut size={16} />
            Logout
          </button>
          <p>DRD Plantech LLP</p>
          <p className="mt-1">Admin workspace for inquiries and media content.</p>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
