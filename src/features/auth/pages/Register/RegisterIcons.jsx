const iconProps = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function UserIcon() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5.7 19.2c.7-3.1 3-5 6.3-5s5.6 1.9 6.3 5" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}

export function EmailIcon() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="14" rx="2" />
      <path d="m4.5 7 7.5 5.7L19.5 7" />
    </svg>
  );
}

export function PhoneIcon() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <path d="M7.6 3.5 10 7.7 7.9 9.4c1.4 2.8 3.7 5.1 6.5 6.5l1.7-2.1 4.2 2.4c.3.2.5.6.4 1-.5 2-2.2 3.4-4.3 3.3C9.7 19.9 4.1 14.3 3.5 7.6 3.4 5.5 4.8 3.8 6.8 3.3c.3-.1.7 0 .8.2Z" />
    </svg>
  );
}

export function LockIcon() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <rect x="4.5" y="10" width="15" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14.5v2" />
    </svg>
  );
}

export function EyeIcon() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <path d="M2.5 12s3.4-5.2 9.5-5.2S21.5 12 21.5 12s-3.4 5.2-9.5 5.2S2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="2.3" />
    </svg>
  );
}

export function EyeOffIcon() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <path d="m4 4 16 16M9.8 7c.7-.2 1.4-.3 2.2-.3 6.1 0 9.5 5.3 9.5 5.3a17 17 0 0 1-3 3.5M6.2 8.2A16.5 16.5 0 0 0 2.5 12s3.4 5.3 9.5 5.3c1 0 2-.2 2.8-.4M9.9 9.9a3 3 0 0 0 4.2 4.2" />
    </svg>
  );
}

export function ChevronDownIcon() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <path d="m7 10 5 5 5-5" />
    </svg>
  );
}

export function MailSentIcon() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="14" rx="2" />
      <path d="m4.5 7 7.5 5.7L19.5 7" />
      <path d="M17.5 3.5v4M15.5 5.5h4" />
    </svg>
  );
}

export function SuccessIcon() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12.2 2.6 2.6L16.5 9" />
    </svg>
  );
}
