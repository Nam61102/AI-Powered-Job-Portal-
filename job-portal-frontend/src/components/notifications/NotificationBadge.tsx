import React from 'react';

interface NotificationBadgeProps {
  count: number;
}

export default function NotificationBadge({ count }: NotificationBadgeProps) {
  if (count <= 0) return null;

  return (
    <span className="absolute top-[2px] right-[2px] flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white ring-2 ring-white">
      {count > 99 ? '99+' : count}
    </span>
  );
}
