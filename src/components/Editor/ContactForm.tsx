import React from 'react';
import type { SignatureData } from '../../types/signature';
import { AtSign } from 'lucide-react';

interface Props {
  data: SignatureData['contact'];
  onChange: (field: keyof SignatureData['contact'], value: string) => void;
}

export const ContactForm: React.FC<Props> = ({ data, onChange }) => {
  return (
    <div className="section-card">
      <div className="card-header-row">
        <AtSign size={15} className="card-icon" />
        <span className="card-title">Contact Information</span>
      </div>

      <div className="form-grid-2col">
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            className="text-input"
            value={data.email}
            onChange={(e) => onChange('email', e.target.value)}
            placeholder="e.g. john.doe@example.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phoneWork">Office Phone</label>
          <input
            id="phoneWork"
            type="tel"
            className="text-input"
            value={data.phoneWork}
            onChange={(e) => onChange('phoneWork', e.target.value)}
            placeholder="e.g. +1 (555) 123-4567"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phoneMobile">Mobile Phone</label>
          <input
            id="phoneMobile"
            type="tel"
            className="text-input"
            value={data.phoneMobile}
            onChange={(e) => onChange('phoneMobile', e.target.value)}
            placeholder="e.g. +1 (555) 987-6543"
          />
        </div>
      </div>
    </div>
  );
};
