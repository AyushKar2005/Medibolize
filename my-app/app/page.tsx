"use client";

import Image from "next/image";
import { useState } from "react";


const GOOGLE_SHEETS_WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbyBk-gS9f4W8kxbfy8DnegzqjUHfhHvCp_bk5ju5xqhAMdF9KhDNFMgfuBEO6KK9EFMyw/exec";

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | { type: "success" | "error"; msg: string }>(null);

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
        setStatus({ type: "success", msg: "✅ Submitted successfully! We'll contact you shortly." });
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
              width={95}
              height={95}
              className="rounded-xl"
              priority
            />
          </div>

          {/* RIGHT: Links + Button */}
          <div className="hidden items-center gap-10 md:flex">
            <a href="#services" className="text-sm text-white/70 hover:text-white transition">
              Services
            </a>
            <a href="#why" className="text-sm text-white/70 hover:text-white transition">
              Why Us
            </a>
            <a href="#ethos" className="text-sm text-white/70 hover:text-white transition">
              Ethos
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
              Healthcare-focused. Ethics-first. Trust-driven.
            </p>

            <h1 className="mt-6 text-5xl font-semibold leading-tight tracking-tight md:text-6xl">
              Reputation and visibility <br />
              <span className="text-white/70">— built for doctors</span>
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/70 md:text-lg">
              Medibolize is a healthcare-focused reputation & visibility partner for doctors and clinics.
              We ensure your expertise is represented accurately, ethically, and responsibly across public platforms.
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
            <p className="text-sm text-white/60">What we do</p>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Services built around medical ethics
            </h2>
            <p className="max-w-2xl text-white/70 leading-relaxed">
              We help doctors and clinics remain trusted, visible, and respected — without compromising professional integrity.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <ServiceCard
              title="Reputation & Public Presence Management"
              points={[
                "Monitoring public info linked to your name or clinic",
                "Structuring and improving online reviews ethically",
                "Correcting inconsistencies or misleading representations",
                "Ensuring accuracy across search results and listings",
              ]}
            />

            <ServiceCard
              title="Clinical Brand Positioning"
              points={[
                "Clarifying what you are known for clinically",
                "Structuring how your expertise is presented publicly",
                "Avoiding exaggerated or misleading claims",
                "Maintaining consistency across patient-facing platforms",
              ]}
            />

            <ServiceCard
              title="Ethical Digital Visibility"
              points={[
                "Education-focused content frameworks",
                "Visibility systems aligned with medical guidelines",
                "Avoiding promotional or sensational communication",
                "Compliance-aware public communication",
              ]}
            />

            <ServiceCard
              title="Patient Education Systems"
              points={[
                "Clear explanations of conditions and treatments",
                "Reducing fear and misinformation",
                "Helping patients make informed decisions",
                "Building trust through transparent communication",
              ]}
            />

            <ServiceCard
              title="Review & Feedback Frameworks"
              points={[
                "Review structuring without pressure or incentives",
                "Responding to feedback professionally",
                "Using feedback to strengthen public trust",
                "Preventing reputational damage from unmanaged reviews",
              ]}
            />

            <ServiceCard
              title="Crisis & Misinformation Protection"
              points={[
                "Handling negative reviews or online criticism",
                "Managing misinformation or false narratives",
                "Preparing response protocols for sensitive situations",
                "Long-term reputation safeguarding strategies",
              ]}
            />
          </div>

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-white/60">Partnership Model</p>
            <p className="mt-2 text-lg font-semibold">Ongoing Reputation Oversight (Long-term)</p>
            <p className="mt-2 text-white/70 leading-relaxed">
              Medibolize works as a long-term strategic partner — supporting continuous monitoring, periodic audits,
              and advisory support during sensitive situations.
            </p>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section id="why" className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            What sets Medibolize apart
          </h2>
          <p className="mt-3 max-w-3xl text-white/70 leading-relaxed">
            Most agencies apply general business tactics to healthcare, often overlooking medical ethics,
            professional sensitivity, and long-term credibility. Medibolize was created specifically to address this gap.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              title="Healthcare-only focus"
              desc="We work only with doctors and clinics, enabling deeper understanding of clinical sensitivity and ethical boundaries."
            />
            <FeatureCard
              title="Ethics before visibility"
              desc="Every action is evaluated through the lens of medical integrity. Clarity and correctness over attention."
            />
            <FeatureCard
              title="Reputation protection, not promotion"
              desc="Our work safeguards credibility and ensures public representation reflects real clinical expertise."
            />
            <FeatureCard
              title="Doctor-friendly communication"
              desc="Structured, measured, and aligned with how doctors think and work — without aggressive marketing tactics."
            />
            <FeatureCard
              title="Long-term trust mindset"
              desc="We build systems meant to strengthen reputation over years, not generate risky short-term spikes."
            />
            <FeatureCard
              title="Education-led approach"
              desc="We clarify expertise responsibly and help patients understand—without influencing medical decisions."
            />
          </div>
        </div>
      </section>

      {/* ETHOS */}
      <section id="ethos" className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-transparent p-8 md:p-10">
            <p className="text-sm text-white/60">Our ethos</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
              Trust is the foundation of healthcare
            </h2>
            <p className="mt-4 max-w-3xl text-white/70 leading-relaxed">
              Our ethos is guided by a simple principle: visibility should never come at the cost of medical integrity.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <EthosItem text="Clinical expertise and professional boundaries" />
              <EthosItem text="Accuracy over attention" />
              <EthosItem text="Education over persuasion" />
              <EthosItem text="Long-term trust over short-term outcomes" />
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-black p-6">
              <p className="text-sm font-semibold">Medibolize is not about being louder.</p>
              <p className="mt-2 text-white/70 leading-relaxed">
                It is about being understood, trusted, and respected.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Book a Call
              </h2>
              <p className="mt-3 text-white/70 leading-relaxed">
                Fill out the details below and our team will reach out to you.
              </p>

              <div className="mt-6 space-y-3 text-sm text-white/70">
                <p>✅ For doctors & clinics only</p>
                <p>✅ Education-led visibility systems</p>
                <p>✅ Crisis and misinformation protection</p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm font-semibold">Book a call request</p>
              <p className="mt-2 text-sm text-white/60">
                Your response will be saved securely in our Google Sheet.
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
                  <label className="text-xs text-white/60">
                    Individual Doctor / Clinic Owner
                  </label>
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

                <p className="text-xs text-white/50">
                  We do not run promotional campaigns. We build trust systems.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER (like screenshot but same dark theme) */}
  {/* FOOTER */}
<footer className="border-t border-white/10 bg-black">
  <div className="mx-auto max-w-6xl px-5 py-10">
    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      {/* LEFT: Logo */}
      <div className="flex items-center gap-3">
        <Image
          src="/Medibloze.png"
          alt="Medibolize logo"
          width={70}
          height={70}
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

    {/* Copyright */}
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
  points,
}: {
  title: string;
  points: string[];
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition">
      <p className="text-lg font-semibold">{title}</p>
      <ul className="mt-4 space-y-2 text-sm text-white/70">
        {points.map((p, idx) => (
          <li key={idx} className="flex gap-2">
            <span className="mt-[6px] h-2 w-2 rounded-full bg-white/70" />
            <span>{p}</span>
          </li>
        ))}
      </ul>
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

function SocialIcon({ label }: { label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="h-11 w-11 rounded-full border border-white/10 bg-white/10 hover:bg-white/15 transition"
    />
  );
}
