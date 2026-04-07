"use client"

import { useState } from "react"
//import { useRouter } from "next/navigation"
import Link from "next/link"
import CalculadoraHeader from "@/app/Components/CalculadoraHeader"

export default function BasicaPaso3() {
  //const router = useRouter()
  const [estiloVida, setEstiloVida] = useState("sedentario")

  const handleSiguiente = () => {
    localStorage.setItem("basica_estiloVida", estiloVida)
    //router.push("/basica/paso4")
  }

  return (
    <div className="bg-[#0f172a] min-h-screen text-white p-6">
      <div className="max-w-md mx-auto">
        <CalculadoraHeader titulo="Básica" pasoActual={3} />

        <h2 className="text-xl font-bold italic uppercase text-center mb-6">
          NIVEL DE ACTIVIDAD
        </h2>

        <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
          ¿Qué haces la mayor parte del día?
        </label>

        <select
          value={estiloVida}
          onChange={(e) => setEstiloVida(e.target.value)}
          className="w-full p-4 rounded-xl bg-gray-800 outline-none mb-8"
        >
          <option value="sedentario">Sedentario (Poco movimiento, oficina o sentado +4h)</option>
          <option value="activo">Activo (Caminar, de pie 4-6h, ventas o maestros)</option>
          <option value="muy_activo">Muy Activo (Trabajo físico, construcción, gym intenso)</option>
        </select>

        <div className="flex gap-2">
          <Link
            href="/Basica/paso2"
            className="w-1/3 bg-gray-700 p-5 rounded-2xl font-bold active:scale-95"
          >
            Atrás
          </Link>
          
          <Link
          href="/Basica/paso4"
          onClick={handleSiguiente}
          className="w-full bg-red-600 text-white font-bold p-5 rounded-2xl uppercase active:scale-95 transition-all text-center block"
          >
            Siguiente
          </Link>
        </div>
      </div>
    </div>
  )
}