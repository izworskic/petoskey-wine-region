// Keep guide previews tied to each page's existing title, description and canonical.
export function withSocialMetadata(metadata) {
  const { title, description, alternates } = metadata;
  return {
    ...metadata,
    openGraph: {
      title,
      description,
      url: alternates.canonical,
      siteName: "Petoskey Wine Region Planner",
      type: "website",
    },
    twitter: { card: "summary", title, description },
  };
}
