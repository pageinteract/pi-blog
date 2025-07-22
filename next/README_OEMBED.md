# oEmbed Integration Guide

This project now supports oEmbed integration for rich media content from various providers like YouTube, Vimeo, Twitter, Instagram, and more.

## Features

- **Automatic oEmbed Rendering**: URLs from supported providers are automatically converted to rich embeds
- **Multiple Content Types**: Supports video, photo, rich content, and link previews
- **Responsive Design**: All embeds are responsive and work well on mobile devices
- **Provider Support**: Works with YouTube, Vimeo, Twitter/X, Instagram, TikTok, SoundCloud, and many more

## How It Works

### 1. Strapi Backend (Already Configured)

The oEmbed plugin is already installed and configured in Strapi:

- **Plugin**: `strapi-plugin-oembed@^2` is installed
- **Configuration**: Enabled in `strapi/config/plugins.ts`
- **Content Type**: The `article` content type includes an `oembed` field

### 2. Frontend Components

#### OEmbedRenderer Component
Located at `next/components/oembed-renderer.tsx`, this component handles rendering different types of oEmbed content:

- **Video/Rich Content**: Renders iframe embeds with proper aspect ratios
- **Photos**: Displays images with metadata
- **Fallback**: Shows link previews for unsupported content

#### CustomBlocksRenderer Component
Located at `next/components/custom-blocks-renderer.tsx`, this extends the default Strapi BlocksRenderer to:

- Detect oEmbed URLs in content
- Automatically render embeds for supported providers
- Provide enhanced styling for all content blocks

## Usage in Strapi Admin

1. **Create/Edit an Article**: Go to the Articles content type in Strapi admin
2. **Add oEmbed URL**: In the oEmbed field, paste a URL from a supported provider (e.g., YouTube video URL)
3. **Save**: The plugin will automatically fetch the oEmbed data
4. **Publish**: The embed will appear on the frontend

## Supported Providers

The oEmbed integration supports hundreds of providers, including:

- **Video**: YouTube, Vimeo, TikTok, Twitch, DailyMotion
- **Social**: Twitter/X, Instagram, Facebook
- **Audio**: SoundCloud, Spotify
- **Code**: CodePen, JSFiddle, GitHub Gists
- **Design**: Figma, Dribbble
- **And many more...

## Example oEmbed Response

When you add a YouTube URL, the plugin stores data like this:

```json
{
  "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "thumbnail": "data:image/jpeg;base64,...",
  "oembed": {
    "title": "Video Title",
    "author_name": "Channel Name",
    "author_url": "https://www.youtube.com/channel/...",
    "type": "video",
    "height": 113,
    "width": 200,
    "provider_name": "YouTube",
    "provider_url": "https://www.youtube.com/",
    "thumbnail_url": "https://i.ytimg.com/vi/.../hqdefault.jpg",
    "html": "<iframe width=\"200\" height=\"113\" src=\"https://www.youtube.com/embed/...\" ...></iframe>"
  }
}
```

## Styling

The oEmbed content is styled using:

- **Tailwind CSS**: For responsive design and dark theme
- **Custom CSS**: Located in `next/app/globals.css` for embed-specific styles
- **Component Styles**: Individual styling within the React components

## Security

- **Content Security Policy**: Ensure your CSP allows embeds from the providers you want to support
- **Sanitization**: The oEmbed plugin handles content sanitization
- **Safe HTML**: We use `dangerouslySetInnerHTML` only for trusted oEmbed content

## Customization

To customize the appearance or add support for additional providers:

1. **Modify OEmbedRenderer**: Edit `next/components/oembed-renderer.tsx`
2. **Update Styles**: Modify the CSS in `next/app/globals.css`
3. **Extend Types**: Add new types in `next/types/types.ts`

## Troubleshooting

- **Embed not showing**: Check if the provider is supported by oEmbed
- **Styling issues**: Verify CSS is properly loaded and responsive classes are applied
- **Security errors**: Update your Content Security Policy to allow the provider's domains