import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
                    Контакты
                </h1>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-zinc-900 backdrop-blur-md rounded-xl p-6 border border-orange-500/20">
                            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-orange-400">Свяжитесь с нами</h2>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <span className="text-2xl">📧</span>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">Email</h3>
                                        <a href="mailto:info@ticketsbooking.ru" className="text-orange-400 hover:text-orange-300">
                                            info@ticketsbooking.ru
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <span className="text-2xl">📞</span>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">Телефон</h3>
                                        <a href="tel:+74951234567" className="text-orange-400 hover:text-orange-300">
                                            +7 (495) 123-45-67
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <span className="text-2xl">📍</span>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">Адрес</h3>
                                        <p className="text-gray-700 dark:text-white/70">
                                            Москва, Россия<br />
                                            ул. Примерная, д. 123
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <span className="text-2xl">🕒</span>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">Часы работы</h3>
                                        <p className="text-gray-700 dark:text-white/70">
                                            Пн-Пт: 09:00 - 20:00<br />
                                            Сб-Вс: 10:00 - 18:00
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white dark:bg-zinc-900 backdrop-blur-md rounded-xl p-6 border border-orange-500/20">
                        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-orange-400">Написать нам</h2>

                        {submitted && (
                            <div className="mb-4 p-3 rounded-lg bg-green-500/20 border border-green-500/50 text-green-600 dark:text-green-300">
                                ✓ Спасибо! Ваше сообщение отправлено.
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Имя</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-gray-100 dark:bg-zinc-800 border border-orange-500/30 rounded-lg px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/50 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50 transition-all"
                                    placeholder="Ваше имя"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-gray-100 dark:bg-zinc-800 border border-orange-500/30 rounded-lg px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/50 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50 transition-all"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Сообщение</label>
                                <textarea
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    rows={5}
                                    className="w-full bg-gray-100 dark:bg-zinc-800 border border-orange-500/30 rounded-lg px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/50 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50 transition-all resize-none"
                                    placeholder="Ваше сообщение..."
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 hover:from-orange-600 hover:via-red-600 hover:to-yellow-600 text-white font-bold py-3 rounded-lg shadow-lg transition-all"
                            >
                                📨 Отправить сообщение
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
