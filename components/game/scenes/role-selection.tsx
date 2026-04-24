'use client'

import { ROLES, type Role } from '@/lib/game-types'
import { TypewriterText } from '../typewriter-text'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface RoleSelectionProps {
  onSelect: (role: Role) => void
}

export function RoleSelection({ onSelect }: RoleSelectionProps) {
  const [showOptions, setShowOptions] = useState(false)
  const [hoveredRole, setHoveredRole] = useState<Role | null>(null)

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Title with neon glow */}
        <h1 className="text-4xl md:text-6xl font-bold mb-2 text-cyan-400 neon-text tracking-wider">
          COLOMBIA 2077
        </h1>
        <p className="text-lg md:text-xl text-cyan-300/80 mb-8 font-mono">
          Nivel 1: Jaque a la Disrupcion
        </p>
        
        {/* Glass panel narrative */}
        <div className="glass-panel rounded-2xl p-6 md:p-8 mb-8 max-w-2xl mx-auto">
          <TypewriterText
            text="Tu rol define como ves el futuro... pero no lo determina. Elige quien seras en esta historia."
            speed={40}
            onComplete={() => setShowOptions(true)}
            className="text-lg md:text-xl text-cyan-100 leading-relaxed"
          />
          <div className="mt-4 pt-4 border-t border-cyan-500/30">
            <p className="text-cyan-400/80 text-sm font-mono flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              GUIA: Selecciona tu identidad digital. Cada rol tiene una perspectiva unica.
            </p>
          </div>
        </div>

        {showOptions && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ROLES.map((role, index) => (
              <button
                key={role.id}
                onClick={() => onSelect(role.id)}
                onMouseEnter={() => setHoveredRole(role.id)}
                onMouseLeave={() => setHoveredRole(null)}
                className={cn(
                  'group relative overflow-hidden rounded-full px-8 py-5',
                  'cyber-btn font-mono',
                  'animate-fall',
                  'text-left'
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{role.icon}</span>
                  <div>
                    <h3 className="text-lg font-bold group-hover:text-black transition-colors">
                      {role.title}
                    </h3>
                    <p className="text-xs opacity-80 group-hover:text-black/80 transition-colors">
                      {role.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
