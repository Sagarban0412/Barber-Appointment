"use client";

import {
  Scissors,
  Facebook,
  Instagram,
  Twitter,
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  ArrowRight,
} from "lucide-react";
import React from "react";
import Link from "next/link";

const SOCIAL_LINKS = [
  { href: "#", label: "Facebook", Icon: Facebook },
  { href: "#", label: "Instagram", Icon: Instagram },
  { href: "#", label: "Twitter", Icon: Twitter },
];

const QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/gallary", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-10 xl:px-20 py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand + socials + newsletter */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-red-500/10 p-2.5 ring-1 ring-red-500/20">
                <Scissors className="w-6 h-6 text-red-500" />
              </div>
              <h2 className="font-extrabold text-2xl text-white tracking-wider uppercase">
                BarberShop
              </h2>
            </div>

            <p className="text-sm leading-relaxed text-gray-400 max-w-md">
              Modern grooming for the gentleman. Book an appointment today and
              experience precision styling in an ultra-relaxing ambiance.
            </p>

            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="group inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 ring-1 ring-white/10 text-gray-400 transition hover:bg-red-500 hover:text-white hover:ring-red-500"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-2"
            >
              <label
                htmlFor="footer-newsletter"
                className="block text-sm font-semibold text-white"
              >
                Subscribe to our newsletter
              </label>
              <p className="text-xs text-gray-500">
                Style tips, drop alerts, and shop updates. No spam.
              </p>
              <div className="mt-3 flex max-w-md overflow-hidden rounded-xl bg-slate-900 ring-1 ring-white/10 focus-within:ring-red-500/60 transition">
                <input
                  id="footer-newsletter"
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder:text-gray-500 outline-none"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-red-500 px-5 text-sm font-semibold text-white hover:bg-red-600 transition"
                >
                  Subscribe
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {QUICK_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-gray-400 hover:text-red-400 transition-colors inline-flex items-center gap-2"
                  >
                    <span className="h-1 w-1 rounded-full bg-red-500" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Hours
            </h3>
            <div className="mt-5 space-y-3 text-sm text-gray-400">
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 text-red-500 shrink-0" size={16} />
                <div className="space-y-1">
                  <p>Wed – Mon</p>
                  <p className="text-white">8:00 AM – 8:00 PM</p>
                  <p className="text-red-400 font-semibold uppercase tracking-wider text-xs">
                    Tuesday Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Get in touch */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Get in Touch
            </h3>
            <ul className="mt-5 space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 text-red-500 shrink-0" size={16} />
                <span className="leading-relaxed">
                  Bhadrapur-9, Chandragadi
                  <br />
                  Near Subisu office, in front of TVS showroom
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-red-500 shrink-0" size={16} />
                <a
                  href="tel:+9779800000000"
                  className="hover:text-red-400 transition-colors"
                >
                  +977 980-0000000
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-red-500 shrink-0" size={16} />
                <a
                  href="mailto:contact@barbershop.com"
                  className="hover:text-red-400 transition-colors break-all"
                >
                  contact@barbershop.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-10 xl:px-20 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>
            © {year} BarberShop. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-red-400 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-red-400 transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-red-400 transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
