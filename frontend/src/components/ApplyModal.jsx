import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';
import AuthContext from '../contexts/AuthContext';
import { FileUp, Upload, SendHorizonal, CheckCircle, X } from 'lucide-react';

export default function ApplyModal({ job, onClose }) {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [fileName, setFileName] = useState(null);

    // Lock body scroll while modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, []);

    // Close on Escape key
    useEffect(() => {
        const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [onClose]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('job', job.id);
        formData.append('full_name', e.target.full_name.value);
        formData.append('email', e.target.email.value);
        formData.append('phone', e.target.phone.value);
        formData.append('resume', e.target.resume.files[0]);
        if (e.target.cover_letter.value) {
            formData.append('cover_letter', e.target.cover_letter.value);
        }

        try {
            await axiosInstance.post('applications/apply/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setSuccess(true);
            setTimeout(() => {
                onClose();
                navigate('/dashboard');
            }, 2200);
        } catch (err) {
            setError(
                err.response?.data?.non_field_errors?.[0] ||
                'Failed to submit. Please check your inputs and try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        /* Backdrop */
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            aria-modal="true"
            role="dialog"
        >
            {/* Blurred overlay */}
            <div
                className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Panel */}
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-gray-100 animate-in fade-in-0 zoom-in-95 duration-200">

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-white/80 hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-all backdrop-blur-sm shadow-sm border border-gray-200"
                    aria-label="Close"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Header */}
                <div className="bg-gradient-to-br from-indigo-600 to-purple-700 px-8 py-10 text-white flex flex-col items-center text-center rounded-t-3xl">
                    <div className="bg-white/10 p-4 rounded-xl backdrop-blur-md border border-white/20 mb-4 shadow-xl">
                        <Upload className="w-8 h-8 text-indigo-100" />
                    </div>
                    <h2 className="text-2xl font-extrabold tracking-tight mb-1">Submit Application</h2>
                    <p className="text-indigo-200 font-medium text-sm">
                        Applying for <span className="text-white font-bold">{job.title}</span>
                        {job.recruiter?.username && (
                            <> at <span className="text-white font-bold">{job.recruiter.username}</span></>
                        )}
                    </p>
                </div>

                {/* Body */}
                <div className="p-8">
                    {error && (
                        <div className="mb-6 bg-red-50 text-red-700 py-4 px-5 rounded-xl text-sm font-medium border border-red-100 flex items-start gap-3 shadow-sm">
                            <svg className="w-5 h-5 text-red-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {error}
                        </div>
                    )}

                    {success ? (
                        <div className="text-center py-14">
                            <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-emerald-100 mb-6 border-4 border-emerald-50 shadow-inner">
                                <CheckCircle className="h-12 w-12 text-emerald-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h3>
                            <p className="text-gray-500 font-medium">Redirecting you to your dashboard...</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Personal Info */}
                            <div className="bg-gray-50/60 p-6 rounded-2xl border border-gray-100 space-y-5">
                                <h3 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-2">Personal Information</h3>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
                                    <input
                                        name="full_name"
                                        type="text"
                                        required
                                        defaultValue={user ? `${user.first_name || ''} ${user.last_name || ''}`.trim() : ''}
                                        className="block w-full rounded-xl border border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 sm:text-sm px-4 py-3 bg-white outline-none transition-all"
                                        placeholder="Jane Doe"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                                        <input
                                            name="email"
                                            type="email"
                                            required
                                            defaultValue={user?.email || ''}
                                            className="block w-full rounded-xl border border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 sm:text-sm px-4 py-3 bg-white outline-none transition-all"
                                            placeholder="jane@example.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number</label>
                                        <input
                                            name="phone"
                                            type="tel"
                                            required
                                            className="block w-full rounded-xl border border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 sm:text-sm px-4 py-3 bg-white outline-none transition-all"
                                            placeholder="+1 (555) 123-4567"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Documents */}
                            <div className="bg-gray-50/60 p-6 rounded-2xl border border-gray-100 space-y-5">
                                <h3 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-2">Documents</h3>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Resume / CV</label>
                                    <label
                                        htmlFor="resume-input"
                                        className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 px-6 py-8 bg-white hover:bg-indigo-50/40 hover:border-indigo-400 transition-all cursor-pointer group"
                                    >
                                        <FileUp className="h-10 w-10 text-gray-300 group-hover:text-indigo-500 group-hover:-translate-y-1 transition-all duration-200 mb-3" />
                                        {fileName ? (
                                            <span className="text-sm font-semibold text-indigo-600">{fileName}</span>
                                        ) : (
                                            <>
                                                <span className="text-sm font-semibold text-indigo-600">Click to upload a file</span>
                                                <span className="text-xs text-gray-400 mt-1 tracking-wide">PDF, DOC, DOCX up to 10MB</span>
                                            </>
                                        )}
                                        <input
                                            id="resume-input"
                                            name="resume"
                                            type="file"
                                            required
                                            accept=".pdf,.doc,.docx"
                                            className="sr-only"
                                            onChange={(e) => setFileName(e.target.files[0]?.name || null)}
                                        />
                                    </label>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                        Cover Letter <span className="text-gray-400 font-normal">(Optional)</span>
                                    </label>
                                    <textarea
                                        name="cover_letter"
                                        rows={4}
                                        className="block w-full rounded-xl border border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 sm:text-sm px-4 py-3 bg-white outline-none resize-y transition-all"
                                        placeholder="Tell us why you're a great fit for this role..."
                                    />
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 py-3.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`flex-[2] flex justify-center items-center gap-2 rounded-xl px-4 py-3.5 text-sm font-bold text-white transition-all shadow-lg active:scale-[0.98] ${
                                        loading
                                            ? 'bg-indigo-400 cursor-wait shadow-indigo-100'
                                            : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-200 hover:-translate-y-0.5'
                                    }`}
                                >
                                    {loading ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                            </svg>
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            Submit Application
                                            <SendHorizonal className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
