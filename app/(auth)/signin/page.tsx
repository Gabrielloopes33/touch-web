'use client';

import React, { useState, Suspense } from "react";
import Link from "next/link";
import Header from "@/components/ui/header"; // Certifique-se de que o caminho está correto
import LoadingSpinner from "../../../components/LoadingSpinner";
import { supabase } from "../../../utils/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";

function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      setError(error.message);
    } else {
      // Verifica se há uma URL de redirecionamento
      const redirectTo = searchParams.get('redirectTo');
      
      if (redirectTo && redirectTo !== '/agents') {
        // Redireciona para a URL original
        window.location.replace(redirectTo);
        return;
      } else {
        // Vai para /agents por padrão
        router.push("/agents");
      }
    }
  }

  return (
    <div className="container mx-auto px-4">
      <div className="mb-10">
        <h1 className="text-4xl font-bold">Faça login na sua conta</h1>
      </div>
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-sm mx-auto mt-10"
      >
        <div className="space-y-4">
          <div>
            <label
              className="mb-1 block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              className="form-input w-full py-2"
              type="email"
              placeholder="email-de-acesso@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              className="mb-1 block text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Senha
            </label>
            <input
              id="password"
              className="form-input w-full py-2"
              type="password"
              autoComplete="on"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        {error && <div className="text-red-500">{error}</div>}
        <div className="mt-6">
          <button className="btn w-full bg-gradient-to-t from-purple-700 to-purple-500 bg-[length:100%_100%] bg-[bottom] text-white shadow hover:bg-[length:100%_150%]">
            Acessar
          </button>
        </div>
      </form>
      {/* Bottom link */}
      <div className="mt-6 text-center">
        <Link
          className="text-sm text-gray-700 underline hover:no-underline"
          href="/reset-password"
        >
          Esqueci minha senha
        </Link>
      </div>
    </div>
  );
}

export default function SignIn() {
  return (
    <>
      <Header />
      <Suspense fallback={
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <h1 className="text-4xl font-bold">Faça login na sua conta</h1>
          </div>
          <div className="flex justify-center items-center h-32">
            <LoadingSpinner size="md" text="Carregando..." />
          </div>
        </div>
      }>
        <SignInForm />
      </Suspense>
    </>
  );
}
