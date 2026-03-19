import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import { Briefcase, LogOut, User as UserIcon } from 'lucide-react';

export default function Navbar() {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-gray-900">
                Wadifaty
              </span>
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <Link to="/jobs" className="text-gray-600 hover:text-indigo-600 font-medium px-3 py-2 rounded-md transition-colors">
              Find Jobs
            </Link>
            
            {user ? (
              <>
                <Link 
                  to="/dashboard"
                  className="text-gray-600 hover:text-indigo-600 font-medium px-3 py-2 rounded-md transition-colors"
                >
                  Dashboard
                </Link>
                <div className="h-6 w-px bg-gray-200 mx-2"></div>
                
                <div className="flex items-center gap-2 text-sm text-gray-700 font-medium bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                    <UserIcon className="w-4 h-4 text-gray-500" />
                    {user.username}
                </div>
                
                <button
                  onClick={logoutUser}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-indigo-600 font-medium px-4 py-2 rounded-md transition-colors"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg transition-colors shadow-sm shadow-indigo-200"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
