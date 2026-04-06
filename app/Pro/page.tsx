"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CalculadoraPro() {
  const router = useRouter()

  const [step, setStep] = useState(1)
  const [showModal, setShowModal] = useState(false)

  const [form, setForm] = useState({
    genero: "hombre",
    peso: "",
    grasa: "",
    actividad: "1.2",
    objetivo: "perder",
  })

  const [result, setResult] = useState({
    calorias: 0,
    p: 0,
    c: 0,
    g: 0,
  })

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.id || e.target.name]: e.target.value })
  }

  const calcular = () => {
    const peso = parseFloat(form.peso)
    const grasa = parseFloat(form.grasa)

    if (!peso || !grasa) return

    if (grasa < 5 || grasa > 50) {
      alert("El % de grasa no parece realista")
      return
    }

    // 🔥 Katch-McArdle
    const masaMagra = peso * (1 - grasa / 100)
    let calorias = 370 + (21.6 * masaMagra)

    calorias *= parseFloat(form.actividad)

    // 🎯 objetivo
    if (form.objetivo === "perder") calorias *= 0.8
    if (form.objetivo === "ganar") calorias *= 1.15

    calorias = Math.round(calorias)

    // 🔥 macros dinámicos
    let proteinas = 0
    let grasas = 0

    if (form.objetivo === "perder") {
      proteinas = peso * 2.3
      grasas = peso * 0.7
    } else if (form.objetivo === "recomposicion") {
      proteinas = peso * 2.2
      grasas = peso * 0.8
    } else {
      proteinas = peso * 1.8
      grasas = peso * 1
    }

    proteinas = Math.round(proteinas)
    grasas = Math.round(grasas)

    const caloriasRestantes = calorias - (proteinas * 4 + grasas * 9)
    const carbs = Math.round(caloriasRestantes / 4)

    setResult({
      calorias,
      p: proteinas,
      c: carbs,
      g: grasas,
    })

    setStep(5)
  }

  return (
    <div className="bg-[#0f172a] min-h-screen text-white p-6">
      <div className="max-w-md mx-auto">

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black italic">
            Calculadora <span className="text-red-600">Pro</span>
          </h1>

          <div className="flex justify-center gap-2 mt-2">
            {[1, 2, 3, 4].map(i => (
              <div
                key={i}
                className={`w-8 h-1 rounded-full transition-all ${
                  i <= step ? "bg-red-600" : "bg-gray-700"
                }`}
              />
            ))}
          </div>
        </div>

        {/* STEP 1 (igual que básica) */}
        {step === 1 && (
          <div className="space-y-6 animate-fadeIn">
            {/* 🔙 NUEVO BOTÓN */}
            <button
              onClick={() => router.push("/")}
              className="text-gray-400 text-sm font-bold uppercase hover:text-white"
            >
              ← Volver a calculadoras
            </button>

            <h2 className="text-xl font-bold italic text-center uppercase">
              Selecciona tu Género
            </h2>

            <div className="grid grid-cols-2 gap-4">
              {["hombre", "mujer"].map(g => (
                <label key={g} className="cursor-pointer">
                  <input
                    type="radio"
                    name="genero"
                    value={g}
                    checked={form.genero === g}
                    onChange={handleChange}
                    className="hidden peer"
                  />
                  <div className="bg-gray-800 p-8 rounded-2xl border-4 border-transparent flex flex-col items-center justify-center transition-all peer-checked:border-yellow-500">
                    <span className="text-5xl mb-3">
                      {g === "hombre" ? "♂️" : "♀️"}
                    </span>
                    <span className="font-bold uppercase tracking-wider">
                      {g}
                    </span>
                  </div>
                </label>
              ))}
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full bg-red-600 font-bold p-5 rounded-2xl uppercase shadow-lg shadow-red-900/20"
            >
              Siguiente
            </button>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="space-y-4 animate-fadeIn">
            <h2 className="text-xl font-bold uppercase">
              Datos de precisión
            </h2>

            <input
              id="peso"
              placeholder="Peso (kg)"
              type="number"
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-gray-800 outline-none"
            />

            <input
              id="grasa"
              placeholder="% Grasa corporal"
              type="number"
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-gray-800 outline-none"
            />

            <div className="flex gap-2">
              <button onClick={() => setStep(1)} className="w-1/3 bg-gray-700 p-5 rounded-2xl">
                Atrás
              </button>
              <button onClick={() => setStep(3)} className="w-2/3 bg-red-600 p-5 rounded-2xl">
                Siguiente
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="space-y-4 animate-fadeIn">
            <h2 className="text-xl font-bold text-center uppercase">
              Nivel de actividad
            </h2>

            <select
              id="actividad"
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-gray-800"
            >
              <option value="1.2">Sedentario (no entrenas)</option>
              <option value="1.375">Ligero (1-2 días gym)</option>
              <option value="1.55">Moderado (3-4 días)</option>
              <option value="1.725">Alto (5-6 días)</option>
              <option value="1.9">Muy alto (entrenamiento intenso)</option>
            </select>

            <div className="flex gap-2">
              <button onClick={() => setStep(2)} className="w-1/3 bg-gray-700 p-5 rounded-2xl">
                Atrás
              </button>
              <button onClick={() => setStep(4)} className="w-2/3 bg-red-600 p-5 rounded-2xl">
                Siguiente
              </button>
            </div>
          </div>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <div className="space-y-4 animate-fadeIn">
            <h2 className="text-xl font-bold text-center uppercase">
              Objetivo
            </h2>

            <select
              id="objetivo"
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-gray-800"
            >
              <option value="perder">Perder grasa</option>
              <option value="recomposicion">Recomposición</option>
              <option value="ganar">Ganar músculo</option>
            </select>

            <div className="flex gap-2">
              <button onClick={() => setStep(3)} className="w-1/3 bg-gray-700 p-5 rounded-2xl">
                Atrás
              </button>
              <button onClick={calcular} className="w-2/3 bg-red-600 p-5 rounded-2xl">
                Obtener Resultados
              </button>
            </div>
          </div>
        )}

        {/* RESULTADOS */}
        {step === 5 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center p-8 bg-yellow-500 rounded-3xl text-black">
              <p className="text-xs font-bold uppercase opacity-70">
                Consumo Diario Sugerido
              </p>
              <h2 className="text-6xl font-black">
                {result.calorias}
              </h2>
              <p className="font-bold uppercase">Calorías</p>
            </div>

            <div className="grid gap-3">
              <div className="bg-gray-800 p-5 rounded-2xl flex justify-between border-l-4 border-blue-500">
                <span>🥩 Proteínas</span>
                <b>{result.p}g</b>
              </div>
              <div className="bg-gray-800 p-5 rounded-2xl flex justify-between border-l-4 border-green-500">
                <span>🍚 Carbohidratos</span>
                <b>{result.c}g</b>
              </div>
              <div className="bg-gray-800 p-5 rounded-2xl flex justify-between border-l-4 border-red-500">
                <span>🥑 Grasas</span>
                <b>{result.g}g</b>
              </div>
            </div>

            <button
              onClick={() => router.push("/")}
              className="w-full text-gray-400 text-sm font-bold uppercase py-4 hover:text-white"
            >
              ← Nueva Estimación
            </button>

            <p
              onClick={() => setShowModal(true)}
              className="text-xs text-gray-500 text-center italic underline cursor-pointer"
            >
              Este cálculo es más preciso, pero sigue siendo una estimación.{" "}
              <span className="text-red-500 font-bold">Haz clic aquí</span>
            </p>
          </div>
        )}

        {/* MODAL PRO */}
        {showModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6">
            <div className="bg-gray-900 p-6 rounded-3xl max-w-sm w-full space-y-4">
              <h3 className="text-red-600 font-black text-xl uppercase">
                ¿Por qué sigue siendo una estimación?
              </h3>

              <div className="text-sm text-gray-300 space-y-3">
                <p><b>• % Grasa:</b> Puede tener error según la báscula.</p>
                <p><b>• Hidratación:</b> Afecta la medición corporal.</p>
                <p><b>• Adaptación metabólica:</b> Tu cuerpo cambia con el tiempo.</p>
                <p><b>• Precisión clínica:</b> Solo métodos como DEXA son exactos.</p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="w-full bg-red-600 p-3 rounded-xl font-bold uppercase"
              >
                Entendido
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}