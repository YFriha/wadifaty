import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';
import AuthContext from '../contexts/AuthContext';
import { Building2, MapPin, DollarSign, Clock, ArrowLeft, Send } from 'lucide-react';
import ApplyModal from '../components/ApplyModal';


export default function JobDetailPage() {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await axiosInstance.get(`jobs/${id}/`);
                setJob(response.data);
            } catch (error) {
                console.error("Error fetching job:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchJob();
    }, [id]);

    if (loading) return (
        <div className="flex justify-center items-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
    );

    if (!job) return <div className="text-center mt-20 text-gray-500 text-xl font-medium">Job not found</div>;

    const date = new Date(job.created_at).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back button */}
                <button 
                    onClick={() => navigate(-1)} 
                    className="flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 mb-8 transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to jobs
                </button>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 px-8 py-12 text-white relative flex flex-col items-center text-center">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                       
                        <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/20 mb-6 shadow-xl">
                            <Building2 className="w-10 h-10 text-indigo-100" />
                        </div>
                        
                        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 drop-shadow-sm">
                            {job.title}
                        </h1>
                        <p className="text-indigo-200 font-medium text-lg flex items-center justify-center gap-2">
                             {job.recruiter.username} 
                             <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span> 
                             Posted {date}
                        </p>
                    </div>

                    {/* Content */}
                    <div className="px-8 py-10">
                        {/* Highlights */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 border-b border-gray-100 pb-12">
                            <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50/80 border border-gray-100 hover:border-indigo-100 transition-colors">
                                <div className="bg-white p-2.5 rounded-lg shadow-sm">
                                    <MapPin className="w-6 h-6 text-indigo-500" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900 mb-0.5">Location</h3>
                                    <p className="text-gray-600 font-medium">{job.location}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50/80 border border-gray-100 hover:border-indigo-100 transition-colors">
                                <div className="bg-white p-2.5 rounded-lg shadow-sm">
                                    <DollarSign className="w-6 h-6 text-emerald-500" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900 mb-0.5">Salary</h3>
                                    <p className="text-gray-600 font-medium">{job.salary || 'Competitive'}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50/80 border border-gray-100 hover:border-indigo-100 transition-colors">
                                <div className="bg-white p-2.5 rounded-lg shadow-sm">
                                    <Clock className="w-6 h-6 text-blue-500" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900 mb-0.5">Type</h3>
                                    <p className="text-gray-600 font-medium">Full-time</p>
                                </div>
                            </div>
                        </div>

                        {/* Description & Requirements */}
                        <div className="prose prose-indigo max-w-none mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <span className="w-8 h-1 bg-indigo-600 rounded-full"></span>
                                About the Role
                            </h2>
                            <div className="text-gray-600 whitespace-pre-wrap leading-relaxed text-lg mb-10">
                                {job.description}
                            </div>

                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <span className="w-8 h-1 bg-purple-600 rounded-full"></span>
                                Requirements
                            </h2>
                            <div className="text-gray-600 whitespace-pre-wrap leading-relaxed text-lg bg-indigo-50/30 p-8 rounded-2xl border border-indigo-50">
                                {job.requirements}
                            </div>
                        </div>

                        {/* Apply Action */}
                        <div className="mt-12 flex justify-center pb-6">
                            {!user ? (
                                <Link 
                                    to="/login"
                                    state={{ message: "Please log in to apply for this position." }}
                                    className="inline-flex items-center justify-center px-10 py-4 text-base font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-xl shadow-indigo-200 hover:-translate-y-1 transition-all group"
                                >
                                    Login to Apply
                                    <ArrowLeft className="w-5 h-5 ml-2 group-hover:translate-x-1 rotate-180 transition-transform" />
                                </Link>
                            ) : user.role === 'candidate' ? (
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="inline-flex items-center justify-center px-10 py-4 text-base font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-xl shadow-indigo-200 hover:-translate-y-1 transition-all hover:scale-105 active:scale-95 group"
                                >
                                    Apply for this Position
                                    <Send className="w-5 h-5 ml-2.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </button>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>

            {/* Apply Modal */}
            {showModal && job && (
                <ApplyModal job={job} onClose={() => setShowModal(false)} />
            )}
        </div>
    );
}
