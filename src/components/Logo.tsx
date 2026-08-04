export function Logo({
  className = "h-8 w-8 text-slate-900 dark:text-slate-100",
}: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Personal Monogram Logo"
    >
      <path
        d="M 40 130 C 25 130 15 115 25 95 C 40 65 80 20 130 20 C 175 20 185 50 150 80 C 120 105 70 120 40 120 C 25 120 20 105 35 90 C 50 75 80 60 110 50 M 110 50 C 130 45 155 45 160 55 C 168 70 145 95 120 115 C 100 130 95 135 115 135 C 135 135 150 120 155 110"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}