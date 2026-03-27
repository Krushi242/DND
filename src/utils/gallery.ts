import { getApiUrl } from './api';

export interface GalleryItem {
  id: number;
  src: string;
  title: string;
  category: string;
}

export const GALLERY_UPDATED_EVENT = 'drd-gallery-updated';

const normalizeGalleryItem = (item: unknown): GalleryItem | null => {
  const data = item as Record<string, unknown>;
  const id = Number(data?.id);
  const src = (data?.image as string) ?? (data?.src as string);
  const title = data?.title as string;

  if (!Number.isFinite(id) || !src || !title) {
    return null;
  }

  return {
    id,
    src,
    title,
    category: (data?.description as string)?.trim?.() || (data?.category as string)?.trim?.() || 'Gallery',
  };
};

export const getGalleryItems = async () => {
  try {
    const response = await fetch(getApiUrl('/api/gallery'), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch gallery: ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error('Invalid gallery response');
    }

    const items = data
      .filter((item) => item?.status === undefined || Number(item.status) === 1)
      .map(normalizeGalleryItem)
      .filter((item): item is GalleryItem => item !== null);

    return items;
  } catch {
    return [];
  }
};

export const createGalleryItem = async (item: Omit<GalleryItem, 'id'>) => {
  const response = await fetch(getApiUrl('/api/gallery'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      title: item.title,
      image: item.src,
      description: item.category,
      status: 1,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to save gallery item.');
  }

  const data = await response.json().catch(() => null);
  const createdItem = normalizeGalleryItem(data);

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(GALLERY_UPDATED_EVENT));
  }

  if (createdItem) {
    return createdItem;
  }

  return null;
};

export const removeGalleryItem = async (id: number) => {
  const response = await fetch(getApiUrl(`/api/gallery?id=${id}`), {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete gallery item.');
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(GALLERY_UPDATED_EVENT));
  }

  return true;
};
