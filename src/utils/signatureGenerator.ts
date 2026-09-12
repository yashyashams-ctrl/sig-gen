import type { SignatureData, FontSizeScale, IconStyle } from '../types/signature';

// High-DPI Crystal Clear Icons from Reliable CDN
const ICONS = {
  colored: {
    linkedin: 'https://img.icons8.com/color/48/linkedin.png',
    twitter: 'https://img.icons8.com/color/48/twitterx.png',
    github: 'https://img.icons8.com/color/48/github--v1.png',
    instagram: 'https://img.icons8.com/color/48/instagram-new.png',
    facebook: 'https://img.icons8.com/color/48/facebook-new.png',
    youtube: 'https://img.icons8.com/color/48/youtube-play.png',
    whatsapp: 'https://img.icons8.com/color/48/whatsapp--v1.png',
    calendly: 'https://img.icons8.com/color/48/calendar--v1.png',
    phone: 'https://img.icons8.com/color/48/phone--v1.png',
    mobile: 'https://img.icons8.com/color/48/cell-phone.png',
    email: 'https://img.icons8.com/color/48/email--v1.png',
    website: 'https://img.icons8.com/color/48/domain--v1.png',
    marker: 'https://img.icons8.com/color/48/marker--v1.png',
  },
  dark: {
    linkedin: 'https://img.icons8.com/ios-glyphs/48/333333/linkedin.png',
    twitter: 'https://img.icons8.com/ios-glyphs/48/333333/twitterx.png',
    github: 'https://img.icons8.com/ios-glyphs/48/333333/github.png',
    instagram: 'https://img.icons8.com/ios-glyphs/48/333333/instagram-new.png',
    facebook: 'https://img.icons8.com/ios-glyphs/48/333333/facebook-new.png',
    youtube: 'https://img.icons8.com/ios-glyphs/48/333333/youtube-play.png',
    whatsapp: 'https://img.icons8.com/ios-glyphs/48/333333/whatsapp.png',
    calendly: 'https://img.icons8.com/ios-glyphs/48/333333/calendar.png',
    phone: 'https://img.icons8.com/ios-glyphs/48/333333/phone.png',
    mobile: 'https://img.icons8.com/ios-glyphs/48/333333/cell-phone.png',
    email: 'https://img.icons8.com/ios-glyphs/48/333333/email.png',
    website: 'https://img.icons8.com/ios-glyphs/48/333333/domain.png',
    marker: 'https://img.icons8.com/ios-glyphs/48/333333/marker.png',
  },
  brand: {
    linkedin: 'https://img.icons8.com/ios-filled/48/0f4c81/linkedin.png',
    twitter: 'https://img.icons8.com/ios-filled/48/0f4c81/twitterx.png',
    github: 'https://img.icons8.com/ios-filled/48/0f4c81/github.png',
    instagram: 'https://img.icons8.com/ios-filled/48/0f4c81/instagram-new.png',
    facebook: 'https://img.icons8.com/ios-filled/48/0f4c81/facebook-new.png',
    youtube: 'https://img.icons8.com/ios-filled/48/0f4c81/youtube-play.png',
    whatsapp: 'https://img.icons8.com/ios-filled/48/0f4c81/whatsapp.png',
    calendly: 'https://img.icons8.com/ios-filled/48/0f4c81/calendar.png',
    phone: 'https://img.icons8.com/ios-filled/48/0f4c81/phone.png',
    mobile: 'https://img.icons8.com/ios-filled/48/0f4c81/cell-phone.png',
    email: 'https://img.icons8.com/ios-filled/48/0f4c81/email.png',
    website: 'https://img.icons8.com/ios-filled/48/0f4c81/domain.png',
    marker: 'https://img.icons8.com/ios-filled/48/0f4c81/marker.png',
  },
};

const FONT_SCALES: Record<FontSizeScale, { name: number; title: number; body: number; small: number }> = {
  compact: { name: 15, title: 12, body: 11, small: 10 },
  normal: { name: 17, title: 13, body: 12, small: 11 },
  large: { name: 19, title: 14, body: 13, small: 12 },
};

function getBorderRadius(shape: SignatureData['images']['avatarShape']): string {
  switch (shape) {
    case 'circle':
      return '50%';
    case 'rounded':
      return '10px';
    case 'square':
    default:
      return '0px';
  }
}

function getIconSet(style: IconStyle, _primaryColor: string) {
  if (style === 'dark') return ICONS.dark;
  if (style === 'brand') return ICONS.brand;
  return ICONS.colored;
}

// Generate Email-Safe Call-to-Action button (Outlook Word engine & Gmail compatible)
function renderCtaButton(data: SignatureData, font: string): string {
  if (!data.cta.showCta || !data.cta.buttonText || !data.cta.buttonUrl) return '';
  return `
    <table cellpadding="0" cellspacing="0" border="0" style="margin-top: 10px; border-collapse: separate;">
      <tr>
        <td align="center" bgcolor="${data.cta.bgColor}" style="border-radius: 5px; background-color: ${data.cta.bgColor}; padding: 7px 15px; font-family: ${font}; font-size: 12px; font-weight: bold; mso-padding-alt: 0;">
          <a href="${data.cta.buttonUrl}" target="_blank" rel="noopener noreferrer" style="color: ${data.cta.textColor}; text-decoration: none; display: inline-block; font-weight: bold; font-family: ${font};">
            ${data.cta.buttonText}
          </a>
        </td>
      </tr>
    </table>
  `;
}

// Generate Social Media Icon Links Row
function renderSocials(data: SignatureData, iconSet: typeof ICONS.colored): string {
  const links: { name: string; url: string; icon: string }[] = [];

  if (data.socials.linkedin) links.push({ name: 'LinkedIn', url: data.socials.linkedin, icon: iconSet.linkedin });
  if (data.socials.twitter) links.push({ name: 'X', url: data.socials.twitter, icon: iconSet.twitter });
  if (data.socials.github) links.push({ name: 'GitHub', url: data.socials.github, icon: iconSet.github });
  if (data.socials.instagram) links.push({ name: 'Instagram', url: data.socials.instagram, icon: iconSet.instagram });
  if (data.socials.facebook) links.push({ name: 'Facebook', url: data.socials.facebook, icon: iconSet.facebook });
  if (data.socials.youtube) links.push({ name: 'YouTube', url: data.socials.youtube, icon: iconSet.youtube });
  if (data.socials.whatsapp) {
    const cleanNum = data.socials.whatsapp.replace(/[^0-9]/g, '');
    const waUrl = data.socials.whatsapp.startsWith('http') ? data.socials.whatsapp : `https://wa.me/${cleanNum}`;
    links.push({ name: 'WhatsApp', url: waUrl, icon: iconSet.whatsapp });
  }
  if (data.socials.calendly) links.push({ name: 'Calendar', url: data.socials.calendly, icon: iconSet.calendly });

  if (links.length === 0) return '';

  return `
    <table cellpadding="0" cellspacing="0" border="0" style="margin-top: 8px; border-collapse: collapse;">
      <tr>
        ${links
          .map(
            (item) => `
          <td style="padding-right: 6px; vertical-align: middle;">
            <a href="${item.url}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; display: inline-block;">
              <img src="${item.icon}" alt="${item.name}" width="18" height="18" border="0" style="display: block; width: 18px; max-width: 18px; height: 18px; border: 0; outline: none; -ms-interpolation-mode: bicubic;" />
            </a>
          </td>`
          )
          .join('')}
      </tr>
    </table>
  `;
}

// Generate Promotional / Graphic Banner
function renderBanner(data: SignatureData): string {
  if (!data.images.bannerUrl) return '';
  const width = data.images.bannerWidth || 380;
  const imgTag = `<img src="${data.images.bannerUrl}" alt="Banner" width="${width}" border="0" style="display: block; width: ${width}px; max-width: 100%; height: auto; border: 0; outline: none; border-radius: 4px; -ms-interpolation-mode: bicubic;" />`;

  return `
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top: 12px; border-collapse: collapse;">
      <tr>
        <td style="padding: 0;">
          ${data.images.bannerLink ? `<a href="${data.images.bannerLink}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; display: block; border: 0;">${imgTag}</a>` : imgTag}
        </td>
      </tr>
    </table>
  `;
}

// Generate Green / Legal Disclaimer
function renderDisclaimer(data: SignatureData, font: string, mutedColor: string): string {
  const parts: string[] = [];

  if (data.disclaimer.showGreenEco) {
    parts.push(`
      <table cellpadding="0" cellspacing="0" border="0" style="margin-top: 10px; border-collapse: collapse;">
        <tr>
          <td style="font-size: 14px; line-height: 14px; padding-right: 5px; vertical-align: middle;">🌱</td>
          <td style="font-family: ${font}; font-size: 10px; line-height: 13px; color: #15803d; font-style: italic; vertical-align: middle;">
            Please consider the environment before printing this email.
          </td>
        </tr>
      </table>
    `);
  }

  if (data.disclaimer.showDisclaimer && data.disclaimer.text) {
    parts.push(`
      <table cellpadding="0" cellspacing="0" border="0" style="margin-top: 8px; border-collapse: collapse;">
        <tr>
          <td style="font-family: ${font}; font-size: 9px; line-height: 12px; color: ${mutedColor}; text-align: justify;">
            ${data.disclaimer.text}
          </td>
        </tr>
      </table>
    `);
  }

  return parts.join('');
}

// 1. TEMPLATE: CORPORATE MINIMALIST (Vertical Divider)
function generateCorporateTemplate(data: SignatureData): string {
  const font = data.style.fontFamily;
  const primary = data.style.primaryColor;
  const text = data.style.textColor;
  const muted = data.style.mutedColor;
  const scales = FONT_SCALES[data.style.fontSizeScale];
  const iconSet = getIconSet(data.style.iconStyle, primary);
  const borderRadius = getBorderRadius(data.images.avatarShape);
  const avatarSize = data.images.avatarSize || 80;
  const hasAvatar = !!data.images.avatarUrl;
  const hasLogo = !!data.images.logoUrl;
  const logoWidth = data.images.logoWidth || 140;
  const leftColWidth = Math.max(hasAvatar ? avatarSize : 0, hasLogo ? logoWidth : 0);

  return `
    <table cellpadding="0" cellspacing="0" border="0" style="background: none; border-collapse: collapse; margin: 0; padding: 0; font-family: ${font};">
      <tr>
        ${hasAvatar || hasLogo ? `
        <td valign="top" width="${leftColWidth}" style="vertical-align: top; padding: 0 16px 0 0; width: ${leftColWidth}px; max-width: ${leftColWidth}px;">
          ${hasAvatar ? `
          <img src="${data.images.avatarUrl}" alt="${data.personal.fullName}" width="${avatarSize}" height="${avatarSize}" border="0" style="display: block; width: ${avatarSize}px; max-width: ${avatarSize}px; height: ${avatarSize}px; border-radius: ${borderRadius}; border: 0; outline: none; -ms-interpolation-mode: bicubic;" />
          ` : ''}
          ${hasLogo ? `
          <div style="height: ${hasAvatar ? '10px' : '0px'}; line-height: ${hasAvatar ? '10px' : '0px'}; font-size: 1px;">&nbsp;</div>
          <img src="${data.images.logoUrl}" alt="${data.company.companyName}" width="${logoWidth}" border="0" style="display: block; width: ${logoWidth}px; max-width: ${logoWidth}px; height: auto; border: 0; outline: none; -ms-interpolation-mode: bicubic;" />
          ` : ''}
        </td>
        <td width="2" style="width: 2px; min-width: 2px; background-color: ${primary}; font-size: 1px; line-height: 1px; padding: 0;">&nbsp;</td>
        <td width="16" style="width: 16px; min-width: 16px; font-size: 1px; line-height: 1px; padding: 0;">&nbsp;</td>
        ` : ''}
        
        <td valign="top" style="vertical-align: top; padding: 0; font-family: ${font};">
          <!-- Name & Title -->
          <div style="font-family: ${font}; font-size: ${scales.name}px; font-weight: bold; line-height: 1.2; color: ${primary}; letter-spacing: -0.2px;">
            ${data.personal.fullName}
            ${data.personal.pronouns ? `<span style="font-size: ${scales.small}px; font-weight: normal; color: ${muted}; margin-left: 6px;">(${data.personal.pronouns})</span>` : ''}
          </div>

          ${data.personal.jobTitle || data.personal.department ? `
          <div style="font-family: ${font}; font-size: ${scales.title}px; line-height: 1.3; color: ${muted}; font-weight: 500; margin-top: 2px;">
            ${[data.personal.jobTitle, data.personal.department].filter(Boolean).join(' • ')}
          </div>` : ''}

          ${data.company.companyName ? `
          <div style="font-family: ${font}; font-size: ${scales.title}px; line-height: 1.3; color: ${text}; font-weight: 700; margin-top: 2px;">
            ${data.company.companyName}
            ${data.company.tagline ? `<span style="font-weight: normal; font-size: ${scales.small}px; color: ${muted}; margin-left: 5px;">| ${data.company.tagline}</span>` : ''}
          </div>` : ''}

          <!-- Contact items -->
          <table cellpadding="0" cellspacing="0" border="0" style="margin-top: 8px; border-collapse: collapse; font-family: ${font}; font-size: ${scales.body}px; line-height: 1.4; color: ${text};">
            ${data.contact.phoneWork ? `
            <tr>
              <td style="padding-right: 6px; padding-bottom: 3px; vertical-align: middle;">
                <img src="${iconSet.phone}" alt="Phone" width="13" height="13" border="0" style="display: block; width: 13px; height: 13px;" />
              </td>
              <td style="padding-bottom: 3px; font-family: ${font}; vertical-align: middle;">
                <a href="tel:${data.contact.phoneWork.replace(/[^0-9+]/g, '')}" style="color: ${text}; text-decoration: none;">${data.contact.phoneWork}</a>
              </td>
            </tr>` : ''}

            ${data.contact.phoneMobile ? `
            <tr>
              <td style="padding-right: 6px; padding-bottom: 3px; vertical-align: middle;">
                <img src="${iconSet.mobile}" alt="Mobile" width="13" height="13" border="0" style="display: block; width: 13px; height: 13px;" />
              </td>
              <td style="padding-bottom: 3px; font-family: ${font}; vertical-align: middle;">
                <a href="tel:${data.contact.phoneMobile.replace(/[^0-9+]/g, '')}" style="color: ${text}; text-decoration: none;">${data.contact.phoneMobile}</a>
              </td>
            </tr>` : ''}

            ${data.contact.email ? `
            <tr>
              <td style="padding-right: 6px; padding-bottom: 3px; vertical-align: middle;">
                <img src="${iconSet.email}" alt="Email" width="13" height="13" border="0" style="display: block; width: 13px; height: 13px;" />
              </td>
              <td style="padding-bottom: 3px; font-family: ${font}; vertical-align: middle;">
                <a href="mailto:${data.contact.email}" style="color: ${text}; text-decoration: none; font-weight: 500;">${data.contact.email}</a>
              </td>
            </tr>` : ''}

            ${data.company.website ? `
            <tr>
              <td style="padding-right: 6px; padding-bottom: 3px; vertical-align: middle;">
                <img src="${iconSet.website}" alt="Website" width="13" height="13" border="0" style="display: block; width: 13px; height: 13px;" />
              </td>
              <td style="padding-bottom: 3px; font-family: ${font}; vertical-align: middle;">
                <a href="${data.company.website.startsWith('http') ? data.company.website : 'https://' + data.company.website}" target="_blank" rel="noopener noreferrer" style="color: ${primary}; text-decoration: none; font-weight: 600;">${data.company.website.replace(/^https?:\/\//, '')}</a>
              </td>
            </tr>` : ''}

            ${data.company.address ? `
            <tr>
              <td style="padding-right: 6px; padding-bottom: 3px; vertical-align: middle;">
                <img src="${iconSet.marker}" alt="Location" width="13" height="13" border="0" style="display: block; width: 13px; height: 13px;" />
              </td>
              <td style="padding-bottom: 3px; font-family: ${font}; font-size: ${scales.small}px; color: ${muted}; vertical-align: middle;">
                ${data.company.address}${data.company.office ? ' (' + data.company.office + ')' : ''}
              </td>
            </tr>` : ''}
          </table>

          <!-- Socials & CTA -->
          ${renderSocials(data, iconSet)}
          ${renderCtaButton(data, font)}
        </td>
      </tr>
    </table>
    ${renderBanner(data)}
    ${renderDisclaimer(data, font, muted)}
  `;
}

// 2. TEMPLATE: EXECUTIVE EDITORIAL (Horizontal Accent Header)
function generateExecutiveTemplate(data: SignatureData): string {
  const font = data.style.fontFamily;
  const primary = data.style.primaryColor;
  const text = data.style.textColor;
  const muted = data.style.mutedColor;
  const scales = FONT_SCALES[data.style.fontSizeScale];
  const iconSet = getIconSet(data.style.iconStyle, primary);
  const borderRadius = getBorderRadius(data.images.avatarShape);
  const avatarSize = data.images.avatarSize || 75;

  return `
    <table cellpadding="0" cellspacing="0" border="0" style="background: none; border-collapse: collapse; margin: 0; padding: 0; font-family: ${font}; width: 100%; max-width: 540px;">
      <!-- Accent top bar -->
      <tr>
        <td colspan="2" style="height: 3px; background-color: ${primary}; font-size: 1px; line-height: 1px; padding: 0;">&nbsp;</td>
      </tr>
      <tr>
        <td colspan="2" style="height: 12px; font-size: 1px; line-height: 1px;">&nbsp;</td>
      </tr>
      <tr>
        <td valign="middle" style="vertical-align: middle; padding-bottom: 8px;">
          <div style="font-family: ${font}; font-size: ${scales.name + 2}px; font-weight: 700; line-height: 1.1; color: ${text}; letter-spacing: -0.3px;">
            ${data.personal.fullName}
          </div>
          <div style="font-family: ${font}; font-size: ${scales.title}px; line-height: 1.3; color: ${primary}; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 3px;">
            ${[data.personal.jobTitle, data.company.companyName].filter(Boolean).join(' • ')}
          </div>
        </td>
        ${data.images.logoUrl ? `
        <td align="right" valign="middle" style="vertical-align: middle; padding-bottom: 8px;">
          <img src="${data.images.logoUrl}" alt="${data.company.companyName}" width="${data.images.logoWidth || 100}" border="0" style="display: block; width: ${data.images.logoWidth || 100}px; height: auto; border: 0; outline: none; -ms-interpolation-mode: bicubic;" />
        </td>` : ''}
      </tr>

      <!-- Middle details -->
      <tr>
        <td colspan="2" style="padding-top: 8px; border-top: 1px solid #e2e8f0;">
          <table cellpadding="0" cellspacing="0" border="0" style="width: 100%; border-collapse: collapse;">
            <tr>
              ${data.images.avatarUrl ? `
              <td width="${avatarSize + 15}" valign="top" style="vertical-align: top; padding-right: 15px;">
                <img src="${data.images.avatarUrl}" alt="${data.personal.fullName}" width="${avatarSize}" height="${avatarSize}" border="0" style="display: block; width: ${avatarSize}px; max-width: ${avatarSize}px; height: ${avatarSize}px; border-radius: ${borderRadius}; border: 0; outline: none; -ms-interpolation-mode: bicubic;" />
              </td>` : ''}

              <td valign="top" style="vertical-align: top; font-family: ${font}; font-size: ${scales.body}px; line-height: 1.5; color: ${text};">
                <div>
                  ${data.contact.email ? `<a href="mailto:${data.contact.email}" style="color: ${primary}; text-decoration: none; font-weight: 600;">${data.contact.email}</a>` : ''}
                  ${data.contact.phoneWork ? `<span style="color: ${muted}; margin: 0 6px;">|</span><a href="tel:${data.contact.phoneWork.replace(/[^0-9+]/g, '')}" style="color: ${text}; text-decoration: none;">${data.contact.phoneWork}</a>` : ''}
                  ${data.contact.phoneMobile ? `<span style="color: ${muted}; margin: 0 6px;">|</span><a href="tel:${data.contact.phoneMobile.replace(/[^0-9+]/g, '')}" style="color: ${text}; text-decoration: none;">${data.contact.phoneMobile}</a>` : ''}
                </div>
                ${data.company.website || data.company.address ? `
                <div style="color: ${muted}; font-size: ${scales.small}px; margin-top: 3px;">
                  ${data.company.website ? `<a href="${data.company.website.startsWith('http') ? data.company.website : 'https://' + data.company.website}" target="_blank" rel="noopener noreferrer" style="color: ${text}; text-decoration: none; font-weight: 500;">${data.company.website.replace(/^https?:\/\//, '')}</a>` : ''}
                  ${data.company.address ? `<span style="margin: 0 6px;">•</span>${data.company.address}` : ''}
                </div>` : ''}

                ${renderSocials(data, iconSet)}
                ${renderCtaButton(data, font)}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    ${renderBanner(data)}
    ${renderDisclaimer(data, font, muted)}
  `;
}

// 3. TEMPLATE: DUAL-COLUMN GRID (Brand Column + Matrix)
function generateModernSplitTemplate(data: SignatureData): string {
  const font = data.style.fontFamily;
  const primary = data.style.primaryColor;
  const secondary = data.style.secondaryColor;
  const text = data.style.textColor;
  const muted = data.style.mutedColor;
  const scales = FONT_SCALES[data.style.fontSizeScale];
  const iconSet = getIconSet(data.style.iconStyle, primary);
  const borderRadius = getBorderRadius(data.images.avatarShape);
  const avatarSize = data.images.avatarSize || 90;
  const logoWidth = data.images.logoWidth || 140;
  const leftBrandColWidth = Math.max(data.images.avatarUrl ? avatarSize : 0, data.images.logoUrl ? logoWidth : 0);

  return `
    <table cellpadding="0" cellspacing="0" border="0" style="background: none; border-collapse: collapse; margin: 0; padding: 0; font-family: ${font};">
      <tr>
        <!-- Left Brand Column -->
        <td valign="top" align="center" width="${leftBrandColWidth}" style="vertical-align: top; padding: 0 18px 0 0; text-align: center; width: ${leftBrandColWidth}px; max-width: ${leftBrandColWidth}px;">
          ${data.images.avatarUrl ? `
          <img src="${data.images.avatarUrl}" alt="${data.personal.fullName}" width="${avatarSize}" height="${avatarSize}" border="0" style="display: block; width: ${avatarSize}px; max-width: ${avatarSize}px; height: ${avatarSize}px; border-radius: ${borderRadius}; border: 2px solid ${secondary}; outline: none; -ms-interpolation-mode: bicubic;" />
          ` : ''}
          ${data.images.logoUrl ? `
          <div style="height: 10px; line-height: 10px; font-size: 10px;">&nbsp;</div>
          <img src="${data.images.logoUrl}" alt="${data.company.companyName}" width="${logoWidth}" border="0" style="display: block; width: ${logoWidth}px; max-width: ${logoWidth}px; height: auto; border: 0; outline: none; margin: 0 auto; -ms-interpolation-mode: bicubic;" />
          ` : ''}
          <div style="margin-top: 8px;">
            ${renderSocials(data, iconSet)}
          </div>
        </td>

        <!-- Divider Line -->
        <td width="1" style="width: 1px; min-width: 1px; background-color: #cbd5e1; font-size: 1px; line-height: 1px; padding: 0;">&nbsp;</td>
        <td width="18" style="width: 18px; min-width: 18px; font-size: 1px; line-height: 1px; padding: 0;">&nbsp;</td>

        <!-- Right Content Matrix -->
        <td valign="top" style="vertical-align: top; padding: 0; font-family: ${font};">
          <div style="font-family: ${font}; font-size: ${scales.name + 1}px; font-weight: 800; line-height: 1.1; color: ${primary};">
            ${data.personal.fullName}
          </div>
          <div style="font-family: ${font}; font-size: ${scales.title}px; line-height: 1.3; color: ${secondary}; font-weight: 600; margin-top: 2px;">
            ${data.personal.jobTitle}
          </div>
          <div style="font-family: ${font}; font-size: ${scales.body}px; line-height: 1.3; color: ${text}; font-weight: 700; margin-top: 1px;">
            ${data.company.companyName}
          </div>

          <table cellpadding="0" cellspacing="0" border="0" style="margin-top: 8px; border-collapse: collapse; font-family: ${font}; font-size: ${scales.body}px; line-height: 1.4; color: ${text};">
            ${data.contact.email ? `
            <tr>
              <td style="padding-right: 8px; padding-bottom: 3px; vertical-align: middle; color: ${muted}; font-size: ${scales.small}px; font-weight: bold; text-transform: uppercase;">E:</td>
              <td style="padding-bottom: 3px; font-family: ${font}; vertical-align: middle;">
                <a href="mailto:${data.contact.email}" style="color: ${primary}; text-decoration: none; font-weight: 500;">${data.contact.email}</a>
              </td>
            </tr>` : ''}

            ${data.contact.phoneWork ? `
            <tr>
              <td style="padding-right: 8px; padding-bottom: 3px; vertical-align: middle; color: ${muted}; font-size: ${scales.small}px; font-weight: bold; text-transform: uppercase;">P:</td>
              <td style="padding-bottom: 3px; font-family: ${font}; vertical-align: middle;">
                <a href="tel:${data.contact.phoneWork.replace(/[^0-9+]/g, '')}" style="color: ${text}; text-decoration: none;">${data.contact.phoneWork}</a>
              </td>
            </tr>` : ''}

            ${data.company.website ? `
            <tr>
              <td style="padding-right: 8px; padding-bottom: 3px; vertical-align: middle; color: ${muted}; font-size: ${scales.small}px; font-weight: bold; text-transform: uppercase;">W:</td>
              <td style="padding-bottom: 3px; font-family: ${font}; vertical-align: middle;">
                <a href="${data.company.website.startsWith('http') ? data.company.website : 'https://' + data.company.website}" target="_blank" rel="noopener noreferrer" style="color: ${text}; text-decoration: none;">${data.company.website.replace(/^https?:\/\//, '')}</a>
              </td>
            </tr>` : ''}

            ${data.company.address ? `
            <tr>
              <td style="padding-right: 8px; padding-bottom: 3px; vertical-align: middle; color: ${muted}; font-size: ${scales.small}px; font-weight: bold; text-transform: uppercase;">A:</td>
              <td style="padding-bottom: 3px; font-family: ${font}; font-size: ${scales.small}px; color: ${muted}; vertical-align: middle;">
                ${data.company.address}
              </td>
            </tr>` : ''}
          </table>

          ${renderCtaButton(data, font)}
        </td>
      </tr>
    </table>
    ${renderBanner(data)}
    ${renderDisclaimer(data, font, muted)}
  `;
}

// 4. TEMPLATE: CREATIVE CARD & CTA PILL
function generateCreativeCardTemplate(data: SignatureData): string {
  const font = data.style.fontFamily;
  const primary = data.style.primaryColor;
  const text = data.style.textColor;
  const muted = data.style.mutedColor;
  const scales = FONT_SCALES[data.style.fontSizeScale];
  const iconSet = getIconSet(data.style.iconStyle, primary);
  const borderRadius = getBorderRadius(data.images.avatarShape);
  const avatarSize = data.images.avatarSize || 80;

  return `
    <table cellpadding="0" cellspacing="0" border="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid ${primary}; border-radius: 6px; padding: 14px 18px; margin: 0; font-family: ${font}; max-width: 520px;">
      <tr>
        <td valign="top" style="vertical-align: top; padding: 0;">
          <table cellpadding="0" cellspacing="0" border="0" style="width: 100%; border-collapse: collapse;">
            <tr>
              ${data.images.avatarUrl ? `
              <td width="${avatarSize + 14}" valign="middle" style="vertical-align: middle; padding-right: 14px;">
                <img src="${data.images.avatarUrl}" alt="${data.personal.fullName}" width="${avatarSize}" height="${avatarSize}" border="0" style="display: block; width: ${avatarSize}px; max-width: ${avatarSize}px; height: ${avatarSize}px; border-radius: ${borderRadius}; border: 2px solid #ffffff; outline: none; -ms-interpolation-mode: bicubic;" />
              </td>` : ''}

              <td valign="middle" style="vertical-align: middle; font-family: ${font};">
                <div style="font-family: ${font}; font-size: ${scales.name + 1}px; font-weight: 800; color: ${text}; line-height: 1.1;">
                  ${data.personal.fullName}
                </div>
                <div style="display: inline-block; background-color: #e0f2fe; color: ${primary}; font-size: ${scales.small}px; font-weight: 700; padding: 2px 8px; border-radius: 12px; margin-top: 4px;">
                  ${data.personal.jobTitle || 'Team Member'}
                </div>
                ${data.company.companyName ? `
                <div style="font-family: ${font}; font-size: ${scales.title}px; font-weight: 700; color: ${text}; margin-top: 3px;">
                  ${data.company.companyName}
                </div>` : ''}
              </td>

              ${data.images.logoUrl ? `
              <td align="right" valign="middle" style="vertical-align: middle; padding-left: 10px;">
                <img src="${data.images.logoUrl}" alt="${data.company.companyName}" width="${data.images.logoWidth || 80}" border="0" style="display: block; width: ${data.images.logoWidth || 80}px; height: auto; border: 0; outline: none; -ms-interpolation-mode: bicubic;" />
              </td>` : ''}
            </tr>
          </table>

          <div style="height: 10px; border-bottom: 1px dashed #cbd5e1; margin-bottom: 10px; font-size: 1px; line-height: 1px;">&nbsp;</div>

          <!-- Bottom Contact & Social Strip -->
          <table cellpadding="0" cellspacing="0" border="0" style="width: 100%; border-collapse: collapse;">
            <tr>
              <td valign="middle" style="vertical-align: middle; font-family: ${font}; font-size: ${scales.body}px; color: ${muted};">
                ${data.contact.email ? `<span>✉️ <a href="mailto:${data.contact.email}" style="color: ${primary}; text-decoration: none; font-weight: 600;">${data.contact.email}</a></span>` : ''}
                ${data.contact.phoneWork ? `<span style="margin-left: 10px;">📞 <a href="tel:${data.contact.phoneWork.replace(/[^0-9+]/g, '')}" style="color: ${text}; text-decoration: none;">${data.contact.phoneWork}</a></span>` : ''}
              </td>
              <td align="right" valign="middle" style="vertical-align: middle;">
                ${renderSocials(data, iconSet)}
              </td>
            </tr>
          </table>

          ${renderCtaButton(data, font)}
        </td>
      </tr>
    </table>
    ${renderBanner(data)}
    ${renderDisclaimer(data, font, muted)}
  `;
}

// 5. TEMPLATE: COMPACT MINIMAL (Horizontal 1-2 Rows, Thread-Safe)
function generateCompactTemplate(data: SignatureData): string {
  const font = data.style.fontFamily;
  const primary = data.style.primaryColor;
  const text = data.style.textColor;
  const muted = data.style.mutedColor;
  const scales = FONT_SCALES[data.style.fontSizeScale];
  const iconSet = getIconSet(data.style.iconStyle, primary);
  const borderRadius = getBorderRadius(data.images.avatarShape);
  const avatarSize = Math.min(data.images.avatarSize || 55, 60);

  return `
    <table cellpadding="0" cellspacing="0" border="0" style="background: none; border-collapse: collapse; margin: 0; padding: 0; font-family: ${font};">
      <tr>
        ${data.images.avatarUrl ? `
        <td valign="middle" style="vertical-align: middle; padding-right: 12px;">
          <img src="${data.images.avatarUrl}" alt="${data.personal.fullName}" width="${avatarSize}" height="${avatarSize}" border="0" style="display: block; width: ${avatarSize}px; max-width: ${avatarSize}px; height: ${avatarSize}px; border-radius: ${borderRadius}; border: 0; outline: none; -ms-interpolation-mode: bicubic;" />
        </td>` : ''}

        <td valign="middle" style="vertical-align: middle; font-family: ${font};">
          <div style="font-family: ${font}; font-size: ${scales.name}px; line-height: 1.2; color: ${text};">
            <strong style="color: ${primary};">${data.personal.fullName}</strong>
            ${data.personal.jobTitle ? `<span style="color: ${muted};"> | ${data.personal.jobTitle}</span>` : ''}
            ${data.company.companyName ? `<span style="color: ${text}; font-weight: 600;">, ${data.company.companyName}</span>` : ''}
          </div>

          <div style="font-family: ${font}; font-size: ${scales.body}px; line-height: 1.4; color: ${muted}; margin-top: 3px;">
            ${data.contact.email ? `<a href="mailto:${data.contact.email}" style="color: ${primary}; text-decoration: none;">${data.contact.email}</a>` : ''}
            ${data.contact.phoneWork ? `<span style="margin: 0 5px;">•</span><a href="tel:${data.contact.phoneWork.replace(/[^0-9+]/g, '')}" style="color: ${text}; text-decoration: none;">${data.contact.phoneWork}</a>` : ''}
            ${data.company.website ? `<span style="margin: 0 5px;">•</span><a href="${data.company.website.startsWith('http') ? data.company.website : 'https://' + data.company.website}" target="_blank" rel="noopener noreferrer" style="color: ${muted}; text-decoration: none;">${data.company.website.replace(/^https?:\/\//, '')}</a>` : ''}
          </div>

          ${renderSocials(data, iconSet)}
        </td>
      </tr>
    </table>
    ${renderDisclaimer(data, font, muted)}
  `;
}

// 6. TEMPLATE: PROMOTIONAL BANNER SHOWCASE
function generateBannerShowcaseTemplate(data: SignatureData): string {
  // Uses Corporate Minimal layout as base, with prominent banner & CTA emphasized
  return generateCorporateTemplate(data);
}

// Main HTML Generator Router
export function generateSignatureHtml(data: SignatureData): string {
  let innerHtml = '';

  switch (data.style.templateId) {
    case 'executive':
      innerHtml = generateExecutiveTemplate(data);
      break;
    case 'modern-split':
      innerHtml = generateModernSplitTemplate(data);
      break;
    case 'creative-card':
      innerHtml = generateCreativeCardTemplate(data);
      break;
    case 'compact-line':
      innerHtml = generateCompactTemplate(data);
      break;
    case 'banner-showcase':
      innerHtml = generateBannerShowcaseTemplate(data);
      break;
    case 'corporate':
    default:
      innerHtml = generateCorporateTemplate(data);
      break;
  }

  // Clean and wrap
  return `<!-- START SIGGEN EMAIL SIGNATURE -->\n${innerHtml.trim()}\n<!-- END SIGGEN EMAIL SIGNATURE -->`;
}
