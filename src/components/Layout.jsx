import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

const Layout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user, logout, isAdmin } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const { lang, toggleLanguage, t } = useLanguage();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        setSidebarOpen(false);
        navigate('/');
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-zinc-950 transition-colors">
            {/* Fixed Header */}
            <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg border-b border-orange-500/20">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                        {t('app_name')}
                    </Link>

                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 hover:bg-orange-500/20 rounded-lg transition-colors text-orange-400"
                        aria-label="Open menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </header>

            {/* Sidebar Drawer */}
            <div
                className={`fixed inset-0 z-50 transition-opacity duration-300 ${sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
            >
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    onClick={() => setSidebarOpen(false)}
                />

                {/* Sidebar - FIXED FOR LIGHT MODE */}
                <div
                    className={`absolute right-0 top-0 h-full w-80 bg-white dark:bg-zinc-900 border-l border-gray-200 dark:border-zinc-800 shadow-2xl transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'
                        }`}
                >
                    <div className="p-6 h-full flex flex-col">
                        {/* Close Button */}
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="self-end p-2 hover:bg-orange-500/20 rounded-lg transition-colors text-orange-400"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Menu Items - FIXED COLORS FOR LIGHT MODE */}
                        <nav className="space-y-2 flex-1 mt-6">
                            <Link
                                to="/"
                                onClick={() => setSidebarOpen(false)}
                                className="block px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors font-medium text-gray-700 dark:text-gray-300"
                            >
                                {t('menu_events')}
                            </Link>
                            <Link
                                to="/services"
                                onClick={() => setSidebarOpen(false)}
                                className="block px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors font-medium text-gray-700 dark:text-gray-300"
                            >
                                {t('menu_services')}
                            </Link>
                            <Link
                                to="/about"
                                onClick={() => setSidebarOpen(false)}
                                className="block px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors font-medium text-gray-700 dark:text-gray-300"
                            >
                                {t('menu_about')}
                            </Link>
                            <Link
                                to="/contact"
                                onClick={() => setSidebarOpen(false)}
                                className="block px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors font-medium text-gray-700 dark:text-gray-300"
                            >
                                {t('menu_contact')}
                            </Link>

                            {/* Admin-only Add Event */}
                            {isAdmin() && (
                                <>
                                    <div className="my-4 border-t border-gray-200 dark:border-zinc-800" />
                                    <Link
                                        to="/add-event"
                                        onClick={() => setSidebarOpen(false)}
                                        className="block px-4 py-3 rounded-lg bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 hover:from-orange-600 hover:via-red-600 hover:to-yellow-600 transition-all font-semibold text-center text-white shadow-lg"
                                    >
                                        {t('menu_add_event')}
                                    </Link>
                                </>
                            )}
                        </nav>

                        {/* Language Toggle - FIXED FOR LIGHT MODE 
                        <div className="mb-4 pb-4 border-b border-gray-200 dark:border-zinc-800">
                            <button
                                onClick={toggleLanguage}
                                className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors text-gray-700 dark:text-gray-300"
                            >
                                <span className="font-medium">Language / Язык</span>
                                <span className="text-sm font-bold text-orange-400">
                                    {lang === 'ru' ? '🇷🇺 RU' : '🇬🇧 EN'}
                                </span>
                            </button>
                        </div>

                        {/* Theme Toggle - FIXED FOR LIGHT MODE 
                        <div className="mb-4 pb-4 border-b border-gray-200 dark:border-zinc-800">
                            <button
                                onClick={toggleTheme}
                                className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors text-gray-700 dark:text-gray-300"
                            >
                                <span className="font-medium">{t('theme')}</span>
                                <div className="flex items-center gap-2">
                                    {theme === 'dark' ? (
                                        <>
                                            <span className="text-sm text-orange-400">{t('theme_dark')}</span>
                                            <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                            </svg>
                                        </>
                                    ) : (
                                        <>
                                            <span className="text-sm text-orange-400">{t('theme_light')}</span>
                                            <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                            </svg>
                                        </>
                                    )}
                                </div>
                            </button>
                        </div>. */}

                        {/* Auth Buttons - FIXED FOR LIGHT MODE */}
                        <div className="pt-4 space-y-2">
                            {user ? (
                                <>
                                    <div className="px-4 py-2 text-sm text-orange-600 dark:text-orange-300">
                                        {user.name} {isAdmin() && `(${t('admin_hint')})`}
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full px-4 py-3 rounded-lg bg-gray-200 dark:bg-zinc-800 hover:bg-gray-300 dark:hover:bg-zinc-700 transition-colors font-medium text-gray-800 dark:text-white"
                                    >
                                        {t('logout')}
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        onClick={() => setSidebarOpen(false)}
                                        className="block px-4 py-3 rounded-lg bg-gray-200 dark:bg-zinc-800 hover:bg-gray-300 dark:hover:bg-zinc-700 transition-colors font-medium text-center text-gray-800 dark:text-white"
                                    >
                                        {t('login')}
                                    </Link>
                                    <Link
                                        to="/register"
                                        onClick={() => setSidebarOpen(false)}
                                        className="block px-4 py-3 rounded-lg bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 hover:from-orange-600 hover:via-red-600 hover:to-yellow-600 transition-all font-semibold text-center text-white shadow-lg"
                                    >
                                        {t('register')}
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 pt-20 pb-8">
                {children}
            </main>
        </div>
    );
};

export default Layout;
