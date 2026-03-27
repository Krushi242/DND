import img1 from '../assets/images/Beans.webp';
import img2 from '../assets/images/Bhendi.webp';
import img3 from '../assets/images/Bitter-Gourd.webp';
import img4 from '../assets/images/Bottle-Gourd.webp';
import img5 from '../assets/images/Chilli.webp';
import img6 from '../assets/images/Cucumber.webp';
import img7 from '../assets/images/Muskmelon.webp';
import img8 from '../assets/images/Tomato.webp';
import img9 from '../assets/images/Watermelon.webp';
import img10 from '../assets/images/featured.webp';
import { getApiUrl } from './api';

export interface GalleryItem {
  id: number;
  src: string;
  title: string;
  category: string;
}

export const GALLERY_UPDATED_EVENT = 'drd-gallery-updated';

export const defaultGalleryImages: GalleryItem[] = [
  { id: 1, src: img1, title: 'French Beans', category: 'Vegetable' },
  { id: 2, src: img2, title: 'Okra (Bhendi)', category: 'Vegetable' },
  { id: 3, src: img3, title: 'Bitter Gourd', category: 'Vegetable' },
  { id: 4, src: img4, title: 'Bottle Gourd', category: 'Vegetable' },
  { id: 5, src: img5, title: 'Hot Chilli', category: 'Vegetable' },
  { id: 6, src: img6, title: 'Green Cucumber', category: 'Vegetable' },
  { id: 7, src: img7, title: 'Sweet Muskmelon', category: 'Fruit' },
  { id: 8, src: img8, title: 'Red Tomato', category: 'Vegetable' },
  { id: 9, src: img9, title: 'Juicy Watermelon', category: 'Fruit' },
  { id: 10, src: img10, title: 'Premium Hybrids', category: 'Research' },
];

const STORAGE_KEY = 'drd_gallery_items';

const readLocalGalleryItems = () => {
  if (typeof window === 'undefined') {
    return defaultGalleryImages;
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return defaultGalleryImages;
    }

    const parsed = JSON.parse(stored) as GalleryItem[];

    if (!Array.isArray(parsed) || parsed.length === 0) {
      return defaultGalleryImages;
    }

    return parsed;
  } catch {
    return defaultGalleryImages;
  }
};

const writeLocalGalleryItems = (items: GalleryItem[]) => {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event(GALLERY_UPDATED_EVENT));
    return true;
  } catch {
    return false;
  }
};

const normalizeGalleryItem = (item: any): GalleryItem | null => {
  const id = Number(item?.id);
  const src = item?.image ?? item?.src;
  const title = item?.title;

  if (!Number.isFinite(id) || !src || !title) {
    return null;
  }

  return {
    id,
    src,
    title,
    category: item?.description?.trim?.() || item?.category?.trim?.() || 'Gallery',
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

    if (items.length === 0) {
      return defaultGalleryImages;
    }

    writeLocalGalleryItems(items);
    return items;
  } catch {
    return readLocalGalleryItems();
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
