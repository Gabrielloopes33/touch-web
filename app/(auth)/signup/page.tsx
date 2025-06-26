'use client';

import { useState } from 'react';
import { supabase } from '../../../utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setError(error.message);
    else setSuccess('Verifique seu e-mail para confirmar o cadastro!');
  }

  return (
    <>
      <div className="mb-10">
        <h1 className="text-4xl font-bold">Crie sua conta aqui! </h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm mx-auto mt-10">
        <div className="space-y-4">
          <div>
            <label
              className="mb-1 block text-sm font-medium text-gray-700"
              htmlFor="name"
            >
              Nome Completo
            </label>
            <input
              id="name"
              className="form-input w-full py-2"
              type="text"
              placeholder="Renato Cerol da Silva"
              required
            />
          </div>
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
              placeholder="cerolsilva@gmail.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              className="mb-1 block text-sm font-medium text-gray-700"
              htmlFor="phone"
            >
              Telefone
            </label>
            <input
              id="phone"
              className="form-input w-full py-2"
              type="text"
              placeholder="(+55) 31 9 9999-9999"
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
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="mt-6 space-y-3">
          <button className="btn w-full bg-gradient-to-t from-blue-600 to-blue-500 bg-[length:100%_100%] bg-[bottom] text-white shadow hover:bg-[length:100%_150%]">
            Registrar 
          </button>
          <div className="text-center text-sm italic text-gray-400">Or</div>
          <button className="btn w-full bg-gradient-to-t from-gray-900 to-gray-700 bg-[length:100%_100%] bg-[bottom] text-white shadow hover:bg-[length:100%_150%]">
            --teste-- Continue com github --teste--
          </button>
        </div>
      </form>

      {/* Error and success messages */}
      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-600">{success}</div>}

      {/* Bottom link */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          Se inscrevendo você concorda com nossos{" "}
          <a
            className="whitespace-nowrap font-medium text-gray-700 underline hover:no-underline"
            href="#0"
          >
            Termos de serviço
          </a>{" "}
          and{" "}
          <a
            className="whitespace-nowrap font-medium text-gray-700 underline hover:no-underline"
            href="#0"
          >
            Política de privacidade 
          </a>
          .
        </p>
      </div>
    </>
  );
}
