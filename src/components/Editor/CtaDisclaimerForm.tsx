import React from 'react';
import type { SignatureData } from '../../types/signature';
import { MousePointerClick } from 'lucide-react';

interface Props {
  cta: SignatureData['cta'];
  disclaimer: SignatureData['disclaimer'];
  onCtaChange: <K extends keyof SignatureData['cta']>(field: K, value: SignatureData['cta'][K]) => void;
  onDisclaimerChange: <K extends keyof SignatureData['disclaimer']>(field: K, value: SignatureData['disclaimer'][K]) => void;
}

export const CtaDisclaimerForm: React.FC<Props> = ({
  cta,
  disclaimer,
  onCtaChange,
  onDisclaimerChange,
}) => {
  return (
    <div className="section-card">
      <div className="card-header-row">
        <MousePointerClick size={15} className="card-icon" />
        <span className="card-title">Call to Action &amp; Disclaimers</span>
      </div>

      {/* CTA Button Block */}
      <div className="nested-option-block">
        <div className="option-row">
          <div className="option-meta">
            <span className="option-title">Call to Action Button</span>
            <span className="option-desc">Add a styled action button to schedule meetings or view collateral.</span>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={cta.showCta}
              onChange={(e) => onCtaChange('showCta', e.target.checked)}
            />
            <span className="toggle-slider" />
          </label>
        </div>

        {cta.showCta && (
          <div className="form-grid-2col" style={{ marginTop: '14px' }}>
            <div className="form-group">
              <label htmlFor="ctaButtonText">Button Text</label>
              <input
                id="ctaButtonText"
                type="text"
                className="text-input"
                value={cta.buttonText}
                onChange={(e) => onCtaChange('buttonText', e.target.value)}
                placeholder="e.g. 📅 Schedule a Meeting"
              />
            </div>

            <div className="form-group">
              <label htmlFor="ctaButtonUrl">Destination URL</label>
              <input
                id="ctaButtonUrl"
                type="text"
                className="text-input"
                value={cta.buttonUrl}
                onChange={(e) => onCtaChange('buttonUrl', e.target.value)}
                placeholder="e.g. https://calendly.com/johndoe"
              />
            </div>

            <div className="form-group">
              <label htmlFor="ctaBgColor">Button Color</label>
              <div className="color-field-wrap">
                <input
                  id="ctaBgColor"
                  type="color"
                  value={cta.bgColor}
                  onChange={(e) => onCtaChange('bgColor', e.target.value)}
                  className="color-picker-box"
                />
                <span className="color-val-label">{cta.bgColor}</span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="ctaTextColor">Text Color</label>
              <div className="color-field-wrap">
                <input
                  id="ctaTextColor"
                  type="color"
                  value={cta.textColor}
                  onChange={(e) => onCtaChange('textColor', e.target.value)}
                  className="color-picker-box"
                />
                <span className="color-val-label">{cta.textColor}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="subtle-divider" />

      {/* Disclaimers Block */}
      <div className="nested-option-block">
        <div className="option-row">
          <div className="option-meta">
            <span className="option-title">Environmental Printing Notice</span>
            <span className="option-desc">"Please consider the environment before printing this email."</span>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={disclaimer.showGreenEco}
              onChange={(e) => onDisclaimerChange('showGreenEco', e.target.checked)}
            />
            <span className="toggle-slider" />
          </label>
        </div>

        <div className="option-row" style={{ marginTop: '16px' }}>
          <div className="option-meta">
            <span className="option-title">Confidentiality Notice</span>
            <span className="option-desc">Corporate disclaimer regarding privileged communications.</span>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={disclaimer.showDisclaimer}
              onChange={(e) => onDisclaimerChange('showDisclaimer', e.target.checked)}
            />
            <span className="toggle-slider" />
          </label>
        </div>

        {disclaimer.showDisclaimer && (
          <div className="form-group full-span" style={{ marginTop: '12px' }}>
            <label htmlFor="disclaimerText">Notice Content</label>
            <textarea
              id="disclaimerText"
              rows={3}
              className="text-input textarea-field"
              value={disclaimer.text}
              onChange={(e) => onDisclaimerChange('text', e.target.value)}
              placeholder="Enter corporate confidentiality disclaimer..."
            />
          </div>
        )}
      </div>
    </div>
  );
};
