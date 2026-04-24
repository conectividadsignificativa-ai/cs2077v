'use client'

import { SKILLS_DATA, VALUES_DATA, type Skill, type Value, type Decision, type Role } from '@/lib/game-types'
import { TypewriterText } from '../typewriter-text'
import { cn } from '@/lib/utils'
import { useState, useMemo } from 'react'

interface FutureRevealProps {
  role: Role
  decision: Decision
  skills: Skill[]
  values: Value[]
  onRestart: () => void
}

const generateFutureMessage = (
  role: Role,
  decision: Decision,
  skills: Skill[],
  values: Value[]
): { title: string; message: string; archetype: string; icon: string } => {
  const skillLabels = skills.map(s => SKILLS_DATA.find(sd => sd.id === s)?.label || s)
  const valueLabels = values.map(v => VALUES_DATA.find(vd => vd.id === v)?.label || v)

  let archetype = ''
  let title = ''
  let message = ''
  let icon = ''

  const hasCreativity = skills.includes('creatividad')
  const hasProgramming = skills.includes('programacion')
  const hasLeadership = skills.includes('liderazgo')
  const hasEmpathy = skills.includes('empatia')
  const hasCommunication = skills.includes('comunicacion')
  const hasCriticalThinking = skills.includes('pensamiento_critico')

  const valuesInnovation = values.includes('innovacion')
  const valuesCommunity = values.includes('comunidad')
  const valuesEquity = values.includes('equidad')
  const valuesSustainability = values.includes('sostenibilidad')
  const valuesEducation = values.includes('educacion')
  const valuesTransparency = values.includes('transparencia')

  if (hasProgramming && valuesInnovation) {
    archetype = 'Arquitecto Digital'
    icon = '🏗️'
    title = 'El Futuro que Construyes'
    message = `Ves la tecnologia como herramienta de transformacion. Con tu capacidad de ${skillLabels.join(' y ')}, y tu compromiso con ${valueLabels.join(' y ')}, estas destinado/a a construir los puentes digitales que conectaran a Colombia con el mundo.`
  } else if (hasLeadership && valuesCommunity) {
    archetype = 'Tejedor Social'
    icon = '🕸️'
    title = 'El Futuro que Lideras'
    message = `Tu fuerza esta en unir a las personas. Con habilidades en ${skillLabels.join(' y ')} y valores de ${valueLabels.join(' y ')}, tienes el poder de crear movimientos que transformen comunidades enteras.`
  } else if (hasCreativity && valuesEducation) {
    archetype = 'Innovador Educativo'
    icon = '💡'
    title = 'El Futuro que Imaginas'
    message = `La creatividad y la educacion son tu combustible. Tus habilidades en ${skillLabels.join(' y ')} combinadas con tu pasion por ${valueLabels.join(' y ')} te posicionan para reinventar como Colombia aprende.`
  } else if (hasEmpathy && valuesEquity) {
    archetype = 'Guardian de la Inclusion'
    icon = '🛡️'
    title = 'El Futuro que Proteges'
    message = `Tu sensibilidad hacia los demas te distingue. Con ${skillLabels.join(' y ')} y un corazon comprometido con ${valueLabels.join(' y ')}, seras quien asegure que nadie quede atras en la transformacion digital.`
  } else if (hasCriticalThinking && valuesTransparency) {
    archetype = 'Vigilante Digital'
    icon = '👁️'
    title = 'El Futuro que Cuestionas'
    message = `Tu mente analitica es un escudo contra la desinformacion. Con ${skillLabels.join(' y ')} y compromiso con ${valueLabels.join(' y ')}, estas llamado/a a ser la voz critica que Colombia necesita.`
  } else if (hasCommunication && valuesSustainability) {
    archetype = 'Narrador del Cambio'
    icon = '📣'
    title = 'El Futuro que Comunicas'
    message = `Las palabras son tu poder. Tus habilidades en ${skillLabels.join(' y ')} junto con tu vision de ${valueLabels.join(' y ')} te convierten en el mensajero que puede inspirar a millones.`
  } else {
    archetype = 'Pionero del Manana'
    icon = '🚀'
    title = 'El Futuro que Defines'
    message = `Tu combinacion unica de ${skillLabels.join(' y ')} con valores de ${valueLabels.join(' y ')} te hace un agente de cambio indispensable. Tu perspectiva singular es exactamente lo que necesitamos.`
  }

  const decisionContext = decision === 'colaborar' 
    ? ' Tu instinto de colaborar demuestra que entiendes que el futuro se construye en comunidad.'
    : decision === 'protegerse'
    ? ' Tu decision de proteger lo tuyo refleja la importancia del autocuidado en tiempos de crisis.'
    : ' Incluso la inaccion es una eleccion, y reconocer esto es el primer paso hacia la corresponsabilidad.'

  message += decisionContext

  return { title, message, archetype, icon }
}

export function FutureReveal({ role, decision, skills, values, onRestart }: FutureRevealProps) {
  const [showMessage, setShowMessage] = useState(false)
  const [showButton, setShowButton] = useState(false)

  const future = useMemo(() => 
    generateFutureMessage(role, decision, skills, values),
    [role, decision, skills, values]
  )

  const selectedSkillLabels = skills.map(s => SKILLS_DATA.find(sd => sd.id === s))
  const selectedValueLabels = values.map(v => VALUES_DATA.find(vd => vd.id === v))

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 md:p-8">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500/30 to-cyan-500/30 border-2 border-pink-400 rounded-full mb-6">
          <span className="text-pink-300 font-mono font-bold">VISION DEL FUTURO</span>
        </div>

        {/* Main panel with tropical-tech aesthetic */}
        <div 
          className="glass-panel rounded-2xl p-6 md:p-10 mb-8"
          style={{ 
            borderLeftColor: '#ec4899',
            boxShadow: '0 0 60px rgba(236, 72, 153, 0.3)'
          }}
        >
          {/* Archetype header */}
          <div className="mb-6 pb-6 border-b border-pink-500/30">
            <span className="text-6xl mb-4 block animate-bounce-slow">
              {future.icon}
            </span>
            <h3 className="text-lg text-pink-300/80 mb-2 font-mono">Tu arquetipo</h3>
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 font-mono">
              {future.archetype}
            </h2>
          </div>

          <h3 className="text-2xl font-bold text-cyan-300 mb-6 font-mono">{future.title}</h3>

          <TypewriterText
            text={future.message}
            speed={25}
            onComplete={() => {
              setShowMessage(true)
              setTimeout(() => setShowButton(true), 500)
            }}
            className="text-lg text-cyan-100 leading-relaxed"
          />

          {showMessage && (
            <div className="mt-8 pt-6 border-t border-cyan-500/30 animate-fade-in">
              <p className="text-sm text-cyan-400/80 mb-4 font-mono">Tus elecciones</p>
              <div className="flex flex-wrap justify-center gap-2">
                {selectedSkillLabels.map(skill => skill && (
                  <span 
                    key={skill.id}
                    className="skill-card selected rounded-full px-4 py-2 text-sm font-mono"
                  >
                    {skill.label}
                  </span>
                ))}
                {selectedValueLabels.map(value => value && (
                  <span 
                    key={value.id}
                    className="skill-card selected rounded-full px-4 py-2 text-sm font-mono"
                  >
                    {value.label}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {showButton && (
          <div className="space-y-6 animate-fade-in">
            <p className="text-cyan-300/80 italic font-mono text-lg">
              &ldquo;El futuro de Colombia esta en tus manos. La corresponsabilidad digital comienza hoy.&rdquo;
            </p>
            <button
              onClick={onRestart}
              className={cn(
                'cyber-btn px-10 py-4 rounded-full font-mono font-bold text-lg',
                'hover:scale-105 transition-all duration-300'
              )}
            >
              REVIVIR EXPERIENCIA
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
