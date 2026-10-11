/* Brew & Bite Café — sample data for the static mockup.
   Loaded with a plain <script> tag so pages also work when opened from disk. */
(function () {
  // Reusable option groups
  const temp = { id: 'temp', name: 'Temperature', type: 'single', required: true, choices: [
    { id: 'hot', name: 'Hot', price: 0 },
    { id: 'iced', name: 'Iced', price: 0 }
  ]};
  const size = (large) => ({ id: 'size', name: 'Size', type: 'single', required: true, choices: [
    { id: 'm', name: 'Medium (12 oz)', price: 0 },
    { id: 'l', name: 'Large (16 oz)', price: large }
  ]});
  const sugar = { id: 'sugar', name: 'Sugar level', type: 'single', required: true, defaultChoice: 's100', choices: [
    { id: 's0', name: '0%', price: 0 },
    { id: 's25', name: '25%', price: 0 },
    { id: 's50', name: '50%', price: 0 },
    { id: 's75', name: '75%', price: 0 },
    { id: 's100', name: '100%', price: 0 }
  ]};
  const coffeeAddons = { id: 'addons', name: 'Add-ons', type: 'multi', choices: [
    { id: 'shot', name: 'Extra espresso shot', price: 35 },
    { id: 'oat', name: 'Oat milk', price: 40 },
    { id: 'almond', name: 'Almond milk', price: 35 },
    { id: 'caramel', name: 'Caramel drizzle', price: 20 },
    { id: 'vanilla', name: 'Vanilla syrup', price: 20 },
    { id: 'whip', name: 'Whipped cream', price: 20 }
  ]};
  const drinkAddons = { id: 'addons', name: 'Add-ons', type: 'multi', choices: [
    { id: 'oat', name: 'Oat milk', price: 40 },
    { id: 'whip', name: 'Whipped cream', price: 20 },
    { id: 'seasalt', name: 'Sea salt cream', price: 30 }
  ]};
  const teaAddons = { id: 'addons', name: 'Add-ons', type: 'multi', choices: [
    { id: 'pearl', name: 'Black pearls', price: 20 },
    { id: 'nata', name: 'Nata de coco', price: 20 },
    { id: 'pudding', name: 'Egg pudding', price: 25 },
    { id: 'cheese', name: 'Cream cheese foam', price: 35 }
  ]};
  const mealAddons = { id: 'addons', name: 'Add-ons', type: 'multi', choices: [
    { id: 'rice', name: 'Extra garlic rice', price: 25 },
    { id: 'egg', name: 'Extra fried egg', price: 20 },
    { id: 'atchara', name: 'Atchara', price: 15 }
  ]};

  const categories = [
    { id: 'coffee', name: 'Coffee', icon: 'cup' },
    { id: 'noncoffee', name: 'Non-coffee', icon: 'cup' },
    { id: 'milktea', name: 'Milk tea', icon: 'tea' },
    { id: 'frappe', name: 'Frappe', icon: 'tea' },
    { id: 'meals', name: 'Rice meals', icon: 'bowl' },
    { id: 'pastries', name: 'Pastries & snacks', icon: 'bread' }
  ];

  const items = [
    // Coffee
    { id: 'americano', cat: 'coffee', name: 'Americano', price: 110, desc: 'Double espresso over hot or cold water. Bold and clean.', tone: ['#4A2E1C', '#9C6B45'], options: [temp, size(20), coffeeAddons] },
    { id: 'latte', cat: 'coffee', name: 'Café Latte', price: 145, desc: 'Espresso with steamed fresh milk and a thin layer of foam.', tone: ['#7A4A26', '#C99467'], tags: ['Best seller'], options: [temp, size(20), coffeeAddons] },
    { id: 'spanish', cat: 'coffee', name: 'Spanish Latte', price: 160, desc: 'Espresso, fresh milk and condensed milk. Sweet and creamy.', tone: ['#8A5530', '#E0B585'], tags: ['Best seller'], options: [temp, size(20), coffeeAddons] },
    { id: 'macchiato', cat: 'coffee', name: 'Caramel Macchiato', price: 165, desc: 'Vanilla milk marked with espresso and finished with caramel drizzle.', tone: ['#B67A2C', '#F0CF8F'], options: [temp, size(20), coffeeAddons] },
    { id: 'mocha', cat: 'coffee', name: 'Café Mocha', price: 160, desc: 'Espresso, dark chocolate sauce and steamed milk.', tone: ['#3E2418', '#8B5A3C'], options: [temp, size(20), coffeeAddons] },
    { id: 'seasalt', cat: 'coffee', name: 'Sea Salt Latte', price: 170, desc: 'Iced latte topped with our house sea salt cream.', tone: ['#6E5240', '#D8C3AE'], tags: ['New'], options: [size(20), coffeeAddons] },

    // Non-coffee
    { id: 'matcha', cat: 'noncoffee', name: 'Matcha Latte', price: 165, desc: 'Ceremonial-grade matcha whisked with milk.', tone: ['#3F6B3A', '#A9C98A'], tags: ['Best seller'], options: [temp, size(20), drinkAddons] },
    { id: 'choco', cat: 'noncoffee', name: 'Classic Chocolate', price: 140, desc: 'Rich Davao cacao chocolate with steamed milk.', tone: ['#4B2A20', '#9E6650'], options: [temp, size(20), drinkAddons] },
    { id: 'strawberry', cat: 'noncoffee', name: 'Strawberry Milk', price: 150, desc: 'Baguio strawberry jam layered with cold fresh milk.', tone: ['#B8475B', '#F2B5BF'], options: [size(20), drinkAddons] },
    { id: 'ube', cat: 'noncoffee', name: 'Ube Latte', price: 155, desc: 'Purple yam halaya blended with milk. No coffee.', tone: ['#5B3A80', '#B79AD8'], tags: ['New'], options: [temp, size(20), drinkAddons] },

    // Milk tea
    { id: 'wintermelon', cat: 'milktea', name: 'Wintermelon Milk Tea', price: 120, desc: 'Black tea with wintermelon syrup and milk.', tone: ['#9A7A4E', '#E3CFA6'], options: [size(20), sugar, teaAddons] },
    { id: 'okinawa', cat: 'milktea', name: 'Okinawa Milk Tea', price: 130, desc: 'Roasted brown sugar milk tea with a toffee finish.', tone: ['#7C5434', '#CDA27A'], options: [size(20), sugar, teaAddons] },
    { id: 'brownsugar', cat: 'milktea', name: 'Brown Sugar Pearl Milk', price: 140, desc: 'Fresh milk with warm brown sugar pearls. Pearls included.', tone: ['#5E3A1E', '#C8925C'], tags: ['Best seller'], options: [size(20), sugar, teaAddons] },
    { id: 'taro', cat: 'milktea', name: 'Taro Milk Tea', price: 130, desc: 'Creamy taro root with jasmine tea.', tone: ['#7E6A9E', '#CFC3E6'], options: [size(20), sugar, teaAddons] },

    // Frappe
    { id: 'javachip', cat: 'frappe', name: 'Java Chip Frappe', price: 175, desc: 'Coffee, chocolate chips and milk blended with ice.', tone: ['#3A2418', '#7F5641'], options: [size(25), coffeeAddons] },
    { id: 'cookies', cat: 'frappe', name: 'Cookies & Cream Frappe', price: 170, desc: 'Crushed chocolate cookies blended with vanilla cream.', tone: ['#2C2C2C', '#BDBDB5'], options: [size(25), drinkAddons] },
    { id: 'matchafrappe', cat: 'frappe', name: 'Matcha Frappe', price: 180, desc: 'Matcha blended with milk and ice, topped with cream.', tone: ['#4E7A3E', '#C3DDA6'], options: [size(25), drinkAddons] },

    // Rice meals
    { id: 'tapa', cat: 'meals', name: 'Beef Tapa', price: 199, desc: 'House-cured beef tapa, garlic rice, fried egg and atchara.', tone: ['#8A3B22', '#E09A63'], tags: ['Best seller'], options: [mealAddons] },
    { id: 'adobo', cat: 'meals', name: 'Chicken Adobo Bowl', price: 189, desc: 'Soy-vinegar braised chicken over garlic rice with a soft egg.', tone: ['#5A3A22', '#B88A5A'], options: [mealAddons] },
    { id: 'tocino', cat: 'meals', name: 'Pork Tocino', price: 179, desc: 'Sweet cured pork, garlic rice and fried egg.', tone: ['#A8452F', '#F0A07E'], options: [mealAddons] },
    { id: 'longganisa', cat: 'meals', name: 'Garlic Longganisa', price: 179, desc: 'Garlicky local sausage with garlic rice and fried egg.', tone: ['#7B2F1F', '#D27B57'], options: [mealAddons] },
    { id: 'spam', cat: 'meals', name: 'Spam Silog', price: 169, desc: 'Pan-fried Spam, garlic rice and fried egg.', tone: ['#9C4A4A', '#EBA9A0'], options: [mealAddons] },

    // Pastries & snacks
    { id: 'croissant', cat: 'pastries', name: 'Butter Croissant', price: 95, desc: 'Flaky all-butter croissant, baked every morning.', tone: ['#B07A2E', '#F2D49B'], options: [
      { id: 'warm', name: 'Serving', type: 'single', required: true, choices: [{ id: 'asis', name: 'As is', price: 0 }, { id: 'warmed', name: 'Warmed', price: 0 }] }
    ]},
    { id: 'ensaymada', cat: 'pastries', name: 'Ensaymada', price: 75, desc: 'Soft brioche with butter, sugar and grated cheese.', tone: ['#C49A3C', '#F6E2A8'] },
    { id: 'pandesal', cat: 'pastries', name: 'Cheese Pandesal (4 pcs)', price: 85, desc: 'Warm pandesal stuffed with melty cheese.', tone: ['#A06A2C', '#E8C08A'] },
    { id: 'clubhouse', cat: 'pastries', name: 'Clubhouse Sandwich', price: 195, desc: 'Triple-decker with chicken, ham, egg and cheese.', tone: ['#8C6A3A', '#DCC291'], options: [
      { id: 'side', name: 'Add a side', type: 'multi', choices: [{ id: 'fries', name: 'Side of fries', price: 50 }] }
    ]},
    { id: 'fries', cat: 'pastries', name: 'Flavored Fries', price: 110, desc: 'Crispy shoestring fries tossed in your choice of flavor.', tone: ['#C8902A', '#F7DB86'], options: [
      { id: 'flavor', name: 'Flavor', type: 'single', required: true, choices: [{ id: 'cheese', name: 'Cheese', price: 0 }, { id: 'bbq', name: 'Barbecue', price: 0 }, { id: 'sour', name: 'Sour cream', price: 0 }] }
    ]}
  ];

  // ---------------- Inventory ----------------
  const suppliers = [
    { id: 's1', name: 'Bean There Coffee Roasters', contact: 'Rico Aquino', phone: '0917 820 3311', email: 'orders@beanthere.ph', address: 'La Trinidad, Benguet', leadDays: 3, terms: '15 days' },
    { id: 's2', name: 'Central Luzon Dairy Co.', contact: 'Grace Lacson', phone: '0918 455 2090', email: 'sales@cldairy.ph', address: 'Capas, Tarlac', leadDays: 1, terms: 'COD' },
    { id: 's3', name: 'Manila Café Supplies', contact: 'Jun Villanueva', phone: '0927 301 7788', email: 'jun@mcsupplies.ph', address: 'Quezon City, Metro Manila', leadDays: 4, terms: '30 days' },
    { id: 's4', name: 'Mang Ben’s Meats & Produce', contact: 'Ben Ocampo', phone: '0906 114 5523', email: 'mangben.tarlac@gmail.com', address: 'Tarlac City Public Market', leadDays: 1, terms: 'COD' },
    { id: 's5', name: 'Pack & Go Packaging', contact: 'Ivy Tan', phone: '0995 660 1402', email: 'ivy@packandgo.ph', address: 'San Fernando, Pampanga', leadDays: 2, terms: '15 days' },
    { id: 's6', name: 'Golden Crust Bakery', contact: 'Nora Sison', phone: '0919 772 0045', email: 'goldencrust.tarlac@gmail.com', address: 'San Vicente, Tarlac City', leadDays: 1, terms: 'COD' }
  ];

  // [id, name, category, unit, stock, reorder level, reorder qty, cost per unit (₱), supplier]
  const ingredients = [
    ['beans', 'Espresso beans', 'Coffee & tea', 'g', 6200, 3000, 5000, 1.2, 's1'],
    ['blacktea', 'Black tea leaves', 'Coffee & tea', 'g', 800, 300, 1000, 0.8, 's3'],
    ['matcha', 'Matcha powder', 'Coffee & tea', 'g', 650, 300, 1000, 3.5, 's3'],
    ['milk', 'Fresh milk', 'Dairy', 'ml', 18000, 10000, 20000, 0.095, 's2'],
    ['condensed', 'Condensed milk', 'Dairy', 'ml', 2400, 1000, 3000, 0.12, 's2'],
    ['cream', 'Whipping cream', 'Dairy', 'ml', 900, 1000, 2000, 0.3, 's2'],
    ['creamcheese', 'Cream cheese', 'Dairy', 'g', 350, 500, 1000, 0.6, 's2'],
    ['cheese', 'Cheese slices', 'Dairy', 'pc', 40, 20, 50, 7, 's2'],
    ['oat', 'Oat milk', 'Milk alternatives', 'ml', 1800, 4000, 6000, 0.22, 's3'],
    ['almond', 'Almond milk', 'Milk alternatives', 'ml', 2500, 1000, 3000, 0.2, 's3'],
    ['choco', 'Chocolate sauce', 'Syrups & sauces', 'ml', 2100, 800, 2000, 0.35, 's3'],
    ['caramel', 'Caramel sauce', 'Syrups & sauces', 'ml', 1300, 500, 1500, 0.4, 's3'],
    ['vanilla', 'Vanilla syrup', 'Syrups & sauces', 'ml', 1500, 500, 1500, 0.45, 's3'],
    ['wintermelon', 'Wintermelon syrup', 'Syrups & sauces', 'ml', 2000, 800, 2000, 0.25, 's3'],
    ['brownsugar', 'Brown sugar syrup', 'Syrups & sauces', 'ml', 3000, 1000, 3000, 0.15, 's3'],
    ['ube', 'Ube halaya', 'Syrups & sauces', 'g', 1200, 500, 1000, 0.4, 's3'],
    ['strawjam', 'Strawberry jam', 'Syrups & sauces', 'g', 900, 400, 1000, 0.35, 's3'],
    ['taro', 'Taro powder', 'Milk tea add-ins', 'g', 0, 300, 1000, 0.6, 's3'],
    ['pearls', 'Tapioca pearls', 'Milk tea add-ins', 'g', 4000, 2000, 5000, 0.12, 's3'],
    ['nata', 'Nata de coco', 'Milk tea add-ins', 'g', 1500, 800, 2000, 0.15, 's3'],
    ['pudding', 'Egg pudding cups', 'Milk tea add-ins', 'pc', 20, 12, 30, 12, 's3'],
    ['frappebase', 'Frappe base powder', 'Milk tea add-ins', 'g', 2600, 1000, 3000, 0.5, 's3'],
    ['cookies', 'Chocolate cookie crumbs', 'Milk tea add-ins', 'g', 1200, 500, 1000, 0.4, 's3'],
    ['rice', 'Rice', 'Kitchen', 'g', 15000, 8000, 25000, 0.06, 's4'],
    ['egg', 'Eggs', 'Kitchen', 'pc', 84, 60, 120, 9, 's4'],
    ['tapa', 'Beef tapa', 'Kitchen', 'g', 3200, 2000, 5000, 0.55, 's4'],
    ['chicken', 'Chicken', 'Kitchen', 'g', 4500, 2000, 5000, 0.28, 's4'],
    ['tocino', 'Pork tocino', 'Kitchen', 'g', 2600, 1500, 4000, 0.4, 's4'],
    ['longganisa', 'Garlic longganisa', 'Kitchen', 'pc', 45, 30, 60, 12, 's4'],
    ['spam', 'Luncheon meat', 'Kitchen', 'g', 1800, 1000, 2000, 0.6, 's4'],
    ['ham', 'Sliced ham', 'Kitchen', 'g', 1200, 500, 1000, 0.5, 's4'],
    ['atchara', 'Atchara', 'Kitchen', 'g', 1400, 500, 1500, 0.15, 's4'],
    ['fries', 'Frozen fries', 'Kitchen', 'g', 6000, 3000, 8000, 0.18, 's4'],
    ['seasoning', 'Fries seasoning', 'Kitchen', 'g', 400, 150, 500, 0.5, 's4'],
    ['croissant', 'Butter croissant', 'Bakery', 'pc', 14, 10, 24, 38, 's6'],
    ['ensaymada', 'Ensaymada', 'Bakery', 'pc', 18, 10, 24, 28, 's6'],
    ['pandesal', 'Cheese pandesal', 'Bakery', 'pc', 40, 24, 60, 9, 's6'],
    ['bread', 'Sandwich bread slices', 'Bakery', 'pc', 30, 24, 60, 5, 's6'],
    ['cup12', 'Cup 12 oz', 'Packaging', 'pc', 320, 200, 500, 4.5, 's5'],
    ['cup16', 'Cup 16 oz', 'Packaging', 'pc', 180, 200, 500, 5.5, 's5'],
    ['lid', 'Cup lids', 'Packaging', 'pc', 520, 300, 1000, 1.5, 's5']
  ].map(r => ({ id: r[0], name: r[1], cat: r[2], unit: r[3], stock: r[4], reorder: r[5], reorderQty: r[6], cost: r[7], supplier: r[8] }));

  // Recipe per menu item, for a Medium (12 oz) or a single serving.
  // [ingredient, qty, scales] — "scales" = multiplied by largeFactor when Large is chosen.
  // Drinks also use one cup (12 or 16 oz by size) and one lid, added automatically.
  const recipes = {
    americano: [['beans', 18]],
    latte: [['beans', 18], ['milk', 180, 1]],
    spanish: [['beans', 18], ['milk', 150, 1], ['condensed', 30, 1]],
    macchiato: [['beans', 18], ['milk', 170, 1], ['vanilla', 15, 1], ['caramel', 10]],
    mocha: [['beans', 18], ['milk', 160, 1], ['choco', 30, 1]],
    seasalt: [['beans', 18], ['milk', 150, 1], ['cream', 30]],
    matcha: [['matcha', 6, 1], ['milk', 200, 1]],
    choco: [['choco', 40, 1], ['milk', 200, 1]],
    strawberry: [['strawjam', 40, 1], ['milk', 200, 1]],
    ube: [['ube', 40, 1], ['milk', 200, 1]],
    wintermelon: [['blacktea', 5, 1], ['wintermelon', 40, 1], ['milk', 100, 1]],
    okinawa: [['blacktea', 5, 1], ['brownsugar', 40, 1], ['milk', 120, 1]],
    brownsugar: [['brownsugar', 40, 1], ['milk', 200, 1], ['pearls', 60]],
    taro: [['taro', 30, 1], ['blacktea', 5, 1], ['milk', 150, 1]],
    javachip: [['beans', 18], ['frappebase', 30, 1], ['choco', 20, 1], ['milk', 150, 1]],
    cookies: [['frappebase', 30, 1], ['cookies', 25, 1], ['milk', 150, 1]],
    matchafrappe: [['matcha', 8, 1], ['frappebase', 30, 1], ['milk', 150, 1]],
    tapa: [['tapa', 120], ['rice', 150], ['egg', 1], ['atchara', 30]],
    adobo: [['chicken', 150], ['rice', 150], ['egg', 1]],
    tocino: [['tocino', 120], ['rice', 150], ['egg', 1]],
    longganisa: [['longganisa', 3], ['rice', 150], ['egg', 1]],
    spam: [['spam', 100], ['rice', 150], ['egg', 1]],
    croissant: [['croissant', 1]],
    ensaymada: [['ensaymada', 1]],
    pandesal: [['pandesal', 4]],
    clubhouse: [['bread', 3], ['chicken', 60], ['ham', 40], ['egg', 1], ['cheese', 2]],
    fries: [['fries', 150], ['seasoning', 5]]
  };

  // What each option adds. "replace" moves the item's milk to another milk.
  const optionRecipes = {
    'addons:shot': { add: [['beans', 9]] },
    'addons:oat': { replace: ['milk', 'oat'] },
    'addons:almond': { replace: ['milk', 'almond'] },
    'addons:caramel': { add: [['caramel', 15]] },
    'addons:vanilla': { add: [['vanilla', 15]] },
    'addons:whip': { add: [['cream', 30]] },
    'addons:seasalt': { add: [['cream', 30]] },
    'addons:pearl': { add: [['pearls', 50]] },
    'addons:nata': { add: [['nata', 40]] },
    'addons:pudding': { add: [['pudding', 1]] },
    'addons:cheese': { add: [['creamcheese', 30]] },
    'addons:rice': { add: [['rice', 150]] },
    'addons:egg': { add: [['egg', 1]] },
    'addons:atchara': { add: [['atchara', 40]] },
    'side:fries': { add: [['fries', 120], ['seasoning', 3]] }
  };

  // Sample purchase orders, dated relative to today
  const daysAgo = (n) => new Date(Date.now() - n * 86400000).toISOString();
  const samplePOs = [
    { id: 'po1', poNo: 'PO-0001', supplier: 's2', status: 'received', createdAt: daysAgo(7), expectedAt: daysAgo(6), receivedAt: daysAgo(6), createdBy: 'Liza Garcia', receivedBy: 'Liza Garcia', notes: 'Weekly dairy',
      items: [{ ing: 'milk', qty: 20000, cost: 0.095 }, { ing: 'cream', qty: 2000, cost: 0.3 }] },
    { id: 'po2', poNo: 'PO-0002', supplier: 's1', status: 'sent', createdAt: daysAgo(2), expectedAt: daysAgo(-1), createdBy: 'Liza Garcia', notes: 'House blend, medium roast',
      items: [{ ing: 'beans', qty: 5000, cost: 1.2 }] }
  ];

  window.BB_DATA = {
    cafe: {
      name: 'Brew & Bite Café',
      address: 'F. Tañedo St., San Nicolas, Tarlac City, Tarlac',
      hours: 'Mon–Sun · 7:00 AM – 10:00 PM',
      phone: '0917 555 0142',
      facebook: 'Brew & Bite Café Tarlac',
      tables: 14
    },
    promo: { code: 'BREWBITE10', text: '10% off your order this October', percent: 10 },
    // Vouchers customers can type at checkout
    vouchers: [
      { code: 'BREWBITE10', label: '10% off (max ₱100)', kind: 'percent', value: 10, max: 100, minSpend: 300, active: true },
      { code: 'STUDENT20', label: '₱20 off', kind: 'fixed', value: 20, minSpend: 150, active: true },
      { code: 'FREEDELIVERY', label: 'Free delivery', kind: 'delivery', value: 0, minSpend: 500, active: true },
      { code: 'SWEETSEPT', label: '15% off', kind: 'percent', value: 15, minSpend: 0, active: false }
    ],
    delivery: { fee: 50, area: 'Within Tarlac City only' },
    // Staff accounts (demo passwords are shown on the login screen)
    users: [
      { id: 'u1', name: 'Maria Dizon', username: 'admin', password: 'admin123', role: 'admin' },
      { id: 'u2', name: 'Jessa Manalo', username: 'cashier', password: 'cashier123', role: 'cashier' },
      { id: 'u3', name: 'Mark Bautista', username: 'cashier2', password: 'cashier123', role: 'cashier' },
      { id: 'u4', name: 'Ramon Cruz', username: 'kitchen', password: 'kitchen123', role: 'kitchen' },
      { id: 'u5', name: 'Liza Garcia', username: 'stock', password: 'stock123', role: 'inventory' }
    ],
    // Senior citizen / PWD: VAT-exempt, then 20% off the eligible share
    seniorPwd: { percent: 20, vat: 0.12 },
    // Loyalty: earn 1 point per ₱50 paid, 1 point = ₱1 off. Sample members:
    loyalty: { pesoPerPoint: 50, minRedeem: 20, members: { '09171234567': { name: 'Andrea Santos', points: 86 }, '09981112222': { name: 'Paolo Reyes', points: 24 } } },
    categories,
    items,
    suppliers,
    ingredients,
    recipes,
    optionRecipes,
    largeFactor: 1.33,
    drinkCats: ['coffee', 'noncoffee', 'milktea', 'frappe'],
    samplePOs,
    wasteReasons: ['Spoiled or expired', 'Spilled or dropped', 'Remade (wrong order)', 'Quality issue', 'Used for staff meal', 'Other']
  };
})();
