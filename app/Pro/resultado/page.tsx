"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Modal from "@/app/Components/Modal"

export default function ProResultado() {
  const [resultados, setResultados] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const calcularResultados = () => {
      try {
        // Recuperar datos
        const peso = parseFloat(localStorage.getItem("pro_peso") || "0")
        const grasa = parseFloat(localStorage.getItem("pro_grasa") || "0")
        const actividad = parseFloat(localStorage.getItem("pro_actividad") || "1.2")
        const objetivo = localStorage.getItem("pro_objetivo") || "perder"

        // Validar datos
        if (peso === 0 || grasa === 0) {
          alert("Faltan datos. Por favor completa todos los pasos.")
          window.location.href = "/Pro/paso1"
          return
        }

        // Katch-McArdle
        const masaMagra = peso * (1 - grasa / 100)
        let calorias = 370 + (21.6 * masaMagra)
        calorias *= actividad

        // Ajuste por objetivo
        if (objetivo === "perder") calorias *= 0.8
        if (objetivo === "ganar") calorias *= 1.15

        calorias = Math.round(calorias)

        // Macros según objetivo
        let proteinas = 0
        let grasasMacro = 0

        if (objetivo === "perder") {
          proteinas = peso * 2.3
          grasasMacro = peso * 0.7
        } else if (objetivo === "recomposicion") {
          proteinas = peso * 2.2
          grasasMacro = peso * 0.8
        } else {
          proteinas = peso * 1.8
          grasasMacro = peso * 1
        }

        proteinas = Math.round(proteinas)
        grasasMacro = Math.round(grasasMacro)

        const caloriasRestantes = calorias - (proteinas * 4 + grasasMacro * 9)
        const carbs = Math.round(caloriasRestantes / 4)

        setResultados({
          calorias,
          p: proteinas,
          c: carbs,
          g: grasasMacro
        })
        setLoading(false)

      } catch (err) {
        console.error("Error:", err)
        setLoading(false)
      }
    }

    calcularResultados()
  }, [mounted])

  if (!mounted || loading) {
    return (
      <div className="bg-[#0f172a] min-h-screen text-white p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4">Calculando...</p>
        </div>
      </div>
    )
  }

  if (!resultados) {
    return (
      <div className="bg-[#0f172a] min-h-screen text-white p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="mb-4">No se pudieron calcular los resultados</p>
          <Link href="/Pro/paso1" className="text-red-600 underline">
            Volver a empezar
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#0f172a] min-h-screen text-white p-6">
      <div className="max-w-md mx-auto">
        
        <div className="mb-8">
          <Link 
            href="/" 
            className="text-gray-400 text-sm font-bold uppercase hover:text-white inline-flex items-center gap-1 mb-6"
          >
            ← Volver al menú
          </Link>
          <h1 className="text-2xl font-black italic text-center">
            Tus <span className="text-red-600">Resultados</span>
          </h1>
        </div>

        <div className="space-y-6">
          <div className="text-center p-8 bg-yellow-500 rounded-3xl text-black">
            <p className="font-bold uppercase text-xs tracking-widest opacity-70">
              Consumo Diario Sugerido
            </p>
            <h2 className="text-6xl font-black">{resultados.calorias}</h2>
            <p className="font-bold uppercase">Calorías</p>
          </div>

          <div className="grid gap-3">
            <div className="bg-gray-800 p-5 rounded-2xl flex justify-between border-l-4 border-blue-500">
              <span>🥩 Proteínas</span>
              <b>{resultados.p}g</b>
            </div>
            <div className="bg-gray-800 p-5 rounded-2xl flex justify-between border-l-4 border-green-500">
              <span>🍚 Carbohidratos</span>
              <b>{resultados.c}g</b>
            </div>
            <div className="bg-gray-800 p-5 rounded-2xl flex justify-between border-l-4 border-red-500">
              <span>🥑 Grasas</span>
              <b>{resultados.g}g</b>
            </div>
          </div>

          <Link
            href="/"
            className="w-full text-gray-400 text-sm font-bold uppercase py-4 hover:text-white transition-colors text-center block"
          >
            ← Nueva Estimación
          </Link>

          <p
            onClick={() => setShowModal(true)}
            className="text-xs text-gray-500 text-center px-4 italic cursor-pointer underline mt-4 hover:text-gray-400 transition-colors"
          >
            Este cálculo es más preciso, pero sigue siendo una estimación.{" "}
            <span className="text-red-500 font-bold">
              Haz clic aquí para saber más.
            </span>
          </p>
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="¿Por qué sigue siendo una estimación?"
      >
        <div className="text-sm text-gray-300 space-y-3">
          <p><b>• % Grasa:</b> Puede tener error según la báscula.</p>
          <p><b>• Hidratación:</b> Afecta la medición corporal.</p>
          <p><b>• Adaptación metabólica:</b> Tu cuerpo cambia con el tiempo.</p>
          <p><b>• Precisión clínica:</b> Solo métodos como DEXA son exactos.</p>
        </div>
      </Modal>
    </div>
  )
}