import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY || process.env.OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

export interface DubaiCommunity {
  id: string;
  name: string;
  platform: 'whatsapp' | 'linkedin' | 'facebook' | 'telegram' | 'dubizzle' | 'bayut';
  category: 'broker_group' | 'agent_network' | 'landlord_network' | 'relocation' | 'expat_community' | 'corporate_hr';
  size: string;
  description: string;
  engagementTip: string;
  url?: string;
}

export const DUBAI_RE_COMMUNITIES: DubaiCommunity[] = [
  {
    id: 'rera-brokers-wa',
    name: 'RERA Licensed Brokers UAE',
    platform: 'whatsapp',
    category: 'broker_group',
    size: '5,000+',
    description: 'Active RERA-licensed brokers sharing listings and leads',
    engagementTip: 'Share relocation value prop + partner link during slow hours (7–9pm)',
  },
  {
    id: 'dubai-re-agents',
    name: 'Dubai Real Estate Agents Network',
    platform: 'whatsapp',
    category: 'agent_network',
    size: '8,000+',
    description: 'Broad agent community covering all Dubai districts',
    engagementTip: 'Post a "move-in concierge" case study with AED earnings as hook',
  },
  {
    id: 'linkedin-dubai-re',
    name: 'Dubai Real Estate Professionals',
    platform: 'linkedin',
    category: 'broker_group',
    size: '25,000+',
    description: 'LinkedIn group for RE professionals in UAE',
    engagementTip: 'Publish thought leadership post about relocation services, tag key brokerages',
    url: 'https://www.linkedin.com/groups/4666742/',
  },
  {
    id: 'linkedin-uae-expats',
    name: 'UAE Expat Professionals Network',
    platform: 'linkedin',
    category: 'expat_community',
    size: '40,000+',
    description: 'Expats relocating to and within UAE',
    engagementTip: 'Share "move to Dubai checklist" with DeliWer CTA embedded',
    url: 'https://www.linkedin.com/groups/94457/',
  },
  {
    id: 'fb-dubai-housing',
    name: 'Dubai Housing & Rentals',
    platform: 'facebook',
    category: 'landlord_network',
    size: '120,000+',
    description: 'Landlords, tenants, and agents listing Dubai properties',
    engagementTip: 'Comment on new listings with "move-in concierge saves 2 weeks — DM us"',
    url: 'https://www.facebook.com/groups/DubaiHousingRentals',
  },
  {
    id: 'telegram-dubai-re',
    name: 'Dubai Real Estate Telegram',
    platform: 'telegram',
    category: 'broker_group',
    size: '3,000+',
    description: 'Fast-moving broker channel for off-plan and secondary market deals',
    engagementTip: 'Pin a "brokers earn AED 2,000 per referral" message with partner link',
  },
  {
    id: 'bayut-community',
    name: 'Bayut Broker Community',
    platform: 'bayut',
    category: 'agent_network',
    size: '15,000+',
    description: 'Brokers listed on Bayut.com — direct profile outreach',
    engagementTip: 'Search Bayut for new listings and reach out to listing agents individually',
    url: 'https://www.bayut.com/real-estate-agents/',
  },
  {
    id: 'dubizzle-agents',
    name: 'Dubizzle Agent Network',
    platform: 'dubizzle',
    category: 'agent_network',
    size: '12,000+',
    description: 'Active agents on Dubizzle — high listing volume = active pipeline',
    engagementTip: 'Message agents who posted in last 24 hours with co-referral proposition',
    url: 'https://www.dubizzle.com/real-estate/',
  },
  {
    id: 'corporate-hr-dubai',
    name: 'Corporate HR & Relocation Dubai',
    platform: 'linkedin',
    category: 'corporate_hr',
    size: '8,000+',
    description: 'HR leaders managing employee relocations to Dubai',
    engagementTip: 'Pitch "turnkey relocation package" with concierge + utility setup SLA',
    url: 'https://www.linkedin.com/groups/2148254/',
  },
  {
    id: 'dubai-expat-mums',
    name: 'Dubai Expat Mums & Families',
    platform: 'facebook',
    category: 'expat_community',
    size: '80,000+',
    description: 'Families relocating to Dubai — high intent relocation audience',
    engagementTip: 'Share family move-in checklist and school district guide as lead magnet',
    url: 'https://www.facebook.com/groups/dubaiexpatmums',
  },
];

export interface OutreachMessage {
  communityId: string;
  platform: string;
  headline: string;
  body: string;
  callToAction: string;
  hashtags: string[];
  whatsappDeepLink?: string;
}

const DELIWER_PARTNER_BASE = 'https://deliwer.ae/?ref=founder';

export async function generateCommunityMessage(
  community: DubaiCommunity,
  style: 'casual' | 'professional' | 'value_prop' = 'value_prop'
): Promise<OutreachMessage> {
  if (!openai) {
    return buildFallbackMessage(community, style);
  }

  const styleGuide = {
    casual: 'friendly, conversational, use emojis, feel like a peer recommendation',
    professional: 'formal, concise, B2B tone, no emojis',
    value_prop: 'punchy, benefit-led, clear ROI, one strong CTA, 1-2 emojis max',
  }[style];

  try {
    const prompt = `You are writing an outreach message for DeliWer — a Dubai relocation concierge service.
DeliWer helps people who move to Dubai set up water, electricity, internet, moving, and cleaning services in ONE booking.
Brokers/agents earn AED 500–2,000 per referral when their clients use DeliWer.

Write a message for this community:
- Community: ${community.name}
- Platform: ${community.platform}
- Audience: ${community.description}
- Category: ${community.category}
- Tip: ${community.engagementTip}
- Style: ${styleGuide}

Rules:
- Max 3 sentences for the body
- Include a hook, the value, and one CTA
- For broker audiences: focus on passive income / referral commission
- For expat/family audiences: focus on stress-free move-in
- Keep it authentic, not salesy
- End with: partner link ${DELIWER_PARTNER_BASE}

Return JSON only:
{
  "headline": "...",
  "body": "...",
  "callToAction": "...",
  "hashtags": ["...", "..."]
}`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
      max_tokens: 400,
    });

    const data = JSON.parse(response.choices[0].message.content || '{}');
    return {
      communityId: community.id,
      platform: community.platform,
      headline: data.headline || community.name,
      body: data.body || community.engagementTip,
      callToAction: data.callToAction || 'Join as a partner',
      hashtags: data.hashtags || ['DubaiRealEstate', 'DeliWer', 'Relocation'],
      whatsappDeepLink: buildWhatsAppLink(data.body || community.engagementTip),
    };
  } catch (err: any) {
    console.error('[COMMUNITY OUTREACH] AI error:', err.message);
    return buildFallbackMessage(community, style);
  }
}

function buildFallbackMessage(community: DubaiCommunity, style: string): OutreachMessage {
  const isBroker = ['broker_group', 'agent_network'].includes(community.category);
  return {
    communityId: community.id,
    platform: community.platform,
    headline: isBroker ? '💼 Earn passive income on every relocation referral' : '🏡 Stress-free move-in for your Dubai clients',
    body: isBroker
      ? `Brokers — when your clients move to Dubai, they need water, electricity, internet, cleaning & movers. DeliWer bundles it all in one booking and pays YOU AED 500–2,000 per referral. Zero extra work.`
      : `Moving to Dubai? DeliWer sets up all your home services — DEWA, Etisalat, movers, cleaners — in a single concierge booking. Your clients arrive and everything just works.`,
    callToAction: `Register as a partner → ${DELIWER_PARTNER_BASE}`,
    hashtags: ['DubaiRealEstate', 'DeliWer', 'RelocationDubai', 'BrokerDubai'],
    whatsappDeepLink: buildWhatsAppLink(
      isBroker
        ? `Hi! I wanted to share DeliWer — a relocation concierge that pays brokers AED 500-2000 per client referral. Check it out: ${DELIWER_PARTNER_BASE}`
        : `Hi! DeliWer helps your clients set up all home services in Dubai in one booking: ${DELIWER_PARTNER_BASE}`
    ),
  };
}

function buildWhatsAppLink(message: string): string {
  return `https://wa.me/?text=${encodeURIComponent(message + '\n\n' + DELIWER_PARTNER_BASE)}`;
}

export async function generateBrokerDirectMessage(broker: {
  name: string;
  company?: string | null;
  linkedinUrl?: string | null;
  instagramHandle?: string | null;
  platform: 'linkedin' | 'instagram' | 'whatsapp' | 'email';
}): Promise<{ subject?: string; message: string; platform: string }> {
  const firstName = broker.name.split(' ')[0];
  const company = broker.company || 'your agency';

  if (!openai) {
    return buildFallbackDM(firstName, company, broker.platform);
  }

  try {
    const prompt = `Write a personalized outreach message for a Dubai real estate broker.

Platform: ${broker.platform}
Broker first name: ${firstName}
Company: ${company}

DeliWer is a relocation concierge for Dubai — helps clients set up water (DEWA), internet (Etisalat/du), movers, cleaners, and more in one booking. Brokers earn AED 500–2,000 per referral.

Rules:
- Address them by first name
- 2-3 sentences max
- Mention their company naturally
- Focus on passive income / making their clients' lives easier
- End with a soft CTA (no pressure)
- For LinkedIn: professional but personable
- For Instagram: casual, emoji OK
- For WhatsApp: conversational, 1-2 sentences
- Include a subject line if platform is linkedin or email

Return JSON:
{
  "subject": "...",
  "message": "..."
}`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
      max_tokens: 250,
    });

    const data = JSON.parse(response.choices[0].message.content || '{}');
    return {
      subject: data.subject,
      message: data.message || buildFallbackDM(firstName, company, broker.platform).message,
      platform: broker.platform,
    };
  } catch {
    return buildFallbackDM(firstName, company, broker.platform);
  }
}

function buildFallbackDM(firstName: string, company: string, platform: string) {
  const messages: Record<string, string> = {
    linkedin: `Hi ${firstName}, I noticed your work at ${company} and wanted to reach out. DeliWer is a relocation concierge for Dubai — we handle DEWA, Etisalat, movers and more for your clients in one booking, and brokers earn AED 500–2,000 per referral. Would love to explore a partnership.`,
    instagram: `Hey ${firstName} 👋 Love what ${company} is doing! We built DeliWer to make your clients' move-in experience seamless — and you earn on every referral. DM me if interested! 🏡`,
    whatsapp: `Hi ${firstName}, I'm from DeliWer — we help your clients set up all home services in Dubai in one call and you earn AED 500–2,000 per referral. Interested in partnering?`,
    email: `Hi ${firstName}, I came across ${company} and wanted to introduce DeliWer — a Dubai relocation concierge that pays brokers AED 500–2,000 per client referral. Your clients get a stress-free move-in, you get passive income. Happy to share more details.`,
  };
  return {
    subject: platform === 'linkedin' || platform === 'email' ? `Partnership opportunity — DeliWer x ${company}` : undefined,
    message: messages[platform] || messages.whatsapp,
    platform,
  };
}
