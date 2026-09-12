import React from 'react';
import { TEMPLATES } from '../data/defaults';
import type { TemplateId } from '../types/signature';
import { LayoutGrid, Check } from 'lucide-react';

interface Props {
  selectedId: TemplateId;
  onSelect: (id: TemplateId) => void;
}

export const TemplateSelector: React.FC<Props> = ({ selectedId, onSelect }) => {
  return (
    <div className="section-card template-selector-box">
      <div className="section-header-compact">
        <div className="section-title-wrap">
          <LayoutGrid size={15} className="title-icon" />
          <span className="section-heading">Signature Layout</span>
        </div>
        <span className="count-label">{TEMPLATES.length} templates</span>
      </div>

      <div className="template-cards-grid">
        {TEMPLATES.map((tpl) => {
          const isSelected = tpl.id === selectedId;
          return (
            <button
              key={tpl.id}
              type="button"
              className={`template-item-card ${isSelected ? 'is-selected' : ''}`}
              onClick={() => onSelect(tpl.id)}
            >
              <div className="template-item-top">
                <span className="template-item-name">{tpl.name}</span>
                {isSelected && (
                  <span className="selected-indicator">
                    <Check size={11} strokeWidth={2.5} />
                  </span>
                )}
              </div>
              <p className="template-item-desc">{tpl.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
