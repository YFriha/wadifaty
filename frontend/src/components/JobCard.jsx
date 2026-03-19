import { Link } from 'react-router-dom';
import { MapPin, Briefcase, Clock } from 'lucide-react';

export default function JobCard({ job }) {
  const date = new Date(job.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-indigo-100 transition-all duration-300 relative overflow-hidden flex flex-col justify-between">
      {/* Decorative gradient blob background for hover effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none -z-10" />
      
      <div>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1 mb-1">
              {job.title}
            </h3>
            <p className="text-sm text-gray-500 font-medium">
              {job.recruiter.username} • <span className="text-gray-400 font-normal">Posted {date}</span>
            </p>
          </div>
          <div className="bg-indigo-50 px-3 py-1 bg-opacity-80 rounded-full shrink-0 shadow-sm border border-indigo-100/50">
           <span className="text-xs font-semibold text-indigo-700 tracking-wide uppercase">New</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-5 mt-2">
          <div className="flex items-center text-sm text-gray-600 bg-gray-50/80 px-2.5 py-1.5 rounded-md border border-gray-100">
            <MapPin className="w-4 h-4 mr-1.5 text-gray-400" />
            <span className="truncate max-w-[120px]">{job.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 bg-gray-50/80 px-2.5 py-1.5 rounded-md border border-gray-100">
            <Briefcase className="w-4 h-4 mr-1.5 text-gray-400" />
            <span className="truncate max-w-[150px]">{job.salary || 'Salary Undisclosed'}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 bg-gray-50/80 px-2.5 py-1.5 rounded-md border border-gray-100">
            <Clock className="w-4 h-4 mr-1.5 text-gray-400" />
            Full-time
          </div>
        </div>

        <div className="mb-6">
            <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed font-normal">
              {job.description}
            </p>
        </div>
      </div>

      <div className="mt-auto">
        <Link 
            to={`/jobs/${job.id}`}
            className="w-full block text-center bg-white border-2 border-indigo-600 text-indigo-700 hover:bg-indigo-600 hover:text-white font-semibold py-2.5 px-4 rounded-xl transition-all duration-300 shadow-sm shadow-indigo-100/50"
        >
            View Details
        </Link>
      </div>
    </div>
  );
}
