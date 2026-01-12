import { Plus } from 'lucide-react';
import { AppCard } from './components/AppCard';
import { AuthGuard } from './components/AuthGuard';
import { microApps } from './config/apps';

function App() {
  // Función para verificar si estamos en las fechas importantes
  const isImportantDate = () => {
    const now = new Date();
    const month = now.getMonth(); // 0 = enero, 1 = febrero, etc.
    const day = now.getDate();
    
    // Todo enero (month === 0) o 27 de febrero (month === 1 && day === 27)
    return month === 0 || (month === 1 && day === 27);
  };

  const shouldBlinkCalendarios = isImportantDate();

  return (
    <AuthGuard>
      <div>
        <div className="min-h-screen w-full relative flex flex-col">
        <div
          className="fixed inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/SIGEM1.1/MapaRelieve.svg)',
          }}
        />
        {/* Logo en esquina superior derecha */}
        <a 
          href="https://www.inhgeomin.gob.hn/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="fixed top-4 right-4 sm:top-6 sm:right-6 z-20"
        >
          <img 
            src="/SIGEM1.1/LogoINHGEOMIN.svg" 
            alt="INHGEOMIN" 
            className="h-8 w-auto sm:h-10 md:h-12 hover:opacity-80 transition-opacity"
          />
        </a>
        <a
          href="https://example.com/request-integration"
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 px-2 py-1.5 sm:px-3 sm:py-2 rounded-sm bg-white/95 backdrop-blur-sm border border-slate-300 text-slate-600 hover:text-slate-800 hover:border-slate-400 transition-colors z-20 flex items-center gap-1.5 text-xs font-medium shadow-lg"
          aria-label="Request integration"
        >
          <Plus className="w-3 h-3" strokeWidth={1.5} />
          <span className="hidden sm:inline">Request Integration</span>
        </a>
        <div className="flex flex-col items-center justify-center flex-1 px-4 py-4 sm:px-8 sm:py-6 md:px-12 md:py-8 relative z-10">
          <div className="mb-4 sm:mb-6 md:mb-8 flex flex-col items-center gap-3 sm:gap-4 md:gap-6">
            <div className="h-32 sm:h-40 md:h-48 flex items-center justify-center">
              <img 
                src="/SIGEM1.1/LOGOSIGEM.svg" 
                alt="SIGEM" 
                className="h-full w-auto max-w-full object-contain drop-shadow-2xl"
                style={{ 
                  backgroundColor: 'transparent',
                  mixBlendMode: 'multiply'
                }}
              />
            </div>

          </div>

          <div className="w-full max-w-full px-1 sm:px-2">
            <div className="grid grid-cols-3 md:grid-cols-9 gap-2 sm:gap-2.5 md:gap-3">
              {microApps.map((app) => (
                <AppCard 
                  key={app.id} 
                  app={app} 
                  shouldBlink={app.id === 'app-4' && shouldBlinkCalendarios}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </AuthGuard>
  );
}

export default App;