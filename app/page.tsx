import Link from 'next/link';
import Image from 'next/image';

export default function Menu() {
  return (
    //p-6 flex flex-col items-center justify-center min-h-screen bg-[#0f172a] text-white font-sans
    <main className="p-6 flex flex-col items-center justify-center min-h-screen bg-[#0f172a] text-white font-sans overflow-hidden">
      
      <div className="max-w-md w-full mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 text-center">
        
        {/* Header: FITNESS GYM */}
        <div className="mb-10">
          
          {/* 🔥 CONTENEDOR FLEX */}
          <div className="flex items-center justify-center gap-3">
            
            {/* 🖼️ IMAGEN */}
           <span className="text-4xl drop-shadow-md">
            💀
           </span>

            {/* 📝 TITULO */}
            <h1 className="text-4xl font-black italic tracking-tighter uppercase leading-none">
              FITNESS <span className="text-red-600">GYM</span>
            </h1>

          </div>

          <p className="text-zinc-500 mt-2 font-bold uppercase text-[10px] tracking-[0.2em]">
            Calculadora de Macros
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-5 mt-2">
          
          <div className="flex flex-col">
            <Link 
              href="/Basica" 
              className="bg-[#1e293b] border-4 border-yellow-500 rounded-[25px] py-8 px-2 flex flex-col items-center justify-center transition-all active:scale-90 shadow-[0_10px_20px_rgba(0,0,0,0.3)]"
            >
              <span className="text-[2.8rem] mb-2">💪🏼</span>
              <span className="font-black text-sm uppercase italic tracking-wider text-white">
                Básica
              </span>
            </Link>
            <p className="text-[0.7rem] text-[#94a3b8] mt-2 uppercase font-semibold leading-tight">
              Usa esta si solo sabes <br />
              <span className="text-white">peso y estatura</span>
            </p>
          </div>

          <div className="flex flex-col">
            <Link 
              href="/Pro" 
              className="bg-[#1e293b] border-4 border-yellow-500 rounded-[25px] py-8 px-2 flex flex-col items-center justify-center transition-all active:scale-90 shadow-[0_10px_20px_rgba(0,0,0,0.3)]"
            >
              <span className="text-[2.8rem] mb-2">⚡</span>
              <span className="font-black text-sm uppercase italic tracking-wider text-white">
                Pro
              </span>
            </Link>
            <p className="text-[0.7rem] text-[#94a3b8] mt-2 uppercase font-semibold leading-tight">
              Usa esta si sabes tu <br />
              <span className="text-white">% de grasa y peso</span>
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-20">
          <p className="text-[9px] text-zinc-600 uppercase tracking-[0.4em] font-black italic">
            powered by Ikigai Software & Automations
          </p>
        </div>

      </div>
    </main>
  );
}