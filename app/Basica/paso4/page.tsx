"use client"

import { useState } from "react"
import Link from "next/link"
import CalculadoraHeader from "@/app/Components/CalculadoraHeader"

export default function BasicaPaso4() {
  const [objetivo, setObjetivo] = useState("perder")

  const guardarObjetivo = () => {
    localStorage.setItem("basica_objetivo", objetivo)
  }

  return (
    <div className="bg-[#0f172a] min-h-screen text-white p-6">
      <div className="max-w-md mx-auto">
        <CalculadoraHeader titulo="Básica" pasoActual={4} />

        <h2 className="text-xl font-bold italic uppercase text-center mb-6">
          TU META FINAL
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
            href="/Basica/paso3"
            className="w-1/3 bg-gray-700 p-5 rounded-2xl font-bold active:scale-95 text-center"
          >
            Atrás
          </Link>

          {/* CORREGIDO: w-2/3 en lugar de w-full */}
          <Link
            href="/Basica/resultado"
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