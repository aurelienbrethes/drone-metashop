/**
 * This variables contains the legal infos pages slug registred in the WordPress database.
 * Thay are linked in the order page and used in pages/legal-infos/[slug].tsx
 */

export enum LegalPageSlug {
    TERMS_CONDITIONS_PAGE_SLUG = 'terms-and-conditions',
    PRIVACY_POLICY_PAGE_SLUG = 'privacy-policy',
}

export const legalPagesSlugs: string[] = Object.values(LegalPageSlug);
