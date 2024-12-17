import React from 'react';
import { RichTextEditor } from '../editor/RichTextEditor';
import { useResumeStore } from '../../store/useResumeStore';
import { SectionTip } from '../common/SectionTip';

const SUMMARY_TIPS = {
  title: "Tips for Writing a Strong Summary",
  tips: [
    "Keep it concise - aim for 3-4 impactful sentences",
    "Highlight your most relevant skills and achievements",
    "Tailor it to the job you're applying for"
  ]
};

export function SummaryEditor() {
  const { resumeData, setSection } = useResumeStore();
  const summary = resumeData.sections.summary?.content || '';

  return (
    <div className="space-y-4">
      <SectionTip 
        title={SUMMARY_TIPS.title}
        tips={SUMMARY_TIPS.tips}
      />
      
      <RichTextEditor
        content={summary}
        onChange={(value) => setSection('summary', value)}
        placeholder="Write a brief summary of your professional background and goals..."
      />
    </div>
  );
}