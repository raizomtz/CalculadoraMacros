"use client"

import { useState } from "react"
import Link from "next/link"
import CalculadoraProHeader from "@/app/Components/CalculadoraProHeader"

export default function ProPaso1() {
  const [peso, setPeso] = useState("")
  const [grasa, setGrasa] = useState("")

  const guardarDatos = () => {
    if (!peso || !grasa) {
      alert("Por favor completa todos los campos")
      return false
    }
    
    const grasaNum = parseFloat(grasa)
    if (grasaNum < 5 || grasaNum > 50) {
      alert("El % de grasa no parece realista (debe estar entre 5% y 50%)")
      return false
    }
    
    localStorage.setItem("pro_peso", peso)
    localStorage.setItem("pro_grasa", grasa)
    return true
  }

  const handleSiguiente = (e: React.MouseEvent) => {
    if (!guardarDatos()) {
      e.preventDefault()
    }
  }

  return (
    <div className="bg-[#0f172a] min-h-screen text-white p-6">
      <div className="max-w-md mx-auto">
        <CalculadoraProHeader pasoActual={1} totalPasos={3} />

        <h2 className="text-xl font-bold italic uppercase mb-6">
          Datos de precisión
        </h2>

        <div className="space-y-4 mb-8">
          <input
            placeholder="Peso (kg) - ej: 75.5"
            type="number"
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            className="w-full p-4 rounded-xl bg-gray-800 outline-none text-white"
          />
          <input
            placeholder="% Grasa corporal - ej: 15"
            type="number"
            value={grasa}
            onChange={(e) => setGrasa(e.target.value)}
            className="w-full p-4 rounded-xl bg-gray-800 outline-none text-white"
          />
          <p className="text-xs text-gray-500">
            El % de grasa debe estar entre 5% y 50%
          </p>
        </div>

        <Link
          href="/Pro/paso2"
          onClick={handleSiguiente}
          className="w-full bg-red-600 text-white font-bold p-5 rounded-2xl uppercase active:scale-95 transition-all text-center block"
        >
          Siguiente
        </Link>
      </div>
    </div>
  )
}