import Link from "next/link";
import Logo from "./logo";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900">
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
