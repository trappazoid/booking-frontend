import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-zinc-900 border-t border-orange-500/20 mt-auto">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand */}
                    <div>
                        <h3 className="text-xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent mb-3">
                            TicketsBooking
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-white/70">
                            Профессиональная платформа бронирования билетов на концерты и мероприятия.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Навигация</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/" className="text-gray-600 dark:text-white/70 hover:text-orange-400 transition-colors">
                                    События
                                </Link>
                            </li>
                            <li>
                                <Link to="/services" className="text-gray-600 dark:text-white/70 hover:text-orange-400 transition-colors">
                                    Услуги
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-gray-600 dark:text-white/70 hover:text-orange-400 transition-colors">
                                    О нас
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-gray-600 dark:text-white/70 hover:text-orange-400 transition-colors">
                                    Контакты
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Контакты</h4>
                        <ul className="space-y-2 text-sm text-gray-600 dark:text-white/70">
                            <li>📧 info@ticketsbooking.ru</li>
                            <li>📞 +7 (495) 123-45-67</li>
                            <li>📍 Москва, Россия</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-orange-500/20 text-center text-sm text-gray-600 dark:text-white/50">
                    © {new Date().getFullYear()} TicketsBooking. Все права защищены.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
