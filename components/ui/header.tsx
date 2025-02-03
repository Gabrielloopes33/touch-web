import Link from "next/link";
import Image from "next/image";
import ThemeToggle from './theme-toggle'

export default function Header() {
  return (
    <header className="fixed top-5 left-2 right-5 bg-white/1 z-30 py-4">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative flex h-14 items-center justify-between rounded-2xl bg-white/90 px-3 shadow-lg shadow-black/[0.03] backdrop-blur-sm before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent dark:before:hidden before:[background:linear-gradient(theme(colors.gray.100),theme(colors.gray.200))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]">
          {/* Site branding */}
          <div className="flex-shrink-0">
            <Link href="/" className="block" aria-label="Cruip">
              <Image
                src="/images/logo-full.svg"
                width={100}
                height={30}
                alt="Logo"
                priority
                className="w-16 md:w-20 lg:w-24"
              />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex flex-1 justify-end items-center gap-2 md:gap-4">
            <ThemeToggle />
            <Link
              href="/Sobre"
              className="btn-sm bg-white text-gray-800 shadow hover:bg-gray-50 whitespace-nowrap text-sm"
            >
              Sobre
            </Link>
            <Link
              href="/Port"
              className="btn-sm bg-white text-gray-800 shadow hover:bg-gray-50 whitespace-nowrap text-sm"
            >
              Portfólio
            </Link>
            <Link
              href="/signin"
              className="btn-sm bg-gray-800 text-gray-200 shadow hover:bg-gray-900 whitespace-nowrap text-sm"
            >
              Login
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
