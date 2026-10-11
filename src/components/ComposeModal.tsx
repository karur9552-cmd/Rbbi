import { ArrowLeft, MoreVertical, Paperclip, Send } from 'lucide-react';
import React, { useState } from 'react';

interface ComposeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (email: { to: string; subject: string; body: string }) => void;
}

export function ComposeModal({ isOpen, onClose, onSend }: ComposeModalProps) {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  if (!isOpen) return null;

  const handleSend = () => {
    if (!to.trim() && !subject.trim() && !body.trim()) {
      onClose();
      return;
    }
    onSend({
      to: to || 'recipient@example.com',
      subject: subject || '(no subject)',
      body: body || '',
    });
    setTo('');
    setSubject('');
    setBody('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col select-none animate-fadeIn">
      {/* Top App Bar */}
      <div className="h-14 px-3 flex items-center justify-between border-b border-neutral-100 shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center text-neutral-700 hover:bg-neutral-100"
            aria-label="Close compose"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-lg font-medium text-neutral-800">Compose</span>
        </div>

        <div className="flex items-center gap-1 text-neutral-700">
          <button
            type="button"
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-neutral-100"
            title="Attach file"
          >
            <Paperclip className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={handleSend}
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#0b57d0] hover:bg-neutral-100"
            title="Send"
          >
            <Send className="w-5 h-5 fill-current" />
          </button>
          <button
            type="button"
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-neutral-100"
            title="More"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Fields */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* From */}
        <div className="flex items-center px-4 py-3 border-b border-neutral-100 text-sm">
          <span className="text-neutral-500 w-16">From</span>
          <span className="text-neutral-800 font-medium">karur9552@gmail.com</span>
        </div>

        {/* To */}
        <div className="flex items-center px-4 py-2 border-b border-neutral-100 text-sm">
          <label htmlFor="to-input" className="text-neutral-500 w-16">To</label>
          <input
            id="to-input"
            type="email"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="recipient@example.com"
            className="flex-1 bg-transparent outline-none py-1.5 text-neutral-900"
            autoFocus
          />
        </div>

        {/* Subject */}
        <div className="flex items-center px-4 py-2 border-b border-neutral-100 text-sm">
          <label htmlFor="subject-input" className="sr-only">Subject</label>
          <input
            id="subject-input"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
            className="w-full bg-transparent outline-none py-1.5 text-neutral-900 placeholder-neutral-400 font-normal"
          />
        </div>

        {/* Compose text area */}
        <div className="flex-1 p-4">
          <label htmlFor="body-input" className="sr-only">Compose email</label>
          <textarea
            id="body-input"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Compose email"
            className="w-full h-full bg-transparent outline-none text-neutral-900 placeholder-neutral-400 text-base resize-none"
          />
        </div>
      </div>
    </div>
  );
}
