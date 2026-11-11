import { useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import InteractiveImage from "../components/InteractiveImage.jsx";
import { ProjectModal } from "../components/ProjectGallery.jsx";
import { services } from "../data/content.js";

const heroImage =
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2400&q=90";

const servicePreview = [
  { title: "Residential interiors", image: services[0].image, number: "01" },
  { title: "Modular kitchens", image: services[3].image, number: "02" },
  {
    title: "Bedroom design",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=85",
    number: "03",
  },
  {
    title: "Living spaces",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
    number: "04",
  },
  { title: "Commercial interiors", image: services[1].image, number: "05" },
];

const conceptProjects = [
  {
    title: "Quiet mornings",
    category: "Residential · concept study",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1700&q=88",
    shape: "project-wide",
    imageShape: "diagonal",
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1900&q=88",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1900&q=88",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1900&q=88",
    ],
    description: "An illustrative residential concept exploring warm timber, sculptural furniture and the quiet luxury of daylight.",
  },
  {
    title: "A place to gather",
    category: "Living spaces · concept study",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1300&q=88",
    shape: "project-tall",
    imageShape: "arch",
    images: [
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1900&q=88",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1900&q=88",
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1900&q=88",
    ],
    description: "A living-space concept with soft edges, layered natural textures and room to gather.",
  },
  {
    title: "In good light",
    category: "Kitchen · concept study",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1500&q=88",
    shape: "project-offset",
    imageShape: "organic",
    images: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1900&q=88",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1900&q=88",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1900&q=88",
    ],
    description: "A kitchen concept where tactile stone and warm timber meet practical, considered detail.",
  },
];

const heroLines = [
  ["Designed to"],
  ["Feel Different."],
];

const lineVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.2 } },
};

const wordVariants = {
  hidden: { y: "112%" },
  visible: {
    y: "0%",
    transition: { duration: 1.05, ease: [0.22, 1, 0.36, 1] },
  },
};

function EditorialLink({ to, children, className = "" }) {
  return (
    <Link to={to} className={`editorial-link ${className}`}>
      {children}
    </Link>
  );
}

export default function Home() {
  const [selectedProject, setSelectedProject] = useState(null);
  const reduceMotion = useReducedMotion();
  const heroX = useSpring(useMotionValue(0), { stiffness: 45, damping: 22 });
  const heroY = useSpring(useMotionValue(0), { stiffness: 45, damping: 22 });

  const handleHeroPointerMove = (event) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    heroX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * -12);
    heroY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * -8);
  };

  const resetHeroPointer = () => {
    heroX.set(0);
    heroY.set(0);
  };

  return (
    <main className="editorial-home">
      <section className="cinematic-hero" id="home" onPointerMove={handleHeroPointerMove} onPointerLeave={resetHeroPointer}>
        <div className="hero-atmosphere" aria-hidden="true" />
        <div className="cinematic-content">
          <motion.div
            className="cinematic-content-motion"
            initial={reduceMotion ? false : { opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: reduceMotion ? 0 : 0.55, duration: reduceMotion ? 0.01 : 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              className="cinematic-eyebrow"
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduceMotion ? 0 : 0.45, duration: reduceMotion ? 0.01 : 0.9 }}
            >
              DOLLYSPRO INTERIOR DESIGN STUDIO
            </motion.span>
            <motion.h1
              initial={reduceMotion ? false : "hidden"}
              animate={reduceMotion ? undefined : "visible"}
            >
              {heroLines.map((line, index) => (
                <motion.span className="cinematic-title-line" variants={lineVariants} key={index}>
                  {line.map((word) => (
                    <span className="cinematic-word-mask" key={word}>
                      <motion.span variants={wordVariants}>{word}</motion.span>
                    </span>
                  ))}
                </motion.span>
              ))}
            </motion.h1>
            <motion.p
              className="cinematic-description"
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduceMotion ? 0 : 1.05, duration: reduceMotion ? 0.01 : 1 }}
            >
              Creating extraordinary spaces through thoughtful design, timeless details and a personal touch.
            </motion.p>
            <motion.div
              className="cinematic-action"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduceMotion ? 0 : 1.3, duration: reduceMotion ? 0.01 : 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link to="/contact" className="project-cta">
                <span>LET&apos;S CREATE YOUR SPACE</span>
                <ArrowUpRight size={17} strokeWidth={1.5} />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <div className="cinematic-art" aria-label="A layered interior design composition">
          <span className="hero-arch-outline" aria-hidden="true" />
          <motion.div
            className="cinematic-art-depth"
            style={{ x: heroX, y: heroY }}
            initial={reduceMotion ? false : { scale: 0.985, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: reduceMotion ? 0 : 0.25, duration: reduceMotion ? 0.01 : 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="cinematic-arch-reveal"
              initial={reduceMotion ? false : { clipPath: "inset(100% 0 0 0 round 50% 50% 0 0)" }}
              animate={{ clipPath: "inset(0% 0 0 0 round 50% 50% 0 0)" }}
              transition={{ delay: reduceMotion ? 0 : 0.12, duration: reduceMotion ? 0.01 : 1.45, ease: [0.76, 0, 0.24, 1] }}
            >
              <div className="hero-scroll-drift">
                <motion.img
                  src={heroImage}
                  alt="Sunlit contemporary living room with sculptural furniture and natural finishes"
                  fetchPriority="high"
                  initial={reduceMotion ? false : { scale: 1.14 }}
                  animate={{ scale: 1.015 }}
                  transition={{ delay: reduceMotion ? 0 : 0.2, duration: reduceMotion ? 0.01 : 10, ease: "linear" }}
                />
              </div>
            </motion.div>
            <motion.div
              className="hero-image-overlap"
              initial={reduceMotion ? false : { opacity: 0, y: 24, rotate: -5 }}
              animate={{ opacity: 1, y: 0, rotate: -3 }}
              transition={{ delay: reduceMotion ? 0 : 1.1, duration: reduceMotion ? 0.01 : 1.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="hero-image-float">
                <InteractiveImage
                  shape="cut"
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=85"
                  alt="Close detail of layered natural materials in a considered interior"
                />
              </div>
            </motion.div>
            <motion.span
              className="hero-image-caption"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: reduceMotion ? 0 : 1.45, duration: reduceMotion ? 0.01 : 0.8 }}
            >
              A study in natural light <i>—</i> 01
            </motion.span>
          </motion.div>
          <span className="hero-orbit hero-orbit-one" aria-hidden="true" />
          <span className="hero-orbit hero-orbit-two" aria-hidden="true" />
          <span className="hero-art-note">A HOME, IN ITS OWN LIGHT</span>
        </div>

        <span className="cinematic-bottom-left">INTERIORS WITH INTENTION</span>
        <a href="#philosophy" className="cinematic-scroll">
          <span className="hero-scroll-line" />
          <span className="scroll-arrow"><ArrowDown size={14} /></span>
          <span>SCROLL TO DISCOVER</span>
        </a>
        <span className="cinematic-bottom-right">DESIGNED AROUND YOU</span>
      </section>

      <section className="philosophy-section editorial-wrap" id="philosophy">
        <div className="philosophy-label reveal">
          <span>01 / OUR PHILOSOPHY</span>
          <span className="philosophy-index">A point of view</span>
        </div>
        <div className="philosophy-content">
          <motion.h2
            className="reveal"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            Spaces should do more than look beautiful. They should <em>feel like home.</em>
          </motion.h2>
          <div className="philosophy-aside reveal">
            <p>
              The most meaningful rooms are the ones that make space for the way you
              really live. We bring considered design and a personal point of view to
              every detail, creating interiors that feel effortless, enduring and
              entirely your own.
            </p>
            <EditorialLink to="/contact">A little about our approach <ArrowRight size={15} /></EditorialLink>
            <figure className="philosophy-visual">
              <InteractiveImage
                className="philosophy-image image-reveal"
                shape="arch"
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1100&q=86"
                alt="Warmly layered living room with natural textures"
              />
              <div className="philosophy-overlap">
                <InteractiveImage
                  shape="organic"
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=700&q=85"
                  alt="A close view of layered interior materials and collected objects"
                />
              </div>
              <span className="philosophy-seal" aria-hidden="true">MADE<br />TO FEEL<br />LIKE HOME</span>
              <figcaption>Light, texture, and room to breathe.</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="service-editorial-section" id="services">
        <div className="editorial-wrap">
          <div className="editorial-section-heading reveal">
            <div>
              <span className="editorial-kicker">02 / WHAT WE DO</span>
              <h2>Considered for <em>living.</em></h2>
            </div>
            <p>Thoughtful design, shaped around the way you want to feel at home.</p>
          </div>
          <div className="service-editorial-grid">
            {servicePreview.map((service, index) => (
              <Link
                to="/contact"
                className={`editorial-service-card service-position-${index + 1} reveal`}
                key={service.number}
              >
                <InteractiveImage
                  className="editorial-service-image image-reveal"
                  shape={["arch", "diagonal", "organic", "oval", "cut"][index]}
                  src={service.image}
                  alt={`${service.title}, interior design`}
                >
                  <span className="editorial-service-count">{service.number}</span>
                  <span className="editorial-service-arrow"><ArrowUpRight size={19} /></span>
                </InteractiveImage>
                <span className="editorial-service-title">{service.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="concept-work-section" id="projects">
        <div className="editorial-wrap">
          <div className="editorial-section-heading reveal">
            <div>
              <span className="editorial-kicker">03 / A FEW DIRECTIONS</span>
              <h2>Ideas for <em>living well.</em></h2>
            </div>
            <p>Illustrative concept studies, exploring the possibilities of a more personal home.</p>
          </div>
          <div className="concept-project-grid">
            {conceptProjects.map((project, index) => (
              <button
                type="button"
                onClick={() => setSelectedProject({
                  ...project,
                  location: "Dollyspro design concept",
                  year: "Illustrative study",
                })}
                className={`concept-project-card ${project.shape} reveal`}
                key={project.title}
                aria-label={`View ${project.title} interior concept`}
              >
                <InteractiveImage
                  className="concept-project-image image-reveal"
                  shape={project.imageShape}
                  src={project.image}
                  alt={`${project.title}, illustrative interior concept`}
                >
                  <span className="concept-view">VIEW <ArrowUpRight size={15} /></span>
                </InteractiveImage>
                <span className="concept-project-meta">
                  <span className="concept-project-title">{project.title}</span>
                  <span className="concept-project-category">{project.category}</span>
                </span>
                <span className="concept-project-index">0{index + 1}</span>
              </button>
            ))}
          </div>
          <div className="concept-work-foot">
            <span>Every good idea begins with a conversation.</span>
            <EditorialLink to="/contact">Start a conversation <ArrowUpRight size={15} /></EditorialLink>
          </div>
        </div>
      </section>

      <section className="editorial-contact">
        <div className="editorial-wrap editorial-contact-inner">
          <span className="editorial-kicker">04 / A PLACE TO BEGIN</span>
          <h2>Make room for<br /><em>what matters.</em></h2>
          <p>Tell us what you&apos;re imagining. We&apos;ll take it from there, together.</p>
          <EditorialLink to="/contact">Begin a conversation <ArrowUpRight size={15} /></EditorialLink>
        </div>
      </section>
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </main>
  );
}
