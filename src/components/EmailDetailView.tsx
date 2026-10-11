import {
  Archive,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  CornerUpLeft,
  CornerUpRight,
  Lock,
  Mail,
  MoreVertical,
  Reply,
  Smile,
  Star,
  Trash2,
  X,
} from 'lucide-react';
import React, { useState } from 'react';
import { Email } from '../types';

interface EmailDetailViewProps {
  email: Email;
  onBack: () => void;
  onDelete: (id: string) => void;
  onArchive: (id: string) => void;
  onToggleStar: (id: string, e: React.MouseEvent) => void;
  onToggleUnread: (id: string) => void;
}

export function EmailDetailView({
  email,
  onBack,
  onDelete,
  onArchive,
  onToggleStar,
  onToggleUnread,
}: EmailDetailViewProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [sentToast, setSentToast] = useState(false);
  const [showSecurityModal, setShowSecurityModal] = useState(false);

  const fromEmail = email.senderEmail || (email.id === 'email-rbi' ? 'finance@gov.in' : `${email.sender.toLowerCase().replace(/[^a-z0-9]/g, '')}@gmail.com`);
  const toEmail = email.toEmail || (email.id === 'email-rbi' ? 'abcdefgb@gmail.com' : 'abcdefgb@gmail.com');
  const dateStr = email.dateDetail || 'Oct 11, 2026, 10:18 AM';

  const handleSendReply = () => {
    if (!replyText.trim()) return;
    setSentToast(true);
    setShowReplyBox(false);
    setReplyText('');
    setTimeout(() => setSentToast(false), 3000);
  };

  return (
    <div className="flex-1 bg-white flex flex-col h-full overflow-hidden select-none">
      {/* Top Action Bar */}
      <div className="h-14 px-3 flex items-center justify-between border-b border-neutral-100 shrink-0">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full flex items-center justify-center text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200"
          aria-label="Back to inbox"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-1 text-neutral-700">
          {/* Archive */}
          <button
            onClick={() => onArchive(email.id)}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-neutral-100 active:bg-neutral-200"
            title="Archive"
            aria-label="Archive"
          >
            <Archive className="w-5 h-5" />
          </button>

          {/* Delete */}
          <button
            onClick={() => onDelete(email.id)}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-neutral-100 active:bg-neutral-200"
            title="Delete"
            aria-label="Delete"
          >
            <Trash2 className="w-5 h-5" />
          </button>

          {/* Mark Unread */}
          <button
            onClick={() => onToggleUnread(email.id)}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-neutral-100 active:bg-neutral-200"
            title="Mark as unread"
            aria-label="Mark as unread"
          >
            <Mail className="w-5 h-5" />
          </button>

          {/* More options */}
          <button
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-neutral-100 active:bg-neutral-200"
            title="More options"
            aria-label="More options"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Email Body Content */}
      <div className="flex-1 overflow-y-auto px-4 py-3">
        {/* Subject Header & Star matching screenshot */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1">
            <h1 className="text-[19px] font-normal text-neutral-900 leading-snug">
              {email.subject}{' '}
              <span className="inline-block text-[11px] font-medium bg-[#e1f0ff] text-[#0b57d0] px-2 py-0.5 rounded ml-1 align-middle">
                Inbox
              </span>
            </h1>
          </div>

          <button
            onClick={(e) => onToggleStar(email.id, e)}
            className="w-9 h-9 rounded-full flex items-center justify-center text-neutral-600 hover:text-amber-500 hover:bg-neutral-100 shrink-0"
            aria-label={email.starred ? 'Starred' : 'Not starred'}
          >
            <Star
              className={`w-5 h-5 ${
                email.starred
                  ? 'fill-amber-400 text-amber-500'
                  : 'text-neutral-600 stroke-[1.6]'
              }`}
            />
          </button>
        </div>

        {/* Sender details row */}
        <div className="flex items-start justify-between gap-2.5 py-1">
          <div className="flex items-start gap-3 min-w-0">
            {/* Sender Avatar */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium text-base shrink-0 overflow-hidden ${
                email.avatarImage ? 'bg-black' : email.avatarColor || 'bg-blue-600'
              }`}
            >
              {email.avatarImage ? (
                <img
                  src={email.avatarImage}
                  alt={email.sender}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span>{email.avatarText || email.sender.charAt(0).toUpperCase()}</span>
              )}
            </div>

            <div className="min-w-0">
              <div className="flex items-baseline gap-2">
                <span className="font-semibold text-neutral-900 text-[14.5px] truncate max-w-[140px] sm:max-w-xs">
                  {email.senderEmail || email.sender}
                </span>
                <span className="text-[12px] text-neutral-500 whitespace-nowrap">
                  {email.time}
                </span>
              </div>

              {/* "to me" button that toggles the details box */}
              <button
                type="button"
                onClick={() => setShowDetails((prev) => !prev)}
                className="text-[13px] text-neutral-600 hover:text-neutral-900 flex items-center gap-1 mt-0.5 group focus:outline-none"
              >
                <span>to me</span>
                {showDetails ? (
                  <ChevronUp className="w-3.5 h-3.5 text-neutral-500 group-hover:text-neutral-800" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-500 group-hover:text-neutral-800" />
                )}
              </button>
            </div>
          </div>

          {/* Quick Header Actions: Smile, Reply, More */}
          <div className="flex items-center text-neutral-600 shrink-0">
            <button
              className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
              title="Add reaction"
              aria-label="Add reaction"
            >
              <Smile className="w-5 h-5 text-neutral-700" strokeWidth={1.8} />
            </button>
            <button
              onClick={() => setShowReplyBox(true)}
              className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
              title="Reply"
              aria-label="Reply"
            >
              <Reply className="w-5 h-5 text-neutral-700" strokeWidth={1.8} />
            </button>
            <button
              className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
              title="More"
              aria-label="More"
            >
              <MoreVertical className="w-5 h-5 text-neutral-700" strokeWidth={1.8} />
            </button>
          </div>
        </div>

        {/* Expanded Details Box (Matching Screenshot_20261011_110434.jpg) */}
        {showDetails && (
          <div className="bg-[#f0f4f9] rounded-2xl p-4 my-3 text-[13.5px] border border-neutral-200/60 shadow-xs animate-fadeIn select-text">
            <div className="grid grid-cols-[55px_1fr] gap-y-2 text-neutral-800">
              <span className="text-neutral-500 font-normal">From</span>
              <span className="font-normal select-text break-all">{fromEmail}</span>

              <span className="text-neutral-500 font-normal">To</span>
              <span className="font-normal select-text break-all">{toEmail}</span>

              <span className="text-neutral-500 font-normal">Date</span>
              <span className="font-normal">{dateStr}</span>
            </div>

            {/* Security Section with TLS lock */}
            <div className="flex items-start gap-2.5 mt-3 pt-3 border-t border-neutral-200/70">
              <Lock className="w-4 h-4 text-neutral-600 shrink-0 mt-0.5" />
              <div className="text-[13px] leading-snug">
                <div className="text-neutral-800 font-normal">
                  Standard encryption (TLS).
                </div>
                <button
                  type="button"
                  onClick={() => setShowSecurityModal(true)}
                  className="text-[#0b57d0] hover:underline font-normal text-left cursor-pointer"
                >
                  View security details
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Message Text */}
        <div className="py-4 text-[14.5px] text-neutral-800 leading-relaxed whitespace-pre-line font-normal">
          {email.body}
        </div>

        {/* Reply Box if opened */}
        {showReplyBox && (
          <div className="mt-4 p-3 bg-neutral-50 border border-neutral-200 rounded-2xl">
            <div className="text-xs text-neutral-500 mb-1">
              Replying to {fromEmail}
            </div>
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write your response..."
              className="w-full bg-white p-2.5 rounded-xl border border-neutral-200 text-sm outline-none focus:ring-1 focus:ring-blue-500 min-h-[90px]"
              autoFocus
            />
            <div className="flex items-center justify-end gap-2 mt-2">
              <button
                onClick={() => setShowReplyBox(false)}
                className="px-3 py-1.5 text-xs text-neutral-600 font-medium hover:bg-neutral-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSendReply}
                className="px-4 py-1.5 text-xs bg-[#0b57d0] text-white font-medium rounded-lg hover:bg-blue-700"
              >
                Send
              </button>
            </div>
          </div>
        )}

        {/* Reply & Forward bottom action buttons (Matching Screenshot_20261011_110434.jpg) */}
        {!showReplyBox && (
          <div className="flex items-center gap-2 pt-6 pb-8">
            {/* Reply pill */}
            <button
              onClick={() => setShowReplyBox(true)}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[#3c5067] text-white hover:bg-[#2f4053] active:scale-[0.98] transition-all text-sm font-medium shadow-sm"
            >
              <CornerUpLeft className="w-4 h-4 text-white" strokeWidth={2.4} />
              <span>Reply</span>
            </button>

            {/* Forward pill */}
            <button
              onClick={() => setShowReplyBox(true)}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[#3c5067] text-white hover:bg-[#2f4053] active:scale-[0.98] transition-all text-sm font-medium shadow-sm"
            >
              <CornerUpRight className="w-4 h-4 text-white" strokeWidth={2.4} />
              <span>Forward</span>
            </button>

            {/* Emoji reaction circle button */}
            <button
              onClick={() => {}}
              className="w-12 h-12 rounded-full bg-[#3c5067] text-white flex items-center justify-center hover:bg-[#2f4053] active:scale-[0.98] transition-all shadow-sm"
              title="Add reaction"
            >
              <Smile className="w-5 h-5 text-white" strokeWidth={2} />
            </button>
          </div>
        )}
      </div>

      {/* Security Details Modal */}
      {showSecurityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setShowSecurityModal(false)}
          />
          <div className="relative bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl z-10 text-left">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-neutral-900 text-base">
                Security details
              </h3>
              <button
                onClick={() => setShowSecurityModal(false)}
                className="p-1 rounded-full text-neutral-500 hover:bg-neutral-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3 text-xs text-neutral-700">
              <div>
                <span className="font-semibold text-neutral-900 block">Encryption</span>
                <span>Standard encryption (TLS 1.3) protects this email in transit.</span>
              </div>
              <div>
                <span className="font-semibold text-neutral-900 block">Sender domain</span>
                <span className="font-mono text-neutral-800">{fromEmail}</span>
              </div>
              <div>
                <span className="font-semibold text-neutral-900 block">Authentication</span>
                <span>Passed SPF, DKIM, and DMARC verification.</span>
              </div>
            </div>
            <button
              onClick={() => setShowSecurityModal(false)}
              className="w-full mt-5 py-2.5 bg-[#0b57d0] text-white rounded-full text-xs font-medium hover:bg-blue-700"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Sent Toast notification */}
      {sentToast && (
        <div className="absolute bottom-16 left-4 right-4 bg-neutral-900 text-white px-4 py-3 rounded-lg shadow-lg flex items-center justify-between text-xs animate-bounce">
          <span>Reply sent</span>
          <span className="text-blue-300 font-semibold cursor-pointer">Undo</span>
        </div>
      )}
    </div>
  );
}
