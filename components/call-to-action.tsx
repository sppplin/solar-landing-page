"use client"

import { useState } from "react"
import { HiOutlineClipboardList } from "react-icons/hi"
import { FaWhatsapp } from "react-icons/fa"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { QuoteForm } from "./quote-form"

export function CallToAction() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <section className="bg-gradient-to-br from-secondary to-[#2a2a2a] py-10 text-center sm:py-16">
      <div className="mx-auto max-w-[1120px] px-4 sm:px-6">
        <h2 className="mb-3 font-heading text-[clamp(24px,5vw,50px)] font-black uppercase leading-tight text-primary sm:mb-3.5">
          Ready to Get Your Packaging Quote?
        </h2>
        <p className="mx-auto mb-6 max-w-[560px] text-sm text-white sm:mb-8 sm:text-[17px]">
          Fill the form above or WhatsApp your brief. We respond within 2 hours, Monday to Saturday.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-3.5">
          <button
            type="button"
            onClick={() => setIsDialogOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 font-heading text-base font-black uppercase tracking-wide text-foreground no-underline transition-transform hover:-translate-y-0.5 sm:px-8 sm:py-4 sm:text-lg cursor-pointer"
          >
            <HiOutlineClipboardList className="h-5 w-5" />
            Fill Quote Form
          </button>
          <a
            href="https://wa.me/919871713676?text=Hello%2C+I+need+a+custom+packaging+quote"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 font-heading text-base font-black uppercase tracking-wide text-foreground no-underline transition-transform hover:-translate-y-0.5 sm:px-8 sm:py-4 sm:text-lg"
          >
            <FaWhatsapp className="h-5 w-5" />
            WhatsApp Us Now
          </a>
        </div>

        <p className="mt-4 text-xs text-white sm:mt-5 sm:text-sm">
          C-10, Sector 85, Noida UP 201305 | +91 98717 13676 | business@spppl.in
        </p>
      </div>

      {/* Quote Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent
          className="max-h-[90vh] w-[95vw] max-w-md overflow-y-auto bg-white p-0 sm:max-w-lg"
          showCloseButton={true}
        >
          <div className="sr-only">
            <DialogHeader>
              <DialogTitle>Request Quote</DialogTitle>
              <DialogDescription>
                Fill out the form below to get a free quote for your packaging needs.
              </DialogDescription>
            </DialogHeader>
          </div>
          <div className="p-0">
            <QuoteForm variant="dialog" />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
