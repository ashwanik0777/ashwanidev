import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

/*
 * "Stay Connected": GBU's official social media accounts, in the same card design as the
 * NSS page's "Social Media Hub" (components/nss/NSSSocialMedia.jsx): platform tile, name,
 * handle and a "Connect on ..." button that opens the account in a new tab.
 */

const XLogo = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const ACCOUNTS = [
  {
    platform: "Facebook",
    handle: "@gbugrnoida.dic",
    url: "https://www.facebook.com/gbugrnoida.dic/",
    icon: Facebook,
    tile: "bg-blue-600",
  },
  {
    platform: "Instagram",
    handle: "@gbugrnoida",
    url: "https://www.instagram.com/gbugrnoida/",
    icon: Instagram,
    tile: "bg-gradient-to-tr from-amber-500 via-pink-600 to-purple-600",
  },
  {
    platform: "YouTube",
    handle: "@GautambuddhaUniversity1",
    // On narrow cards the handle wraps here, not mid-word
    breakAfter: "@Gautambuddha",
    url: "https://www.youtube.com/channel/UCOfkhzLuMRTfqSKMFr9LBCA",
    icon: Youtube,
    tile: "bg-red-600",
  },
  {
    platform: "LinkedIn",
    handle: "@gautam-buddha-university",
    url: "https://www.linkedin.com/school/gautam-buddha-university/",
    icon: Linkedin,
    tile: "bg-sky-700",
  },
  {
    platform: "Twitter / X",
    handle: "@gbugrnoida",
    url: "https://x.com/gbugrnoida",
    icon: XLogo,
    tile: "bg-slate-950",
  },
];

/*
 * Card sizes follow the card's own width (container queries on the <li>):
 *   260px and wider: the NSS card exactly (p-6, 14px "Connect on ..." button);
 *   232-259px (five in a row): p-5 and 13px button text, so the label stays on one line;
 *   narrower (two per row on phones): p-4, smaller tile, the button just says "Connect".
 */
const AccountCard = ({ account, index }) => {
  const Icon = account.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="flex h-full flex-col items-center rounded-2xl border border-slate-100 bg-white p-4 text-center shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl @min-[14.5rem]:p-5 @min-[16.25rem]:p-6"
    >
      <div className={`mb-3 flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-md @min-[14.5rem]:mb-4 @min-[14.5rem]:h-16 @min-[14.5rem]:w-16 ${account.tile}`}>
        <Icon className="h-7 w-7 text-white @min-[14.5rem]:h-8 @min-[14.5rem]:w-8" />
      </div>
      <h3 className="mb-1 text-lg font-bold text-slate-900 @min-[14.5rem]:text-xl">{account.platform}</h3>
      <p className="mb-4 max-w-full text-xs font-semibold text-blue-600 [overflow-wrap:anywhere] @min-[14.5rem]:mb-6 @min-[14.5rem]:text-[13px] @min-[16.25rem]:text-sm">
        {account.breakAfter ? (
          <>
            {account.breakAfter}
            <wbr />
            {account.handle.slice(account.breakAfter.length)}
          </>
        ) : (
          account.handle
        )}
      </p>
      <a
        href={account.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Connect on ${account.platform} (opens in a new tab)`}
        className="mt-auto inline-flex w-full items-center justify-center whitespace-nowrap rounded-xl bg-slate-900 px-3 py-2 text-[13px] font-bold text-white shadow-md transition-all hover:scale-[1.02] hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 @min-[14.5rem]:py-2.5 @min-[16.25rem]:px-4 @min-[16.25rem]:text-sm"
      >
        <ExternalLink className="mr-2 h-4 w-4 shrink-0" />
        Connect<span className="hidden @min-[14.5rem]:inline">&nbsp;on {account.platform}</span>
      </a>
    </motion.div>
  );
};

const SocialFeed = () => (
  <section className="border-t border-slate-100 bg-slate-50 py-8 md:py-10" aria-labelledby="social-heading">
    <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-12">
      <div className="mb-6 text-center md:mb-8">
        <h2 id="social-heading" className="text-2xl font-bold text-blue-800 sm:text-3xl md:text-4xl">
          Stay Connected
        </h2>
        {/* <div className="mx-auto mt-2.5 h-1 w-20 rounded-full bg-blue-600" />
        <p className="mt-4 text-lg font-bold text-slate-900 sm:text-xl">Follow Our Official Handles</p> */}
      </div>

      {/* Five cards: one row from 1366px, 3 + 2 on laptops, 2 + 2 + 1 on tablets and phones; last row centred */}
      <ul className="flex flex-wrap justify-center gap-4 sm:gap-6 wide:gap-5" aria-label="GBU on social media">
        {ACCOUNTS.map((account, index) => (
          <li
            key={account.platform}
            className="@container w-[calc(50%-0.5rem)] sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] wide:w-[calc(20%-1rem)]"
          >
            <AccountCard account={account} index={index} />
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default SocialFeed;
