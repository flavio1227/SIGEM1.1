import { MicroApp } from '../types/app';
import * as Icons from 'lucide-react';

interface AppCardProps {
  app: MicroApp;
}

export function AppCard({ app }: AppCardProps) {
  const IconComponent = Icons[app.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;

  const handleClick = () => {
    window.location.href = app.url;
  };

  return (
    <button
      onClick={handleClick}
      className="group relative w-20 h-20 sm:w-24 sm:h-24 bg-white/95 backdrop-blur-sm rounded p-3 sm:p-4 border border-slate-300 hover:bg-white hover:border-slate-400 flex flex-col items-center justify-center gap-1.5 sm:gap-2 transition-all active:scale-95 shadow-lg hover:shadow-xl"
      aria-label={`Launch ${app.title}`}
    >
      <div className="text-slate-500 group-hover:text-slate-700 transition-colors">
        {IconComponent && <IconComponent className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={1.5} />}
      </div>
      <div className="text-center">
        <h3 className="text-[9px] sm:text-[10px] font-medium text-slate-700 uppercase tracking-wider leading-tight px-1">
          {app.title}
        </h3>
      </div>
    </button>
  );
}
