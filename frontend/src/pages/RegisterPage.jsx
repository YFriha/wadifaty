import { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import { Briefcase, User } from 'lucide-react';

export default function RegisterPage() {
    const { registerUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    


    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const formData = {
            username: e.target.username.value,
            password: e.target.password.value,
            email: e.target.email.value,
            first_name: e.target.first_name.value,
            last_name: e.target.last_name.value,
            role: 'candidate'
        };

        try {
            await registerUser(formData);
        } catch (err) {
            const data = err.response?.data;
            if (data) {
                // Flatten all error messages from DRF
                const messages = Object.entries(data).map(([k, v]) =>
                    `${k !== 'non_field_errors' ? k + ': ' : ''}${Array.isArray(v) ? v.join(', ') : v}`
                ).join(' | ');
                setError(messages);
            } else {
                setError('Registration failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
            <div className="w-full max-w-lg space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100/50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-50 rounded-br-full opacity-50 pointer-events-none"></div>

                <div className="flex flex-col items-center">
                    <div className="bg-indigo-600 p-3 rounded-xl shadow-md shadow-indigo-200 mb-4 inline-block">
                        <User className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Create an account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600 font-medium">
                        Join Wadifaty and get started
                    </p>
                </div>



                <form className="mt-8 space-y-6" onSubmit={handleRegister}>
                    {error && (
                        <div className="bg-red-50 text-red-700 py-3 px-4 rounded-xl text-sm font-medium border border-red-100">
                            {error}
                        </div>
                    )}
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                <input
                                    name="first_name"
                                    type="text"
                                    required
                                    className="relative block w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:z-10 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 transition-colors bg-gray-50/50 focus:bg-white sm:text-sm"
                                    placeholder="Jane"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                <input
                                    name="last_name"
                                    type="text"
                                    required
                                    className="relative block w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:z-10 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 transition-colors bg-gray-50/50 focus:bg-white sm:text-sm"
                                    placeholder="Doe"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                            <input
                                name="username"
                                type="text"
                                required
                                className="relative block w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:z-10 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 transition-colors bg-gray-50/50 focus:bg-white sm:text-sm"
                                placeholder="janedoe123"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                name="email"
                                type="email"
                                required
                                className="relative block w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:z-10 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 transition-colors bg-gray-50/50 focus:bg-white sm:text-sm"
                                placeholder="jane@example.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                name="password"
                                type="password"
                                required
                                minLength="8"
                                className="relative block w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:z-10 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 transition-colors bg-gray-50/50 focus:bg-white sm:text-sm"
                                placeholder="Min 8 characters"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`group relative flex w-full justify-center rounded-xl px-4 py-3 text-sm font-semibold text-white transition-all shadow-md shadow-indigo-200 active:scale-[0.98] ${
                                loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                            }`}
                        >
                            {loading ? 'Creating account...' : 'Create Account'}
                        </button>
                    </div>
                </form>

                <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
