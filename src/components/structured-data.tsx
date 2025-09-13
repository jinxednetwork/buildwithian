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
    "inLanguage": "en-US"
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
    </>
  )
}