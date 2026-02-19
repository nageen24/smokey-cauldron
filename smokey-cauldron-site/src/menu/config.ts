export type MenuItem = { name: string; price?: string; note?: string; category?: string }
export type MenuData = { lastUpdatedISO?: string; items: MenuItem[] }

export type CategoryId =
  | 'appetizers'
  | 'soups'
  | 'salads'
  | 'sandwiches'
  | 'beef-steaks'
  | 'burgers'
  | 'poultry'
  | 'desi'
  | 'chinese-chicken'
  | 'chinese-beef'
  | 'pasta'
  | 'potions'
  | 'smoothies'
  | 'chillers'
  | 'milkshakes'
  | 'coffee'
  | 'tea'
  | 'desserts'
  | 'from-the-lake'
  | 'deals'
  | 'other'

export const CATEGORY_CONFIG: { id: CategoryId; label: string; hint: string }[] = [
  { id: 'appetizers', label: 'Appetizers', hint: 'Wings, fries, nachos, starters' },
  { id: 'soups', label: 'Soup', hint: 'Hot & comforting' },
  { id: 'salads', label: 'Salad', hint: 'Fresh & lighter options' },
  { id: 'sandwiches', label: 'Sandwiches', hint: 'Panini & grilled sandwiches' },
  { id: 'beef-steaks', label: 'Beef Steaks', hint: 'Signature themed steaks' },
  { id: 'burgers', label: 'Burgers', hint: 'Beef & chicken burgers' },
  { id: 'poultry', label: 'Poultry Mains', hint: 'Chicken parmesan & more' },
  { id: 'desi', label: 'Desi Mains', hint: 'Handi-style dishes' },
  {
    id: 'chinese-chicken',
    label: 'Chinese (Chicken)',
    hint: 'Kung Pao, Chowmein & more',
  },
  {
    id: 'chinese-beef',
    label: 'Chinese (Beef)',
    hint: 'Beef chilli dry, Mongolian beef',
  },
  { id: 'pasta', label: 'Pasta', hint: 'Devil’s Snare, Fluffy’s Pasta' },
  { id: 'potions', label: 'Potions', hint: 'Butterbrew, Amortentia, Felix Felicis' },
  { id: 'smoothies', label: 'Smoothies', hint: 'Fruit-based drinks' },
  { id: 'chillers', label: 'Expresso Chillers', hint: 'Cold coffee & chilled drinks' },
  { id: 'milkshakes', label: 'Milkshakes', hint: 'Oreo, chocolate & more' },
  { id: 'coffee', label: 'Coffee', hint: 'Hot & iced coffees' },
  { id: 'tea', label: 'Tea', hint: 'Green, mixed & iced' },
  { id: 'desserts', label: 'Desserts', hint: 'Cheesecakes, cakes, house brownie' },
  {
    id: 'from-the-lake',
    label: 'From The Lake',
    hint: 'Fish & seafood specials',
  },
  { id: 'deals', label: 'Deals', hint: 'Bowl, steak & burger deals' },
  { id: 'other', label: 'More Magic', hint: 'Items that don’t fit above' },
]

/** 3 main menu sections (Hawksmoor-style: center tabs, then sub-tabs) — no "More Magic" */
export const MAIN_MENU_SECTIONS: {
  id: string
  label: string
  categoryIds: CategoryId[]
}[] = [
  {
    id: 'starters-mains',
    label: 'Starter and Mains',
    categoryIds: [
      'appetizers',
      'soups',
      'salads',
      'sandwiches',
      'beef-steaks',
      'burgers',
      'poultry',
      'desi',
      'chinese-chicken',
      'chinese-beef',
      'pasta',
      'from-the-lake',
    ],
  },
  {
    id: 'drinks-potions',
    label: 'Drinks and Potions',
    categoryIds: ['potions', 'smoothies', 'milkshakes'],
  },
  {
    id: 'coffee-desserts',
    label: 'Coffee and Desserts',
    categoryIds: ['coffee', 'chillers', 'tea', 'desserts'],
  },
]

export const CATEGORY_IMAGES: Partial<Record<CategoryId, string>> = {
  appetizers: '/menu-3.png',
  'chinese-chicken': '/menu-1.png',
  'chinese-beef': '/menu-1.png',
  pasta: '/menu-1.png',
  potions: '/menu-1.png',
  burgers: '/menu-4.png',
  'beef-steaks': '/menu-4.png',
  poultry: '/menu-4.png',
  desi: '/menu-4.png',
  smoothies: '/menu-2.png',
  chillers: '/menu-2.png',
  milkshakes: '/menu-2.png',
  coffee: '/menu-2.png',
  tea: '/menu-2.png',
  desserts: '/menu-2.png',
  'from-the-lake': '/menu-4.png',
  deals: '/menu-3.png',
}

export function inferCategory(item: MenuItem): CategoryId {
  const base = (item.category ?? item.name ?? '').toLowerCase()

  if (
    /wings|fries|nacho|finger|appetizer|starter/.test(base) ||
    ['molly', 'dynamite', 'loaded fries', 'supreme nachos'].some((k) => base.includes(k))
  ) {
    return 'appetizers'
  }
  if (base.includes('soup')) return 'soups'
  if (base.includes('salad')) return 'salads'
  if (/sandwich|panini|panni/.test(base) || base.includes('olive aboard')) {
    return 'sandwiches'
  }
  if (base.includes('steak')) {
    if (base.includes('lake')) return 'from-the-lake'
    return 'beef-steaks'
  }
  if (
    base.includes('burger') ||
    ['kreacher', 'dark arts', 'muggle', 'dobby', 'weasley'].some((k) => base.includes(k))
  ) {
    return 'burgers'
  }
  if (/parmesan|cordon bleu|bleu/.test(base) && base.includes('chicken')) {
    return 'poultry'
  }
  if (/handi|makhni|masala|karahi|desi/.test(base)) return 'desi'

  if (
    /kung pao|chowmein|chilli dry|sichuan|mongolian|manchurian/.test(base) ||
    base.includes('fried rice') ||
    base.includes('chilli chicken')
  ) {
    if (base.includes('beef')) return 'chinese-beef'
    return 'chinese-chicken'
  }

  if (base.includes('pasta') || /penne|fettuccine|alfredo/.test(base)) {
    return 'pasta'
  }

  if (
    ['butterbrew', 'tongue twister', 'amortentia', 'felix', 'unicorn', 'dragon milk'].some((k) =>
      base.includes(k),
    )
  ) {
    return 'potions'
  }

  if (base.includes('smoothie')) return 'smoothies'
  if (base.includes('chiller')) return 'chillers'
  if (base.includes('shake')) return 'milkshakes'

  if (
    /latte|mocha|cappuccino|espresso|americano|coffee/.test(base) ||
    base.includes('cold coffee')
  ) {
    return 'coffee'
  }

  if (base.includes('tea')) return 'tea'

  if (/cheesecake|cake|brownie|browne|dessert/.test(base)) return 'desserts'

  if (base.includes('deal') || base.includes('bowl')) return 'deals'

  if (base.includes('fish') || base.includes('mermaid')) return 'from-the-lake'

  return 'other'
}

