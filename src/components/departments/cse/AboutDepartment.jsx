import { motion } from "framer-motion";
import StatsCard from "../../StatsCard";

const AboutDepartment = ({
  heading = "About the Department",
  subheading = "Established in 1995, our department has been at the forefront of computer science education and research for over two decades.",
  stats = [],
}) => {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-center text-blue-800 mb-4">
            {heading}
          </h2>
          <div className="h-1 w-24 bg-blue-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg md:text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            {subheading}
          </p>

          <StatsCard stats={stats} />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutDepartment;
