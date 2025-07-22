import { Metadata } from "next";
import PageContent from "@/lib/shared/PageContent";
import fetchContentType from "@/lib/strapi/fetchContentType";
import { generateMetadataObject } from "@/lib/shared/metadata";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const pageData = await fetchContentType(
    "pages",
    {
      filters: {
        slug: params.slug,
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

export default async function Page({ params }: { params: { slug: string } }) {
  const pageData = await fetchContentType(
    "pages",
    {
      filters: {
        slug: params.slug,
        locale: "en", // Hardcoded to English
      },
    },
    true
  );

  return <PageContent pageData={pageData} />;
}
