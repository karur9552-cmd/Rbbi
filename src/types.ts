export interface Email {
  id: string;
  sender: string;
  senderEmail: string;
  toEmail?: string;
  avatarImage?: string;
  avatarText?: string;
  avatarColor?: string;
  avatarIcon?: 'user' | 'info' | 'tag' | 'mail';
  subject: string;
  snippet: string;
  body: string;
  time: string;
  unread: boolean;
  starred: boolean;
  category?: 'primary' | 'updates' | 'promotions' | 'social';
  isCategoryRow?: boolean;
  categoryType?: 'updates' | 'promotions' | 'social';
  badge?: {
    text: string;
    bgColor: string;
    textColor: string;
  };
  labels?: string[];
  dateDetail?: string;
}

export type ActiveTab = 'mail' | 'meet';
export type ActiveCategory = 'primary' | 'updates' | 'promotions' | 'social' | 'starred' | 'sent' | 'all';
