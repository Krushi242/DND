import { getApiUrl } from './api';

export interface VideoItem {
  id: number;
  videoUrl: string;
  createdAt: string;
}

const normalizeVideoItem = (item: any): VideoItem | null => {
  const id = Number(item?.id);
  const videoUrl = item?.video_url ?? item?.videoUrl;
  const createdAt = item?.created_at ?? item?.createdAt ?? '';

  if (!Number.isFinite(id) || !videoUrl) {
    return null;
  }

  return {
    id,
    videoUrl,
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
    body: JSON.stringify({ video_url: videoUrl }),
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
