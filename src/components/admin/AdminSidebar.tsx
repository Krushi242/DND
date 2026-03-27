import React, { useState } from 'react';
import { ExternalLink, FolderKanban, Inbox, LayoutDashboard, LogOut, Menu, PlaySquare, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';
import type { AdminSection } from './types';
import { clearAdminSession } from '../../utils/adminAuth';

interface AdminSidebarProps {
  activeSection: AdminSection;
  onSectionChange: (section: AdminSection) => void;
  contactsCount: number;
  galleryCount: number;
  videosCount: number;
}

const navItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'contacts', label: 'Contacts', icon: Inbox },
  { id: 'gallery', label: 'Gallery', icon: FolderKanban },
  { id: 'videos', label: 'Videos', icon: PlaySquare },
] as const;

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeSection,
  onSectionChange,
  contactsCount,
  galleryCount,
  videosCount,
}) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSectionChange = (section: AdminSection) => {
    onSectionChange(section);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    setIsMobileMenuOpen(false);
    clearAdminSession();
    navigate('/admin/login', { replace: true });
  };

  return (
    <aside className="relative border-b border-[#DDE7E3] bg-white xl:min-h-screen xl:border-b-0 xl:border-r xl:border-r-white/10 xl:bg-[#0B5E52] xl:text-white">
      <div className="border-b border-[#DDE7E3] bg-white px-4 py-4 sm:px-5 md:px-6 xl:hidden">
        <div className="flex items-center justify-between gap-4">
          <img src={logo} alt="DRD Plantech logo" className="h-[46px] w-auto object-contain" />
          <button
            type="button"
            aria-label={isMobileMenuOpen ? 'Close admin menu' : 'Open admin menu'}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-[10px] border border-[#DDE7E3] text-[#0B5E52] transition-colors hover:bg-[#F4F7F6]"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div
        className={`absolute left-0 right-0 top-full z-40 px-4 pt-3 sm:px-5 md:px-6 xl:pointer-events-auto xl:static xl:block xl:h-full xl:px-0 xl:pt-0 ${
          isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <div
          className={`flex h-full flex-col rounded-[18px] bg-[#0B5E52] p-4 text-white shadow-[0_24px_60px_rgba(15,23,42,0.22)] transition-all duration-300 ease-out sm:p-5 md:p-6 xl:rounded-none xl:bg-transparent xl:shadow-none xl:sticky xl:top-0 xl:h-screen xl:translate-y-0 xl:opacity-100 ${
            isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0'
          }`}
        >
          <div className="rounded-[10px] border border-white/10 bg-white/5 p-3 sm:p-4 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <img src={logo} alt="DRD Plantech logo" className="h-[58px] w-[54px] rounded-md object-contain" />
              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-[0.26em] text-white/55">Admin Panel</p>
              </div>
            </div>
          </div>

          <div className="mt-6 sm:mt-8 xl:mt-10">
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
                      : item.id === 'videos'
                        ? videosCount
                      : undefined;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSectionChange(item.id)}
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

          <div className="mt-6 rounded-[10px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.10),rgba(255,255,255,0.03))] p-4 sm:mt-8 xl:mt-10">
            <p className="text-sm font-semibold">Quick Notes</p>
            <p className="mt-2 text-sm leading-6 text-white/72">
              Review fresh leads, switch between sections quickly, and manage media content for the public gallery and video pages.
            </p>
            <a
              href={activeSection === 'videos' ? '/videos' : '/gallery'}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-white"
            >
              {activeSection === 'videos' ? 'Open Videos' : 'Open Gallery'}
              <ExternalLink size={14} />
            </a>
          </div>

          <div className="mt-6 border-t border-white/10 pt-6 text-sm text-white/55 sm:mt-8 xl:mt-auto xl:pt-8">
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
      </div>
    </aside>
  );
};

export default AdminSidebar;
