import { Menu, Search, X } from 'lucide-react';
import React, { useRef } from 'react';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenDrawer: () => void;
  onOpenAccount: () => void;
  avatarUrl?: string;
  isSearching: boolean;
  setIsSearching: (val: boolean) => void;
}

export function SearchBar({
  searchQuery,
  onSearchChange,
  onOpenDrawer,
  onOpenAccount,
  avatarUrl,
  isSearching,
  setIsSearching,
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleStartSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  const handleClear = () => {
    onSearchChange('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="px-4 py-2 select-none">
      <div
        className="w-full h-13 bg-white rounded-full flex items-center px-3.5 shadow-[0_1px_4px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.08)] hover:shadow-md transition-shadow duration-200 cursor-text"
        onClick={handleStartSearch}
      >
        {/* Left icon: Drawer hamburger or Back arrow if searching */}
        {isSearching ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsSearching(false);
              onSearchChange('');
            }}
            className="w-10 h-10 rounded-full flex items-center justify-center text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200 transition-colors mr-1"
            aria-label="Back to inbox"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
            </svg>
          </button>
        ) : (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDrawer();
            }}
            className="w-10 h-10 rounded-full flex items-center justify-center text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200 transition-colors mr-1"
            aria-label="Main menu"
          >
            <Menu className="w-5 h-5 text-neutral-700" strokeWidth={2.2} />
          </button>
        )}

        {/* Center: Search text input */}
        <div className="flex-1 flex items-center h-full">
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => setIsSearching(true)}
            placeholder="Search in mail"
            className="w-full bg-transparent border-none outline-none text-[16px] text-neutral-800 placeholder-neutral-500 font-normal pr-2"
          />
        </div>

        {/* Right action: Clear button if text exists, otherwise User Avatar */}
        {searchQuery.length > 0 ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleClear();
            }}
            className="w-9 h-9 rounded-full flex items-center justify-center text-neutral-600 hover:bg-neutral-100 active:bg-neutral-200 transition-colors"
            aria-label="Clear search"
          >
            <X className="w-5 h-5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenAccount();
            }}
            className="relative w-8.5 h-8.5 rounded-full overflow-hidden ring-1 ring-neutral-200 shrink-0 hover:ring-2 hover:ring-blue-500 transition-all active:scale-95"
            aria-label="Google Account"
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="Account profile"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
            ) : null}
            <div className="w-full h-full bg-[#0b57d0] text-white flex items-center justify-center font-medium text-xs">
              R
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
