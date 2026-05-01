import type { CartItem, Product, SizeVariant } from '@/types';

export interface ProductSelection {
  color: string;
  size: string;
  variant?: SizeVariant;
}

function getVariants(product: Product) {
  return product.variants ?? [];
}

export function getProductColors(product: Product): string[] {
  return getVariants(product).map(variant => variant.color);
}

export function getProductSizes(product: Product, color?: string): string[] {
  const variants = color
    ? getVariants(product).filter(variant => variant.color === color)
    : getVariants(product);

  return Array.from(new Set(variants.flatMap(variant => variant.sizes.map(size => size.size))));
}

export function getAllProductSizes(product: Product): SizeVariant[] {
  return getVariants(product).flatMap(variant => variant.sizes);
}

export function getDefaultProductSelection(product: Product): ProductSelection {
  const variants = getVariants(product);
  const inStockVariant = variants.find(variant => variant.sizes.some(size => size.stock > 0));
  const colorVariant = inStockVariant ?? variants[0];
  const sizeVariant = colorVariant?.sizes.find(size => size.stock > 0) ?? colorVariant?.sizes[0];

  return {
    color: colorVariant?.color ?? 'Default',
    size: sizeVariant?.size ?? 'One Size',
    variant: sizeVariant,
  };
}

export function getSelectedProductSelection(product: Product, color?: string, size?: string): ProductSelection {
  const fallback = getDefaultProductSelection(product);
  const variants = getVariants(product);
  const colorVariant = variants.find(variant => variant.color === color) ?? variants[0];
  const sizeVariant =
    colorVariant?.sizes.find(sizeVariant => sizeVariant.size === size) ??
    colorVariant?.sizes.find(sizeVariant => sizeVariant.stock > 0) ??
    colorVariant?.sizes[0] ??
    fallback.variant;

  return {
    color: colorVariant?.color ?? fallback.color,
    size: sizeVariant?.size ?? fallback.size,
    variant: sizeVariant,
  };
}

export function getProductImages(product: Product, color?: string, size?: string): string[] {
  const selected = getSelectedProductSelection(product, color, size);
  const selectedImages = selected.variant ? getVariants(product).find(v => v.color === selected.color)?.images.filter(Boolean) ?? [] : [];
  const allImages = Array.from(
    new Set(
      getVariants(product).flatMap(variant => variant.images.filter(Boolean))
    )
  );

  return selectedImages.length > 0 ? selectedImages : allImages;
}

export function getProductPrimaryImage(product: Product, color?: string, size?: string): string {
  return getProductImages(product, color, size)[0] ?? '/placeholder.png';
}

export function getProductDisplayVariant(product: Product): SizeVariant | undefined {
  return getDefaultProductSelection(product).variant;
}

export function getProductMinPrice(product: Product): number {
  const prices = getAllProductSizes(product).map(variant => variant.price);
  return prices.length > 0 ? Math.min(...prices) : 0;
}

export function isProductInStock(product: Product): boolean {
  return getAllProductSizes(product).some(variant => variant.stock > 0);
}

export function getCartItemVariant(item: CartItem): SizeVariant | undefined {
  return getSelectedProductSelection(item.product, item.selectedColor, item.selectedSize).variant;
}
