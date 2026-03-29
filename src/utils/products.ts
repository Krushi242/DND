import { getApiUrl } from './api';

export interface ProductVariantItem {
  id: number;
  title: string;
  image: string;
  description: string;
  displayOrder: number;
  isActive: boolean;
}

export interface ProductItem {
  id: number;
  name: string;
  variants: ProductVariantItem[];
  createdAt: string;
  displayOrder: number;
  isActive: boolean;
}

export interface ProductVariantPayload {
  id?: number;
  title: string;
  image: string;
  description: string;
  display_order: number;
  is_active: number;
}

export interface ProductPayload {
  name: string;
  display_order: number;
  is_active: number;
  variants: ProductVariantPayload[];
}

export const PRODUCTS_UPDATED_EVENT = 'drd-products-updated';
const PRODUCTS_CACHE_KEY = 'drd-products-cache';

const normalizeVariant = (item: unknown): ProductVariantItem | null => {
  const data = item as Record<string, unknown>;
  const id = Number(data?.id);
  const title = (data?.title as string)?.trim?.();
  const image = (data?.image as string)?.trim?.() || '';
  const description = (data?.description as string)?.trim?.() || '';
  const displayOrder = Number((data?.display_order as number) ?? (data?.displayOrder as number) ?? 0);
  const isActiveValue = (data?.is_active as number | boolean) ?? (data?.isActive as number | boolean);

  if (!Number.isFinite(id) || !title) {
    return null;
  }

  return {
    id,
    title,
    image,
    description,
    displayOrder: Number.isFinite(displayOrder) ? displayOrder : 0,
    isActive: typeof isActiveValue === 'boolean' ? isActiveValue : Number(isActiveValue ?? 1) === 1,
  };
};

const normalizeProduct = (item: unknown): ProductItem | null => {
  const data = item as Record<string, unknown>;
  const id = Number(data?.id);
  const name = (data?.name as string)?.trim?.();
  const createdAt = (data?.created_at as string) ?? (data?.createdAt as string) ?? '';
  const displayOrder = Number((data?.display_order as number) ?? (data?.displayOrder as number) ?? 0);
  const isActiveValue = (data?.is_active as number | boolean) ?? (data?.isActive as number | boolean);
  const rawVariants = Array.isArray(data?.variants)
    ? data.variants
    : Array.isArray(data?.product_variants)
      ? data.product_variants
      : Array.isArray(data?.items)
        ? data.items
        : [];

  if (!Number.isFinite(id) || !name) {
    return null;
  }

  return {
    id,
    name,
    createdAt,
    displayOrder: Number.isFinite(displayOrder) ? displayOrder : 0,
    isActive: typeof isActiveValue === 'boolean' ? isActiveValue : Number(isActiveValue ?? 1) === 1,
    variants: rawVariants
      .map(normalizeVariant)
      .filter((variant: ProductVariantItem | null): variant is ProductVariantItem => variant !== null),
  };
};

export const getCachedProductItems = () => {
  const cached = typeof window !== 'undefined' ? window.sessionStorage.getItem(PRODUCTS_CACHE_KEY) : null;

  if (cached) {
    try {
      const parsed = JSON.parse(cached) as unknown[];
      return parsed
        .map(normalizeProduct)
        .filter((product): product is ProductItem => product !== null);
    } catch {
      if (typeof window !== 'undefined') {
        window.sessionStorage.removeItem(PRODUCTS_CACHE_KEY);
      }
    }
  }

  return [];
};

export const getProductItems = async () => {
  const cachedItems = getCachedProductItems();

  if (cachedItems.length > 0) {
    return cachedItems;
  }

  return getFreshProductItems();
};

export const getFreshProductItems = async () => {
  const response = await fetch(getApiUrl('/api/products'), {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.status}`);
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    throw new Error('Invalid products response');
  }

  const items = data
    .map(normalizeProduct)
    .filter((item): item is ProductItem => item !== null);

  if (typeof window !== 'undefined') {
    window.sessionStorage.setItem(PRODUCTS_CACHE_KEY, JSON.stringify(items));
  }

  return items;
};

export const createProductItem = async (item: ProductPayload) => {
  const response = await fetch(getApiUrl('/api/products'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(item),
  });

  if (!response.ok) {
    throw new Error('Failed to save product.');
  }

  const data = await response.json().catch(() => null);
  const normalizedItem = normalizeProduct(data);

  if (typeof window !== 'undefined') {
    window.sessionStorage.removeItem(PRODUCTS_CACHE_KEY);
    window.dispatchEvent(new Event(PRODUCTS_UPDATED_EVENT));
  }

  return normalizedItem;
};

export const updateProductItem = async (id: number, item: ProductPayload) => {
  const response = await fetch(getApiUrl(`/api/products/${id}`), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(item),
  });

  if (!response.ok) {
    throw new Error('Failed to update product.');
  }

  const data = await response.json().catch(() => null);
  const normalizedItem = normalizeProduct(data);

  if (typeof window !== 'undefined') {
    window.sessionStorage.removeItem(PRODUCTS_CACHE_KEY);
    window.dispatchEvent(new Event(PRODUCTS_UPDATED_EVENT));
  }

  return normalizedItem;
};

export const removeProductItem = async (id: number) => {
  const response = await fetch(getApiUrl(`/api/products?id=${id}`), {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete product.');
  }

  if (typeof window !== 'undefined') {
    window.sessionStorage.removeItem(PRODUCTS_CACHE_KEY);
    window.dispatchEvent(new Event(PRODUCTS_UPDATED_EVENT));
  }

  return true;
};
