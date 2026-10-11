import { Mail, Video } from 'lucide-react';
import React from 'react';
import { ActiveTab } from '../types';

interface BottomNavProps {
  activeTab: ActiveTab;
  onChangeTab: (tab: ActiveTab) => void;
  unreadCount?: string;
}

export function BottomNav({ activeTab, onChangeTab, unreadCount = '99+' }: BottomNavProps) {
  return (
    <nav
      className="w-full bg-[#f0f4f9] border-t border-neutral-200/50 flex items-center justify-around py-2 px-6 select-none shrink-0"
      aria-label="Navigation Tabs"
    >
      {/* Mail Tab */}
      <button
        type="button"
        onClick={() => onChangeTab('mail')}
        className="flex flex-col items-center justify-center relative px-6 py-1 group focus:outline-none"
        aria-label="Mail tab"
      >
        <div
          className={`px-5 py-1 rounded-full transition-all duration-200 relative ${
            activeTab === 'mail'
              ? 'bg-[#c2e7ff] text-[#001d35]'
              : 'text-neutral-600 hover:bg-neutral-200/40'
          }`}
        >
          <Mail
            className={`w-6 h-6 ${
              activeTab === 'mail' ? 'fill-current text-[#001d35]' : 'text-neutral-700'
            }`}
          />

          {/* Red 99+ Badge */}
          {unreadCount && (
            <span className="absolute -top-1.5 -right-2 bg-[#b3261e] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full min-w-[20px] text-center shadow-xs">
              {unreadCount}
            </span>
          )}
        </div>
      </button>

      {/* Meet Tab */}
      <button
        type="button"
        onClick={() => onChangeTab('meet')}
        className="flex flex-col items-center justify-center relative px-6 py-1 group focus:outline-none"
        aria-label="Meet tab"
      >
        <div
          className={`px-5 py-1 rounded-full transition-all duration-200 ${
            activeTab === 'meet'
              ? 'bg-[#c2e7ff] text-[#001d35]'
              : 'text-neutral-600 hover:bg-neutral-200/40'
          }`}
        >
          <Video
            className={`w-6 h-6 ${
              activeTab === 'meet' ? 'text-[#001d35] stroke-[2.4]' : 'text-neutral-700'
            }`}
          />
        </div>
      </button>
    </nav>
  );
}
