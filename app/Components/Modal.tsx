"use client"

import { useEffect } from "react"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal content */}
      <div className="relative bg-gray-900 border border-gray-800 p-6 rounded-3xl max-w-sm w-full space-y-4 shadow-2xl">
        <h3 className="text-red-600 font-black text-xl uppercase">
          {title}
        </h3>
        
        {children}
        
        <button
          onClick={onClose}
          className="w-full bg-red-600 p-3 rounded-xl font-bold uppercase hover:bg-red-700 transition-colors"
        >
          Entendido
        </button>
      </div>
    </div>
  )
}