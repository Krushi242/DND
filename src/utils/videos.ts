import { getApiUrl } from './api';
import { toVideoEmbedUrl } from './mediaLinks';

export interface VideoItem {
  id: number;
  videoUrl: string;
  createdAt: string;
}

const normalizeVideoItem = (item: unknown): VideoItem | null => {
  const data = item as Record<string, unknown>;
  const id = Number(data?.id);
  const videoUrl = (data?.video_url as string) ?? (data?.videoUrl as string);
  const createdAt = (data?.created_at as string) ?? (data?.createdAt as string) ?? '';

  if (!Number.isFinite(id) || !videoUrl) {
    return null;
  }

  return {
    id,
    videoUrl: toVideoEmbedUrl(videoUrl),
    createdAt,
  };
};

export const getVideoItems = async () => {
  try {
    const response = await fetch(getApiUrl('/api/videos'), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch videos: ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error('Invalid videos response');
    }

    return data
      .map(normalizeVideoItem)
      .filter((item): item is VideoItem => item !== null);
  } catch {
    return [];
  }
};

export const createVideoItem = async (videoUrl: string) => {
  const response = await fetch(getApiUrl('/api/videos'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      video_url: videoUrl,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to save video.');
  }

  const data = await response.json().catch(() => null);
  return normalizeVideoItem(data);
};

export const removeVideoItem = async (id: number) => {
  const response = await fetch(getApiUrl(`/api/videos?id=${id}`), {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete video.');
  }

  return true;
};
