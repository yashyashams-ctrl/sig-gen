import React from 'react';
import type { SignatureData, FontSizeScale, IconStyle } from '../../types/signature';
import { COLOR_PRESETS, FONT_OPTIONS } from '../../data/defaults';
import { Sliders } from 'lucide-react';

interface Props {
  data: SignatureData['style'];
  onChange: <K extends keyof SignatureData['style']>(field: K, value: SignatureData['style'][K]) => void;
}

export const StyleForm: React.FC<Props> = ({ data, onChange }) => {
  return (
    <div className="section-card">
      <div className="card-header-row">
        <Sliders size={15} className="card-icon" />
        <span className="card-title">Typography &amp; Colors</span>
      </div>

      {/* Preset Swatches */}
      <div className="form-group">
        <label>Brand Themes</label>
        <div className="clean-palette-grid">
          {COLOR_PRESETS.map((preset) => {
            const isMatch = data.primaryColor === preset.primary;
            return (
              <button
                key={preset.name}
                type="button"
                className={`clean-swatch-btn ${isMatch ? 'is-active' : ''}`}
                onClick={() => {
                  onChange('primaryColor', preset.primary);
                  onChange('secondaryColor', preset.secondary);
                }}
              >
                <span className="swatch-bubble" style={{ backgroundColor: preset.primary }} />
                <span className="swatch-label">{preset.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom Color Values */}
      <div className="form-grid-2col" style={{ marginTop: '14px' }}>
        <div className="form-group">
          <label htmlFor="primaryColor">Primary Accent</label>
          <div className="color-field-wrap">
            <input
              id="primaryColor"
              type="color"
              value={data.primaryColor}
              onChange={(e) => onChange('primaryColor', e.target.value)}
              className="color-picker-box"
            />
            <input
              type="text"
              value={data.primaryColor}
              onChange={(e) => onChange('primaryColor', e.target.value)}
              className="text-input hex-input"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="secondaryColor">Secondary Accent</label>
          <div className="color-field-wrap">
            <input
              id="secondaryColor"
              type="color"
              value={data.secondaryColor}
              onChange={(e) => onChange('secondaryColor', e.target.value)}
              className="color-picker-box"
            />
            <input
              type="text"
              value={data.secondaryColor}
              onChange={(e) => onChange('secondaryColor', e.target.value)}
              className="text-input hex-input"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="textColor">Body Text</label>
          <div className="color-field-wrap">
            <input
              id="textColor"
              type="color"
              value={data.textColor}
              onChange={(e) => onChange('textColor', e.target.value)}
              className="color-picker-box"
            />
            <input
              type="text"
              value={data.textColor}
              onChange={(e) => onChange('textColor', e.target.value)}
              className="text-input hex-input"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="mutedColor">Muted Text</label>
          <div className="color-field-wrap">
            <input
              id="mutedColor"
              type="color"
              value={data.mutedColor}
              onChange={(e) => onChange('mutedColor', e.target.value)}
              className="color-picker-box"
            />
            <input
              type="text"
              value={data.mutedColor}
              onChange={(e) => onChange('mutedColor', e.target.value)}
              className="text-input hex-input"
            />
          </div>
        </div>
      </div>

      <div className="subtle-divider" />

      {/* Font Family Selection */}
      <div className="form-group full-span">
        <label htmlFor="fontFamily">Email-Safe Font</label>
        <select
          id="fontFamily"
          value={data.fontFamily}
          onChange={(e) => onChange('fontFamily', e.target.value)}
          className="clean-select-input"
        >
          {FONT_OPTIONS.map((f) => (
            <option key={f.name} value={f.value}>
              {f.name}
            </option>
          ))}
        </select>
      </div>

      {/* Font Size & Icon Style */}
      <div className="form-grid-2col" style={{ marginTop: '14px' }}>
        <div className="form-group">
          <label>Font Scale</label>
          <div className="segmented-toggle">
            {(['compact', 'normal', 'large'] as FontSizeScale[]).map((scale) => (
              <button
                key={scale}
                type="button"
                className={`toggle-option ${data.fontSizeScale === scale ? 'is-selected' : ''}`}
                onClick={() => onChange('fontSizeScale', scale)}
              >
                {scale.charAt(0).toUpperCase() + scale.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Icon Style</label>
          <div className="segmented-toggle">
            {(['colored', 'dark', 'brand'] as IconStyle[]).map((style) => (
              <button
                key={style}
                type="button"
                className={`toggle-option ${data.iconStyle === style ? 'is-selected' : ''}`}
                onClick={() => onChange('iconStyle', style)}
              >
                {style === 'colored' ? 'Color' : style === 'dark' ? 'Dark' : 'Brand'}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
