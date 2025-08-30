
# DeliWer Email & Contact Forms System - Configuration & Operation Guide

## 📋 System Overview

The DeliWer platform includes a comprehensive email and contact management system with the following components:

- **Frontend Contact Forms** - Multi-purpose forms across various pages
- **SendGrid Email Service** - Professional email delivery
- **Corporate Lead Management** - Automated lead tracking and follow-up
- **Email Campaign Management** - Bulk email capabilities
- **API Endpoints** - RESTful contact and email management

## 🛠️ Initial Setup & Configuration

### 1. Environment Variables Setup

Create or update your `.env` file with the following required variables:

```bash
# SendGrid Configuration (Required for email functionality)
SENDGRID_API_KEY=your-sendgrid-api-key-here

# Database Configuration
DATABASE_URL=postgresql://username:password@host:5432/database

# OpenAI API (for AI features)
OPENAI_API_KEY=sk-your-openai-api-key-here

# Application Configuration
NODE_ENV=production
PORT=5000
```

### 2. SendGrid Account Setup

1. **Create SendGrid Account**: Visit [sendgrid.com](https://sendgrid.com) and create an account
2. **Generate API Key**: 
   - Navigate to Settings > API Keys
   - Create a new API key with "Full Access" permissions
   - Copy the API key to your `.env` file
3. **Verify Sender Identity**:
   - Go to Settings > Sender Authentication
   - Verify your domain or single sender email addresses
   - Use verified emails in your from addresses

### 3. Email Addresses Configuration

Update the following email addresses in your system:

**File: `server/sendgrid-service.ts`**
- Default from address: `noreply@deliwer.com`
- Corporate emails: `corporate@deliwer.com`

**Contact Information (Update these in your components):**
- Support: `support@deliwer.com`
- General: `info@deliwer.com`
- Legal: `legal@deliwer.com`
- Privacy: `privacy@deliwer.com`

## 🚀 System Operation

### Contact Form Submission Flow

1. **User fills out contact form** on any page (contact, account, corporate)
2. **Frontend validation** ensures required fields are completed
3. **API submission** to `/api/contact` endpoint
4. **Database storage** of contact information
5. **Success notification** displayed to user

### Corporate Lead Management Flow

1. **Corporate inquiry submitted** via `/api/corporate/inquiry`
2. **Lead saved to database** with status tracking
3. **Automatic welcome email** sent via SendGrid
4. **Lead management** available through API endpoints

### Email Campaign Flow

1. **Campaign created** via `/api/email/campaigns`
2. **Target audience selected** based on criteria
3. **Bulk email sending** using SendGrid service
4. **Delivery tracking** and statistics updated

## 📊 API Endpoints Reference

### Contact Management
- `POST /api/contact` - Submit contact form
- `GET /api/contacts` - Retrieve all contacts
- `GET /api/quotes/:userId` - Get user quotes
- `PATCH /api/quotes/:id/status` - Update quote status

### Corporate Lead Management
- `POST /api/corporate/inquiry` - Submit corporate inquiry
- `GET /api/corporate/leads` - Retrieve corporate leads
- `PATCH /api/corporate/leads/:id` - Update lead status

### Email Campaign Management
- `POST /api/email/campaigns` - Create email campaign
- `GET /api/email/campaigns` - List all campaigns
- `POST /api/email/campaigns/:id/send` - Send campaign
- `POST /api/email/test-campaign` - Send test email

### Email Subscriber Management
- `POST /api/email/subscribers` - Add email subscriber
- `GET /api/email/subscribers` - List subscribers
- `POST /api/email/corporate-outreach` - Send targeted outreach

## 🧪 Testing the System

### 1. Test Email Functionality

```bash
curl -X POST http://localhost:5000/api/email/test-campaign \
  -H "Content-Type: application/json" \
  -d '{"testEmail": "your-test-email@example.com"}'
```

### 2. Test Contact Form Submission

```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Message",
    "message": "This is a test contact form submission",
    "category": "general",
    "urgency": "normal"
  }'
```

### 3. Test Corporate Inquiry

```bash
curl -X POST http://localhost:5000/api/corporate/inquiry \
  -H "Content-Type: application/json" \
  -d '{
    "companyName": "Test Company",
    "email": "corporate@testcompany.com",
    "contactName": "John Doe",
    "phone": "+971501234567",
    "industry": "technology",
    "message": "Interested in corporate trade-in program"
  }'
```

## 📱 Frontend Integration

### Contact Form Usage

The contact form component can be used in multiple ways:

```tsx
// General contact form
<ContactForm />

// Support-specific form
<ContactForm type="support" />

// Sales inquiry form
<ContactForm type="sales" />

// Partnership inquiry form
<ContactForm type="partnership" />

// Pre-filled subject
<ContactForm prefilledSubject="Custom Subject" />
```

### Form Categories Available
- `general` - General inquiries
- `support` - Technical support
- `sales` - Sales and pricing
- `partnership` - Partnership opportunities
- `feedback` - User feedback
- `complaint` - Customer complaints

### Urgency Levels
- `low` - Response within 3 days
- `normal` - Response within 24 hours
- `high` - Response within 4 hours
- `urgent` - Response within 1 hour

## 🔧 Maintenance & Monitoring

### 1. Email Delivery Monitoring

Check SendGrid dashboard regularly for:
- Delivery rates
- Bounce rates
- Spam reports
- Unsubscribe rates

### 2. Database Maintenance

Monitor the following tables:
- `contacts` - Contact form submissions
- `corporate_leads` - Corporate inquiries
- `email_campaigns` - Campaign management
- `email_subscribers` - Subscriber list

### 3. Error Handling

The system includes comprehensive error handling:
- SendGrid API failures are logged but don't break the contact submission flow
- Email failures are tracked and reported
- Database connection issues are handled gracefully

## 🚨 Troubleshooting

### Common Issues

**1. Emails not sending**
- Check SENDGRID_API_KEY is correctly set
- Verify SendGrid account is active
- Ensure sender email is verified in SendGrid

**2. Contact forms not submitting**
- Check API endpoint connectivity
- Verify database connection
- Review browser console for JavaScript errors

**3. Corporate welcome emails failing**
- Check email template formatting
- Verify recipient email format
- Review SendGrid activity logs

### Error Codes

- `400` - Invalid request data
- `401` - Authentication required
- `404` - Resource not found
- `500` - Server error (check logs)

### Support Contacts

For technical issues:
- Email: `support@deliwer.com`
- Phone: `+971 4 123 4567`
- Emergency: `+971 52 394 6311`

## 🔐 Security Considerations

1. **API Key Security**: Never expose SendGrid API keys in frontend code
2. **Email Validation**: All email addresses are validated before sending
3. **Rate Limiting**: Implement rate limiting for form submissions
4. **Spam Protection**: Consider adding CAPTCHA for high-volume forms
5. **Data Privacy**: Ensure GDPR compliance for email subscribers

## 📈 Analytics & Reporting

### Available Metrics
- Contact form submission rates
- Email delivery success rates
- Corporate lead conversion tracking
- Campaign engagement statistics

### Reporting Endpoints
- `GET /api/contacts` - All contact submissions
- `GET /api/corporate/leads` - Corporate lead pipeline
- `GET /api/email/campaigns` - Campaign performance

---

**Last Updated**: January 2025  
**Version**: 2.0  
**System Status**: ✅ Operational
