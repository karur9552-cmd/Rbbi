import {
  AlertOctagon,
  Archive,
  Calendar,
  Clock,
  Download,
  FileText,
  HelpCircle,
  Inbox,
  Info,
  Mail,
  Send,
  Settings,
  Star,
  Tag,
  Trash2,
  Users,
  X,
} from 'lucide-react';
import React from 'react';
import { ActiveCategory } from '../types';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeCategory: ActiveCategory;
  onSelectCategory: (category: ActiveCategory) => void;
}

export function NavigationDrawer({
  isOpen,
  onClose,
  activeCategory,
  onSelectCategory,
}: NavigationDrawerProps) {
  if (!isOpen) return null;

  const handleCategoryClick = (category: ActiveCategory) => {
    onSelectCategory(category);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex select-none animate-fadeIn">
      {/* Dark backdrop scrim */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity"
        onClick={onClose}
      />

      {/* Drawer surface */}
      <div className="relative w-[300px] max-w-[85%] h-full bg-white shadow-2xl z-10 flex flex-col overflow-y-auto">
        {/* Header */}
        <div className="px-6 pt-5 pb-3 flex items-center justify-between border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <span className="text-[#ea4335] text-2xl font-bold tracking-tight">
              Gmail
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-neutral-500 hover:bg-neutral-100"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation List */}
        <div className="py-2 flex-1">
          {/* All inboxes */}
          <button
            onClick={() => handleCategoryClick('all')}
            className={`w-full flex items-center gap-4 px-6 py-3 text-sm font-medium transition-colors ${
              activeCategory === 'all'
                ? 'bg-[#c2e7ff]/70 text-[#001d35] font-semibold'
                : 'text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            <Inbox className="w-5 h-5" />
            <span>All inboxes</span>
          </button>

          <div className="my-1 border-t border-neutral-200/60" />

          {/* Primary */}
          <button
            onClick={() => handleCategoryClick('primary')}
            className={`w-full flex items-center justify-between px-6 py-3 text-sm font-medium transition-colors ${
              activeCategory === 'primary'
                ? 'bg-[#c2e7ff]/70 text-[#001d35] font-semibold'
                : 'text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            <div className="flex items-center gap-4">
              <Mail className="w-5 h-5 text-neutral-600" />
              <span>Primary</span>
            </div>
            <span className="text-xs font-semibold text-neutral-600">99+</span>
          </button>

          {/* Promotions */}
          <button
            onClick={() => handleCategoryClick('promotions')}
            className={`w-full flex items-center justify-between px-6 py-3 text-sm font-medium transition-colors ${
              activeCategory === 'promotions'
                ? 'bg-[#c2e7ff]/70 text-[#001d35] font-semibold'
                : 'text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            <div className="flex items-center gap-4">
              <Tag className="w-5 h-5 text-[#0f9d58]" />
              <span>Promotions</span>
            </div>
            <span className="bg-[#10b981] text-white text-[11px] font-medium px-2 py-0.5 rounded-full">
              99+ new
            </span>
          </button>

          {/* Social */}
          <button
            onClick={() => handleCategoryClick('social')}
            className={`w-full flex items-center justify-between px-6 py-3 text-sm font-medium transition-colors ${
              activeCategory === 'social'
                ? 'bg-[#c2e7ff]/70 text-[#001d35] font-semibold'
                : 'text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            <div className="flex items-center gap-4">
              <Users className="w-5 h-5 text-[#1a73e8]" />
              <span>Social</span>
            </div>
            <span className="text-xs text-neutral-500">12 new</span>
          </button>

          {/* Updates */}
          <button
            onClick={() => handleCategoryClick('updates')}
            className={`w-full flex items-center justify-between px-6 py-3 text-sm font-medium transition-colors ${
              activeCategory === 'updates'
                ? 'bg-[#c2e7ff]/70 text-[#001d35] font-semibold'
                : 'text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            <div className="flex items-center gap-4">
              <Info className="w-5 h-5 text-[#f97316]" />
              <span>Updates</span>
            </div>
            <span className="bg-[#f97316] text-white text-[11px] font-medium px-2 py-0.5 rounded-full">
              99+ new
            </span>
          </button>

          <div className="my-2 border-t border-neutral-200/60" />

          {/* Section label */}
          <div className="px-6 py-1.5 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
            All labels
          </div>

          {/* Starred */}
          <button
            onClick={() => handleCategoryClick('starred')}
            className={`w-full flex items-center gap-4 px-6 py-2.5 text-sm font-medium transition-colors ${
              activeCategory === 'starred'
                ? 'bg-[#c2e7ff]/70 text-[#001d35] font-semibold'
                : 'text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            <Star className="w-5 h-5 text-neutral-600" />
            <span>Starred</span>
          </button>

          {/* Snoozed */}
          <button
            onClick={() => handleCategoryClick('all')}
            className="w-full flex items-center gap-4 px-6 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-100"
          >
            <Clock className="w-5 h-5 text-neutral-600" />
            <span>Snoozed</span>
          </button>

          {/* Sent */}
          <button
            onClick={() => handleCategoryClick('sent')}
            className={`w-full flex items-center gap-4 px-6 py-2.5 text-sm font-medium transition-colors ${
              activeCategory === 'sent'
                ? 'bg-[#c2e7ff]/70 text-[#001d35] font-semibold'
                : 'text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            <Send className="w-5 h-5 text-neutral-600" />
            <span>Sent</span>
          </button>

          {/* Drafts */}
          <button
            onClick={() => handleCategoryClick('all')}
            className="w-full flex items-center gap-4 px-6 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-100"
          >
            <FileText className="w-5 h-5 text-neutral-600" />
            <span>Drafts</span>
          </button>

          {/* Spam */}
          <button
            onClick={() => handleCategoryClick('all')}
            className="w-full flex items-center gap-4 px-6 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-100"
          >
            <AlertOctagon className="w-5 h-5 text-neutral-600" />
            <span>Spam</span>
          </button>

          {/* Trash */}
          <button
            onClick={() => handleCategoryClick('all')}
            className="w-full flex items-center gap-4 px-6 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-100"
          >
            <Trash2 className="w-5 h-5 text-neutral-600" />
            <span>Trash</span>
          </button>

          <div className="my-2 border-t border-neutral-200/60" />

          {/* Google apps */}
          <div className="px-6 py-1.5 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
            Google apps
          </div>

          <div className="w-full flex items-center gap-4 px-6 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-100 cursor-pointer">
            <Calendar className="w-5 h-5 text-blue-600" />
            <span>Calendar</span>
          </div>

          <div className="w-full flex items-center gap-4 px-6 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-100 cursor-pointer">
            <Users className="w-5 h-5 text-blue-600" />
            <span>Contacts</span>
          </div>

          <div className="my-2 border-t border-neutral-200/60" />

          {/* Settings */}
          <div className="w-full flex items-center gap-4 px-6 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-100 cursor-pointer">
            <Settings className="w-5 h-5 text-neutral-600" />
            <span>Settings</span>
          </div>

          {/* Help */}
          <div className="w-full flex items-center gap-4 px-6 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-100 cursor-pointer">
            <HelpCircle className="w-5 h-5 text-neutral-600" />
            <span>Help and feedback</span>
          </div>

          <div className="my-2 border-t border-neutral-200/60" />

          {/* Download Project ZIP for Vercel */}
          <a
            href="/gmail-mobile.zip"
            download="gmail-mobile.zip"
            className="w-full flex items-center gap-4 px-6 py-2.5 text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors"
          >
            <Download className="w-5 h-5 text-blue-600" />
            <span>Download Project ZIP</span>
          </a>
        </div>
      </div>
    </div>
  );
}
