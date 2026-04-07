"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Modal from "@/app/Components/Modal"

export default function BasicaResultado() {
  const [resultados, setResultados] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Pequeño delay para asegurar que sessionStorage esté disponible
    const calcularResultados = () => {
      try {
        // Recuperar todos los datos
        const genero = localStorage.getItem("basica_genero") || "hombre"
        const peso = parseFloat(localStorage.getItem("basica_peso") || "0")
        const altura = parseFloat(localStorage.getItem("basica_altura") || "0")
        const edad = parseInt(localStorage.getItem("basica_edad") || "0")
        const estiloVida = localStorage.getItem("basica_estiloVida") || "sedentario"
        const objetivo = localStorage.getItem("basica_objetivo") || "perder"

        console.log("Datos recuperados:", { genero, peso, altura, edad, estiloVida, objetivo })

        // Validar que tenemos datos
        if (peso === 0 || altura === 0 || edad === 0) {
          console.error("Faltan datos")
          // Redirigir al paso 2 si faltan datos
          window.location.href = "/Basica/paso2"
          return
        }

        // Calcular
        let tmb = genero === "hombre"
          ? 10 * peso + 6.25 * altura - 5 * edad + 5
          : 10 * peso + 6.25 * altura - 5 * edad - 161

        const actividadMap: any = {
          sedentario: 1.2,
          activo: 1.55,
          muy_activo: 1.75,
        }

        let calorias = tmb * actividadMap[estiloVida]

        if (objetivo === "perder") calorias *= 0.8
        if (objetivo === "ganar") calorias *= 1.15

        calorias = Math.round(calorias)

        const proteinas = Math.round(peso * 2)
        const grasas = Math.round(peso * 0.8)
        const caloriasRestantes = calorias - (proteinas * 4 + grasas * 9)
        const carbs = Math.round(caloriasRestantes / 4)

        setResultados({ calorias, p: proteinas, c: carbs, g: grasas })
      } catch (error) {
        console.error("Error al calcular:", error)
      } finally {
        setLoading(false)
      }
    }

    calcularResultados()
  }, [])

  if (loading) {
    return (
      <div className="bg-[#0f172a] min-h-screen text-white p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl mb-4">Calculando...</div>
          <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    )
  }

  if (!resultados) {
    return (
      <div className="bg-[#0f172a] min-h-screen text-white p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="mb-4">Error al calcular los resultados</p>
          <Link href="/Basica/paso1" className="text-red-600 underline">
            Volver a empezar
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#0f172a] min-h-screen text-white p-6">
      <div className="max-w-md mx-auto">
        
        {/* Header con botón volver */}
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
          {/* Tarjeta de Calorías */}
          <div className="text-center p-8 bg-yellow-500 rounded-3xl text-black">
            <p className="font-bold uppercase text-xs tracking-widest opacity-70">
              Consumo Diario Sugerido
            </p>
            <h2 className="text-6xl font-black">{resultados.calorias}</h2>
            <p className="font-bold uppercase">Calorías</p>
          </div>

          {/* Macros */}
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

          {/* Botón Nueva Estimación */}
          <Link
            href="/"
            className="w-full text-gray-400 text-sm font-bold uppercase py-4 hover:text-white transition-colors text-center block"
          >
            ← Nueva Estimación
          </Link>

          {/* Texto informativo que abre el modal */}
          <p
            onClick={() => setShowModal(true)}
            className="text-xs text-gray-500 text-center px-4 italic cursor-pointer underline mt-4 hover:text-gray-400 transition-colors"
          >
            Este cálculo es un punto de partida, no una verdad absoluta.{" "}
            <span className="text-red-500 font-bold">
              Haz clic aquí para saber más.
            </span>
          </p>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="¿Por qué es una estimación?"
      >
        <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
          <p><b>• Composición Corporal:</b> No distingue grasa vs músculo.</p>
          <p><b>• Salud Metabólica:</b> Factores hormonales afectan el gasto.</p>
          <p><b>• Bio-individualidad:</b> Variaciones de hasta 20%.</p>
          <p><b>• Adherencia:</b> Un plan real considera gustos personales.</p>
        </div>
      </Modal>
    </div>
  )
}