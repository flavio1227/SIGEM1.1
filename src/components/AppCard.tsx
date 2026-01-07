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
      className="group relative aspect-square bg-white/95 dark:bg-neutral-800/95 backdrop-blur-sm rounded p-4 sm:p-6 border border-slate-300 dark:border-neutral-700 hover:bg-white dark:hover:bg-neutral-700 hover:border-slate-400 dark:hover:border-neutral-600 flex flex-col items-center justify-center gap-2 sm:gap-3 transition-all active:scale-95 shadow-lg hover:shadow-xl"
      aria-label={`Launch ${app.title}`}
    >
      <div className="text-slate-500 dark:text-neutral-400 group-hover:text-slate-700 dark:group-hover:text-neutral-200 transition-colors">
        {IconComponent && <IconComponent className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={1.5} />}
      </div>
      <div className="text-center">
        <h3 className="text-[10px] sm:text-xs font-medium text-slate-700 dark:text-neutral-300 uppercase tracking-wider leading-tight px-1">
          {app.title}
        </h3>
      </div>
    </button>
  );
}
