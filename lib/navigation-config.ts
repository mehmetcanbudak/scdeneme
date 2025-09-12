export interface NavigationItem {
  href: string
  label: string
  ariaLabel?: string
}

export interface FooterSection {
  title: string
  links: Array<{
    href: string
    label: string
    external?: boolean
    ariaLabel?: string
    type?: 'link' | 'email' | 'tel'
  }>
}

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { href: "/hakkimizda", label: "HAKKIMIZDA", ariaLabel: "Hakkımızda sayfasına git" },
  { href: "/abonelik", label: "ABONELİK", ariaLabel: "Abonelik sayfasına git" },
  { href: "/tesisler", label: "TESİSLER", ariaLabel: "Tesisler sayfasına git" },
  { href: "/blog", label: "BLOG", ariaLabel: "Blog sayfasına git" },
  { href: "/iletisim", label: "İLETİŞİM", ariaLabel: "İletişim sayfasına git" },
]

export const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: "Ürünler",
    links: [
      { href: "/abonelik", label: "Abonelik" },
      { href: "/abonelik/taze-yesillikler-paketi", label: "Taze Yeşillikler Paketi" },
    ]
  },
  {
    title: "Şirket",
    links: [
      { href: "/hakkimizda", label: "Hakkımızda" },
      { href: "/blog", label: "Blog" },
    ]
  },
  {
    title: "İletişim",
    links: [
      { 
        href: "tel:+902826854383", 
        label: "+90 282 685 43 83", 
        type: "tel",
        ariaLabel: "Telefon: +90 282 685 43 83"
      },
      { 
        href: "mailto:info@skycrops.farm", 
        label: "info@skycrops.farm", 
        type: "email",
        ariaLabel: "E-posta: info@skycrops.farm"
      },
    ]
  },
  {
    title: "Adres",
    links: [
      {
        href: "https://share.google/cDKuEwHtK70zb8SgS",
        label: "Çorlu 1 OSB, Bülent Ecevit Caddesi No:13/1, PK: 59860 – Tekirdağ, Türkiye",
        external: true,
        ariaLabel: "Google Maps'te aç"
      }
    ]
  }
]

export const FOOTER_POLICY_LINKS = [
  { href: "/gizlilik-politikasi", label: "Gizlilik Politikası" },
  { href: "/kalite-gida-guvenligi-politikasi", label: "Kalite ve Gıda Güvenliği Politikası" },
]