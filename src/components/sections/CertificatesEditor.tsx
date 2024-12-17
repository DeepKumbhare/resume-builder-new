import React from 'react';
import { Plus } from 'lucide-react';
import { Certificate } from '../../types/resume';
import { useResumeStore } from '../../store/useResumeStore';
import { SectionTip } from '../common/SectionTip';

const CERTIFICATE_TIPS = {
  title: "Tips for Certificates Section",
  tips: [
    "List most relevant and recent certifications first",
    "Include expiration dates for time-sensitive certificates",
    "Add certification ID or verification link if available"
  ]
};

export function CertificatesEditor() {
  const { resumeData, setSection } = useResumeStore();
  const certificates = (resumeData.sections.certificates?.content || []) as Certificate[];

  const addCertificate = () => {
    const newCertificate: Certificate = {
      name: '',
      issuer: '',
      date: '',
      url: '',
      id: ''
    };
    setSection('certificates', [...certificates, newCertificate]);
  };

  const updateCertificate = (index: number, updated: Certificate) => {
    const newCertificates = [...certificates];
    newCertificates[index] = updated;
    setSection('certificates', newCertificates);
  };

  const removeCertificate = (index: number) => {
    setSection('certificates', certificates.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <SectionTip 
        title={CERTIFICATE_TIPS.title}
        tips={CERTIFICATE_TIPS.tips}
      />

      {certificates.map((cert, index) => (
        <div key={index} className="space-y-4 p-4 border border-gray-200 rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Certificate Name
              </label>
              <input
                type="text"
                value={cert.name}
                onChange={(e) => updateCertificate(index, { ...cert, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="AWS Solutions Architect"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Issuing Organization
              </label>
              <input
                type="text"
                value={cert.issuer}
                onChange={(e) => updateCertificate(index, { ...cert, issuer: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Amazon Web Services"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Issue Date
              </label>
              <input
                type="month"
                value={cert.date}
                onChange={(e) => updateCertificate(index, { ...cert, date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Certificate ID
              </label>
              <input
                type="text"
                value={cert.id}
                onChange={(e) => updateCertificate(index, { ...cert, id: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="ABC123XYZ"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Verification URL
            </label>
            <input
              type="url"
              value={cert.url}
              onChange={(e) => updateCertificate(index, { ...cert, url: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="https://verify.example.com/cert/123"
            />
          </div>

          <button
            onClick={() => removeCertificate(index)}
            className="text-red-600 hover:text-red-700 text-sm"
          >
            Remove Certificate
          </button>
        </div>
      ))}

      <button
        onClick={addCertificate}
        className="flex items-center space-x-2 text-sm text-indigo-600 hover:text-indigo-700"
      >
        <Plus className="w-4 h-4" />
        <span>Add Certificate</span>
      </button>
    </div>
  );
}