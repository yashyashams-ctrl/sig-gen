import React from 'react';
import { Mail, RotateCcw, HelpCircle, FileJson, Sparkles } from 'lucide-react';

interface Props {
  onReset: () => void;
  onLoadDemo: () => void;
  onOpenInstructions: () => void;
  onOpenImportExport: () => void;
}

export const Header: React.FC<Props> = ({
  onReset,
  onLoadDemo,
  onOpenInstructions,
  onOpenImportExport,
}) => {
  return (
    <header className="app-header">
      <div className="header-container">
        {/* Brand */}
        <div className="header-brand">
          <div className="brand-logo-mark">
            <Mail size={18} strokeWidth={2.2} />
          </div>
          <div className="brand-text-block">
            <div className="brand-title-wrap">
              <span className="brand-name">SigGen</span>
              <span className="brand-pill">Outlook &amp; Gmail</span>
            </div>
            <span className="brand-tagline">Email Signature Engine</span>
          </div>
        </div>

        {/* Actions */}
        <div className="header-actions">
          <button
            type="button"
            className="nav-action-btn"
            onClick={onLoadDemo}
            title="Populate with sample business data"
          >
            <Sparkles size={13} />
            <span>Load Sample</span>
          </button>

          <button
            type="button"
            className="nav-action-btn"
            onClick={onReset}
            title="Reset all fields"
          >
            <RotateCcw size={13} />
            <span>Clear</span>
          </button>

          <button
            type="button"
            className="nav-action-btn"
            onClick={onOpenImportExport}
            title="Import or export signature JSON profile"
          >
            <FileJson size={13} />
            <span>Profiles</span>
          </button>

          <div className="nav-divider" />

          <button
            type="button"
            className="nav-action-btn primary-nav-btn"
            onClick={onOpenInstructions}
          >
            <HelpCircle size={13} />
            <span>Setup Guide</span>
          </button>
        </div>
      </div>
    </header>
  );
};
