import React from 'react';
import type { SignatureData } from '../../types/signature';
import { Share2 } from 'lucide-react';

interface Props {
  data: SignatureData['socials'];
  onChange: (field: keyof SignatureData['socials'], value: string) => void;
}

const SOCIAL_ITEMS: {
  key: keyof SignatureData['socials'];
  label: string;
  icon: string;
  placeholder: string;
}[] = [
  {
    key: 'linkedin',
    label: 'LinkedIn',
    icon: 'https://img.icons8.com/color/48/linkedin.png',
    placeholder: 'https://linkedin.com/in/johndoe',
  },
  {
    key: 'twitter',
    label: 'X (Twitter)',
    icon: 'https://img.icons8.com/color/48/twitterx.png',
    placeholder: 'https://x.com/johndoe',
  },
  {
    key: 'github',
    label: 'GitHub',
    icon: 'https://img.icons8.com/color/48/github--v1.png',
    placeholder: 'https://github.com/johndoe',
  },
  {
    key: 'calendly',
    label: 'Meeting / Calendly',
    icon: 'https://img.icons8.com/color/48/calendar--v1.png',
    placeholder: 'https://calendly.com/johndoe',
  },
  {
    key: 'whatsapp',
    label: 'WhatsApp',
    icon: 'https://img.icons8.com/color/48/whatsapp--v1.png',
    placeholder: '+15559876543',
  },
  {
    key: 'instagram',
    label: 'Instagram',
    icon: 'https://img.icons8.com/color/48/instagram-new.png',
    placeholder: 'https://instagram.com/johndoe',
  },
  {
    key: 'facebook',
    label: 'Facebook',
    icon: 'https://img.icons8.com/color/48/facebook-new.png',
    placeholder: 'https://facebook.com/johndoe',
  },
  {
    key: 'youtube',
    label: 'YouTube',
    icon: 'https://img.icons8.com/color/48/youtube-play.png',
    placeholder: 'https://youtube.com/@johndoe',
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
        {SOCIAL_ITEMS.map((item) => (
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
                className="text-input with-icon"
                value={data[item.key]}
                onChange={(e) => onChange(item.key, e.target.value)}
                placeholder={item.placeholder}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
