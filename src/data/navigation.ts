export interface NavItem {
  label: string;
  href: string;
}

export const MAIN_NAV_ITEMS: NavItem[] = [
  { label: 'About GYB', href: '#about' },
  { label: 'Legacy (2016–2024)', href: '#legacy' },
  { label: 'Senatorial Vision', href: '#agenda' },
  { label: 'Media & Updates', href: '#media-feed' },
  { label: 'News & Press', href: '#news' },
  { label: 'Contact', href: '#contact' },
];

export const FOOTER_NAV_COLUMNS = [
  {
    title: 'Explore Record',
    links: [
      { label: 'Executive Biography', href: '#about' },
      { label: 'Documented Legacy (2016–2024)', href: '#legacy' },
      { label: 'Healthcare & Hospital Milestones', href: '#legacy' },
      { label: 'Public Infrastructure Projects', href: '#legacy' },
      { label: 'Institutional Fiscal Reforms', href: '#legacy' },
    ],
  },
  {
    title: 'Kogi Central Vision',
    links: [
      { label: 'Adavi Priority Framework', href: '#agenda' },
      { label: 'Ajaokuta Industrial Advocacy', href: '#agenda' },
      { label: 'Ogori-Magongo Development', href: '#agenda' },
      { label: 'Okehi Enterprise & Minerals', href: '#agenda' },
      { label: 'Okene Urban & Commercial Hub', href: '#agenda' },
    ],
  },
  {
    title: 'Citizen Engagement',
    links: [
      { label: 'Register as Volunteer', href: '#supporter-hub' },
      { label: 'Request Campaign Materials', href: '#supporter-hub' },
      { label: 'Submit Community Issue', href: '#supporter-hub' },
      { label: 'Press & Media Center', href: '#news' },
      { label: 'Constituency Liaison Office', href: '#contact' },
    ],
  },
];
