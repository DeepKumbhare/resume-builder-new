import React, { useState } from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { ContactInfo } from '../../types/resume';
import { User, Mail, Phone, MapPin, Linkedin, Globe, Link2, X, Plus } from 'lucide-react';

export function ContactEditor() {
  const { resumeData, setSection } = useResumeStore();
  const contact = resumeData.sections.contact.content as ContactInfo;
  const [newFieldName, setNewFieldName] = useState('');
  const [isAddingField, setIsAddingField] = useState(false);

  const handleChange = (field: keyof ContactInfo | string, value: string) => {
    if (field in contact) {
      setSection('contact', { ...contact, [field]: value });
    } else {
      // Handle custom fields
      setSection('contact', {
        ...contact,
        customFields: {
          ...(contact.customFields || {}),
          [field]: value,
        },
      });
    }
  };

  const handleAddField = () => {
    if (!newFieldName.trim()) return;
    
    handleChange(newFieldName.trim(), '');
    setNewFieldName('');
    setIsAddingField(false);
  };

  const handleRemoveField = (fieldName: string) => {
    const { [fieldName]: removed, ...remainingFields } = contact.customFields || {};
    setSection('contact', {
      ...contact,
      customFields: remainingFields,
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <User className="w-4 h-4 mr-2" />
            Full Name
          </label>
          <input
            type="text"
            value={contact.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="John Doe"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <Mail className="w-4 h-4 mr-2" />
            Email
          </label>
          <input
            type="email"
            value={contact.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="john@example.com"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <Phone className="w-4 h-4 mr-2" />
            Phone
          </label>
          <input
            type="tel"
            value={contact.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <MapPin className="w-4 h-4 mr-2" />
            Location
          </label>
          <input
            type="text"
            value={contact.location}
            onChange={(e) => handleChange('location', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="City, State"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <Linkedin className="w-4 h-4 mr-2" />
            LinkedIn (optional)
          </label>
          <input
            type="url"
            value={contact.linkedin || ''}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="https://linkedin.com/in/johndoe"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <Globe className="w-4 h-4 mr-2" />
            Website (optional)
          </label>
          <input
            type="url"
            value={contact.website || ''}
            onChange={(e) => handleChange('website', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="https://johndoe.com"
          />
        </div>

        {/* Custom Fields */}
        {Object.entries(contact.customFields || {}).map(([fieldName, value]) => (
          <div key={fieldName} className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Link2 className="w-4 h-4 mr-2" />
                {fieldName}
              </label>
              <button
                onClick={() => handleRemoveField(fieldName)}
                className="text-red-500 hover:text-red-700"
                title="Remove field"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <input
              type="text"
              value={value}
              onChange={(e) => handleChange(fieldName, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder={`Enter your ${fieldName}`}
            />
          </div>
        ))}

        {/* Add Custom Field Button */}
        {isAddingField ? (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={newFieldName}
                onChange={(e) => setNewFieldName(e.target.value)}
                placeholder="Enter field name"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button
                onClick={handleAddField}
                className="px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                Add
              </button>
              <button
                onClick={() => {
                  setIsAddingField(false);
                  setNewFieldName('');
                }}
                className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsAddingField(true)}
            className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-300 rounded-md hover:bg-gray-100"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Custom Field
          </button>
        )}
      </div>
    </div>
  );
}