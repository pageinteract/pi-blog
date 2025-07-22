import React from "react";

import { BlogLayout } from "@/components/blog-layout";
import fetchContentType from "@/lib/strapi/fetchContentType";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { OEmbedRenderer } from "@/components/oembed-renderer";

export default async function SingleArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = await fetchContentType(
    "articles",
    {
      filters: {
        slug: params.slug,
        locale: "en", // Hardcoded to English
      },
    },
    true
  );

  if (!article) {
    return <div>Blog not found</div>;
  }

  return (
    <BlogLayout article={article} locale="en">
      {/* Render oEmbed content if available as a featured embed */}
      {article.oembed && (
        <div className="mb-8">
          <OEmbedRenderer data={article.oembed} />
        </div>
      )}

      {/* Render the main content with standard blocks renderer */}
      <BlocksRenderer content={article.content} />
    </BlogLayout>
  );
}
