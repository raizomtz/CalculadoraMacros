"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  const [step, setStep] = useState(1)
  const [showModal, setShowModal] = useState(false)

  const [form, setForm] = useState({
    peso: "",
    altura: "",
    edad: "",
    genero: "hombre",
    estiloVida: "sedentario",
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
    const altura = parseFloat(form.altura)
    const edad = parseInt(form.edad)

    if (!peso || !altura || !edad) return

    // 🔹 Mifflin-St Jeor
    let tmb =
      form.genero === "hombre"
        ? 10 * peso + 6.25 * altura - 5 * edad + 5
        : 10 * peso + 6.25 * altura - 5 * edad - 161

    const actividadMap: any = {
      sedentario: 1.2,
      activo: 1.55,
      muy_activo: 1.75,
    }

    let calorias = tmb * actividadMap[form.estiloVida]

    if (form.objetivo === "perder") calorias *= 0.8
    if (form.objetivo === "ganar") calorias *= 1.15

    calorias = Math.round(calorias)

    const proteinas = Math.round(peso * 2)
    const grasas = Math.round(peso * 0.8)
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
            Calculadora <span className="text-red-600">Basica</span>
          </h1>

          <div className="flex justify-center gap-2 mt-2">
            {[1, 2, 3, 4].map(i => (
              <div
                key={i}
                className={`w-8 h-1 rounded-full ${
                  i <= step ? "bg-red-600" : "bg-gray-700"
                }`}
              />
            ))}
          </div>
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <div className="space-y-6">

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
              className="w-full bg-red-600 text-white font-bold p-5 rounded-2xl uppercase shadow-lg shadow-red-900/20"
            >
              Siguiente
            </button>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold italic uppercase">
              1. CUÉNTANOS DE TI
            </h2>

            {["peso", "altura", "edad"].map(id => (
              <input
                key={id}
                id={id}
                placeholder={
                  id === "peso"
                    ? "Peso en kg(80.3)"
                    : id === "altura"
                    ? "Altura en cm(165.5)"
                    : "Edad"
                }
                type="number"
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-gray-800 border-none outline-none"
              />
            ))}

            <div className="flex gap-2">
              <button
                onClick={() => setStep(1)}
                className="w-1/3 bg-gray-700 p-5 rounded-2xl font-bold"
              >
                Atrás
              </button>
              <button
                onClick={() => setStep(3)}
                className="w-2/3 bg-red-600 text-white font-bold p-5 rounded-2xl uppercase"
              >
                Siguiente
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 (SIMPLIFICADO) */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold italic uppercase text-center">
              2. NIVEL DE ACTIVIDAD
            </h2>

            <label className="block text-xs font-bold text-gray-400 uppercase">
              ¿Qué haces la mayor parte del día?
            </label>

            <select
              id="estiloVida"
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-gray-800 border-none outline-none"
            >
              <option value="sedentario">
                Sedentario (Poco movimiento, oficina o sentado +4h)
              </option>
              <option value="activo">
                Activo (Caminar, de pie 4-6h, ventas o maestros)
              </option>
              <option value="muy_activo">
                Muy Activo (Trabajo físico, construcción, gym intenso)
              </option>
            </select>

            <div className="flex gap-2">
              <button
                onClick={() => setStep(2)}
                className="w-1/3 bg-gray-700 p-5 rounded-2xl font-bold"
              >
                Atrás
              </button>
              <button
                onClick={() => setStep(4)}
                className="w-2/3 bg-red-600 text-white font-bold p-5 rounded-2xl uppercase"
              >
                Siguiente
              </button>
            </div>
          </div>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold italic uppercase text-center">
              3. TU META FINAL
            </h2>

            <select
              id="objetivo"
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-gray-800 border-none outline-none"
            >
              <option value="perder">Perder Grasa (Definición)</option>
              <option value="recomposicion">
                Recomposición (Gana músculo / pierde grasa)
              </option>
              <option value="ganar">Ganar Masa Muscular (Volumen)</option>
            </select>

            <div className="flex gap-2">
              <button
                onClick={() => setStep(3)}
                className="w-1/3 bg-gray-700 p-5 rounded-2xl font-bold"
              >
                Atrás
              </button>
              <button
                onClick={calcular}
                className="w-2/3 bg-red-600 text-white font-bold p-5 rounded-2xl uppercase"
              >
                Obtener Resultados
              </button>
            </div>
          </div>
        )}

        {/* RESULTADOS (SIN CAMBIOS) */}
        {step === 5 && (
          <div className="space-y-6">
            <div className="text-center p-8 bg-yellow-500 rounded-3xl text-black">
              <p className="font-bold uppercase text-xs tracking-widest opacity-70">
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
              className="w-full text-gray-400 text-sm font-bold uppercase py-4 hover:text-white transition-colors"
            >
              ← Nueva Estimación
            </button>

            <p
              onClick={() => setShowModal(true)}
              className="text-xs text-gray-500 text-center px-4 italic cursor-pointer underline mt-4"
            >
              Este cálculo es un punto de partida, no una verdad absoluta.{" "}
              <span className="text-red-500 font-bold">
                Haz clic aquí para saber más.
              </span>
            </p>
          </div>
        )}

        {/* MODAL (igual) */}
        {showModal && (
          <div className={`fixed inset-0 z-50 flex items-center justify-center p-6 transition ${
    showModal ? "bg-black/80 backdrop-blur-sm" : "pointer-events-none opacity-0"
  }`}>
            <div className="bg-gray-900 border border-gray-800 p-6 rounded-3xl max-w-sm w-full space-y-4 shadow-2xl">
              <h3 className="text-red-600 font-black text-xl italic uppercase">
                ¿Por qué es una estimación?
              </h3>

              <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
                <p><b>• Composición Corporal:</b> No distingue grasa vs músculo.</p>
                <p><b>• Salud Metabólica:</b> Factores hormonales afectan el gasto.</p>
                <p><b>• Bio-individualidad:</b> Variaciones de hasta 20%.</p>
                <p><b>• Adherencia:</b> Un plan real considera gustos personales.</p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="w-full bg-red-600 text-white font-bold py-3 rounded-xl uppercase"
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