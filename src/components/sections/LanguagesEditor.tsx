import React from 'react';
import { Plus } from 'lucide-react';
import { Language } from '../../types/resume';
import { useResumeStore } from '../../store/useResumeStore';
import { SectionTip } from '../common/SectionTip';

const LANGUAGE_TIPS = {
  title: "Tips for Language Section",
  tips: [
    "Specify proficiency level (e.g., Native, Fluent, Intermediate)",
    "Include certifications if available (e.g., TOEFL, IELTS)",
    "List languages in order of proficiency"
  ]
};

export function LanguagesEditor() {
  const { resumeData, setSection } = useResumeStore();
  const languages = (resumeData.sections.languages?.content || []) as Language[];

  const addLanguage = () => {
    const newLanguage: Language = {
      name: '',
      proficiency: '',
      certification: ''
    };
    setSection('languages', [...languages, newLanguage]);
  };

  const updateLanguage = (index: number, updated: Language) => {
    const newLanguages = [...languages];
    newLanguages[index] = updated;
    setSection('languages', newLanguages);
  };

  const removeLanguage = (index: number) => {
    setSection('languages', languages.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <SectionTip 
        title={LANGUAGE_TIPS.title}
        tips={LANGUAGE_TIPS.tips}
      />

      {languages.map((lang, index) => (
        <div key={index} className="space-y-4 p-4 border border-gray-200 rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Language
              </label>
              <input
                type="text"
                value={lang.name}
                onChange={(e) => updateLanguage(index, { ...lang, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="English"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Proficiency Level
              </label>
              <select
                value={lang.proficiency}
                onChange={(e) => updateLanguage(index, { ...lang, proficiency: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select Level</option>
                <option value="Native">Native</option>
                <option value="Fluent">Fluent</option>
                <option value="Advanced">Advanced</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Basic">Basic</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Certification (Optional)
            </label>
            <input
              type="text"
              value={lang.certification}
              onChange={(e) => updateLanguage(index, { ...lang, certification: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="TOEFL: 110/120"
            />
          </div>

          <button
            onClick={() => removeLanguage(index)}
            className="text-red-600 hover:text-red-700 text-sm"
          >
            Remove Language
          </button>
        </div>
      ))}

      <button
        onClick={addLanguage}
        className="flex items-center space-x-2 text-sm text-indigo-600 hover:text-indigo-700"
      >
        <Plus className="w-4 h-4" />
        <span>Add Language</span>
      </button>
    </div>
  );
}