import React from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { getResumeLayout } from '../layouts';

export function ResumePreview() {
  const { resumeData } = useResumeStore();
  const Layout = getResumeLayout(resumeData.layout);

  // Filter out invisible sections
  const visibleData = {
    ...resumeData,
    sections: Object.values(resumeData.sections)
      .filter(section => section.enabled && section.visible)
      .sort((a, b) => a.order - b.order)
      .reduce((acc, section) => ({ ...acc, [section.id]: section }), {})
  };

  return (
    <div id="resume-preview">
      <Layout data={visibleData} />
    </div>
  );
}