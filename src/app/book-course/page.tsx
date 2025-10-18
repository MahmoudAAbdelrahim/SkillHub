'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../context/i18n';

export default function BookCoursePage() {
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const { lang } = useLanguage();
  const t = translations[lang];

  const handleBook = async () => {
    const token = localStorage.getItem('token');
    if (!token) return setMsg(t.loginFirst);

    setLoading(true);
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const res = await fetch('/api/course', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: payload.id }),
      });

      const data = await res.json();

      if (data.courseNumber) {
        if (msg.includes(data.courseNumber)) return;
        const message = msg
          ? t.alreadyBooked(data.courseNumber)
          : t.success(data.courseNumber);
        setMsg(message);
      } else setMsg(t.errorb);
    } catch {
      setMsg(t.serverError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      className="flex flex-col items-center justify-center min-h-screen 
                 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 text-white"
    >
      <div className="bg-gray-800 border border-blue-500/20 shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-extrabold text-blue-400 mb-6 tracking-wide">
          {t.titleb}
        </h1>

        <button
          onClick={handleBook}
          disabled={loading}
          className={`w-full py-3 rounded-xl font-semibold text-white transition-all 
            ${loading 
              ? 'bg-blue-500/50 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'}`}
        >
          {loading ? t.loading : t.buttonb}
        </button>

        {msg && (
          <p className="mt-6 text-lg font-medium text-blue-200 bg-gray-900/50 border border-blue-500/20 rounded-lg p-3">
            {msg}
          </p>
        )}
      </div>
    </div>
  );
}
