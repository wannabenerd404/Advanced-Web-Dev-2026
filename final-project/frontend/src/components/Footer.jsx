export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">BS</div>
            <p className="text-sm font-semibold">Booking System</p>
          </div>
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} Booking System. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}