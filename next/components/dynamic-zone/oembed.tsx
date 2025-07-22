"use client";

import React from "react";
import { OEmbedRenderer } from "../oembed-renderer";
import { OEmbedData } from "@/types/types";

interface OEmbedComponentProps {
  url: string;
  oembed_data?: OEmbedData;
  caption?: string;
  alignment?: "left" | "center" | "right" | "full-width";
}

export function OEmbedComponent({
  url,
  oembed_data,
  caption,
  alignment = "center",
}: OEmbedComponentProps) {
  // If we have oembed_data, use it; otherwise create a basic structure
  const oembedData: OEmbedData = oembed_data || {
    url,
    oembed: {
      type: "link",
      title: url,
      provider_name: "External Link",
    },
  };

  const alignmentClasses = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto",
    "full-width": "w-full",
  };

  const containerClasses = {
    left: "max-w-md",
    center: "max-w-2xl mx-auto",
    right: "max-w-md ml-auto",
    "full-width": "w-full",
  };

  return (
    <div className={`my-8 ${alignmentClasses[alignment]}`}>
      <div className={`${containerClasses[alignment]}`}>
        <OEmbedRenderer data={oembedData} />
        {caption && (
          <p className="mt-2 text-sm text-muted-foreground italic text-center">
            {caption}
          </p>
        )}
      </div>
    </div>
  );
}
