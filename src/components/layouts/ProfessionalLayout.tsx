import React from 'react';
import { ResumeData } from '../../types/resume';
import { Header } from '../preview/sections/Header';
import { Summary } from '../preview/sections/Summary';
import { Experience } from '../preview/sections/Experience';
import { Education } from '../preview/sections/Education';
import { Skills } from '../preview/sections/Skills';
import { Certifications } from '../preview/sections/Certifications';

type ProfessionalLayoutProps = {
  data: ResumeData;
};

export function ProfessionalLayout({ data }: ProfessionalLayoutProps) {
  const sections = Object.values(data.sections)
    .filter(section => section.enabled)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="max-w-[816px] mx-auto bg-white p-8 shadow-sm space-y-6">
      <Header />
      
      <div className="grid grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="col-span-2 space-y-6">
          {sections.map((section) => {
            switch (section.id) {
              case 'summary':
                return <Summary key={section.id} content={section.content} />;
              case 'experience':
                return <Experience key={section.id} experiences={section.content} />;
              case 'education':
                return <Education key={section.id} education={section.content} />;
              default:
                if (section.isCustom) {
                  return (
                    <section key={section.id} className="space-y-2">
                      <h2 className="text-xl font-bold text-[#0A4B8F] border-b-2 border-[#0A4B8F] pb-1">
                        {section.title}
                      </h2>
                      <div className="text-sm text-gray-700 whitespace-pre-wrap">
                        {section.content}
                      </div>
                    </section>
                  );
                }
                return null;
            }
          })}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {sections.map((section) => {
            switch (section.id) {
              case 'skills':
                return <Skills key={section.id} skills={section.content} />;
              case 'certificates':
                return <Certifications key={section.id} certificates={section.content} />;
              default:
                return null;
            }
          })}
        </div>
      </div>
    </div>
  );
}