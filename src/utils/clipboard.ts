/**
 * Copies rich formatted HTML to clipboard so when pasted into Gmail/Outlook Signature Settings,
 * it pastes the rendered tables, images, colors, and links seamlessly.
 */
export async function copyRichSignature(containerElement: HTMLElement | null, rawHtml: string): Promise<boolean> {
  // Method 1: Modern Clipboard API with text/html Blob
  if (navigator.clipboard && typeof ClipboardItem !== 'undefined') {
    try {
      const htmlBlob = new Blob([rawHtml], { type: 'text/html' });
      // Create a plain text fallback
      const textFallback = containerElement ? containerElement.innerText : 'Email Signature';
      const textBlob = new Blob([textFallback], { type: 'text/plain' });

      await navigator.clipboard.write([
        new ClipboardItem({
          'text/html': htmlBlob,
          'text/plain': textBlob,
        }),
      ]);
      return true;
    } catch (err) {
      console.warn('ClipboardItem copy failed, falling back to selection copy:', err);
    }
  }

  // Method 2: DOM Selection & execCommand fallback
  if (containerElement) {
    try {
      const selection = window.getSelection();
      if (!selection) return false;

      const range = document.createRange();
      range.selectNodeContents(containerElement);
      selection.removeAllRanges();
      selection.addRange(range);

      const successful = document.execCommand('copy');
      selection.removeAllRanges();
      return successful;
    } catch (err) {
      console.error('Selection copy failed:', err);
    }
  }

  return false;
}

/**
 * Copies raw HTML string to clipboard.
 */
export async function copyRawHtml(rawHtml: string): Promise<boolean> {
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(rawHtml);
      return true;
    } catch (err) {
      console.warn('writeText failed, using fallback:', err);
    }
  }

  // Fallback
  const textarea = document.createElement('textarea');
  textarea.value = rawHtml;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  const success = document.execCommand('copy');
  document.body.removeChild(textarea);
  return success;
}

/**
 * Triggers a file download for the HTML signature.
 */
export function downloadHtmlFile(filename: string, content: string): void {
  const fullHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Email Signature</title>
</head>
<body style="margin: 0; padding: 15px; font-family: Arial, sans-serif;">
${content}
</body>
</html>`;

  const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename.endsWith('.html') ? filename : `${filename}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
