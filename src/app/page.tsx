'use client';

import React, { useEffect, useState } from 'react';
import { useLanguage } from './context/LanguageContext';
import { translations } from './context/i18n';

export default function HomePage() {
  const { lang } = useLanguage();
  const t = translations[lang];
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // ✅ استخدم البيانات المخزنة في localStorage باسم "user"
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    }
  }, []);

  return (
    <div
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-6"
    >
      <div className="bg-gray-800 border border-blue-500/20 shadow-xl rounded-3xl p-10 w-full max-w-2xl text-center transition-all hover:shadow-blue-500/20">
        <h1 className="text-4xl font-extrabold text-blue-400 mb-4 tracking-wide">
          {user ? `${t.welcome} ${user.name} ` : t.welcomeGuest}
        </h1>

        <p className="text-lg text-gray-300 mb-8 leading-relaxed">
          {t.description}
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          {user ? (
            <>
              <a
                href="/profile"
                className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 px-6 py-3 rounded-xl font-semibold transition-all"
              >
                {t.viewProfile}
              </a>
              <a
                href="/book-course"
                className="bg-purple-600 hover:bg-purple-700 active:bg-purple-800 px-6 py-3 rounded-xl font-semibold transition-all"
              >
                {t.bookNow}
              </a>
            </>
          ) : (
            <>
              <a
                href="/login"
                className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 px-6 py-3 rounded-xl font-semibold transition-all"
              >
                {t.login}
              </a>
              <a
                href="/register"
                className="bg-gray-700 hover:bg-gray-600 active:bg-gray-500 px-6 py-3 rounded-xl font-semibold transition-all"
              >
                {t.register}
              </a>
            </>
          )}
        </div>
      </div>

      <footer className="mt-10 text-gray-400 text-sm">
        © {new Date().getFullYear()} SkillHub. {t.footerText}
      </footer>
    </div>
  );
}
