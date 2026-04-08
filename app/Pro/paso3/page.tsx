"use client"

import { useState } from "react"
import Link from "next/link"
import CalculadoraProHeader from "@/app/Components/CalculadoraProHeader"

export default function ProPaso3() {
  const [objetivo, setObjetivo] = useState("perder")

  const guardarObjetivo = () => {
    localStorage.setItem("pro_objetivo", objetivo)
  }

  return (
    <div className="bg-[#0f172a] min-h-screen text-white p-6">
      <div className="max-w-md mx-auto">
        <CalculadoraProHeader pasoActual={3} totalPasos={3} />

        <h2 className="text-xl font-bold italic uppercase text-center mb-6">
          Tu meta final
        </h2>

        <select
          value={objetivo}
          onChange={(e) => setObjetivo(e.target.value)}
          className="w-full p-4 rounded-xl bg-gray-800 outline-none mb-8"
        >
          <option value="perder">Perder Grasa (Definición)</option>
          <option value="recomposicion">Recomposición (Gana músculo / pierde grasa)</option>
          <option value="ganar">Ganar Masa Muscular (Volumen)</option>
        </select>

        <div className="flex gap-2">
          <Link
            href="/Pro/paso2"
            className="w-1/3 bg-gray-700 p-5 rounded-2xl font-bold active:scale-95 text-center"
          >
            Atrás
          </Link>
          <Link
            href="/Pro/resultado"
            onClick={guardarObjetivo}
            className="w-2/3 bg-red-600 text-white font-bold p-5 rounded-2xl uppercase active:scale-95 text-center"
          >
            Calcular
          </Link>
        </div>
      </div>
    </div>
  )
}