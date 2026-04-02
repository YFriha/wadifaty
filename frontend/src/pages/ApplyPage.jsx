import { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';
import AuthContext from '../contexts/AuthContext';
import { FileUp, FileText, Upload, SendHorizonal, CheckCircle } from 'lucide-react';

export default function ApplyPage() {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await axiosInstance.get(`jobs/${id}/`);
                setJob(response.data);
            } catch (err) {
                setError("Could not load job details.");
            }
        };
        fetchJob();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('job', id);
        formData.append('full_name', e.target.full_name.value);
        formData.append('email', e.target.email.value);
        formData.append('phone', e.target.phone.value);
        formData.append('resume', e.target.resume.files[0]);
        if (e.target.cover_letter.value) {
             formData.append('cover_letter', e.target.cover_letter.value);
        }

        try {
            await axiosInstance.post(`applications/apply/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setSuccess(true);
            setTimeout(() => navigate('/dashboard'), 2000);
        } catch (err) {
            setError(err.response?.data?.non_field_errors?.[0] || 'Failed to submit application. Please check your inputs and try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!job) return (
        <div className="flex justify-center items-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                
                {/* Header */}
                <div className="bg-indigo-600 px-8 py-10 text-white relative flex flex-col items-center">
                    <div className="bg-white/10 p-4 rounded-xl backdrop-blur-md border border-white/20 mb-4 shadow-xl">
                        <Upload className="w-8 h-8 text-indigo-100" />
                    </div>
                    <h2 className="text-3xl font-extrabold tracking-tight mb-2">Submit Application</h2>
                    <p className="text-indigo-100 font-medium text-center">
                        Applying for <span className="text-white font-bold">{job.title}</span> at <span className="text-white font-bold">{job.recruiter.username}</span>
                    </p>
                </div>

                <div className="p-8 sm:p-12">
                     {error && (
                        <div className="mb-6 bg-red-50 text-red-700 py-4 px-5 rounded-xl text-sm font-medium border border-red-100 flex items-start gap-3 shadow-sm">
                            <svg className="w-5 h-5 text-red-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            {error}
                        </div>
                    )}

                    {success ? (
                        <div className="text-center py-16">
                            <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-emerald-100 mb-6 border-4 border-emerald-50 shadow-inner">
                                <CheckCircle className="h-12 w-12 text-emerald-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h3>
                            <p className="text-gray-500 font-medium">Redirecting you to your dashboard...</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            
                            <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100/50 space-y-6">
                                <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2 mb-4">Personal Information</h3>
                                
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
                                    <input
                                        name="full_name"
                                        type="text"
                                        required
                                        defaultValue={`${user.first_name} ${user.last_name}`}
                                        className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm px-4 py-3 bg-white"
                                        placeholder="Jane Doe"
                                    />
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                                        <input
                                            name="email"
                                            type="email"
                                            required
                                            defaultValue={user.email}
                                            className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm px-4 py-3 bg-white"
                                            placeholder="jane@example.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number</label>
                                        <input
                                            name="phone"
                                            type="tel"
                                            required
                                            className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm px-4 py-3 bg-white"
                                            placeholder="(555) 123-4567"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100/50 space-y-6 mt-6">
                                <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2 mb-4">Documents</h3>
                                
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Resume / CV</label>
                                    <div className="mt-1 flex justify-center rounded-xl border-2 border-dashed border-gray-300 px-6 pt-5 pb-6 bg-white hover:bg-gray-50 hover:border-indigo-400 transition-colors cursor-pointer group relative overflow-hidden">
                                         <div className="space-y-1 text-center">
                                            <FileUp className="mx-auto h-12 w-12 text-gray-300 group-hover:text-indigo-500 transition-colors duration-300 ease-out group-hover:-translate-y-1" />
                                            <div className="flex text-sm text-gray-600 justify-center font-medium">
                                                <label className="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                                    <span>Upload a file</span>
                                                    <input id="resume" name="resume" type="file" required accept=".pdf,.doc,.docx" className="sr-only" />
                                                </label>
                                            </div>
                                            <p className="text-xs text-gray-500 tracking-wide font-medium mt-2">PDF, DOC, DOCX up to 10MB</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                        Cover Letter <span className="text-gray-400 font-normal">(Optional)</span>
                                    </label>
                                    <textarea
                                        name="cover_letter"
                                        rows={4}
                                        className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm px-4 py-3 bg-white resize-y"
                                        placeholder="Tell us why you're a great fit for this role..."
                                    />
                                </div>
                            </div>

                            <div className="pt-6">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`group flex w-full justify-center items-center rounded-xl px-4 py-4 text-base font-bold text-white transition-all shadow-lg active:scale-[0.98] ${
                                        loading ? 'bg-indigo-400 shadow-indigo-100 cursor-wait' : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-200'
                                    }`}
                                >
                                    {loading ? 'Submitting Application...' : 'Submit Application'}
                                    {!loading && <SendHorizonal className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" /> }
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
