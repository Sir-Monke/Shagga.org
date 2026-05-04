/**
 * Image Manifest
 * --------------
 * Tell the app how many images exist in each folder.
 * Drop your images into the matching folders, named 1.jpg, 2.jpg, ... N.jpg
 *
 * /public/images/products/   → "for sale" popup ads
 * /public/images/shaggas/    → "in your area" popups
 *
 * If your images are .png instead of .jpg, change the extension below.
 *
 * To test the site BEFORE adding your images, leave usePlaceholder = true.
 * Once you've dropped your real images in, set usePlaceholder = false.
 */

export const SHAGGA_IMAGES = {
  productsCount: 20,
  shaggasCount: 16,
  productsExt: 'jpg' as const,
  shaggasExt: 'jpg' as const,
  /** While true, just shows placeholder.svg. Flip to false once you've added real images. */
  usePlaceholder: false,
};

export function productsList(): string[] {
  if (SHAGGA_IMAGES.usePlaceholder) {
    return ['/images/products/placeholder.svg'];
  }
  return Array.from(
    { length: SHAGGA_IMAGES.productsCount },
    (_, i) => `/images/products/${i + 1}.${SHAGGA_IMAGES.productsExt}`
  );
}

export function shaggasList(): string[] {
  if (SHAGGA_IMAGES.usePlaceholder) {
    return ['/images/shaggas/placeholder.svg'];
  }
  return Array.from(
    { length: SHAGGA_IMAGES.shaggasCount },
    (_, i) => `/images/shaggas/${i + 1}.${SHAGGA_IMAGES.shaggasExt}`
  );
}
