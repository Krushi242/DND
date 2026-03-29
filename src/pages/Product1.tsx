import React, { useEffect, useMemo, useState } from 'react';
import PageBanner from '../components/sections/PageBanner';
import aboutBg from '../assets/images/about_bg.webp';
import ProductShowcase from '../components/common/ProductShowcase';
import CTA from '../components/sections/CTA';
import FAQ from '../components/sections/FAQ';
import ContactForm from '../components/sections/ContactForm';
import SEO from '../components/common/SEO';
import {
  getCachedProductItems,
  getFreshProductItems,
  getProductItems,
  PRODUCTS_UPDATED_EVENT,
} from '../utils/products';
import type { ProductItem } from '../utils/products';

const Product1: React.FC = () => {
  const initialProducts = useMemo(() => getCachedProductItems(), []);
  const [products, setProducts] = useState<ProductItem[]>(initialProducts);
  const [isLoading, setIsLoading] = useState(() => initialProducts.length === 0);
  const [error, setError] = useState<string | null>(null);
  const visibleProducts = useMemo(
    () =>
      [...products]
        .filter((product) => product.isActive)
        .sort((first, second) => {
          if (first.displayOrder !== second.displayOrder) {
            return first.displayOrder - second.displayOrder;
          }

          return first.id - second.id;
        })
        .map((product) => ({
          ...product,
          variants: [...product.variants]
            .filter((variant) => variant.isActive)
            .sort((first, second) => {
              if (first.displayOrder !== second.displayOrder) {
                return first.displayOrder - second.displayOrder;
              }

              return first.id - second.id;
            }),
        }))
        .filter((product) => product.variants.length > 0),
    [products]
  );

  useEffect(() => {
    let isMounted = true;
    const hasCachedProducts = initialProducts.length > 0;

    const loadProducts = async (forceRefresh = false, showLoader = !hasCachedProducts) => {
      if (showLoader) {
        setIsLoading(true);
      }

      try {
        const items = forceRefresh ? await getFreshProductItems() : await getProductItems();

        if (isMounted) {
          setProducts(items);
          setError(null);
        }
      } catch (err: unknown) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Unable to load products.');
        }
      } finally {
        if (isMounted && showLoader) {
          setIsLoading(false);
        }
      }
    };

    void loadProducts(false, !hasCachedProducts);

    const syncProducts = () => {
      void loadProducts(true, false);
    };

    const syncProductsOnVisible = () => {
      if (document.visibilityState === 'visible') {
        syncProducts();
      }
    };

    window.addEventListener(PRODUCTS_UPDATED_EVENT, syncProducts);
    window.addEventListener('focus', syncProducts);
    document.addEventListener('visibilitychange', syncProductsOnVisible);

    return () => {
      isMounted = false;
      window.removeEventListener(PRODUCTS_UPDATED_EVENT, syncProducts);
      window.removeEventListener('focus', syncProducts);
      document.removeEventListener('visibilitychange', syncProductsOnVisible);
    };
  }, [initialProducts]);

  return (
    <>
      <SEO
        title="Vegetable Seeds"
        description="Explore DRD Plantech LLP vegetable seed hybrids including tomato, okra, bitter gourd, bottle gourd, watermelon, muskmelon, cucumber, chilli, and beans."
        path="/Vegetable Seeds"
        keywords="vegetable seeds India, tomato hybrid seeds, okra seeds, chilli seeds, cucumber seeds, DRD Plantech LLP products"
      />
      <PageBanner title="Our Vegetable Seeds" backgroundImage={aboutBg} />

      {isLoading ? (
        <section className="bg-[#FAFAF9] py-[60px] md:py-[100px]">
          <div className="mx-auto flex max-w-[1280px] flex-col items-center px-4 text-center sm:px-6 lg:px-8">
            <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-[#005948]"></div>
            <p className="mt-4 text-[16px] text-[#5F6B6D]">Loading products...</p>
          </div>
        </section>
      ) : visibleProducts.length === 0 ? (
        <section className="bg-[#FAFAF9] py-[60px] md:py-[100px]">
          <div className="mx-auto max-w-[1280px] px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-[28px] font-medium text-[#1F1F1F]">
              {error ? 'Products could not be loaded.' : 'No products available right now.'}
            </h2>
            {error ? (
              <p className="mt-4 text-[16px] text-[#5F6B6D]">
                {error}. Please try again in a moment.
              </p>
            ) : null}
          </div>
        </section>
      ) : (
        visibleProducts.map((product, index) => (
          <ProductShowcase
            key={product.id}
            title={product.name}
            image={product.variants[0]?.image || ''}
            reverse={index % 2 === 1}
            theme={index % 2 === 1 ? 'alternate' : 'default'}
            variants={product.variants.map((variant) => ({
              name: variant.title,
              image: variant.image,
              description: variant.description,
              features: [],
            }))}
          />
        ))
      )}

      <CTA
        tagText="Become a Dealer Partner"
        title="Grow Your Business with a Trusted Seed Brand"
        description="We offer strong product demand, reliable supply, and structured dealer support. Join our expanding distribution network and serve the growing agricultural market with confidence."
        buttonText="Apply for Dealership"
        buttonLink="/contact"
      />

      <FAQ />

      <ContactForm />
    </>
  );
};

export default Product1;
