import React, { createContext, useContext, useState, useEffect } from 'react';

// Complete translation dictionary
const translations = {
    en: {
        // Header & Navigation
        app_name: 'TicketsBooking',
        menu_events: '🎭 Events',
        menu_services: '📋 Services',
        menu_about: 'ℹ️ About Us',
        menu_contact: '📞 Contact',
        menu_add_event: '➕ Add Event',

        // Auth
        login: '🔑 Login',
        register: '✨ Register',
        logout: '🚪 Logout',
        email: 'Email',
        password: 'Password',
        name: 'Name',
        sign_in: 'Sign In',
        sign_up: 'Sign Up',
        admin_hint: 'Admin',

        // Theme
        theme: 'Theme',
        theme_dark: 'Dark',
        theme_light: 'Light',

        // Home Page
        upcoming_events: '🔥 Upcoming Events',
        no_events: 'No events available yet',
        edit: 'Edit',
        delete: 'Delete',
        prev_page: '< Previous',
        next_page: 'Next >',
        confirm_delete: 'Are you sure you want to delete',
        delete_success: '✓ Event deleted successfully',
        delete_error: 'Failed to delete event. Please try again.',
        edit_coming_soon: 'Edit feature coming soon!',

        // Event Page
        loading_event: 'Loading event...',
        event_not_found: 'Event not found',
        back_to_home: 'Back to Home',
        reserve_tickets: '🔥 Reserve Tickets',
        about_event: 'About this event',
        no_description: 'No description available.',
        back_to_details: '← Back to Details',
        cart_summary: 'Cart Summary',
        selected_seats: 'Selected Seats',
        pay_now: '💳 Pay Now',
        processing: '⏳ Processing...',
        stage: 'STAGE',
        available: 'Available',
        in_cart: 'In Cart',
        booked: 'Booked',

        // Payment Modal
        payment: 'Payment',
        total_amount: 'Total Amount:',
        seat: 'seat',
        seats: 'seats',
        enter_payment_code: 'Enter 4-digit Payment Code',
        test_code: 'Test code:',
        cancel: 'Cancel',
        confirm_payment: 'Confirm Payment',
        invalid_code: 'Invalid payment code',
        payment_success: '🎉 Payment successful! Your seats have been booked.',
        payment_failed: 'Payment failed. Please try again.',
        select_seats_first: 'Please select at least one seat',

        // Seat Map
        seat_map_instructions: '💡 Drag to pan • Scroll to zoom • Click seats to select',
        zoom_in: 'Zoom In',
        zoom_out: 'Zoom Out',
        reset_view: 'Reset View',

        // Wizard
        add_new_event: 'Add New Event',
        basic_info: 'Basic Information',
        upload_files: 'Upload Files',
        constructor: 'Constructor',
        event_title: 'Event Title',
        event_date: 'Date & Time',
        event_description: 'Description',
        event_poster: 'Event Poster (optional)',
        venue_schematic: 'Venue Schematic (optional)',
        schematic_hint: 'Will be used as background in constructor',
        next: 'Next',
        back: '← Back',
        next_upload: 'Next: Upload Files →',
        next_constructor: 'Next: Constructor →',
        fill_required: 'Please fill in all required fields',
        creating_event: 'Creating event...',
        event_created: '✓ Event created successfully!',
        event_create_error: 'Failed to create event',

        // Footer
        footer_description: 'Professional platform for booking tickets to concerts and events.',
        navigation: 'Navigation',
        contacts: 'Contact',
        copyright: 'All rights reserved.',

        // Services Page
        services_title: 'Our Services',
        service_booking_title: '🎭 Ticket Booking',
        service_booking_desc: 'Convenient ticket booking system for concerts, theater performances, and other events with an interactive seat map.',
        service_etickets_title: '🎫 Electronic Tickets',
        service_etickets_desc: 'Instant delivery of electronic tickets to email after successful payment.',
        service_payment_title: '💳 Secure Payment',
        service_payment_desc: 'Protected payment system with support for all popular payment methods.',
        service_organization_title: '🎪 Event Organization',
        service_organization_desc: 'Full cycle of organization and ticket sales for event organizers.',

        // About Page
        about_title: 'About Us',
        about_history_title: 'Company History',
        about_history_p1: 'TicketsBooking is a modern platform for booking tickets to concerts, theater performances, and other cultural events. We created a convenient service that allows users to easily find interesting events and book tickets in just a few clicks.',
        about_history_p2: 'Our mission is to make culture accessible to everyone by providing a simple and reliable tool for purchasing tickets to any events.',
        about_advantages_title: 'Our Advantages',
        about_adv_1: 'Interactive hall maps for seat selection',
        about_adv_2: 'Instant reservation and secure payment',
        about_adv_3: 'Electronic tickets with QR codes',
        about_adv_4: '24/7 customer support',
        about_adv_5: 'User-friendly interface and fast performance',
        about_team_title: 'Our Team',
        about_team_desc: 'We are a team of professionals who love art and technology. Our experience in development and event organization allows us to create the best solutions for our clients.',

        // Contact Page
        contact_title: 'Contact',
        contact_us: 'Contact Us',
        contact_email: 'Email',
        contact_phone: 'Phone',
        contact_address: 'Address',
        contact_hours: 'Working Hours',
        contact_hours_weekday: 'Mon-Fri: 09:00 - 20:00',
        contact_hours_weekend: 'Sat-Sun: 10:00 - 18:00',
        write_to_us: 'Write to Us',
        your_name: 'Your Name',
        your_email: 'your@email.com',
        your_message: 'Your message...',
        send_message: '📨 Send Message',
        message_sent: '✓ Thank you! Your message has been sent.',
    },
    ru: {
        // Header & Navigation
        app_name: 'TicketsBooking',
        menu_events: '🎭 События',
        menu_services: '📋 Услуги',
        menu_about: 'ℹ️ О нас',
        menu_contact: '📞 Контакты',
        menu_add_event: '➕ Добавить событие',

        // Auth
        login: '🔑 Войти',
        register: '✨ Регистрация',
        logout: '🚪 Выйти',
        email: 'Email',
        password: 'Пароль',
        name: 'Имя',
        sign_in: 'Войти',
        sign_up: 'Зарегистрироваться',
        admin_hint: 'Администратор',

        // Theme
        theme: 'Тема',
        theme_dark: 'Тёмная',
        theme_light: 'Светлая',

        // Home Page
        upcoming_events: '🔥 Предстоящие события',
        no_events: 'Пока нет доступных событий',
        edit: 'Редактировать',
        delete: 'Удалить',
        prev_page: '< Назад',
        next_page: 'Далее >',
        confirm_delete: 'Вы уверены, что хотите удалить',
        delete_success: '✓ Событие успешно удалено',
        delete_error: 'Не удалось удалить событие. Попробуйте снова.',
        edit_coming_soon: 'Функция редактирования скоро будет доступна!',

        // Event Page
        loading_event: 'Загрузка события...',
        event_not_found: 'Событие не найдено',
        back_to_home: 'Вернуться на главную',
        reserve_tickets: '🔥 Забронировать билеты',
        about_event: 'О событии',
        no_description: 'Описание отсутствует.',
        back_to_details: '← Назад к деталям',
        cart_summary: 'Корзина',
        selected_seats: 'Выбрано мест',
        pay_now: '💳 Оплатить',
        processing: '⏳ Обработка...',
        stage: 'СЦЕНА',
        available: 'Доступно',
        in_cart: 'В корзине',
        booked: 'Забронировано',

        // Payment Modal
        payment: 'Оплата',
        total_amount: 'Сумма к оплате:',
        seat: 'место',
        seats: 'мест',
        enter_payment_code: 'Введите 4-значный код оплаты',
        test_code: 'Тестовый код:',
        cancel: 'Отмена',
        confirm_payment: 'Подтвердить оплату',
        invalid_code: 'Неверный код оплаты',
        payment_success: '🎉 Оплата успешна! Ваши места забронированы.',
        payment_failed: 'Оплата не удалась. Попробуйте снова.',
        select_seats_first: 'Пожалуйста, выберите хотя бы одно место',

        // Seat Map
        seat_map_instructions: '💡 Перетаскивайте для навигации • Прокрутка для масштаба • Клик для выбора',
        zoom_in: 'Увеличить',
        zoom_out: 'Уменьшить',
        reset_view: 'Сбросить',

        // Wizard
        add_new_event: 'Добавить новое событие',
        basic_info: 'Основная информация',
        upload_files: 'Загрузка файлов',
        constructor: 'Конструктор',
        event_title: 'Название события',
        event_date: 'Дата и время',
        event_description: 'Описание',
        event_poster: 'Постер события (опционально)',
        venue_schematic: 'Схема зала (опционально)',
        schematic_hint: 'Будет использовано в качестве фона в конструкторе',
        next: 'Далее',
        back: '← Назад',
        next_upload: 'Далее: Загрузка файлов →',
        next_constructor: 'Далее: Конструктор →',
        fill_required: 'Пожалуйста, заполните все обязательные поля',
        creating_event: 'Создание события...',
        event_created: '✓ Событие успешно создано!',
        event_create_error: 'Не удалось создать событие',

        // Footer
        footer_description: 'Профессиональная платформа бронирования билетов на концерты и мероприятия.',
        navigation: 'Навигация',
        contacts: 'Контакты',
        copyright: 'Все права защищены.',

        // Services Page
        services_title: 'Наши услуги',
        service_booking_title: '🎭 Бронирование билетов',
        service_booking_desc: 'Удобная система бронирования билетов на концерты, театральные постановки и другие мероприятия с интерактивной картой мест.',
        service_etickets_title: '🎫 Электронные билеты',
        service_etickets_desc: 'Мгновенная доставка электронных билетов на почту после успешной оплаты.',
        service_payment_title: '💳 Безопасная оплата',
        service_payment_desc: 'Защищённая система оплаты с поддержкой всех популярных платёжных методов.',
        service_organization_title: '🎪 Организация мероприятий',
        service_organization_desc: 'Полный цикл организации и продажи билетов для организаторов мероприятий.',

        // About Page
        about_title: 'О нас',
        about_history_title: 'История компании',
        about_history_p1: 'TicketsBooking — это современная платформа для бронирования билетов на концерты, театральные постановки и другие культурные мероприятия. Мы создали удобный сервис, который позволяет пользователям легко находить интересные события и бронировать билеты в несколько кликов.',
        about_history_p2: 'Наша миссия — сделать культуру доступной для каждого, предоставляя простой и надёжный инструмент для покупки билетов на любые мероприятия.',
        about_advantages_title: 'Наши преимущества',
        about_adv_1: 'Интерактивная карта залов для выбора мест',
        about_adv_2: 'Мгновенная резервация и безопасная оплата',
        about_adv_3: 'Электронные билеты с QR-кодами',
        about_adv_4: 'Круглосуточная поддержка клиентов',
        about_adv_5: 'Удобный интерфейс и быстрая работа',
        about_team_title: 'Наша команда',
        about_team_desc: 'Мы команда профессионалов, которые любят искусство и технологии. Наш опыт в разработке и организации мероприятий позволяет создавать лучшие решения для наших клиентов.',

        // Contact Page
        contact_title: 'Контакты',
        contact_us: 'Свяжитесь с нами',
        contact_email: 'Email',
        contact_phone: 'Телефон',
        contact_address: 'Адрес',
        contact_hours: 'Часы работы',
        contact_hours_weekday: 'Пн-Пт: 09:00 - 20:00',
        contact_hours_weekend: 'Сб-Вс: 10:00 - 18:00',
        write_to_us: 'Написать нам',
        your_name: 'Ваше имя',
        your_email: 'ваш@email.com',
        your_message: 'Ваше сообщение...',
        send_message: '📨 Отправить сообщение',
        message_sent: '✓ Спасибо! Ваше сообщение отправлено.',
    },
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState('ru');

    // Initialize language from localStorage or default to Russian
    useEffect(() => {
        const savedLang = localStorage.getItem('language');
        const initialLang = savedLang || 'ru';
        setLang(initialLang);
    }, []);

    const toggleLanguage = () => {
        const newLang = lang === 'ru' ? 'en' : 'ru';
        setLang(newLang);
        localStorage.setItem('language', newLang);
    };

    const t = (key) => {
        return translations[lang][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within LanguageProvider');
    }
    return context;
};
