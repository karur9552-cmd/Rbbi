import { X } from 'lucide-react';
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
          <div className="w-8" />
        </div>

        {/* Current & Only Active Account */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-neutral-100 flex flex-col items-center text-center">
          <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-blue-500/30 mb-2">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-[#0b57d0] text-white flex items-center justify-center text-xl font-bold">
                R
              </div>
            )}
          </div>

          <h3 className="font-semibold text-neutral-900 text-[15px]">Raghuraman Seetharaman</h3>
          <p className="text-neutral-600 text-sm mt-0.5 font-normal">
            r32071381@gmail.com
          </p>

          <button
            type="button"
            className="mt-4 px-5 py-2 border border-neutral-300 rounded-full text-xs font-medium text-neutral-700 hover:bg-neutral-50 active:bg-neutral-100 transition-colors"
          >
            Manage your Google Account
          </button>
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
