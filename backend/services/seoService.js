class SEOService {
  /**
   * Run automated site structure scans to recommend keywords improvements
   */
  static analyzeSEO(websiteData) {
    const { pages, seoSettings } = websiteData;
    const recommendations = [];
    let seoScore = 70; // baseline rating

    if (!seoSettings.metaTitle) {
      recommendations.push('Add a global metaTitle settings properties to boost Google indexing listings.');
      seoScore -= 15;
    }

    if (!seoSettings.metaDescription || seoSettings.metaDescription.length < 50) {
      recommendations.push('Write a detailed metaDescription of at least 100 characters detailing business services.');
      seoScore -= 15;
    }

    if (!seoSettings.googleAnalyticsId) {
      recommendations.push('Connect Google Analytics ID tracking properties to analyze consumer demographics.');
      seoScore -= 10;
    }

    // Check page-level header structures
    pages.forEach((page) => {
      if (!page.seo || !page.seo.title) {
        recommendations.push(`Page '${page.title}' is missing local SEO search metadata title tags.`);
        seoScore -= 5;
      }
    });

    return {
      seoScore: Math.max(10, seoScore),
      recommendations,
      scannedAt: new Date()
    };
  }

  /**
   * Build automated XML Site Maps representations
   */
  static generateSiteMap(vendorSubdomain, pagesList) {
    const baseUrl = `https://${vendorSubdomain}.vendorhub.com`;
    const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
    const xmlFooter = '\n</urlset>';

    const urls = pagesList.map((page) => {
      const pagePath = page.slug === 'home' ? '' : `/${page.slug}`;
      return `
  <url>
    <loc>${baseUrl}${pagePath}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page.slug === 'home' ? '1.0' : '0.8'}</priority>
  </url>`;
    });

    return `${xmlHeader}${urls.join('')}${xmlFooter}`;
  }
}

module.exports = SEOService;
