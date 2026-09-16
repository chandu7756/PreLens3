/**
 * Universal Failsafe External Link Opener for PrepLens
 * Works seamlessly within sandboxed iframes and standard browser tabs.
 */
import React from 'react';

export interface ExternalLinkEventDetail {
  url: string;
  title: string;
  timestamp: number;
}

export const openExternalPortal = (
  url: string,
  title: string = 'Official Portal',
  e?: React.MouseEvent
): void => {
  if (e) {
    // Prevent event bubbling if needed
    e.stopPropagation();
  }

  if (!url) return;

  let popupBlocked = false;

  try {
    // Attempt 1: Direct window.open with secure attributes
    const opened = window.open(url, '_blank', 'noopener,noreferrer');
    if (!opened || opened.closed || typeof opened.closed === 'undefined') {
      popupBlocked = true;
    }
  } catch (err) {
    popupBlocked = true;
  }

  // Attempt 2: If blocked or in sandbox, try virtual anchor click
  if (popupBlocked) {
    try {
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    } catch (err) {
      console.warn('Virtual anchor click failed:', err);
    }
  }

  // Dispatch an app-wide event so that a friendly banner/toast confirms the action
  // and provides a 1-click fallback in case the browser's iframe popup-blocker stopped it.
  try {
    const customEvt = new CustomEvent<ExternalLinkEventDetail>('preplens:open-link', {
      detail: {
        url,
        title,
        timestamp: Date.now(),
      },
    });
    window.dispatchEvent(customEvt);
  } catch (err) {
    // Ignore in older environments
  }
};
