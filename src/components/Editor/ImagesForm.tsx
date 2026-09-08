import React, { useRef, useState } from 'react';
import type { SignatureData, AvatarShape } from '../../types/signature';
import { PRESET_AVATARS, PRESET_LOGOS, PRESET_BANNERS } from '../../data/defaults';
import { ImageIcon, Upload, Trash2 } from 'lucide-react';

interface Props {
  data: SignatureData['images'];
  onChange: <K extends keyof SignatureData['images']>(field: K, value: SignatureData['images'][K]) => void;
}

export const ImagesForm: React.FC<Props> = ({ data, onChange }) => {
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<'avatar' | 'logo' | 'banner'>('avatar');
  const [isProcessing, setIsProcessing] = useState(false);

  // Crops image into a genuine round PNG with transparent background
  // Solves Outlook Desktop's lack of CSS border-radius support
  const processImageToCircle = (imgSource: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new window.Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const size = Math.min(img.width, img.height);
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(imgSource);
          return;
        }

        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();

        const offsetX = (img.width - size) / 2;
        const offsetY = (img.height - size) / 2;
        ctx.drawImage(img, offsetX, offsetY, size, size, 0, 0, size, size);

        resolve(canvas.toDataURL('image/png'));
      };
      img.onerror = () => resolve(imgSource);
      img.src = imgSource;
    });
  };

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'avatarUrl' | 'logoUrl' | 'bannerUrl',
    autoCircle = false
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    const reader = new FileReader();
    reader.onload = async (event) => {
      const result = event.target?.result as string;
      if (autoCircle && field === 'avatarUrl' && data.avatarShape === 'circle') {
        const circular = await processImageToCircle(result);
        onChange(field, circular);
      } else {
        onChange(field, result);
      }
      setIsProcessing(false);
    };
    reader.readAsDataURL(file);
  };

  const handleShapeChange = async (shape: AvatarShape) => {
    onChange('avatarShape', shape);
    if (shape === 'circle' && data.avatarUrl && data.avatarUrl.startsWith('data:image')) {
      setIsProcessing(true);
      const circular = await processImageToCircle(data.avatarUrl);
      onChange('avatarUrl', circular);
      setIsProcessing(false);
    }
  };

  return (
    <div className="section-card">
      <div className="card-header-row">
        <ImageIcon size={15} className="card-icon" />
        <span className="card-title">Imagery &amp; Media</span>
      </div>

      {/* Clean segmented tab control */}
      <div className="clean-subtabs">
        <button
          type="button"
          className={`subtab-pill ${activeTab === 'avatar' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('avatar')}
        >
          Profile Photo
        </button>
        <button
          type="button"
          className={`subtab-pill ${activeTab === 'logo' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('logo')}
        >
          Company Logo
        </button>
        <button
          type="button"
          className={`subtab-pill ${activeTab === 'banner' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('banner')}
        >
          Promo Banner
        </button>
      </div>

      {/* AVATAR PANEL */}
      {activeTab === 'avatar' && (
        <div className="media-panel-body">
          <div className="media-preview-row">
            <div className={`media-thumb-box shape-${data.avatarShape}`}>
              {data.avatarUrl ? (
                <img
                  src={data.avatarUrl}
                  alt="Avatar"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <span className="empty-text">No photo</span>
              )}
            </div>

            <div className="media-inputs-col">
              <input
                type="text"
                className="text-input"
                value={data.avatarUrl}
                onChange={(e) => onChange('avatarUrl', e.target.value)}
                placeholder="Paste image URL (https://...)"
              />

              <div className="media-actions-row">
                <input
                  type="file"
                  ref={avatarInputRef}
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => handleFileUpload(e, 'avatarUrl', true)}
                />
                <button
                  type="button"
                  className="secondary-btn-sm"
                  onClick={() => avatarInputRef.current?.click()}
                  disabled={isProcessing}
                >
                  <Upload size={12} />
                  <span>{isProcessing ? 'Processing...' : 'Upload File'}</span>
                </button>

                {data.avatarUrl && (
                  <button
                    type="button"
                    className="danger-btn-sm"
                    onClick={() => onChange('avatarUrl', '')}
                  >
                    <Trash2 size={12} />
                    <span>Remove</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="form-grid-2col" style={{ marginTop: '16px' }}>
            <div className="form-group">
              <label>Crop Shape</label>
              <div className="segmented-toggle">
                <button
                  type="button"
                  className={`toggle-option ${data.avatarShape === 'circle' ? 'is-selected' : ''}`}
                  onClick={() => handleShapeChange('circle')}
                >
                  Circle
                </button>
                <button
                  type="button"
                  className={`toggle-option ${data.avatarShape === 'rounded' ? 'is-selected' : ''}`}
                  onClick={() => handleShapeChange('rounded')}
                >
                  Rounded
                </button>
                <button
                  type="button"
                  className={`toggle-option ${data.avatarShape === 'square' ? 'is-selected' : ''}`}
                  onClick={() => handleShapeChange('square')}
                >
                  Square
                </button>
              </div>
            </div>

            <div className="form-group">
              <div className="label-with-value">
                <label htmlFor="avatarSizeSlider">Render Size</label>
                <span className="val-text">{data.avatarSize}px</span>
              </div>
              <input
                id="avatarSizeSlider"
                type="range"
                min="55"
                max="115"
                step="5"
                value={data.avatarSize}
                onChange={(e) => onChange('avatarSize', Number(e.target.value))}
                className="clean-range-slider"
              />
            </div>
          </div>

          <div className="quick-presets-strip">
            <span className="presets-caption">Presets:</span>
            {PRESET_AVATARS.map((p) => (
              <button
                key={p.label}
                type="button"
                className="preset-tag"
                onClick={() => onChange('avatarUrl', p.url)}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* LOGO PANEL */}
      {activeTab === 'logo' && (
        <div className="media-panel-body">
          <div className="media-preview-row">
            <div className="media-thumb-box logo-frame">
              {data.logoUrl ? (
                <img
                  src={data.logoUrl}
                  alt="Company Logo"
                  style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                />
              ) : (
                <span className="empty-text">No logo</span>
              )}
            </div>

            <div className="media-inputs-col">
              <input
                type="text"
                className="text-input"
                value={data.logoUrl}
                onChange={(e) => onChange('logoUrl', e.target.value)}
                placeholder="Paste logo URL (https://...)"
              />

              <div className="media-actions-row">
                <input
                  type="file"
                  ref={logoInputRef}
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => handleFileUpload(e, 'logoUrl')}
                />
                <button
                  type="button"
                  className="secondary-btn-sm"
                  onClick={() => logoInputRef.current?.click()}
                >
                  <Upload size={12} />
                  <span>Upload File</span>
                </button>

                {data.logoUrl && (
                  <button
                    type="button"
                    className="danger-btn-sm"
                    onClick={() => onChange('logoUrl', '')}
                  >
                    <Trash2 size={12} />
                    <span>Remove</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="form-group" style={{ marginTop: '16px' }}>
            <div className="label-with-value">
              <label htmlFor="logoWidthSlider">Max Logo Width</label>
              <span className="val-text">{data.logoWidth}px</span>
            </div>
            <input
              id="logoWidthSlider"
              type="range"
              min="70"
              max="180"
              step="5"
              value={data.logoWidth}
              onChange={(e) => onChange('logoWidth', Number(e.target.value))}
              className="clean-range-slider"
            />
          </div>

          <div className="quick-presets-strip">
            <span className="presets-caption">Presets:</span>
            {PRESET_LOGOS.map((p) => (
              <button
                key={p.label}
                type="button"
                className="preset-tag"
                onClick={() => onChange('logoUrl', p.url)}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* BANNER PANEL */}
      {activeTab === 'banner' && (
        <div className="media-panel-body">
          <div className="media-preview-row">
            <div className="media-thumb-box banner-frame">
              {data.bannerUrl ? (
                <img
                  src={data.bannerUrl}
                  alt="Banner"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }}
                />
              ) : (
                <span className="empty-text">No banner</span>
              )}
            </div>

            <div className="media-inputs-col">
              <input
                type="text"
                className="text-input"
                value={data.bannerUrl}
                onChange={(e) => onChange('bannerUrl', e.target.value)}
                placeholder="Banner graphic URL (https://...)"
              />

              <div className="media-actions-row">
                <input
                  type="file"
                  ref={bannerInputRef}
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => handleFileUpload(e, 'bannerUrl')}
                />
                <button
                  type="button"
                  className="secondary-btn-sm"
                  onClick={() => bannerInputRef.current?.click()}
                >
                  <Upload size={12} />
                  <span>Upload File</span>
                </button>

                {data.bannerUrl && (
                  <button
                    type="button"
                    className="danger-btn-sm"
                    onClick={() => onChange('bannerUrl', '')}
                  >
                    <Trash2 size={12} />
                    <span>Remove</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="form-group" style={{ marginTop: '16px' }}>
            <label htmlFor="bannerLinkInput">Target URL</label>
            <input
              id="bannerLinkInput"
              type="text"
              className="text-input"
              value={data.bannerLink}
              onChange={(e) => onChange('bannerLink', e.target.value)}
              placeholder="https://yourcompany.com/conference"
            />
          </div>

          <div className="form-group" style={{ marginTop: '12px' }}>
            <div className="label-with-value">
              <label htmlFor="bannerWidthSlider">Banner Width</label>
              <span className="val-text">{data.bannerWidth}px</span>
            </div>
            <input
              id="bannerWidthSlider"
              type="range"
              min="280"
              max="480"
              step="10"
              value={data.bannerWidth}
              onChange={(e) => onChange('bannerWidth', Number(e.target.value))}
              className="clean-range-slider"
            />
          </div>

          <div className="quick-presets-strip">
            <span className="presets-caption">Presets:</span>
            {PRESET_BANNERS.map((p) => (
              <button
                key={p.label}
                type="button"
                className="preset-tag"
                onClick={() => {
                  onChange('bannerUrl', p.url);
                  onChange('bannerLink', p.link);
                }}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
