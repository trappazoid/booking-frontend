import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { eventsAPI } from '../utils/api';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
    const [events, setEvents] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const { isAdmin, token } = useAuth();

    useEffect(() => {
        fetchEvents();
    }, [page]);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const response = await eventsAPI.getEvents(page, 10);
            setEvents(response.data.events);
            setTotalPages(response.data.total_pages);
        } catch (error) {
            console.error('Ошибка загрузки событий:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (eventId, eventTitle) => {
        if (!window.confirm(`Вы уверены, что хотите удалить "${eventTitle}"?`)) {
            return;
        }

        try {
            await eventsAPI.deleteEvent(eventId, token);
            alert('✓ Событие успешно удалено');
            fetchEvents(); // Refresh the list
        } catch (error) {
            console.error('Ошибка при удалении события:', error);
            alert('Не удалось удалить событие. Попробуйте снова.');
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-5xl font-bold mb-8 text-center bg-gradient-to-r from-orange-400 via-red-400 to-yellow-400 bg-clip-text text-transparent">
                🔥 Предстоящие события
            </h1>

            {/* Event Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {events.map((event) => (
                    <div
                        key={event.id}
                        className="group bg-white dark:bg-zinc-900 backdrop-blur-md rounded-xl overflow-hidden border border-orange-500/20 shadow-xl hover:border-orange-500/50 hover:shadow-orange-500/20 transition-all duration-300 relative"
                    >
                        {/* Admin Controls - ONLY DELETE BUTTON */}
                        {isAdmin() && (
                            <div className="absolute top-2 right-2 z-10">
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleDelete(event.id, event.title);
                                    }}
                                    className="p-2 bg-red-500 hover:bg-red-600 rounded-lg text-white shadow-lg transition-all"
                                    title="Удалить"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        )}

                        <Link to={`/event/${event.id}`} className="block">
                            {/* Event Image */}
                            <div className="relative h-48 bg-gradient-to-br from-orange-900 via-red-900 to-yellow-900 overflow-hidden">
                                {event.poster_url ? (
                                    <img
                                        src={`http://localhost:8000${event.poster_url}`}
                                        alt={event.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <svg className="w-16 h-16 text-orange-500/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                        </svg>
                                    </div>
                                )}
                                {/* Hot overlay effect */}
                                <div className="absolute inset-0 bg-gradient-to-t from-orange-500/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>

                            {/* Event Info */}
                            <div className="p-4">
                                <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-yellow-400 group-hover:bg-clip-text transition-all line-clamp-2">
                                    {event.title}
                                </h2>
                                <p className="text-sm text-orange-600 dark:text-orange-300 flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {formatDate(event.date)}
                                </p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {events.length === 0 && (
                <div className="text-center py-16">
                    <svg className="w-24 h-24 mx-auto text-orange-500/20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <p className="text-xl text-gray-600 dark:text-orange-300/50">Пока нет доступных событий</p>
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2">
                    <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-zinc-800 hover:bg-orange-500/20 border border-orange-500/20 hover:border-orange-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-gray-900 dark:text-white"
                    >
                        &lt; Назад
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                        <button
                            key={num}
                            onClick={() => setPage(num)}
                            className={`px-4 py-2 rounded-lg transition-all ${page === num
                                    ? 'bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 text-white font-bold shadow-lg'
                                    : 'bg-gray-200 dark:bg-zinc-800 hover:bg-orange-500/20 border border-orange-500/20 hover:border-orange-500/50 text-gray-900 dark:text-white'
                                }`}
                        >
                            {num}
                        </button>
                    ))}

                    <button
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-zinc-800 hover:bg-orange-500/20 border border-orange-500/20 hover:border-orange-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-gray-900 dark:text-white"
                    >
                        Далее &gt;
                    </button>
                </div>
            )}
        </div>
    );
};

export default Home;
