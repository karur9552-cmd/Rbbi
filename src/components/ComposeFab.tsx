import { Edit2 } from 'lucide-react';
import React from 'react';

interface ComposeFabProps {
  onClick: () => void;
}

export function ComposeFab({ onClick }: ComposeFabProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed bottom-20 right-5 z-20 flex items-center gap-2.5 px-5 py-4 bg-[#c2e7ff] text-[#001d35] hover:bg-[#b5dffc] active:bg-[#a0d2f8] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.18)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.22)] active:scale-95 transition-all duration-150 select-none group"
      aria-label="Compose new email"
    >
      <Edit2 className="w-5 h-5 text-[#001d35] stroke-[2.2]" />
      <span className="font-medium text-[15px] tracking-wide text-[#001d35]">
        Compose
      </span>
    </button>
  );
}
