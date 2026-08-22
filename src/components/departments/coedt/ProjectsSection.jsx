import React from "react";
import { motion } from "framer-motion";

// ✅ Status badge helper
const getStatusColor = (status) => {
  switch (status) {
    case "Completed":
      return "bg-green-600 text-white";
    case "Ongoing":
      return "bg-blue-600 text-white";
    case "Prototype":
      return "bg-orange-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
};

const ProjectsSection = ({
  title = "Our Projects",
  subtitle = "Innovative initiatives transforming ideas into reality",
  projects = [],
}) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-800">{title}</h2>
          <div className="w-20 sm:w-24 h-1 bg-blue-500 mx-auto mt-2 rounded-full" />
        </div>
      </motion.div>

        {/* Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="bg-white border border-gray-200 border-solid rounded-xl shadow hover:shadow-lg flex flex-col overflow-hidden"
            >
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-blue-900 mb-2">
                  {project.name}
                </h3>
                <p className="text-gray-700 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs bg-indigo-100 text-indigo-800 font-medium px-2 py-1 rounded-full">
                    {project.category}
                  </span>
                  <span className="text-xs bg-gray-100 text-gray-800 font-medium px-2 py-1 rounded-full">
                    {project.year}
                  </span>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(
                      project.status
                    )}`}
                  >
                    {project.status}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs bg-gray-200 text-gray-800 font-medium px-2 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
