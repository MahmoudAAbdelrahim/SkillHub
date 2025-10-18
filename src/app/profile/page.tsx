'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../context/i18n';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const { lang } = useLanguage();
  const t = translations[lang];

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser(payload);
    } catch {
      setUser(null);
    }
  }, []);

  if (!user)
    return (
      <div
        dir={lang === 'ar' ? 'rtl' : 'ltr'}
        className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white"
      >
        <p className="text-lg font-medium bg-gray-800 px-6 py-3 rounded-xl shadow border border-blue-500/30">
          {t.notLoggedIn}
        </p>
      </div>
    );

  return (
    <div
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6"
    >
      <div className="bg-gray-800 border border-blue-500/20 shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-extrabold text-blue-400 mb-6 tracking-wide">
          {t.welcome} {user.name}
        </h1>

        <a
          href="/book-course"
          className="block w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3 rounded-xl transition"
        >
          {t.bookNow}
        </a>
      </div>
    </div>
  );
}
