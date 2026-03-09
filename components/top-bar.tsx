export function TopBar() {
  return (
    <div className="bg-secondary px-4 py-2 text-center text-xs text-[#999999] sm:px-5 sm:py-2.5 sm:text-[13.5px]">
      <span className="hidden sm:inline">
        Packaging Manufacturer Since <strong className="text-primary">1975</strong> &nbsp;|&nbsp; 200,000 Sq Ft Plant, Noida &nbsp;|&nbsp;
      </span>
      <span className="sm:hidden">
        Est. <strong className="text-primary">1975</strong> &nbsp;|&nbsp;
      </span>
      Call:{" "}
      <a href="tel:+919871713676" className="font-semibold text-primary no-underline">
        +91 98717 13676
      </a>
    </div>
  )
}
