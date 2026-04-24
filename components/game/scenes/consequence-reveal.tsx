'use client'

import { DECISION_OUTCOMES, type Decision } from '@/lib/game-types'
import { TypewriterText } from '../typewriter-text'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface ConsequenceRevealProps {
  decision: Decision
  onContinue: () => void
}

export function ConsequenceReveal({ decision, onContinue }: ConsequenceRevealProps) {
  const [showHeadline, setShowHeadline] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const outcome = DECISION_OUTCOMES[decision]

  const getVisualStyle = () => {
    switch (outcome.visualState) {
      case 'improved':
        return {
          borderColor: '#10b981',
          bgColor: 'rgba(16, 185, 129, 0.2)',
          textColor: 'text-emerald-400',
          icon: '🌱',
          label: 'TRANSFORMACION POSITIVA'
        }
      case 'deteriorated':
        return {
          borderColor: '#ef4444',
          bgColor: 'rgba(239, 68, 68, 0.2)',
          textColor: 'text-red-400',
          icon: '⚠️',
          label: 'CONSECUENCIA ADVERSA'
        }
      default:
        return {
          borderColor: '#f59e0b',
          bgColor: 'rgba(245, 158, 11, 0.2)',
          textColor: 'text-amber-400',
          icon: '⚖️',
          label: 'RESULTADO INCIERTO'
        }
    }
  }

  const style = getVisualStyle()

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 md:p-8">
      <div className="max-w-3xl mx-auto text-center">
        <div 
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full mb-6 border-2"
          style={{ 
            borderColor: style.borderColor, 
            backgroundColor: style.bgColor 
          }}
        >
          <span className="text-2xl">{style.icon}</span>
          <span className={cn('font-mono font-bold text-sm', style.textColor)}>{style.label}</span>
        </div>

        {/* Main narrative panel */}
        <div 
          className="glass-panel rounded-2xl p-6 md:p-8 mb-6"
          style={{ borderLeftColor: style.borderColor }}
        >
          <TypewriterText
            text={outcome.description}
            speed={30}
            onComplete={() => setShowHeadline(true)}
            className={cn('text-lg md:text-xl leading-relaxed mb-6', style.textColor.replace('text-', 'text-').replace('400', '200'))}
          />

          {showHeadline && (
            <div 
              className="mt-6 p-5 rounded-xl border-2 animate-fade-in"
              style={{ 
                borderColor: style.borderColor,
                backgroundColor: style.bgColor
              }}
            >
              <p className="text-xs text-cyan-400/80 mb-2 uppercase tracking-wider font-mono">
                Titular Real - Colombia
              </p>
              <p className={cn('text-xl font-bold font-mono', style.textColor)}>
                {outcome.headline}
              </p>
            </div>
          )}
        </div>

        {showHeadline && (
          <div 
            className="glass-panel rounded-xl p-4 mb-8 inline-block animate-fade-in"
            style={{ borderLeftColor: 'rgb(0, 255, 255)' }}
          >
            <TypewriterText
              text='"Esto ya paso. La pregunta es... ¿cuando dejamos de actuar?"'
              speed={40}
              onComplete={() => setShowButton(true)}
              className="text-cyan-300 italic font-mono"
            />
          </div>
        )}

        {showButton && (
          <div className="animate-fall">
            <button
              onClick={onContinue}
              className={cn(
                'px-10 py-4 rounded-full font-mono font-bold text-lg',
                'bg-gradient-to-r from-purple-600 to-pink-500',
                'border-2 border-purple-400 text-white',
                'hover:from-purple-500 hover:to-pink-400',
                'transition-all duration-300',
                'hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]',
                'hover:scale-105'
              )}
            >
              Explorar Futuros Posibles
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
