import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function StatusBadge({ status, className }) {
  const statusConfig = {
    pending: { label: 'Pending', colors: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    reviewed: { label: 'Reviewed', colors: 'bg-blue-100 text-blue-800 border-blue-200' },
    accepted: { label: 'Accepted', colors: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
    rejected: { label: 'Rejected', colors: 'bg-red-100 text-red-800 border-red-200' },
  };

  const config = statusConfig[status.toLowerCase()] || statusConfig.pending;

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide border',
        config.colors,
        className
      )}
    >
      {config.label}
    </span>
  );
}
