import React, { useState } from 'react';
import type { SignatureData } from '../../types/signature';
import { Monitor, Smartphone, Sun, Moon, ZoomIn, ZoomOut } from 'lucide-react';

interface Props {
  data: SignatureData;
  renderedHtml: string;
  previewRef: React.RefObject<HTMLDivElement | null>;
}

export const SignaturePreview: React.FC<Props> = ({
  data,
  renderedHtml,
  previewRef,
}) => {
  const [viewport, setViewport] = useState<'desktop' | 'mobile'>('desktop');
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  return (
    <div className="preview-card-frame">
      {/* Sleek Toolbar */}
      <div className="preview-toolbar-row">
        <div className="preview-label-group">
          <span className="live-indicator-dot" />
          <span className="preview-title">Live Email Preview</span>
        </div>

        <div className="preview-controls-right">
          {/* Viewport toggle */}
          <div className="clean-segmented-bar">
            <button
              type="button"
              className={`segmented-bar-btn ${viewport === 'desktop' ? 'is-active' : ''}`}
              onClick={() => setViewport('desktop')}
              title="Desktop Outlook / Gmail View"
            >
              <Monitor size={13} />
              <span>Desktop</span>
            </button>
            <button
              type="button"
              className={`segmented-bar-btn ${viewport === 'mobile' ? 'is-active' : ''}`}
              onClick={() => setViewport('mobile')}
              title="Mobile Smartphone View"
            >
              <Smartphone size={13} />
              <span>Mobile</span>
            </button>
          </div>

          {/* Theme mode toggle */}
          <div className="clean-segmented-bar">
            <button
              type="button"
              className={`segmented-bar-btn icon-only ${themeMode === 'light' ? 'is-active' : ''}`}
              onClick={() => setThemeMode('light')}
              title="Light Background"
            >
              <Sun size={13} />
            </button>
            <button
              type="button"
              className={`segmented-bar-btn icon-only ${themeMode === 'dark' ? 'is-active' : ''}`}
              onClick={() => setThemeMode('dark')}
              title="Dark Background Simulation"
            >
              <Moon size={13} />
            </button>
          </div>

          {/* Zoom controls */}
          <div className="clean-zoom-bar">
            <button
              type="button"
              className="zoom-action-btn"
              onClick={() => setZoomLevel((z) => Math.max(z - 10, 80))}
              disabled={zoomLevel <= 80}
            >
              <ZoomOut size={12} />
            </button>
            <span className="zoom-value">{zoomLevel}%</span>
            <button
              type="button"
              className="zoom-action-btn"
              onClick={() => setZoomLevel((z) => Math.min(z + 10, 130))}
              disabled={zoomLevel >= 130}
            >
              <ZoomIn size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* Canvas Area */}
      <div className={`canvas-viewport-wrap theme-${themeMode}`}>
        {viewport === 'desktop' ? (
          /* Desktop Compose Window Simulation */
          <div
            className="clean-email-window"
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
          >
            {/* Window header */}
            <div className="window-chrome-bar">
              <div className="window-dots">
                <span className="dot dot-close" />
                <span className="dot dot-min" />
                <span className="dot dot-max" />
              </div>
              <span className="window-title-label">
                {data.company.companyName ? `${data.company.companyName} — New Message` : 'New Message'}
              </span>
              <div style={{ width: 40 }} />
            </div>

            {/* Email Meta fields */}
            <div className="email-meta-strip">
              <div className="meta-row">
                <span className="meta-key">To:</span>
                <span className="meta-val">client-team@organization.com</span>
              </div>
              <div className="meta-row">
                <span className="meta-key">Subject:</span>
                <span className="meta-val subject-bold">Proposal &amp; Project Overview</span>
              </div>
            </div>

            {/* Email Body & Signature */}
            <div className="email-canvas-body">
              <p className="body-greeting">Hi Jordan,</p>
              <p className="body-paragraph">
                Thank you for the productive call this morning. Please find the finalized scope and documentation attached for review.
              </p>
              <p className="body-signoff">Best regards,</p>

              {/* RENDERED SIGNATURE */}
              <div
                ref={previewRef}
                className="signature-mount-point"
                dangerouslySetInnerHTML={{ __html: renderedHtml }}
              />
            </div>
          </div>
        ) : (
          /* Mobile Viewport Simulation */
          <div
            className="clean-phone-frame"
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
          >
            <div className="phone-notch-island">
              <span className="phone-clock">9:41</span>
              <div className="phone-sensor-pill" />
              <div className="phone-status-icons" />
            </div>

            <div className="phone-mail-header">
              <span className="phone-back-link">‹ Mailbox</span>
              <span className="phone-subject">Proposal &amp; Overview</span>
              <span className="phone-action-icon" />
            </div>

            <div className="phone-mail-scroll">
              <div className="phone-sender-row">
                <div className="phone-avatar-mini">
                  {data.personal.fullName.charAt(0) || 'A'}
                </div>
                <div className="phone-sender-meta">
                  <span className="phone-name">{data.personal.fullName}</span>
                  <span className="phone-date">Today at 10:24 AM</span>
                </div>
              </div>

              <p className="phone-body-snippet">
                Please find the finalized scope and documentation attached for review.
              </p>

              {/* RENDERED SIGNATURE IN PHONE */}
              <div
                className="signature-mount-point mobile-fit"
                dangerouslySetInnerHTML={{ __html: renderedHtml }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Technical Compatibility Footer */}
      <div className="preview-tech-footer">
        <div className="tech-specs-list">
          <span className="tech-spec-badge">MSO Table Engine</span>
          <span className="tech-spec-badge">Retina Bicubic Downscaling</span>
          <span className="tech-spec-badge">100% Inline CSS</span>
          <span className="tech-spec-badge">Fixed Dimension Caps</span>
        </div>
      </div>
    </div>
  );
};
