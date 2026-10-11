interface AndroidNavBarProps {
  onBack?: () => void;
  onHome?: () => void;
  onRecent?: () => void;
}

export function AndroidNavBar({ onBack, onHome, onRecent }: AndroidNavBarProps) {
  return (
    <div className="w-full h-11 bg-neutral-100/90 border-t border-neutral-200/60 flex items-center justify-around px-6 select-none shrink-0">
      {/* Recent apps: Three horizontal lines */}
      <button
        onClick={onRecent}
        className="p-2 text-neutral-600 hover:text-neutral-900 active:opacity-60 transition-opacity"
        title="Recent apps"
        aria-label="Recent apps"
      >
        <div className="flex flex-col gap-[3px] w-4">
          <div className="h-[2px] bg-neutral-600 rounded-full w-full"></div>
          <div className="h-[2px] bg-neutral-600 rounded-full w-full"></div>
          <div className="h-[2px] bg-neutral-600 rounded-full w-full"></div>
        </div>
      </button>

      {/* Home button: Circle */}
      <button
        onClick={onHome}
        className="p-2 text-neutral-600 hover:text-neutral-900 active:opacity-60 transition-opacity"
        title="Home"
        aria-label="Home"
      >
        <div className="w-4 h-4 rounded-full border-2 border-neutral-600"></div>
      </button>

      {/* Back button: Left chevron / bracket */}
      <button
        onClick={onBack}
        className="p-2 text-neutral-600 hover:text-neutral-900 active:opacity-60 transition-opacity"
        title="Back"
        aria-label="Back"
      >
        <svg className="w-4 h-4 text-neutral-600 fill-current" viewBox="0 0 24 24">
          <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
        </svg>
      </button>

      {/* Accessibility human icon on right */}
      <button
        className="p-2 text-neutral-600 hover:text-neutral-900 active:opacity-60 transition-opacity"
        title="Accessibility"
        aria-label="Accessibility"
      >
        <svg className="w-4 h-4 text-neutral-600 fill-current" viewBox="0 0 24 24">
          <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z" />
        </svg>
      </button>
    </div>
  );
}
