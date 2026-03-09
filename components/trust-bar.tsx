import { FiCalendar, FiMapPin, FiTruck, FiShield } from "react-icons/fi"
import { MdFactory } from "react-icons/md"
import { PiHandshakeFill } from "react-icons/pi"

const trustItems = [
  { icon: FiCalendar, label: "Established 1975" },
  { icon: FiMapPin, label: "C-10 Sector 85, Noida" },
  { icon: MdFactory, label: "200,000 Sq Ft Factory" },
  { icon: PiHandshakeFill, label: "500+ B2B Clients" },
  { icon: FiTruck, label: "Pan India Delivery" },
  { icon: FiShield, label: "ISO Grade Quality" },
]

export function TrustBar() {
  return (
    <div className="bg-primary py-3 sm:py-4">
      <div className="mx-auto grid max-w-[1120px] grid-cols-2 gap-x-4 gap-y-2 px-4 sm:flex sm:flex-wrap sm:justify-center sm:gap-5 sm:px-6 md:gap-7">
        {trustItems.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-1.5 font-heading text-[10px] font-bold uppercase tracking-wide text-foreground sm:gap-2 sm:text-xs md:text-sm"
          >
            <item.icon className="h-3.5 w-3.5 shrink-0 fill-foreground/75 text-foreground/75 sm:h-4 sm:w-4 md:h-[18px] md:w-[18px]" />
            {item.label}
          </div>
        ))}
      </div>
    </div>
  )
}
