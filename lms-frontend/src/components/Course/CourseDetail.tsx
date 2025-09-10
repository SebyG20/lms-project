// CourseDetail.tsx
// This component displays detailed information about a single course.
// It uses the course id from the URL to find and show the correct course.

import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

// Hardcoded list of courses (should match CourseList)
// In a real app, this would come from a backend API or shared context
const courses = [
  {
    id: 1,
    title: 'Computer Science',
    description: `This course introduces students to the fundamental principles of computing and digital problem-solving. Students will learn how computers process information, understand algorithms, and gain hands-on experience with programming languages such as Python or JavaScript. They will explore topics like software development, databases, cybersecurity basics, and the role of artificial intelligence in modern technology. By the end of the course, students will be able to write efficient programs, analyze computational problems, and apply digital tools to real-world challenges.`
  },
  {
    id: 2,
    title: 'Mathematics',
    description: `Mathematics equips students with the tools to analyze, model, and solve complex problems. This course covers core topics including algebra, geometry, trigonometry, calculus, probability, and statistics. Students will learn to apply mathematical reasoning in both theoretical and practical contexts, from analyzing scientific data to solving everyday problems. They will develop logical thinking, precision, and problem-solving strategies that serve as the foundation for further studies in science, engineering, economics, and beyond.`
  },
  {
    id: 3,
    title: 'English',
    description: `English fosters strong communication and critical thinking skills. Students will study a range of literary texts—from poetry and plays to contemporary novels and essays—developing the ability to interpret, analyze, and appreciate diverse perspectives. They will also refine their own writing through creative, analytical, and persuasive assignments, while improving grammar, vocabulary, and style. Oral communication and presentation skills are emphasized to help students express themselves with clarity and confidence. By the end of the course, students will be better equipped to engage with literature and articulate their ideas effectively.`
  },
  {
    id: 4,
    title: 'Biology',
    description: `Biology explores the science of living organisms and ecosystems. Students will study topics such as cell biology, genetics, plant and animal physiology, microbiology, ecology, and evolution. Practical laboratory work will allow students to conduct experiments, observe life processes, and apply the scientific method. They will learn how organisms interact with their environments, how genetic information is passed on, and how biological knowledge contributes to medicine, biotechnology, and environmental sustainability. The course builds curiosity about life and prepares students for advanced studies in life sciences.`
  },
  {
    id: 5,
    title: 'Physics',
    description: `Physics reveals the principles that govern matter, energy, and the universe. Students will explore classical mechanics, electricity and magnetism, waves, optics, thermodynamics, and modern physics topics such as quantum theory and relativity. Through experiments and problem-solving, they will learn how to apply mathematical models to explain natural phenomena—from the motion of planets to the behavior of subatomic particles. The course develops analytical thinking, quantitative reasoning, and experimental skills, equipping students to connect theoretical concepts with real-world technological innovations.`
  },
  {
    id: 6,
    title: 'Art',
    description: `Art encourages creativity, imagination, and cultural awareness. Students will explore a wide range of artistic forms, including drawing, painting, sculpture, digital media, and design. They will learn fundamental techniques in composition, color theory, and visual storytelling, while also studying influential artists and art movements. Through hands-on projects, students will develop their own artistic style, build a portfolio of creative work, and understand how art reflects personal identity and society. The course emphasizes both creative expression and critical appreciation, inspiring students to use art as a medium of communication and innovation.`
  },
];

// React functional component for showing course details
// Finds the course by id from the URL and displays its title and description
const CourseDetail = () => {
  // Get the course id from the URL parameters
  const { id } = useParams();
  // Find the course object that matches the id
  const course = courses.find(c => c.id === Number(id));

  // If no course is found, show a not found message
  if (!course) {
    return <section><h2>Course Not Found</h2></section>;
  }


  // State for enroll button feedback
  const [enrolling, setEnrolling] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);

  // Navigation hook
  const navigate = useNavigate();

  // Check enrollment status on mount and when course changes
  useEffect(() => {
    const stored = sessionStorage.getItem('enrolledCourses');
    let enrolled = stored ? JSON.parse(stored) : [];
    setIsEnrolled(enrolled.some((c: any) => c.id === course.id));
  }, [course.id]);

  // Handler for enrolling in a course
  const handleEnroll = () => {
    setEnrolling(true);
    setTimeout(() => {
      // Get current enrolled courses from sessionStorage
      const stored = sessionStorage.getItem('enrolledCourses');
      let enrolled = stored ? JSON.parse(stored) : [];
      if (!enrolled.some((c: any) => c.id === course.id)) {
        enrolled.push({ id: course.id, name: course.title, description: course.description });
        sessionStorage.setItem('enrolledCourses', JSON.stringify(enrolled));
      }
      setIsEnrolled(true);
      setEnrolling(false);
    }, 400); // 0.4s feedback
  };

  // Emoji for each course by id
  const courseEmojis: Record<number, string> = {
    1: '📘', // Computer Science
    2: '🔢', // Mathematics
    3: '📖', // English
    4: '🧬', // Biology
    5: '⚛️', // Physics
    6: '🎨', // Art
  };

  // Show the course title, description, and an enroll button
  return (
    <section style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', padding: '2vw' }}>
      <div
        style={{
          background: '#232a3b',
          borderRadius: 16,
          boxShadow: '0 4px 24px #0002',
          padding: '2rem 1.2rem 1.5rem 1.2rem',
          maxWidth: 420,
          width: '100%',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Course emoji and title */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <span style={{ fontSize: 38, marginBottom: 8 }}>{courseEmojis[course.id] || '📚'}</span>
          <h2 style={{ color: '#4f8cff', fontWeight: 700, fontSize: '1.7rem', marginBottom: 10, textAlign: 'center', width: '100%' }}>{course.title}</h2>
        </div>
        {/* Full course description, formatted with line breaks */}
        <div style={{ width: '100%', marginBottom: 28 }}>
          <span style={{ whiteSpace: 'pre-line', color: '#fff', fontSize: '0.92rem', lineHeight: 1.5 }}>
            {course.description.replace(/^\s*[^\s]+\s+[^\n]+\n/, '')}
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
          <button
            onClick={handleEnroll}
            disabled={isEnrolled || enrolling}
            style={{
              background: enrolling
                ? 'linear-gradient(90deg, #00ff00 50%, #000 50%)'
                : isEnrolled
                ? '#aaa'
                : '#4f8cff',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              padding: '0.7rem 0',
              fontWeight: 700,
              fontSize: '1.1rem',
              cursor: isEnrolled ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s',
              minWidth: 120,
              boxShadow: '0 1px 4px #0002',
              width: '100%',
              marginBottom: 0,
            }}
          >
            {enrolling ? 'Enrolling...' : isEnrolled ? 'Enrolled' : 'Enroll'}
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            style={{
              background: '#181c23',
              color: '#fff',
              border: '2px solid #4f8cff',
              borderRadius: 6,
              padding: '0.7rem 0',
              fontWeight: 700,
              fontSize: '1.1rem',
              cursor: 'pointer',
              transition: 'background 0.2s',
              minWidth: 120,
              boxShadow: '0 1px 4px #0002',
              width: '100%',
            }}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </section>
  );
};

// Export the CourseDetail component so it can be used in routing
export default CourseDetail;
