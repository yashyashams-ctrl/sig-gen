import React, { useState } from 'react';
import { X, HelpCircle, Laptop, Smartphone, Globe, Mail } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

type GuideTab = 'outlook-win' | 'outlook-web' | 'gmail-web' | 'outlook-mac' | 'mobile';

export const InstructionsModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<GuideTab>('outlook-win');

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-wrap">
            <HelpCircle size={20} className="text-accent" />
            <h3>How to Install Your Signature in Outlook & Gmail</h3>
          </div>
          <button type="button" className="btn-close-modal" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Client Tabs */}
        <div className="modal-tabs">
          <button
            type="button"
            className={`modal-tab-btn ${activeTab === 'outlook-win' ? 'active' : ''}`}
            onClick={() => setActiveTab('outlook-win')}
          >
            <Laptop size={15} />
            <span>Outlook Windows</span>
          </button>
          <button
            type="button"
            className={`modal-tab-btn ${activeTab === 'outlook-web' ? 'active' : ''}`}
            onClick={() => setActiveTab('outlook-web')}
          >
            <Globe size={15} />
            <span>Outlook Web / 365</span>
          </button>
          <button
            type="button"
            className={`modal-tab-btn ${activeTab === 'gmail-web' ? 'active' : ''}`}
            onClick={() => setActiveTab('gmail-web')}
          >
            <Mail size={15} />
            <span>Gmail Desktop</span>
          </button>
          <button
            type="button"
            className={`modal-tab-btn ${activeTab === 'outlook-mac' ? 'active' : ''}`}
            onClick={() => setActiveTab('outlook-mac')}
          >
            <Laptop size={15} />
            <span>Outlook Mac</span>
          </button>
          <button
            type="button"
            className={`modal-tab-btn ${activeTab === 'mobile' ? 'active' : ''}`}
            onClick={() => setActiveTab('mobile')}
          >
            <Smartphone size={15} />
            <span>Mobile (iOS / Android)</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="modal-body-scroll">
          {/* 1. Outlook Windows */}
          {activeTab === 'outlook-win' && (
            <div className="guide-content">
              <h4>Installing in Microsoft Outlook Desktop (Windows)</h4>
              <p className="guide-lead">
                Method 1 is standard and takes 30 seconds. Method 2 is the secret IT power-user trick using the direct Signatures folder.
              </p>

              <div className="step-card">
                <div className="step-badge">Method 1 (Standard)</div>
                <ol className="steps-list">
                  <li>
                    Click <strong>"Copy Signature (for Outlook & Gmail)"</strong> in SigGen.
                  </li>
                  <li>
                    In Outlook, click <strong>File</strong> &gt; <strong>Options</strong> &gt; <strong>Mail</strong>.
                  </li>
                  <li>
                    Click the <strong>"Signatures..."</strong> button.
                  </li>
                  <li>
                    Click <strong>New</strong>, type a name (e.g., <em>Professional Sig</em>), and select it.
                  </li>
                  <li>
                    Click inside the large signature edit box below and press <kbd>Ctrl</kbd> + <kbd>V</kbd> to paste.
                  </li>
                  <li>
                    Under <em>"Choose default signature"</em>, assign it to <strong>New messages</strong> and <strong>Replies/forwards</strong>.
                  </li>
                  <li>Click <strong>OK</strong> to save!</li>
                </ol>
              </div>

              <div className="step-card alt-method">
                <div className="step-badge">Method 2 (Direct Folder - 100% Exact HTML)</div>
                <ol className="steps-list">
                  <li>
                    Click <strong>"Download .html"</strong> in SigGen and save as <code>MySignature.htm</code>.
                  </li>
                  <li>
                    Press <kbd>Win</kbd> + <kbd>R</kbd>, paste <code>%appdata%\Microsoft\Signatures</code> and hit <strong>Enter</strong>.
                  </li>
                  <li>
                    Paste the downloaded <code>.htm</code> file directly into this folder.
                  </li>
                  <li>
                    Restart Outlook. The signature will instantly show in your Outlook signature dropdown!
                  </li>
                </ol>
              </div>
            </div>
          )}

          {/* 2. Outlook Web */}
          {activeTab === 'outlook-web' && (
            <div className="guide-content">
              <h4>Installing in Outlook Web / Microsoft 365</h4>
              <ol className="steps-list">
                <li>
                  Click <strong>"Copy Signature (for Outlook & Gmail)"</strong> in SigGen.
                </li>
                <li>
                  Go to <a href="https://outlook.office.com" target="_blank" rel="noreferrer">outlook.office.com</a> or <a href="https://outlook.live.com" target="_blank" rel="noreferrer">outlook.live.com</a>.
                </li>
                <li>
                  Click the <strong>Settings (gear icon)</strong> in the top-right corner.
                </li>
                <li>
                  Navigate to <strong>Mail</strong> &gt; <strong>Compose and reply</strong>.
                </li>
                <li>
                  Under <em>Email signature</em>, click <strong>+ New signature</strong>.
                </li>
                <li>
                  Click in the text editor area and press <kbd>Ctrl</kbd> + <kbd>V</kbd> (or <kbd>Cmd</kbd> + <kbd>V</kbd> on Mac).
                </li>
                <li>
                  Set the default signature for new messages and replies, then click <strong>Save</strong>.
                </li>
              </ol>
            </div>
          )}

          {/* 3. Gmail Web */}
          {activeTab === 'gmail-web' && (
            <div className="guide-content">
              <h4>Installing in Google Workspace / Gmail Desktop</h4>
              <ol className="steps-list">
                <li>
                  Click <strong>"Copy Signature (for Outlook & Gmail)"</strong> in SigGen.
                </li>
                <li>
                  In Gmail, click the <strong>Gear icon</strong> (top-right) and click <strong>"See all settings"</strong>.
                </li>
                <li>
                  Stay on the <strong>General</strong> tab and scroll down to the <strong>Signature</strong> section.
                </li>
                <li>
                  Click <strong>+ Create new</strong>, name your signature, and click <em>Create</em>.
                </li>
                <li>
                  Click inside the signature text area on the right and press <kbd>Ctrl</kbd> + <kbd>V</kbd> (or <kbd>Cmd</kbd> + <kbd>V</kbd>).
                </li>
                <li>
                  Under <em>"Signature defaults"</em>, set your new signature for <strong>For new emails use</strong> and <strong>On reply/forward use</strong>.
                </li>
                <li>
                  Scroll all the way down to the bottom and click <strong>"Save Changes"</strong>!
                </li>
              </ol>
            </div>
          )}

          {/* 4. Outlook Mac */}
          {activeTab === 'outlook-mac' && (
            <div className="guide-content">
              <h4>Installing in Microsoft Outlook for Mac</h4>
              <ol className="steps-list">
                <li>
                  Click <strong>"Copy Signature (for Outlook & Gmail)"</strong> in SigGen.
                </li>
                <li>
                  In Outlook for Mac, click the <strong>Outlook</strong> menu (top-left) &gt; <strong>Settings...</strong> (or Preferences).
                </li>
                <li>
                  Click <strong>Signatures</strong> under <em>Email</em>.
                </li>
                <li>
                  Click the <strong>+</strong> button to create a new signature.
                </li>
                <li>
                  Click in the signature preview box and press <kbd>Cmd</kbd> + <kbd>V</kbd> to paste.
                </li>
                <li>
                  Assign the signature to your email account under <em>Choose default signature</em> and close the window to save.
                </li>
              </ol>
            </div>
          )}

          {/* 5. Mobile (iOS / Android) */}
          {activeTab === 'mobile' && (
            <div className="guide-content">
              <h4>Installing on Mobile (Gmail App &amp; Outlook App on iOS/Android)</h4>
              <p className="guide-lead">
                Mobile email apps have simplified signature boxes that don't support rich HTML pasting directly.
                Here is the verified 1-minute workaround used by all email professionals:
              </p>

              <div className="step-card">
                <div className="step-badge">The Foolproof "Draft Email" Technique</div>
                <ol className="steps-list">
                  <li>
                    On your desktop, open a new email compose window in Gmail or Outlook.
                  </li>
                  <li>
                    Insert your new signature into the body of this empty email.
                  </li>
                  <li>
                    Send this email to yourself (or save it as a Draft).
                  </li>
                  <li>
                    Open the email on your phone in the Outlook or Gmail app.
                  </li>
                  <li>
                    Select the signature block with your finger, tap <strong>Copy</strong>.
                  </li>
                  <li>
                    Go to app <strong>Settings</strong> &gt; <strong>Signature</strong> &gt; paste the formatted block. Done!
                  </li>
                </ol>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button type="button" className="btn-primary" onClick={onClose}>
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
};
