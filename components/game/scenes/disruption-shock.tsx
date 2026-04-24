'use client'

import { ROLES, type Role } from '@/lib/game-types'
import { TypewriterText } from '../typewriter-text'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface DisruptionShockProps {
  role: Role
  onContinue: () => void
}

const DISRUPTION_SCENARIOS: Record<Role, { title: string; description: string; headline: string }> = {
  emprendedor: {
    title: 'ALERTA: Sistema de pagos comprometido',
    description: 'Un ataque de ransomware paraliza las pasarelas de pago. Tu startup y miles de negocios quedan sin poder operar. Las transacciones se detienen.',
    headline: 'Titular: Hackeo masivo al sistema financiero colombiano - 2077'
  },
  servidor_publico: {
    title: 'EMERGENCIA: Bases de datos gubernamentales vulneradas',
    description: 'Datos sensibles de millones de ciudadanos han sido expuestos. Los sistemas de identificacion fallan. La desconfianza se propaga.',
    headline: 'Titular: Filtracion de datos gubernamentales expone a millones'
  },
  estudiante: {
    title: 'CRISIS: Plataformas educativas colapsadas',
    description: 'Un ataque coordinado tumba las plataformas de educacion virtual. Examenes perdidos, investigaciones borradas. Miles de estudiantes afectados.',
    headline: 'Titular: Ciberataque paraliza educacion virtual en Colombia'
  },
  campesino: {
    title: 'DESCONEXION: Red satelital rural saboteada',
    description: 'Los sistemas de riego inteligente y monitoreo de cultivos dejan de funcionar. Sin datos meteorologicos, las cosechas estan en peligro.',
    headline: 'Titular: Brecha digital golpea sector agricola - Cosechas en riesgo'
  }
}

export function DisruptionShock({ role, onContinue }: DisruptionShockProps) {
  const [showContent, setShowContent] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const scenario = DISRUPTION_SCENARIOS[role]
  const roleData = ROLES.find(r => r.id === role)

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 md:p-8">
      {/* Static TV effect in background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-40 md:w-96 md:h-60 rounded-lg opacity-30"
          style={{
            background: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.1) 0px, rgba(0,0,0,0.3) 1px, transparent 2px)',
            animation: 'glitch-1 0.1s infinite',
            boxShadow: '0 0 30px rgba(255, 100, 0, 0.5)'
          }}
        />
      </div>

      <div className="max-w-3xl mx-auto text-center">
        {/* Alert header */}
        <div className="animate-pulse mb-6">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-red-500/30 border-2 border-red-500 rounded-full">
            <span className="w-3 h-3 bg-red-500 rounded-full animate-ping" />
            <span className="text-red-400 font-mono font-bold">SISTEMA EN ALERTA CRITICA</span>
          </div>
        </div>

        {showContent && (
          <>
            <h2 className="text-2xl md:text-4xl font-bold text-red-400 mb-6 animate-glitch font-mono">
              {scenario.title}
            </h2>

            {/* Glass panel with narrative */}
            <div className="glass-panel rounded-2xl p-6 md:p-8 mb-6" style={{ borderLeftColor: '#ef4444' }}>
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-red-500/30">
                <span className="text-2xl">{roleData?.icon}</span>
                <span className="text-red-300/80 font-mono text-sm">Tu perspectiva como {roleData?.title}</span>
              </div>
              
              <TypewriterText
                text={scenario.description}
                speed={25}
                onComplete={() => setShowButton(true)}
                className="text-lg text-red-100 leading-relaxed"
              />

              {/* Headline ticker */}
              <div className="mt-6 pt-4 border-t border-red-500/30 overflow-hidden">
                <p className="text-yellow-400 font-mono text-sm animate-pulse">
                  {scenario.headline}
                </p>
              </div>
            </div>

            <div className="glass-panel rounded-xl p-4 mb-8 inline-block" style={{ borderLeftColor: '#f59e0b' }}>
              <TypewriterText
                text='"Esto ya esta pasando. No es futuro. Es presente."'
                speed={50}
                className="text-amber-300 italic font-mono"
              />
            </div>

            {showButton && (
              <div className="animate-fall">
                <button
                  onClick={onContinue}
                  className={cn(
                    'px-10 py-4 rounded-full font-mono font-bold text-lg',
                    'bg-gradient-to-r from-red-600 to-orange-500',
                    'border-2 border-red-400 text-white',
                    'hover:from-red-500 hover:to-orange-400',
                    'transition-all duration-300',
                    'hover:shadow-[0_0_30px_rgba(239,68,68,0.5)]',
                    'hover:scale-105'
                  )}
                >
                  Enfrentar la crisis
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
