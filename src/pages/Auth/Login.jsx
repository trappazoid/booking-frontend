import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.detail || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-md mx-auto">
                <div className="bg-zinc-900 backdrop-blur-md rounded-xl p-6 border border-orange-500/20 shadow-2xl">
                    <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                        Login
                    </h1>

                    {error && (
                        <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-300">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2 text-white">Email</label>
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-zinc-800 border border-orange-500/30 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50 transition-all"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2 text-white">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-zinc-800 border border-orange-500/30 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50 transition-all"
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 hover:from-orange-600 hover:via-red-600 hover:to-yellow-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-white/70">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-orange-400 hover:text-orange-300 font-semibold">
                                Register here
                            </Link>
                        </p>
                    </div>

                    <div className="mt-4 p-3 rounded-lg bg-orange-500/10 border border-orange-500/30">
                        <p className="text-xs text-orange-200 text-center">
                            Admin Login: <span className="font-mono font-bold">admin@admin.com</span> / <span className="font-mono font-bold">Pass-PanelAdmin</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
