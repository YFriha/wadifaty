import { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';
import { Search, MapPin } from 'lucide-react';
import JobCard from '../components/JobCard';

export default function JobListPage() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchJobs = async () => {
        setLoading(true);
        try {
            let url = `jobs/?page=${page}`;
            if (searchQuery) url += `&search=${searchQuery}`;
            if (locationFilter) url += `&location=${locationFilter}`;
            
            const response = await axiosInstance.get(url);
            setJobs(response.data.results);
            setTotalPages(Math.ceil(response.data.count / 10));
        } catch (err) {
            setError('Failed to load jobs. Please try again later.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchJobs();
        }, 500); // 500ms debounce for search inputs
        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery, locationFilter, page]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setPage(1); // Reset to first page on new search
    };

    const handleLocationChange = (e) => {
        setLocationFilter(e.target.value);
        setPage(1);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header & Search */}
                <div className="mb-10 text-center space-y-4">
                    <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Browse Open Positions</h1>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                        Find roles that match your skills, interests, and location.
                    </p>
                </div>

                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-10 flex flex-col md:flex-row gap-4 sticky top-20 z-10 mx-auto max-w-4xl">
                    <div className="relative flex-1 group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="Job title, keywords, or company..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="block w-full pl-10 pr-3 py-3 border-none bg-gray-50/50 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all text-sm outline-none placeholder-gray-400"
                        />
                    </div>
                    
                    <div className="w-px bg-gray-100 hidden md:block mx-1"></div>
                    
                    <div className="relative flex-1 group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MapPin className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="City, state, or 'Remote'"
                            value={locationFilter}
                            onChange={handleLocationChange}
                             className="block w-full pl-10 pr-3 py-3 border-none bg-gray-50/50 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all text-sm outline-none placeholder-gray-400"
                        />
                    </div>
                </div>

                {/* Content */}
                {loading ? (
                    <div className="flex justify-center items-center py-24">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                    </div>
                ) : error ? (
                    <div className="text-center py-24 text-red-500 bg-red-50 rounded-2xl border border-red-100">
                        {error}
                    </div>
                ) : jobs.length === 0 ? (
                    <div className="text-center py-24 bg-white rounded-2xl border border-gray-100 shadow-sm">
                        <Search className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">No jobs found</h3>
                        <p className="mt-1 text-gray-500">Try adjusting your search filters.</p>
                    </div>
                ) : (
                    <>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {jobs.map(job => (
                                <JobCard key={job.id} job={job} />
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="mt-12 flex justify-center gap-2">
                                <button
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className="px-4 py-2 border border-gray-200 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    Previous
                                </button>
                                <div className="flex items-center px-4 font-medium text-gray-600">
                                    Page {page} of {totalPages}
                                </div>
                                <button
                                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                    disabled={page === totalPages}
                                    className="px-4 py-2 border border-gray-200 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
