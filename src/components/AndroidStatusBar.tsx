interface AndroidStatusBarProps {
  time?: string;
}

export function AndroidStatusBar({ time = '10:18' }: AndroidStatusBarProps) {
  return (
    <div className="w-full flex items-center justify-between px-5 pt-3 pb-2 text-neutral-800 text-[12.5px] font-medium tracking-tight select-none">
      {/* Time */}
      <span className="font-semibold text-[13px] text-neutral-900">{time}</span>

      {/* Network & Battery Indicators */}
      <div className="flex items-center gap-1.5 text-neutral-700">
        {/* VoLTE */}
        <div className="flex flex-col items-center leading-none text-[8px] font-bold text-neutral-700">
          <span>Vo))</span>
          <span>LTE</span>
        </div>

        {/* Network Speed */}
        <span className="text-[9.5px] font-medium leading-none text-neutral-600 px-0.5">
          0.00 <span className="text-[7.5px] block font-normal">KB/s</span>
        </span>

        {/* 5G icon */}
        <span className="text-[9.5px] font-bold tracking-tight text-neutral-800 ml-0.5">
          5G
        </span>

        {/* Signal Bars */}
        <div className="flex items-end gap-[1.5px] h-3 ml-0.5" title="Signal strength: 4 bars">
          <div className="w-[2.5px] h-1 bg-neutral-800 rounded-[0.5px]"></div>
          <div className="w-[2.5px] h-1.5 bg-neutral-800 rounded-[0.5px]"></div>
          <div className="w-[2.5px] h-2 bg-neutral-800 rounded-[0.5px]"></div>
          <div className="w-[2.5px] h-2.5 bg-neutral-800 rounded-[0.5px]"></div>
        </div>

        {/* Battery with percentage */}
        <div className="flex items-center gap-0.5 ml-1">
          <div className="relative w-[18px] h-[9.5px] border border-neutral-700 rounded-[2px] p-[1px] flex items-center">
            <div className="h-full w-[60%] bg-neutral-800 rounded-[1px]"></div>
            <div className="absolute -right-[2.5px] top-[2px] w-[1.5px] h-[3.5px] bg-neutral-700 rounded-r-[0.5px]"></div>
          </div>
          <span className="text-[10px] font-medium text-neutral-800 ml-0.5">60%</span>
        </div>
      </div>
    </div>
  );
}
