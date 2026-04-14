"use client";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export function Switch({ checked, onChange, label }: SwitchProps) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      {label && (
        <span className="text-xs font-bold uppercase tracking-wider text-gray-400 group-hover:text-gray-200 transition-colors">
          {label}
        </span>
      )}
      <div 
        className="relative"
        onClick={() => onChange(!checked)}
      >
        <div className={`w-10 h-5 rounded-full transition-all duration-300 border ${
          checked 
            ? "bg-accent/20 border-accent/50 shadow-[0_0_10px_rgba(249,115,22,0.2)]" 
            : "bg-surface-2 border-border"
        }`}>
          <div className={`absolute top-1 left-1 w-3 h-3 rounded-full transition-all duration-300 transform ${
            checked 
              ? "translate-x-5 bg-accent shadow-[0_0_8px_rgba(249,115,22,0.6)]" 
              : "bg-gray-500"
          }`} />
        </div>
      </div>
    </label>
  );
}
