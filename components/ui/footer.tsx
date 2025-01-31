import Link from "next/link";
import Logo from "./logo";

interface FooterProps {
  border?: boolean;
}

export default function Footer({ border = false }: FooterProps) {
  return (
    <footer className={`bg-white dark:bg-gray-900 ${border ? 'border-t border-gray-200 dark:border-gray-800' : ''}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-8 md:py-12">
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Seu Site. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
}
