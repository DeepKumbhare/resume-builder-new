import React from 'react';
import { Plus } from 'lucide-react';
import { Experience } from '../../types/resume';
import { RichTextEditor } from '../editor/RichTextEditor';
import { useResumeStore } from '../../store/useResumeStore';

export function ExperienceEditor() {
  const { resumeData, setSection } = useResumeStore();
  const experiences = (resumeData.sections.experience?.content || []) as Experience[];

  const updateExperiences = (updatedExperiences: Experience[]) => {
    setSection('experience', updatedExperiences);
  };

  const addExperience = () => {
    const newExperience: Experience = {
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      responsibilities: ''
    };
    updateExperiences([...experiences, newExperience]);
  };

  const updateExperience = (index: number, updated: Experience) => {
    const newExperiences = [...experiences];
    newExperiences[index] = updated;
    updateExperiences(newExperiences);
  };

  const removeExperience = (index: number) => {
    updateExperiences(experiences.filter((_, i) => i !== index));
  };

  const handleCurrentChange = (index: number, checked: boolean) => {
    const currentDate = new Date().toISOString().slice(0, 7); // Format: YYYY-MM
    const updated = { ...experiences[index] };
    updated.current = checked;
    if (checked) {
      updated.endDate = currentDate;
    }
    updateExperience(index, updated);
  };

  return (
    <div className="space-y-4">
      {experiences.map((experience, index) => (
        <div key={index} className="space-y-4 p-4 border border-gray-200 rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Job Title
              </label>
              <input
                type="text"
                value={experience.title}
                onChange={(e) => updateExperience(index, { ...experience, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Software Engineer"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Company Name
              </label>
              <input
                type="text"
                value={experience.company}
                onChange={(e) => updateExperience(index, { ...experience, company: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Company Inc."
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
                value={experience.startDate}
                onChange={(e) => updateExperience(index, { ...experience, startDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="month"
                  value={experience.endDate}
                  onChange={(e) => updateExperience(index, { ...experience, endDate: e.target.value })}
                  disabled={experience.current}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
                />
                <label className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    checked={experience.current}
                    onChange={(e) => handleCurrentChange(index, e.target.checked)}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>Current</span>
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              value={experience.location}
              onChange={(e) => updateExperience(index, { ...experience, location: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="City, Country"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Key Responsibilities
            </label>
            <RichTextEditor
              content={experience.responsibilities}
              onChange={(value) => updateExperience(index, { ...experience, responsibilities: value })}
              placeholder="Describe your key responsibilities and achievements..."
            />
          </div>

          <button
            onClick={() => removeExperience(index)}
            className="text-red-600 hover:text-red-700 text-sm"
          >
            Remove Experience
          </button>
        </div>
      ))}
      
      <button
        onClick={addExperience}
        className="flex items-center space-x-2 text-sm text-indigo-600 hover:text-indigo-700"
      >
        <Plus className="w-4 h-4" />
        <span>Add Experience</span>
      </button>
    </div>
  );
}