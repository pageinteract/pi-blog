import { MetadataRoute } from "next";
import fetchContentType from "@/lib/strapi/fetchContentType";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://stg-ruby.pageinteract.com";

  // Get all published articles
  const articles = await fetchContentType("articles", {
    filters: {
      locale: "en",
      publishedAt: { $notNull: true },
    },
    fields: ["slug", "updatedAt"],
    pagination: { pageSize: 100 },
  });

  // Get all published pages
  const pages = await fetchContentType("pages", {
    filters: {
      locale: "en",
      publishedAt: { $notNull: true },
    },
    fields: ["slug", "updatedAt"],
    pagination: { pageSize: 100 },
  });

  const sitemap: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  // Add article pages
  if (articles?.data) {
    articles.data.forEach((article: any) => {
      sitemap.push({
        url: `${baseUrl}/blog/${article.slug}`,
        lastModified: new Date(article.updatedAt),
        changeFrequency: "weekly",
        priority: 0.8,
      });
    });
  }

  // Add other pages
  if (pages?.data) {
    pages.data.forEach((page: any) => {
      if (page.slug !== "homepage") {
        sitemap.push({
          url: `${baseUrl}/${page.slug}`,
          lastModified: new Date(page.updatedAt),
          changeFrequency: "monthly",
          priority: 0.7,
        });
      }
    });
  }

  return sitemap;
}
