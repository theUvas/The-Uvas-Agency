import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"]
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.theuvas.com'),
  title: {
    default: "The Uvas | AI Marketing Agency + Custom CRM | $1,500/mo",
    template: "%s | The Uvas",
  },
  description: "All-in-one AI marketing agency: Google & Meta Ads, Custom CRM with mobile app, AI-optimized website, weekly content. $1,500/mo flat rate. Founded by Google & Meta engineers. 8x ROAS proven results. Only 2-3 spots/month.",
  keywords: [
    // English - Primary
    "AI marketing agency",
    "marketing agency for small business",
    "affordable marketing agency",
    "all-in-one marketing agency",
    "marketing agency with CRM",
    "Google Ads management small business",
    "Meta Ads agency",
    "Facebook Ads management",
    "custom CRM with mobile app",
    "marketing automation for local business",
    "AI-powered marketing",
    "generative engine optimization agency",
    "GEO SEO agency",
    "marketing agency founded by Google engineers",
    // English - Industry
    "marketing for dental clinic",
    "marketing for tattoo studio",
    "marketing for real estate agency",
    "marketing for spa wellness",
    "marketing for restaurant",
    "marketing for law firm",
    "marketing for gym fitness",
    "local business marketing agency",
    // Spanish - Primary
    "agencia de marketing con inteligencia artificial",
    "agencia de marketing para pequeñas empresas",
    "CRM custom para pequeñas empresas",
    "optimización para motores de búsqueda AI",
    "agencia de ads Google y Meta",
    "automatización de ventas para negocios locales",
    "agencia de crecimiento para PYMES",
    "marketing todo en uno",
    // Spanish - Industry
    "marketing para clínica dental",
    "marketing para estudio de tatuajes",
    "marketing para inmobiliaria",
    "marketing para spa",
    "marketing para restaurante",
  ],
  authors: [{ name: "The Uvas Team", url: "https://www.theuvas.com" }],
  creator: "The Uvas",
  publisher: "The Uvas",
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://www.theuvas.com",
    languages: {
      "en-US": "https://www.theuvas.com",
      "es-ES": "https://www.theuvas.com",
      "es-MX": "https://www.theuvas.com",
      "es-419": "https://www.theuvas.com",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["es_ES", "es_MX"],
    title: "The Uvas | AI Marketing Agency + Custom CRM | $1,500/mo",
    description: "Your complete marketing department: Google & Meta Ads, Custom CRM with native iOS/Android app, AI-optimized website, 8 posts/week. All-in $1,500/mo. Founded by Google & Meta engineers. 8x ROAS proven.",
    siteName: "The Uvas",
    url: "https://www.theuvas.com",
    images: [
      {
        url: "/assets/logo.webp",
        width: 1200,
        height: 630,
        alt: "The Uvas - AI Marketing Agency | $1,500/mo All-In"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    site: "@theuvasagency",
    creator: "@theuvasagency",
    title: "The Uvas | AI Marketing Agency + Custom CRM | $1,500/mo",
    description: "Your complete marketing department: Google & Meta Ads, Custom CRM with native app, 8 posts/week. All-in $1,500/mo. 8x ROAS proven results.",
    images: ["/assets/logo.webp"]
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "The Uvas",
  },
  category: "marketing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Schema Markup JSON-LD for ProfessionalService */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "The Uvas",
              "description": "AI-powered marketing agency offering all-in-one growth solutions: Website optimization, Google & Meta Ads management, Custom CRM with native mobile app, and weekly content creation (8 posts + 8 stories).",
              "url": "https://www.theuvas.com",
              "logo": "https://www.theuvas.com/assets/logo.webp",
              "image": "https://www.theuvas.com/assets/logo.webp",
              "telephone": "+1-555-UVAS-NOW",
              "priceRange": "$1500",
              "currenciesAccepted": "USD",
              "paymentAccepted": "Credit Card, Bank Transfer",
              "areaServed": [
                {
                  "@type": "Country",
                  "name": "Global"
                },
                {
                  "@type": "Country",
                  "name": "United States"
                }
              ],
              "makesOffer": [
                {
                  "@type": "Offer",
                  "name": "THE UVAS ALL-IN - Complete Marketing Department",
                  "description": "All-in-one marketing package: AI-optimized website, Google & Meta Ads management, Custom CRM with native app, 8 posts/week + 8 stories, weekly strategy calls, 24/7 priority support.",
                  "price": "1500",
                  "priceCurrency": "USD",
                  "priceValidUntil": "2027-12-31",
                  "availability": "https://schema.org/LimitedAvailability",
                  "offerCount": "3"
                },
                {
                  "@type": "Offer",
                  "name": "Custom AI Integration",
                  "description": "Bespoke AI automation solutions for admin tasks, sales processes, and customer service. Custom AI agents built for your specific business needs.",
                  "priceSpecification": {
                    "@type": "PriceSpecification",
                    "minPrice": "2500",
                    "priceCurrency": "USD",
                    "priceType": "https://schema.org/StartingFromPrice"
                  }
                }
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Marketing Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "AI Search Optimization (ASO)",
                      "description": "Optimize your brand to be the #1 recommendation in ChatGPT, Perplexity, Gemini, and Claude."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Google & Meta Ads Management",
                      "description": "AI-powered ad campaigns with real-time bid adjustments and predictive budget allocation."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Custom CRM Development",
                      "description": "Bespoke CRM system with native iOS/Android mobile app for your team."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Weekly Content Creation",
                      "description": "8 posts per week + 8 stories + sales-optimized copy + ad creatives."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Website AI Optimization",
                      "description": "Continuous AI-driven improvements to speed, appearance, conversion rates, and CTAs."
                    }
                  }
                ]
              },
              "servesIndustry": [
                "MedicalBusiness",
                "Dentist",
                "HealthAndBeautyBusiness",
                "RealEstateAgent",
                "LegalService",
                "Restaurant",
                "RetailStore",
                "ProfessionalService",
                "HomeAndConstructionBusiness",
                "EducationalOrganization"
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5.0",
                "reviewCount": "12",
                "bestRating": "5",
                "worstRating": "1"
              },
              "founder": {
                "@type": "Person",
                "name": "Diego Fabres"
              }
            })
          }}
        />

        {/* FAQ Schema for "People Also Ask" */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What exactly is included in the $1,500/month?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "THE UVAS ALL-IN includes EVERYTHING: AI-optimized website with continuous improvements, Google & Meta Ads management with weekly AI optimization, Custom CRM with native iOS/Android mobile app (up to 5 users), 8 posts per week + 8 stories with sales-optimized copy, ad creatives, weekly strategy calls, and 24/7 priority support via WhatsApp/Telegram. No hidden fees. No extra charges for changes or updates."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is there a long-term contract?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No long-term contracts required. We work month-to-month because we're confident in our results. You can cancel with 30 days notice if you're not 100% satisfied. However, our clients stay with us for an average of 18+ months because they see consistent growth and ROI."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How long until I see results?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Most clients start seeing improvements in their key metrics within the first 30-45 days. Documented results include: +85% bookings in 60 days (Inkstinct NYC tattoo studio), 12x ROI on Google Ads in 45 days (dental clinic), +200% qualified leads in 90 days (real estate agency). Results vary by industry and starting point, but our AI-first approach accelerates optimization."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is the custom CRM really mine to keep?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes! We build a 100% custom CRM tailored to your business processes, with native iOS and Android apps for your team. It's yours to keep forever, even if you cancel our marketing services. Includes up to 5 users at no additional cost. Additional users can be added for a small fee."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What industries do you specialize in?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We specialize in local and service-based businesses: dental clinics, tattoo studios, real estate agencies, spas & wellness centers, restaurants, retail stores, and professional services (law firms, accounting, consulting). Our AI-first system works for ANY business that wants to scale without the overhead of traditional agencies. We only accept 2-3 new clients per month to maintain quality."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How is this different from hiring freelancers?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Freelancers give you one skill (e.g., just ads OR just web). THE UVAS gives you a complete team: Ads specialist, web developer, content creator, CRM developer, and AI strategist - all coordinated and working together. Plus, you get our proprietary technology (custom CRM with mobile app) that freelancers can't provide. Total cost of 5 freelancers would be $8,000-12,000/mo vs. our $1,500/mo all-in."
                  }
                }
              ]
            })
          }}
        />
        {/* WebSite Schema - Enables Google Sitelinks Searchbox */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "The Uvas",
              "alternateName": ["The Uvas Agency", "TheUvas", "theuvas.com"],
              "url": "https://www.theuvas.com",
              "description": "AI-powered marketing agency. All-in-one: Google & Meta Ads, Custom CRM with mobile app, AI-optimized website, weekly content. $1,500/mo flat rate.",
              "publisher": {
                "@type": "Organization",
                "name": "The Uvas",
                "url": "https://www.theuvas.com",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://www.theuvas.com/assets/logo.webp"
                },
                "sameAs": [
                  "https://www.theuvas.com",
                  "https://instagram.com/theuvasagency",
                  "https://twitter.com/theuvasagency"
                ]
              }
            })
          }}
        />

        {/* Review Schema - Real client testimonials for trust signals */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "The Uvas",
              "url": "https://www.theuvas.com",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5.0",
                "reviewCount": "12",
                "bestRating": "5",
                "worstRating": "1"
              },
              "review": [
                {
                  "@type": "Review",
                  "author": { "@type": "Person", "name": "Inkstinct NYC" },
                  "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                  "reviewBody": "Working with The Uvas has been a game-changer for us. Despite the competitive market, they delivered +85% bookings in just 60 days with 8x ROAS on Meta Ads. Their AI-first approach and custom CRM transformed how we manage our client pipeline.",
                  "datePublished": "2025-11-01"
                },
                {
                  "@type": "Review",
                  "author": { "@type": "Person", "name": "Dental Clinic Client" },
                  "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                  "reviewBody": "We achieved 12x ROI on Google Ads in just 45 days. The Uvas team understood our industry immediately and built a custom CRM that our front desk team actually loves using. Best marketing investment we've made.",
                  "datePublished": "2025-10-15"
                },
                {
                  "@type": "Review",
                  "author": { "@type": "Person", "name": "Real Estate Agency Client" },
                  "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                  "reviewBody": "200% more qualified leads in 90 days. The Uvas replaced our entire marketing team at a fraction of the cost. Their AI tools and custom CRM with mobile app are worth the investment alone.",
                  "datePublished": "2025-09-20"
                }
              ]
            })
          }}
        />

        {children}

      </body>
    </html>
  );
}
