import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft, FiExternalLink, FiGithub } from "react-icons/fi";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const colorMap = {
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-100",
    icon: "text-blue-600",
    tag: "bg-blue-100 text-blue-700",
    hover: "group-hover:bg-blue-600",
    ring: "ring-blue-200",
  },
  violet: {
    bg: "bg-violet-50",
    border: "border-violet-100",
    icon: "text-violet-600",
    tag: "bg-violet-100 text-violet-700",
    hover: "group-hover:bg-violet-600",
    ring: "ring-violet-200",
  },
  indigo: {
    bg: "bg-indigo-50",
    border: "border-indigo-100",
    icon: "text-indigo-600",
    tag: "bg-indigo-100 text-indigo-700",
    hover: "group-hover:bg-indigo-600",
    ring: "ring-indigo-200",
  },
};

export default function ProjectDetail() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [galleryFeaturedImage, setGalleryFeaturedImage] = useState(null);

  useEffect(() => {
    fetch("/data/projects.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((p) => p.id === projectId);
        if (found) {
          setProject(found);
          setGalleryFeaturedImage(found.galleryImages[0]);
        }
      })
      .catch((err) => console.error("Error loading project:", err));
  }, [projectId]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-500 text-lg">Loading project...</p>
        </div>
      </div>
    );
  }

  const colorStyle = colorMap[project.accent] || colorMap.blue;

  return (
    <div className="bg-white">
      {/* Header with back button */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <button
            onClick={() => navigate("/#projects")}
            className="flex items-center gap-2 mb-6 text-slate-300 hover:text-white transition"
          >
            <FiArrowLeft size={20} />
            Back to Projects
          </button>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            {project.title}
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            {project.description}
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <motion.div variants={stagger} initial="hidden" animate="visible">
          {/* Featured Image */}
          <motion.div variants={fadeUp} custom={0} className="mb-12">
            <div className="overflow-hidden shadow-2xl">
              <img
                src={project.galleryImages[0]}
                alt={project.title}
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>

          {/* Description and Tags */}
          <div className="grid lg:grid-cols-3 gap-12 mb-16">
            {/* Left: Full Description */}
            <motion.div variants={fadeUp} custom={1} className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Project Overview
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                {project.fullDescription}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`px-4 py-2 text-sm font-semibold rounded-full ${
                      colorStyle.tag
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Right: Project Info Card */}
            <motion.div variants={fadeUp} custom={2}>
              <div
                className={`p-8 ${colorStyle.bg} border ${colorStyle.border}`}
              >
                <h3 className="text-xl font-bold text-slate-900 mb-6">
                  Project Details
                </h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
                      Project Type
                    </p>
                    <p className="text-lg font-medium text-slate-900">
                      {project.title}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
                      Technologies Used
                    </p>
                    <ul className="space-y-2">
                      {project.tags.slice(0, 3).map((tag) => (
                        <li key={tag} className="text-slate-700">
                          ✓ {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
                      Tools Used
                    </p>
                    <ul className="space-y-2">
                      {project.tools?.map((tool) => (
                        <li key={tool} className="text-slate-700">
                          ✓ {tool}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Gallery Section */}
          <motion.div variants={fadeUp} custom={3}>
            <h2 className="text-3xl font-bold text-slate-900 mb-8">
              Design Goals
            </h2>
            <div className="bg-blue-50 p-8 border border-blue-100 mb-12">
              <ul className="space-y-3">
                {project.designGoals?.map((goal, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="flex-shrink-0 text-blue-600 text-xl font-bold">
                      •
                    </span>
                    <span className="text-slate-700 text-lg leading-relaxed">
                      {goal}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Gallery Section */}
          <motion.div variants={fadeUp} custom={4}>
            <h2 className="text-3xl font-bold text-slate-900 mb-8">
              Project Gallery
            </h2>

            {/* Featured Gallery Image */}
            <div className="mb-8 overflow-hidden shadow-xl">
              <img
                src={galleryFeaturedImage}
                alt="Gallery"
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Thumbnail Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {project.galleryImages.map((image, index) => (
                <motion.button
                  key={index}
                  onClick={() => setGalleryFeaturedImage(image)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative overflow-hidden cursor-pointer transition-all duration-200 ${
                    galleryFeaturedImage === image
                      ? "ring-4 ring-blue-600 shadow-lg"
                      : "hover:shadow-lg"
                  }`}
                >
                  <img
                    src={image}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-32 object-cover"
                  />
                  {galleryFeaturedImage === image && (
                    <div className="absolute inset-0 bg-blue-600/20" />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            variants={fadeUp}
            custom={5}
            className="mt-20 py-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-1xl p-12 text-white text-center"
          >
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Looking for a junior WordPress developer?
            </h3>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Let's discuss how I can help bring your vision to life with a
              custom-tailored solution.
            </p>
            <button className="px-8 py-3 bg-white text-blue-600 font-semibold  hover:bg-blue-50 transition shadow-lg">
              Get in Touch
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
