"use client";

import React, { useState } from "react";
import Head from "next/head";

const CourseManagement: React.FC = () => {
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate backend integration
    // Replace this section with actual backend API call
    /*
    const formData = new FormData();
    formData.append("courseName", courseName);
    formData.append("courseDescription", courseDescription);
    if (file) formData.append("file", file);

    fetch('/api/update-course', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log("Course updated successfully:", data);
      })
      .catch(error => console.error('Error:', error));
    */

    console.log("Form submitted with:", { courseName, courseDescription, file });
  };

  return (
    <>
      <Head>
        <title>Update Course</title>
        <meta name="description" content="Edit and update course content" />
      </Head>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Update Course</h1>
        <form className="bg-white shadow-md rounded-lg w-96 p-6" onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label htmlFor="courseName" className="block text-gray-700 font-medium mb-2">
              Course Name
            </label>
            <input
              type="text"
              id="courseName"
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter course name"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="courseDescription" className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              id="courseDescription"
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter course description"
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="courseContent" className="block text-gray-700 font-medium mb-2">
              Upload Content
            </label>
            <input
              type="file"
              id="courseContent"
              className="w-full"
              onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">
            Update Course
          </button>
        </form>
      </div>
    </>
  );
};

export default CourseManagement;
