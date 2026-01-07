import { useState } from 'react';
import { Moon, Sun, Plus } from 'lucide-react';
import { AppCard } from './components/AppCard';
import { microApps } from './config/apps';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen w-full relative flex flex-col">
        <div
          className="fixed inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000&auto=format&fit=crop)',
          }}
        />
        <div className="fixed inset-0 bg-slate-800/25 dark:bg-black/35 backdrop-blur-[1px]" />

        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="fixed top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-sm bg-white/95 dark:bg-neutral-800/95 backdrop-blur-sm border border-slate-300 dark:border-neutral-700 text-slate-600 dark:text-neutral-400 hover:text-slate-800 dark:hover:text-neutral-200 hover:border-slate-400 dark:hover:border-neutral-600 transition-colors z-20 shadow-lg"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? <Sun className="w-5 h-5" strokeWidth={1.5} /> : <Moon className="w-5 h-5" strokeWidth={1.5} />}
        </button>

        <a
          href="https://example.com/request-integration"
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 px-3 py-2 sm:px-4 sm:py-2 rounded-sm bg-white/95 dark:bg-neutral-800/95 backdrop-blur-sm border border-slate-300 dark:border-neutral-700 text-slate-600 dark:text-neutral-400 hover:text-slate-800 dark:hover:text-neutral-200 hover:border-slate-400 dark:hover:border-neutral-600 transition-colors z-20 flex items-center gap-2 text-xs sm:text-sm font-medium shadow-lg"
          aria-label="Request integration"
        >
          <Plus className="w-4 h-4" strokeWidth={1.5} />
          <span className="hidden sm:inline">Request Integration</span>
        </a>
        <div className="flex flex-col items-center justify-center flex-1 px-4 py-8 sm:px-8 sm:py-12 md:px-12 md:py-16 relative z-10">
           <div className="mb-8 sm:mb-12 md:mb-16 flex flex-col items-center gap-3 sm:gap-4 md:gap-6">
           <div className="h-32 sm:h-40 md:h-48 flex items-center justify-center">
              <img 
                src="/SIGEM1.1/LOGOSIGEM.svg" 
                alt="SIGEM" 
                className="h-full w-auto max-w-full object-contain drop-shadow-2xl"
                style={{ backgroundColor: 'transparent',
                  mixBlendMode: 'multiply'
                  }}
              />
            </div>
          </div>
      

          <div className="w-full max-w-4xl px-2 sm:px-0">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
              {microApps.map((app) => (
                <AppCard key={app.id} app={app} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
