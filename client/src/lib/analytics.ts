interface TrackingEvent {
  event: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
  metadata?: Record<string, any>;
}

interface CTAClick {
  ctaName: string;
  page: string;
  destination: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

function getUTMParams(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get('utm_source') || '',
    utmMedium: params.get('utm_medium') || '',
    utmCampaign: params.get('utm_campaign') || '',
    utmContent: params.get('utm_content') || '',
    utmTerm: params.get('utm_term') || '',
    ref: params.get('ref') || ''
  };
}

export function trackCTA(click: CTAClick): void {
  const utmParams = getUTMParams();
  
  const event: TrackingEvent = {
    event: 'cta_click',
    category: 'CTA',
    action: click.ctaName,
    label: click.destination,
    metadata: {
      page: click.page,
      destination: click.destination,
      timestamp: new Date().toISOString(),
      ...utmParams,
      userAgent: navigator.userAgent,
      referrer: document.referrer
    }
  };

  console.log('[Analytics] CTA Click:', event);

  if (typeof (window as any).gtag === 'function') {
    (window as any).gtag('event', click.ctaName, {
      event_category: 'CTA',
      event_label: click.destination,
      page_path: click.page,
      ...utmParams
    });
  }

  if (typeof (window as any).dataLayer !== 'undefined') {
    (window as any).dataLayer.push({
      event: 'cta_click',
      cta_name: click.ctaName,
      cta_destination: click.destination,
      page_path: click.page,
      ...utmParams
    });
  }

  const storedEvents = JSON.parse(sessionStorage.getItem('deliwer_events') || '[]');
  storedEvents.push(event);
  sessionStorage.setItem('deliwer_events', JSON.stringify(storedEvents.slice(-50)));
}

export function trackPageView(pageName: string): void {
  const utmParams = getUTMParams();
  
  const event = {
    event: 'page_view',
    page: pageName,
    path: window.location.pathname,
    timestamp: new Date().toISOString(),
    ...utmParams
  };

  console.log('[Analytics] Page View:', event);

  if (typeof (window as any).gtag === 'function') {
    (window as any).gtag('event', 'page_view', {
      page_title: pageName,
      page_path: window.location.pathname,
      ...utmParams
    });
  }
}

export function trackFormSubmission(formName: string, success: boolean, metadata?: Record<string, any>): void {
  const utmParams = getUTMParams();
  
  const event = {
    event: success ? 'form_submit_success' : 'form_submit_failure',
    form: formName,
    success,
    timestamp: new Date().toISOString(),
    ...utmParams,
    ...metadata
  };

  console.log('[Analytics] Form Submission:', event);

  if (typeof (window as any).gtag === 'function') {
    (window as any).gtag('event', success ? 'generate_lead' : 'form_error', {
      event_category: 'Form',
      event_label: formName,
      ...utmParams
    });
  }
}

export function trackBookingClick(bookingType: string, source: string): void {
  trackCTA({
    ctaName: `book_${bookingType}`,
    page: window.location.pathname,
    destination: 'calendly'
  });
}

export function trackWhatsAppClick(context: string): void {
  trackCTA({
    ctaName: 'whatsapp_click',
    page: window.location.pathname,
    destination: 'whatsapp'
  });
}

export function preserveUTMThroughFlow(): Record<string, string> {
  const utmParams = getUTMParams();
  
  if (Object.values(utmParams).some(v => v)) {
    sessionStorage.setItem('deliwer_utm', JSON.stringify(utmParams));
  }
  
  const stored = sessionStorage.getItem('deliwer_utm');
  return stored ? JSON.parse(stored) : utmParams;
}

export function getStoredUTM(): Record<string, string> {
  const stored = sessionStorage.getItem('deliwer_utm');
  return stored ? JSON.parse(stored) : getUTMParams();
}
