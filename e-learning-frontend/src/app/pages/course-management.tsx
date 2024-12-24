// pages/course-management.tsx
import { useState, useEffect } from 'react';


interface Course {
  id: number;
  title: string;
  content: string;
  modules: string[];
  quizzes: string[];
  createdAt: string;
}

const CourseManagement = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [modules, setModules] = useState<string[]>([]);
  const [quizzes, setQuizzes] = useState<string[]>([]);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await axios.get('/api/courses');
      setCourses(response.data);
    };
    fetchCourses();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/courses', {
        title,
        content,
        modules,
        quizzes,
      });
      setCourses((prev) => [...prev, response.data]);
      setSuccess('Course created successfully!');
      setTitle('');
      setContent('');
      setModules([]);
      setQuizzes([]);
    } catch (err) {
      setSuccess('An error occurred while creating the course.');
    }
  };

  return (
    <div>
      <h1>Course Management</h1>

      <h2>Create a New Course</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Course Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        <input
          type="text"
          placeholder="Modules (comma separated)"
          onChange={(e) => setModules(e.target.value.split(','))}
        />
        <input
          type="text"
          placeholder="Quizzes (comma separated)"
          onChange={(e) => setQuizzes(e.target.value.split(','))}
        />
        <button type="submit">Create Course</button>
      </form>
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <h2>Existing Courses</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <h3>{course.title}</h3>
            <p>{course.content}</p>
            <p>Modules: {course.modules.join(', ')}</p>
            <p>Quizzes: {course.quizzes.join(', ')}</p>
            <p>Created At: {new Date(course.createdAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseManagement;
