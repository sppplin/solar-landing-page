"use client"

import { useEffect, useRef } from "react"
import { FaWhatsapp } from "react-icons/fa"

export function WhatsAppButton() {
  const audioCtxRef = useRef<AudioContext | null>(null)

  const playSound = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext()
      }
      const ctx = audioCtxRef.current

      const playTone = (freq: number, startTime: number, duration: number, gain: number) => {
        const osc = ctx.createOscillator()
        const gainNode = ctx.createGain()
        osc.connect(gainNode)
        gainNode.connect(ctx.destination)
        osc.type = "sine"
        osc.frequency.setValueAtTime(freq, startTime)
        gainNode.gain.setValueAtTime(0, startTime)
        gainNode.gain.linearRampToValueAtTime(gain, startTime + 0.01)
        gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration)
        osc.start(startTime)
        osc.stop(startTime + duration)
      }

      const now = ctx.currentTime
      playTone(880,  now,        0.25, 0.6)
      playTone(1100, now + 0.15, 0.30, 0.5)
      playTone(1320, now + 0.30, 0.35, 0.4)
    } catch {
      // silent fail
    }
  }

  useEffect(() => {
    // Play immediately on mount — works after any user interaction (browser policy)
    // Also try playing on first interaction if autoplay was blocked
    const tryPlay = () => {
      playSound()
      window.removeEventListener("click", tryPlay)
      window.removeEventListener("scroll", tryPlay)
      window.removeEventListener("touchstart", tryPlay)
      window.removeEventListener("keydown", tryPlay)
    }

    // Attempt immediate autoplay
    playSound()

    // Fallback: fire on first interaction in case browser blocked autoplay
    window.addEventListener("click", tryPlay, { once: true })
    window.addEventListener("scroll", tryPlay, { once: true })
    window.addEventListener("touchstart", tryPlay, { once: true })
    window.addEventListener("keydown", tryPlay, { once: true })

    // Repeat every 6s for ongoing attention
    const interval = setInterval(playSound, 6000)

    return () => {
      clearInterval(interval)
      window.removeEventListener("click", tryPlay)
      window.removeEventListener("scroll", tryPlay)
      window.removeEventListener("touchstart", tryPlay)
      window.removeEventListener("keydown", tryPlay)
    }
  }, [])

  return (
    <a
      href="https://wa.me/919871713676?text=Hello%2C+I+need+a+packaging+quote"
      target="_blank"
      rel="noopener noreferrer"
      onClick={playSound}
      className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6"
      aria-label="Chat on WhatsApp"
    >
      {/* Ripple rings */}
      <span className="absolute inset-0 rounded-full" aria-hidden="true">
        <span
          className="absolute inset-0 rounded-full opacity-30"
          style={{ background: "#25D366", animation: "wa-ripple 2s ease-out infinite" }}
        />
        <span
          className="absolute inset-0 rounded-full opacity-20"
          style={{ background: "#25D366", animation: "wa-ripple 2s ease-out infinite 0.5s" }}
        />
        <span
          className="absolute inset-0 rounded-full opacity-10"
          style={{ background: "#25D366", animation: "wa-ripple 2s ease-out infinite 1s" }}
        />
      </span>

      {/* Button */}
      <span
        className="relative flex h-12 w-12 items-center justify-center rounded-full transition-transform duration-150 hover:scale-110 active:scale-95 sm:h-14 sm:w-14"
        style={{ background: "#25D366", boxShadow: "0 6px 24px rgba(37,211,102,0.5)" }}
      >
        <FaWhatsapp className="h-6 w-6 text-white sm:h-7 sm:w-7" />
      </span>

      <style>{`
        @keyframes wa-ripple {
          0%   { transform: scale(1);   opacity: 0.35; }
          100% { transform: scale(2.6); opacity: 0; }
        }
      `}</style>
    </a>
  )
}