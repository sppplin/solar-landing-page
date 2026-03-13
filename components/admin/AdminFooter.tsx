export default function AdminFooter() {
  return (
    <footer className="sticky bottom-0 z-50 bg-background/90 backdrop-blur-lg border-t border-border">
      <p className="text-center text-[11px] text-muted-foreground/50 py-3">
        © {new Date().getFullYear()} Solar Print Process Pvt. Ltd. &nbsp;·&nbsp; Made with ❤️ by{" "}
        <a
          href="https://codeclue.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity"
        >
          <span style={{ color: "#17bcd2" }}>Code </span>
          <span style={{ color: "#ffa244" }}>Clue</span>
        </a>
      </p>
    </footer>
  )
}