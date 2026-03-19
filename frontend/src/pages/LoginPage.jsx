import { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import { Briefcase } from 'lucide-react';

export default function LoginPage() {
    const { loginUser } = useContext(AuthContext);
    const location = useLocation();
    const message = location.state?.message;

    return (
        <div className="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
            <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full opacity-50 pointer-events-none"></div>
                
                <div className="flex flex-col items-center">
                    <div className="bg-indigo-600 p-3 rounded-xl shadow-md shadow-indigo-200 mb-4 inline-block">
                        <Briefcase className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Welcome back
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600 font-medium">
                        Log in to access your dashboard
                    </p>
                </div>

                {message && (
                    <div className="bg-emerald-50 text-emerald-700 p-4 rounded-lg text-sm font-medium border border-emerald-100 shadow-sm animate-pulse flex items-center gap-2">
                        <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        {message}
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={loginUser}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="username">
                                Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                className="relative block w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:z-10 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 transition-colors bg-gray-50/50 focus:bg-white sm:text-sm"
                                placeholder="Enter your username"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="relative block w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:z-10 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 transition-colors bg-gray-50/50 focus:bg-white sm:text-sm"
                                placeholder="Enter your password"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                Forgot password?
                            </a>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative flex w-full justify-center rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all shadow-md shadow-indigo-200 active:scale-[0.98]"
                        >
                            Log in
                        </button>
                    </div>
                </form>

                <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
                            Sign up here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
