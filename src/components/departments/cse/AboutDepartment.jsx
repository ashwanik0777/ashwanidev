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
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-blue-800">
              {heading}
            </h2>
            <div className="w-20 sm:w-24 h-1 bg-blue-500 mx-auto mt-2 rounded-full" />
          </div>

          <StatsCard stats={stats} />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutDepartment;
