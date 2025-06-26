import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const { data: { user } } = await supabase.auth.getUser();

  // Protege a rota /agents
  if (req.nextUrl.pathname.startsWith('/agents') && !user) {
    const loginUrl = new URL('/signin', req.url);
    return NextResponse.redirect(loginUrl);
  }

  return res;
}

// Defina as rotas protegidas
export const config = {
  matcher: ['/agents/:path*'],
};