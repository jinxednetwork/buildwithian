export function StructuredData() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Ian Almeida",
    "jobTitle": ["Designer", "Entrepreneur", "Speaker"],
    "description": "Designer, Indie-Hacker, and Builder of Cool Sh*t from Mumbai",
    "url": "https://ianalmeida.com",
    "image": "https://ianalmeida.com/assets/profile.jpg",
    "sameAs": [
      "https://linkedin.com/in/ianalmeida",
      "https://instagram.com/ian.almeida",
      "https://youtube.com/@ianalmeida"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Mumbai",
      "addressCountry": "IN"
    },
    "email": "ian@jinxednetwork.com",
    "knowsAbout": [
      "Design Systems",
      "User Experience Design",
      "Entrepreneurship",
      "Artificial Intelligence",
      "Creative Technology",
      "Brand Strategy",
      "Content Creation"
    ],
    "alumniOf": {
      "@type": "Organization",
      "name": "Mumbai"
    },
    "worksFor": [
      {
        "@type": "Organization",
        "name": "Jinxed Network",
        "url": "https://jinxednetwork.com"
      },
      {
        "@type": "Organization", 
        "name": "A Video Company",
        "url": "https://avideocompany.co"
      },
      {
        "@type": "Organization",
        "name": "The Bombay AI Company", 
        "url": "https://bombayai.co"
      }
    ]
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Ian Almeida",
    "description": "Personal website of Ian Almeida - Designer, Indie-Hacker, and Builder",
    "url": "https://ianalmeida.com",
    "author": {
      "@type": "Person",
      "name": "Ian Almeida"
    },
    "inLanguage": "en-US",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://ianalmeida.com/?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  }

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Ian Almeida",
    "url": "https://ianalmeida.com",
    "logo": "https://ianalmeida.com/assets/profile.jpg",
    "description": "Creative technologist and entrepreneur from Mumbai",
    "founder": {
      "@type": "Person",
      "name": "Ian Almeida"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "ian@jinxednetwork.com",
      "contactType": "business"
    },
    "sameAs": [
      "https://linkedin.com/in/ianalmeida",
      "https://instagram.com/ian.almeida",
      "https://youtube.com/@ianalmeida"
    ]
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://ianalmeida.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Build with Ian",
        "item": "https://ianalmeida.com/build-with-ian"
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
    </>
  )
}