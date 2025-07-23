import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  
  // Aguarda um pouco para garantir que a sessão seja processada
  const { data: { user } } = await supabase.auth.getUser();

  // Protege APENAS a rota /agents
  if (req.nextUrl.pathname.startsWith('/agents') && !user) {
    const loginUrl = new URL('/signin', req.url);
    loginUrl.searchParams.set('redirectTo', req.nextUrl.pathname + req.nextUrl.search);
    return NextResponse.redirect(loginUrl);
  }

  return res;
}

// Defina as rotas protegidas - APENAS /agents
export const config = {
  matcher: ['/agents/:path*'],
};