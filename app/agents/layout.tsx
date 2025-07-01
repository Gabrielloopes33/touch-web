import React from "react";

export default function AgentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Não renderiza o Header aqui, removendo a navbar superior
  return (
    <html lang="en" className="h-full scroll-smooth" suppressHydrationWarning>
      <body className="flex h-full flex-col dark:bg-gray-900">
        {children}
      </body>
    </html>
  );
}
