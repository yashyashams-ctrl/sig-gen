import React, { useState, useRef } from 'react';
import type { SignatureData } from '../../types/signature';
import { PersonalForm } from './PersonalForm';
import { CompanyForm } from './CompanyForm';
import { ContactForm } from './ContactForm';
import { ChevronLeft, ChevronRight, User, Building2, AtSign } from 'lucide-react';

interface Props {
  data: SignatureData;
  updatePersonal: (field: keyof SignatureData['personal'], value: string) => void;
  updateCompany: (field: keyof SignatureData['company'], value: string) => void;
  updateContact: (field: keyof SignatureData['contact'], value: string) => void;
}

type DetailSubTab = 'personal' | 'company' | 'contact';

export const DetailsFormGroup: React.FC<Props> = ({
  data,
  updatePersonal,
  updateCompany,
  updateContact,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<DetailSubTab>('personal');
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const tabsList: { id: DetailSubTab; label: string; icon: React.ReactNode }[] = [
    { id: 'personal', label: 'Personal Info', icon: <User size={13} /> },
    { id: 'company', label: 'Company & Location', icon: <Building2 size={13} /> },
    { id: 'contact', label: 'Contact Info', icon: <AtSign size={13} /> },
  ];

  const currentIndex = tabsList.findIndex((t) => t.id === activeSubTab);

  const goToPrev = () => {
    if (currentIndex > 0) {
      setActiveSubTab(tabsList[currentIndex - 1].id);
    }
  };

  const goToNext = () => {
    if (currentIndex < tabsList.length - 1) {
      setActiveSubTab(tabsList[currentIndex + 1].id);
    }
  };

  // Touch Swipe Handlers for mobile & trackpad
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 40;

    if (diff > minSwipeDistance) {
      // Swiped Left -> Go Next
      goToNext();
    } else if (diff < -minSwipeDistance) {
      // Swiped Right -> Go Prev
      goToPrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div className="details-carousel-wrapper">
      {/* Horizontal Subtab Navigation Pills */}
      <div className="details-subtab-header">
        <div className="subtab-pills-row">
          {tabsList.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`details-subtab-btn ${activeSubTab === t.id ? 'is-active' : ''}`}
              onClick={() => setActiveSubTab(t.id)}
            >
              {t.icon}
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        {/* Prev / Next Controls */}
        <div className="carousel-nav-controls">
          <button
            type="button"
            className="carousel-arrow-btn"
            onClick={goToPrev}
            disabled={currentIndex === 0}
            title="Previous Card"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="step-dots-indicator">
            {tabsList.map((t, idx) => (
              <span
                key={t.id}
                className={`step-dot ${idx === currentIndex ? 'is-active' : ''}`}
                onClick={() => setActiveSubTab(t.id)}
              />
            ))}
          </span>
          <button
            type="button"
            className="carousel-arrow-btn"
            onClick={goToNext}
            disabled={currentIndex === tabsList.length - 1}
            title="Next Card"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Swipeable Active Card Container */}
      <div
        className="swipeable-card-container"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="carousel-slider-track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          <div className="carousel-slide-item">
            <PersonalForm data={data.personal} onChange={updatePersonal} />
          </div>

          <div className="carousel-slide-item">
            <CompanyForm data={data.company} onChange={updateCompany} />
          </div>

          <div className="carousel-slide-item">
            <ContactForm data={data.contact} onChange={updateContact} />
          </div>
        </div>
      </div>
    </div>
  );
};
