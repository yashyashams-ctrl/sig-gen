import React, { useState } from 'react';
import { copyRichSignature, copyRawHtml, downloadHtmlFile } from '../utils/clipboard';
import { Copy, Code, Download, ExternalLink, HelpCircle, Check } from 'lucide-react';

interface Props {
  previewRef: React.RefObject<HTMLDivElement | null>;
  renderedHtml: string;
  fullName: string;
  onOpenInstructions: () => void;
}

export const ExportToolbar: React.FC<Props> = ({
  previewRef,
  renderedHtml,
  fullName,
  onOpenInstructions,
}) => {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'rich-copied' | 'code-copied'>('idle');

  const handleCopyRich = async () => {
    const success = await copyRichSignature(previewRef.current, renderedHtml);
    if (success) {
      setCopyStatus('rich-copied');
      setTimeout(() => setCopyStatus('idle'), 3000);
    }
  };

  const handleCopyCode = async () => {
    const success = await copyRawHtml(renderedHtml);
    if (success) {
      setCopyStatus('code-copied');
      setTimeout(() => setCopyStatus('idle'), 3000);
    }
  };

  const handleDownload = () => {
    const safeName = (fullName || 'signature').toLowerCase().replace(/[^a-z0-9]/g, '-');
    downloadHtmlFile(`${safeName}-signature.html`, renderedHtml);
  };

  const handleOpenRawTab = () => {
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Signature Preview</title>
          </head>
          <body style="margin: 40px; font-family: Arial, sans-serif; background-color: #f8fafc;">
            <div style="max-width: 600px; margin: 0 auto; background: #ffffff; padding: 30px; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); border: 1px solid #e2e8f0;">
              ${renderedHtml}
            </div>
          </body>
        </html>
      `);
      newWindow.document.close();
    }
  };

  return (
    <div className="section-card export-actions-card">
      {/* Primary Action */}
      <button
        type="button"
        className={`solid-action-btn ${copyStatus === 'rich-copied' ? 'is-success' : ''}`}
        onClick={handleCopyRich}
        id="copy-signature-btn"
      >
        {copyStatus === 'rich-copied' ? (
          <>
            <Check size={16} strokeWidth={2.5} />
            <span>Copied to Clipboard (Ready to Paste)</span>
          </>
        ) : (
          <>
            <Copy size={16} />
            <span>Copy Signature for Outlook / Gmail</span>
          </>
        )}
      </button>

      {/* Secondary Actions */}
      <div className="auxiliary-actions-grid">
        <button
          type="button"
          className="aux-btn"
          onClick={handleCopyCode}
          title="Copy raw HTML source code"
        >
          {copyStatus === 'code-copied' ? <Check size={13} /> : <Code size={13} />}
          <span>{copyStatus === 'code-copied' ? 'HTML Copied' : 'Copy HTML'}</span>
        </button>

        <button
          type="button"
          className="aux-btn"
          onClick={handleDownload}
          title="Download HTML file"
        >
          <Download size={13} />
          <span>Download .html</span>
        </button>

        <button
          type="button"
          className="aux-btn"
          onClick={handleOpenRawTab}
          title="Open isolated raw HTML in new tab"
        >
          <ExternalLink size={13} />
          <span>New Tab</span>
        </button>
      </div>

      {/* Helper guide link */}
      <div className="guide-prompt-strip">
        <span className="guide-prompt-text">Need help pasting into Outlook or Gmail settings?</span>
        <button
          type="button"
          className="guide-link-btn"
          onClick={onOpenInstructions}
        >
          <HelpCircle size={13} />
          <span>Setup Guide</span>
        </button>
      </div>

      {/* Toast Notification */}
      {copyStatus === 'rich-copied' && (
        <div className="floating-toast">
          <Check size={14} className="toast-icon-success" />
          <span className="toast-text">
            Signature copied as rich HTML. Open your email settings and press <kbd>Ctrl+V</kbd> or <kbd>Cmd+V</kbd>.
          </span>
        </div>
      )}
    </div>
  );
};
