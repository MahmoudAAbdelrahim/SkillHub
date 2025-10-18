'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../context/i18n';

export default function AdminPage() {
  const [data, setData] = useState<{ users: any[]; courses: any[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const { lang } = useLanguage();
  const t = translations[lang];

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/admin/users');
      const json = await res.json();
      setData(json);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
        <p className="text-lg font-semibold">{lang === 'ar' ? 'جار التحميل...' : 'Loading...'}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white p-8">
      <h1 className="text-3xl font-extrabold text-center mb-10 text-blue-400">
        {lang === 'ar' ? 'لوحة تحكم الأدمن' : 'Admin Dashboard'}
      </h1>

      {/* المستخدمين */}
      <section className="mb-10 bg-gray-800 border border-blue-500/20 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 border-b border-gray-600 pb-2">
          {lang === 'ar' ? '📋 المستخدمين' : '📋 Users'}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-center text-sm">
            <thead className="bg-gray-700">
              <tr>
                <th className="border border-gray-600 p-3">{t.fullName}</th>
                <th className="border border-gray-600 p-3">{t.email}</th>
                <th className="border border-gray-600 p-3">{t.phone}</th>
                <th className="border border-gray-600 p-3">
                  {lang === 'ar' ? 'أدمن؟' : 'Admin?'}
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.users?.map((u) => (
                <tr key={u._id} className="hover:bg-gray-700/40">
                  <td className="border border-gray-700 p-3">{u.name}</td>
                  <td className="border border-gray-700 p-3">{u.email}</td>
                  <td className="border border-gray-700 p-3">{u.phone}</td>
                  <td className="border border-gray-700 p-3">
                    {u.isAdmin ? '✔️' : '❌'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* الحجوزات */}
      <section className="bg-gray-800 border border-blue-500/20 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 border-b border-gray-600 pb-2">
          {lang === 'ar' ? '🎓 الحجوزات' : '🎓 Bookings'}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-center text-sm">
            <thead className="bg-gray-700">
              <tr>
                <th className="border border-gray-600 p-3">
                  {lang === 'ar' ? 'اسم المستخدم' : 'User Name'}
                </th>
                <th className="border border-gray-600 p-3">{t.email}</th>
                <th className="border border-gray-600 p-3">
                  {lang === 'ar' ? 'رقم الحجز' : 'Booking No.'}
                </th>
                <th className="border border-gray-600 p-3">
                  {lang === 'ar' ? 'تاريخ الحجز' : 'Booking Date'}
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.courses?.map((c) => (
                <tr key={c._id} className="hover:bg-gray-700/40">
                  <td className="border border-gray-700 p-3">{c.userId?.name}</td>
                  <td className="border border-gray-700 p-3">{c.userId?.email}</td>
                  <td className="border border-gray-700 p-3">{c.courseNumber}</td>
                  <td className="border border-gray-700 p-3">
                    {new Date(c.bookedAt).toLocaleDateString(
                      lang === 'ar' ? 'ar-EG' : 'en-US'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
