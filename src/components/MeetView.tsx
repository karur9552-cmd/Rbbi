import { Keyboard, Link, Plus, Video, X } from 'lucide-react';
import React, { useState } from 'react';

export function MeetView() {
  const [activeMeetingModal, setActiveMeetingModal] = useState<string | null>(null);
  const [meetingCode, setMeetingCode] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState(false);

  const handleStartInstant = () => {
    const code = `${Math.random().toString(36).substring(2, 5)}-${Math.random()
      .toString(36)
      .substring(2, 6)}-${Math.random().toString(36).substring(2, 5)}`;
    setGeneratedLink(`meet.google.com/${code}`);
    setActiveMeetingModal('instant');
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 bg-white flex flex-col items-center justify-start p-6 text-center select-none overflow-y-auto">
      {/* Top Meet Header buttons */}
      <div className="w-full flex items-center justify-center gap-3 pt-4 pb-8">
        <button
          onClick={handleStartInstant}
          className="flex-1 max-w-[170px] flex items-center justify-center gap-2 py-2.5 px-4 bg-[#0b57d0] text-white rounded-full text-xs font-medium shadow-sm hover:bg-blue-700 active:scale-95 transition-all"
        >
          <Video className="w-4 h-4" />
          <span>New meeting</span>
        </button>

        <button
          onClick={() => setActiveMeetingModal('join')}
          className="flex-1 max-w-[170px] flex items-center justify-center gap-2 py-2.5 px-4 border border-neutral-300 text-[#0b57d0] rounded-full text-xs font-medium hover:bg-blue-50 active:scale-95 transition-all"
        >
          <Keyboard className="w-4 h-4" />
          <span>Join with code</span>
        </button>
      </div>

      {/* Hero Illustration / Icon */}
      <div className="my-6 w-32 h-32 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 ring-8 ring-blue-50/50">
        <Video className="w-16 h-16 stroke-[1.5]" />
      </div>

      <h2 className="text-xl font-medium text-neutral-800 mt-2">
        Get a link you can share
      </h2>
      <p className="text-neutral-500 text-xs max-w-xs mt-2 leading-relaxed">
        Tap <strong>New meeting</strong> to get a link you can send to people you
        want to meet with, or join an ongoing call.
      </p>

      {/* Meeting Modals */}
      {activeMeetingModal === 'instant' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setActiveMeetingModal(null)}
          />
          <div className="relative bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl z-10 text-left">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-neutral-900 text-base">
                Your meeting is ready
              </h3>
              <button
                onClick={() => setActiveMeetingModal(null)}
                className="p-1 rounded-full text-neutral-500 hover:bg-neutral-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-neutral-500 mb-3">
              Share this meeting link with others you want in the meeting:
            </p>
            <div className="bg-neutral-100 p-3 rounded-xl flex items-center justify-between text-xs text-neutral-800 font-mono mb-4">
              <span className="truncate mr-2">{generatedLink}</span>
              <button
                onClick={handleCopy}
                className="text-blue-600 font-sans font-medium hover:underline shrink-0"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <button
              onClick={() => setActiveMeetingModal(null)}
              className="w-full py-2.5 bg-[#0b57d0] text-white rounded-full text-xs font-medium hover:bg-blue-700"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {activeMeetingModal === 'join' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setActiveMeetingModal(null)}
          />
          <div className="relative bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl z-10 text-left">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-neutral-900 text-base">
                Join with a code
              </h3>
              <button
                onClick={() => setActiveMeetingModal(null)}
                className="p-1 rounded-full text-neutral-500 hover:bg-neutral-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-neutral-500 mb-3">
              Enter the code provided by the meeting organizer:
            </p>
            <label htmlFor="meeting-code-input" className="sr-only">Meeting code</label>
            <input
              id="meeting-code-input"
              type="text"
              value={meetingCode}
              onChange={(e) => setMeetingCode(e.target.value)}
              placeholder="e.g. abc-defg-hij"
              className="w-full p-3 border border-neutral-300 rounded-xl text-sm mb-4 outline-none focus:border-blue-600 font-mono"
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setActiveMeetingModal(null)}
                className="px-4 py-2 text-xs font-medium text-neutral-600 hover:bg-neutral-100 rounded-full"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (meetingCode.trim()) {
                    alert(`Joining meeting: ${meetingCode}`);
                    setActiveMeetingModal(null);
                  }
                }}
                disabled={!meetingCode.trim()}
                className="px-5 py-2 text-xs font-medium bg-[#0b57d0] text-white rounded-full disabled:opacity-50 hover:bg-blue-700"
              >
                Join
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
