import React, { useState } from 'react';
import { seatsAPI } from '../utils/api';

const PaymentModal = ({ seatIds, totalPrice, token, onSuccess, onClose }) => {
    const [paymentCode, setPaymentCode] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        if (paymentCode.length !== 4) {
            setError('Please enter a 4-digit code');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await seatsAPI.payForSeats(seatIds, paymentCode, token);
            onSuccess();
        } catch (err) {
            setError(err.response?.data?.detail || 'Payment failed. Please check your code.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="card max-w-md w-full mx-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Payment</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="mb-6">
                    <p className="text-white/70 mb-2">Total Amount:</p>
                    <p className="text-3xl font-bold text-primary-400">
                        ${(totalPrice / 100).toFixed(2)}
                    </p>
                    <p className="text-sm text-white/50 mt-2">
                        {seatIds.length} seat{seatIds.length !== 1 ? 's' : ''}
                    </p>
                </div>

                {error && (
                    <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-300">
                        {error}
                    </div>
                )}

                <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Enter 4-digit Payment Code</label>
                    <input
                        type="text"
                        value={paymentCode}
                        onChange={(e) => setPaymentCode(e.target.value.replace(/\D/g, '').slice(0, 4))}
                        className="input-field text-center text-2xl tracking-widest"
                        placeholder="••••"
                        maxLength={4}
                        autoFocus
                    />
                    <p className="text-xs text-white/50 mt-2 text-center">
                        Hint: Use code <span className="font-mono font-bold">1212</span> for testing
                    </p>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 btn-secondary"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handlePayment}
                        disabled={loading || paymentCode.length !== 4}
                        className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Processing...' : 'Confirm Payment'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentModal;
