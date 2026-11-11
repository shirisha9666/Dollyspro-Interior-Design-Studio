import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { A11y, Keyboard } from "swiper/modules";
import "swiper/css";
import { projects } from "../data/content.js";
import InteractiveImage from "./InteractiveImage.jsx";

const filters = ["All work", "Residential", "Hospitality"];

function SliderControls() {
  const swiper = useSwiper();

  return (
    <>
      <button className="slider-arrow slider-prev" type="button" aria-label="Previous image" onClick={() => swiper.slidePrev()}>
        <ArrowLeft size={18} />
      </button>
      <button className="slider-arrow slider-next" type="button" aria-label="Next image" onClick={() => swiper.slideNext()}>
        <ArrowRight size={18} />
      </button>
    </>
  );
}

export function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.classList.add("modal-open");
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("modal-open");
    };
  }, [onClose]);

  return (
    <motion.div
      className="project-modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      role="presentation"
    >
      <motion.div
        className="project-modal project-modal-full"
        initial={{ opacity: 0, y: 22, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 15 }}
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} project gallery`}
      >
        <button className="modal-close" type="button" aria-label="Close project gallery" onClick={onClose}>
          <X size={20} />
        </button>
        <Swiper modules={[A11y, Keyboard]} keyboard={{ enabled: true }} loop>
          {project.images.map((image, index) => (
            <SwiperSlide key={image}>
              <img src={image} alt={`${project.title}, interior view ${index + 1}`} />
            </SwiperSlide>
          ))}
          <SliderControls />
        </Swiper>
        <div className="modal-caption">
          <div>
            <span className="eyebrow">{project.location} · {project.year}</span>
            <h3>{project.title}</h3>
          </div>
          <p>{project.description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectGallery({ limit, showFilters = true }) {
  const [filter, setFilter] = useState("All work");
  const [selectedProject, setSelectedProject] = useState(null);
  const filteredProjects = filter === "All work"
    ? projects
    : projects.filter((project) => project.category === filter);
  const visibleProjects = limit == null ? filteredProjects : filteredProjects.slice(0, limit);

  return (
    <div className="project-gallery">
      {showFilters && (
        <div className="project-filters" role="group" aria-label="Filter projects">
          {filters.map((item) => (
            <button
              className={filter === item ? "filter-chip is-active" : "filter-chip"}
              type="button"
              key={item}
              onClick={() => setFilter(item)}
              aria-pressed={filter === item}
            >
              {item}
            </button>
          ))}
        </div>
      )}
      <motion.div layout className="project-grid">
        <AnimatePresence mode="popLayout">
          {visibleProjects.map((project, index) => (
            <motion.button
              className={`project-card ${index % 3 === 1 ? "project-card-offset" : ""}`}
              key={project.id}
              layout
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35 }}
              type="button"
              onClick={() => setSelectedProject(project)}
              aria-label={`View ${project.title} project`}
            >
              <span className="project-image-wrap">
                <InteractiveImage
                  src={project.cover}
                  alt={`${project.title} interior`}
                  shape={index % 3 === 1 ? "arch" : index % 3 === 2 ? "diagonal" : "organic"}
                  className="project-depth-image"
                >
                  <span className="project-image-link"><ArrowUpRight size={19} /></span>
                </InteractiveImage>
              </span>
              <span className="project-card-caption">
                <span><strong>{project.title}</strong><small>{project.location}</small></span>
                <span className="project-type">{project.category} · {project.year}</span>
              </span>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
