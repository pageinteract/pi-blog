"use client";

import React from "react";
import { OEmbedData } from "@/types/types";

interface OEmbedRendererProps {
  data: OEmbedData;
  className?: string;
}

export function OEmbedRenderer({ data, className = "" }: OEmbedRendererProps) {
  if (!data?.oembed) {
    return null;
  }

  const { oembed } = data;

  // For video and rich content, use the HTML embed if available
  if ((oembed.type === "video" || oembed.type === "rich") && oembed.html) {
    return (
      <div className={`oembed-container my-6 ${className}`}>
        <div
          className="relative overflow-hidden rounded-lg"
          style={{
            aspectRatio:
              oembed.width && oembed.height
                ? `${oembed.width}/${oembed.height}`
                : "16/9",
          }}
        >
          <div
            className="w-full h-full"
            dangerouslySetInnerHTML={{ __html: oembed.html }}
          />
        </div>
        {oembed.title && (
          <div className="mt-2 text-sm text-muted-foreground">
            <p className="font-medium">{oembed.title}</p>
            {oembed.author_name && (
              <p className="text-xs">
                by{" "}
                {oembed.author_url ? (
                  <a
                    href={oembed.author_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {oembed.author_name}
                  </a>
                ) : (
                  oembed.author_name
                )}
                {oembed.provider_name && ` on ${oembed.provider_name}`}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }

  // For photos, display the image
  if (oembed.type === "photo" && oembed.thumbnail_url) {
    return (
      <div className={`oembed-container my-6 ${className}`}>
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={oembed.thumbnail_url}
            alt={oembed.title || "Embedded content"}
            className="w-full h-auto"
            width={oembed.width}
            height={oembed.height}
          />
        </div>
        {oembed.title && (
          <div className="mt-2 text-sm text-muted-foreground">
            <p className="font-medium">{oembed.title}</p>
            {oembed.author_name && (
              <p className="text-xs">
                by{" "}
                {oembed.author_url ? (
                  <a
                    href={oembed.author_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {oembed.author_name}
                  </a>
                ) : (
                  oembed.author_name
                )}
                {oembed.provider_name && ` on ${oembed.provider_name}`}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }

  // Fallback for link type or when HTML is not available
  return (
    <div className={`oembed-container my-6 ${className}`}>
      <div className="border border-neutral-700 rounded-lg p-4 bg-neutral-800/50">
        {oembed.thumbnail_url && (
          <img
            src={oembed.thumbnail_url}
            alt={oembed.title || "Embedded content"}
            className="w-full h-32 object-cover rounded-md mb-3"
          />
        )}
        <div>
          <h3 className="font-medium text-neutral-200 mb-1">
            {oembed.title || "Embedded Content"}
          </h3>
          {oembed.author_name && (
            <p className="text-sm text-muted-foreground mb-2">
              by{" "}
              {oembed.author_url ? (
                <a
                  href={oembed.author_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {oembed.author_name}
                </a>
              ) : (
                oembed.author_name
              )}
              {oembed.provider_name && ` on ${oembed.provider_name}`}
            </p>
          )}
          <a
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-400 hover:text-blue-300 hover:underline"
          >
            View on {oembed.provider_name || "external site"}
          </a>
        </div>
      </div>
    </div>
  );
}
