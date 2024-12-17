import React from 'react';
import { Experience as ExperienceType } from '../../../types/resume';
import { formatDate } from '../../../utils/date';
import { useTheme } from '../../../contexts/ThemeContext';
import parse from 'html-react-parser';

interface ExperienceProps {
  experiences: ExperienceType[];
}

export function Experience({ experiences }: ExperienceProps) {
  const { theme } = useTheme();
  if (!experiences?.length) return null;

  return (
    <section className="space-y-4">
      <h2 
        className="text-xl font-bold border-b-2 pb-1"
        style={{ 
          color: theme.colors.primary,
          borderColor: theme.colors.primary 
        }}
      >
        Experience
      </h2>

      <div className="space-y-6">
        {experiences.map((experience, idx) => (
          <div key={idx} className="grid grid-cols-[1fr_auto] gap-4">
            <div>
              <div className="font-bold text-gray-900">{experience.company}</div>
              <div className="text-sm text-gray-700">{experience.title}</div>
              {experience.location && (
                <div className="text-sm text-gray-600">{experience.location}</div>
              )}
              {experience.responsibilities && (
                <div 
                  className="mt-2 text-sm text-gray-700 [&_ul]:list-disc [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:ml-4 [&_li]:ml-1 [&_p]:mb-1 prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: experience.responsibilities }}
                />
              )}
            </div>
            <div className="text-sm text-gray-600 text-right whitespace-nowrap">
              {formatDate(experience.startDate)} - {experience.current ? 'Present' : formatDate(experience.endDate)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}