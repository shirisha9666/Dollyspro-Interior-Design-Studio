import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import ProjectGallery from "../components/ProjectGallery.jsx";

export default function Projects() {
  return (
    <main className="inner-page">
      <section className="page-intro section-wrap">
        <Link className="back-link" to="/"><ArrowLeft size={15} /> Back home</Link>
        <span className="eyebrow">A collection of considered spaces</span>
        <h1>Made to feel<br /><em>like home.</em></h1>
        <p>Every project starts with a good conversation. Here are a few spaces we&apos;ve been lucky enough to make ours.</p>
      </section>
      <section className="projects-page-gallery section-wrap">
        <ProjectGallery />
      </section>
    </main>
  );
}
