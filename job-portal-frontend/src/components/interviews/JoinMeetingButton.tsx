import React from "react";

interface JoinMeetingButtonProps {
  meetingLink: string;
}

export default function JoinMeetingButton({ meetingLink }: JoinMeetingButtonProps) {
  return (
    <a
      href={meetingLink.startsWith("http") ? meetingLink : `https://${meetingLink}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all duration-300 shadow-sm shadow-blue-500/20 w-full sm:w-auto"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mr-2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
      </svg>
      Join Meeting
    </a>
  );
}
