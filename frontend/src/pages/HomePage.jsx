import { Link } from 'react-router-dom';
import { Briefcase, Search, Star, Users, CheckCircle } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-indigo-50 to-white pt-16 pb-32">
        <div className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6">
              Find your next <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">dream job</span> with Wadifaty.
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 mb-10 font-medium">
              We connect top talent with the world's most innovative companies. Seamlessly search, apply, and land the role you deserve.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 gap-y-4 flex-col sm:flex-row">
              <Link
                to="/jobs"
                className="w-full sm:w-auto rounded-xl bg-indigo-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all hover:-translate-y-0.5"
              >
                Browse Jobs
              </Link>
              <Link
                to="/register"
                className="w-full sm:w-auto rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-all hover:ring-indigo-300 pointer-events-auto"
              >
                Create an Account <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Trusted by thousands of professionals</h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Join a growing community of recruiters and top-tier candidates.
            </p>
          </div>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
            {[
              { id: 1, name: 'Active Job Postings', value: '10,000+', icon: Briefcase, color: 'text-indigo-600' },
              { id: 2, name: 'Successful Hires', value: '50,000+', icon: CheckCircle, color: 'text-emerald-500' },
              { id: 3, name: 'Registered Users', value: '1M+', icon: Users, color: 'text-purple-600' },
            ].map((stat) => (
              <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4 shadow-sm border border-gray-100 rounded-3xl p-8 bg-white hover:shadow-lg transition-all w-full">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 border border-indigo-100/50">
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <dt className="text-base leading-7 text-gray-600 font-medium">{stat.name}</dt>
                <dd className="order-first text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
