import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Boxes,
  Edit3,
  Hash,
  Italic,
  List,
  ListOrdered,
  Plus,
  Quote,
  Trash2,
  Underline,
  X,
} from 'lucide-react';
import ProductRichText from '../common/ProductRichText';
import type { ProductItem, ProductPayload } from '../../utils/products';

type ProductFormVariant = ProductPayload['variants'][number];

interface AdminProductsSectionProps {
  productItems: ProductItem[];
  productForm: ProductPayload;
  isAddModalOpen: boolean;
  productError: string | null;
  isLoading: boolean;
  isSaving: boolean;
  isEditing: boolean;
  onProductNameChange: (value: string) => void;
  onProductOrderChange: (value: number) => void;
  onProductStatusToggle: () => void;
  onVariantFieldChange: (index: number, field: keyof ProductFormVariant, value: string | number | undefined) => void;
  onAddVariant: () => void;
  onRemoveVariant: (index: number) => void;
  onSubmit: (e: React.FormEvent) => void;
  onRequestEdit: (item: ProductItem) => void;
  onRequestStatusChange: (item: ProductItem, isActive: boolean) => void;
  onQuickOrderSave: (item: ProductItem, displayOrder: number) => void;
  onOpenModal: () => void;
  onCloseModal: () => void;
}

const toolbarButtons: Array<{
  label: string;
  icon: React.ComponentType<{ size?: string | number }>;
  command: string;
  value?: string;
}> = [
  { label: 'Bold', icon: Bold, command: 'bold' },
  { label: 'Italic', icon: Italic, command: 'italic' },
  { label: 'Underline', icon: Underline, command: 'underline' },
  { label: 'Bullets', icon: List, command: 'insertUnorderedList' },
  { label: 'Numbered', icon: ListOrdered, command: 'insertOrderedList' },
  { label: 'Quote', icon: Quote, command: 'formatBlock', value: 'blockquote' },
  { label: 'Left', icon: AlignLeft, command: 'justifyLeft' },
  { label: 'Center', icon: AlignCenter, command: 'justifyCenter' },
  { label: 'Right', icon: AlignRight, command: 'justifyRight' },
  { label: 'Justify', icon: AlignJustify, command: 'justifyFull' },
];

const StatusBadge: React.FC<{ isActive: boolean }> = ({ isActive }) => (
  <span
    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
      isActive ? 'bg-[#005948]/10 text-[#005948]' : 'bg-[#64748B]/10 text-[#64748B]'
    }`}
  >
    {isActive ? 'Active' : 'Hidden'}
  </span>
);

const ToggleButton: React.FC<{
  isActive: boolean;
  onClick: () => void;
  activeLabel?: string;
  hiddenLabel?: string;
}> = ({ isActive, onClick, activeLabel = 'Active', hiddenLabel = 'Hide' }) => (
  <button
    type="button"
    onClick={onClick}
    className={`inline-flex min-w-[88px] items-center justify-center rounded-[10px] border px-4 py-2 text-sm font-medium transition-colors ${
      isActive
        ? 'border-[#CFE2DB] bg-[#ECF7F3] text-[#005948] hover:bg-[#dff1ea]'
        : 'border-[#D9E2EC] bg-[#F8FAFC] text-[#64748B] hover:bg-[#eef2f7]'
    }`}
  >
    {isActive ? activeLabel : hiddenLabel}
  </button>
);

const sortProducts = (items: ProductItem[]) =>
  [...items].sort((first, second) => {
    if (first.displayOrder !== second.displayOrder) {
      return first.displayOrder - second.displayOrder;
    }

    return first.id - second.id;
  });

const sortVariants = (item: ProductItem) =>
  [...item.variants].sort((first, second) => {
    if (first.displayOrder !== second.displayOrder) {
      return first.displayOrder - second.displayOrder;
    }

    return first.id - second.id;
  });

const AdminProductsSection: React.FC<AdminProductsSectionProps> = ({
  productItems,
  productForm,
  isAddModalOpen,
  productError,
  isLoading,
  isSaving,
  isEditing,
  onProductNameChange,
  onProductOrderChange,
  onProductStatusToggle,
  onVariantFieldChange,
  onAddVariant,
  onRemoveVariant,
  onSubmit,
  onRequestEdit,
  onRequestStatusChange,
  onQuickOrderSave,
  onOpenModal,
  onCloseModal,
}) => {
  const editorRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [orderDrafts, setOrderDrafts] = useState<Record<number, string>>({});

  useEffect(() => {
    setOrderDrafts(
      Object.fromEntries(productItems.map((item) => [item.id, String(item.displayOrder)]))
    );
  }, [productItems]);

  const sortedItems = useMemo(() => sortProducts(productItems), [productItems]);

  const syncEditorContent = (index: number) => {
    const editor = editorRefs.current[index];

    if (!editor) {
      return;
    }

    onVariantFieldChange(index, 'description', editor.innerHTML);
  };

  const runCommand = (index: number, command: string, value?: string) => {
    const editor = editorRefs.current[index];

    if (!editor) {
      return;
    }

    editor.focus();
    document.execCommand(command, false, value);
    syncEditorContent(index);
  };

  const commitOrderDraft = (item: ProductItem) => {
    const currentDraft = orderDrafts[item.id];
    const nextValue = Number(currentDraft);

    if (!Number.isFinite(nextValue) || nextValue < 0) {
      setOrderDrafts((prev) => ({ ...prev, [item.id]: String(item.displayOrder) }));
      return;
    }

    if (nextValue !== item.displayOrder) {
      onQuickOrderSave(item, nextValue);
    }
  };

  return (
    <>
      <div className="overflow-hidden rounded-[10px] border border-[#E2E8F0] bg-white">
        <div className="flex flex-col gap-3 border-b border-[#E2E8F0] bg-[#F8FAFC] px-6 py-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="flex items-center gap-2 text-xl font-semibold text-[#1E293B]">
              <Boxes size={20} className="text-[#005948]" />
              Product Manager
            </h2>
            <p className="mt-1 text-sm text-[#64748B]">Manage product order, visibility, and variants that show on the Product1 page.</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex w-fit rounded-full bg-[#005948]/10 px-3 py-1 text-sm font-medium text-[#005948]">
              {productItems.length} Products
            </span>
            <button
              type="button"
              onClick={onOpenModal}
              className="inline-flex items-center gap-2 rounded-[10px] bg-[#F26A21] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#e05a12]"
            >
              <Plus size={16} />
              Add
            </button>
          </div>
        </div>

        <div className="p-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center gap-4 rounded-[10px] border border-dashed border-[#CBD5E1] bg-[#F8FAFC] px-6 py-12 text-center text-[#64748B]">
              <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-[#005948]"></div>
              <p>Loading products...</p>
            </div>
          ) : sortedItems.length === 0 ? (
            <div className="rounded-[10px] border border-dashed border-[#CBD5E1] bg-[#F8FAFC] px-6 py-12 text-center text-[#64748B]">
              No products found.
            </div>
          ) : (
            <div className="space-y-4">
              {sortedItems.map((item) => (
                <div key={item.id} className="rounded-[10px] border border-[#E2E8F0] bg-white p-5">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-lg font-semibold text-[#1E293B]">{item.name}</h3>
                        <StatusBadge isActive={item.isActive} />
                      </div>
                      <p className="text-sm text-[#64748B]">{item.variants.length} variant blocks</p>
                      <p className="text-xs text-[#94A3B8]">Lower display order shows first on the public website.</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="group flex items-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] pl-2.5 pr-1 py-1 text-xs font-bold text-[#64748B] transition-all hover:border-[#CBD5E1] hover:bg-white">
                        <div className="flex items-center gap-1 opacity-70">
                          <Hash size={13} strokeWidth={2.5} />
                          <span>ORDER</span>
                        </div>
                        <input
                          type="number"
                          min="0"
                          value={orderDrafts[item.id] ?? item.displayOrder}
                          onChange={(e) =>
                            setOrderDrafts((prev) => ({ ...prev, [item.id]: e.target.value }))
                          }
                          onBlur={() => commitOrderDraft(item)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              commitOrderDraft(item);
                            }
                          }}
                          className="w-12 bg-transparent text-center text-sm font-bold text-[#1E293B] focus:outline-none"
                        />
                      </div>
                      <ToggleButton
                        isActive={item.isActive}
                        onClick={() => onRequestStatusChange(item, !item.isActive)}
                        activeLabel="Active"
                        hiddenLabel="Hidden"
                      />
                      <button
                        type="button"
                        onClick={() => onRequestEdit(item)}
                        className="inline-flex items-center gap-2 rounded-[10px] border border-[#D9E2EC] px-3 py-2 text-sm font-medium text-[#475569] transition-colors hover:bg-gray-50"
                      >
                        <Edit3 size={16} />
                        Edit
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-4 xl:grid-cols-2">
                    {sortVariants(item).map((variant) => (
                      <div key={variant.id} className="overflow-hidden rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC]">
                        {variant.image ? (
                          <div className="aspect-[4/3] bg-white">
                            <img src={variant.image} alt={variant.title} className="h-full w-full object-contain" />
                          </div>
                        ) : null}
                        <div className="space-y-3 p-4">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="text-base font-semibold text-[#1E293B]">{variant.title}</h4>
                            <StatusBadge isActive={variant.isActive} />
                            <div className="inline-flex items-center gap-1 rounded-full bg-[#F26A21]/5 border border-[#F26A21]/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#F26A21]">
                              <Hash size={11} strokeWidth={3} />
                              <span>Pos {variant.displayOrder}</span>
                            </div>
                          </div>
                          <ProductRichText content={variant.description} className="text-sm leading-6 text-[#64748B]" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 z-[120] overflow-y-auto bg-[#0f172a]/55 p-4">
          <div className="flex min-h-full items-center justify-center py-6">
            <div className="flex w-full max-w-[760px] max-h-[min(860px,calc(100vh-3rem))] flex-col overflow-hidden rounded-[10px] border border-[#DDE7E3] bg-white shadow-[0_30px_80px_rgba(15,23,42,0.22)]">
              <div className="flex items-center justify-between border-b border-[#E2E8F0] px-6 py-5">
                <div>
                  <h3 className="text-xl font-semibold text-[#1E293B]">{isEditing ? 'Edit Product' : 'Add Product'}</h3>
                  <p className="mt-1 text-sm text-[#64748B]">
                    {isEditing ? 'Update saved products, visibility, and variant ordering.' : 'Create one product and add one or more variant content blocks.'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onCloseModal}
                  className="rounded-full p-2 text-[#64748B] transition-colors hover:bg-[#F1F5F9] hover:text-[#1E293B]"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={onSubmit} className="flex min-h-0 flex-1 flex-col">
                <div className="min-h-0 flex-1 space-y-5 overflow-y-auto p-6">
                    <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_160px_auto]">
                      <div>
                        <label htmlFor="product-name" className="mb-2 block text-sm font-medium text-[#334155]">Product Name</label>
                        <input
                          id="product-name"
                          type="text"
                          value={productForm.name}
                          onChange={(e) => onProductNameChange(e.target.value)}
                          className="w-full rounded-[10px] border border-[#CBD5E1] bg-white px-4 py-3 text-sm text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#005948]/20"
                          placeholder="Tomato"
                        />
                      </div>

                      <div>
                        <label htmlFor="product-order" className="mb-2 block text-sm font-medium text-[#334155]">Display Position</label>
                        <div className="flex items-center gap-2 rounded-[10px] border border-[#CBD5E1] bg-white px-3 py-2.5 transition-shadow focus-within:ring-2 focus-within:ring-[#005948]/20">
                          <Hash size={16} className="text-[#94A3B8]" />
                          <input
                            id="product-order"
                            type="number"
                            min="0"
                            value={productForm.display_order}
                            onChange={(e) => onProductOrderChange(Number(e.target.value) || 0)}
                            className="w-full bg-transparent text-sm font-medium text-[#1E293B] focus:outline-none"
                          />
                        </div>
                        <p className="mt-1.5 text-[10px] font-medium uppercase tracking-tight text-[#94A3B8]">Lower appears first</p>
                      </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-[#334155]">Status</label>
                      <ToggleButton
                        isActive={productForm.is_active === 1}
                        onClick={onProductStatusToggle}
                        activeLabel="Active"
                        hiddenLabel="Hidden"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    {productForm.variants.map((variant, index) => (
                      <div key={variant.id ?? index} className="rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                        <div className="mb-4 flex items-center justify-between gap-3">
                          <h4 className="text-base font-semibold text-[#1E293B]">Variant {index + 1}</h4>
                          {productForm.variants.length > 1 ? (
                            <button
                              type="button"
                              onClick={() => onRemoveVariant(index)}
                              className="inline-flex items-center gap-2 rounded-[10px] border border-[#F3D8CD] px-3 py-2 text-sm font-medium text-[#B45309] transition-colors hover:bg-[#FFF7ED]"
                            >
                              <Trash2 size={16} />
                              Remove Variant
                            </button>
                          ) : null}
                        </div>

                        <div className="grid gap-4">
                          <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_160px_auto]">
                            <div>
                              <label className="mb-2 block text-sm font-medium text-[#334155]">Variant Title</label>
                              <input
                                type="text"
                                value={variant.title}
                                onChange={(e) => onVariantFieldChange(index, 'title', e.target.value)}
                                className="w-full rounded-[10px] border border-[#CBD5E1] bg-white px-4 py-3 text-sm text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#005948]/20"
                                placeholder="DRD 101 (Premium Hybrid)"
                              />
                            </div>

                            <div>
                              <label className="mb-2 block text-sm font-medium text-[#334155]">Sort Position</label>
                              <div className="flex items-center gap-2 rounded-[10px] border border-[#CBD5E1] bg-white px-3 py-2.5 transition-shadow focus-within:ring-2 focus-within:ring-[#005948]/20">
                                <Hash size={16} className="text-[#94A3B8]" />
                                <input
                                  type="number"
                                  min="0"
                                  value={variant.display_order}
                                  onChange={(e) => onVariantFieldChange(index, 'display_order', Number(e.target.value) || 0)}
                                  className="w-full bg-transparent text-sm font-medium text-[#1E293B] focus:outline-none"
                                />
                              </div>
                              <p className="mt-1.5 text-[10px] font-medium uppercase tracking-tight text-[#94A3B8]">Rank in this product</p>
                            </div>

                            <div>
                              <label className="mb-2 block text-sm font-medium text-[#334155]">Status</label>
                              <ToggleButton
                                isActive={variant.is_active === 1}
                                onClick={() =>
                                  onVariantFieldChange(index, 'is_active', variant.is_active === 1 ? 0 : 1)
                                }
                                activeLabel="Active"
                                hiddenLabel="Hidden"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="mb-2 block text-sm font-medium text-[#334155]">Image URL</label>
                            <input
                              type="url"
                              value={variant.image}
                              onChange={(e) => onVariantFieldChange(index, 'image', e.target.value)}
                              className="w-full rounded-[10px] border border-[#CBD5E1] bg-white px-4 py-3 text-sm text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#005948]/20"
                              placeholder="https://example.com/product-image.jpg"
                            />
                          </div>

                          {variant.image ? (
                            <div className="overflow-hidden rounded-[10px] border border-[#E2E8F0] bg-white">
                              <div className="aspect-[4/3] p-3">
                                <img src={variant.image} alt={variant.title || `Variant ${index + 1}`} className="h-full w-full object-contain" />
                              </div>
                            </div>
                          ) : null}

                          <div>
                            <label className="mb-2 block text-sm font-medium text-[#334155]">Description</label>
                            <div className="overflow-hidden rounded-[10px] border border-[#CBD5E1] bg-white">
                              <div className="flex flex-wrap items-center gap-1 border-b border-[#E2E8F0] bg-[#F8FAFC] p-2">
                                {toolbarButtons.map((button) => {
                                  const Icon = button.icon;

                                  return (
                                    <button
                                      key={button.label}
                                      type="button"
                                      title={button.label}
                                      onClick={() => runCommand(index, button.command, button.value)}
                                      className="inline-flex h-9 w-9 items-center justify-center rounded-[8px] text-[#475569] transition-colors hover:bg-white hover:text-[#1E293B]"
                                    >
                                      <Icon size={16} />
                                    </button>
                                  );
                                })}
                              </div>

                              <div
                                ref={(element) => {
                                  editorRefs.current[index] = element;
                                }}
                                contentEditable
                                suppressContentEditableWarning
                                onInput={() => syncEditorContent(index)}
                                className="min-h-[180px] max-h-[260px] overflow-y-auto px-4 py-3 text-left text-sm text-[#1E293B] [direction:ltr] focus:outline-none [&_blockquote]:my-0 [&_blockquote]:border-l-4 [&_blockquote]:border-[#D9E2EC] [&_blockquote]:pl-4 [&_div]:my-0 [&_div]:min-h-[1.5rem] [&_li]:ml-2 [&_ol]:my-0 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:my-0 [&_p]:min-h-[1.5rem] [&_ul]:my-0 [&_ul]:list-disc [&_ul]:pl-5"
                                dangerouslySetInnerHTML={{ __html: variant.description || '<p><br></p>' }}
                              />
                            </div>
                            <p className="mt-2 text-xs text-[#64748B]">
                              Use the toolbar to style text like bold, italic, bullet list, numbered list, quote, and alignment.
                            </p>
                          </div>

                          {variant.description.trim() ? (
                            <div className="rounded-[10px] border border-[#E2E8F0] bg-white p-4">
                              <div className="mb-3 flex flex-wrap items-center gap-3">
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#94A3B8]">Preview Content</p>
                                <StatusBadge isActive={variant.is_active === 1} />
                                <div className="inline-flex items-center gap-1 rounded-full bg-[#F26A21]/5 border border-[#F26A21]/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#F26A21]">
                                  <Hash size={11} strokeWidth={3} />
                                  <span>Pos {variant.display_order}</span>
                                </div>
                              </div>
                              <ProductRichText content={variant.description} className="text-sm leading-6 text-[#475569]" />
                            </div>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={onAddVariant}
                    className="inline-flex items-center gap-2 rounded-[10px] border border-[#D9E2EC] bg-white px-4 py-3 text-sm font-medium text-[#475569] transition-colors hover:bg-gray-50"
                  >
                    <Plus size={16} />
                    Add Variant Block
                  </button>

                  {productError && (
                    <div className="rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                      {productError}
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-end gap-3 border-t border-[#E2E8F0] bg-white px-6 py-4">
                  <button
                    type="button"
                    onClick={onCloseModal}
                    disabled={isSaving}
                    className="rounded-[10px] border border-[#D9E2EC] bg-white px-4 py-3 text-sm font-medium text-[#475569] transition-colors hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="inline-flex items-center gap-2 rounded-[10px] bg-[#F26A21] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#e05a12]"
                  >
                    {isSaving ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-b-2 border-white"></span>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Plus size={16} />
                        {isEditing ? 'Update Product' : 'Add Product'}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminProductsSection;
