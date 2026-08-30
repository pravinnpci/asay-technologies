import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Dynamically initialize Google Analytics (GA4) and Google AdSense from environment variables (.env)
if (typeof document !== 'undefined') {
  const gaId = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;
  const adsenseId = import.meta.env.VITE_GOOGLE_ADSENSE_ID;

  if (gaId) {
    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(gaScript);

    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag(...args: any[]) {
      (window as any).dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', gaId);
  }

  if (adsenseId) {
    const adScript = document.createElement('script');
    adScript.async = true;
    adScript.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`;
    adScript.crossOrigin = 'anonymous';
    document.head.appendChild(adScript);
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

