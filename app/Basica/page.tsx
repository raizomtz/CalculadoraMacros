"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from 'next/link';
import CalculadoraHeader from "@/app/Components/CalculadoraHeader"

export default function BasicaPaso1() {
  const router = useRouter()
  const [genero, setGenero] = useState("hombre")

  const handleSiguiente = () => {
    // Guardar en sessionStorage
    localStorage.setItem("basica_genero", genero)
    //sessionStorage.setItem("basica_genero", genero)
    //router.push("/Basica/paso2")
  }

  return (
    <div className="bg-[#0f172a] min-h-screen text-white p-6">
      <div className="max-w-md mx-auto">

        <CalculadoraHeader titulo="Básica" pasoActual={1} />


        <h2 className="text-xl font-bold italic text-center uppercase mb-6">
          Selecciona tu Género
        </h2>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {["hombre", "mujer"].map(g => (
            <label key={g} className="cursor-pointer">
              <input
                type="radio"
                name="genero"
                value={g}
                checked={genero === g}
                onChange={(e) => setGenero(e.target.value)}
                className="hidden peer"
              />
              <div className="bg-gray-800 p-8 rounded-2xl border-4 border-transparent flex flex-col items-center justify-center transition-all peer-checked:border-yellow-500">
                <span className="text-5xl mb-3">{g === "hombre" ? "♂️" : "♀️"}</span>
                <span className="font-bold uppercase tracking-wider">{g}</span>
              </div>
            </label>
          ))}
        </div>

          <Link
          href="/Basica/paso2"
          onClick={handleSiguiente}
          className="w-full bg-red-600 text-white font-bold p-5 rounded-2xl uppercase active:scale-95 transition-all text-center block"
        >
          Siguiente
        </Link>

      </div>
    </div>
  )
}