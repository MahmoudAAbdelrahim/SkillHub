'use client';

import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../context/i18n';

export default function RegisterPage() {
  const { lang } = useLanguage();
  const t = translations[lang];

  const [form, setForm] = useState({ name: '', phone: '', email: '', password: '' });
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setMsg(data.message || data.error);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white px-4">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md border border-blue-500/20">
        <h1 className="text-2xl font-extrabold text-center mb-6 text-blue-400">
          {t.createAccount}
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            placeholder={t.fullName}
            className="bg-gray-700 border border-gray-600 p-3 rounded focus:outline-none focus:border-blue-500 transition"
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
          <input
            placeholder={t.phone}
            className="bg-gray-700 border border-gray-600 p-3 rounded focus:outline-none focus:border-blue-500 transition"
            onChange={e => setForm({ ...form, phone: e.target.value })}
          />
          <input
            placeholder={t.email}
            type="email"
            className="bg-gray-700 border border-gray-600 p-3 rounded focus:outline-none focus:border-blue-500 transition"
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
          <input
            placeholder={t.password}
            type="password"
            className="bg-gray-700 border border-gray-600 p-3 rounded focus:outline-none focus:border-blue-500 transition"
            onChange={e => setForm({ ...form, password: e.target.value })}
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold mt-2 transition-all"
          >
            {t.register}
          </button>
        </form>

        {msg && (
          <p className="mt-4 text-center text-sm text-gray-300">{msg}</p>
        )}

        <p className="mt-6 text-center text-gray-400 text-sm">
          {t.alreadyHaveAccount}{' '}
          <a href="/login" className="text-blue-400 hover:text-blue-500 underline">
            {t.login}
          </a>
        </p>
      </div>
    </div>
  );
}
