import axios from 'axios';

const API_BASE_URL = 'https://booking-backend-93ye.onrender.com/api';

const api = axios.create({
    baseURL: API_BASE_URL,
});

// Add token to requests if available
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Auth API
export const authAPI = {
    register: (data) => api.post('/auth/register', data),
    login: (data) => api.post('/auth/login', data),
    getMe: (token) => api.get('/auth/me', { params: { token } }),
};

// Events API
export const eventsAPI = {
    getEvents: (page = 1, perPage = 10) =>
        api.get('/events/', { params: { page, per_page: perPage } }),
    getEvent: (id) => api.get(`/events/${id}`),
    createEvent: (formData) => api.post('/events/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    }),
    deleteEvent: (id, token) => api.delete(`/events/${id}`, { params: { token } }),
};

// Seats API
export const seatsAPI = {
    getSeats: (eventId) => api.get(`/seats/${eventId}`),
    lockSeats: (seatIds, token) => api.post('/seats/lock', { seat_ids: seatIds }, { params: { token } }),
    unlockSeats: (seatIds, token) => api.post('/seats/unlock', { seat_ids: seatIds }, { params: { token } }),
    payForSeats: (seatIds, paymentCode, token) =>
        api.post('/seats/pay', { seat_ids: seatIds, payment_code: paymentCode }, { params: { token } }),
    releaseSeats: (seatIds, token) => api.post('/seats/release', { seat_ids: seatIds }, { params: { token } }),
};

export default api;
