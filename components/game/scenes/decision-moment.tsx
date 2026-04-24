'use client'

import { type Decision } from '@/lib/game-types'
import { TypewriterText } from '../typewriter-text'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface DecisionMomentProps {
  onDecide: (decision: Decision) => void
}

const DECISIONS = [
  {
    id: 'colaborar' as Decision,
    title: 'COLABORAR',
    description: 'Unir fuerzas con otros. Compartir conocimiento para enfrentar la crisis juntos.',
    icon: '🤝',
  },
  {
    id: 'protegerse' as Decision,
    title: 'PROTEGERSE',
    description: 'Asegurar primero lo tuyo. Blindar tus sistemas antes de pensar en los demas.',
    icon: '🛡️',
  },
  {
    id: 'no_hacer_nada' as Decision,
    title: 'NO HACER NADA',
    description: 'Esperar a que otros resuelvan. Quiza esto no es tu responsabilidad.',
    icon: '⏸️',
  }
]

export function DecisionMoment({ onDecide }: DecisionMomentProps) {
  const [showOptions, setShowOptions] = useState(false)
  const [selectedDecision, setSelectedDecision] = useState<Decision | null>(null)

  const handleSelect = (decision: Decision) => {
    setSelectedDecision(decision)
    setTimeout(() => onDecide(decision), 800)
  }

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 md:p-8">
      {/* Frozen effect overlay */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent" />
        {/* Frozen particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-cyan-300/40 rounded-full blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500/30 border-2 border-cyan-400 rounded-full mb-6">
          <span className="text-cyan-300 font-mono font-bold">TIEMPO CONGELADO</span>
        </div>

        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-cyan-300 neon-text font-mono">
          Momento de Decision
        </h2>

        <div className="glass-panel rounded-2xl p-6 md:p-8 mb-8 max-w-2xl mx-auto">
          <TypewriterText
            text="El mundo se detiene. En este instante, tu decision importa. Recuerda: tu eleccion no es individual. Es parte de algo mas grande."
            speed={35}
            onComplete={() => setShowOptions(true)}
            className="text-lg md:text-xl text-cyan-100 leading-relaxed"
          />
          <div className="mt-4 pt-4 border-t border-cyan-500/30">
            <p className="text-cyan-400/80 text-sm font-mono">
              Corresponsabilidad o indiferencia...
            </p>
          </div>
        </div>

        {showOptions && (
          <div className="flex flex-wrap justify-center gap-4">
            {DECISIONS.map((decision, index) => (
              <button
                key={decision.id}
                onClick={() => handleSelect(decision.id)}
                disabled={selectedDecision !== null}
                className={cn(
                  'cyber-btn rounded-full px-8 py-4 font-mono',
                  'animate-fall',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  selectedDecision === decision.id && 'bg-cyan-400 text-black border-white scale-110'
                )}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <span className="text-2xl mr-2">{decision.icon}</span>
                <span className="font-bold">{decision.title}</span>
              </button>
            ))}
          </div>
        )}

        {showOptions && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            {DECISIONS.map((decision, index) => (
              <div 
                key={`desc-${decision.id}`}
                className="glass-panel rounded-xl p-4 animate-fade-in"
                style={{ animationDelay: `${index * 100 + 500}ms`, borderLeftColor: 'rgba(0,255,255,0.3)' }}
              >
                <p className="text-cyan-200/80 text-sm font-mono">
                  <span className="text-lg mr-2">{decision.icon}</span>
                  {decision.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
