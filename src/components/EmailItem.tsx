import { Star, User } from 'lucide-react';
import React from 'react';
import { Email } from '../types';

interface EmailItemProps {
  email: Email;
  onSelect: (email: Email) => void;
  onToggleStar: (id: string, e: React.MouseEvent) => void;
}

export function EmailItem({ email, onSelect, onToggleStar }: EmailItemProps) {
  const isUnread = email.unread;

  return (
    <div
      onClick={() => onSelect(email)}
      className="flex items-start px-4 py-3 hover:bg-neutral-100/60 active:bg-neutral-200/50 transition-colors cursor-pointer select-none group border-b border-transparent"
    >
      {/* Avatar Circle */}
      <div className="shrink-0 mr-3.5 mt-0.5">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium text-lg overflow-hidden ${
            email.avatarImage ? 'bg-black' : email.avatarColor || 'bg-neutral-400'
          }`}
        >
          {email.avatarImage ? (
            <img
              src={email.avatarImage}
              alt={email.sender}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : email.avatarIcon === 'user' ? (
            <User className="w-5 h-5 text-white" strokeWidth={2.2} />
          ) : (
            <span>{email.avatarText || email.sender.charAt(0).toUpperCase()}</span>
          )}
        </div>
      </div>

      {/* Email Information Middle Block */}
      <div className="flex-1 min-w-0 pr-2">
        {/* Sender Name */}
        <div
          className={`text-[15px] leading-tight truncate ${
            isUnread ? 'font-bold text-neutral-900' : 'font-normal text-neutral-800'
          }`}
        >
          {email.sender}
        </div>

        {/* Subject Line */}
        <div
          className={`text-[14px] leading-tight mt-1 truncate ${
            isUnread ? 'font-bold text-neutral-900' : 'font-normal text-neutral-700'
          }`}
        >
          {email.subject}
        </div>

        {/* Snippet / Preview */}
        <div className="text-[13.5px] leading-tight mt-1 text-neutral-500 truncate font-normal">
          {email.snippet}
        </div>
      </div>

      {/* Right Column: Time/Date + Unread Dot + Star */}
      <div className="shrink-0 flex flex-col items-end justify-between h-[60px] pl-1">
        {/* Time and Unread Dot */}
        <div className="flex items-center gap-1.5 pt-0.5">
          <span
            className={`text-[12px] leading-none whitespace-nowrap ${
              isUnread ? 'font-bold text-neutral-900' : 'font-normal text-neutral-600'
            }`}
          >
            {email.time}
          </span>
          {isUnread && (
            <div
              className="w-2 h-2 rounded-full bg-[#0b57d0]"
              title="Unread message"
            />
          )}
        </div>

        {/* Star Icon Button */}
        <button
          type="button"
          onClick={(e) => onToggleStar(email.id, e)}
          className="p-1 -mr-1 text-neutral-400 hover:text-amber-500 active:scale-90 transition-transform"
          aria-label={email.starred ? 'Starred' : 'Not starred'}
        >
          <Star
            className={`w-5 h-5 transition-colors ${
              email.starred
                ? 'fill-amber-400 text-amber-500'
                : 'text-neutral-500 stroke-[1.5]'
            }`}
          />
        </button>
      </div>
    </div>
  );
}
