'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../context/i18n';

export default function LoginPage() {
  const router = useRouter();
  const { lang } = useLanguage();
  const t = translations[lang];
  const [form, setForm] = useState({ email: '', password: '' });
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      router.push('/profile');
    } else setMsg(t.loginError || 'Error');
  
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white px-4">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md border border-blue-500/20">
        <h1 className="text-2xl font-extrabold text-center mb-6 text-blue-400">
          {t.login}
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            placeholder={t.email}
            className="bg-gray-700 border border-gray-600 p-3 rounded focus:outline-none focus:border-blue-500 transition"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            placeholder={t.password}
            type="password"
            className="bg-gray-700 border border-gray-600 p-3 rounded focus:outline-none focus:border-blue-500 transition"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold mt-2 transition-all"
          >
            {t.login}
          </button>
        </form>

        {msg && (
          <p className="mt-4 text-center text-sm text-gray-300">{msg}</p>
        )}

        <p className="mt-6 text-center text-gray-400 text-sm">
          {t.alreadyHaveAccount}{' '}
          <a href="/register" className="text-blue-400 hover:text-blue-500 underline">
            {t.createAccount}
          </a>
        </p>
      </div>
    </div>
  );
}
