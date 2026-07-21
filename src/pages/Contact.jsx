import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiSend,
  FiInstagram,
  FiFacebook,
  FiLinkedin,
  FiTwitter,
} from 'react-icons/fi';
import PageLayout from '../components/PageLayout';
import Footer from '../components/Footer';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';

const contactDetails = [
  {
    icon: FiMail,
    label: 'Email',
    value: 'studio@sunilvyas.art',
    href: 'mailto:studio@sunilvyas.art',
  },
  {
    icon: FiPhone,
    label: 'Phone',
    value: '+91 98765 43210',
    href: 'tel:+919876543210',
  },
  {
    icon: FiMapPin,
    label: 'Studio',
    value: '12 Artisan Lane, Indiranagar, Bengaluru 560038',
  },
];

const socialLinks = [
  { icon: FiInstagram, label: 'Instagram', href: '#' },
  { icon: FiFacebook, label: 'Facebook', href: '#' },
  { icon: FiLinkedin, label: 'LinkedIn', href: '#' },
  { icon: FiTwitter, label: 'Twitter', href: '#' },
];

const workingHours = [
  { day: 'Monday – Friday', time: '10:00 AM – 6:00 PM' },
  { day: 'Saturday', time: '11:00 AM – 4:00 PM' },
  { day: 'Sunday', time: 'By appointment only' },
];

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.65, ease: 'easeOut' },
};

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulated submit — replace with real API integration when backend is ready
    setTimeout(() => {
      setSubmitting(false);
      setForm({ name: '', email: '', subject: '', message: '' });
      toast.success("Thank you for your message. I'll respond within two business days.");
    }, 700);
  };

  return (
    <PageLayout>
      <Toaster position="bottom-right" richColors />
      {/* Hero */}
      <section className="pt-8 md:pt-10 pb-6 px-6 md:px-10 lg:px-14 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-[11px] md:text-xs tracking-[0.32em] text-accent2 font-medium"
        >
          LET'S CONNECT
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="mt-5 md:mt-6 font-display text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-normal tracking-[0.06em] text-ink leading-tight"
        >
          Contact
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="mt-4 mx-auto h-[2px] w-16 bg-accent2 origin-center"
        />
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          className="mt-6 max-w-xl mx-auto text-muted2 text-[15px] leading-relaxed"
        >
          For commissions, studio visits, exhibition enquiries, or simply to talk about art — I'd be glad to hear from you.
        </motion.p>
      </section>

      {/* Contact form + details */}
      <section className="px-6 md:px-10 lg:px-14 py-10 md:py-14">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-8 md:gap-10">
          {/* Form */}
          <motion.div
            {...fadeUp}
            className="lg:col-span-3 rounded-xl border border-black/5 bg-canvas p-6 md:p-8"
          >
            <p className="text-[11px] tracking-[0.32em] text-accent2 font-medium">SEND A MESSAGE</p>
            <h2 className="mt-2 font-display text-2xl md:text-3xl text-ink">
              Tell me about your enquiry
            </h2>
            <div className="mt-3 h-px w-10 bg-accent2/50" />

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Your Name" htmlFor="name">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Jane Doe"
                  />
                </Field>
                <Field label="Email Address" htmlFor="email">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="jane@example.com"
                  />
                </Field>
              </div>

              <Field label="Subject" htmlFor="subject">
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={form.subject}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Commission enquiry"
                />
              </Field>

              <Field label="Message" htmlFor="message">
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  className={`${inputClass} resize-none`}
                  placeholder="Tell me a little about what you have in mind…"
                />
              </Field>

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-md bg-ink text-canvas text-sm tracking-wide hover:bg-ink/85 transition-colors disabled:opacity-60"
              >
                {submitting ? 'Sending…' : 'Send Message'}
                <FiSend className="w-4 h-4" />
              </button>
            </form>
          </motion.div>

          {/* Details */}
          <motion.div {...fadeUp} className="lg:col-span-2 space-y-6">
            <div className="rounded-xl border border-black/5 bg-canvas p-6 md:p-8">
              <p className="text-[11px] tracking-[0.32em] text-accent2 font-medium">CONTACT DETAILS</p>
              <h3 className="mt-2 font-display text-xl text-ink">Reach the studio</h3>
              <div className="mt-3 h-px w-10 bg-accent2/50" />

              <ul className="mt-6 space-y-5">
                {contactDetails.map(({ icon: Icon, label, value, href }) => (
                  <li key={label} className="flex items-start gap-4">
                    <span className="mt-0.5 w-9 h-9 rounded-full bg-accent2/10 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-accent2" />
                    </span>
                    <div>
                      <p className="text-[11px] tracking-[0.22em] text-muted2 uppercase">{label}</p>
                      {href ? (
                        <a href={href} className="text-ink text-[15px] hover:text-accent2 transition-colors">
                          {value}
                        </a>
                      ) : (
                        <p className="text-ink text-[15px] leading-snug">{value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Working hours */}
            <div className="rounded-xl border border-black/5 bg-canvas p-6 md:p-8">
              <p className="text-[11px] tracking-[0.32em] text-accent2 font-medium">WORKING HOURS</p>
              <h3 className="mt-2 font-display text-xl text-ink">Studio hours</h3>
              <div className="mt-3 h-px w-10 bg-accent2/50" />

              <ul className="mt-5 space-y-3">
                {workingHours.map((w) => (
                  <li key={w.day} className="flex items-center justify-between gap-3 text-sm">
                    <span className="inline-flex items-center gap-2 text-ink/80">
                      <FiClock className="w-3.5 h-3.5 text-accent2" />
                      {w.day}
                    </span>
                    <span className="text-muted2 text-[13px]">{w.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div className="rounded-xl border border-black/5 bg-canvas p-6 md:p-8">
              <p className="text-[11px] tracking-[0.32em] text-accent2 font-medium">FOLLOW ALONG</p>
              <h3 className="mt-2 font-display text-xl text-ink">On social media</h3>
              <div className="mt-3 h-px w-10 bg-accent2/50" />
              <div className="mt-5 flex flex-wrap gap-3">
                {socialLinks.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-ink/70 hover:text-accent2 hover:border-accent2 transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="px-6 md:px-10 lg:px-14 pb-12 md:pb-16">
        <motion.div
          {...fadeUp}
          className="max-w-6xl mx-auto rounded-xl overflow-hidden border border-black/5"
        >
          <iframe
            title="Studio location map"
            src="https://www.openstreetmap.org/export/embed.html?bbox=77.6333%2C12.9600%2C77.6533%2C12.9800&layer=mapnik&marker=12.9700%2C77.6433"
            className="w-full h-[300px] md:h-[380px] grayscale-[0.2]"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </section>

      <Footer />
    </PageLayout>
  );
};

const inputClass =
  'w-full rounded-md border border-black/10 bg-canvas px-3.5 py-2.5 text-sm text-ink placeholder:text-muted2/70 focus:outline-none focus:border-accent2 focus:ring-1 focus:ring-accent2 transition-colors';

const Field = ({ label, htmlFor, children }) => (
  <div>
    <label htmlFor={htmlFor} className="block text-[12px] tracking-[0.18em] uppercase text-muted2 mb-2">
      {label}
    </label>
    {children}
  </div>
);

export default Contact;
