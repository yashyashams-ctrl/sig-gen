import React, { useState } from 'react';
import type { SignatureData } from '../types/signature';
import { X, Download, Upload, Copy, Check, FileJson } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data: SignatureData;
  onImport: (importedData: SignatureData) => void;
}

export const ImportExportModal: React.FC<Props> = ({
  isOpen,
  onClose,
  data,
  onImport,
}) => {
  const [jsonString, setJsonString] = useState(JSON.stringify(data, null, 2));
  const [copied, setCopied] = useState(false);
  const [importError, setImportError] = useState('');

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(data.personal.fullName || 'signature').toLowerCase().replace(/\s+/g, '-')}-profile.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleApplyImport = () => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed.personal || !parsed.style) {
        throw new Error('Invalid signature configuration format.');
      }
      onImport(parsed);
      setImportError('');
      onClose();
    } catch (err: any) {
      setImportError(err.message || 'Invalid JSON syntax.');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        setJsonString(text);
        const parsed = JSON.parse(text);
        onImport(parsed);
        setImportError('');
        onClose();
      } catch (err: any) {
        setImportError('Failed to parse uploaded JSON file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card import-export-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <FileJson size={20} className="text-accent" />
            <h3>Backup / Restore Signature Profile</h3>
          </div>
          <button type="button" className="btn-close-modal" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body-scroll">
          <p className="guide-lead">
            Save your signature settings or load team members' data quickly using JSON profiles.
          </p>

          <div className="import-export-actions">
            <button type="button" className="btn-outline-sm" onClick={handleDownload}>
              <Download size={14} /> Download JSON File
            </button>
            <button type="button" className="btn-outline-sm" onClick={handleCopy}>
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copied' : 'Copy JSON'}
            </button>
            <label className="btn-outline-sm cursor-pointer">
              <Upload size={14} /> Import File
              <input type="file" accept=".json" onChange={handleFileUpload} style={{ display: 'none' }} />
            </label>
          </div>

          <div className="json-textarea-wrap">
            <textarea
              rows={10}
              value={jsonString}
              onChange={(e) => setJsonString(e.target.value)}
              className="json-textarea"
              placeholder="Paste JSON profile configuration here..."
            />
          </div>

          {importError && <p className="text-danger error-msg">{importError}</p>}
        </div>

        <div className="modal-footer">
          <button type="button" className="btn-ghost-sm" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="btn-primary" onClick={handleApplyImport}>
            Apply Changes
          </button>
        </div>
      </div>
    </div>
  );
};
