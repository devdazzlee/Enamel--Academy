'use client';
import React, { useMemo, useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

type ToggleRow = {
  id: string;
  title: string;
  desc: string;
  defaultOn: boolean;
};

function classNames(...xs: Array<string | false | undefined | null>) {
  return xs.filter(Boolean).join(" ");
}

function Toggle({
  checked,
  onChange,
  disabled,
  "aria-label": ariaLabel,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  disabled?: boolean;
  "aria-label": string;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={classNames(
        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
        checked ? "bg-[#7C3AED]" : "bg-gray-200",
        disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
      )}
    >
      <span
        className={classNames(
          "inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform",
          checked ? "translate-x-5" : "translate-x-1"
        )}
      />
    </button>
  );
}

function IconChevronLeft(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M15 18l-6-6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconShield(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12 22s8-4 8-10V6l-8-4-8 4v6c0 6 8 10 8 10Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconMail(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M4 6h16v12H4V6Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M4 7l8 6 8-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconLock(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M7 11V8a5 5 0 0 1 10 0v3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M6 11h12v10H6V11Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ManagePermissionsPage() {
  const emailRows: ToggleRow[] = useMemo(
    () => [
      {
        id: "email_notifications",
        title: "Email Notifications",
        desc: "Receive email notifications about account activity",
        defaultOn: true,
      },
      {
        id: "course_updates",
        title: "Course Updates",
        desc: "Get notified when new courses are added or courses are updated",
        defaultOn: true,
      },
      {
        id: "pdp_reminders",
        title: "PDP Reminders",
        desc: "Receive reminders about your PDP goals and deadlines",
        defaultOn: true,
      },
      {
        id: "marketing_emails",
        title: "Marketing Emails",
        desc: "Receive promotional offers and educational content",
        defaultOn: false,
      },
      {
        id: "cpd_certificates",
        title: "CPD Certificates",
        desc: "Get notified when CPD certificates are ready to download",
        defaultOn: true,
      },
      {
        id: "progress_reports",
        title: "Progress Reports",
        desc: "Receive monthly progress reports on your learning journey",
        defaultOn: true,
      },
    ],
    []
  );

  const privacyRows: ToggleRow[] = useMemo(
    () => [
      {
        id: "third_party_sharing",
        title: "Third-Party Data Sharing",
        desc: "Allow sharing of anonymized data with educational partners",
        defaultOn: false,
      },
      {
        id: "analytics_tracking",
        title: "Analytics Tracking",
        desc: "Help us improve by allowing analytics tracking of your platform usage",
        defaultOn: true,
      },
      {
        id: "personalization",
        title: "Personalization",
        desc: "Use your data to personalize course recommendations and content",
        defaultOn: true,
      },
    ],
    []
  );

  const [toggles, setToggles] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    [...emailRows, ...privacyRows].forEach((r) => (init[r.id] = r.defaultOn));
    return init;
  });

  function setToggle(id: string, next: boolean) {
    setToggles((p) => ({ ...p, [id]: next }));
  }

  return (
    <div className="min-h-screen bg-[#e8e8e8] font-sans text-[#1a1a1a] flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        <div className="mx-auto max-w-[860px] px-6 py-6">
          {/* Header */}
          <div className="flex items-center gap-2 text-sm text-[#6b7280]">
            <IconChevronLeft className="h-4 w-4" />
            <span>Back to Settings</span>
          </div>

          <div className="mt-6 flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
              <IconShield className="h-6 w-6 text-[#8b5cf6]" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-[#1a1a1a]">
                Manage Your Permissions
              </h1>
              <p className="mt-1 text-sm text-[#6b7280]">
                Control how we use and share your information
              </p>
            </div>
          </div>

          {/* Card: Email Communications */}
          <div className="mt-7 overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white">
            <div className="flex items-center gap-3 border-b border-[#e5e7eb] bg-white px-6 py-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50">
                <IconMail className="h-5 w-5 text-[#8b5cf6]" />
              </div>
              <div className="font-semibold text-[#1a1a1a]">Email Communications</div>
            </div>

            <div className="divide-y divide-[#e5e7eb]">
              {emailRows.map((r) => (
                <div
                  key={r.id}
                  className="flex items-center justify-between gap-6 px-6 py-5"
                >
                  <div>
                    <div className="text-sm font-medium text-[#1a1a1a]">
                      {r.title}
                    </div>
                    <div className="mt-1 text-sm text-[#6b7280]">{r.desc}</div>
                  </div>
                  <Toggle
                    checked={!!toggles[r.id]}
                    onChange={(n) => setToggle(r.id, n)}
                    aria-label={r.title}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Card: Data & Privacy */}
          <div className="mt-6 overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white">
            <div className="flex items-center gap-3 border-b border-[#e5e7eb] bg-white px-6 py-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50">
                <IconShield className="h-5 w-5 text-[#8b5cf6]" />
              </div>
              <div className="font-semibold text-[#1a1a1a]">Data &amp; Privacy</div>
            </div>

            <div className="divide-y divide-[#e5e7eb]">
              {privacyRows.map((r) => (
                <div
                  key={r.id}
                  className="flex items-center justify-between gap-6 px-6 py-5"
                >
                  <div>
                    <div className="text-sm font-medium text-[#1a1a1a]">
                      {r.title}
                    </div>
                    <div className="mt-1 text-sm text-[#6b7280]">{r.desc}</div>
                  </div>
                  <Toggle
                    checked={!!toggles[r.id]}
                    onChange={(n) => setToggle(r.id, n)}
                    aria-label={r.title}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex items-center gap-4">
            <button
              type="button"
              className="flex-1 rounded-xl bg-[#8b5cf6] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#7c3aed] active:bg-[#6d28d9] transition-colors"
            >
              Save Preferences
            </button>
            <button
              type="button"
              className="w-[120px] rounded-xl border border-[#e5e7eb] bg-white px-6 py-3 text-sm font-medium text-[#1a1a1a] hover:bg-[#f9fafb] transition-colors"
            >
              Cancel
            </button>
          </div>

          {/* Privacy Notice */}
          <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 px-6 py-5">
            <div className="flex items-start gap-3">
              <div className="mt-[2px] flex h-8 w-8 items-center justify-center rounded-lg bg-white/60">
                <IconLock className="h-5 w-5 text-blue-700" />
              </div>
              <div>
                <div className="text-sm font-semibold text-blue-900">
                  Your Privacy Matters
                </div>
                <p className="mt-2 text-sm leading-5 text-blue-800">
                  We respect your privacy and are committed to protecting your
                  personal data. You can change these permissions at any time.
                </p>
                <p className="mt-3 text-sm leading-5 text-blue-800">
                  For more information about how we handle your data, please
                  review our{" "}
                  <a
                    href="#"
                    className="font-medium text-blue-800 underline underline-offset-2"
                  >
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
