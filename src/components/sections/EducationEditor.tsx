import React from 'react';
import { Plus } from 'lucide-react';
import { Education } from '../../types/resume';
import { useResumeStore } from '../../store/useResumeStore';
import { SectionTip } from '../common/SectionTip';

const EDUCATION_TIPS = {
  title: "Tips for Education Section",
  tips: [
    "List degrees in reverse chronological order",
    "Include relevant coursework and academic achievements",
    "Add GPA if it's above 3.5 (optional)"
  ]
};

export function EducationEditor() {
  const { resumeData, setSection } = useResumeStore();
  const education = (resumeData.sections.education?.content || []) as Education[];

  const addEducation = () => {
    const newEducation: Education = {
      school: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
      location: '',
      achievements: ''
    };
    setSection('education', [...education, newEducation]);
  };

  const updateEducation = (index: number, updated: Education) => {
    const newEducation = [...education];
    newEducation[index] = updated;
    setSection('education', newEducation);
  };

  const removeEducation = (index: number) => {
    setSection('education', education.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <SectionTip 
        title={EDUCATION_TIPS.title}
        tips={EDUCATION_TIPS.tips}
      />

      {education.map((edu, index) => (
        <div key={index} className="space-y-4 p-4 border border-gray-200 rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                School
              </label>
              <input
                type="text"
                value={edu.school}
                onChange={(e) => updateEducation(index, { ...edu, school: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="University Name"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Degree
              </label>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => updateEducation(index, { ...edu, degree: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Bachelor's, Master's, etc."
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Field of Study
              </label>
              <input
                type="text"
                value={edu.field}
                onChange={(e) => updateEducation(index, { ...edu, field: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Computer Science"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                GPA (Optional)
              </label>
              <input
                type="text"
                value={edu.gpa}
                onChange={(e) => updateEducation(index, { ...edu, gpa: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="3.8"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <input
                type="month"
                value={edu.startDate}
                onChange={(e) => updateEducation(index, { ...edu, startDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <input
                type="month"
                value={edu.endDate}
                onChange={(e) => updateEducation(index, { ...edu, endDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              value={edu.location}
              onChange={(e) => updateEducation(index, { ...edu, location: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="City, Country"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Achievements (Optional)
            </label>
            <textarea
              value={edu.achievements}
              onChange={(e) => updateEducation(index, { ...edu, achievements: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Dean's List, Academic Awards, etc."
              rows={3}
            />
          </div>

          <button
            onClick={() => removeEducation(index)}
            className="text-red-600 hover:text-red-700 text-sm"
          >
            Remove Education
          </button>
        </div>
      ))}

      <button
        onClick={addEducation}
        className="flex items-center space-x-2 text-sm text-indigo-600 hover:text-indigo-700"
      >
        <Plus className="w-4 h-4" />
        <span>Add Education</span>
      </button>
    </div>
  );
}