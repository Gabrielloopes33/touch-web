'use client';

import { useAuth } from '../hooks/useAuth';
import { supabase } from '../utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function AuthNavigation() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.push('/signin');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center space-x-4">
        <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex items-center space-x-4 text-sm">
      <span className="text-gray-600">
        Logado como: <span className="font-medium">{user.email}</span>
      </span>
      <button
        onClick={handleLogout}
        className="px-3 py-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
      >
        Logout
      </button>
    </div>
  );
}
