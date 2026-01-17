"use client";

import Image from "next/image";
import { useState } from "react";

const GOOGLE_SHEETS_WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbyBk-gS9f4W8kxbfy8DnegzqjUHfhHvCp_bk5ju5xqhAMdF9KhDNFMgfuBEO6KK9EFMyw/exec";

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | {
    type: "success" | "error";
    msg: string;
  }>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const form = e.currentTarget;

    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value.trim();
    const userType = (form.elements.namedItem("userType") as HTMLSelectElement).value;
    const specialization = (
      form.elements.namedItem("specialization") as HTMLInputElement
    ).value.trim();

    try {
      const res = await fetch("/api/book-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          type: userType,
          specialization,
        }),
      });

      const data = await res.json();

      if (data?.success) {
        setStatus({
          type: "success",
          msg: "✅ Submitted successfully! We'll contact you shortly.",
        });
        form.reset();
      } else {
        setStatus({ type: "error", msg: "❌ Submission failed. Please try again." });
      }
    } catch (err) {
      setStatus({ type: "error", msg: "❌ Network error. Please try again." });
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* NAVBAR */}
<header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur">
  <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
    {/* LEFT: Logo */}
    <div className="flex items-center">
      <Image
        src="/Medibloze.png"
        alt="Medibolize logo"
        width={115}
        height={95}
        className=""
        priority
      />
    </div>

    {/* RIGHT: Desktop Links */}
    <div className="hidden items-center gap-10 md:flex">
      <a href="#services" className="text-sm text-white/70 hover:text-white transition">
        Services
      </a>
      <a href="#why" className="text-sm text-white/70 hover:text-white transition">
        Why Us
      </a>
      <a href="#ethos" className="text-sm text-white/70 hover:text-white transition">
        Our Ethics
      </a>
      <a href="#contact" className="text-sm text-white/70 hover:text-white transition">
        Contact
      </a>

      <a
        href="#contact"
        className="rounded-xl border border-white/20 bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-white/90 transition"
      >
        Book a Call
      </a>
    </div>

    {/* Mobile Hamburger */}
    <MobileMenu />
  </div>
</header>


      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* subtle background grid */}
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.15),transparent_55%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:46px_46px]" />
        </div>

        {/* Full width uniform hero */}
        <div className="relative mx-auto flex min-h-[calc(100vh-72px)] max-w-6xl items-center px-5 py-16 md:py-20">
          <div className="w-full">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/70">
              <span className="h-2 w-2 rounded-full bg-white/80" />
              Healthcare Marketing Agency
            </p>

            <h1 className="mt-6 text-5xl font-semibold leading-tight tracking-tight md:text-6xl">
              Where Healthcare  <br />
              <span className="text-white/70"> meets Marketing</span>
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/70 md:text-lg">
            Medibolize helps doctors and clinics strengthen their online and offline visibility through research-backed, education-led marketing that builds trust before the first consultation.
With strong R&D and legal support, we deliver personalized growth strategies aligned with medical ethics.
.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#contact"
                className="w-fit rounded-2xl bg-white px-8 py-3 text-sm font-semibold text-black hover:bg-white/90 transition"
              >
                Book a Call
              </a>

              <a
                href="#services"
                className="w-fit rounded-2xl border border-white/20 px-8 py-3 text-sm font-semibold text-white hover:bg-white/5 transition"
              >
                Our Services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <div className="flex flex-col gap-3">
            <p className="text-sm text-white/60">Our Services</p>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Everything You Need to Grow Your Practice
            </h2>
            <p className="max-w-2xl text-white/70 leading-relaxed">
              Comprehensive digital marketing solutions tailored specifically for healthcare
              professionals.
            </p>
          </div>

          {/* 4 Cards exactly like screenshot */}
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <ServiceCard
              icon={<ShareIcon />}
              title="Social Media Marketing"
              desc="Grow your clinic's presence on Instagram, Facebook & LinkedIn. We create engaging content that builds trust and attracts your ideal patients."
              pills={["Content Strategy", "Community Management", "Brand Building"]}
            />

            <ServiceCard
              icon={<TargetIcon />}
              title="Paid Ads Management"
              desc="Google & Meta ads designed to bring high-intent patients directly to your practice. Maximize ROI with data-driven campaigns."
              pills={["Google Ads", "Meta Ads", "Retargeting Campaigns"]}
            />

            <ServiceCard
              icon={<SearchIcon />}
              title="SEO & Local SEO"
              desc="Rank #1 on Google when patients search for your specialty. Dominate local search results and get found by patients in your area."
              pills={["Keyword Optimization", "Google Business Profile", "Citation Building"]}
            />

            <ServiceCard
              icon={<GlobeIcon />}
              title="Website Development"
              desc="Convert visitors into booked appointments with stunning, fast-loading websites designed specifically for healthcare practices."
              pills={["Mobile-First Design", "Booking Integration", "HIPAA Compliant"]}
            />
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section id="why" className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Why Medibolize ?
          </h2>
          <p className="mt-3 max-w-3xl text-white/70 leading-relaxed">
           We help healthcare practices attract and educate patients with compliant, data-driven marketing that delivers long-term trust.

          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              title="Healthcare-focused expertise"
              desc="We understand medical audiences and build compliant strategies that earn trust and drive real patient growth.
"
            />
            <FeatureCard
              title="Proven, ROI-driven strategies"
              desc="We use data-backed campaigns and continuous optimization to deliver measurable growth and maximum return on every marketing spend."
            />
            <FeatureCard
              title="Patient-first communication"
              desc="We craft clear, empathetic messaging that educates patients, builds trust, and turns interest into genuine appointments.
"
            />
            <FeatureCard
              title="All-in-one marketing solutions"
              desc="From SEO and ads to high-converting websites and reporting, we handle everything under one roof for seamless growth.
"
            />
            <FeatureCard
              title="Transparent reporting"
              desc="You get clear, easy-to-understand reports with real metrics so you always know what’s working and where your money is going.
"
            />
            <FeatureCard
              title="Scalable growth systems"
              desc="We build repeatable, scalable marketing systems that grow steadily with your practice as demand increases.
"
            />
          </div>
        </div>
      </section>

      {/* ETHOS */}
      <section id="ethos" className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-transparent p-8 md:p-10">
            <p className="text-sm text-white/60">Our Ethics</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
              Trust is the foundation of healthcare
            </h2>
<p className="mt-4 max-w-3xl text-white/70 leading-relaxed">
  In every digital and real-world interaction, we protect trust and medical integrity—because
  visibility should never compromise ethics.
</p>

<ul className="mt-6 max-w-3xl space-y-2 text-sm text-white/70">
  <li>• Clinical expertise and professional boundaries</li>
  <li>• Accuracy over attention</li>
  <li>• Education over persuasion</li>
  <li>• Long-term trust over short-term outcomes</li>
  <li>• We do not amplify claims, we clarify expertise</li>
  <li>• We do not influence patient decisions</li>
  <li>• We enable informed understanding</li>
</ul>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Book a Call</h2>
              <p className="mt-3 text-white/70 leading-relaxed">
                Fill out the details below and our team will reach out to you.
              </p>


            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm font-semibold">Book a call request</p>
              <p className="mt-2 text-sm text-white/60">
                Your response will be saved securely in our Database.
              </p>

              <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                {/* Name */}
                <div>
                  <label className="text-xs text-white/60">Name</label>
                  <input
                    name="name"
                    required
                    className="mt-1 w-full rounded-xl border border-white/15 bg-black px-4 py-3 text-sm outline-none focus:border-white/40"
                    placeholder="Your full name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="text-xs text-white/60">Email</label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="mt-1 w-full rounded-xl border border-white/15 bg-black px-4 py-3 text-sm outline-none focus:border-white/40"
                    placeholder="example@clinic.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="text-xs text-white/60">Phone number</label>
                  <input
                    name="phone"
                    type="tel"
                    required
                    className="mt-1 w-full rounded-xl border border-white/15 bg-black px-4 py-3 text-sm outline-none focus:border-white/40"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

                {/* Type */}
                <div>
                  <label className="text-xs text-white/60">Individual Doctor / Clinic Owner</label>
                  <select
                    name="userType"
                    required
                    defaultValue=""
                    className="mt-1 w-full rounded-xl border border-white/15 bg-black px-4 py-3 text-sm outline-none focus:border-white/40"
                  >
                    <option value="" disabled>
                      Select one
                    </option>
                    <option value="Individual Doctor">Individual Doctor</option>
                    <option value="Clinic Owner">Clinic Owner</option>
                  </select>
                </div>

                {/* Specialization */}
                <div>
                  <label className="text-xs text-white/60">Specialization</label>
                  <input
                    name="specialization"
                    required
                    className="mt-1 w-full rounded-xl border border-white/15 bg-black px-4 py-3 text-sm outline-none focus:border-white/40"
                    placeholder="Eg: Dermatology, Cardiology..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-white/90 transition disabled:opacity-50"
                >
                  {loading ? "Submitting..." : "Book a Call"}
                </button>

                {/* Status */}
                {status && (
                  <div
                    className={`rounded-2xl border p-3 text-sm ${
                      status.type === "success"
                        ? "border-white/15 bg-white/5 text-white/80"
                        : "border-white/15 bg-white/5 text-white/80"
                    }`}
                  >
                    {status.msg}
                  </div>
                )}


              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-black">
        <div className="mx-auto max-w-6xl px-5 py-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            {/* LEFT: Logo */}
            <div className="flex items-center gap-3">
              <Image
                src="/Medibloze.png"
                alt="Medibolize logo"
                width={115}
                height={95}
                className="rounded-xl"
              />
            </div>

            {/* CENTER: Links */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-white/70">
              <a href="#services" className="hover:text-white transition">
                Services
              </a>
              <a href="#why" className="hover:text-white transition">
                Why Us
              </a>
              <a href="#ethos" className="hover:text-white transition">
                About
              </a>
              <a href="#contact" className="hover:text-white transition">
                Contact
              </a>
            </div>

            {/* RIGHT: Social Icons */}
            <div className="flex items-center justify-center gap-4 md:justify-end">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/medibolize/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 hover:bg-white/15 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white/80"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/medibolize/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 hover:bg-white/15 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-white/80"
                >
                  <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5ZM.22 8.09H4.8V24H.22V8.09ZM8.09 8.09H12.5V10.3H12.56C13.18 9.14 14.69 7.91 17.09 7.91C21.8 7.91 22.67 11 22.67 14.98V24H18.09V15.41C18.09 13.36 18.05 10.73 15.25 10.73C12.4 10.73 11.97 12.92 11.97 15.27V24H7.39V8.09H8.09Z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="mt-8 border-t border-white/10 pt-5 text-center text-sm text-white/50">
            © {new Date().getFullYear()} Medibolize. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function ServiceCard({
  title,
  desc,
  pills,
  icon,
}: {
  title: string;
  desc: string;
  pills: string[];
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10">
      {/* Icon box like screenshot */}
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
        <div className="text-white/80">{icon}</div>
      </div>

      <p className="mt-5 text-xl font-semibold text-white">{title}</p>
      <p className="mt-2 text-sm leading-relaxed text-white/60">{desc}</p>

      {/* Pills */}
      <div className="mt-5 flex flex-wrap gap-2">
        {pills.map((pill, idx) => (
          <span
            key={idx}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
          >
            {pill}
          </span>
        ))}
      </div>
    </div>
  );
}

function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition">
      <p className="text-base font-semibold">{title}</p>
      <p className="mt-2 text-sm text-white/70 leading-relaxed">{desc}</p>
    </div>
  );
}

function EthosItem({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
      <p className="text-sm text-white/80">• {text}</p>
    </div>
  );
}

/* ---------------- ICONS ---------------- */

function ShareIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M16 8a3 3 0 1 0-2.83-4H13a3 3 0 0 0 .17 1L8.9 7.2a3 3 0 0 0-1.9-.7 3 3 0 1 0 2.83 4H10a3 3 0 0 0-.17-1l4.27-2.2A3 3 0 0 0 16 8Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle
        cx="12"
        cy="12"
        r="8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="12"
        r="3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle
        cx="11"
        cy="11"
        r="7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 21l-4.3-4.3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 12h18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button
        type="button"
        aria-label="Open menu"
        onClick={() => setOpen(!open)}
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
      >
        {/* Icon */}
        {open ? (
          // X icon
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          // Hamburger icon
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 6h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M4 12h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M4 18h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute left-0 right-0 top-[72px] border-b border-white/10 bg-black/95 backdrop-blur">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-5">
            <a
              href="#services"
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-2 text-sm text-white/80 hover:bg-white/5 hover:text-white transition"
            >
              Services
            </a>

            <a
              href="#why"
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-2 text-sm text-white/80 hover:bg-white/5 hover:text-white transition"
            >
              Why Us
            </a>

            <a
              href="#ethos"
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-2 text-sm text-white/80 hover:bg-white/5 hover:text-white transition"
            >
              Ethics
            </a>

            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-2 text-sm text-white/80 hover:bg-white/5 hover:text-white transition"
            >
              Contact
            </a>

            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-2xl bg-white px-4 py-3 text-center text-sm font-semibold text-black hover:bg-white/90 transition"
            >
              Book a Call
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
