import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axios';
import AuthContext from '../contexts/AuthContext';
import { StatusBadge } from '../components/StatusBadge';
import { Briefcase, Building2, MapPin, Calendar, FileText, ChevronRight, Activity, CheckCircle, Clock, XCircle } from 'lucide-react';

export default function CandidateDashboard() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await axiosInstance.get('applications/');
                setApplications(response.data.results || response.data);
            } catch (error) {
                console.error("Error fetching applications", error);
            } finally {
                setLoading(false);
            }
        };
        fetchApplications();
    }, []);

    const stats = {
        total: applications.length,
        pending: applications.filter(app => app.status === 'pending').length,
        accepted: applications.filter(app => app.status === 'accepted').length,
        rejected: applications.filter(app => app.status === 'rejected').length
    };

    if (loading) return (
         <div className="flex justify-center items-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50/50 py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header Section */}
                <div className="md:flex md:items-center md:justify-between mb-8 pb-6 border-b border-gray-200">
                    <div className="min-w-0 flex-1">
                        <h2 className="text-3xl font-extrabold leading-9 text-gray-900 sm:truncate tracking-tight flex items-center gap-3">
                            <span className="bg-indigo-100 p-2 rounded-xl">
                                <FileText className="h-6 w-6 text-indigo-600" />
                            </span>
                            My Dashboard
                        </h2>
                        <p className="mt-2 text-base font-medium text-gray-500">
                            Welcome back, {user?.first_name || user?.username}! Track the status of your applications.
                        </p>
                    </div>
                    <div className="mt-4 flex md:mt-0 md:ml-4">
                        <Link
                            to="/jobs"
                            className="inline-flex items-center rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-200 hover:bg-indigo-500 hover:-translate-y-0.5 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 group"
                        >
                            Find More Jobs
                            <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                        <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
                            <Activity className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Applied</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                        <div className="bg-yellow-50 p-3 rounded-xl border border-yellow-100">
                            <Clock className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Pending</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                        <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                            <CheckCircle className="h-6 w-6 text-emerald-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Accepted</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.accepted}</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                        <div className="bg-red-50 p-3 rounded-xl border border-red-100">
                            <XCircle className="h-6 w-6 text-red-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Rejected</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.rejected}</p>
                        </div>
                    </div>
                </div>

                {/* Applications List */}
                <h3 className="text-xl font-bold border-b border-gray-200 pb-2 mb-4 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-indigo-500" />
                    Application History
                </h3>
                
                <div className="bg-white rounded-3xl overflow-hidden border border-gray-100/80 shadow-sm">
                    {applications.length === 0 ? (
                        <div className="text-center py-20 px-4">
                            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-indigo-50 border border-indigo-100/50 mb-6">
                                <Briefcase className="h-10 w-10 text-indigo-500" />
                            </div>
                            <h3 className="mt-2 text-xl font-bold text-gray-900">No applications yet</h3>
                            <p className="mt-2 text-gray-500 font-medium max-w-sm mx-auto">
                                You haven't applied to any jobs yet. Browse our listings to find your match.
                            </p>
                            <Link to="/jobs" className="mt-6 inline-block font-semibold text-indigo-600 hover:text-indigo-500 border-b-2 border-indigo-600/30 hover:border-indigo-600 transition-colors pb-0.5">
                                Browse Jobs
                            </Link>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100/80">
                            {applications.map((app) => (
                                <Link 
                                    key={app.id} 
                                    to={`/jobs/${app.job.id}`} 
                                    className="block hover:bg-indigo-50/30 transition-colors duration-200 px-6 py-6 sm:px-8 group"
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                        
                                        <div className="flex-1 min-w-0 pr-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-700 transition-colors truncate">
                                                    {app.job.title}
                                                </h3>
                                                <div className="sm:hidden block shrink-0 ml-4">
                                                    <StatusBadge status={app.status} className="shadow-sm" />
                                                </div>
                                            </div>
                                            
                                            <div className="flex flex-wrap items-center mt-2.5 text-sm text-gray-500 font-medium gap-y-2 gap-x-5">
                                                <div className="flex items-center min-w-0 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100/50">
                                                    <Building2 className="mr-1.5 h-4 w-4 text-gray-400 shrink-0" />
                                                    <span className="truncate max-w-[150px]">{app.job.recruiter?.first_name 
                                                        ? `${app.job.recruiter.first_name} ${app.job.recruiter.last_name}` 
                                                        : app.job.recruiter?.username || 'Company'}</span>
                                                </div>
                                                <div className="flex items-center min-w-0 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100/50">
                                                    <MapPin className="mr-1.5 h-4 w-4 text-gray-400 shrink-0" />
                                                    <span className="truncate max-w-[150px]">{app.job.location}</span>
                                                </div>
                                                <div className="flex items-center min-w-0 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100/50">
                                                    <Calendar className="mr-1.5 h-4 w-4 text-gray-400 shrink-0" />
                                                    Applied {new Date(app.created_at).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="mt-4 sm:mt-0 sm:ml-4 sm:flex shrink-0 items-center justify-end gap-x-6">
                                            <div className="hidden sm:block">
                                                 <StatusBadge status={app.status} className="shadow-sm text-sm py-1 px-3" />
                                            </div>
                                            
                                            <div className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm border border-gray-200 group-hover:border-indigo-200 group-hover:bg-indigo-50 transition-colors">
                                                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                                            </div>
                                        </div>

                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
