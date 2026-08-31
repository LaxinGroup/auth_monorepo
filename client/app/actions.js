'use server';
import { auth } from '@/lib/auth/server';
import { redirect } from 'next/navigation';

export async function signInEmail(formData) {
  const email = formData.get('email');
  const password = formData.get('password');

  const { data, error } = await auth.signIn.email({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  redirect('/dashboard');
}

export async function signUpEmail(formData) {
  const email = formData.get('email');
  const password = formData.get('password');
  const name = formData.get('name') || 'New User';

  const { data, error } = await auth.signUp.email({
    email,
    password,
    name,
  });

  if (error) {
    return { error: error.message };
  }

  redirect('/dashboard');
}

export async function signInSocial(provider) {
  await auth.signIn.social({
    provider,
    callbackURL: '/dashboard',
  });
}

export async function signOutUser() {
  await auth.signOut();
  redirect('/login');
}
