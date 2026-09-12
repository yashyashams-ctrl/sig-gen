import React from 'react';
import type { SignatureData } from '../../types/signature';
import { Building2 } from 'lucide-react';

interface Props {
  data: SignatureData['company'];
  onChange: (field: keyof SignatureData['company'], value: string) => void;
}

export const CompanyForm: React.FC<Props> = ({ data, onChange }) => {
  return (
    <div className="section-card">
      <div className="card-header-row">
        <Building2 size={15} className="card-icon" />
        <span className="card-title">Company &amp; Location</span>
      </div>

      <div className="form-grid-2col">
        <div className="form-group">
          <label htmlFor="companyName">Company Name</label>
          <input
            id="companyName"
            type="text"
            className="text-input"
            value={data.companyName}
            onChange={(e) => onChange('companyName', e.target.value)}
            placeholder="e.g. FAXOLIF Industries"
          />
        </div>

        <div className="form-group">
          <label htmlFor="tagline">Tagline / Mission</label>
          <input
            id="tagline"
            type="text"
            className="text-input"
            value={data.tagline}
            onChange={(e) => onChange('tagline', e.target.value)}
            placeholder="e.g. Leading Industrial Solutions"
          />
        </div>

        <div className="form-group">
          <label htmlFor="website">Website URL</label>
          <input
            id="website"
            type="text"
            className="text-input"
            value={data.website}
            onChange={(e) => onChange('website', e.target.value)}
            placeholder="e.g. https://faxolif.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="office">Suite / Floor</label>
          <input
            id="office"
            type="text"
            className="text-input"
            value={data.office}
            onChange={(e) => onChange('office', e.target.value)}
            placeholder="e.g. Building A"
          />
        </div>

        <div className="form-group full-span">
          <label htmlFor="address">Physical Address</label>
          <input
            id="address"
            type="text"
            className="text-input"
            value={data.address}
            onChange={(e) => onChange('address', e.target.value)}
            placeholder="e.g. 100 Industrial Parkway, Suite 400"
          />
        </div>
      </div>
    </div>
  );
};
