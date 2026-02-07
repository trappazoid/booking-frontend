import React from 'react';

const Services = () => {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
                    Наши услуги
                </h1>

                <div className="grid gap-6">
                    <div className="bg-white dark:bg-zinc-900 backdrop-blur-md rounded-xl p-6 border border-orange-500/20">
                        <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-orange-400">🎭 Бронирование билетов</h2>
                        <p className="text-gray-700 dark:text-white/80">
                            Удобная система бронирования билетов на концерты, театральные постановки и другие мероприятия с интерактивной картой мест.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 backdrop-blur-md rounded-xl p-6 border border-orange-500/20">
                        <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-orange-400">🎫 Электронные билеты</h2>
                        <p className="text-gray-700 dark:text-white/80">
                            Мгновенная доставка электронных билетов на почту после успешной оплаты.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 backdrop-blur-md rounded-xl p-6 border border-orange-500/20">
                        <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-orange-400">💳 Безопасная оплата</h2>
                        <p className="text-gray-700 dark:text-white/80">
                            Защищённая система оплаты с поддержкой всех популярных платёжных методов.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 backdrop-blur-md rounded-xl p-6 border border-orange-500/20">
                        <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-orange-400">🎪 Организация мероприятий</h2>
                        <p className="text-gray-700 dark:text-white/80">
                            Полный цикл организации и продажи билетов для организаторов мероприятий.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;
