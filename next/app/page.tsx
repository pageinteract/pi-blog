import { Metadata } from "next";

import PageContent from "@/lib/shared/PageContent";
import fetchContentType from "@/lib/strapi/fetchContentType";
import { generateMetadataObject } from "@/lib/shared/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await fetchContentType(
    "pages",
    {
      filters: {
        slug: "homepage",
        locale: "en", // Hardcoded to English
      },
      populate: "seo.metaImage",
    },
    true
  );

  const seo = pageData?.seo;
  const metadata = generateMetadataObject(seo);
  return metadata;
}

export default async function HomePage() {
  const pageData = await fetchContentType(
    "pages",
    {
      filters: {
        slug: "homepage",
        locale: "en", // Hardcoded to English
      },
    },
    true
  );

  return <PageContent pageData={pageData} />;
}
