
const YOUTUBE_WATCH_REGEX = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{6,})/i;
const YOUTUBE_EMBED_REGEX = /youtube\.com\/embed\/([\w-]{6,})/i;
const DRIVE_FILE_REGEX = /drive\.google\.com\/file\/d\/([^/?#]+)/i;
const DRIVE_OPEN_REGEX = /drive\.google\.com\/open\?id=([^&#]+)/i;
const DRIVE_UC_REGEX = /drive\.google\.com\/uc\?(?:[^#]*&)?id=([^&#]+)/i;
const DRIVE_LH3_REGEX = /lh\d+\.googleusercontent\.com\/d\/([^=&#]+)/i;

const extractGoogleDriveId = (url: string) => {
  const match =
    url.match(DRIVE_FILE_REGEX) ||
    url.match(DRIVE_OPEN_REGEX) ||
    url.match(DRIVE_UC_REGEX) ||
    url.match(DRIVE_LH3_REGEX);

  return match?.[1] || null;
};

export const toGalleryImageUrl = (url: string) => {
  const trimmed = url.trim();
  const driveId = extractGoogleDriveId(trimmed);

  if (driveId) {
    // Use native Googleusercontent endpoint to bypass CORS/ORB and avoid backend proxy failure
    return `https://lh3.googleusercontent.com/d/${driveId}`;
  }

  return trimmed;
};

export const toVideoEmbedUrl = (url: string) => {
  const trimmed = url.trim();
  const youtubeMatch = trimmed.match(YOUTUBE_WATCH_REGEX) || trimmed.match(YOUTUBE_EMBED_REGEX);

  if (youtubeMatch?.[1]) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
  }

  const driveId = extractGoogleDriveId(trimmed);

  if (driveId) {
    return `https://drive.google.com/file/d/${driveId}/preview`;
  }

  return trimmed;
};

export const isEmbeddableVideoUrl = (url: string) =>
  /youtube\.com\/embed\//i.test(url) || /drive\.google\.com\/file\/d\/.+\/preview/i.test(url);
