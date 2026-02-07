import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { eventsAPI, seatsAPI } from '../utils/api';
import SeatMap from '../components/canvas/SeatMap';

const EventPage = () => {
    const { id } = useParams();
    const { user, token } = useAuth();
    const { t } = useLanguage();
    const navigate = useNavigate();

    // State management
    const [event, setEvent] = useState(null);
    const [seats, setSeats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isBookingMode, setIsBookingMode] = useState(false);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [paymentCode, setPaymentCode] = useState('');
    const [paymentError, setPaymentError] = useState('');
    const [paymentLoading, setPaymentLoading] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        fetchEventData();
    }, [id]);

    const fetchEventData = async () => {
        try {
            setLoading(true);
            setError(null);

            const [eventRes, seatsRes] = await Promise.all([
                eventsAPI.getEvent(id),
                seatsAPI.getSeats(id)
            ]);

            setEvent(eventRes.data);
            setSeats(seatsRes.data);
        } catch (err) {
            console.error('Error fetching event data:', err);
            setError(err.response?.status === 404 ? t('event_not_found') : 'Failed to load event');
        } finally {
            setLoading(false);
        }
    };

    const handleSeatClick = async (seatId) => {
        // If guest, redirect to login
        if (!user) {
            navigate('/login');
            return;
        }

        // Prevent actions during payment processing
        if (isProcessing) return;

        const seat = seats.find(s => s.id === seatId);
        if (!seat) return;

        // SMART TOGGLE LOGIC: Check if seat is already selected
        const isAlreadySelected = selectedSeats.includes(seatId);

        if (isAlreadySelected) {
            // DESELECT
            try {
                await seatsAPI.unlockSeats([seatId], token);
                setSelectedSeats(prev => prev.filter(id => id !== seatId));
                setSeats(prev => prev.map(s =>
                    s.id === seatId ? { ...s, status: 'available' } : s
                ));
            } catch (error) {
                console.error('Error unlocking seat:', error);
                alert('Failed to deselect seat. Please try again.');
            }
        } else {
            // SELECT
            if (seat.status !== 'available') return;

            try {
                await seatsAPI.lockSeats([seatId], token);
                setSelectedSeats(prev => [...prev, seatId]);
                setSeats(prev => prev.map(s =>
                    s.id === seatId ? { ...s, status: 'cart' } : s
                ));
            } catch (error) {
                console.error('Error locking seat:', error);
                alert('Failed to select seat. It may have been taken by another user.');
            }
        }
    };

    const handlePayment = () => {
        // GUARD CLAUSE
        if (isProcessing || selectedSeats.length === 0) return;

        setShowPaymentModal(true);
        setPaymentCode('');
        setPaymentError('');
    };

    const handlePaymentSubmit = async () => {
        if (paymentCode !== '1212') {
            setPaymentError(t('invalid_code'));
            return;
        }

        // GUARD CLAUSE
        if (isProcessing) return;

        setIsProcessing(true);
        setPaymentLoading(true);
        setPaymentError('');

        try {
            await seatsAPI.payForSeats(selectedSeats, paymentCode, token);
            alert(t('payment_success'));
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (err) {
            setPaymentError(err.response?.data?.detail || t('payment_failed'));
        } finally {
            setPaymentLoading(false);
            setIsProcessing(false);
        }
    };

    const getTotalPrice = () => {
        return selectedSeats.reduce((total, seatId) => {
            const seat = seats.find(s => s.id === seatId);
            return total + (seat?.price || 0);
        }, 0);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Loading state
    if (loading) {
        return (
            <div className="container mx-auto px-4 py-16">
                <div className="flex flex-col items-center justify-center min-h-[400px]">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500 mb-4"></div>
                    <p className="text-xl text-orange-400 font-semibold">{t('loading_event')}</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error || !event) {
        return (
            <div className="container mx-auto px-4 py-16">
                <div className="flex flex-col items-center justify-center min-h-[400px]">
                    <svg className="w-24 h-24 text-orange-500/30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{error || t('event_not_found')}</h1>
                    <button
                        onClick={() => navigate('/')}
                        className="mt-4 bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 hover:from-orange-600 hover:via-red-600 hover:to-yellow-600 text-white font-bold py-2 px-6 rounded-lg"
                    >
                        {t('back_to_home')}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {!isBookingMode ? (
                /* VIEW 1: Event Details */
                <div className="max-w-4xl mx-auto">
                    {/* Poster Image */}
                    {event.poster_url && (
                        <div className="relative h-96 rounded-2xl overflow-hidden mb-8 shadow-2xl border border-orange-500/20">
                            <img
                                src={`http://localhost:8000${event.poster_url}`}
                                alt={event.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                        </div>
                    )}

                    {/* Title */}
                    <h1 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
                        {event.title}
                    </h1>

                    {/* Date */}
                    <p className="text-xl text-orange-300 mb-6 flex items-center gap-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatDate(event.date)}
                    </p>

                    {/* Reserve Button */}
                    <button
                        onClick={() => setIsBookingMode(true)}
                        className="bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 hover:from-orange-600 hover:via-red-600 hover:to-yellow-600 text-white font-bold py-4 px-10 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 mb-8"
                    >
                        {t('reserve_tickets')}
                    </button>

                    {/* Description */}
                    <div className="bg-white dark:bg-zinc-900 backdrop-blur-md rounded-xl p-6 border border-orange-500/20">
                        <h2 className="text-2xl font-bold mb-4 text-orange-400">{t('about_event')}</h2>
                        <div className="text-gray-800 dark:text-white/90 whitespace-pre-line leading-relaxed">
                            {event.description || t('no_description')}
                        </div>
                    </div>
                </div>
            ) : (
                /* VIEW 2: Booking Mode */
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
                            {event.title}
                        </h1>
                        <button
                            onClick={() => setIsBookingMode(false)}
                            className="bg-white dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700 text-gray-900 dark:text-white font-semibold py-2 px-6 rounded-lg border border-orange-500/30 transition-all"
                        >
                            {t('back_to_details')}
                        </button>
                    </div>

                    {/* Seat Map Canvas */}
                    <div className="bg-white dark:bg-zinc-900 backdrop-blur-md rounded-xl p-6 border border-orange-500/20 mb-6">
                        <SeatMap
                            seats={seats}
                            venueSchema={event.venue_schema}
                            onSeatClick={handleSeatClick}
                        />
                    </div>

                    {/* Cart Summary */}
                    <div className="bg-white dark:bg-zinc-900 backdrop-blur-md rounded-xl p-6 border border-orange-500/20">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-bold text-orange-400 mb-2">{t('cart_summary')}</h3>
                                <p className="text-gray-700 dark:text-white/70">
                                    {t('selected_seats')}: <span className="font-bold text-orange-300">{selectedSeats.length}</span>
                                </p>
                                <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400 mt-2">
                                    ${(getTotalPrice() / 100).toFixed(2)}
                                </p>
                            </div>
                            <button
                                onClick={handlePayment}
                                disabled={selectedSeats.length === 0 || isProcessing}
                                className="bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 hover:from-orange-600 hover:via-red-600 hover:to-yellow-600 text-white font-bold py-4 px-10 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                {isProcessing ? t('processing') : t('pay_now')}
                            </button>
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="flex gap-6 justify-center mt-6 text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-gray-400"></div>
                            <span className="text-gray-700 dark:text-white/70">{t('available')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-red-500"></div>
                            <span className="text-gray-700 dark:text-white/70">{t('in_cart')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-green-500"></div>
                            <span className="text-gray-700 dark:text-white/70">{t('booked')}</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Payment Modal */}
            {showPaymentModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
                    <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
                                {t('payment')}
                            </h2>
                            <button
                                onClick={() => setShowPaymentModal(false)}
                                disabled={isProcessing}
                                className="p-2 hover:bg-orange-500/20 rounded-lg transition-colors text-orange-400 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="mb-6">
                            <p className="text-gray-600 dark:text-white/70 mb-2">{t('total_amount')}</p>
                            <p className="text-4xl font-bold text-orange-400">
                                ${(getTotalPrice() / 100).toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-white/50 mt-2">
                                {selectedSeats.length} {selectedSeats.length === 1 ? t('seat') : t('seats')}
                            </p>
                        </div>

                        {paymentError && (
                            <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-600 dark:text-red-300">
                                {paymentError}
                            </div>
                        )}

                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">{t('enter_payment_code')}</label>
                            <input
                                type="text"
                                value={paymentCode}
                                onChange={(e) => setPaymentCode(e.target.value.replace(/\D/g, '').slice(0, 4))}
                                disabled={isProcessing}
                                className="w-full bg-gray-100 dark:bg-zinc-800 border border-orange-500/30 rounded-lg px-4 py-3 text-gray-900 dark:text-white text-center text-2xl tracking-widest placeholder-gray-500 dark:placeholder-white/50 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                placeholder="••••"
                                maxLength={4}
                                autoFocus
                            />
                            <p className="text-xs text-orange-600 dark:text-orange-300/70 mt-2 text-center">
                                {t('test_code')}: <span className="font-mono font-bold">1212</span>
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowPaymentModal(false)}
                                disabled={isProcessing}
                                className="flex-1 bg-gray-200 dark:bg-zinc-800 hover:bg-gray-300 dark:hover:bg-zinc-700 text-gray-900 dark:text-white font-semibold py-3 rounded-lg border border-orange-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {t('cancel')}
                            </button>
                            <button
                                onClick={handlePaymentSubmit}
                                disabled={isProcessing || paymentCode.length !== 4}
                                className="flex-1 bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 hover:from-orange-600 hover:via-red-600 hover:to-yellow-600 text-white font-bold py-3 rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isProcessing ? t('processing') : t('confirm_payment')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventPage;
