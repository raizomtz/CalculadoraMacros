"use client"

import { useState } from "react"
//import { useRouter } from "next/navigation"
import Link from "next/link"
import CalculadoraHeader from "@/app/Components/CalculadoraHeader"

export default function BasicaPaso2() {
  //const router = useRouter()
  const [peso, setPeso] = useState("")
  const [altura, setAltura] = useState("")
  const [edad, setEdad] = useState("")

  const handleSiguiente = () => {
    if (!peso || !altura || !edad) {
      alert("Por favor completa todos los campos")
      return
    }
    
    localStorage.setItem("basica_peso", peso)
    localStorage.setItem("basica_altura", altura)
    localStorage.setItem("basica_edad", edad)
    //router.push("/Basica/paso3")
  }

  return (
    <div className="bg-[#0f172a] min-h-screen text-white p-6">
      <div className="max-w-md mx-auto">

        <CalculadoraHeader titulo="Básica" pasoActual={2} />


        <h2 className="text-xl font-bold italic uppercase mb-6">
          CUÉNTANOS DE TI
        </h2>

        <div className="space-y-4 mb-8">
          <input
            placeholder="Peso en kg (ej: 75.5)"
            type="number"
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            className="w-full p-4 rounded-xl bg-gray-800 outline-none text-white"
          />
          <input
            placeholder="Altura en cm (ej: 175)"
            type="number"
            value={altura}
            onChange={(e) => setAltura(e.target.value)}
            className="w-full p-4 rounded-xl bg-gray-800 outline-none text-white"
          />
          <input
            placeholder="Edad"
            type="number"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            className="w-full p-4 rounded-xl bg-gray-800 outline-none text-white"
          />
        </div>

        <div className="flex gap-2">
            
          <Link
            href="/Basica"
            className="w-1/3 bg-gray-700 p-5 rounded-2xl font-bold active:scale-95"
          >
            Atrás
          </Link>
          
          <Link
          href="/Basica/paso3"
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