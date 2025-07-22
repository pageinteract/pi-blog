import React from "react";

import { BlogLayout } from "@/components/blog-layout";
import fetchContentType from "@/lib/strapi/fetchContentType";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

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
      <BlocksRenderer content={article.content} />
    </BlogLayout>
  );
}
