/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useState } from 'react';
import userAvatar from './assets/images/gmail_user_avatar_1791694056292.jpg';
import { AccountSwitcherModal } from './components/AccountSwitcherModal';
import { AndroidNavBar } from './components/AndroidNavBar';
import { AndroidStatusBar } from './components/AndroidStatusBar';
import { BottomNav } from './components/BottomNav';
import { CategoryItem } from './components/CategoryItem';
import { ComposeFab } from './components/ComposeFab';
import { ComposeModal } from './components/ComposeModal';
import { EmailDetailView } from './components/EmailDetailView';
import { EmailItem } from './components/EmailItem';
import { MeetView } from './components/MeetView';
import { NavigationDrawer } from './components/NavigationDrawer';
import { SearchBar } from './components/SearchBar';
import { INITIAL_EMAILS } from './data/mockEmails';
import { ActiveCategory, ActiveTab, Email } from './types';
import { RotateCcw, Smartphone, Maximize2 } from 'lucide-react';

export default function App() {
  const [emails, setEmails] = useState<Email[]>(INITIAL_EMAILS);
  const [activeTab, setActiveTab] = useState<ActiveTab>('mail');
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>('primary');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [deviceFrameMode, setDeviceFrameMode] = useState<boolean>(true);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2800);
  };

  // Reset back to the exact initial screenshot state
  const handleReset = () => {
    setEmails(INITIAL_EMAILS);
    setActiveTab('mail');
    setActiveCategory('primary');
    setSearchQuery('');
    setIsSearching(false);
    setSelectedEmail(null);
    showToast('Reset to original screenshot view');
  };

  const handleSelectEmail = (item: Email) => {
    if (item.unread) {
      setEmails((prev) =>
        prev.map((e) => (e.id === item.id ? { ...e, unread: false } : e))
      );
    }
    setSelectedEmail(item);
  };

  // Star / unstar email
  const handleToggleStar = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEmails((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextVal = !item.starred;
          showToast(nextVal ? 'Message starred' : 'Message unstarred');
          return { ...item, starred: nextVal };
        }
        return item;
      })
    );
    if (selectedEmail && selectedEmail.id === id) {
      setSelectedEmail((prev) => (prev ? { ...prev, starred: !prev.starred } : null));
    }
  };

  // Mark unread / read
  const handleToggleUnread = (id: string) => {
    setEmails((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextVal = !item.unread;
          showToast(nextVal ? 'Marked as unread' : 'Marked as read');
          return { ...item, unread: nextVal };
        }
        return item;
      })
    );
    if (selectedEmail && selectedEmail.id === id) {
      setSelectedEmail((prev) => (prev ? { ...prev, unread: !prev.unread } : null));
    }
  };

  // Delete email
  const handleDeleteEmail = (id: string) => {
    setEmails((prev) => prev.filter((item) => item.id !== id));
    if (selectedEmail?.id === id) {
      setSelectedEmail(null);
    }
    showToast('Email moved to Trash');
  };

  // Archive email
  const handleArchiveEmail = (id: string) => {
    setEmails((prev) => prev.filter((item) => item.id !== id));
    if (selectedEmail?.id === id) {
      setSelectedEmail(null);
    }
    showToast('Email archived');
  };

  // Send new composed email
  const handleSendEmail = (newMsg: { to: string; subject: string; body: string }) => {
    const created: Email = {
      id: `email-${Date.now()}`,
      sender: 'Me',
      senderEmail: 'karur9552@gmail.com',
      avatarText: 'K',
      avatarColor: 'bg-[#0b57d0]',
      subject: newMsg.subject,
      snippet: newMsg.body.slice(0, 45) + '...',
      body: newMsg.body,
      time: 'Just now',
      unread: false,
      starred: false,
      category: 'primary',
      dateDetail: 'Just now',
    };
    setEmails((prev) => [created, ...prev]);
    showToast('Sending message... Sent');
  };

  // Filtered emails based on search or category
  const filteredEmails = useMemo(() => {
    return emails.filter((item) => {
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.sender.toLowerCase().includes(q) ||
          item.subject.toLowerCase().includes(q) ||
          item.snippet.toLowerCase().includes(q)
        );
      }

      // Category filter
      if (activeCategory === 'starred') {
        return item.starred;
      }
      if (activeCategory === 'updates') {
        return item.category === 'updates' || item.isCategoryRow;
      }
      if (activeCategory === 'promotions') {
        return item.category === 'promotions' || item.isCategoryRow;
      }
      if (activeCategory === 'social') {
        return item.category === 'social';
      }
      if (activeCategory === 'sent') {
        return item.sender === 'Me';
      }
      if (activeCategory === 'all') {
        return true;
      }

      // Default: 'primary' includes primary emails and category group headers (matching the screenshot!)
      return true;
    });
  }, [emails, searchQuery, activeCategory]);

  // Back action from Android navigation bar
  const handleAndroidBack = () => {
    if (selectedEmail) {
      setSelectedEmail(null);
      return;
    }
    if (isComposeOpen) {
      setIsComposeOpen(false);
      return;
    }
    if (isDrawerOpen) {
      setIsDrawerOpen(false);
      return;
    }
    if (isAccountOpen) {
      setIsAccountOpen(false);
      return;
    }
    if (isSearching) {
      setIsSearching(false);
      setSearchQuery('');
      return;
    }
    if (activeCategory !== 'primary') {
      setActiveCategory('primary');
      return;
    }
    if (activeTab !== 'mail') {
      setActiveTab('mail');
      return;
    }
  };

  const handleAndroidHome = () => {
    setSelectedEmail(null);
    setIsComposeOpen(false);
    setIsDrawerOpen(false);
    setIsAccountOpen(false);
    setIsSearching(false);
    setSearchQuery('');
    setActiveCategory('primary');
    setActiveTab('mail');
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center font-sans antialiased text-neutral-900">
      {/* Top Device & Control Bar */}
      <header className="w-full max-w-xl py-3 px-4 flex items-center justify-between text-neutral-300 border-b border-neutral-800/80 mb-2 select-none">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
          <span className="font-semibold text-sm tracking-tight text-neutral-100">
            Gmail Mobile
          </span>
          <span className="text-xs text-neutral-400 hidden sm:inline">
            (Exact UI Replica)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setDeviceFrameMode((prev) => !prev)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-medium text-neutral-200 transition-colors"
            title="Toggle phone frame mockup"
          >
            {deviceFrameMode ? (
              <>
                <Maximize2 className="w-3.5 h-3.5 text-blue-400" />
                <span className="hidden sm:inline">Expanded</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-blue-400" />
                <span className="hidden sm:inline">Phone Frame</span>
              </>
            )}
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-medium text-neutral-200 transition-colors"
            title="Reset to original screenshot"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </header>

      {/* Main Container / Mobile Device Frame */}
      <main
        className={`w-full flex justify-center transition-all duration-300 ${
          deviceFrameMode ? 'p-0 sm:p-4' : 'p-0'
        }`}
      >
        <div
          className={`relative bg-[#f8f9fa] flex flex-col overflow-hidden shadow-2xl transition-all duration-300 ${
            deviceFrameMode
              ? 'w-full sm:w-[412px] h-[100dvh] sm:h-[860px] sm:rounded-[42px] sm:ring-[10px] sm:ring-neutral-800 sm:border-[3px] sm:border-neutral-900'
              : 'w-full max-w-2xl h-[100dvh] rounded-none'
          }`}
        >
          {/* Smartphone Camera Notch / Punch Hole on Frame */}
          {deviceFrameMode && (
            <div className="hidden sm:flex absolute top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-neutral-900 ring-2 ring-neutral-800 z-50 pointer-events-none items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-neutral-950" />
            </div>
          )}

          {/* Android Status Bar (10:14, VoLTE, 0.00 KB/s, 5G, 60% battery) */}
          <AndroidStatusBar />

          {/* Search Bar matching screenshot */}
          {!selectedEmail && (
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onOpenDrawer={() => setIsDrawerOpen(true)}
              onOpenAccount={() => setIsAccountOpen(true)}
              avatarUrl={userAvatar}
              isSearching={isSearching}
              setIsSearching={setIsSearching}
            />
          )}

          {/* Body Content Area */}
          <div className="flex-1 flex flex-col overflow-hidden relative">
            {selectedEmail ? (
              /* Email Detail Screen */
              <EmailDetailView
                email={selectedEmail}
                onBack={() => setSelectedEmail(null)}
                onDelete={handleDeleteEmail}
                onArchive={handleArchiveEmail}
                onToggleStar={handleToggleStar}
                onToggleUnread={handleToggleUnread}
              />
            ) : activeTab === 'meet' ? (
              /* Google Meet Tab Screen */
              <MeetView />
            ) : (
              /* Mail Inbox Screen */
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Category Section Header ("Primary") */}
                <div className="px-4 pt-1.5 pb-1 flex items-center justify-between select-none shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[13.5px] font-medium text-neutral-600 tracking-tight">
                      {activeCategory === 'primary'
                        ? 'Primary'
                        : activeCategory === 'updates'
                        ? 'Updates'
                        : activeCategory === 'promotions'
                        ? 'Promotions'
                        : activeCategory === 'social'
                        ? 'Social'
                        : activeCategory === 'starred'
                        ? 'Starred'
                        : activeCategory === 'sent'
                        ? 'Sent'
                        : 'All Inboxes'}
                    </span>
                    {activeCategory !== 'primary' && (
                      <button
                        onClick={() => setActiveCategory('primary')}
                        className="text-xs text-blue-600 hover:underline"
                      >
                        (Back to Primary)
                      </button>
                    )}
                  </div>

                  {searchQuery && (
                    <span className="text-xs text-neutral-500">
                      {filteredEmails.length} results
                    </span>
                  )}
                </div>

                {/* Email List matching screenshot order */}
                <div className="flex-1 overflow-y-auto divide-y divide-neutral-100/40">
                  {filteredEmails.length === 0 ? (
                    <div className="py-16 text-center text-neutral-400 select-none">
                      <p className="text-sm">No messages found</p>
                    </div>
                  ) : (
                    filteredEmails.map((email) => {
                      if (email.isCategoryRow) {
                        return (
                          <CategoryItem
                            key={email.id}
                            email={email}
                            onSelectCategory={(cat) => setActiveCategory(cat)}
                          />
                        );
                      }
                      return (
                        <EmailItem
                          key={email.id}
                          email={email}
                          onSelect={handleSelectEmail}
                          onToggleStar={handleToggleStar}
                        />
                      );
                    })
                  )}
                </div>

                {/* Floating Action Button "Compose" */}
                <ComposeFab onClick={() => setIsComposeOpen(true)} />
              </div>
            )}
          </div>

          {/* Material Bottom Navigation Bar (Mail, Meet) */}
          {!selectedEmail && (
            <BottomNav
              activeTab={activeTab}
              onChangeTab={setActiveTab}
              unreadCount="99+"
            />
          )}

          {/* Bottom Android System Navigation Bar (≡, ○, <, human icon) */}
          <AndroidNavBar
            onBack={handleAndroidBack}
            onHome={handleAndroidHome}
            onRecent={() => showToast('Recent apps')}
          />
        </div>
      </main>

      {/* Slide-out Navigation Drawer */}
      <NavigationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setSelectedEmail(null);
        }}
      />

      {/* Account Switcher Modal */}
      <AccountSwitcherModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        avatarUrl={userAvatar}
      />

      {/* Compose Email Modal */}
      <ComposeModal
        isOpen={isComposeOpen}
        onClose={() => setIsComposeOpen(false)}
        onSend={handleSendEmail}
      />

      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-14 z-50 left-1/2 -translate-x-1/2 bg-neutral-900/95 text-white px-5 py-2.5 rounded-full text-xs font-medium shadow-xl backdrop-blur-xs flex items-center gap-2 animate-bounce">
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
