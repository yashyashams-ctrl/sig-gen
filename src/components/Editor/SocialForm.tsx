import React from 'react';
import type { SignatureData } from '../../types/signature';
import { Share2, AlertCircle } from 'lucide-react';
import { formatSocialUrl } from '../../utils/validation';

interface Props {
  data: SignatureData['socials'];
  onChange: (field: keyof SignatureData['socials'], value: string) => void;
}

const SOCIAL_ITEMS: {
  key: keyof SignatureData['socials'];
  label: string;
  icon: string;
  placeholder: string;
  errorHint: string;
}[] = [
  {
    key: 'linkedin',
    label: 'LinkedIn',
    icon: 'https://img.icons8.com/color/48/linkedin.png',
    placeholder: 'https://linkedin.com/in/johndoe',
    errorHint: 'Enter a valid link (e.g. linkedin.com/in/name)',
  },
  {
    key: 'twitter',
    label: 'X (Twitter)',
    icon: 'https://img.icons8.com/color/48/twitterx.png',
    placeholder: 'https://x.com/johndoe',
    errorHint: 'Enter a valid link (e.g. x.com/name)',
  },
  {
    key: 'github',
    label: 'GitHub',
    icon: 'https://img.icons8.com/color/48/github--v1.png',
    placeholder: 'https://github.com/johndoe',
    errorHint: 'Enter a valid link (e.g. github.com/name)',
  },
  {
    key: 'calendly',
    label: 'Meeting / Calendly',
    icon: 'https://img.icons8.com/color/48/calendar--v1.png',
    placeholder: 'https://calendly.com/johndoe',
    errorHint: 'Enter a valid link (e.g. calendly.com/name)',
  },
  {
    key: 'whatsapp',
    label: 'WhatsApp',
    icon: 'https://img.icons8.com/color/48/whatsapp--v1.png',
    placeholder: '+15559876543',
    errorHint: 'Enter phone number (+15551234567) or link',
  },
  {
    key: 'instagram',
    label: 'Instagram',
    icon: 'https://img.icons8.com/color/48/instagram-new.png',
    placeholder: 'https://instagram.com/johndoe',
    errorHint: 'Enter a valid link (e.g. instagram.com/name)',
  },
  {
    key: 'facebook',
    label: 'Facebook',
    icon: 'https://img.icons8.com/color/48/facebook-new.png',
    placeholder: 'https://facebook.com/johndoe',
    errorHint: 'Enter a valid link (e.g. facebook.com/name)',
  },
  {
    key: 'youtube',
    label: 'YouTube',
    icon: 'https://img.icons8.com/color/48/youtube-play.png',
    placeholder: 'https://youtube.com/@johndoe',
    errorHint: 'Enter a valid link (e.g. youtube.com/@name)',
  },
];

export const SocialForm: React.FC<Props> = ({ data, onChange }) => {
  return (
    <div className="section-card">
      <div className="card-header-row">
        <Share2 size={15} className="card-icon" />
        <span className="card-title">Social &amp; Professional Links</span>
      </div>

      <div className="form-grid-2col">
        {SOCIAL_ITEMS.map((item) => {
          const val = data[item.key] || '';
          const isInvalid = val.trim().length > 0 && formatSocialUrl(item.key, val) === null;

          return (
            <div key={item.key} className="form-group">
              <label htmlFor={item.key}>{item.label}</label>
              <div className="input-with-leading">
                <img
                  src={item.icon}
                  alt={item.label}
                  width="15"
                  height="15"
                  className="leading-icon"
                />
                <input
                  id={item.key}
                  type="text"
                  className={`text-input with-icon ${isInvalid ? 'is-invalid' : ''}`}
                  value={val}
                  onChange={(e) => onChange(item.key, e.target.value)}
                  placeholder={item.placeholder}
                  style={isInvalid ? { borderColor: 'var(--md-sys-color-error, #ba1a1a)' } : {}}
                />
              </div>
              {isInvalid && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontWidth: '500', fontSize: '11px', color: 'var(--md-sys-color-error, #ba1a1a)' }}>
                  <AlertCircle size={11} />
                  <span>{item.errorHint}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
