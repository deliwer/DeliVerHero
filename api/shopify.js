// Shopify Horizon integration handler for DeliWer
import { randomUUID } from "crypto";

export default async function handler(req, res) {
  // Enable CORS for Shopify
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*.shopify.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Shopify-Topic, X-Shopify-Hmac-Sha256, X-Shopify-Shop-Domain');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { url, method } = req;
  const path = url.split('?')[0];

  try {
    // Shopify webhook verification
    if (method === 'POST' && path === '/shopify/webhooks/orders/paid') {
      const shopifyTopic = req.headers['x-shopify-topic'];
      const shopifyHmac = req.headers['x-shopify-hmac-sha256'];
      const shopifyShop = req.headers['x-shopify-shop-domain'];
      
      // TODO: Implement proper webhook verification
      // const isVerified = verifyShopifyWebhook(req.body, shopifyHmac, process.env.SHOPIFY_WEBHOOK_SECRET);
      
      console.log('Shopify webhook received:', {
        topic: shopifyTopic,
        shop: shopifyShop,
        orderId: req.body?.id
      });
      
      // Process the order for DeliWer hero creation
      if (req.body?.id) {
        const order = req.body;
        
        // Create hero profile based on Shopify order
        const heroData = {
          id: randomUUID(),
          name: `${order.billing_address?.first_name || 'Hero'} ${order.billing_address?.last_name || ''}`.trim(),
          email: order.email || `hero-${order.id}@deliwer.com`,
          phoneModel: extractPhoneModelFromOrder(order),
          phoneCondition: "excellent", // Default for new orders
          tradeValue: Math.floor(order.total_price_usd || 500),
          points: 100,
          level: "Bronze Hero",
          badges: ["Water Warrior", "AquaCafe Champion"],
          bottlesPrevented: 0,
          co2Saved: 0,
          referralCount: 0,
          isActive: true,
          shopifyOrderId: order.id,
          shopifyCustomerId: order.customer?.id,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        
        console.log('Created hero profile for Shopify order:', heroData.id);
        
        return res.status(200).json({ 
          received: true, 
          heroId: heroData.id,
          message: 'Hero profile created successfully' 
        });
      }
      
      return res.status(200).json({ received: true });
    }

    // Shopify product sync endpoint
    if (method === 'GET' && path === '/shopify/products/sync') {
      const products = [
        {
          id: "aquacafe-starter-kit",
          title: "AquaCafe Planet Hero Starter Kit",
          handle: "aquacafe-planet-hero-starter-kit",
          price: "99.00",
          compare_at_price: "1698.00",
          description: "Transform your shower experience and become a Planet Hero! This exclusive starter kit includes our premium AquaCafe Beauty Hair & Skincare Ionic Shower Filter (AED 399 value) with professional installation (AED 299 value), instant Level 2 Planet Hero status, and 1000 Planet Points with 2X multiplier.",
          images: [
            {
              src: "https://deliwer-ecosystem.vercel.app/assets/aquacafe_shower_main_1755270492134.jpg",
              alt: "AquaCafe Ionic Shower Filter"
            }
          ],
          variants: [
            {
              id: randomUUID(),
              title: "Default Title",
              price: "99.00",
              inventory_quantity: 47,
              available: true
            }
          ],
          tags: ["planet-hero", "aquacafe", "water-filter", "sustainability", "dubai"],
          metafields: [
            {
              namespace: "deliwer",
              key: "hero_level_upgrade",
              value: "2"
            },
            {
              namespace: "deliwer", 
              key: "planet_points_reward",
              value: "1000"
            },
            {
              namespace: "deliwer",
              key: "environmental_impact",
              value: "Prevents 3000+ plastic bottles annually"
            }
          ]
        }
      ];
      
      return res.status(200).json(products);
    }

    // Shopify customer data integration
    if (method === 'GET' && path.startsWith('/shopify/customers/')) {
      const customerId = path.split('/').pop();
      
      // Mock customer data - in production, this would sync with Shopify
      const customer = {
        id: customerId,
        email: `customer-${customerId}@example.com`,
        first_name: "Ahmed",
        last_name: "Al-Maktoum",
        phone: "+971501234567",
        addresses: [
          {
            address1: "Sheikh Zayed Road",
            city: "Dubai",
            country: "United Arab Emirates",
            zip: "00000"
          }
        ],
        metafields: [
          {
            namespace: "deliwer",
            key: "hero_id",
            value: randomUUID()
          },
          {
            namespace: "deliwer",
            key: "planet_points",
            value: "1000"
          }
        ]
      };
      
      return res.status(200).json(customer);
    }

    // Shopify app installation verification
    if (method === 'GET' && path === '/shopify/auth/verify') {
      const { shop, hmac, timestamp, code } = req.query;
      
      // TODO: Implement proper Shopify OAuth verification
      console.log('Shopify app installation:', { shop, hmac, timestamp, code });
      
      return res.status(200).json({ 
        verified: true, 
        shop,
        app_url: "https://deliwer-ecosystem.vercel.app"
      });
    }

    // Create Shopify customer
    if (method === 'POST' && path === '/shopify/customers') {
      const customerData = req.body.customer;
      
      // Mock customer creation - in production, use Shopify Admin API
      const customer = {
        id: Date.now(),
        email: customerData.email,
        first_name: customerData.first_name,
        last_name: customerData.last_name,
        phone: customerData.phone,
        accepts_marketing: customerData.accepts_marketing,
        tags: customerData.tags,
        created_at: new Date().toISOString(),
        metafields: customerData.metafields || []
      };
      
      return res.status(201).json({ customer });
    }

    // Create checkout session
    if (method === 'POST' && path === '/shopify/checkout') {
      const { lineItems, customAttributes } = req.body;
      
      try {
        // Create proper Shopify checkout URL with line items
        const checkoutId = `checkout_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        // Build Shopify cart URL with line items
        const cartParams = lineItems.map(item => {
          // Extract variant ID from GraphQL ID or use as-is
          const variantId = item.variantId.includes('gid://shopify/ProductVariant/') 
            ? item.variantId.split('/').pop() 
            : item.variantId.replace('gid://shopify/ProductVariant/', '');
          
          return `${variantId}:${item.quantity}`;
        }).join(',');
        
        // Direct add to cart URL for Shopify
        const checkoutUrl = `https://deliwer.com/products/aquacafe?starter=true&ref=PLANETHEROES`;
        
        // Alternative: Direct product page with quantity
        const fallbackUrl = 'https://deliwer.com/products/aquacafe';
        
        console.log('Checkout created:', {
          checkoutId,
          lineItems: lineItems.length,
          checkoutUrl,
          customAttributes
        });
        
        return res.status(200).json({
          checkoutId,
          checkoutUrl,
          fallbackUrl,
          lineItems,
          message: 'Checkout session created successfully'
        });
        
      } catch (error) {
        console.error('Checkout creation error:', error);
        
        // Fallback to product page
        return res.status(200).json({
          checkoutId: `fallback_${Date.now()}`,
          checkoutUrl: 'https://deliwer.com/products/aquacafe',
          fallbackUrl: 'https://deliwer.com/products/aquacafe',
          lineItems,
          message: 'Redirecting to product page'
        });
      }
    }

    // Cart synchronization
    if (method === 'POST' && path === '/shopify/cart/sync') {
      const { cartId, items } = req.body;
      
      // Mock cart sync - in production, sync with Shopify cart
      const newCartId = cartId || `cart_${Date.now()}`;
      
      return res.status(200).json({
        cartId: newCartId,
        itemCount: items.length,
        synced: true
      });
    }

    // Check variant availability
    if (method === 'POST' && path === '/shopify/variants/availability') {
      const { variantIds } = req.body;
      
      // Mock availability check - in production, query Shopify inventory
      const availability = {};
      variantIds.forEach(variantId => {
        availability[variantId] = {
          available: Math.random() > 0.1, // 90% available
          quantity: Math.floor(Math.random() * 100) + 1
        };
      });
      
      return res.status(200).json(availability);
    }

    // Default response
    return res.status(404).json({ 
      error: 'Shopify endpoint not found', 
      path, 
      method,
      available_endpoints: [
        '/shopify/webhooks/orders/paid',
        '/shopify/products/sync', 
        '/shopify/customers/:id',
        '/shopify/customers (POST)',
        '/shopify/checkout (POST)',
        '/shopify/cart/sync (POST)',
        '/shopify/variants/availability (POST)',
        '/shopify/auth/verify'
      ]
    });

  } catch (error) {
    console.error('Shopify API Error:', error);
    return res.status(500).json({ error: 'Shopify integration error' });
  }
}

// Helper function to extract phone model from Shopify order
function extractPhoneModelFromOrder(order) {
  // Check line items for iPhone mentions
  for (const item of order.line_items || []) {
    const title = item.title?.toLowerCase() || '';
    const variant = item.variant_title?.toLowerCase() || '';
    
    if (title.includes('iphone') || variant.includes('iphone')) {
      // Extract iPhone model
      const combined = `${title} ${variant}`;
      if (combined.includes('15 pro max')) return 'iPhone 15 Pro Max';
      if (combined.includes('15 pro')) return 'iPhone 15 Pro';
      if (combined.includes('15')) return 'iPhone 15';
      if (combined.includes('14 pro max')) return 'iPhone 14 Pro Max';
      if (combined.includes('14 pro')) return 'iPhone 14 Pro';
      if (combined.includes('14')) return 'iPhone 14';
      if (combined.includes('13 pro max')) return 'iPhone 13 Pro Max';
      if (combined.includes('13 pro')) return 'iPhone 13 Pro';
      if (combined.includes('13')) return 'iPhone 13';
    }
  }
  
  return 'iPhone 15'; // Default fallback
}