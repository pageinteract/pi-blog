# oEmbed Dynamic Zone Component

This project includes an oEmbed dynamic zone component that allows content creators to embed rich media content directly within their content using Strapi's dynamic zones.

## Features

- **Rich Media Embedding**: Embed content from YouTube, Vimeo, Twitter/X, Instagram, TikTok, SoundCloud, and more
- **Flexible Placement**: Add oEmbed content anywhere within your dynamic zones
- **Alignment Options**: Choose from left, center, right, or full-width alignment
- **Caption Support**: Add optional captions to embedded content
- **Automatic Processing**: URLs are automatically processed to fetch oEmbed data

## How to Use

### 1. In Strapi Admin

1. **Edit an Article/Page**: Go to Content Manager → Articles (or Pages)
2. **Add Dynamic Zone Component**: In the dynamic zone section, click "Add a component"
3. **Select oEmbed**: Choose "oEmbed" from the available components
4. **Configure the Embed**:
   - **URL**: Paste the URL you want to embed (e.g., YouTube video, Twitter post)
   - **oEmbed Data**: This will be automatically populated when you save
   - **Caption**: Add an optional caption for the embedded content
   - **Alignment**: Choose how the embed should be aligned (center, left, right, full-width)

### 2. Supported Platforms

The oEmbed component supports any platform that provides oEmbed data, including:

- **Video**: YouTube, Vimeo, Dailymotion
- **Social Media**: Twitter/X, Instagram, TikTok, Facebook
- **Audio**: SoundCloud, Spotify, Apple Music
- **Code**: CodePen, JSFiddle, GitHub Gists
- **Documents**: SlideShare, Scribd
- **And many more...**

### 3. Example Usage

#### YouTube Video
```
URL: https://www.youtube.com/watch?v=dQw4w9WgXcQ
Caption: "Classic music video"
Alignment: center
```

#### Twitter Post
```
URL: https://twitter.com/user/status/123456789
Caption: "Important announcement"
Alignment: center
```

#### Instagram Post
```
URL: https://www.instagram.com/p/ABC123/
Caption: "Behind the scenes"
Alignment: full-width
```

## Technical Details

### Component Schema

The oEmbed dynamic zone component includes:

- `url` (string, required): The URL to embed
- `oembed_data` (customField): Automatically populated oEmbed data
- `caption` (string, optional): Caption text for the embed
- `alignment` (enum): left, center, right, or full-width

### Frontend Rendering

The component is automatically rendered on the frontend using:
- Responsive design that works on all devices
- Proper aspect ratios for video content
- Fallback rendering for unsupported content
- Accessibility features

### Available Content Types

The oEmbed component is available in:
- **Articles**: For blog posts and news content
- **Pages**: For general website pages
- **Blog Pages**: For blog listing and category pages

## Tips

1. **Test URLs**: Always test your URLs to ensure they provide oEmbed data
2. **Mobile Friendly**: All embeds are automatically responsive
3. **Performance**: Embeds are lazy-loaded for better performance
4. **SEO**: Embedded content includes proper metadata for search engines
5. **Accessibility**: All embeds include proper alt text and ARIA labels

## Troubleshooting

- **Embed not showing**: Ensure the URL provides oEmbed data
- **Layout issues**: Try different alignment options
- **Performance**: Consider the number of embeds per page
- **HTTPS**: Ensure all URLs use HTTPS for security

For more technical details, see the implementation in:
- Strapi: `src/components/dynamic-zone/oembed.json`
- Next.js: `components/dynamic-zone/oembed.tsx`
