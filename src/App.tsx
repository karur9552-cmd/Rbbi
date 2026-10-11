/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useState } from 'react';
import userAvatar from './assets/images/gmail_user_avatar_1791694056292.jpg';
import { AccountSwitcherModal } from './components/AccountSwitcherModal';
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

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2800);
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

      // Default: 'primary' includes primary emails and category group headers
      return true;
    });
  }, [emails, searchQuery, activeCategory]);

  return (
    <div className="w-full h-[100dvh] max-h-[100dvh] flex flex-col bg-[#f8f9fa] overflow-hidden select-none antialiased">
      {/* Top Search Bar (Absolute Top of the Application) */}
      {!selectedEmail && (
        <div className="pt-2 shrink-0">
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onOpenDrawer={() => setIsDrawerOpen(true)}
            onOpenAccount={() => setIsAccountOpen(true)}
            avatarUrl={userAvatar}
            isSearching={isSearching}
            setIsSearching={setIsSearching}
          />
        </div>
      )}

      {/* Main Content Area */}
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
            <div className="px-4 pt-2 pb-1.5 flex items-center justify-between select-none shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-[14px] font-medium text-neutral-600 tracking-tight">
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

            {/* Email List */}
            <div className="flex-1 overflow-y-auto divide-y divide-neutral-100/40">
              {filteredEmails.length === 0 ? (
                <div className="py-20 text-center text-neutral-400 select-none">
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
        <div className="shrink-0 pb-[env(safe-area-inset-bottom,0px)]">
          <BottomNav
            activeTab={activeTab}
            onChangeTab={setActiveTab}
            unreadCount="99+"
          />
        </div>
      )}

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
        <div className="fixed bottom-20 z-50 left-1/2 -translate-x-1/2 bg-neutral-900/95 text-white px-5 py-2.5 rounded-full text-xs font-medium shadow-xl backdrop-blur-xs flex items-center gap-2 animate-bounce">
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
