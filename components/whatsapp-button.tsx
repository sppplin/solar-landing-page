"use client"

import { useEffect, useRef, useState } from "react"
import { FaWhatsapp } from "react-icons/fa"
import Image from "next/image"
import { X } from "lucide-react"

const WA_LINK = "https://wa.me/919871713676?text=Hello%2C+I+need+a+packaging+quote"

export function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false)
  const audioCtxRef      = useRef<AudioContext | null>(null)
  const reopenTimerRef   = useRef<ReturnType<typeof setTimeout> | null>(null)
  const interactedRef    = useRef(false)
  const openScheduledRef = useRef(false)
  const userTypingRef    = useRef(false)  // true when user is filling a form

  // ── Detect form focus / blur ───────────────────────────────────────────────
  useEffect(() => {
    const FORM_TAGS = ["INPUT", "TEXTAREA", "SELECT"]

    const onFocusIn = (e: FocusEvent) => {
      if (FORM_TAGS.includes((e.target as HTMLElement)?.tagName)) {
        userTypingRef.current = true
        // Cancel any pending auto-open timer
        if (reopenTimerRef.current) {
          clearTimeout(reopenTimerRef.current)
          reopenTimerRef.current = null
        }
        // Also close if currently open
        setIsOpen(false)
      }
    }

    const onFocusOut = (e: FocusEvent) => {
      if (FORM_TAGS.includes((e.target as HTMLElement)?.tagName)) {
        // Small delay — user might be tabbing between fields
        setTimeout(() => {
          const active = document.activeElement
          if (!active || !FORM_TAGS.includes(active.tagName)) {
            userTypingRef.current = false
          }
        }, 200)
      }
    }

    document.addEventListener("focusin",  onFocusIn)
    document.addEventListener("focusout", onFocusOut)
    return () => {
      document.removeEventListener("focusin",  onFocusIn)
      document.removeEventListener("focusout", onFocusOut)
    }
  }, [])

  // ── Sound ──────────────────────────────────────────────────────────────────
  const playSound = () => {
    try {
      if (!audioCtxRef.current) audioCtxRef.current = new AudioContext()
      const ctx = audioCtxRef.current
      if (ctx.state === "suspended") ctx.resume()
      const playTone = (freq: number, start: number, dur: number, gain: number) => {
        const osc  = ctx.createOscillator()
        const gNode = ctx.createGain()
        osc.connect(gNode); gNode.connect(ctx.destination)
        osc.type = "sine"
        osc.frequency.setValueAtTime(freq, start)
        gNode.gain.setValueAtTime(0, start)
        gNode.gain.linearRampToValueAtTime(gain, start + 0.01)
        gNode.gain.exponentialRampToValueAtTime(0.001, start + dur)
        osc.start(start); osc.stop(start + dur)
      }
      const now = ctx.currentTime
      playTone(880,  now,        0.25, 0.6)
      playTone(1100, now + 0.15, 0.30, 0.5)
      playTone(1320, now + 0.30, 0.35, 0.4)
    } catch { /* silent */ }
  }

  // ── Open / close ───────────────────────────────────────────────────────────
  const openChat = () => {
    // Don't open if user is filling a form
    if (userTypingRef.current) return
    setIsOpen(true)
    playSound()
  }

  const closeChat = () => {
    setIsOpen(false)
    if (reopenTimerRef.current) clearTimeout(reopenTimerRef.current)
    // Reopen after 5s — but only if user not in a form
    reopenTimerRef.current = setTimeout(() => {
      if (!userTypingRef.current) openChat()
    }, 5000)
  }

  // ── First interaction trigger ──────────────────────────────────────────────
  useEffect(() => {
    const unlockAndSchedule = () => {
      try {
        if (!audioCtxRef.current) audioCtxRef.current = new AudioContext()
        if (audioCtxRef.current.state === "suspended") audioCtxRef.current.resume()
      } catch { /* silent */ }

      if (interactedRef.current) return
      interactedRef.current = true

      window.removeEventListener("click",       unlockAndSchedule)
      window.removeEventListener("pointerdown", unlockAndSchedule)
      window.removeEventListener("touchstart",  unlockAndSchedule)
      window.removeEventListener("keydown",     unlockAndSchedule)

      if (!openScheduledRef.current) {
        openScheduledRef.current = true
        reopenTimerRef.current = setTimeout(() => {
          if (!userTypingRef.current) openChat()
        }, 5000)
      }
    }

    const onScroll = () => {
      if (interactedRef.current) return
      interactedRef.current = true
      window.removeEventListener("scroll", onScroll)
      if (!openScheduledRef.current) {
        openScheduledRef.current = true
        reopenTimerRef.current = setTimeout(() => {
          if (!userTypingRef.current) setIsOpen(true)
        }, 5000)
      }
    }

    window.addEventListener("click",       unlockAndSchedule)
    window.addEventListener("pointerdown", unlockAndSchedule)
    window.addEventListener("touchstart",  unlockAndSchedule, { passive: true })
    window.addEventListener("keydown",     unlockAndSchedule)
    window.addEventListener("scroll",      onScroll, { passive: true })

    return () => {
      if (reopenTimerRef.current) clearTimeout(reopenTimerRef.current)
      window.removeEventListener("click",       unlockAndSchedule)
      window.removeEventListener("pointerdown", unlockAndSchedule)
      window.removeEventListener("touchstart",  unlockAndSchedule)
      window.removeEventListener("keydown",     unlockAndSchedule)
      window.removeEventListener("scroll",      onScroll)
    }
  }, [])

  const handleButtonClick = () => {
    if (isOpen) closeChat()
    else {
      if (reopenTimerRef.current) clearTimeout(reopenTimerRef.current)
      openChat()
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">

      {/* Chat Popup Card */}
      <div
        className={`w-[280px] overflow-hidden rounded-2xl shadow-2xl transition-all duration-300 sm:w-[300px] ${
          isOpen
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-4 scale-95 opacity-0"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-2 py-2" style={{ background: "#25D366" }}>
          <div className="flex items-center gap-2.5">
            <div className="relative h-13 w-13 shrink-0 overflow-hidden rounded-full border-2 border-white/40">
              <Image src="/icon.jpg" alt="Solar Print Process" fill className="object-cover" />
            </div>
            <div>
              <p className="text-[14px] font-bold leading-tight text-white">Solar Print Process Pvt. Ltd.</p>
              <p className="text-[12px] text-white/80">Typically replies instantly</p>
            </div>
          </div>
          <button
            onClick={closeChat}
            className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30"
            aria-label="Close chat"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Body */}
        <div className="bg-[#ECE5DD] px-4 py-4">
          <div className="relative mb-1 w-fit max-w-[220px] rounded-[12px] rounded-tl-none bg-white px-3.5 py-2.5 shadow-sm">
            <span className="absolute -left-[6px] top-0 h-3 w-3 bg-white" style={{ clipPath: "polygon(100% 0, 100% 100%, 0 0)" }} />
            <p className="text-[13px] font-semibold leading-snug text-gray-800">👋 Hi there!</p>
            <p className="mt-0.5 text-[12px] leading-relaxed text-gray-600">
              Need packaging for your brand? We'd love to help. Chat with us now!
            </p>
            <p className="mt-1.5 text-right text-[10px] text-gray-400">now ✓✓</p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#ECE5DD] px-4 pb-3">
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full rounded-full py-2.5 text-[13px] font-bold text-white transition-opacity hover:opacity-90"
            style={{ background: "#25D366" }}
          >
            <FaWhatsapp className="h-4 w-4" />
            Chat With Us
          </a>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-center gap-1 bg-white py-2">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="#22c55e" stroke="#22c55e" strokeWidth="1" strokeLinejoin="round"/>
          </svg>
          <span className="text-[10px] text-gray-400">Powered by</span>
          <a href="https://codeclue.in" target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold">
            <span style={{ color: "#17bcd2" }}>Code</span>
            <span style={{ color: "#ffa244" }}> Clue</span>
          </a>
        </div>
      </div>

      {/* Floating Button */}
      <button
        onClick={handleButtonClick}
        aria-label="Chat on WhatsApp"
        className="relative flex h-14 w-14 items-center justify-center rounded-full transition-transform duration-150 hover:scale-110 active:scale-95"
        style={{ background: "#25D366", boxShadow: "0 6px 28px rgba(37,211,102,0.55)" }}
      >
        {!isOpen && (
          <span className="absolute inset-0 rounded-full" aria-hidden="true">
            <span className="absolute inset-0 rounded-full opacity-30" style={{ background: "#25D366", animation: "wa-ripple 2s ease-out infinite" }} />
            <span className="absolute inset-0 rounded-full opacity-20" style={{ background: "#25D366", animation: "wa-ripple 2s ease-out infinite 0.5s" }} />
            <span className="absolute inset-0 rounded-full opacity-10" style={{ background: "#25D366", animation: "wa-ripple 2s ease-out infinite 1s" }} />
          </span>
        )}
        <span className="relative z-10">
          {isOpen ? <X className="h-6 w-6 text-white" /> : <FaWhatsapp className="h-7 w-7 text-white" />}
        </span>
      </button>

      <style>{`
        @keyframes wa-ripple {
          0%   { transform: scale(1);   opacity: 0.35; }
          100% { transform: scale(2.6); opacity: 0; }
        }
      `}</style>
    </div>
  )
}