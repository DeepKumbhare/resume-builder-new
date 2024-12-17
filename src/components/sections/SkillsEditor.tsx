import React from 'react';
import { Plus } from 'lucide-react';
import { useResumeStore } from '../../store/useResumeStore';
import { SectionTip } from '../common/SectionTip';

const SKILLS_TIPS = {
  title: "Tips for Showcasing Skills",
  tips: [
    "List both technical and soft skills relevant to the role",
    "Group similar skills together (e.g., Programming Languages, Tools)",
    "Include proficiency levels for language skills"
  ]
};

export function SkillsEditor() {
  const { resumeData, setSection } = useResumeStore();
  const skills = (resumeData.sections.skills?.content || []) as string[];

  const addSkill = () => {
    setSection('skills', [...skills, '']);
  };

  const updateSkill = (index: number, value: string) => {
    const newSkills = [...skills];
    newSkills[index] = value;
    setSection('skills', newSkills);
  };

  const removeSkill = (index: number) => {
    setSection('skills', skills.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <SectionTip 
        title={SKILLS_TIPS.title}
        tips={SKILLS_TIPS.tips}
      />

      {skills.map((skill, index) => (
        <div key={index} className="flex items-center gap-2">
          <input
            type="text"
            value={skill}
            onChange={(e) => updateSkill(index, e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter a skill..."
          />
          <button
            onClick={() => removeSkill(index)}
            className="text-red-600 hover:text-red-700 text-sm"
          >
            Remove
          </button>
        </div>
      ))}

      <button
        onClick={addSkill}
        className="flex items-center space-x-2 text-sm text-indigo-600 hover:text-indigo-700"
      >
        <Plus className="w-4 h-4" />
        <span>Add Skill</span>
      </button>
    </div>
  );
}