'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'

type SceneType = 
  | 'intro' 
  | 'coworking' 
  | 'oficina_publica' 
  | 'universidad' 
  | 'rural'
  | 'disruption'
  | 'frozen'
  | 'improved'
  | 'deteriorated'
  | 'neutral'
  | 'synthwave'
  | 'utopian'
  | 'skills'

interface BackgroundSceneProps {
  scene: SceneType
  className?: string
}

// Mapping scenes to background images
const sceneImages: Partial<Record<SceneType, string>> = {
  intro: '/images/portal-mountains.png',
  coworking: '/images/i1l1-cyberpunk-screens.jpeg',
  oficina_publica: '/images/i1l1-cyberpunk-screens.jpeg',
  universidad: '/images/i2l1-sunset-city.jpeg',
  rural: '/images/i3l3-utopian-village.png',
  disruption: '/images/i1l1-cyberpunk-screens.jpeg',
  frozen: '/images/i2l1-sunset-city.jpeg',
  improved: '/images/i3l3-utopian-village.png',
  deteriorated: '/images/i1l1-cyberpunk-screens.jpeg',
  neutral: '/images/i2l1-sunset-city.jpeg',
  synthwave: '/images/i3l1-synthwave-sunset.jpeg',
  utopian: '/images/i1l2-future-tower.png',
  skills: '/images/i2l1-sunset-city.jpeg'
}

export function BackgroundScene({ scene, className }: BackgroundSceneProps) {
  const imageUrl = sceneImages[scene]
  
  const getOverlayStyles = () => {
    switch (scene) {
      case 'disruption':
        return 'bg-red-900/40'
      case 'frozen':
        return 'bg-cyan-900/30'
      case 'improved':
      case 'utopian':
        return 'bg-emerald-900/20'
      case 'deteriorated':
        return 'bg-red-950/50'
      case 'synthwave':
        return 'bg-purple-900/20'
      default:
        return 'bg-slate-900/30'
    }
  }

  return (
    <div className={cn(
      'fixed inset-0 transition-all duration-1000',
      className
    )}>
      {/* Background Image */}
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="Background scene"
          fill
          priority
          className="object-cover transition-opacity duration-1000"
          sizes="100vw"
        />
      )}

      {/* Color overlay based on scene */}
      <div className={cn(
        'absolute inset-0 transition-colors duration-1000',
        getOverlayStyles()
      )} />

      {/* Grid overlay for synthwave effect */}
      {(scene === 'synthwave' || scene === 'intro') && (
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(236, 72, 153, 0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(236, 72, 153, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            transform: 'perspective(500px) rotateX(60deg)',
            transformOrigin: 'center bottom'
          }}
        />
      )}

      {/* Glitch effect for disruption */}
      {scene === 'disruption' && (
        <>
          <div className="absolute inset-0 bg-red-500/10 animate-glitch-1" />
          <div className="absolute inset-0 bg-cyan-500/10 animate-glitch-2" />
          {/* Static noise overlay */}
          <div 
            className="absolute inset-0 opacity-10 mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              animation: 'glitch-1 0.2s infinite'
            }}
          />
        </>
      )}

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "absolute w-1 h-1 rounded-full animate-twinkle",
              scene === 'synthwave' ? 'bg-pink-400' : 
              scene === 'improved' || scene === 'utopian' ? 'bg-emerald-400' :
              scene === 'disruption' ? 'bg-red-400' : 'bg-cyan-400'
            )}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              opacity: 0.6
            }}
          />
        ))}
      </div>

      {/* Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)'
        }}
      />

      {/* Scan lines effect */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
        }}
      />
    </div>
  )
}
