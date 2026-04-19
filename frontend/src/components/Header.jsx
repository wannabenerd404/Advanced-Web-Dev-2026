export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-gray-900 text-white shadow-lg">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">BS</div>
            <div className="leading-tight">
              <span className="block text-sm font-semibold">Booking System</span>
              <span className="block text-xs text-white/70">Secure resource booking</span>
            </div>
          </a>
          <nav className="flex items-center gap-3">
            <a href="/" className="rounded-xl border border-white/20 px-4 py-2 text-sm font-semibold hover:bg-white/10 text-center">
              Home
            </a>
            <a href="/form" className="rounded-xl border border-white/20 px-4 py-2 text-sm font-semibold hover:bg-white/10 text-center">
              Contact
            </a>
            <a href="/messages" className="rounded-xl border border-white/20 px-4 py-2 text-sm font-semibold hover:bg-white/10 text-center">
              Messages
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}