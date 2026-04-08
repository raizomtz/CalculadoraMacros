"use client"

import { useState } from "react"
import Link from "next/link"
import CalculadoraProHeader from "@/app/Components/CalculadoraProHeader"

export default function ProPaso2() {
  const [actividad, setActividad] = useState("1.2")

  const guardarActividad = () => {
    localStorage.setItem("pro_actividad", actividad)
  }

  // Mapa de textos para mostrar
  const actividadTexto: Record<string, string> = {
    "1.2": "Sedentario (no entrenas)",
    "1.375": "Ligero (1-2 días gym)",
    "1.55": "Moderado (3-4 días)",
    "1.725": "Alto (5-6 días)",
    "1.9": "Muy alto (entrenamiento intenso)"
  }

  return (
    <div className="bg-[#0f172a] min-h-screen text-white p-6">
      <div className="max-w-md mx-auto">
        <CalculadoraProHeader pasoActual={2} totalPasos={3} />

        <h2 className="text-xl font-bold italic uppercase text-center mb-6">
          Nivel de actividad
        </h2>

        <select
          value={actividad}
          onChange={(e) => setActividad(e.target.value)}
          className="w-full p-4 rounded-xl bg-gray-800 outline-none mb-8"
        >
          <option value="1.2">Sedentario (no entrenas)</option>
          <option value="1.375">Ligero (1-2 días gym)</option>
          <option value="1.55">Moderado (3-4 días)</option>
          <option value="1.725">Alto (5-6 días)</option>
          <option value="1.9">Muy alto (entrenamiento intenso)</option>
        </select>

        <div className="flex gap-2">
          <Link
            href="/Pro/paso1"
            className="w-1/3 bg-gray-700 p-5 rounded-2xl font-bold active:scale-95 text-center"
          >
            Atrás
          </Link>
          <Link
            href="/Pro/paso3"
            onClick={guardarActividad}
            className="w-2/3 bg-red-600 text-white font-bold p-5 rounded-2xl uppercase active:scale-95 text-center"
          >
            Siguiente
          </Link>
        </div>
      </div>
    </div>
  )
}