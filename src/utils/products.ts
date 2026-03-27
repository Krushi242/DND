import { getApiUrl } from './api';

export interface ProductVariantItem {
  id: number;
  title: string;
  image: string;
  description: string;
}

export interface ProductItem {
  id: number;
  name: string;
  variants: ProductVariantItem[];
  createdAt: string;
}

export interface ProductVariantPayload {
  title: string;
  image: string;
  description: string;
}

export interface ProductPayload {
  name: string;
  variants: ProductVariantPayload[];
}

const normalizeVariant = (item: unknown): ProductVariantItem | null => {
  const data = item as Record<string, unknown>;
  const id = Number(data?.id);
  const title = (data?.title as string)?.trim?.();
  const image = (data?.image as string)?.trim?.() || '';
  const description = (data?.description as string)?.trim?.() || '';

  if (!Number.isFinite(id) || !title) {
    return null;
  }

  return {
    id,
    title,
    image,
    description,
  };
};

const normalizeProduct = (item: unknown): ProductItem | null => {
  const data = item as Record<string, unknown>;
  const id = Number(data?.id);
  const name = (data?.name as string)?.trim?.();
  const createdAt = (data?.created_at as string) ?? (data?.createdAt as string) ?? '';
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
    variants: rawVariants
      .map(normalizeVariant)
      .filter((variant: ProductVariantItem | null): variant is ProductVariantItem => variant !== null),
  };
};

export const getProductItems = async () => {
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

  return data
    .map(normalizeProduct)
    .filter((item): item is ProductItem => item !== null);
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
  return normalizeProduct(data);
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
  return normalizeProduct(data);
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

  return true;
};
