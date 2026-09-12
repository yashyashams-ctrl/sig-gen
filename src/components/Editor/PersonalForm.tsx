import React from 'react';
import type { SignatureData } from '../../types/signature';
import { User } from 'lucide-react';

interface Props {
  data: SignatureData['personal'];
  onChange: (field: keyof SignatureData['personal'], value: string) => void;
}

export const PersonalForm: React.FC<Props> = ({ data, onChange }) => {
  return (
    <div className="section-card">
      <div className="card-header-row">
        <User size={15} className="card-icon" />
        <span className="card-title">Personal Information</span>
      </div>

      <div className="form-grid-2col">
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            type="text"
            className="text-input"
            value={data.fullName}
            onChange={(e) => onChange('fullName', e.target.value)}
            placeholder="e.g. John Doe"
          />
        </div>

        <div className="form-group">
          <label htmlFor="jobTitle">Job Title</label>
          <input
            id="jobTitle"
            type="text"
            className="text-input"
            value={data.jobTitle}
            onChange={(e) => onChange('jobTitle', e.target.value)}
            placeholder="e.g. Product Manager"
          />
        </div>

        <div className="form-group">
          <label htmlFor="department">Department</label>
          <input
            id="department"
            type="text"
            className="text-input"
            value={data.department}
            onChange={(e) => onChange('department', e.target.value)}
            placeholder="e.g. Operations"
          />
        </div>

        <div className="form-group">
          <label htmlFor="pronouns">Pronouns (Optional)</label>
          <input
            id="pronouns"
            type="text"
            className="text-input"
            value={data.pronouns}
            onChange={(e) => onChange('pronouns', e.target.value)}
            placeholder="e.g. he/him"
          />
        </div>
      </div>
    </div>
  );
};
