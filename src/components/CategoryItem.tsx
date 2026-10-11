import { Info, Tag } from 'lucide-react';
import React from 'react';
import { Email } from '../types';

interface CategoryItemProps {
  email: Email;
  onSelectCategory: (category: 'updates' | 'promotions') => void;
}

export function CategoryItem({ email, onSelectCategory }: CategoryItemProps) {
  const isUpdates = email.categoryType === 'updates';
  const categoryType = email.categoryType as 'updates' | 'promotions';

  return (
    <div
      onClick={() => onSelectCategory(categoryType)}
      className="flex items-center px-4 py-3.5 hover:bg-neutral-100/60 active:bg-neutral-200/50 transition-colors cursor-pointer select-none border-b border-transparent"
    >
      {/* Category Icon */}
      <div className="shrink-0 mr-3.5">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
            isUpdates ? 'bg-[#ff6f00]' : 'bg-[#0f9d58]'
          }`}
        >
          {isUpdates ? (
            <Info className="w-5 h-5 text-white" strokeWidth={2.4} />
          ) : (
            <Tag className="w-5 h-5 text-white" strokeWidth={2.4} />
          )}
        </div>
      </div>

      {/* Middle Text: Title + Snippet */}
      <div className="flex-1 min-w-0 pr-3">
        <div className="text-[15px] font-bold text-neutral-900 leading-tight">
          {email.sender}
        </div>
        <div className="text-[13.5px] font-normal text-neutral-800 leading-tight mt-1 truncate">
          {email.subject}
        </div>
      </div>

      {/* Right Badge Pill: 99+ new */}
      <div className="shrink-0">
        <span
          className={`inline-flex items-center justify-center px-2.5 py-1 text-[12px] font-medium rounded-full ${
            isUpdates
              ? 'bg-[#ea580c] text-white'
              : 'bg-[#10b981] text-white'
          }`}
        >
          {email.badge?.text || '99+ new'}
        </span>
      </div>
    </div>
  );
}
