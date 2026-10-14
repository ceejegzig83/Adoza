# GYB Official Digital Platform
## Alhaji Yahaya Adoza Bello — Public Service Record (2016–2024) & Kogi Central Senatorial Engagement

A modern, responsive, and accessible web application designed to document the public service legacy of Alhaji Yahaya Adoza Bello (Executive Governor of Kogi State, 2016–2024), communicate his proposed senatorial priorities for Kogi Central Senatorial District, and provide digital infrastructure for constituent engagement and grassroots volunteer coordination.

---

## 1. Design System & Brand Identity

- **Colors:**
  - APC-Inspired Green: `#008751` (primary action points, CTAs)
  - Deep Emerald: `#064E3B` (navigation, hero surfaces, footer)
  - Forest Green: `#0B6B46` (interactive hover states)
  - Campaign Gold: `#D4AF37` (restrained borders, icon accents, monograms)
  - Warm Off-White: `#F8F7F2` (primary page field)
  - Crisp Navy: `#102A43` (typography & section titles)
- **Typography:**
  - Headings: `Montserrat` (weights 600, 700, 800)
  - Body Copy: `Inter` (weights 400, 500, 600, 700)
- **Design Constitution Compliance:**
  - Strict 3-zone Top Bar Contract (`[Brand Wordmark] — [Nav Links] — [Primary Action]`)
  - Zero-Pill metadata discipline (unboxed text metadata with typographic separators `·`)
  - No thick left accent borders (`border-l-4`) or artificial code-comment titles
  - WCAG 2.2 Level AA accessibility compliance with visible focus outlines and screen-reader dialogs
  - Authentic dignity standards: No AI-fabricated photographs of real people; elegant monogram crests and architectural vectors used for placeholders.

---

## 2. Information Architecture & Section Flow

The website implements all 12 core sections in the exact order specified:

1. **Announcement Bar:** Official platform notice and rapid constituent anchor links.
2. **Sticky Navigation:** 3-zone top bar contract, responsive drawer menu with focus trapping and escape dismissal.
3. **Hero Section:** 55% narrative / 45% executive portrait split, verified stewardship milestones strip (2016–2024 tenure, 5 LGAs, 6 Pillars).
4. **Executive Biography & Timeline:** "The Man Behind the Public Record", complete constitutional tenure history (2016–2024), and an interactive 5-stage timeline from 2015 inauguration to 2024 democratic handover to Gov. Usman Ododo.
5. **The GYB Legacy (2016–2024):** 3-column responsive card grid covering 6 key historical domains (Reference Hospital Okene, Ganaja Flyover, Operation Total Freedom security doctrine, CUSTECH Osara STEM university, 100% female LGA Vice Chairpersons affirmative policy, and World Bank SFTAS fiscal awards). Accessible `LegacyModal` with official citations.
6. **Kogi Central Senatorial Vision:** 5-LGA interactive switcher (Adavi, Ajaokuta, Ogori-Magongo, Okehi, Okene) displaying local economic profiles paired with 6 legislative policy pillars. Accessible `PolicyModal` clarifying constitutional oversight powers.
7. **Facebook & Live Media Feed:** Supports 3 switchable operational modes (`CURATED_FEED`, `FACEBOOK_EMBED`, and `PLACEHOLDER`), alongside a high-performance click-to-play video showcase.
8. **News & Press Center:** Featured article dispatch, live keyword search, 5 category filters, and accessible `NewsModal` reader.
9. **Media & Archival Gallery:** Category-filtered photo and broadcast archive with an accessible modal lightbox.
10. **Supporter & Volunteer Hub:** 3 interactive cards with validated forms:
    - Volunteer Registration (`VolunteerModal`)
    - Collateral Requisition (`MaterialsRequestModal`)
    - Constituent Casework (`CommunityRequestModal`)
    - Compliant with the *Nigeria Data Protection Act (NDPA 2023)* and logs to local storage for administrative inspection.
11. **Contact & Secretariat Section:** Verified office addresses in Okene and Lokoja, specialized email desks, and an interactive contact dispatch form.
12. **Footer & Legal Modals:** Deep emerald layout with quick navigation links, dynamic copyright year, electoral disclaimer, and modal viewers for Privacy, Terms, and Accessibility.
13. **Campaign Secretariat Console (Admin Demo):** Interactive management console accessible via header/footer for campaign staff to review submitted registrations, community voice requests, and dispatch logs.

---

## 3. Technology Stack

- **Frontend:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **Icons:** Lucide React
- **Motion:** Motion library

---

## 4. Development & Build Commands

```bash
# Start development server
npm run dev

# Run TypeScript validation / lint
npm run lint

# Build production bundle
npm run build

# Preview production build
npm run preview
```

---

## 5. Environment Configuration

Copy `.env.example` to `.env` and configure:

```ini
VITE_FACEBOOK_PAGE_URL="https://www.facebook.com/AlhajiYahayaBelloOfficial"
VITE_CAMPAIGN_API_URL="/api"
```
