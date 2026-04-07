"use client"

import Link from "next/link"

export default function CalculadoraHeader({ 
  titulo, 
  pasoActual, 
  totalPasos = 4 
}: { 
  titulo: string
  pasoActual: number
  totalPasos?: number 
}) {
  return (
    <div className="mb-8">
      
      {/* Título centrado */}
      <h1 className="text-2xl font-black italic text-center">
        Calculadora <span className="text-red-600">{titulo}</span>
      </h1>

      {/* Steps centrados */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: totalPasos }, (_, i) => i + 1).map(i => (
          <div
            key={i}
            className={`w-8 h-1 rounded-full transition-all ${
              i <= pasoActual ? "bg-red-600" : "bg-gray-700"
            }`}
          />
        ))}
      </div>
      
      {/* Botón Volver - debajo de steps, a la izquierda y con más espacio arriba */}
      <Link 
        href="/" 
        className="text-gray-400 text-sm font-bold uppercase hover:text-white inline-flex items-center gap-1 mt-8"
      >
        ← Volver al menú
      </Link>
      
    </div>
  )
}