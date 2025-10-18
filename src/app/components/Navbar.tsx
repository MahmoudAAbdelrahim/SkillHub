'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext'; // ✅ استخدم الكونتكست

interface User {
  name: string;
  email: string;
  role: 'admin' | 'client';
  userId: string;
}

export default function Navbar() {
  const router = useRouter();
  const { lang, toggleLang } = useLanguage(); // ✅ اللغة من الكونتكست
  const [user, setUser] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser({
        name: payload.name || 'User',
        email: payload.email,
        role: payload.isAdmin ? 'admin' : 'client',
        userId: payload.id,
      });
    } catch {
      localStorage.removeItem('token');
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/login');
  };

  const renderLinks = () => {
    if (!user) {
      return (
        <>
          <li><Link href="/">{lang === 'ar' ? 'الرئيسية' : 'Home'}</Link></li>
          <li><Link href="/login">{lang === 'ar' ? 'تسجيل الدخول' : 'Login'}</Link></li>
          <li><Link href="/register">{lang === 'ar' ? 'إنشاء حساب' : 'Register'}</Link></li>
        </>
      );
    }
    if (user.role === 'admin') {
      return (
        <>
          <li><Link href="/admin">{lang === 'ar' ? 'لوحة التحكم' : 'Dashboard'}</Link></li>
          <li><Link href="/profile">{lang === 'ar' ? 'الملف الشخصي' : 'Profile'}</Link></li>
        </>
      );
    }
    return (
      <>
        <li><Link href="/">{lang === 'ar' ? 'الرئيسية' : 'Home'}</Link></li>
        <li><Link href="/book-course">{lang === 'ar' ? 'احجز كورس' : 'Book Course'}</Link></li>
        <li><Link href="/profile">{lang === 'ar' ? 'الملف الشخصي' : 'Profile'}</Link></li>
      </>
    );
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-lg px-6 py-4 flex justify-between items-center relative border-b border-blue-500/20">
      {/* Logo */}
      <div className="font-extrabold text-2xl text-blue-400 tracking-wide cursor-pointer select-none">
        SkillHub
      </div>

      {/* Desktop Links */}
      <ul className="hidden md:flex gap-8 text-sm items-center font-medium">
        {renderLinks()}
      </ul>

      {/* Controls */}
      <div className="flex items-center gap-4">
        {/* Lang Toggle */}
        <button
          onClick={toggleLang}
          className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-md text-sm font-semibold transition-all"
        >
          {lang === 'en' ? 'AR' : 'EN'}
        </button>

        {/* Auth Buttons */}
        {user ? (
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md text-sm font-semibold transition-all"
          >
            {lang === 'ar' ? 'تسجيل خروج' : 'Logout'}
          </button>
        ) : (
          <Link
            href="/login"
            className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-md text-sm font-semibold transition-all"
          >
            {lang === 'ar' ? 'دخول' : 'Login'}
          </Link>
        )}

        {/* Hamburger for Mobile */}
        <button
          className="md:hidden flex flex-col space-y-1"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="absolute top-full left-0 w-full bg-gray-900 flex flex-col gap-4 px-6 py-4 md:hidden border-t border-gray-700">
          {renderLinks()}
        </ul>
      )}
    </nav>
  );
}
