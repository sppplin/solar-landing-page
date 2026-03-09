import { FaWhatsapp } from "react-icons/fa"

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919871713676?text=Hello%2C+I+need+a+packaging+quote"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50 flex h-12 w-12 animate-bob items-center justify-center rounded-full bg-primary shadow-[0_6px_24px_rgba(246,185,19,0.45)] no-underline sm:bottom-6 sm:right-6 sm:h-14 sm:w-14"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp className="h-6 w-6 text-foreground sm:h-8 sm:w-8" />
    </a>
  )
}
