import { useCallback, useEffect, useMemo, useState } from "react";
import HeaderDock from "./components/HeaderDock.jsx";
import SkillsSection from "./components/SkillsSection.jsx";
import EducationSection from "./components/EducationSection.jsx";
import HeroSection from "./components/HeroSection.jsx";
import AboutSection from "./components/AboutSection.jsx";
import ExperienceSection from "./components/ExperienceSection.jsx";
import ProjectsSection from "./components/ProjectsSection.jsx";
import GalleryPreviewSection from "./components/GalleryPreviewSection.jsx";
import ContactSection from "./components/ContactSection.jsx";
import GalleryPageHero from "./components/GalleryPageHero.jsx";
import GalleryGrid from "./components/GalleryGrid.jsx";
import LightRays from "./components/LightRays.jsx";
import portfolioData from "./data/portfolio.json";
import {
  AboutIcon,
  EducationIcon,
  ExperienceIcon,
  GalleryIcon,
  HomeIcon,
  ProjectsIcon,
  SkillsIcon,
  ThemeIcon
} from "./components/DockIcons.jsx";

const initialData = {
  profile: {
    name: "",
    role: "",
    location: "",
    tagline: "",
    summary: "",
    availability: "",
    programmingExperience: "",
    focus: "",
    currently: ""
  },
  highlights: [],
  experience: [],
  projects: [],
  skills: [],
  education: [],
  contact: {},
  about: {
    eyebrow: "",
    summary: "",
    cards: []
  }
};

export default function App() {
  const [data] = useState(portfolioData ?? initialData);
  const [page, setPage] = useState(
    window.location.hash === "#/gallery" ? "gallery" : "home"
  );
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    const onHashChange = () => {
      setPage(window.location.hash === "#/gallery" ? "gallery" : "home");
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("theme-dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const meta = data.profile || initialData.profile;
  const experience = data.experience || [];
  const projects = data.projects || [];
  const skills = data.skills || [];
  const education = data.education || [];
  const contact = data.contact || {};
  const about = data.about || {};
  const galleryPage = data.galleryPage || {
    title: "Gallery",
    intro: "Use this page to show the photos you have taken.",
    photos: []
  };

  const gridProjects = useMemo(() => projects.slice(0, 4), [projects]);

  const goHome = useCallback(() => {
    window.location.hash = "#/";
    setPage("home");
  }, []);

  const goGallery = useCallback(() => {
    window.location.hash = "#/gallery";
    setPage("gallery");
  }, []);

  const scrollToSection = useCallback(
    (sectionId) => {
      const focusSection = () => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      };

      if (page !== "home") {
        setPage("home");
        window.location.hash = "#/";
        requestAnimationFrame(() => requestAnimationFrame(focusSection));
        return;
      }

      focusSection();
    },
    [page]
  );

  const dockItems = useMemo(
    () => [
      {
        label: "Home",
        icon: <HomeIcon />,
        onClick: goHome,
        className: page === "home" ? "dock-active" : ""
      },
      {
        label: "About",
        icon: <AboutIcon />,
        onClick: () => scrollToSection("about")
      },
      {
        label: "Experience",
        icon: <ExperienceIcon />,
        onClick: () => scrollToSection("experience")
      },
      {
        label: "Projects",
        icon: <ProjectsIcon />,
        onClick: () => scrollToSection("projects")
      },
      {
        label: "Skills",
        icon: <SkillsIcon />,
        onClick: () => scrollToSection("skills")
      },
      {
        label: "Education",
        icon: <EducationIcon />,
        onClick: () => scrollToSection("education")
      },
      {
        label: galleryPage.title || "Gallery",
        icon: <GalleryIcon />,
        onClick: goGallery,
        className: page === "gallery" ? "dock-active" : ""
      },
      {
        label: theme === "dark" ? "Light mode" : "Dark mode",
        icon: <ThemeIcon theme={theme} />,
        onClick: () => setTheme(theme === "dark" ? "light" : "dark")
      }
    ],
    [galleryPage.title, goGallery, goHome, page, scrollToSection, theme]
  );

  return (
    <div className="app">
      {theme === "dark" ? (
        <div className="light-rays-bg" aria-hidden="true">
          <LightRays
            raysOrigin="top-center"
            raysColor="var(--accent-primary)"
            raysSpeed={0.7}
            lightSpread={0.65}
            rayLength={2.4}
            followMouse={true}
            mouseInfluence={0.08}
            noiseAmount={0.05}
            distortion={0.12}
            pulsating={false}
            fadeDistance={1}
            saturation={0.8}
            className="custom-rays"
            colorKey={theme}
          />
        </div>
      ) : null}
      <header className="site-header">
        <HeaderDock items={dockItems} />
      </header>
      {page === "home" ? (
        <>
          <HeroSection meta={meta} />

          <main className="content">
            <AboutSection about={about} meta={meta} />
            <ExperienceSection experience={experience} />
            <ProjectsSection projects={gridProjects} />

            <SkillsSection skills={skills} />
            <EducationSection education={education} />

            <GalleryPreviewSection galleryPage={galleryPage} />
            <ContactSection contact={contact} />
          </main>
        </>
      ) : (
        <main className="content page">
          <GalleryPageHero meta={meta} galleryPage={galleryPage} />
          <GalleryGrid photos={galleryPage.photos || []} />
        </main>
      )}

      <footer className="footer">
        <div>
          <p>{meta.name || "Your Name"}</p>
          <p className="muted">{meta.role || "Your Role"}</p>
        </div>
        <div className="links">
          {contact.email ? <a href={`mailto:${contact.email}`}>Email</a> : null}
          {contact.github ? <a href={contact.github}>GitHub</a> : null}
          {contact.linkedin ? <a href={contact.linkedin}>LinkedIn</a> : null}
        </div>
      </footer>
    </div>
  );
}
