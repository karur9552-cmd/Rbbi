import { Plus, Settings, Shield, User, X } from 'lucide-react';
import React from 'react';

interface AccountSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  avatarUrl?: string;
}

export function AccountSwitcherModal({
  isOpen,
  onClose,
  avatarUrl,
}: AccountSwitcherModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none animate-fadeIn">
      {/* Dim backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-[360px] bg-[#f0f4f9] rounded-3xl p-4 shadow-2xl z-10 text-neutral-900 border border-neutral-200">
        {/* Header with Google Logo & Close */}
        <div className="flex items-center justify-between pb-3">
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-600 hover:bg-neutral-200"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <span className="font-semibold text-lg text-neutral-800 tracking-tight">
            Google
          </span>
          <div className="w-8" /> {/* spacer */}
        </div>

        {/* Current Active Account Box */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-neutral-100 flex flex-col items-center text-center">
          <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-blue-500/30 mb-2">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-amber-700 text-white flex items-center justify-center text-xl font-bold">
                K
              </div>
            )}
          </div>

          <h3 className="font-semibold text-neutral-900 text-[15px]">Karur</h3>
          <p className="text-neutral-500 text-xs mt-0.5 font-normal">
            karur9552@gmail.com
          </p>

          <button
            type="button"
            className="mt-3 px-4 py-1.5 border border-neutral-300 rounded-full text-xs font-medium text-neutral-700 hover:bg-neutral-50 active:bg-neutral-100 transition-colors"
          >
            Manage your Google Account
          </button>
        </div>

        {/* Other Accounts List */}
        <div className="mt-3 bg-white rounded-2xl p-2 shadow-sm border border-neutral-100 divide-y divide-neutral-100">
          <div className="flex items-center gap-3 p-2 hover:bg-neutral-50 rounded-xl cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-medium text-sm">
              S
            </div>
            <div className="flex-1 text-left min-w-0">
              <div className="text-sm font-medium text-neutral-800">Senthil K</div>
              <div className="text-xs text-neutral-500 truncate">senthil.k@gmail.com</div>
            </div>
            <span className="text-[11px] font-semibold text-neutral-400 bg-neutral-100 px-1.5 py-0.5 rounded">
              3
            </span>
          </div>

          {/* Add another account */}
          <div className="flex items-center gap-3 p-2.5 hover:bg-neutral-50 rounded-xl cursor-pointer text-neutral-700">
            <div className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600">
              <Plus className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium">Add another account</span>
          </div>

          {/* Manage accounts on this device */}
          <div className="flex items-center gap-3 p-2.5 hover:bg-neutral-50 rounded-xl cursor-pointer text-neutral-700">
            <div className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600">
              <Settings className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium">Manage accounts on this device</span>
          </div>
        </div>

        {/* Footer links */}
        <div className="mt-4 text-center flex items-center justify-center gap-3 text-[11px] text-neutral-500 font-medium">
          <a href="#" onClick={(e) => e.preventDefault()} className="hover:underline">
            Privacy Policy
          </a>
          <span>•</span>
          <a href="#" onClick={(e) => e.preventDefault()} className="hover:underline">
            Terms of Service
          </a>
        </div>
      </div>
    </div>
  );
}
