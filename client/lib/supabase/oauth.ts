import { supabase } from './client';

export function signInWithGoogle(redirectTo: string) {
    return supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo,
        },
    })
} 