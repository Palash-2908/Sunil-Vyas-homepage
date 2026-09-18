import React from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { motion } from 'framer-motion';
import Quote from '../components/Quote';
import { RiDoubleQuotesL } from 'react-icons/ri';
import { FiArrowRight } from 'react-icons/fi';

const PROFILE_IMG =
  '/images/Original.jpeg';
const STUDIO_IMG_1 =
  'https://images.pexels.com/photos/4070354/pexels-photo-4070354.jpeg';
const STUDIO_IMG_2 =
  'https://images.pexels.com/photos/4348095/pexels-photo-4348095.jpeg';
const STUDIO_IMG_3 =
  'https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg';

const timeline = [
  { year: '2015', title: 'Beginnings', text: 'Graduated with Honours from the National Institute of Fine Arts, drawn early to the textures of reclaimed material and handmade craft.' },
  { year: '2017', title: 'First Solo Show', text: 'Held debut solo exhibition at Gallery Meridian, featuring early experiments in nail-thread portraiture.' },
  { year: '2019', title: 'Public Commission', text: 'Installed a permanent scrap-art sculpture at the City Cultural Centre, marking a turn toward large-scale public work.' },
  { year: '2021', title: 'Community Work', text: 'Launched free studio workshops for emerging local artists, sharing techniques developed over years of practice.' },
  { year: '2023', title: 'International Stage', text: 'Exhibited at the London International Contemporary Exhibition alongside artists from over thirty countries.' },
  { year: '2024', title: 'National Award', text: 'Honoured with the National Contemporary Art Award for the mixed-media series "Urban Pulse."' },
];

const philosophyPoints = [
  { title: 'Material Honesty', text: 'Every material carries a history. I work to let that history speak rather than be erased.' },
  { title: 'Slow Making', text: 'Patience is a medium. Thousands of nails, days of sanding — the process is part of the meaning.' },
  { title: 'Sustainable Practice', text: 'Reclaimed and discarded materials are not a limitation but an invitation to reinvention.' },
];

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: 'easeOut' },
};

const About = () => {
  return (
    <section id="about" className="scroll-mt-20">
      {/* Hero */}
      <div className="pt-8 md:pt-10 pb-6 px-6 md:px-10 lg:px-14 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-[11px] md:text-xs tracking-[0.32em] text-accent2 font-medium"
        >
          THE ARTIST BEHIND THE WORK
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="mt-5 md:mt-6 font-display text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-normal tracking-[0.06em] text-ink leading-tight"
        >
          About Sunil Vyas
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="mt-4 mx-auto h-[2px] w-16 bg-accent2 origin-center"
        />
      </div>

      {/* Introduction */}
      <div className="px-6 md:px-10 lg:px-14 py-10 md:py-14">
        <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-10 md:gap-12 items-center">
          <motion.div
            {...fadeUp}
            className="md:col-span-2 flex justify-center"
          >
            <div className="relative">
              <div className="w-[200px] h-[280px] sm:w-[230px] sm:h-[300px] overflow-hidden rounded-lg shadow-lg">
                <img
                  src={PROFILE_IMG}
                  alt="Portrait of Sunil Vyas"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-accent2/40 rounded-lg -z-10" />
            </div>
          </motion.div>

          <motion.div
            {...fadeUp}
            className="md:col-span-3"
          >
            <p className="text-[11px] tracking-[0.32em] text-accent2 font-medium mb-4">
              INTRODUCTION
            </p>
            <h2 className="font-display text-2xl md:text-3xl text-ink leading-snug mb-6">
              A self-taught artist working at the intersection of craft, patience, and discarded beauty.
            </h2>
            <div className="space-y-4 text-muted2 text-[15px] leading-[1.7]">
              <p>
                Sunil Vyas is a contemporary artist whose practice spans nail art, wood carving, scrap sculpture, and painting. Over a decade of dedicated studio work has produced a body of art unified by a single conviction — that meaning is found in the overlooked.
              </p>
              <p>
                Working from a small studio on the outskirts of the city, Sunil transforms nails, reclaimed timber, oxidised metal, and pigment into compositions that ask the viewer to slow down and look again. His work has been exhibited nationally and internationally, and is held in private collections across three continents.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Philosophy */}
      <div className="px-6 md:px-10 lg:px-14 py-12 md:py-16 bg-black/[0.02]">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-10">
            <p className="text-[11px] tracking-[0.32em] text-accent2 font-medium">PHILOSOPHY</p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl text-ink">Artistic Philosophy</h2>
            <div className="mt-4 mx-auto h-px w-12 bg-accent2" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {philosophyPoints.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
                className="text-center px-4"
              >
                <div className="mx-auto w-10 h-10 rounded-full border border-accent2/40 flex items-center justify-center mb-4">
                  <span className="text-accent2 font-display text-sm">0{i + 1}</span>
                </div>
                <h3 className="font-display text-lg text-ink mb-2">{p.title}</h3>
                <p className="text-muted2 text-sm leading-relaxed">{p.text}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            {...fadeUp}
            className="mt-12 max-w-3xl mx-auto text-center"
          >
            <RiDoubleQuotesL className="mx-auto text-accent2 text-3xl mb-4" />
            <p className="font-serif italic text-ink text-xl md:text-2xl leading-[1.5]">
              I do not make art to fill a wall. I make it to fill a pause — the breath between two thoughts, where attention returns to the world.
            </p>
            <p className="mt-5 text-[12px] tracking-[0.28em] text-accent2 font-medium">— SUNIL VYAS</p>
          </motion.div>
        </div>
      </div>

      {/* Inspiration & Creative Journey */}
      <div className="px-6 md:px-10 lg:px-14 py-12 md:py-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-14">
          <motion.div {...fadeUp}>
            <p className="text-[11px] tracking-[0.32em] text-accent2 font-medium mb-3">INSPIRATION</p>
            <h2 className="font-display text-2xl md:text-3xl text-ink mb-5">Where the Work Comes From</h2>
            <div className="space-y-4 text-muted2 text-[15px] leading-[1.7]">
              <p>
                Much of the inspiration comes from walks through industrial yards, timber mills, and old city quarters — places where material accumulates and waits. A rusted bolt, a curled shaving of wood, a nail pulled from a demolished wall: each carries a previous life that informs the next.
              </p>
              <p>
                Music and silence play equal roles. Long studio days are scored by ambient compositions and the rhythmic tap of a hammer, the scrape of a chisel, the quiet drag of sandpaper.
              </p>
            </div>
          </motion.div>

          <motion.div {...fadeUp}>
            <p className="text-[11px] tracking-[0.32em] text-accent2 font-medium mb-3">CREATIVE JOURNEY</p>
            <h2 className="font-display text-2xl md:text-3xl text-ink mb-5">From Sketch to Finished Piece</h2>
            <div className="space-y-4 text-muted2 text-[15px] leading-[1.7]">
              <p>
                Each piece begins with material, not concept. A found object suggests a form; the form demands a technique; the technique dictates patience. Drawings follow, then maquettes, then weeks or months of sustained making.
              </p>
              <p>
                The studio holds several works in progress at once — allowing each to breathe between sessions and resolving naturally rather than under pressure.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Timeline */}
      <div className="px-6 md:px-10 lg:px-14 py-12 md:py-16 bg-black/[0.02]">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-10">
            <p className="text-[11px] tracking-[0.32em] text-accent2 font-medium">JOURNEY</p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl text-ink">A Decade in the Making</h2>
            <div className="mt-4 mx-auto h-px w-12 bg-accent2" />
          </motion.div>

          <div className="relative pl-8 md:pl-10">
            <div className="absolute left-0 top-1 bottom-1 w-px bg-accent2/30" />
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
                className="relative pb-10 last:pb-0"
              >
                <span className="absolute -left-[33px] md:-left-[41px] top-1 w-3 h-3 rounded-full bg-accent2 ring-4 ring-canvas" />
                <p className="text-accent2 font-display text-lg tracking-wide">{item.year}</p>
                <h3 className="mt-1 font-display text-lg text-ink">{item.title}</h3>
                <p className="mt-2 text-muted2 text-sm md:text-[15px] leading-relaxed max-w-2xl">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Studio / Workspace */}
      <div className="px-6 md:px-10 lg:px-14 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-10">
            <p className="text-[11px] tracking-[0.32em] text-accent2 font-medium">THE STUDIO</p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl text-ink">Where the Work Happens</h2>
            <div className="mt-4 mx-auto h-px w-12 bg-accent2" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {[STUDIO_IMG_1, STUDIO_IMG_2, STUDIO_IMG_3].map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
                className="overflow-hidden rounded-lg"
              >
                <img
                  src={src}
                  alt="Studio workspace"
                  loading="lazy"
                  className="w-full h-64 md:h-72 object-cover transition-transform duration-700 hover:scale-105"
                />
              </motion.div>
            ))}
          </div>

          <motion.p
            {...fadeUp}
            className="mt-8 max-w-3xl mx-auto text-center text-muted2 text-[15px] leading-[1.7]"
          >
            A modest space filled with the residue of making — shavings, offcuts, jars of nails, half-mixed pigments. The studio is organised by intuition rather than system, and it is here that every piece finds its final form.
          </motion.p>
        </div>
      </div>

      <Quote
        text="Art is not what you see, but what you make others see."
        author="Edgar Degas"
      />

      {/* Call to action */}
      <div className="px-6 md:px-10 lg:px-14 py-12 md:py-16">
        <motion.div
          {...fadeUp}
          className="max-w-4xl mx-auto text-center bg-ink/[0.03] rounded-xl px-6 md:px-10 py-12 md:py-14"
        >
          <h2 className="font-display text-2xl md:text-3xl text-ink">
            Interested in a commission or a studio visit?
          </h2>
          <p className="mt-4 text-muted2 text-[15px] leading-relaxed max-w-xl mx-auto">
            I welcome enquiries about custom artwork, exhibitions, and collaborations. Let's start a conversation.
          </p>
          <ScrollLink
            to="contact"
            spy={true}
            smooth={true}
            offset={-20}
            duration={600}
            className="mt-7 inline-flex items-center gap-2 px-7 py-3 rounded-md bg-ink text-canvas text-sm tracking-wide hover:bg-ink/85 transition-colors cursor-pointer"
          >
            Get in Touch
            <FiArrowRight />
          </ScrollLink>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
