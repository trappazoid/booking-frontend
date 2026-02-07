import React from 'react';

const About = () => {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
                    О нас
                </h1>

                <div className="bg-white dark:bg-zinc-900 backdrop-blur-md rounded-xl p-8 border border-orange-500/20 mb-6">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-orange-400">История компании</h2>
                    <p className="text-gray-700 dark:text-white/80 mb-4 leading-relaxed">
                        TicketsBooking — это современная платформа для бронирования билетов на концерты, театральные постановки
                        и другие культурные мероприятия. Мы создали удобный сервис, который позволяет пользователям легко
                        находить интересные события и бронировать билеты в несколько кликов.
                    </p>
                    <p className="text-gray-700 dark:text-white/80 leading-relaxed">
                        Наша миссия — сделать культуру доступной для каждого, предоставляя простой и надёжный инструмент
                        для покупки билетов на любые мероприятия.
                    </p>
                </div>

                <div className="bg-white dark:bg-zinc-900 backdrop-blur-md rounded-xl p-8 border border-orange-500/20 mb-6">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-orange-400">Наши преимущества</h2>
                    <ul className="space-y-3 text-gray-700 dark:text-white/80">
                        <li className="flex items-start gap-2">
                            <span className="text-orange-400 mt-1">✓</span>
                            <span>Интерактивная карта залов для выбора мест</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-orange-400 mt-1">✓</span>
                            <span>Мгновенная резервация и безопасная оплата</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-orange-400 mt-1">✓</span>
                            <span>Электронные билеты с QR-кодами</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-orange-400 mt-1">✓</span>
                            <span>Круглосуточная поддержка клиентов</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-orange-400 mt-1">✓</span>
                            <span>Удобный интерфейс и быстрая работа</span>
                        </li>
                    </ul>
                </div>

                <div className="bg-white dark:bg-zinc-900 backdrop-blur-md rounded-xl p-8 border border-orange-500/20">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-orange-400">Наша команда</h2>
                    <p className="text-gray-700 dark:text-white/80 leading-relaxed">
                        Мы команда профессионалов, которые любят искусство и технологии. Наш опыт в разработке
                        и организации мероприятий позволяет создавать лучшие решения для наших клиентов.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
