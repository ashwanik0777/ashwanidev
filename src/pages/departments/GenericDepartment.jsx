import React from 'react';
import { useParams } from 'react-router-dom';
import DepartmentLayout from './DepartmentLayout';

const generateDummyData = (schoolCode, deptId) => {
  const formattedDept = (deptId || 'department').replace(/-/g, ' ').toUpperCase();
  const school = (schoolCode || 'GBU').toUpperCase();
  
  return {
    schoolCode: school,
    departmentId: deptId,
    heroProps: {
      title: `Department of ${formattedDept}`,
      subtitle: `Welcome to the Department of ${formattedDept} at ${school}`,
      bgTheme: 1,
    },
    hodProps: {
      name: `Head of Department`,
      designation: `HOD, ${formattedDept}`,
      message: `Welcome to the Department of ${formattedDept}. Our vision is to provide quality education and foster research in the field of ${formattedDept}. We are committed to developing skilled professionals ready for the challenges of tomorrow.`,
      image: "https://faculty.gbu.ac.in/uploads/photos/comingsoonimg.jpg",
    },
    aboutProps: {
      title: `About the Department`,
      description: `The Department of ${formattedDept} is a premier department under ${school}. We focus on innovative teaching methodologies, cutting-edge research, and industry collaborations to ensure our students get the best academic experience.`,
      vision: `To be a center of excellence in ${formattedDept} education and research.`,
      mission: [
        `Provide quality education in ${formattedDept}.`,
        `Promote research and innovation.`,
        `Foster industry-academia partnership.`,
        `Develop ethical and socially responsible professionals.`
      ],
      objectives: [
        `To impart foundational knowledge in ${formattedDept}.`,
        `To encourage students towards higher studies and research.`,
        `To enhance employability skills.`
      ]
    },
    programsData: [
      {
        id: "ug",
        name: `Bachelors Program`,
        duration: "3-4 Years",
        description: `Undergraduate program focused on core concepts of ${formattedDept}.`,
        image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop"
      },
      {
        id: "pg",
        name: `Masters Program`,
        duration: "2 Years",
        description: `Postgraduate program with advanced specialization in ${formattedDept}.`,
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop"
      },
      {
        id: "phd",
        name: "Ph.D. Program",
        duration: "Varies",
        description: `Doctoral research program in various domains of ${formattedDept}.`,
        image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=400&fit=crop"
      }
    ],
    facultyStats: [
      { numberText: "10+", subtitle: "Professors" },
      { numberText: "25+", subtitle: "Assistant Professors" },
      { numberText: "15+", subtitle: "Research Scholars" },
    ],
    researchStats: [
      { numberText: "50+", subtitle: "Publications" },
      { numberText: "5+", subtitle: "Patents" },
      { numberText: "10+", subtitle: "Funded Projects" },
    ],
    topAchievers: [],
    achievements: [
      { title: "Excellence in Research", year: "2024", description: "Awarded for outstanding contribution to research." },
      { title: "Best Department Award", year: "2023", description: "Recognized as the best department in the university." }
    ]
  };
};

const GenericDepartment = () => {
  const { shortCode, deptId } = useParams();
  
  const dummyData = generateDummyData(shortCode, deptId);

  return <DepartmentLayout {...dummyData} />;
};

export default GenericDepartment;
