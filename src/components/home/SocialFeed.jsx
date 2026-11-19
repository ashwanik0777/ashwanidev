import React from "react";
import { Facebook, Instagram, Linkedin, MapPin, Youtube } from "lucide-react";

/*
 * "Stay Connected": one card per social media account, laid out like Facebook's page card
 * (cover photo, round logo over it, name, short line, follow button). No posts are loaded;
 * every card links to the account. All five show at once: one row on large screens,
 * 3 + 2 on laptops and tablets, 2 + 2 + 1 on phones.
 */

const XLogo = ({ className = "", style }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} style={style} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const ACCOUNTS = [
  {
    key: "facebook",
    platform: "Facebook",
    handle: "@gbugrnoida.dic",
    about: "Official Facebook page of Gautam Buddha University.",
    url: "https://www.facebook.com/gbugrnoida.dic/",
    icon: Facebook,
    color: "#1877F2",
    action: "Follow",
  },
  {
    key: "instagram",
    platform: "Instagram",
    handle: "@gbugrnoida",
    about: "Campus life, events and achievements in pictures.",
    url: "https://www.instagram.com/gbugrnoida/",
    icon: Instagram,
    color: "#E1306C",
    action: "Follow",
  },
  {
    key: "youtube",
    platform: "YouTube",
    handle: "Official channel",
    about: "Events, lectures and live streams from the campus.",
    url: "https://www.youtube.com/channel/UCOfkhzLuMRTfqSKMFr9LBCA",
    icon: Youtube,
    color: "#FF0000",
    action: "Subscribe",
  },
  {
    key: "linkedin",
    platform: "LinkedIn",
    handle: "School page",
    about: "Alumni, placements, research and partnerships.",
    url: "https://www.linkedin.com/school/gautam-buddha-university/",
    icon: Linkedin,
    color: "#0A66C2",
    action: "Follow",
  },
  {
    key: "x",
    platform: "X",
    handle: "@gbugrnoida",
    about: "News, announcements and campus updates.",
    url: "https://x.com/gbugrnoida",
    icon: XLogo,
    color: "#0F1419",
    action: "Follow",
  },
];

const AccountCard = ({ account }) => {
  const Icon = account.icon;
  return (
    <a
      href={account.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${account.action} Gautam Buddha University on ${account.platform}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
    >
      {/* Cover with the platform's badge */}
      <div className="relative h-24 overflow-hidden bg-slate-200 sm:h-28 2xl:h-36">
        <img src={`/assets/social/${account.key}-cover.webp`} alt="" loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <span className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-md">
          <Icon className="h-3.5 w-3.5" style={{ color: account.color }} />
        </span>
      </div>

      <div className="relative -mt-5 flex flex-1 flex-col rounded-t-[1.25rem] bg-white px-3 pb-3 sm:px-3.5 sm:pb-3.5">
        {/* Five cards share a row, so the name sits under the logo instead of beside it */}
        <img
          src="/assets/logo.webp"
          alt="Gautam Buddha University logo"
          loading="lazy"
          className="-mt-8 h-14 w-14 shrink-0 rounded-full border-[3px] border-white bg-white object-contain shadow-md sm:h-16 sm:w-16"
        />
        <p className="mt-2 text-[13px] font-bold leading-tight text-slate-900 sm:text-[15px]">Gautam Buddha University</p>
        <p className="mt-0.5 truncate text-xs font-semibold text-slate-600">{account.handle}</p>

        <p className="mt-2 line-clamp-3 text-xs leading-5 text-slate-700 sm:line-clamp-2 sm:text-[13px]">{account.about}</p>

        <p className="mb-3 mt-2 flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 sm:text-xs">
          <MapPin className="h-3.5 w-3.5 shrink-0" /> Greater Noida, U.P.
        </p>

        <span
          className="mt-auto flex items-center justify-center gap-1.5 rounded-lg py-2 text-[13px] font-semibold text-white shadow-sm transition duration-300 group-hover:brightness-110 sm:text-sm"
          style={{ backgroundColor: account.color }}
        >
          <Icon className="h-4 w-4" /> {account.action}
        </span>
      </div>
    </a>
  );
};

const SocialFeed = () => (
  <section className="border-t border-slate-100 bg-slate-50 py-8 md:py-10" aria-labelledby="social-heading">
    {/* Full width, with the same side spacing as the Latest Updates section */}
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-16">
      <div className="mb-6 text-center md:mb-8">
        <h2 id="social-heading" className="text-2xl font-bold text-blue-800 sm:text-3xl md:text-4xl">
          Stay Connected
        </h2>
        <div className="mx-auto mt-2.5 h-1 w-20 rounded-full bg-blue-600" />
      </div>

      <ul className="flex flex-wrap justify-center gap-3 sm:gap-4" aria-label="GBU on social media">
        {ACCOUNTS.map((account) => (
          <li key={account.key} className="w-[calc(50%-0.375rem)] sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.667rem)] xl:w-[calc(20%-0.8rem)]">
            <AccountCard account={account} />
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default SocialFeed;
