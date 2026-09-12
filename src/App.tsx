import React, { useState, useRef, useMemo } from 'react';
import type { SignatureData, TemplateId } from './types/signature';
import { DEFAULT_SIGNATURE_DATA } from './data/defaults';
import { generateSignatureHtml } from './utils/signatureGenerator';
import { Header } from './components/Header';
import { TemplateSelector } from './components/TemplateSelector';
import { DetailsFormGroup } from './components/Editor/DetailsFormGroup';
import { ImagesForm } from './components/Editor/ImagesForm';
import { SocialForm } from './components/Editor/SocialForm';
import { CtaDisclaimerForm } from './components/Editor/CtaDisclaimerForm';
import { StyleForm } from './components/Editor/StyleForm';
import { SignaturePreview } from './components/Preview/SignaturePreview';
import { ExportToolbar } from './components/ExportToolbar';
import { InstructionsModal } from './components/InstructionsModal';
import { ImportExportModal } from './components/ImportExportModal';
import { User, ImageIcon, Share2, Sliders, MousePointerClick } from 'lucide-react';
import './App.css';

type EditorTab = 'details' | 'images' | 'socials' | 'cta' | 'style';

export const App: React.FC = () => {
  const [data, setData] = useState<SignatureData>(DEFAULT_SIGNATURE_DATA);
  const [activeTab, setActiveTab] = useState<EditorTab>('details');
  const [instructionsOpen, setInstructionsOpen] = useState(false);
  const [importExportOpen, setImportExportOpen] = useState(false);

  const previewRef = useRef<HTMLDivElement | null>(null);

  // Generate Email-Safe HTML string based on current state
  const renderedHtml = useMemo(() => {
    return generateSignatureHtml(data);
  }, [data]);

  // Handlers for updating signature data
  const updatePersonal = (field: keyof SignatureData['personal'], value: string) => {
    setData((prev) => ({
      ...prev,
      personal: { ...prev.personal, [field]: value },
    }));
  };

  const updateCompany = (field: keyof SignatureData['company'], value: string) => {
    setData((prev) => ({
      ...prev,
      company: { ...prev.company, [field]: value },
    }));
  };

  const updateContact = (field: keyof SignatureData['contact'], value: string) => {
    setData((prev) => ({
      ...prev,
      contact: { ...prev.contact, [field]: value },
    }));
  };

  const updateImages = <K extends keyof SignatureData['images']>(
    field: K,
    value: SignatureData['images'][K]
  ) => {
    setData((prev) => ({
      ...prev,
      images: { ...prev.images, [field]: value },
    }));
  };

  const updateSocials = (field: keyof SignatureData['socials'], value: string) => {
    setData((prev) => ({
      ...prev,
      socials: { ...prev.socials, [field]: value },
    }));
  };

  const updateCta = <K extends keyof SignatureData['cta']>(
    field: K,
    value: SignatureData['cta'][K]
  ) => {
    setData((prev) => ({
      ...prev,
      cta: { ...prev.cta, [field]: value },
    }));
  };

  const updateDisclaimer = <K extends keyof SignatureData['disclaimer']>(
    field: K,
    value: SignatureData['disclaimer'][K]
  ) => {
    setData((prev) => ({
      ...prev,
      disclaimer: { ...prev.disclaimer, [field]: value },
    }));
  };

  const updateStyle = <K extends keyof SignatureData['style']>(
    field: K,
    value: SignatureData['style'][K]
  ) => {
    setData((prev) => ({
      ...prev,
      style: { ...prev.style, [field]: value },
    }));
  };

  const selectTemplate = (templateId: TemplateId) => {
    setData((prev) => ({
      ...prev,
      style: { ...prev.style, templateId },
    }));
  };

  const handleReset = () => {
    if (window.confirm('Reset all signature fields to empty values?')) {
      setData({
        personal: { fullName: '', jobTitle: '', department: '', pronouns: '' },
        company: { companyName: '', tagline: '', website: '', address: '', office: '' },
        contact: { email: '', phoneWork: '', phoneMobile: '' },
        images: {
          avatarUrl: '',
          avatarShape: 'circle',
          avatarSize: 80,
          logoUrl: '',
          logoWidth: 110,
          bannerUrl: '',
          bannerLink: '',
          bannerWidth: 380,
        },
        socials: {
          linkedin: '',
          twitter: '',
          github: '',
          instagram: '',
          facebook: '',
          youtube: '',
          whatsapp: '',
          calendly: '',
        },
        cta: {
          showCta: false,
          buttonText: 'Schedule a Call',
          buttonUrl: '',
          bgColor: '#0061A4',
          textColor: '#ffffff',
        },
        disclaimer: {
          showDisclaimer: false,
          text: '',
          showGreenEco: false,
        },
        style: {
          templateId: 'corporate',
          primaryColor: '#0061A4',
          secondaryColor: '#535F70',
          textColor: '#191C1E',
          mutedColor: '#73777F',
          fontFamily: 'Arial, Helvetica, sans-serif',
          fontSizeScale: 'normal',
          customFontScale: 100,
          socialIconSize: 18,
          contactIconSize: 13,
          iconStyle: 'colored',
        },
      });
    }
  };

  const handleLoadDemo = () => {
    setData(DEFAULT_SIGNATURE_DATA);
  };

  return (
    <div className="sig-app-layout">
      {/* Material You Atmospheric Background Blur Shapes */}
      <div className="bg-blur-container" aria-hidden="true">
        <div className="bg-blur-shape-1" />
        <div className="bg-blur-shape-2" />
        <div className="bg-blur-shape-3" />
      </div>
      {/* Sleek App Header */}
      <Header
        onReset={handleReset}
        onLoadDemo={handleLoadDemo}
        onOpenInstructions={() => setInstructionsOpen(true)}
        onOpenImportExport={() => setImportExportOpen(true)}
      />

      {/* Main Workspace */}
      <main className="main-workspace-container">
        <div className="workspace-split-layout">
          {/* LEFT COLUMN: Controls & Form Inputs */}
          <section className="editor-column">
            {/* Template Selection */}
            <TemplateSelector
              selectedId={data.style.templateId}
              onSelect={selectTemplate}
            />

            {/* Navigation Tabs */}
            <div className="editor-nav-bar">
              <button
                type="button"
                className={`tab-item-btn ${activeTab === 'details' ? 'is-active' : ''}`}
                onClick={() => setActiveTab('details')}
              >
                <User size={14} />
                <span>Details</span>
              </button>

              <button
                type="button"
                className={`tab-item-btn ${activeTab === 'images' ? 'is-active' : ''}`}
                onClick={() => setActiveTab('images')}
              >
                <ImageIcon size={14} />
                <span>Media</span>
              </button>

              <button
                type="button"
                className={`tab-item-btn ${activeTab === 'socials' ? 'is-active' : ''}`}
                onClick={() => setActiveTab('socials')}
              >
                <Share2 size={14} />
                <span>Socials</span>
              </button>

              <button
                type="button"
                className={`tab-item-btn ${activeTab === 'cta' ? 'is-active' : ''}`}
                onClick={() => setActiveTab('cta')}
              >
                <MousePointerClick size={14} />
                <span>Actions</span>
              </button>

              <button
                type="button"
                className={`tab-item-btn ${activeTab === 'style' ? 'is-active' : ''}`}
                onClick={() => setActiveTab('style')}
              >
                <Sliders size={14} />
                <span>Style</span>
              </button>
            </div>

            {/* Active Tab Panels */}
            <div className="tab-body-area">
              {activeTab === 'details' && (
                <DetailsFormGroup
                  data={data}
                  updatePersonal={updatePersonal}
                  updateCompany={updateCompany}
                  updateContact={updateContact}
                />
              )}

              {activeTab === 'images' && (
                <ImagesForm data={data.images} onChange={updateImages} />
              )}

              {activeTab === 'socials' && (
                <SocialForm data={data.socials} onChange={updateSocials} />
              )}

              {activeTab === 'cta' && (
                <CtaDisclaimerForm
                  cta={data.cta}
                  disclaimer={data.disclaimer}
                  onCtaChange={updateCta}
                  onDisclaimerChange={updateDisclaimer}
                />
              )}

              {activeTab === 'style' && (
                <StyleForm data={data.style} onChange={updateStyle} />
              )}
            </div>
          </section>

          {/* RIGHT COLUMN: Sticky Real-Time Preview & Export Toolbar */}
          <aside className="preview-column">
            <div className="sticky-preview-wrapper">
              <SignaturePreview
                data={data}
                renderedHtml={renderedHtml}
                previewRef={previewRef}
              />

              <ExportToolbar
                previewRef={previewRef}
                renderedHtml={renderedHtml}
                fullName={data.personal.fullName}
                onOpenInstructions={() => setInstructionsOpen(true)}
              />
            </div>
          </aside>
        </div>
      </main>

      {/* Modals */}
      <InstructionsModal
        isOpen={instructionsOpen}
        onClose={() => setInstructionsOpen(false)}
      />

      <ImportExportModal
        isOpen={importExportOpen}
        onClose={() => setImportExportOpen(false)}
        data={data}
        onImport={(imported) => setData(imported)}
      />
    </div>
  );
};

export default App;
