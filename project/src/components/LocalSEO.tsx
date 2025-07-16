import React from 'react';

const LocalSEO: React.FC = () => {
  return (
    <>
      {/* Structured Data - Local Business */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FinancialService",
            "name": "Quant Broker - Portfólios de IA BTG Pactual",
            "description": "Portfólios de IA com Copy Trading automatizado via BTG Pactual. Robôs inteligentes operando Bitcoin, Mini Índice e Mini Dólar 24/7.",
            "url": "https://quantbroker.com.br",
            "telephone": "+55-11-91156-0276",
            "email": "contato@quantbroker.com.br",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Av. Paulista, 1000",
              "addressLocality": "São Paulo",
              "addressRegion": "SP",
              "postalCode": "01310-100",
              "addressCountry": "BR"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": -23.5613,
              "longitude": -46.6565
            },
            "areaServed": [
              {
                "@type": "Country",
                "name": "Brasil"
              },
              {
                "@type": "State",
                "name": "São Paulo"
              },
              {
                "@type": "City",
                "name": "São Paulo"
              }
            ],
            "serviceType": [
              "Copy Trading Automatizado",
              "Portfólios de IA",
              "Trading Algorítmico",
              "Gestão de Investimentos"
            ],
            "priceRange": "R$ 300 - R$ 750",
            "currenciesAccepted": "BRL",
            "paymentAccepted": [
              "Credit Card",
              "PIX",
              "Bank Transfer"
            ],
            "openingHours": "Mo-Fr 09:00-18:00",
            "sameAs": [
              "https://wa.me/5511911560276",
              "https://instagram.com/quantbroker",
              "https://linkedin.com/company/quantbroker"
            ],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Portfólios de IA",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Portfólio Bitcoin",
                    "description": "Copy Trading automatizado para Bitcoin Futuro"
                  },
                  "price": "300",
                  "priceCurrency": "BRL"
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Portfólio Mini Índice",
                    "description": "Copy Trading automatizado para Mini Índice Bovespa"
                  },
                  "price": "400",
                  "priceCurrency": "BRL"
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Portfólio Completo",
                    "description": "Acesso a todas as estratégias de IA"
                  },
                  "price": "750",
                  "priceCurrency": "BRL"
                }
              ]
            },
            "review": [
              {
                "@type": "Review",
                "author": {
                  "@type": "Person",
                  "name": "Carlos M."
                },
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": "5",
                  "bestRating": "5"
                },
                "reviewBody": "Copy trade tem seus altos e baixos, mas no geral está compensando. A disciplina é fundamental."
              }
            ],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "127",
              "bestRating": "5"
            }
          })
        }}
      />

      {/* Structured Data - Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Quant Broker",
            "alternateName": "Quant Broker Portfólios de IA",
            "url": "https://quantbroker.com.br",
            "logo": "https://quantbroker.com.br/logo.png",
            "contactPoint": [
              {
                "@type": "ContactPoint",
                "telephone": "+55-11-91156-0276",
                "contactType": "customer service",
                "areaServed": "BR",
                "availableLanguage": "Portuguese"
              },
              {
                "@type": "ContactPoint",
                "telephone": "+55-48-92251-3066",
                "contactType": "technical support",
                "areaServed": "BR",
                "availableLanguage": "Portuguese"
              }
            ],
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Av. Paulista, 1000",
              "addressLocality": "São Paulo",
              "addressRegion": "SP",
              "postalCode": "01310-100",
              "addressCountry": "BR"
            },
            "sameAs": [
              "https://wa.me/5511911560276"
            ]
          })
        }}
      />

      {/* Structured Data - Service */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Portfólios de IA BTG Pactual",
            "description": "Copy Trading automatizado com inteligência artificial via BTG Pactual",
            "provider": {
              "@type": "Organization",
              "name": "Quant Broker"
            },
            "areaServed": {
              "@type": "Country",
              "name": "Brasil"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Serviços de Trading",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Copy Trading Bitcoin"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Copy Trading Mini Índice"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Copy Trading Mini Dólar"
                  }
                }
              ]
            }
          })
        }}
      />

      {/* Structured Data - FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "O que é um Portfólio de IA?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Um Portfólio de IA é um serviço de replicação automática de operações que permite que você copie as estratégias de traders profissionais sem precisar operar manualmente."
                }
              },
              {
                "@type": "Question",
                "name": "Qual é o investimento mínimo recomendado?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "O investimento mínimo varia por portfólio: Bitcoin (R$ 3.000), Mini Índice (R$ 5.000), Mini Dólar (R$ 10.000) e Portfólio Completo (R$ 15.000)."
                }
              },
              {
                "@type": "Question",
                "name": "Como funciona a integração com a corretora?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A integração é feita através do MetaTrader 5 via BTG Pactual. Após contratar o MT5 no BTG, você compartilha os dados de acesso conosco e configuramos o Copy Trade automaticamente."
                }
              }
            ]
          })
        }}
      />
    </>
  );
};

export default LocalSEO;