/* Brew & Bite Café — all scripts.
   Order: sample data, storage helpers, customer helpers, staff shell, charts,
   then one function per screen (BBViews) and the boot code that shows the screen named in ?view=. */

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

  // Option-group templates the admin can attach to new menu items
  window.BB_DATA.optionTemplates = {
    coffee: { label: 'Coffee drink (hot/iced, size, coffee add-ons)', groups: [temp, size(20), coffeeAddons] },
    icedcoffee: { label: 'Iced coffee (size, coffee add-ons)', groups: [size(20), coffeeAddons] },
    drink: { label: 'Non-coffee drink (hot/iced, size, add-ons)', groups: [temp, size(20), drinkAddons] },
    milktea: { label: 'Milk tea (size, sugar level, toppings)', groups: [size(20), sugar, teaAddons] },
    frappe: { label: 'Frappe (size, add-ons)', groups: [size(25), drinkAddons] },
    meal: { label: 'Rice meal (extra rice, egg, atchara)', groups: [mealAddons] },
    none: { label: 'No options', groups: [] }
  };

  // Admin edits (menu, prices, recipes, vouchers, users, loyalty) are saved in browser storage
  // and replace these defaults on every page. "Reset demo data" brings the defaults back.
  window.BB_DATA.overrideKeys = { items: 'menuItems', categories: 'menuCategories', recipes: 'recipes', vouchers: 'vouchers', users: 'users', promo: 'promo', loyaltyConfig: 'loyaltyConfig' };
  try {
    const D = window.BB_DATA;
    Object.keys(D.overrideKeys).forEach(k => {
      const raw = localStorage.getItem('bb_' + D.overrideKeys[k]);
      if (raw === null) return;
      const val = JSON.parse(raw);
      if (k === 'loyaltyConfig') Object.assign(D.loyalty, val);
      else D[k] = val;
    });
  } catch (e) { /* storage blocked: use defaults */ }
})();

/* Brew & Bite Café — browser storage helpers that stand in for a database.
   Every key starts with "bb_" so "Reset demo data" can clear them all. */
(function () {
  const PREFIX = 'bb_';

  function get(key, fallback) {
    try {
      const raw = localStorage.getItem(PREFIX + key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch (e) {
      return fallback;
    }
  }

  function set(key, value) {
    try { localStorage.setItem(PREFIX + key, JSON.stringify(value)); } catch (e) { /* storage blocked */ }
  }

  function reset() {
    try {
      Object.keys(localStorage).filter(k => k.startsWith(PREFIX)).forEach(k => localStorage.removeItem(k));
      return true;
    } catch (e) {
      return false;
    }
  }

  // Peso formatting: peso(145) -> "₱145", peso(145, true) -> "₱145.00"
  function peso(n, decimals) {
    return '₱' + Number(n).toLocaleString('en-PH', {
      minimumFractionDigits: decimals ? 2 : 0,
      maximumFractionDigits: decimals ? 2 : 0
    });
  }

  const round2 = (n) => Math.round(n * 100) / 100;

  // 2026-10-11 -> "20261011"
  function ymd(d) {
    d = d || new Date();
    return d.getFullYear() + String(d.getMonth() + 1).padStart(2, '0') + String(d.getDate()).padStart(2, '0');
  }

  // Daily counters: nextNumber('GC') -> "GC-20261011-0001"
  function nextNumber(prefix) {
    const seq = get('seq', {});
    const key = prefix + '-' + ymd();
    seq[key] = (seq[key] || 0) + 1;
    set('seq', seq);
    return key + '-' + String(seq[key]).padStart(4, '0');
  }

  function dateTime(iso) {
    return new Date(iso).toLocaleString('en-PH', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });
  }

  // ---- Ordering session set by the table QR (dine-in) or the counter QR (take-out) ----
  const session = {
    get: () => get('session', null),
    set: (s) => set('session', s)
  };

  // ---- Cart ----
  const cart = {
    lines: () => get('cart', []),
    save: (lines) => set('cart', lines),
    add(line) {
      const lines = cart.lines();
      const same = lines.find(l => l.key === line.key && l.notes === line.notes);
      if (same) same.qty += line.qty;
      else lines.push(Object.assign({ id: Date.now() }, line));
      cart.save(lines);
      return lines;
    },
    setQty(id, qty) {
      const lines = cart.lines().map(l => l.id === id ? Object.assign(l, { qty }) : l).filter(l => l.qty > 0);
      cart.save(lines);
      return lines;
    },
    count: () => cart.lines().reduce((n, l) => n + l.qty, 0),
    total: () => cart.lines().reduce((n, l) => n + l.qty * l.unitPrice, 0),
    clear: () => set('cart', [])
  };

  // ---- Vouchers ----
  // Returns { ok, amount, freeDelivery, message } for a code against a subtotal.
  function checkVoucher(code, subtotal) {
    const v = (window.BB_DATA.vouchers || []).find(x => x.code === String(code || '').trim().toUpperCase());
    if (!v) return { ok: false, message: 'That voucher code does not exist. Check the spelling and try again.' };
    if (!v.active) return { ok: false, message: `${v.code} has already expired.` };
    if (subtotal < v.minSpend) return { ok: false, message: `${v.code} needs a minimum order of ${peso(v.minSpend)}. Add ${peso(v.minSpend - subtotal)} more.` };
    let amount = 0;
    if (v.kind === 'percent') amount = Math.min(round2(subtotal * v.value / 100), v.max || Infinity);
    if (v.kind === 'fixed') amount = v.value;
    return { ok: true, code: v.code, label: v.label, amount, freeDelivery: v.kind === 'delivery' };
  }

  // ---- Loyalty (sample members live in data.js; earned points are added here) ----
  const loyalty = {
    member(mobile) {
      const base = (window.BB_DATA.loyalty.members || {})[mobile];
      const extra = get('loyalty', {})[mobile];
      if (!base && !extra) return null;
      return {
        name: (base && base.name) || (extra && extra.name) || '',
        points: (base ? base.points : 0) + (extra ? extra.points : 0)
      };
    },
    add(mobile, name, points) {
      const all = get('loyalty', {});
      const rec = all[mobile] || { name: name || '', points: 0 };
      rec.points += points;
      if (name && !rec.name) rec.name = name;
      all[mobile] = rec;
      set('loyalty', all);
    },
    earnFor: (amount) => Math.floor(amount / window.BB_DATA.loyalty.pesoPerPoint)
  };

  // ---- Orders ----
  const orders = {
    list: () => get('orders', []),
    get: (id) => orders.list().find(o => o.id === id) || null,
    // opts.mine = false for counter (POS) orders, so they don't show in this browser's "My orders"
    create(order, opts) {
      const all = orders.list();
      const now = new Date().toISOString();
      order.id = order.id || 'o' + Date.now() + Math.random().toString(36).slice(2, 6);
      order.orderNo = nextNumber('BB');
      order.createdAt = now;
      order.statusLog = [{ status: order.status, at: now }];
      all.push(order);
      set('orders', all);
      if (!opts || opts.mine !== false) {
        const mine = get('myOrders', []);
        mine.push(order.id);
        set('myOrders', mine);
      }
      // Cash-on-delivery goes straight to the kitchen, so its ingredients are used now
      if (orders.isCod(order)) inventory.deductForOrder(order);
      return orders.get(order.id);
    },
    update(id, patch) {
      const all = orders.list();
      const o = all.find(x => x.id === id);
      if (!o) return null;
      if (patch.status && patch.status !== o.status) o.statusLog.push({ status: patch.status, at: new Date().toISOString() });
      Object.assign(o, patch);
      set('orders', all);
      // Cancelled or voided after ingredients were deducted: put them back
      if ((patch.status === 'cancelled' || patch.status === 'voided') && o.stockDeducted) inventory.returnForOrder(o);
      return orders.get(id);
    },
    mine: () => get('myOrders', []).map(orders.get).filter(Boolean),
    // Still owes money (includes cash-on-delivery orders already in the kitchen)
    unpaid: (o) => !o.paidAt && !['cancelled', 'voided'].includes(o.status),
    // Cash-on-delivery orders go to the kitchen before they are paid
    isCod: (o) => o.type === 'delivery' && o.method === 'CASH'
  };

  // ---- Payments ----
  const METHOD_PREFIX = { GCASH: 'GC', MAYA: 'MY', CASH: 'CS' };
  const payments = {
    list: () => get('payments', []),
    forOrder: (orderId) => payments.list().find(p => p.orderId === orderId) || null,
    // Saves a Paid payment record and moves the order to Paid. No outside service is contacted.
    record(order, method, extra) {
      const now = new Date().toISOString();
      const p = Object.assign({
        id: 'p' + Date.now() + Math.random().toString(36).slice(2, 6),
        orderId: order.id,
        orderNo: order.orderNo,
        method,
        amount: order.total,
        status: 'PAID',
        referenceNo: nextNumber(METHOD_PREFIX[method]),
        paidAt: now,
        receivedBy: null
      }, extra || {});
      const all = payments.list();
      all.push(p);
      set('payments', all);

      const points = order.customer && order.customer.mobile ? loyalty.earnFor(order.total) : 0;
      if (points) loyalty.add(order.customer.mobile, order.customer.name, points);
      // Cash-on-delivery orders may already be in the kitchen or delivered; keep their stage
      const current = orders.get(order.id);
      const patch = { paidAt: now, method, paymentRef: p.referenceNo, pointsEarned: points };
      if (!current || current.status === 'awaiting_payment') patch.status = 'paid';
      orders.update(order.id, patch);
      audit.log('Payment recorded', `${order.orderNo} · ${method} · ${peso(p.amount, true)} · ${p.referenceNo}`);
      // Order confirmed: deduct recipe ingredients (skipped if already done, e.g. COD)
      inventory.deductForOrder(orders.get(order.id));
      return p;
    },
    // Voids a paid order: payment marked VOIDED, loyalty points reversed, order status "voided"
    voidOrder(order, reason) {
      const all = payments.list();
      const p = all.find(x => x.orderId === order.id);
      if (p) { p.status = 'VOIDED'; p.voidedAt = new Date().toISOString(); p.voidReason = reason; set('payments', all); }
      const m = order.customer && order.customer.mobile;
      if (m && order.pointsEarned) loyalty.add(m, '', -order.pointsEarned);
      if (m && order.pointsUsed) loyalty.add(m, '', order.pointsUsed);
      orders.update(order.id, { status: 'voided', cancelReason: reason });
      audit.log('Voided order', `${order.orderNo} · ${peso(order.total, true)} · ${reason}`);
    }
  };

  // ---- Menu availability (kitchen can mark items sold out; overrides data.js) ----
  const menu = {
    overrides: () => get('soldOut', {}),
    // Manual switch from the kitchen wins; otherwise sold out when an ingredient can't cover one serving
    isSoldOut(item) {
      const o = menu.overrides();
      if (item.id in o) return o[item.id];
      return !!item.soldOut || inventory.shortFor(item).length > 0;
    },
    setSoldOut(item, value) {
      const o = menu.overrides();
      o[item.id] = value;
      set('soldOut', o);
      audit.log(value ? 'Marked sold out' : 'Marked available', item.name);
    }
  };

  // ---- Inventory: ingredients, recipes, stock movements, suppliers, purchase orders ----
  const clone = (x) => JSON.parse(JSON.stringify(x));
  const who = () => { const s = staff.current(); return s ? s.name : 'System (auto)'; };

  const inventory = {
    ingredients() {
      let list = get('ingredients', null);
      if (!list) { list = clone(window.BB_DATA.ingredients); set('ingredients', list); }
      return list;
    },
    saveIngredients: (list) => set('ingredients', list),
    ing: (id) => inventory.ingredients().find(i => i.id === id) || null,

    suppliers() {
      let list = get('suppliers', null);
      if (!list) { list = clone(window.BB_DATA.suppliers); set('suppliers', list); }
      return list;
    },
    saveSuppliers: (list) => set('suppliers', list),
    supplier: (id) => inventory.suppliers().find(s => s.id === id) || null,

    purchaseOrders() {
      let list = get('purchaseOrders', null);
      if (!list) { list = clone(window.BB_DATA.samplePOs); set('purchaseOrders', list); }
      return list;
    },
    savePOs: (list) => set('purchaseOrders', list),

    movements: () => get('movements', []),

    // Changes stock and records why. qty is signed: negative uses stock, positive adds it.
    move(ingId, qty, type, ref, note, user) {
      const list = inventory.ingredients();
      const ing = list.find(i => i.id === ingId);
      if (!ing || !qty) return;
      const before = ing.stock;
      ing.stock = round2(ing.stock + qty);
      inventory.saveIngredients(list);
      const all = inventory.movements();
      all.push({ id: 'm' + Date.now() + Math.random().toString(36).slice(2, 6), at: new Date().toISOString(), ing: ingId, qty: round2(qty), type, ref: ref || '', note: note || '', user: user || who(), cost: round2(Math.abs(qty) * ing.cost), before, after: ing.stock });
      set('movements', all);
    },

    // Ingredient usage for one cart/order line: { ingId: qty }
    usageForLine(line) {
      const D = window.BB_DATA;
      const item = D.items.find(i => i.id === line.itemId);
      const use = {};
      const add = (id, q) => { use[id] = (use[id] || 0) + q; };
      if (!item) return use;
      const large = (line.options || []).some(o => o.groupId === 'size' && o.id === 'l');
      (D.recipes[item.id] || []).forEach(([id, q, scales]) => add(id, scales && large ? q * D.largeFactor : q));
      if (D.drinkCats.includes(item.cat)) { add(large ? 'cup16' : 'cup12', 1); add('lid', 1); }
      (line.options || []).forEach(o => {
        const r = D.optionRecipes[o.groupId + ':' + o.id];
        if (!r) return;
        (r.add || []).forEach(([id, q]) => add(id, q));
        if (r.replace && use[r.replace[0]]) { add(r.replace[1], use[r.replace[0]]); use[r.replace[0]] = 0; }
      });
      Object.keys(use).forEach(k => { use[k] = round2(use[k] * line.qty); if (!use[k]) delete use[k]; });
      return use;
    },
    usageForOrder(order) {
      const total = {};
      order.items.forEach(l => {
        const u = inventory.usageForLine(l);
        Object.keys(u).forEach(k => { total[k] = round2((total[k] || 0) + u[k]); });
      });
      return total;
    },
    deductForOrder(order) {
      if (!order || order.stockDeducted) return;
      const use = inventory.usageForOrder(order);
      const user = staff.current() ? staff.current().name : 'System (order)';
      Object.keys(use).forEach(id => inventory.move(id, -use[id], 'SALE', order.orderNo, '', user));
      orders.update(order.id, { stockDeducted: true });
    },
    returnForOrder(order) {
      if (!order || !order.stockDeducted) return;
      const use = inventory.usageForOrder(order);
      Object.keys(use).forEach(id => inventory.move(id, use[id], 'RETURN', order.orderNo, `Order ${order.status}`));
      orders.update(order.id, { stockDeducted: false });
    },

    // Ingredients that can't cover one basic serving of a menu item
    shortFor(item) {
      const use = inventory.usageForLine({ itemId: item.id, qty: 1, options: [] });
      return Object.keys(use).filter(id => { const g = inventory.ing(id); return g && g.stock < use[id]; });
    },
    // Menu items whose recipe uses this ingredient
    usedIn(ingId) {
      const D = window.BB_DATA;
      return D.items.filter(i => (D.recipes[i.id] || []).some(r => r[0] === ingId));
    },
    level(ing) {
      if (ing.stock <= 0) return 'out';
      if (ing.stock <= ing.reorder) return 'low';
      return 'ok';
    },
    // 12400 g -> "12.4 kg", 850 ml -> "850 ml", 12 pc -> "12 pcs"
    fmt(qty, unit) {
      const n = Number(qty);
      if (unit === 'g' && Math.abs(n) >= 1000) return round2(n / 1000).toLocaleString('en-PH') + ' kg';
      if (unit === 'ml' && Math.abs(n) >= 1000) return round2(n / 1000).toLocaleString('en-PH') + ' L';
      if (unit === 'pc') return round2(n).toLocaleString('en-PH') + (Math.abs(n) === 1 ? ' pc' : ' pcs');
      return round2(n).toLocaleString('en-PH') + ' ' + unit;
    }
  };

  // ---- Admin: save catalog changes (menu, recipes, vouchers, users, promo, loyalty settings) ----
  const admin = {
    save(key, value) {
      const D = window.BB_DATA;
      set(D.overrideKeys[key], value);
      if (key === 'loyaltyConfig') Object.assign(D.loyalty, value);
      else D[key] = value;
    }
  };

  // ---- Sales history for the dashboard and reports ----
  // Days before today are filled with generated sample sales (same numbers on every load,
  // never saved) so the reports have something to show. Today and any real orders come from storage.
  const history = {
    _cache: null,
    sample() {
      if (history._cache) return history._cache;
      const D = window.BB_DATA;
      const rnd = (seed) => () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
      const pick = (r, weights) => { let x = r() * weights.reduce((a, b) => a + b[1], 0); for (const w of weights) { x -= w[1]; if (x <= 0) return w[0]; } return weights[0][0]; };
      const popular = { latte: 9, spanish: 9, brownsugar: 8, matcha: 7, tapa: 6, americano: 6, macchiato: 5, wintermelon: 5, javachip: 4, adobo: 4, croissant: 4, okinawa: 4, mocha: 3, seasalt: 3, ube: 3, tocino: 3, fries: 3, choco: 2, strawberry: 2, cookies: 2, matchafrappe: 2, longganisa: 2, spam: 2, ensaymada: 2, pandesal: 2, clubhouse: 2, taro: 2 };
      const itemWeights = D.items.map(i => [i, popular[i.id] || 1]);
      const hours = [[7, 4], [8, 7], [9, 6], [10, 5], [11, 7], [12, 12], [13, 10], [14, 6], [15, 9], [16, 10], [17, 8], [18, 7], [19, 6], [20, 5], [21, 3]];
      const out = [];
      const today = new Date(); today.setHours(0, 0, 0, 0);
      for (let d = 30; d >= 1; d--) {
        const day = new Date(today.getTime() - d * 86400000);
        const r = rnd(Number(ymd(day)));
        const weekend = day.getDay() === 0 || day.getDay() === 6;
        const count = Math.round((weekend ? 172 : 138) * (0.85 + r() * 0.3));
        for (let n = 0; n < count; n++) {
          const at = new Date(day.getTime() + pick(r, hours) * 3600000 + Math.floor(r() * 60) * 60000);
          const lines = [];
          const nLines = r() < 0.55 ? 1 : r() < 0.8 ? 2 : 3;
          for (let k = 0; k < nLines; k++) {
            const item = pick(r, itemWeights);
            const options = [];
            (item.options || []).forEach(g => {
              if (g.type === 'single') {
                const ch = g.id === 'size' ? g.choices[r() < 0.42 ? 1 : 0] : g.choices[Math.floor(r() * g.choices.length)];
                options.push({ groupId: g.id, group: g.name, id: ch.id, name: ch.name, price: ch.price });
              } else if (r() < 0.28) {
                const ch = g.choices[Math.floor(r() * g.choices.length)];
                options.push({ groupId: g.id, group: g.name, id: ch.id, name: ch.name, price: ch.price });
              }
            });
            const unitPrice = item.price + options.reduce((a, o) => a + o.price, 0);
            lines.push({ itemId: item.id, name: item.name, qty: r() < 0.1 ? 2 : 1, unitPrice, options });
          }
          const subtotal = lines.reduce((a, l) => a + l.unitPrice * l.qty, 0);
          const type = pick(r, [['dine-in', 60], ['take-out', 32], ['delivery', 8]]);
          const method = pick(r, [['GCASH', 55], ['CASH', 35], ['MAYA', 10]]);
          let discount = 0, discountType = '';
          const roll = r();
          if (roll < 0.06) { discount = seniorDiscount(subtotal, 1, Math.max(1, nLines)); discountType = 'Senior/PWD'; }
          else if (roll < 0.11 && subtotal >= 150) { discount = 20; discountType = 'Voucher'; }
          const deliveryFee = type === 'delivery' ? D.delivery.fee : 0;
          out.push({ sample: true, orderNo: 'SAMPLE', paidAt: at.toISOString(), createdAt: at.toISOString(), items: lines, subtotal: round2(subtotal), discount: round2(discount), discountType, deliveryFee, total: round2(subtotal - discount + deliveryFee), method, type, source: r() < 0.7 ? 'qr' : 'pos' });
        }
      }
      history._cache = out;
      return out;
    },
    // Paid, not voided orders in [from, to), normalized for reports
    sales(from, to, includeSample) {
      const real = orders.list().filter(o => o.paidAt && o.status !== 'voided').map(o => ({
        sample: false, orderNo: o.orderNo, paidAt: o.paidAt, createdAt: o.createdAt, items: o.items, subtotal: o.subtotal,
        discount: round2((o.voucher ? o.voucher.amount : 0) + (o.senior ? o.senior.amount : 0) + (o.pointsUsed || 0)),
        discountType: o.senior ? 'Senior/PWD' : o.voucher ? 'Voucher' : o.pointsUsed ? 'Points' : '',
        deliveryFee: o.deliveryFee || 0, total: o.total, method: o.method, type: o.type, source: o.source || 'qr'
      }));
      const all = (includeSample === false ? [] : history.sample()).concat(real);
      return all.filter(o => { const t = new Date(o.paidAt); return t >= from && t < to; });
    },
    // Sample wastage (one or two entries a day) for days before today
    sampleWastage() {
      const out = [];
      const perishable = [['milk', 500, 'Spoiled or expired'], ['croissant', 2, 'Spoiled or expired'], ['pearls', 300, 'Spoiled or expired'], ['beans', 36, 'Remade (wrong order)'], ['cream', 200, 'Spoiled or expired'], ['ensaymada', 1, 'Spoiled or expired'], ['oat', 240, 'Spilled or dropped'], ['egg', 2, 'Spilled or dropped']];
      const today = new Date(); today.setHours(0, 0, 0, 0);
      for (let d = 30; d >= 1; d--) {
        const day = new Date(today.getTime() - d * 86400000);
        const k = Number(ymd(day)) % perishable.length;
        [perishable[k], perishable[(k + 3) % perishable.length]].slice(0, d % 3 === 0 ? 2 : 1).forEach(([ing, qty, reason], i) => {
          const g = inventory.ing(ing);
          if (g) out.push({ sample: true, at: new Date(day.getTime() + (20 + i) * 3600000).toISOString(), ing, qty: -qty, type: 'WASTAGE', note: reason, user: 'Sample data', cost: round2(qty * g.cost) });
        });
      }
      return out;
    }
  };

  // ---- Senior citizen / PWD discount ----
  // The eligible share (subtotal × eligible ÷ diners) is made VAT-exempt, then 20% off.
  // seniorDiscount(245, 1, 1) -> 70  (245 ÷ 1.12 = 218.75, less 20% = 175)
  function seniorDiscount(subtotal, eligible, diners) {
    const cfg = window.BB_DATA.seniorPwd;
    const share = subtotal * Math.min(eligible, diners) / diners;
    const exempt = share / (1 + cfg.vat);
    const discounted = exempt * (1 - cfg.percent / 100);
    return round2(share - discounted);
  }

  // Total after every adjustment on the order
  function orderTotal(o) {
    const t = o.subtotal
      - (o.voucher ? o.voucher.amount : 0)
      - (o.senior ? o.senior.amount : 0)
      - (o.pointsUsed || 0)
      + (o.deliveryFee || 0);
    return round2(Math.max(0, t));
  }

  // ---- Staff login (demo only) ----
  const staff = {
    current: () => get('staff', null),
    login(username, password) {
      const u = (window.BB_DATA.users || []).find(x => x.username === username.trim().toLowerCase() && x.password === password && x.active !== false);
      if (!u) return null;
      const s = { id: u.id, name: u.name, username: u.username, role: u.role, since: new Date().toISOString() };
      set('staff', s);
      audit.log('Logged in', `${u.name} (${u.role})`, s);
      return s;
    },
    logout() {
      const s = staff.current();
      if (s) audit.log('Logged out', s.name, s);
      set('staff', null);
    }
  };

  // ---- Audit log ----
  const audit = {
    list: () => get('audit', []),
    log(action, detail, who) {
      const u = who || staff.current() || { name: 'Customer (QR)', role: 'customer' };
      const all = audit.list();
      all.push({ id: 'a' + Date.now() + Math.random().toString(36).slice(2, 5), at: new Date().toISOString(), user: u.name, role: u.role, action, detail });
      set('audit', all);
    }
  };

  // Status wording shown to customers
  const STATUS = {
    awaiting_payment: { label: 'Awaiting payment', chip: 'chip-caramel' },
    paid: { label: 'Order received', chip: 'chip-gcash' },
    preparing: { label: 'Preparing', chip: 'chip-gold' },
    ready: { label: 'Ready', chip: 'chip-green' },
    completed: { label: 'Completed', chip: 'chip-muted' },
    cancelled: { label: 'Cancelled', chip: 'chip-red' },
    voided: { label: 'Voided', chip: 'chip-red' }
  };

  window.BB = { get, set, reset, peso, round2, ymd, nextNumber, dateTime, session, cart, checkVoucher, loyalty, orders, payments, STATUS, seniorDiscount, orderTotal, staff, audit, menu, inventory, admin, history };
})();

/* Brew & Bite Café — helpers shared by the customer screens */
(function () {
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  // "Iced · Large (16 oz) · Oat milk, Extra espresso shot"
  function optionText(line) {
    const singles = line.options.filter(o => o.groupId !== 'addons' && o.groupId !== 'side').map(o => o.groupId === 'sugar' ? o.name + ' sugar' : o.name);
    const multis = line.options.filter(o => o.groupId === 'addons' || o.groupId === 'side').map(o => o.name);
    return [...singles, multis.join(', ')].filter(Boolean).join(' · ');
  }

  function sessionLabel(s) {
    return s.type === 'dine-in' ? `TABLE ${s.table} · DINE-IN` : 'TAKE-OUT';
  }

  function orderTypeLabel(o) {
    if (o.type === 'dine-in') return `Dine-in · Table ${o.table}`;
    if (o.type === 'delivery') return 'Delivery';
    return 'Take-out';
  }

  // Screens after the menu need a scanned QR session; otherwise send people to the menu's scan prompt
  function requireSession() {
    const s = BB.session.get();
    if (!s) { location.replace('customer.html'); return null; }
    const pill = document.getElementById('sessionPill');
    if (pill) pill.textContent = sessionLabel(s);
    return s;
  }

  let toastTimer;
  function toast(msg) {
    let el = document.querySelector('.toast-pop');
    if (!el) { el = document.createElement('div'); el.className = 'toast-pop'; el.setAttribute('role', 'status'); document.body.appendChild(el); }
    el.textContent = msg;
    el.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { el.hidden = true; }, 2400);
  }

  // Item rows used in cart summaries and receipts
  function lineRows(lines) {
    return lines.map(l => `
      <div class="li">
        <span class="li-qty">${l.qty}×</span>
        <span class="li-main"><b>${esc(l.name)}</b>${optionText(l) ? `<small>${esc(optionText(l))}</small>` : ''}${l.notes ? `<small class="li-note">Note: ${esc(l.notes)}</small>` : ''}</span>
        <span class="li-amt num">${BB.peso(l.unitPrice * l.qty, true)}</span>
      </div>`).join('');
  }

  // Drawn art for a menu item: a layered glass for drinks, a plate for food
  function art(item) {
    const D = window.BB_DATA;
    if (D.drinkCats.includes(item.cat)) {
      return `<span class="art-glass" aria-hidden="true"><i style="height:22%;background:${item.tone[1]}"></i><i style="height:48%;background:linear-gradient(to top, ${item.tone[1]}, ${item.tone[0]})"></i><i style="height:12%;background:${item.tone[1]};opacity:.55"></i></span>`;
    }
    return `<span class="art-plate" aria-hidden="true"><i style="background:radial-gradient(circle at 35% 35%, ${item.tone[1]}, ${item.tone[0]})"></i></span>`;
  }

  window.BBC = { esc, optionText, sessionLabel, orderTypeLabel, requireSession, toast, lineRows, art };
})();

/* Brew & Bite Café — shared shell for staff screens (login guard, sidebar, clock) */
(function () {
  // Every staff screen; "built" ones are clickable, the rest show as planned.
  const NAV = [
    { group: 'Cashier', roles: ['cashier', 'admin'], links: [
      { id: 'pos', label: 'Point of sale', href: 'cashier.html', built: true },
      { id: 'orders', label: 'Orders', href: 'cashier.html?view=orders', built: true, badge: 'awaiting' }
    ]},
    { group: 'Kitchen', roles: ['kitchen', 'admin'], links: [
      { id: 'kitchen', label: 'Kitchen display', href: 'kitchen.html', built: true }
    ]},
    { group: 'Inventory', roles: ['inventory', 'admin'], links: [
      { id: 'ingredients', label: 'Ingredients', href: 'inventory.html', built: true },
      { id: 'alerts', label: 'Low-stock alerts', href: 'inventory.html?view=alerts', built: true, badge: 'lowstock' },
      { id: 'suppliers', label: 'Suppliers', href: 'inventory.html?view=suppliers', built: true },
      { id: 'po', label: 'Purchase orders', href: 'inventory.html?view=purchase-orders', built: true },
      { id: 'wastage', label: 'Wastage & counts', href: 'inventory.html?view=wastage', built: true }
    ]},
    { group: 'Admin', roles: ['admin'], links: [
      { id: 'dashboard', label: 'Dashboard', href: 'admin.html', built: true },
      { id: 'reports', label: 'Reports', href: 'admin.html?view=reports', built: true },
      { id: 'menu', label: 'Menu & prices', href: 'admin.html?view=menu', built: true },
      { id: 'recipes', label: 'Recipes & costing', href: 'admin.html?view=recipes', built: true },
      { id: 'promos', label: 'Promos & vouchers', href: 'admin.html?view=promos', built: true },
      { id: 'loyalty', label: 'Loyalty', href: 'admin.html?view=loyalty', built: true },
      { id: 'users', label: 'Users & roles', href: 'admin.html?view=users', built: true },
      { id: 'audit', label: 'Audit logs', href: 'admin.html?view=audit', built: true }
    ]}
  ];

  const ROLE_NAME = { admin: 'Owner / Admin', cashier: 'Cashier', kitchen: 'Kitchen', inventory: 'Stock clerk' };

  // Redirects to login unless the logged-in user has one of the roles (admin may open everything).
  // Then draws the sidebar with `active` highlighted.
  function init(roles, active) {
    const user = BB.staff.current();
    const here = location.pathname.split('/').pop() + location.search;
    if (!user) { location.replace('login.html?next=' + encodeURIComponent(here)); return null; }
    if (user.role !== 'admin' && !roles.includes(user.role)) {
      document.body.innerHTML = `<div style="padding:48px 24px;text-align:center;display:grid;gap:12px;justify-items:center">
        <h1 style="font-family:var(--display)">You don’t have access to this screen</h1>
        <p class="muted">You’re logged in as ${BBC.esc(user.name)} (${ROLE_NAME[user.role]}).</p>
        <a class="btn btn-primary" href="login.html">Log in as someone else</a></div>`;
      return null;
    }
    renderSide(user, active);
    startClock();
    return user;
  }

  function renderSide(user, active) {
    const side = document.getElementById('side');
    if (!side) return;
    // Admin sees its own group first
    const groups = NAV.filter(g => g.roles.includes(user.role)).sort((a, b) => (b.group === 'Admin') - (a.group === 'Admin'));
    side.innerHTML = `
      <a class="brand" href="index.html"><span class="brand-mark">B&amp;B</span><span class="brand-name">Brew &amp; Bite</span></a>
      ${groups.map(g => `
        <nav class="side-group" aria-label="${g.group}">
          <h4>${g.group}</h4>
          ${g.links.map(l => `<a class="nav${l.id === active ? ' on' : ''}${l.built ? '' : ' planned'}" href="${l.href}" ${l.built ? '' : 'title="Not built yet"'}>
            <span>${l.label}</span>${l.badge ? '<span class="count" data-badge="' + l.badge + '" hidden></span>' : ''}</a>`).join('')}
        </nav>`).join('')}
      <div class="side-user">
        <span><b>${BBC.esc(user.name)}</b><small>${ROLE_NAME[user.role]}</small></span>
        <div class="side-buttons">
          <button type="button" id="logout">Log out</button>
          <button class="theme-toggle" type="button" data-theme-toggle aria-pressed="false" aria-label="Switch to dark mode">
            <svg class="i-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/></svg>
            <svg class="i-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
          </button>
        </div>
      </div>`;
    document.getElementById('logout').addEventListener('click', () => {
      BB.staff.logout();
      location.href = 'login.html';
    });
    updateBadges();
    setInterval(updateBadges, 3000);
  }

  function updateBadges() {
    const n = BB.orders.list().filter(BB.orders.unpaid).length;
    document.querySelectorAll('[data-badge="awaiting"]').forEach(b => { b.hidden = n === 0; b.textContent = n; });
    const low = document.querySelectorAll('[data-badge="lowstock"]');
    if (low.length) {
      const k = BB.inventory.ingredients().filter(i => BB.inventory.level(i) !== 'ok').length;
      low.forEach(b => { b.hidden = k === 0; b.textContent = k; });
    }
  }

  function startClock() {
    const el = document.getElementById('clock');
    if (!el) return;
    const tick = () => { el.textContent = new Date().toLocaleString('en-PH', { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }); };
    tick();
    setInterval(tick, 15000);
  }

  // "8 min ago"
  function ago(iso) {
    const m = Math.floor((Date.now() - new Date(iso)) / 60000);
    if (m < 1) return 'just now';
    if (m < 60) return m + ' min ago';
    const h = Math.floor(m / 60);
    return h + ' hr ' + (m % 60) + ' min ago';
  }

  // Calls fn whenever saved orders change (another tab, or every few seconds)
  function onOrdersChange(fn) {
    let last = '';
    const check = () => {
      let raw = '';
      try { raw = localStorage.getItem('bb_orders') || ''; } catch (e) { /* storage blocked */ }
      if (raw !== last) { last = raw; fn(); }
    };
    window.addEventListener('storage', check);
    setInterval(check, 3000);
    check();
  }

  window.BBS = { init, ago, onOrdersChange, ROLE_NAME };
})();

/* Brew & Bite Café — small SVG charts for the admin screens (no library) */
(function () {
  const NS = 'http://www.w3.org/2000/svg';
  const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  // "Nice" axis max and ticks
  function niceMax(v) {
    if (v <= 0) return 1;
    const p = Math.pow(10, Math.floor(Math.log10(v)));
    const n = v / p;
    return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10) * p;
  }

  function tooltip(host) {
    let tip = host.querySelector('.chart-tip');
    if (!tip) { tip = document.createElement('div'); tip.className = 'chart-tip'; tip.hidden = true; host.appendChild(tip); }
    return tip;
  }

  /* Vertical bar chart.
     data: [{ label, value, tip }]  opts: { format(v), height, highlight: index, axisLabel } */
  function bars(host, data, opts) {
    opts = opts || {};
    const fmt = opts.format || (v => v);
    const W = Math.max(host.clientWidth || 600, 280), H = opts.height || 220;
    const pad = { t: 12, r: 8, b: 26, l: 56 };
    const iw = W - pad.l - pad.r, ih = H - pad.t - pad.b;
    const max = niceMax(Math.max(0, ...data.map(d => d.value)));
    const step = iw / Math.max(1, data.length);
    const bw = Math.max(3, Math.min(28, step * 0.62));
    const labelEvery = Math.ceil(data.length / Math.max(1, Math.floor(iw / 44)));

    let svg = `<svg viewBox="0 0 ${W} ${H}" width="100%" height="${H}" role="img" aria-label="${esc(opts.axisLabel || 'Bar chart')}">`;
    for (let i = 0; i <= 4; i++) {
      const v = max * i / 4, y = pad.t + ih - ih * i / 4;
      svg += `<line x1="${pad.l}" x2="${W - pad.r}" y1="${y}" y2="${y}" class="grid"/>`;
      svg += `<text x="${pad.l - 8}" y="${y + 4}" text-anchor="end" class="axis">${esc(fmt(v, true))}</text>`;
    }
    data.forEach((d, i) => {
      const h = max ? ih * d.value / max : 0;
      const x = pad.l + step * i + (step - bw) / 2, y = pad.t + ih - h;
      const r = Math.min(4, bw / 2, h);
      // Rounded top, square base
      const path = h > 0 ? `M${x},${pad.t + ih} V${y + r} Q${x},${y} ${x + r},${y} H${x + bw - r} Q${x + bw},${y} ${x + bw},${y + r} V${pad.t + ih} Z` : '';
      svg += `<g class="bar${opts.highlight === i ? ' hl' : ''}" data-i="${i}">
        <rect x="${pad.l + step * i}" y="${pad.t}" width="${step}" height="${ih}" class="hit"/>
        ${path ? `<path d="${path}"/>` : ''}
      </g>`;
      // Label every Nth bar plus the last one, skipping a regular label that would crowd the last
      const last = data.length - 1;
      if (i === last || (i % labelEvery === 0 && last - i >= labelEvery)) svg += `<text x="${pad.l + step * i + step / 2}" y="${H - 8}" text-anchor="middle" class="axis">${esc(d.label)}</text>`;
    });
    svg += `<line x1="${pad.l}" x2="${W - pad.r}" y1="${pad.t + ih}" y2="${pad.t + ih}" class="base"/></svg>`;
    host.classList.add('chart');
    host.innerHTML = svg;
    const tip = tooltip(host);

    host.querySelectorAll('.bar').forEach(g => {
      const show = (e) => {
        const d = data[g.dataset.i];
        host.querySelectorAll('.bar').forEach(b => b.classList.toggle('on', b === g));
        tip.innerHTML = d.tip || `<b>${esc(d.label)}</b><span>${esc(fmt(d.value))}</span>`;
        tip.hidden = false;
        const box = host.getBoundingClientRect();
        const bx = g.querySelector('.hit').getBoundingClientRect();
        let left = bx.left - box.left + bx.width / 2 - tip.offsetWidth / 2;
        left = Math.max(0, Math.min(left, box.width - tip.offsetWidth));
        tip.style.left = left + 'px';
        tip.style.top = '0px';
      };
      g.addEventListener('mouseenter', show);
      g.addEventListener('click', show);
    });
    host.addEventListener('mouseleave', () => { tip.hidden = true; host.querySelectorAll('.bar').forEach(b => b.classList.remove('on')); });
  }

  /* 100% share bar with labeled legend. parts: [{ label, value, color }] */
  function share(host, parts, fmt) {
    fmt = fmt || (v => v);
    const total = parts.reduce((n, p) => n + p.value, 0) || 1;
    host.innerHTML = `
      <div class="share-bar" role="img" aria-label="${esc(parts.map(p => `${p.label} ${Math.round(p.value / total * 100)}%`).join(', '))}">
        ${parts.filter(p => p.value > 0).map(p => `<i style="flex:${p.value};background:${p.color}" title="${esc(p.label)}: ${esc(fmt(p.value))}"></i>`).join('')}
      </div>
      <div class="share-legend">
        ${parts.map(p => `<span><i style="background:${p.color}"></i>${esc(p.label)} <b>${Math.round(p.value / total * 100)}%</b> <small>${esc(fmt(p.value))}</small></span>`).join('')}
      </div>`;
  }

  window.BBChart = { bars, share };
})();

window.BBViews = {};

/* ===== index/index ===== */
BBViews['index/index'] = function () {
  const D = BB_DATA;
  const $ = (id) => document.getElementById(id);
  const esc = BBC.esc;

  const icon = {
    qr: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3M21 14v.01M14 21h3M21 18v3"/></svg>',
    globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="7" y="2.5" width="10" height="19" rx="2"/><path d="M11 18.5h2"/></svg>',
    till: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4M7 8h4M7 11h7"/></svg>',
    cup: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 10h12v5a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5z"/><path d="M17 11h1.5a2.5 2.5 0 0 1 0 5H17M9 3v3M13 3v3"/></svg>',
    box: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 7.5 12 3l9 4.5v9L12 21l-9-4.5z"/><path d="m3 7.5 9 4.5 9-4.5M12 12v9"/></svg>',
    chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>'
  };

  // Demo login for a role, e.g. "cashier / cashier123"
  const login = (role) => { const u = D.users.find(x => x.role === role && x.active !== false); return u ? `${u.username} / ${u.password}` : 'no active account'; };

  const ROLES = [
    { title: 'Public', who: 'Anyone · phone or laptop', icon: icon.globe, screens: [
      { name: 'Café homepage', file: 'home.html' },
      { name: 'Staff login', file: 'login.html' }
    ]},
    { title: 'Customer', who: 'Own phone, after scanning a table QR', icon: icon.phone, screens: [
      { name: 'Menu', file: 'customer.html?table=5' },
      { name: 'Cart', file: 'customer.html?view=cart' },
      { name: 'Checkout', file: 'customer.html?view=checkout' },
      { name: 'GCash / Maya payment', file: 'customer.html?view=pay', flow: 'Opens from checkout' },
      { name: 'Payment success and receipt', file: 'customer.html?view=success', flow: 'Opens after paying' },
      { name: 'My orders and tracker', file: 'customer.html?view=track' }
    ]},
    { title: 'Cashier', role: 'cashier', who: 'Counter tablet or PC', icon: icon.till, badge: 'unpaid', screens: [
      { name: 'Point of sale', file: 'cashier.html' },
      { name: 'Orders and payments', file: 'cashier.html?view=orders' },
      { name: 'Take payment, senior/PWD discount', file: 'cashier.html?view=payment', flow: 'Opens from Orders' },
      { name: 'Receipt', file: 'cashier.html?view=receipt', flow: 'Opens after payment' }
    ]},
    { title: 'Kitchen', role: 'kitchen', who: 'Wall-mounted screen', icon: icon.cup, badge: 'kitchen', screens: [
      { name: 'Kitchen display and sold-out switches', file: 'kitchen.html' }
    ]},
    { title: 'Inventory', role: 'inventory', who: 'Stock clerk · back-office PC', icon: icon.box, badge: 'low', screens: [
      { name: 'Ingredients and stock', file: 'inventory.html' },
      { name: 'Low-stock alerts', file: 'inventory.html?view=alerts' },
      { name: 'Suppliers', file: 'inventory.html?view=suppliers' },
      { name: 'Purchase orders', file: 'inventory.html?view=purchase-orders' },
      { name: 'Wastage and stock counts', file: 'inventory.html?view=wastage' }
    ]},
    { title: 'Admin', role: 'admin', who: 'Owner · laptop or phone', icon: icon.chart, screens: [
      { name: 'Sales dashboard', file: 'admin.html' },
      { name: 'Reports', file: 'admin.html?view=reports' },
      { name: 'Menu and prices', file: 'admin.html?view=menu' },
      { name: 'Recipes and costing', file: 'admin.html?view=recipes' },
      { name: 'Promos and vouchers', file: 'admin.html?view=promos' },
      { name: 'Loyalty', file: 'admin.html?view=loyalty' },
      { name: 'Users and roles', file: 'admin.html?view=users' },
      { name: 'Audit logs', file: 'admin.html?view=audit' }
    ]}
  ];

  const WALK = [
    { title: 'Order as a customer', sub: 'Table 5 · choose cash at the counter', href: 'customer.html?table=5' },
    { title: 'Take the payment', sub: () => `Cashier › Orders · <code>${esc(login('cashier'))}</code>`, href: 'cashier.html?view=orders' },
    { title: 'Prepare and serve it', sub: () => `Kitchen display · <code>${esc(login('kitchen'))}</code>`, href: 'kitchen.html' },
    { title: 'Check the stock it used', sub: () => `Inventory · <code>${esc(login('inventory'))}</code>`, href: 'inventory.html' },
    { title: 'See it in the sales report', sub: () => `Admin dashboard · <code>${esc(login('admin'))}</code>`, href: 'admin.html' }
  ];

  $('walk').innerHTML = WALK.map(s => `
    <li><a href="${s.href}" target="_blank" rel="noopener">
      <b>${s.title}</b><span class="go" aria-hidden="true">↗</span>
      <small>${typeof s.sub === 'function' ? s.sub() : esc(s.sub)}</small>
    </a></li>`).join('');

  function render() {
    const orders = BB.orders.list();
    const today = BB.ymd();
    const active = orders.filter(o => !['completed', 'cancelled', 'voided'].includes(o.status));
    const unpaid = orders.filter(BB.orders.unpaid).length;
    const kitchen = orders.filter(o => ['paid', 'preparing', 'ready'].includes(o.status)).length;
    const low = BB.inventory.ingredients().filter(i => BB.inventory.level(i) !== 'ok').length;
    const todayCount = orders.filter(o => BB.ymd(new Date(o.createdAt)) === today).length;
    const counts = { unpaid, kitchen, low };

    const item = (n, label, attn) => `<span class="live-item ${n && attn ? 'attn' : n ? 'ok' : ''}"><span class="dot" aria-hidden="true"></span><b>${n}</b> ${label}</span>`;
    $('live').innerHTML = item(todayCount, 'orders today') + item(unpaid, 'awaiting payment', true) + item(kitchen, 'in the kitchen') + item(low, 'low on stock', true);

    // Floor plan: five tables seen from above (chairs around, QR standee in the middle) + delivery
    const FLOOR = [
      { t: 1, shape: 'round2' }, { t: 2, shape: 'round2' }, { t: 3, shape: 'square4' },
      { t: 4, shape: 'square4' }, { t: 5, shape: 'long6' }
    ];
    // Icon style: thick rounded outlines, flat tan fill, seen from above.
    // Chair = seat square + backrest line on the side away from the table.
    const seat = (x, y, w, h) => `<rect class="fp-fill fp-ink" x="${x}" y="${y}" width="${w}" height="${h}" rx="3"/>`;
    const back = (x1, y1, x2, y2) => `<line class="fp-ink" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`;
    const chairL = (cx, cy) => seat(cx - 6, cy - 9, 12, 18) + back(cx - 11, cy - 11, cx - 11, cy + 11);
    const chairR = (cx, cy) => seat(cx - 6, cy - 9, 12, 18) + back(cx + 11, cy - 11, cx + 11, cy + 11);
    const chairT = (cx, cy) => seat(cx - 9, cy - 6, 18, 12) + back(cx - 11, cy - 11, cx + 11, cy - 11);
    const chairB = (cx, cy) => seat(cx - 9, cy - 6, 18, 12) + back(cx - 11, cy + 11, cx + 11, cy + 11);
    // QR card in the middle of the table
    const qr = `<g transform="translate(51 41)"><rect class="fp-card fp-ink" width="18" height="18" rx="3" style="stroke-width:3"/>
      <rect class="fp-dot" x="4.5" y="4.5" width="3.5" height="3.5"/><rect class="fp-dot" x="10" y="4.5" width="3.5" height="3.5"/><rect class="fp-dot" x="4.5" y="10" width="3.5" height="3.5"/><rect class="fp-dot" x="10.5" y="10.5" width="3" height="3"/></g>`;
    const PLAN = {
      round2: { seats: 2, svg: chairL(24, 50) + chairR(96, 50) + '<circle class="fp-fill fp-ink" cx="60" cy="50" r="24"/>' + qr },
      square4: { seats: 4, svg: chairT(60, 16) + chairB(60, 84) + chairL(22, 50) + chairR(98, 50) + '<rect class="fp-fill fp-ink" x="36" y="28" width="48" height="44" rx="5"/>' + qr },
      long6: { seats: 6, svg: [32, 60, 88].map(x => chairT(x, 16) + chairB(x, 84)).join('') + '<rect class="fp-fill fp-ink" x="16" y="30" width="88" height="40" rx="5"/>' + qr }
    };
    let tiles = '';
    FLOOR.forEach(({ t, shape }) => {
      const n = active.filter(o => o.type === 'dine-in' && o.table === t).length;
      const p = PLAN[shape];
      tiles += `<a class="spot${n ? ' busy' : ''}" href="customer.html?table=${t}" aria-label="Table ${t}, ${p.seats} seats${n ? `, ${n} open order${n > 1 ? 's' : ''}` : ', free'}">
        <svg class="fp" viewBox="-14 -12 148 124" aria-hidden="true">${p.svg}</svg>
        <span class="spot-label"><b>Table ${String(t).padStart(2, '0')}</b><small>${p.seats} seats</small></span>
        <span class="state">${n ? `${n} open order${n > 1 ? 's' : ''}` : 'Free'}</span></a>`;
    });
    // Take-out and delivery start from the counter QR
    const takeout = active.filter(o => o.type !== 'dine-in').length;
    tiles += `<a class="spot rider${takeout ? ' busy' : ''}" href="customer.html?type=takeout" aria-label="Take-out and delivery${takeout ? `, ${takeout} open order${takeout > 1 ? 's' : ''}` : ''}">
      <svg class="fp" viewBox="-14 -12 148 124" aria-hidden="true">
        <line class="fp-ink" x1="6" y1="40" x2="18" y2="40"/><line class="fp-ink" x1="2" y1="52" x2="13" y2="52"/>
        <rect class="fp-fill fp-ink" x="34" y="24" width="24" height="20" rx="3"/>
        <circle class="fp-ink fp-none" cx="30" cy="72" r="12"/><circle class="fp-ink fp-none" cx="94" cy="72" r="12"/>
        <path class="fp-ink fp-none" d="M30 72h24l12-20h16l12 20M54 52H40M82 52l-6-18h-8"/>
        <circle class="fp-fill fp-ink" cx="70" cy="22" r="7"/>
      </svg>
      <span class="spot-label"><b>Take-out</b><small>&amp; delivery</small></span>
      <span class="state">${takeout ? `${takeout} open order${takeout > 1 ? 's' : ''}` : 'Counter QR'}</span></a>`;
    $('tables').innerHTML = tiles;

    // Screens grouped by role
    const BADGE = {
      unpaid: () => counts.unpaid ? `<span class="chip chip-caramel">${counts.unpaid} unpaid</span>` : '',
      kitchen: () => counts.kitchen ? `<span class="chip chip-green">${counts.kitchen} in queue</span>` : '',
      low: () => counts.low ? `<span class="chip chip-caramel">${counts.low} low</span>` : ''
    };
    $('roles').innerHTML = ROLES.map(r => `
      <article class="role">
        <div class="role-head">
          <span class="role-icon">${r.icon}</span>
          <h3>${r.title}</h3>
          ${r.badge ? BADGE[r.badge]() : ''}
          <p>${r.who}</p>
        </div>
        ${r.role ? `<div class="login-hint"><span>Demo login</span><code>${esc(login(r.role))}</code></div>` : ''}
        <ul>${r.screens.map(s => s.flow
          ? `<li><div><span class="name">${s.name}</span><span class="path">${s.file}</span><span class="flow">${s.flow}</span></div></li>`
          : `<li><a href="${s.file}"><span class="name">${s.name}</span><span class="path">${s.file}</span><span class="go" aria-hidden="true">→</span></a></li>`).join('')}
        </ul>
      </article>`).join('');
  }

  // Reset asks once more before wiping, since it can't be undone
  const resetBtn = $('resetDemo');
  let armed = null;
  resetBtn.addEventListener('click', () => {
    if (!armed) {
      resetBtn.textContent = 'Click again to erase all demo orders';
      resetBtn.classList.add('confirm');
      armed = setTimeout(() => { armed = null; resetBtn.textContent = 'Reset demo data'; resetBtn.classList.remove('confirm'); }, 4000);
      return;
    }
    clearTimeout(armed); armed = null;
    resetBtn.textContent = 'Reset demo data';
    resetBtn.classList.remove('confirm');
    $('resetMsg').textContent = BB.reset() ? 'Demo data reset.' : 'Could not reset: browser storage is blocked.';
    render();
  });

  BBS.onOrdersChange(render);
};

/* ===== home/index ===== */
BBViews['home/index'] = function () {
  const D = BB_DATA;
  const $ = (id) => document.getElementById(id);
  const esc = BBC.esc;

  $('promoText').textContent = D.promo.text;
  $('promoCode').textContent = D.promo.code;
  $('addr').textContent = D.cafe.address;
  $('hours').textContent = D.cafe.hours;
  $('phone').textContent = D.cafe.phone;
  $('fb').textContent = D.cafe.facebook;

  // ---- What's in the glass: layers listed bottom to top, heights in % of the glass ----
  const CUPS = [
    { id: 'spanish', tab: 'Spanish Latte', note: 'Iced · our best seller', layers: [
      ['Condensed milk', '30 ml', 12, '#D2A25A'], ['Fresh milk', '150 ml', 44, '#EEE2CF'], ['Espresso', '2 shots', 24, '#5B3521'], ['Milk foam', '', 10, '#F7EFE3']] },
    { id: 'matcha', tab: 'Matcha Latte', note: 'Ceremonial-grade matcha', layers: [
      ['Fresh milk', '200 ml', 46, '#F0E6D4'], ['Matcha', '6 g whisked', 34, '#7E9B4F'], ['Matcha foam', '', 10, '#E3E8C8']] },
    { id: 'brownsugar', tab: 'Brown Sugar', note: 'Warm pearls, cold milk', layers: [
      ['Tapioca pearls', '60 g', 16, '#3A2214', 'pearls'], ['Brown sugar syrup', '40 ml', 14, '#8E4F21'], ['Fresh milk', '200 ml', 58, '#F1E6D5']] }
  ].filter(c => D.items.some(i => i.id === c.id));
  const MAX_LAYERS = 4;
  $('glass').innerHTML = Array.from({ length: MAX_LAYERS }, () => '<span class="layer" style="height:0"></span>').join('');

  $('cupTabs').innerHTML = CUPS.map((c, i) => {
    const item = D.items.find(x => x.id === c.id);
    return `<button type="button" role="tab" id="tab-${c.id}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-i="${i}">${esc(c.tab)}</button>`;
  }).join('');

  function showCup(i) {
    const c = CUPS[i], item = D.items.find(x => x.id === c.id);
    $('cupTabs').querySelectorAll('button').forEach((b, k) => { b.setAttribute('aria-selected', String(k === i)); b.tabIndex = k === i ? 0 : -1; });
    $('glass').querySelectorAll('.layer').forEach((el, k) => {
      const l = c.layers[k];
      el.style.height = l ? l[2] + '%' : '0';
      el.style.backgroundColor = l ? l[3] : 'transparent';
      el.className = 'layer' + (l && l[4] ? ' ' + l[4] : '');
    });
    $('legend').innerHTML = c.layers.map(l => `<li><i style="background:${l[3]}"></i><span>${esc(l[0])}</span><span>${esc(l[1])}</span></li>`).join('');
    $('cupName').textContent = item.name;
    $('cupNote').textContent = c.note;
    $('cupPrice').textContent = BB.peso(item.price);
  }
  let current = 0;
  $('cupTabs').addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) showCup(current = Number(b.dataset.i)); });
  // Arrow keys move between tabs, like a native tab list
  $('cupTabs').addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    current = (current + (e.key === 'ArrowRight' ? 1 : CUPS.length - 1)) % CUPS.length;
    showCup(current);
    $('cupTabs').querySelectorAll('button')[current].focus();
  });
  showCup(0);

  // ---- Favorites: drinks drawn as glasses, food as plates ----
  const art = (i) => {
    if (D.drinkCats.includes(i.cat)) {
      return `<span class="mini-glass" aria-hidden="true"><i style="height:24%;background:${i.tone[1]}"></i><i style="height:46%;background:linear-gradient(to top, ${i.tone[1]}, ${i.tone[0]})"></i><i style="height:12%;background:${i.tone[1]};opacity:.55"></i></span>`;
    }
    return `<span class="plate" aria-hidden="true"><i style="background:radial-gradient(circle at 35% 35%, ${i.tone[1]}, ${i.tone[0]})"></i></span>`;
  };
  const favs = D.items.filter(i => i.tags && i.tags.length && !BB.menu.isSoldOut(i));
  $('favs').innerHTML = favs.map(i => `
    <article class="fav">
      <div class="fav-art">
        <span class="tags">${i.tags.map(t => `<span class="chip ${t === 'New' ? 'chip-green' : 'chip-gold'}">${esc(t)}</span>`).join('')}</span>
        ${art(i)}
      </div>
      <div class="fav-body">
        <h3>${esc(i.name)}</h3>
        <p>${esc(i.desc)}</p>
        <span class="price">${BB.peso(i.price)}</span>
      </div>
    </article>`).join('');
};

/* ===== login/login ===== */
BBViews['login/login'] = function () {
  const $ = (id) => document.getElementById(id);
  const esc = BBC.esc;
  const params = new URLSearchParams(location.search);
  const ROLE_NAME = BBS.ROLE_NAME;
  // Where each role lands, and what each staff screen is called
  const HOME = { cashier: 'cashier.html', admin: 'admin.html', kitchen: 'kitchen.html', inventory: 'inventory.html' };
  const SCREEN = {
    cashier: { pos: 'Point of sale', orders: 'Orders', payment: 'Take payment', receipt: 'Receipt' },
    kitchen: { display: 'Kitchen display' },
    inventory: { ingredients: 'Ingredients', alerts: 'Low-stock alerts', suppliers: 'Suppliers', 'purchase-orders': 'Purchase orders', wastage: 'Wastage & counts' },
    admin: { dashboard: 'Dashboard', reports: 'Reports', menu: 'Menu & prices', recipes: 'Recipes & costing', promos: 'Promos & vouchers', loyalty: 'Loyalty', users: 'Users & roles', audit: 'Audit logs' }
  };
  const DEFAULT_VIEW = { cashier: 'pos', kitchen: 'display', inventory: 'ingredients', admin: 'dashboard' };
  function screenName(url) {
    const m = String(url).match(/^([a-z]+)\.html(?:\?(.*))?$/);
    if (!m || !SCREEN[m[1]]) return '';
    const view = new URLSearchParams(m[2] || '').get('view') || DEFAULT_VIEW[m[1]];
    return SCREEN[m[1]][view] || '';
  }

  const next = params.get('next');
  const nextOk = next && /^[a-z]+\.html(\?[\w=&.-]*)?$/.test(next) ? next : null;
  const dest = (user) => nextOk || HOME[user.role];

  // ---- Shift board ----
  const now = new Date();
  const h = now.getHours();
  $('today').textContent = now.toLocaleDateString('en-PH', { weekday: 'long', month: 'short', day: 'numeric' }) + ' · ' + now.toLocaleTimeString('en-PH', { hour: 'numeric', minute: '2-digit' });
  $('greet').innerHTML = `Good ${h < 12 ? 'morning' : h < 18 ? 'afternoon' : 'evening'}.<br><span>Good shift ahead.</span>`;
  function renderShift() {
    const orders = BB.orders.list();
    const unpaid = orders.filter(BB.orders.unpaid).length;
    const kitchen = orders.filter(o => ['paid', 'preparing', 'ready'].includes(o.status)).length;
    const low = BB.inventory.ingredients().filter(i => BB.inventory.level(i) !== 'ok').length;
    const tile = (n, label) => `<div class="${n ? 'hot' : ''}"><strong>${n}</strong><span>${label}</span></div>`;
    $('shift').innerHTML = tile(unpaid, 'waiting for payment') + tile(kitchen, 'in the kitchen') + tile(low, 'low on stock');
  }
  BBS.onOrdersChange(renderShift);

  // ---- Where they are headed ----
  if (nextOk && screenName(nextOk)) {
    $('context').hidden = false;
    $('contextText').innerHTML = `Log in to open <b>${esc(screenName(nextOk))}</b>.`;
  }

  // ---- Already logged in ----
  function showSignedIn() {
    const s = BB.staff.current();
    const signed = !!s;
    $('signedIn').hidden = !signed;
    $('form').hidden = signed;
    document.querySelector('.demo').hidden = signed;
    if (!signed) return;
    const initials = s.name.split(' ').map(x => x[0]).slice(0, 2).join('');
    const goName = screenName(dest(s)) || 'your screen';
    $('signedIn').innerHTML = `
      <div class="who"><span class="avatar" style="width:40px;height:40px;border-radius:50%;background:var(--accent);color:var(--on-accent);display:grid;place-items:center;font:700 .85rem var(--display)">${esc(initials)}</span>
        <span><b>You’re logged in as ${esc(s.name)}</b><br><small class="muted">${esc(ROLE_NAME[s.role])}</small></span></div>
      <div class="row">
        <a class="btn btn-primary" href="${dest(s)}">Continue to ${esc(goName)}</a>
        <button class="btn btn-ghost" type="button" id="switchUser">Switch user</button>
      </div>`;
    $('switchUser').addEventListener('click', () => { BB.staff.logout(); showSignedIn(); $('username').focus(); });
  }
  showSignedIn();

  // ---- Demo accounts ----
  const users = BB_DATA.users.filter(u => u.active !== false);
  $('accts').innerHTML = users.map(u => `
    <button type="button" class="acct" data-u="${esc(u.username)}" data-p="${esc(u.password)}" aria-pressed="false">
      <span class="avatar">${esc(u.name.split(' ').map(x => x[0]).slice(0, 2).join(''))}</span>
      <b>${esc(u.name)}</b>
      <small>${esc(ROLE_NAME[u.role])} · opens ${esc(screenName(HOME[u.role]))}</small>
      <code>${esc(u.username)}</code>
    </button>`).join('');
  $('accts').addEventListener('click', (e) => {
    const b = e.target.closest('.acct');
    if (!b) return;
    $('accts').querySelectorAll('.acct').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    $('username').value = b.dataset.u;
    $('password').value = b.dataset.p;
    clearError();
    $('submit').focus();
  });

  // From the navigator with ?role=cashier: fill the username for that role
  const pre = users.find(u => u.role === params.get('role'));
  if (pre && !BB.staff.current()) $('username').value = pre.username;

  // ---- Form ----
  $('showPw').addEventListener('click', () => {
    const show = $('password').type === 'password';
    $('password').type = show ? 'text' : 'password';
    $('showPw').textContent = show ? 'Hide' : 'Show';
    $('showPw').setAttribute('aria-pressed', String(show));
  });

  function showError(msg, field) {
    $('errText').textContent = msg;
    $('err').hidden = false;
    ['username', 'password'].forEach(id => $(id).setAttribute('aria-invalid', String(id === field || field === 'both')));
    $(field === 'password' ? 'password' : 'username').focus();
  }
  function clearError() {
    $('err').hidden = true;
    ['username', 'password'].forEach(id => $(id).removeAttribute('aria-invalid'));
  }
  ['username', 'password'].forEach(id => $(id).addEventListener('input', clearError));

  $('form').addEventListener('submit', (e) => {
    e.preventDefault();
    if (!$('username').value.trim()) return showError('Enter your username.', 'username');
    if (!$('password').value) return showError('Enter your password.', 'password');
    const user = BB.staff.login($('username').value, $('password').value);
    if (!user) return showError('That username and password don’t match an active account. Check them, or pick a demo account below.', 'both');
    $('submit').textContent = 'Opening ' + (screenName(dest(user)) || 'your screen') + '…';
    $('submit').disabled = true;
    location.href = dest(user);
  });

  if (!BB.staff.current()) $(pre ? 'password' : 'username').focus();
};

/* ===== customer/menu ===== */
BBViews['customer/menu'] = function () {
(function () {
  const D = window.BB_DATA;
  const $ = (id) => document.getElementById(id);
  D.items.forEach(i => { i.soldOut = BB.menu.isSoldOut(i); }); // kitchen's sold-out switches

  const ICONS = {
    cup: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 9h12v5a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M9 3c0 1.5 1 1.5 1 3M13 3c0 1.5 1 1.5 1 3"/></svg>',
    tea: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 7h12l-1.5 13a1 1 0 0 1-1 .9h-7a1 1 0 0 1-1-.9z"/><path d="M5 7h14M13 7l2-5"/><circle cx="10" cy="17" r=".8" fill="currentColor"/><circle cx="13" cy="15.5" r=".8" fill="currentColor"/><circle cx="12" cy="18" r=".8" fill="currentColor"/></svg>',
    bowl: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M8 11c0-2 1.5-3 4-3s4 1 4 3M7 4c.5 1 .5 2 0 3M12 3c.5 1 .5 2 0 3M17 4c.5 1 .5 2 0 3"/></svg>',
    bread: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15c0-5 3.6-9 8-9s8 4 8 9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/><path d="M9 9l1.5 3M12 8v4M15 9l-1.5 3"/></svg>'
  };
  const catOf = (item) => D.categories.find(c => c.id === item.cat);
  const tone = (item) => `background: linear-gradient(135deg, ${item.tone[0]}, ${item.tone[1]})`;
  const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  // ---- Session from the scanned QR code ----
  const params = new URLSearchParams(location.search);
  const tableParam = parseInt(params.get('table'), 10);
  let session = BB.session.get();

  if (tableParam >= 1 && tableParam <= D.cafe.tables) {
    const next = { type: 'dine-in', table: tableParam };
    if (!session || session.type !== next.type || session.table !== next.table) BB.cart.clear();
    session = next;
    BB.session.set(session);
  } else if (params.get('type') === 'takeout') {
    if (!session || session.type !== 'take-out') BB.cart.clear();
    session = { type: 'take-out', table: null };
    BB.session.set(session);
  }

  if (!session) { $('gate').hidden = false; return; }
  $('app').hidden = false;
  $('sessionPill').textContent = session.type === 'dine-in' ? `TABLE ${session.table} · DINE-IN` : 'TAKE-OUT';
  const myOrders = BB.orders.mine();
  if (myOrders.length) {
    const active = myOrders.filter(o => !['completed', 'cancelled'].includes(o.status)).length;
    $('myOrders').hidden = false;
    $('myOrders').textContent = active ? `My orders (${active} active)` : 'My orders';
  }

  // ---- Promo ----
  $('promo').innerHTML = `<span>${esc(D.promo.text)}. Use code at checkout.</span><code>${esc(D.promo.code)}</code>`;

  // ---- Categories and menu ----
  $('catBar').innerHTML = D.categories.map(c => `<button type="button" data-cat="${c.id}">${esc(c.name)}</button>`).join('');

  $('menu').innerHTML = D.categories.map(c => {
    const rows = D.items.filter(i => i.cat === c.id).map(i => `
      <button class="m-item" type="button" data-item="${i.id}" data-search="${esc((i.name + ' ' + i.desc).toLowerCase())}" ${i.soldOut ? 'disabled' : ''}>
        <span class="thumb">${BBC.art(i)}</span>
        <span class="m-body">
          <span class="m-name">${esc(i.name)}</span>
          ${i.tags || i.soldOut ? `<span class="tags">${(i.tags || []).map(t => `<span class="chip ${t === 'New' ? 'chip-green' : 'chip-gold'}">${t}</span>`).join('')}${i.soldOut ? '<span class="chip chip-red">Sold out</span>' : ''}</span>` : ''}
          <span class="m-desc">${esc(i.desc)}</span>
          <span class="m-foot">
            <span class="m-price">${hasPriceRange(i) ? 'from ' : ''}${BB.peso(i.price)}</span>
            ${i.soldOut ? '' : '<span class="m-add" aria-hidden="true">+</span>'}
          </span>
        </span>
      </button>`).join('');
    return `<section class="menu-section" id="sec-${c.id}" data-cat="${c.id}"><h2>${esc(c.name)}</h2><div class="menu-list">${rows}</div></section>`;
  }).join('');

  function hasPriceRange(item) {
    return (item.options || []).some(g => g.choices.some(ch => ch.price > 0));
  }

  // Category chips scroll to their section; the visible section highlights its chip
  const chips = [...$('catBar').querySelectorAll('button')];
  function setActive(cat) {
    chips.forEach(b => {
      const on = b.dataset.cat === cat;
      b.classList.toggle('on', on);
      if (on) b.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
    });
  }
  chips.forEach(b => b.addEventListener('click', () => {
    $('sec-' + b.dataset.cat).scrollIntoView({ behavior: 'smooth' });
    setActive(b.dataset.cat);
  }));
  setActive(D.categories[0].id);
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) setActive(e.target.dataset.cat); });
  }, { rootMargin: '-60px 0px -70% 0px' });
  document.querySelectorAll('.menu-section').forEach(s => observer.observe(s));

  // ---- Search ----
  $('search').addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase();
    let shown = 0;
    document.querySelectorAll('.menu-section').forEach(sec => {
      let inSec = 0;
      sec.querySelectorAll('.m-item').forEach(row => {
        const match = !q || row.dataset.search.includes(q);
        row.hidden = !match;
        if (match) inSec++;
      });
      sec.hidden = inSec === 0;
      shown += inSec;
    });
    $('noResults').hidden = shown > 0;
  });

  // ---- Item detail sheet ----
  let current = null;
  let qty = 1;

  $('menu').addEventListener('click', (e) => {
    const row = e.target.closest('.m-item');
    if (row && !row.disabled) openSheet(row.dataset.item);
  });

  function openSheet(id) {
    current = D.items.find(i => i.id === id);
    qty = 1;
    $('qty').textContent = qty;
    $('sheetNotes').value = '';
    $('sheetHero').querySelectorAll('.art-glass, .art-plate').forEach(s => s.remove());
    $('sheetHero').insertAdjacentHTML('beforeend', BBC.art(current));
    $('sheetTitle').textContent = current.name;
    $('sheetDesc').textContent = current.desc;
    $('sheetBase').textContent = BB.peso(current.price);

    $('sheetOptions').innerHTML = (current.options || []).map(g => {
      const isSingle = g.type === 'single';
      const pills = isSingle && g.choices.length > 3;
      const def = g.defaultChoice || g.choices[0].id;
      const opts = g.choices.map(ch => `
        <label class="opt">
          <input type="${isSingle ? 'radio' : 'checkbox'}" name="${g.id}" value="${ch.id}" ${isSingle && ch.id === def ? 'checked' : ''}>
          <span>${esc(ch.name)}</span>
          ${ch.price ? `<em>+${BB.peso(ch.price)}</em>` : ''}
        </label>`).join('');
      return `<fieldset class="opt-group"><legend>${esc(g.name)}<small>${g.required ? 'Required' : 'Optional'}</small></legend><div class="opt-list${pills ? ' pills' : ''}">${opts}</div></fieldset>`;
    }).join('');

    updateTotal();
    $('sheet').hidden = false;
    $('sheetBackdrop').hidden = false;
    document.body.style.overflow = 'hidden';
    $('sheetClose').focus();
  }

  function closeSheet() {
    $('sheet').hidden = true;
    $('sheetBackdrop').hidden = true;
    document.body.style.overflow = '';
  }

  function selectedOptions() {
    const picked = [];
    (current.options || []).forEach(g => {
      $('sheet').querySelectorAll(`input[name="${g.id}"]:checked`).forEach(inp => {
        const ch = g.choices.find(c => c.id === inp.value);
        picked.push({ groupId: g.id, group: g.name, id: ch.id, name: ch.name, price: ch.price });
      });
    });
    return picked;
  }

  function unitPrice() {
    return current.price + selectedOptions().reduce((n, o) => n + o.price, 0);
  }

  function updateTotal() {
    $('sheetAdd').textContent = `Add to order · ${BB.peso(unitPrice() * qty)}`;
  }

  $('sheetOptions').addEventListener('change', updateTotal);
  $('qtyMinus').addEventListener('click', () => { if (qty > 1) { qty--; $('qty').textContent = qty; updateTotal(); } });
  $('qtyPlus').addEventListener('click', () => { if (qty < 20) { qty++; $('qty').textContent = qty; updateTotal(); } });
  $('sheetClose').addEventListener('click', closeSheet);
  $('sheetBackdrop').addEventListener('click', closeSheet);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !$('sheet').hidden) closeSheet(); });

  $('sheet').addEventListener('submit', (e) => {
    e.preventDefault();
    const options = selectedOptions();
    BB.cart.add({
      key: current.id + '|' + options.map(o => o.groupId + ':' + o.id).join(','),
      itemId: current.id,
      name: current.name,
      basePrice: current.price,
      unitPrice: unitPrice(),
      options,
      notes: $('sheetNotes').value.trim(),
      qty
    });
    closeSheet();
    renderCartBar();
    toast(`Added ${qty} × ${current.name}`);
  });

  // ---- Cart bar and toast ----
  function renderCartBar() {
    const count = BB.cart.count();
    $('cartBar').hidden = count === 0;
    $('cartCount').textContent = count;
    $('cartTotal').textContent = BB.peso(BB.cart.total());
  }
  renderCartBar();

  let toastTimer;
  function toast(msg) {
    let el = document.querySelector('.toast-pop');
    if (!el) { el = document.createElement('div'); el.className = 'toast-pop'; el.setAttribute('role', 'status'); document.body.appendChild(el); }
    el.textContent = msg;
    el.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { el.hidden = true; }, 2200);
  }
})();
};

/* ===== customer/cart ===== */
BBViews['customer/cart'] = function () {
(function () {
  if (!BBC.requireSession()) return;
  const $ = (id) => document.getElementById(id);

  function render() {
    const lines = BB.cart.lines();
    const empty = lines.length === 0;
    $('empty').hidden = !empty;
    $('content').hidden = empty;
    $('actionBar').hidden = empty;
    if (empty) return;

    $('lines').innerHTML = lines.map(l => `
      <div class="c-line" data-id="${l.id}">
        <span><b>${BBC.esc(l.name)}</b>
          ${BBC.optionText(l) ? `<small>${BBC.esc(BBC.optionText(l))}</small>` : ''}
          ${l.notes ? `<small><i>Note: ${BBC.esc(l.notes)}</i></small>` : ''}
          <small>${BB.peso(l.unitPrice, true)} each</small>
        </span>
        <span class="amt">${BB.peso(l.unitPrice * l.qty, true)}</span>
        <div class="stepper">
          <button type="button" data-act="minus" aria-label="Decrease ${BBC.esc(l.name)}">−</button>
          <output>${l.qty}</output>
          <button type="button" data-act="plus" aria-label="Increase ${BBC.esc(l.name)}">+</button>
        </div>
        <button type="button" class="link-btn remove" data-act="remove" style="color:var(--danger)">Remove</button>
      </div>`).join('');

    const total = BB.cart.total();
    $('subtotal').textContent = BB.peso(total, true);
    $('toCheckout').textContent = `Continue to checkout · ${BB.peso(total, true)}`;
  }

  $('lines').addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-act]');
    if (!btn) return;
    const id = Number(btn.closest('.c-line').dataset.id);
    const line = BB.cart.lines().find(l => l.id === id);
    if (!line) return;
    if (btn.dataset.act === 'plus') BB.cart.setQty(id, Math.min(line.qty + 1, 20));
    if (btn.dataset.act === 'minus') BB.cart.setQty(id, line.qty - 1);
    if (btn.dataset.act === 'remove') { BB.cart.setQty(id, 0); BBC.toast(`Removed ${line.name}`); }
    render();
  });

  render();
})();
};

/* ===== customer/checkout ===== */
BBViews['customer/checkout'] = function () {
(function () {
  const session = BBC.requireSession();
  if (!session) return;
  const D = BB_DATA;
  const $ = (id) => document.getElementById(id);

  const lines = BB.cart.lines();
  if (!lines.length) { location.replace('customer.html?view=cart'); return; }
  const subtotal = BB.round2(BB.cart.total());

  // Restore what the customer typed if they came back from the payment screen
  const saved = BB.get('checkoutForm', {});
  let voucher = null;

  // ---- Order type ----
  const typeOptions = session.type === 'dine-in'
    ? [
        { id: 'dine-in', title: `Dine-in · Table ${session.table}`, sub: 'We bring your order to your table.' },
        { id: 'take-out', title: 'Take-out', sub: 'Pick up at the counter when it’s ready.' }
      ]
    : [
        { id: 'take-out', title: 'Take-out', sub: 'Pick up at the counter when it’s ready.' },
        { id: 'delivery', title: 'Delivery', sub: `${D.delivery.area} · ${BB.peso(D.delivery.fee)} fee` }
      ];
  const startType = typeOptions.some(t => t.id === saved.type) ? saved.type : typeOptions[0].id;
  $('types').innerHTML = typeOptions.map(t => `
    <label class="choice"><input type="radio" name="type" value="${t.id}" ${t.id === startType ? 'checked' : ''}>
      <span><b>${t.title}</b><small>${t.sub}</small></span><span></span></label>`).join('');
  $('deliveryArea').textContent = D.delivery.area + '.';

  // ---- Payment methods ----
  function renderMethods() {
    const isDelivery = type() === 'delivery';
    const current = (document.querySelector('input[name="method"]:checked') || {}).value || saved.method || 'GCASH';
    const methods = [
      { id: 'GCASH', title: 'GCash', sub: 'Pay now from your phone', badge: '<span class="badge gcash">GCash</span>' },
      { id: 'MAYA', title: 'Maya', sub: 'Pay now from your phone', badge: '<span class="badge maya">Maya</span>' },
      { id: 'CASH', title: isDelivery ? 'Cash on delivery' : 'Cash at the counter', sub: isDelivery ? 'Pay the rider when your order arrives' : 'Show your order number to the cashier', badge: '<span class="badge cash">Cash</span>' }
    ];
    $('methods').innerHTML = methods.map(m => `
      <label class="choice"><input type="radio" name="method" value="${m.id}" ${m.id === current ? 'checked' : ''}>
        <span><b>${m.title}</b><small>${m.sub}</small></span>${m.badge}</label>`).join('');
  }

  const type = () => document.querySelector('input[name="type"]:checked').value;
  const method = () => document.querySelector('input[name="method"]:checked').value;

  // ---- Loyalty member lookup ----
  function mobileValid(m) { return /^09\d{9}$/.test(m); }
  function memberInfo() {
    const m = $('mobile').value.trim();
    return mobileValid(m) ? BB.loyalty.member(m) : null;
  }
  function renderMember() {
    const m = $('mobile').value.trim();
    const member = memberInfo();
    const box = $('memberBox');
    if (!mobileValid(m)) { box.innerHTML = ''; return; }
    if (!member) {
      box.innerHTML = `<p class="msg ok">New member. You’ll earn ${BB.loyalty.earnFor(baseTotal())} points on this order.</p>`;
      return;
    }
    if (!$('name').value.trim() && member.name) $('name').value = member.name;
    const prev = $('usePoints');
    const wasChecked = prev ? prev.checked : !!saved.usePoints;
    const canRedeem = member.points >= D.loyalty.minRedeem;
    const usable = Math.min(member.points, Math.floor(baseTotal()));
    box.innerHTML = `
      <div class="points-box"><strong>${member.points}</strong><span>points available${member.name ? ' for ' + BBC.esc(member.name) : ''}. 1 point = ₱1 off.</span></div>
      ${canRedeem
        ? `<label class="choice" style="margin-top:8px"><input type="checkbox" id="usePoints" ${wasChecked ? 'checked' : ''}><span><b>Use ${usable} points</b><small>Take ${BB.peso(usable)} off this order</small></span><span></span></label>`
        : `<p class="muted" style="font-size:.82rem;margin-top:6px">You can use points once you have at least ${D.loyalty.minRedeem}.</p>`}`;
  }

  // ---- Voucher ----
  function applyVoucher(code, quiet) {
    const res = BB.checkVoucher(code, subtotal);
    if (!res.ok) {
      voucher = null;
      if (!quiet) $('voucherMsg').innerHTML = `<p class="msg bad">${BBC.esc(res.message)}</p>`;
    } else {
      voucher = res;
      $('voucherEntry').hidden = true;
      $('voucherMsg').innerHTML = `<div class="msg ok card-head"><span><b>${res.code}</b> applied · ${BBC.esc(res.label)}</span><button type="button" class="link-btn" id="removeVoucher">Remove</button></div>`;
    }
    renderMember();
    update();
  }
  $('applyVoucher').addEventListener('click', () => applyVoucher($('voucher').value));
  $('voucher').addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); applyVoucher($('voucher').value); } });
  $('voucherMsg').addEventListener('click', (e) => {
    if (e.target.id !== 'removeVoucher') return;
    voucher = null;
    $('voucher').value = '';
    $('voucherEntry').hidden = false;
    $('voucherMsg').innerHTML = '';
    renderMember();
    update();
  });

  // ---- Totals ----
  function deliveryFee() {
    if (type() !== 'delivery') return 0;
    return voucher && voucher.freeDelivery ? 0 : D.delivery.fee;
  }
  function voucherAmount() { return voucher ? voucher.amount : 0; }
  function baseTotal() { return Math.max(0, subtotal - voucherAmount()); }
  function pointsUsed() {
    const cb = $('usePoints');
    const member = memberInfo();
    if (!cb || !cb.checked || !member) return 0;
    return Math.min(member.points, Math.floor(baseTotal()));
  }
  function totals() {
    const pts = pointsUsed();
    const total = BB.round2(baseTotal() - pts + deliveryFee());
    return { subtotal, discount: voucherAmount(), pointsUsed: pts, deliveryFee: deliveryFee(), total };
  }

  function update() {
    const isDelivery = type() === 'delivery';
    $('deliveryFields').hidden = !isDelivery;
    $('detailsHint').textContent = isDelivery ? 'Required for delivery' : 'Optional · earn points';

    const t = totals();
    $('items').innerHTML = BBC.lineRows(lines);
    $('sum').innerHTML = `
      <div><span>Subtotal</span><span>${BB.peso(t.subtotal, true)}</span></div>
      ${t.discount ? `<div class="minus"><span>Voucher (${voucher.code})</span><span>−${BB.peso(t.discount, true)}</span></div>` : ''}
      ${t.pointsUsed ? `<div class="minus"><span>Points used</span><span>−${BB.peso(t.pointsUsed, true)}</span></div>` : ''}
      ${isDelivery ? `<div><span>Delivery fee</span><span>${t.deliveryFee ? BB.peso(t.deliveryFee, true) : 'Free'}</span></div>` : ''}
      <div class="total"><span>Total</span><span>${BB.peso(t.total, true)}</span></div>
      <div class="fine"><span>Prices include 12% VAT. Senior citizen and PWD discounts are applied by the cashier.</span></div>`;

    const m = method();
    const label = m === 'GCASH' ? `Pay ${BB.peso(t.total, true)} with GCash`
      : m === 'MAYA' ? `Pay ${BB.peso(t.total, true)} with Maya`
      : `Place order · ${BB.peso(t.total, true)}`;
    $('submit').textContent = label;
    $('submitHint').textContent = m === 'CASH'
      ? (isDelivery ? 'Pay the rider in cash when your order arrives.' : 'Your order is sent to the kitchen once the cashier receives your payment.')
      : 'Simulated payment: no real money is charged.';
  }

  // ---- Init and events ----
  renderMethods();
  $('name').value = saved.name || '';
  $('mobile').value = saved.mobile || '';
  $('address').value = saved.address || '';
  $('landmark').value = saved.landmark || '';
  renderMember();
  if (saved.voucher) applyVoucher(saved.voucher, true);
  update();

  $('types').addEventListener('change', () => { renderMethods(); update(); });
  $('methods').addEventListener('change', update);
  $('mobile').addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '');
    renderMember();
    update();
  });
  $('memberBox').addEventListener('change', update);

  $('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const err = $('detailsErr');
    err.hidden = true;
    const name = $('name').value.trim();
    const mobile = $('mobile').value.trim();
    const isDelivery = type() === 'delivery';

    let problem = '';
    if (mobile && !mobileValid(mobile)) problem = 'Enter an 11-digit mobile number that starts with 09.';
    else if (isDelivery && !name) problem = 'Enter your name so the rider knows who to look for.';
    else if (isDelivery && !mobile) problem = 'Enter your mobile number so the rider can contact you.';
    else if (isDelivery && !$('address').value.trim()) problem = 'Enter your delivery address.';
    const gone = lines.filter(l => { const it = D.items.find(i => i.id === l.itemId); return it && BB.menu.isSoldOut(it); });
    if (!problem && gone.length) problem = `Sorry, ${gone.map(l => l.name).join(', ')} just sold out. Go back to your order and remove it.`;
    if (problem) {
      err.textContent = problem;
      err.hidden = false;
      err.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    const t = totals();
    const m = method();
    BB.set('checkoutForm', {
      type: type(), method: m, name, mobile,
      address: $('address').value.trim(), landmark: $('landmark').value.trim(),
      voucher: voucher ? voucher.code : '', usePoints: t.pointsUsed > 0
    });

    const draft = {
      type: type(),
      table: type() === 'dine-in' ? session.table : null,
      customer: { name, mobile },
      delivery: isDelivery ? { address: $('address').value.trim(), landmark: $('landmark').value.trim() } : null,
      items: lines,
      subtotal: t.subtotal,
      voucher: voucher ? { code: voucher.code, amount: t.discount } : null,
      pointsUsed: t.pointsUsed,
      deliveryFee: t.deliveryFee,
      total: t.total,
      method: m,
      source: 'qr'
    };

    if (m === 'CASH') {
      const order = BB.orders.create(Object.assign(draft, { status: 'awaiting_payment' }));
      if (order.pointsUsed) BB.loyalty.add(mobile, name, -order.pointsUsed);
      BB.cart.clear();
      BB.set('checkoutForm', {});
      location.href = 'customer.html?view=success&order=' + order.id;
    } else {
      BB.set('draft', draft);
      location.href = 'customer.html?view=pay';
    }
  });
})();
};

/* ===== customer/pay ===== */
BBViews['customer/pay'] = function () {
(function () {
  if (!BBC.requireSession()) return;
  const $ = (id) => document.getElementById(id);
  const draft = BB.get('draft', null);
  if (!draft || draft.method === 'CASH') { location.replace('customer.html?view=checkout'); return; }

  const isGcash = draft.method === 'GCASH';
  const walletName = isGcash ? 'GCash' : 'Maya';
  $('top').classList.add(isGcash ? 'gcash' : 'maya');
  $('walletName').textContent = walletName;
  $('payBtn').classList.add(isGcash ? 'btn-gcash' : 'btn-maya');
  $('payBtn').textContent = `Pay ${BB.peso(draft.total, true)}`;
  $('amount').textContent = BB.peso(draft.total, true);
  $('orderType').textContent = BBC.orderTypeLabel(draft);
  $('itemCount').textContent = draft.items.reduce((n, l) => n + l.qty, 0) + ' item(s)';
  const m = draft.customer.mobile;
  $('account').textContent = m ? m.slice(0, 4) + ' ••• ' + m.slice(-4) : 'Demo wallet';
  $('when').textContent = BB.dateTime(new Date().toISOString());

  $('payBtn').addEventListener('click', () => {
    const btn = $('payBtn');
    btn.disabled = true;
    $('cancelBtn').hidden = true;
    btn.innerHTML = '<span class="processing" aria-hidden="true"></span> Processing payment';

    // Short pause so it feels like a wallet confirming; everything happens locally
    setTimeout(() => {
      const order = BB.orders.create(Object.assign({}, draft, { status: 'awaiting_payment' }));
      if (order.pointsUsed) BB.loyalty.add(order.customer.mobile, order.customer.name, -order.pointsUsed);
      BB.payments.record(order, draft.method);
      BB.cart.clear();
      BB.set('draft', null);
      BB.set('checkoutForm', {});
      location.replace('customer.html?view=success&order=' + order.id);
    }, 1200);
  });
})();
};

/* ===== customer/success ===== */
BBViews['customer/success'] = function () {
(function () {
  if (!BBC.requireSession()) return;
  const D = BB_DATA;
  const $ = (id) => document.getElementById(id);
  const id = new URLSearchParams(location.search).get('order');
  const order = BB.orders.get(id);
  if (!order) { location.replace('customer.html?view=track'); return; }

  $('trackBtn').href = 'customer.html?view=track&order=' + order.id;
  const payment = BB.payments.forOrder(order.id);
  const paid = !!payment;
  const methodName = { GCASH: 'GCash', MAYA: 'Maya', CASH: 'Cash' }[order.method];

  const check = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5 9-10"/></svg>';
  const clock = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/></svg>';

  // ---- Header message ----
  if (order.status === 'cancelled' || order.status === 'voided') {
    $('done').innerHTML = `<h1>This order was ${order.status}</h1><p class="muted">${BBC.esc(order.cancelReason || '')}</p><span class="order-no">${order.orderNo}</span>`;
  } else if (paid) {
    $('done').innerHTML = `
      <div class="done-icon">${check}</div>
      <h1>Payment successful</h1>
      <p class="muted">We’ve sent your order to the kitchen.${order.type === 'dine-in' ? ` We’ll bring it to Table ${order.table}.` : ''}</p>
      <span class="order-no">${order.orderNo}</span>`;
  } else {
    const where = order.type === 'delivery' ? 'Pay the rider in cash when your order arrives.' : 'Go to the counter and show this order number to the cashier.';
    $('done').innerHTML = `
      <div class="done-icon wait">${clock}</div>
      <h1>Order placed. Please pay ${BB.peso(order.total, true)}</h1>
      <p class="muted">${where} ${order.type === 'delivery' ? '' : 'We start preparing your order once it’s paid.'}</p>
      <span class="order-no">${order.orderNo}</span>`;
  }

  // ---- Loyalty points ----
  if (order.customer.mobile && !['cancelled', 'voided'].includes(order.status)) {
    const member = BB.loyalty.member(order.customer.mobile);
    const earned = paid ? order.pointsEarned : BB.loyalty.earnFor(order.total);
    $('points').innerHTML = `<div class="points-box"><strong>+${earned}</strong><span>${paid ? 'points earned' : 'points to earn once paid'}. Balance: <b>${member ? member.points : 0} points</b>.</span></div>`;
  }

  // ---- Receipt ----
  const vatable = BB.round2(order.total / 1.12);
  const vat = BB.round2(order.total - vatable);
  $('receipt').innerHTML = `
    <div class="r-head">
      <b>Brew &amp; Bite Café</b>
      <small>${BBC.esc(D.cafe.address)}</small>
      <small>${paid ? 'Order receipt' : 'Order slip · not yet paid'} · For demo only, not an official receipt</small>
    </div>
    <div class="r-sep"></div>
    <div class="r-meta">
      <span>Order no.</span><span>${order.orderNo}</span>
      <span>Date</span><span>${BB.dateTime(order.createdAt)}</span>
      <span>Order type</span><span>${BBC.orderTypeLabel(order)}</span>
      ${order.customer.name ? `<span>Customer</span><span>${BBC.esc(order.customer.name)}</span>` : ''}
      ${order.delivery ? `<span>Deliver to</span><span>${BBC.esc(order.delivery.address)}</span>` : ''}
    </div>
    <div class="r-sep"></div>
    <div style="display:grid;gap:8px">${BBC.lineRows(order.items)}</div>
    <div class="r-sep"></div>
    <div class="sum">
      <div><span>Subtotal</span><span>${BB.peso(order.subtotal, true)}</span></div>
      ${order.voucher ? `<div class="minus"><span>Voucher (${order.voucher.code})</span><span>−${BB.peso(order.voucher.amount, true)}</span></div>` : ''}
      ${order.senior ? `<div class="minus"><span>${order.senior.type} discount</span><span>−${BB.peso(order.senior.amount, true)}</span></div>` : ''}
      ${order.pointsUsed ? `<div class="minus"><span>Points used</span><span>−${BB.peso(order.pointsUsed, true)}</span></div>` : ''}
      ${order.type === 'delivery' ? `<div><span>Delivery fee</span><span>${order.deliveryFee ? BB.peso(order.deliveryFee, true) : 'Free'}</span></div>` : ''}
      <div class="total"><span>Total</span><span>${BB.peso(order.total, true)}</span></div>
      <div class="fine"><span>VATable sales</span><span>${BB.peso(vatable, true)}</span></div>
      <div class="fine"><span>VAT (12%)</span><span>${BB.peso(vat, true)}</span></div>
    </div>
    <div class="r-sep"></div>
    <div class="r-meta">
      <span>Payment</span><span>${methodName}${paid ? '' : ' · unpaid'}</span>
      ${paid ? `<span>Reference no.</span><span>${payment.referenceNo}</span>
      <span>Paid on</span><span>${BB.dateTime(payment.paidAt)}</span>
      <span>Status</span><span style="color:var(--good);font-weight:600">PAID</span>` : ''}
    </div>
    <div class="r-foot">Thank you for visiting Brew &amp; Bite Café!</div>`;
})();
};

/* ===== customer/track ===== */
BBViews['customer/track'] = function () {
(function () {
  if (!BBC.requireSession()) return;
  const $ = (id) => document.getElementById(id);
  const params = new URLSearchParams(location.search);
  let currentId = params.get('order');

  const check = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5 9-10"/></svg>';
  const RANK = { awaiting_payment: 0, paid: 1, preparing: 2, ready: 3, completed: 4 };
  const methodName = { GCASH: 'GCash', MAYA: 'Maya', CASH: 'Cash' };

  function finalLabel(o) {
    return o.type === 'dine-in' ? 'Served to your table' : o.type === 'delivery' ? 'Delivered' : 'Picked up';
  }

  function heroText(o) {
    const table = o.type === 'dine-in' ? ` to Table ${o.table}` : '';
    switch (o.status) {
      case 'awaiting_payment': return o.type === 'delivery'
        ? ['Order received', 'We’ll start preparing it shortly. Pay the rider in cash when it arrives.']
        : ['Waiting for payment', `Pay ${BB.peso(o.total, true)} at the counter and show your order number. We start preparing once it’s paid.`];
      case 'paid': return ['Order received', 'Your order is in the kitchen queue. A barista will pick it up soon.'];
      case 'preparing': return ['Preparing your order', 'Our team is making your order right now.'];
      case 'ready': return o.type === 'dine-in' ? ['Ready!', `A server is bringing your order${table}.`]
        : o.type === 'delivery' ? ['Out for delivery', 'Our rider is on the way to your address.']
        : ['Ready for pickup', 'Your order is waiting at the counter. Show your order number.'];
      case 'completed': return ['Enjoy!', 'Thanks for ordering at Brew & Bite Café.'];
      case 'cancelled': return ['Order cancelled', 'This order was cancelled. Nothing was charged.'];
      case 'voided': return ['Order voided', 'The cashier voided this order. Please see the counter for your refund.'];
    }
    return ['', ''];
  }

  function timeOf(o, status) {
    if (status === 'placed') return o.createdAt;
    if (status === 'paid') return o.paidAt;
    const hit = [...o.statusLog].reverse().find(s => s.status === status);
    return hit ? hit.at : null;
  }
  const hm = (iso) => iso ? new Date(iso).toLocaleTimeString('en-PH', { hour: 'numeric', minute: '2-digit' }) : '';

  function render() {
    const mine = BB.orders.mine().slice().reverse();
    $('empty').hidden = mine.length > 0;
    $('content').hidden = mine.length === 0;
    if (!mine.length) return;
    if (!currentId || !mine.some(o => o.id === currentId)) currentId = mine[0].id;
    const o = BB.orders.get(currentId);

    $('tabs').hidden = mine.length < 2;
    $('tabs').innerHTML = mine.map(x => `<a href="?view=track&order=${x.id}" class="${x.id === o.id ? 'on' : ''}">${x.orderNo.slice(-4)} · ${BB.STATUS[x.status].label}</a>`).join('');

    const [title, text] = heroText(o);
    $('hero').innerHTML = `<span class="chip ${BB.STATUS[o.status].chip}">${o.orderNo}</span><h2>${title}</h2><p>${text}</p>`;

    // Timeline
    const steps = [
      { key: 'placed', label: 'Order placed', sub: BBC.orderTypeLabel(o) },
      { key: 'paid', label: 'Payment confirmed', sub: methodName[o.method] + (o.paymentRef ? ' · ' + o.paymentRef : '') },
      { key: 'preparing', label: 'Preparing', sub: 'In the kitchen' },
      { key: 'ready', label: o.type === 'delivery' ? 'Out for delivery' : 'Ready', sub: o.type === 'take-out' ? 'Pick up at the counter' : '' },
      { key: 'completed', label: finalLabel(o), sub: '' }
    ];
    if (o.status === 'cancelled' || o.status === 'voided') {
      const word = o.status === 'voided' ? 'Voided' : 'Cancelled';
      $('timeline').innerHTML = `
        <li class="done"><span class="tl-dot">${check}</span><span><b>Order placed</b></span><time>${hm(o.createdAt)}</time></li>
        <li class="now"><span class="tl-dot"></span><span><b>${word}</b><small>${BBC.esc(o.cancelReason || '')}</small></span><time>${hm(timeOf(o, o.status))}</time></li>`;
    } else {
      const rank = RANK[o.status];
      // Cash on delivery: the kitchen starts before payment, so the payment step follows paidAt
      if (BB.orders.isCod(o) && !o.paidAt) steps[1] = { key: 'paid', label: 'Pay the rider', sub: 'Cash on delivery' };
      $('timeline').innerHTML = steps.map((s, i) => {
        let cls = i < rank || (i === rank && o.status === 'completed') ? 'done' : i === rank ? 'now' : 'todo';
        if (i === 1 && BB.orders.isCod(o)) cls = o.paidAt ? 'done' : 'todo';
        const dot = cls === 'done' ? check : '';
        const t = i <= rank ? hm(timeOf(o, s.key)) : '';
        return `<li class="${cls}"><span class="tl-dot">${dot}</span><span><b>${s.label}</b>${s.sub && i <= rank ? `<small>${BBC.esc(s.sub)}</small>` : ''}</span><time>${t}</time></li>`;
      }).join('');
    }

    // Details
    $('receiptLink').href = 'customer.html?view=success&order=' + o.id;
    $('meta').innerHTML = `
      <span>Order no.</span><span>${o.orderNo}</span>
      <span>Placed</span><span>${BB.dateTime(o.createdAt)}</span>
      <span>Type</span><span>${BBC.orderTypeLabel(o)}</span>
      <span>Payment</span><span>${methodName[o.method] || 'Cash'} · ${o.status === 'voided' ? 'Voided' : o.paidAt ? 'Paid' : o.status === 'cancelled' ? 'Not charged' : 'Unpaid'}</span>
      <span>Total</span><span>${BB.peso(o.total, true)}</span>`;
    $('items').innerHTML = BBC.lineRows(o.items);

    // Actions
    const canCancel = o.status === 'awaiting_payment'; // COD orders lock once the kitchen starts
    $('actions').innerHTML = `
      ${canCancel ? '<button class="btn btn-danger" type="button" id="cancelOrder">Cancel order</button>' : ''}
      <a class="btn btn-primary" href="customer.html">Order more</a>`;
  }

  $('actions').addEventListener('click', (e) => {
    if (e.target.id !== 'cancelOrder') return;
    const btn = e.target;
    if (btn.dataset.confirm !== 'yes') {
      btn.dataset.confirm = 'yes';
      btn.textContent = 'Tap again to confirm cancel';
      return;
    }
    const o = BB.orders.get(currentId);
    if (o.pointsUsed) BB.loyalty.add(o.customer.mobile, o.customer.name, o.pointsUsed);
    BB.orders.update(o.id, { status: 'cancelled', cancelReason: 'Cancelled by customer' });
    BBC.toast('Order cancelled');
    render();
  });

  // Live updates when the cashier or kitchen changes the order in another tab
  let lastRaw = '';
  function refreshIfChanged() {
    let raw = '';
    try { raw = localStorage.getItem('bb_orders') || ''; } catch (e) { /* storage blocked */ }
    if (raw !== lastRaw) { lastRaw = raw; render(); }
  }
  window.addEventListener('storage', (e) => { if (e.key === 'bb_orders') refreshIfChanged(); });
  setInterval(refreshIfChanged, 3000);
  refreshIfChanged();
})();
};

/* ===== cashier/pos ===== */
BBViews['cashier/pos'] = function () {
(function () {
  const user = BBS.init(['cashier'], 'pos');
  if (!user) return;
  const D = BB_DATA;
  const $ = (id) => document.getElementById(id);
  const esc = BBC.esc;

  // ---- POS ticket kept in storage so a refresh doesn't lose it ----
  const ticket = {
    lines: () => BB.get('posCart', []),
    save: (l) => BB.set('posCart', l)
  };
  let voucher = null;
  let activeCat = 'all';

  // ---- Menu grid ----
  $('cats').innerHTML = `<button type="button" data-cat="all" class="on">All</button>` +
    D.categories.map(c => `<button type="button" data-cat="${c.id}">${esc(c.name)}</button>`).join('');
  $('cats').addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b) return;
    activeCat = b.dataset.cat;
    $('cats').querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b));
    renderGrid();
  });
  $('search').addEventListener('input', renderGrid);

  function renderGrid() {
    D.items.forEach(i => { i.soldOut = BB.menu.isSoldOut(i); }); // kitchen's sold-out switches
    const q = $('search').value.trim().toLowerCase();
    const items = D.items.filter(i => (activeCat === 'all' || i.cat === activeCat) && (!q || i.name.toLowerCase().includes(q)));
    $('grid').innerHTML = items.map(i => `
      <button class="tile" type="button" data-id="${i.id}" ${i.soldOut ? 'disabled' : ''}>
        <span class="tile-sw">${BBC.art(i)}${i.soldOut ? '<span class="chip chip-red">Sold out</span>' : ''}</span>
        <span class="tile-body"><b>${esc(i.name)}</b><span>${BB.peso(i.price)}</span></span>
      </button>`).join('') || '<p class="muted">No items match.</p>';
  }
  $('grid').addEventListener('click', (e) => {
    const t = e.target.closest('.tile');
    if (!t || t.disabled) return;
    const item = D.items.find(i => i.id === t.dataset.id);
    if (item.options && item.options.length) openModal(item);
    else addLine(item, [], '', 1);
  });

  // ---- Options modal ----
  let mItem = null, mQty = 1;
  function openModal(item) {
    mItem = item; mQty = 1;
    $('mTitle').textContent = `${item.name} · ${BB.peso(item.price)}`;
    $('mNotes').value = '';
    $('mQty').textContent = 1;
    $('mOpts').innerHTML = item.options.map(g => {
      const single = g.type === 'single';
      const def = g.defaultChoice || g.choices[0].id;
      return `<fieldset class="og"><legend>${esc(g.name)}<small>${g.required ? 'Required' : 'Optional'}</small></legend><div class="og-list">
        ${g.choices.map(ch => `<label class="og-opt"><input type="${single ? 'radio' : 'checkbox'}" name="${g.id}" value="${ch.id}" ${single && ch.id === def ? 'checked' : ''}>${esc(ch.name)}${ch.price ? ` <em>+${ch.price}</em>` : ''}</label>`).join('')}
      </div></fieldset>`;
    }).join('');
    updateModal();
    $('modalBack').hidden = false;
    $('modal').querySelector('input').focus();
  }
  function picked() {
    const out = [];
    mItem.options.forEach(g => $('modal').querySelectorAll(`input[name="${g.id}"]:checked`).forEach(inp => {
      const ch = g.choices.find(c => c.id === inp.value);
      out.push({ groupId: g.id, group: g.name, id: ch.id, name: ch.name, price: ch.price });
    }));
    return out;
  }
  function updateModal() {
    const unit = mItem.price + picked().reduce((n, o) => n + o.price, 0);
    $('mAdd').textContent = `Add · ${BB.peso(unit * mQty)}`;
  }
  const closeModal = () => { $('modalBack').hidden = true; };
  $('mOpts').addEventListener('change', updateModal);
  $('mMinus').addEventListener('click', () => { if (mQty > 1) { mQty--; $('mQty').textContent = mQty; updateModal(); } });
  $('mPlus').addEventListener('click', () => { if (mQty < 50) { mQty++; $('mQty').textContent = mQty; updateModal(); } });
  $('mClose').addEventListener('click', closeModal);
  $('mCancel').addEventListener('click', closeModal);
  $('modalBack').addEventListener('click', (e) => { if (e.target === $('modalBack')) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !$('modalBack').hidden) closeModal(); });
  $('modal').addEventListener('submit', (e) => {
    e.preventDefault();
    addLine(mItem, picked(), $('mNotes').value.trim(), mQty);
    closeModal();
  });

  function addLine(item, options, notes, qty) {
    const lines = ticket.lines();
    const key = item.id + '|' + options.map(o => o.groupId + ':' + o.id).join(',');
    const same = lines.find(l => l.key === key && l.notes === notes);
    if (same) same.qty += qty;
    else lines.push({ id: Date.now(), key, itemId: item.id, name: item.name, basePrice: item.price, unitPrice: item.price + options.reduce((n, o) => n + o.price, 0), options, notes, qty });
    ticket.save(lines);
    renderTicket();
  }

  // ---- Ticket ----
  for (let t = 1; t <= D.cafe.tables; t++) $('table').insertAdjacentHTML('beforeend', `<option value="${t}">Table ${t}</option>`);
  document.querySelectorAll('input[name="type"]').forEach(r => r.addEventListener('change', () => {
    $('tableWrap').hidden = type() !== 'dine-in';
  }));
  const type = () => document.querySelector('input[name="type"]:checked').value;

  function subtotal() { return BB.round2(ticket.lines().reduce((n, l) => n + l.unitPrice * l.qty, 0)); }

  function renderTicket() {
    const lines = ticket.lines();
    $('lines').innerHTML = lines.length ? lines.map(l => `
      <div class="tl" data-id="${l.id}">
        <span><b>${esc(l.name)}</b>${BBC.optionText(l) ? `<small>${esc(BBC.optionText(l))}</small>` : ''}${l.notes ? `<small><i>${esc(l.notes)}</i></small>` : ''}</span>
        <span class="amt">${BB.peso(l.unitPrice * l.qty, true)}</span>
        <span class="qty-row"><button type="button" data-act="minus" aria-label="Decrease">−</button><output>${l.qty}</output><button type="button" data-act="plus" aria-label="Increase">+</button></span>
        <button type="button" class="rm" data-act="rm">Remove</button>
      </div>`).join('') : '<p class="no-lines">Tap an item on the left to start an order.</p>';

    const sub = subtotal();
    if (voucher) {
      const re = BB.checkVoucher(voucher.code, sub);
      voucher = re.ok && !re.freeDelivery ? re : null;
      if (!voucher) { $('vmsg').className = 'vmsg bad'; $('vmsg').textContent = re.message || 'Voucher removed.'; }
    }
    const disc = voucher ? voucher.amount : 0;
    const total = BB.round2(sub - disc);
    $('totals').innerHTML = `
      <div><span>Subtotal</span><span>${BB.peso(sub, true)}</span></div>
      ${disc ? `<div class="minus"><span>Voucher ${voucher.code}</span><span>−${BB.peso(disc, true)}</span></div>` : ''}
      <div class="big"><span>Total</span><span>${BB.peso(total, true)}</span></div>`;
    $('charge').disabled = !lines.length;
    $('charge').textContent = lines.length ? `Charge ${BB.peso(total, true)}` : 'Charge';
  }

  $('lines').addEventListener('click', (e) => {
    const b = e.target.closest('button[data-act]'); if (!b) return;
    const id = Number(b.closest('.tl').dataset.id);
    let lines = ticket.lines();
    const l = lines.find(x => x.id === id);
    if (b.dataset.act === 'plus') l.qty++;
    if (b.dataset.act === 'minus') l.qty--;
    if (b.dataset.act === 'rm') l.qty = 0;
    ticket.save(lines.filter(x => x.qty > 0));
    renderTicket();
  });

  $('applyV').addEventListener('click', () => {
    const res = BB.checkVoucher($('voucher').value, subtotal());
    if (res.ok && res.freeDelivery) { $('vmsg').className = 'vmsg bad'; $('vmsg').textContent = `${res.code} is for delivery orders only.`; return; }
    voucher = res.ok ? res : null;
    $('vmsg').className = 'vmsg ' + (res.ok ? 'ok' : 'bad');
    $('vmsg').textContent = res.ok ? `${res.code} applied · ${res.label}` : res.message;
    renderTicket();
  });

  $('custMobile').addEventListener('input', (e) => { e.target.value = e.target.value.replace(/\D/g, ''); });

  $('clear').addEventListener('click', () => {
    ticket.save([]); voucher = null;
    $('voucher').value = ''; $('vmsg').textContent = ''; $('custName').value = ''; $('custMobile').value = '';
    renderTicket();
  });

  $('charge').addEventListener('click', () => {
    const mobile = $('custMobile').value.trim();
    if (mobile && !/^09\d{9}$/.test(mobile)) {
      $('vmsg').className = 'vmsg bad';
      $('vmsg').textContent = 'Mobile number must be 11 digits and start with 09, or leave it blank.';
      return;
    }
    const lines = ticket.lines();
    const sub = subtotal();
    const order = {
      type: type(),
      table: type() === 'dine-in' ? Number($('table').value) : null,
      customer: { name: $('custName').value.trim(), mobile },
      delivery: null,
      items: lines,
      subtotal: sub,
      voucher: voucher ? { code: voucher.code, amount: voucher.amount } : null,
      pointsUsed: 0,
      deliveryFee: 0,
      method: null,
      status: 'awaiting_payment',
      source: 'pos',
      createdBy: user.name
    };
    order.total = BB.orderTotal(order);
    const saved = BB.orders.create(order, { mine: false });
    BB.audit.log('Created counter order', `${saved.orderNo} · ${BB.peso(saved.total, true)}`);
    ticket.save([]);
    location.href = 'cashier.html?view=payment&order=' + saved.id;
  });

  renderGrid();
  renderTicket();
  window.addEventListener('storage', (e) => { if (e.key === 'bb_soldOut') renderGrid(); });
})();
};

/* ===== cashier/orders ===== */
BBViews['cashier/orders'] = function () {
(function () {
  const user = BBS.init(['cashier'], 'orders');
  if (!user) return;
  const $ = (id) => document.getElementById(id);
  const esc = BBC.esc;
  const METHOD = { GCASH: 'GCash', MAYA: 'Maya', CASH: 'Cash' };

  const TABS = [
    { id: 'awaiting', label: 'Awaiting payment', test: BB.orders.unpaid },
    { id: 'active', label: 'In progress', test: o => ['paid', 'preparing', 'ready'].includes(o.status) },
    { id: 'done', label: 'Completed', test: o => o.status === 'completed' },
    { id: 'cancelled', label: 'Cancelled / voided', test: o => ['cancelled', 'voided'].includes(o.status) },
    { id: 'all', label: 'All', test: () => true }
  ];
  let tab = location.hash === '#active' ? 'active' : 'awaiting';

  function render() {
    const all = BB.orders.list();
    const today = BB.ymd();
    const todays = all.filter(o => BB.ymd(new Date(o.createdAt)) === today);
    const paidToday = BB.payments.list().filter(p => p.status === 'PAID' && BB.ymd(new Date(p.paidAt)) === today);
    const sales = paidToday.reduce((n, p) => n + p.amount, 0);
    const cash = paidToday.filter(p => p.method === 'CASH').reduce((n, p) => n + p.amount, 0);
    const waiting = all.filter(BB.orders.unpaid).length;

    $('kpis').innerHTML = `
      <div class="kpi${waiting ? ' alert' : ''}"><small>Awaiting payment</small><strong>${waiting}</strong></div>
      <div class="kpi"><small>Orders today</small><strong>${todays.length}</strong></div>
      <div class="kpi"><small>Sales today</small><strong>${BB.peso(sales, true)}</strong></div>
      <div class="kpi"><small>Cash in drawer (today)</small><strong>${BB.peso(cash, true)}</strong></div>`;

    $('tabs').innerHTML = TABS.map(t => `<button type="button" data-tab="${t.id}" class="${t.id === tab ? 'on' : ''}">${t.label}<span class="n">${all.filter(t.test).length}</span></button>`).join('');

    const q = $('search').value.trim().toLowerCase();
    const t = TABS.find(x => x.id === tab);
    const rows = all.filter(t.test)
      .filter(o => !q || o.orderNo.toLowerCase().includes(q) || (o.customer.name || '').toLowerCase().includes(q))
      .sort((a, b) => tab === 'awaiting' ? a.createdAt.localeCompare(b.createdAt) : b.createdAt.localeCompare(a.createdAt));

    $('rows').innerHTML = rows.length ? rows.map(o => {
      const st = BB.STATUS[o.status];
      const items = o.items.map(l => `${l.qty}× ${l.name}`).join(', ');
      const pay = o.paidAt ? `${METHOD[o.method]}<small class="mono">${o.paymentRef}</small>` : o.method ? `<span class="muted">${METHOD[o.method]} · unpaid</span>` : '<span class="muted">Not yet</span>';
      let acts = '';
      if (BB.orders.unpaid(o) && o.status !== 'awaiting_payment') acts = `<a class="btn btn-primary btn-sm" href="cashier.html?view=payment&order=${o.id}">Collect COD payment</a>${o.status === 'ready' ? `<button class="btn btn-ghost btn-sm" data-act="serve" data-id="${o.id}">Mark delivered</button>` : ''}`;
      else if (o.status === 'awaiting_payment') acts = `<a class="btn btn-primary btn-sm" href="cashier.html?view=payment&order=${o.id}">Take payment</a><button class="btn btn-danger btn-sm" data-act="cancel" data-id="${o.id}">Cancel</button>`;
      else if (o.status === 'ready') acts = `<button class="btn btn-primary btn-sm" data-act="serve" data-id="${o.id}">${o.type === 'dine-in' ? 'Mark served' : o.type === 'delivery' ? 'Mark delivered' : 'Mark picked up'}</button><a class="btn btn-ghost btn-sm" href="cashier.html?view=receipt&order=${o.id}">Receipt</a>`;
      else if (['paid', 'preparing'].includes(o.status)) acts = `<a class="btn btn-ghost btn-sm" href="cashier.html?view=receipt&order=${o.id}">Receipt</a><button class="btn btn-danger btn-sm" data-act="void" data-id="${o.id}">Void</button>`;
      else if (o.status === 'completed') acts = `<a class="btn btn-ghost btn-sm" href="cashier.html?view=receipt&order=${o.id}">Receipt</a>`;
      else if (o.status === 'voided') acts = `<a class="btn btn-ghost btn-sm" href="cashier.html?view=receipt&order=${o.id}">Receipt</a>`;
      return `<tr class="${BB.orders.unpaid(o) ? 'waiting' : ''}">
        <td><b class="mono">${o.orderNo}</b><small>${BBS.ago(o.createdAt)}${o.customer.name ? ' · ' + esc(o.customer.name) : ''}</small></td>
        <td>${BBC.orderTypeLabel(o)}<small>${o.source === 'pos' ? 'Counter' : 'QR order'}</small></td>
        <td class="items-cell">${esc(items)}${o.senior ? `<small>${o.senior.type} discount</small>` : ''}${o.cancelReason ? `<small>${esc(o.cancelReason)}</small>` : ''}</td>
        <td class="r mono">${BB.peso(o.total, true)}</td>
        <td>${pay}</td>
        <td><span class="chip ${st.chip}">${st.label}</span></td>
        <td><div class="acts">${acts}</div></td>
      </tr>`;
    }).join('') : `<tr><td colspan="7" class="empty-row">${tab === 'awaiting' ? 'No orders waiting for payment.' : 'No orders here yet.'}</td></tr>`;
  }

  $('tabs').addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b) return;
    tab = b.dataset.tab;
    render();
  });
  $('search').addEventListener('input', render);

  // ---- Row actions ----
  let pending = null;
  $('rows').addEventListener('click', (e) => {
    const b = e.target.closest('button[data-act]'); if (!b) return;
    const o = BB.orders.get(b.dataset.id);
    if (b.dataset.act === 'serve') {
      BB.orders.update(o.id, { status: 'completed' });
      BB.audit.log('Completed order', `${o.orderNo} · ${o.type}`);
      render();
      return;
    }
    pending = { act: b.dataset.act, order: o };
    const isVoid = pending.act === 'void';
    $('mTitle').textContent = `${isVoid ? 'Void' : 'Cancel'} ${o.orderNo}?`;
    $('mText').textContent = isVoid
      ? `This order was already paid (${BB.peso(o.total, true)} by ${METHOD[o.method]}). Voiding marks the payment as voided, removes it from sales and reverses loyalty points. Return the money to the customer.`
      : 'The order is removed from the queue. Nothing has been paid yet.';
    $('mOk').textContent = isVoid ? 'Void order' : 'Cancel order';
    $('modalBack').hidden = false;
    $('mReason').focus();
  });

  const close = () => { $('modalBack').hidden = true; pending = null; };
  $('mClose').addEventListener('click', close);
  $('mCancel').addEventListener('click', close);
  $('modalBack').addEventListener('click', (e) => { if (e.target === $('modalBack')) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !$('modalBack').hidden) close(); });

  $('modal').addEventListener('submit', (e) => {
    e.preventDefault();
    if (!pending) return;
    const reason = $('mReason').value;
    const o = BB.orders.get(pending.order.id);
    if (pending.act === 'void') {
      BB.payments.voidOrder(o, reason);
      BBC.toast(`${o.orderNo} voided`);
    } else {
      if (o.pointsUsed) BB.loyalty.add(o.customer.mobile, o.customer.name, o.pointsUsed);
      BB.orders.update(o.id, { status: 'cancelled', cancelReason: reason });
      BB.audit.log('Cancelled order', `${o.orderNo} · ${reason}`);
      BBC.toast(`${o.orderNo} cancelled`);
    }
    close();
    render();
  });

  BBS.onOrdersChange(render);
  setInterval(render, 30000); // keep "x min ago" fresh
})();
};

/* ===== cashier/payment ===== */
BBViews['cashier/payment'] = function () {
(function () {
  const user = BBS.init(['cashier'], 'orders');
  if (!user) return;
  const $ = (id) => document.getElementById(id);
  const esc = BBC.esc;
  const order = BB.orders.get(new URLSearchParams(location.search).get('order'));

  if (!order) return showState('Order not found', 'It may have been removed when the demo data was reset.', '<a class="btn btn-primary" href="cashier.html?view=orders">Go to orders</a>');
  $('sub').textContent = `${order.orderNo} · ${BBC.orderTypeLabel(order)} · ${order.source === 'pos' ? 'Counter order' : 'QR order'}`;
  if (order.status === 'cancelled') return showState('This order was cancelled', order.cancelReason || '', '<a class="btn btn-primary" href="cashier.html?view=orders">Back to orders</a>');
  if (order.paidAt) return showState('Already paid', `${order.orderNo} was paid by ${order.method} (${order.paymentRef}).`, `<a class="btn btn-primary" href="cashier.html?view=receipt&order=${order.id}">View receipt</a>`);

  function showState(h, p, actions) {
    $('state').hidden = false;
    $('state').innerHTML = `<h2>${esc(h)}</h2><p class="muted">${esc(p)}</p>${actions}`;
  }

  $('pay').hidden = false;
  $('meta').innerHTML = `
    <span>Order no.</span><span class="mono">${order.orderNo}</span>
    <span>Placed</span><span>${BB.dateTime(order.createdAt)} · ${BBS.ago(order.createdAt)}</span>
    <span>Type</span><span>${BBC.orderTypeLabel(order)}</span>
    ${order.customer.name ? `<span>Customer</span><span>${esc(order.customer.name)}${order.customer.mobile ? ' · ' + order.customer.mobile : ''}</span>` : ''}
    ${order.delivery ? `<span>Deliver to</span><span>${esc(order.delivery.address)}</span>` : ''}`;
  $('items').innerHTML = BBC.lineRows(order.items);

  // ---- Discount ----
  function senior() {
    if (!$('spOn').checked) return null;
    const eligible = Math.max(1, parseInt($('spEligible').value, 10) || 1);
    const diners = Math.max(eligible, parseInt($('spDiners').value, 10) || 1);
    return {
      type: $('spType').value, idNo: $('spId').value.trim(), name: $('spName').value.trim(),
      eligible, diners, amount: BB.seniorDiscount(order.subtotal, eligible, diners)
    };
  }

  function draftOrder() {
    const sp = senior();
    // Senior/PWD discount can't be combined with a voucher
    return Object.assign({}, order, { senior: sp, voucher: sp ? null : order.voucher });
  }

  function update() {
    $('spFields').hidden = !$('spOn').checked;
    const d = draftOrder();
    const total = BB.orderTotal(d);
    const sp = d.senior;
    if (sp) {
      const share = BB.round2(order.subtotal * sp.eligible / sp.diners);
      $('spNote').textContent = `Eligible share ${BB.peso(share, true)} ÷ 1.12 = ${BB.peso(share / 1.12, true)} (VAT-exempt), less 20% = ${BB.peso(share - sp.amount, true)}.` +
        (order.voucher ? ` Voucher ${order.voucher.code} is removed because it can’t be combined with this discount.` : '');
    }
    $('sum').innerHTML = `
      <div><span>Subtotal</span><span>${BB.peso(d.subtotal, true)}</span></div>
      ${d.voucher ? `<div class="minus"><span>Voucher ${d.voucher.code}</span><span>−${BB.peso(d.voucher.amount, true)}</span></div>` : ''}
      ${sp ? `<div class="minus"><span>${sp.type} discount (${sp.eligible}/${sp.diners})</span><span>−${BB.peso(sp.amount, true)}</span></div>` : ''}
      ${d.pointsUsed ? `<div class="minus"><span>Points used</span><span>−${BB.peso(d.pointsUsed, true)}</span></div>` : ''}
      ${d.deliveryFee ? `<div><span>Delivery fee</span><span>${BB.peso(d.deliveryFee, true)}</span></div>` : ''}
      <div class="big"><span>Amount due</span><span>${BB.peso(total, true)}</span></div>`;

    const m = method();
    $('cashBox').hidden = m !== 'CASH';
    $('walletBox').hidden = m === 'CASH';
    const quick = [total, Math.ceil(total / 50) * 50, Math.ceil(total / 100) * 100, 500, 1000].filter((v, i, a) => v >= total && a.indexOf(v) === i);
    $('quick').innerHTML = quick.map((v, i) => `<button type="button" class="btn btn-ghost btn-sm" data-v="${v}">${i === 0 ? 'Exact ' : ''}${BB.peso(v, i === 0)}</button>`).join('');
    const t = parseFloat($('tendered').value) || 0;
    $('change').textContent = BB.peso(Math.max(0, t - total), true);
    $('confirm').textContent = `Confirm ${m === 'CASH' ? 'cash' : m === 'GCASH' ? 'GCash' : 'Maya'} payment · ${BB.peso(total, true)}`;
    return total;
  }

  const method = () => document.querySelector('input[name="method"]:checked').value;
  $('form').addEventListener('input', update);
  $('form').addEventListener('change', update);
  $('quick').addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b) return;
    $('tendered').value = b.dataset.v;
    update();
  });

  if (order.method && order.method !== 'CASH') document.querySelector(`input[name="method"][value="${order.method}"]`).checked = true;
  update();

  $('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const total = update();
    const d = draftOrder();
    const m = method();
    const err = $('err');
    err.hidden = true;
    let problem = '';
    if (d.senior && !d.senior.idNo) problem = 'Enter the senior citizen or PWD ID number.';
    else if (d.senior && !d.senior.name) problem = 'Enter the name printed on the ID.';
    const tendered = parseFloat($('tendered').value) || 0;
    if (!problem && m === 'CASH' && tendered < total) problem = `Amount received is short by ${BB.peso(total - tendered, true)}.`;
    if (problem) { err.textContent = problem; err.hidden = false; return; }

    const updated = BB.orders.update(order.id, { senior: d.senior, voucher: d.voucher, total, cashier: user.name });
    if (d.senior) BB.audit.log('Applied discount', `${order.orderNo} · ${d.senior.type} ${d.senior.idNo} · −${BB.peso(d.senior.amount, true)}`);
    BB.payments.record(updated, m, m === 'CASH'
      ? { tendered: BB.round2(tendered), changeDue: BB.round2(tendered - total), receivedBy: user.name }
      : { receivedBy: user.name });
    location.href = 'cashier.html?view=receipt&order=' + order.id;
  });
})();
};

/* ===== cashier/receipt ===== */
BBViews['cashier/receipt'] = function () {
(function () {
  const user = BBS.init(['cashier'], 'orders');
  if (!user) return;
  const D = BB_DATA;
  const $ = (id) => document.getElementById(id);
  const esc = BBC.esc;
  const p2 = (n) => BB.peso(n, true);
  const METHOD = { GCASH: 'GCash', MAYA: 'Maya', CASH: 'Cash' };

  const o = BB.orders.get(new URLSearchParams(location.search).get('order'));
  if (!o) { $('slip').innerHTML = '<p>Order not found.</p>'; return; }
  const pay = BB.payments.forOrder(o.id);
  $('sub').textContent = `${o.orderNo} · ${BBC.orderTypeLabel(o)}`;

  // VAT breakdown. With a senior/PWD discount, the eligible share is VAT-exempt.
  let vatRows;
  if (o.senior) {
    const share = BB.round2(o.subtotal * o.senior.eligible / o.senior.diners);
    const exemptSales = BB.round2(share / 1.12);
    const regular = BB.round2(o.total - (share - o.senior.amount) - (o.deliveryFee || 0));
    const vatable = BB.round2(regular / 1.12);
    vatRows = `
      <div class="row"><span>VATable sales</span><span>${p2(vatable)}</span></div>
      <div class="row"><span>VAT (12%)</span><span>${p2(regular - vatable)}</span></div>
      <div class="row"><span>VAT-exempt sales</span><span>${p2(exemptSales)}</span></div>`;
  } else {
    const base = o.total - (o.deliveryFee || 0);
    const vatable = BB.round2(base / 1.12);
    vatRows = `
      <div class="row"><span>VATable sales</span><span>${p2(vatable)}</span></div>
      <div class="row"><span>VAT (12%)</span><span>${p2(base - vatable)}</span></div>
      <div class="row"><span>VAT-exempt sales</span><span>${p2(0)}</span></div>`;
  }

  const lines = o.items.map(l => `
    <div class="row"><span>${l.qty} × ${esc(l.name)}</span><span>${p2(l.unitPrice * l.qty)}</span></div>
    ${BBC.optionText(l) ? `<div class="opt">${esc(BBC.optionText(l))}</div>` : ''}
    ${l.notes ? `<div class="opt">“${esc(l.notes)}”</div>` : ''}`).join('');

  $('slip').innerHTML = `
    <div class="c">
      <h2>Brew &amp; Bite Café</h2>
      <div>${esc(D.cafe.address)}</div>
      <div>${esc(D.cafe.phone)}</div>
      <div>Demo receipt · not an official receipt</div>
    </div>
    ${o.status === 'voided' ? `<div class="stamp">VOIDED · ${esc(o.cancelReason || '')}</div>` : ''}
    <hr>
    <div class="row"><span>Order no.</span><span>${o.orderNo}</span></div>
    <div class="row"><span>Date</span><span>${BB.dateTime(pay ? pay.paidAt : o.createdAt)}</span></div>
    <div class="row"><span>Type</span><span>${BBC.orderTypeLabel(o)}</span></div>
    <div class="row"><span>Cashier</span><span>${esc(o.cashier || (pay && pay.receivedBy) || 'Self-service (QR)')}</span></div>
    ${o.customer.name ? `<div class="row"><span>Customer</span><span>${esc(o.customer.name)}</span></div>` : ''}
    <hr>
    ${lines}
    <hr>
    <div class="row"><span>Subtotal</span><span>${p2(o.subtotal)}</span></div>
    ${o.voucher ? `<div class="row"><span>Voucher ${o.voucher.code}</span><span>−${p2(o.voucher.amount)}</span></div>` : ''}
    ${o.senior ? `<div class="row"><span>${o.senior.type} disc. 20% (${o.senior.eligible}/${o.senior.diners})</span><span>−${p2(o.senior.amount)}</span></div>
      <div class="opt">ID ${esc(o.senior.idNo)} · ${esc(o.senior.name)}</div>` : ''}
    ${o.pointsUsed ? `<div class="row"><span>Points redeemed</span><span>−${p2(o.pointsUsed)}</span></div>` : ''}
    ${o.deliveryFee ? `<div class="row"><span>Delivery fee</span><span>${p2(o.deliveryFee)}</span></div>` : ''}
    <div class="row big"><span>TOTAL</span><span>${p2(o.total)}</span></div>
    <hr>
    ${pay ? `
      <div class="row"><span>Paid via</span><span>${METHOD[pay.method]}</span></div>
      <div class="row"><span>Reference</span><span>${pay.referenceNo}</span></div>
      ${pay.method === 'CASH' && pay.tendered != null ? `<div class="row"><span>Cash</span><span>${p2(pay.tendered)}</span></div><div class="row"><span>Change</span><span>${p2(pay.changeDue)}</span></div>` : ''}
      <div class="row"><span>Status</span><span>${pay.status}</span></div>` : '<div class="row"><span>Payment</span><span>UNPAID</span></div>'}
    <hr>
    ${vatRows}
    ${o.pointsEarned ? `<hr><div class="row"><span>Points earned</span><span>+${o.pointsEarned}</span></div>` : ''}
    <hr>
    <div class="c">Thank you, see you again!</div>`;

  const change = pay && pay.method === 'CASH' ? pay.changeDue : null;
  $('actions').innerHTML = `
    <div class="done-box">
      ${pay && pay.status === 'PAID' ? `<span class="chip chip-green" style="justify-self:start">Paid · sent to kitchen</span>` : `<span class="chip chip-red" style="justify-self:start">${BB.STATUS[o.status].label}</span>`}
      ${change != null ? `<small class="muted">Give change</small><span class="change-big">${p2(change)}</span>` : ''}
    </div>
    <button class="btn btn-ghost" type="button" id="print">Print receipt</button>
    <a class="btn btn-primary" href="cashier.html">New counter order</a>
    <a class="btn btn-ghost" href="cashier.html?view=orders">Back to orders</a>`;
  $('print').addEventListener('click', () => window.print());
})();
};

/* ===== kitchen/display ===== */
BBViews['kitchen/display'] = function () {
(function () {
  const user = BBS.init(['kitchen'], 'kitchen');
  if (!user) return;
  const D = BB_DATA;
  const $ = (id) => document.getElementById(id);
  const esc = BBC.esc;
  $('who').textContent = user.name;
  $('logout').addEventListener('click', () => { BB.staff.logout(); location.href = 'login.html'; });

  // Ticked-off items per order (so the barista can track a long ticket)
  const doneItems = () => BB.get('kdsDone', {});
  function toggleItem(orderId, lineId) {
    const all = doneItems();
    const list = all[orderId] || [];
    all[orderId] = list.includes(lineId) ? list.filter(x => x !== lineId) : list.concat(lineId);
    BB.set('kdsDone', all);
  }

  // Which orders the kitchen sees: paid ones, plus cash-on-delivery orders that pay on arrival
  const inKitchen = (o) => ['paid', 'preparing', 'ready'].includes(o.status) || (o.status === 'awaiting_payment' && BB.orders.isCod(o));
  const column = (o) => o.status === 'preparing' ? 'prep' : o.status === 'ready' ? 'ready' : 'new';
  // Timer starts when the order reaches the kitchen
  const startedAt = (o) => o.paidAt && !BB.orders.isCod(o) ? o.paidAt : o.createdAt;

  function elapsed(iso) {
    const s = Math.max(0, Math.floor((Date.now() - new Date(iso)) / 1000));
    return { min: Math.floor(s / 60), text: Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0') };
  }

  function where(o) {
    if (o.type === 'dine-in') return `<span class="tk-where dine">TABLE ${o.table}</span>`;
    if (o.type === 'delivery') return '<span class="tk-where">DELIVERY</span>';
    return '<span class="tk-where">TAKE-OUT</span>';
  }

  function ticket(o) {
    const col = column(o);
    const t = elapsed(startedAt(o));
    const timeCls = t.min >= 15 ? 'late' : t.min >= 10 ? 'warn' : '';
    const done = doneItems()[o.id] || [];
    const fresh = col === 'new' && Date.now() - new Date(startedAt(o)) < 15000;
    const finish = o.type === 'dine-in' ? 'Served' : o.type === 'delivery' ? 'Handed to rider' : 'Picked up';
    const btn = col === 'new' ? ['start', 'Start preparing'] : col === 'prep' ? ['ready', 'Mark ready'] : ['done', finish];
    const alt = col === 'prep' ? ['back', 'Back'] : col === 'ready' ? ['recall', 'Recall'] : null;
    return `
      <article class="tk${fresh ? ' fresh' : ''}" data-id="${o.id}">
        <div class="tk-head">
          <span class="tk-no">#${o.orderNo.slice(-4)}</span>${where(o)}
          <span class="tk-meta">${o.source === 'pos' ? 'Counter' : 'QR'}${o.customer.name ? ' · ' + esc(o.customer.name) : ''}</span>
          <span class="tk-time ${timeCls}" data-start="${startedAt(o)}">${t.text}</span>
        </div>
        ${BB.orders.isCod(o) && !o.paidAt ? '<span class="tk-flag">Cash on delivery · rider collects</span>' : ''}
        <ul class="tk-items">
          ${o.items.map(l => `
            <li class="${done.includes(l.id) ? 'done' : ''}" data-line="${l.id}" title="Tap to tick off">
              <span class="q">${l.qty}×</span>
              <span><b>${esc(l.name)}</b>${BBC.optionText(l) ? `<small>${esc(BBC.optionText(l))}</small>` : ''}${l.notes ? `<span class="note">${esc(l.notes)}</span>` : ''}</span>
            </li>`).join('')}
        </ul>
        <div class="tk-foot" style="${alt ? '' : 'grid-template-columns:1fr'}">
          <button class="tk-go" type="button" data-act="${btn[0]}">${btn[1]}</button>
          ${alt ? `<button class="tk-alt" type="button" data-act="${alt[0]}">${alt[1]}</button>` : ''}
        </div>
      </article>`;
  }

  let lastNewCount = null;
  function render() {
    const all = BB.orders.list();
    const live = all.filter(inKitchen).sort((a, b) => startedAt(a).localeCompare(startedAt(b)));
    const cols = { new: [], prep: [], ready: [] };
    live.forEach(o => cols[column(o)].push(o));

    $('colNew').innerHTML = cols.new.map(ticket).join('') || '<p class="empty">No new orders. New paid orders appear here.</p>';
    $('colPrep').innerHTML = cols.prep.map(ticket).join('') || '<p class="empty">Nothing in progress.</p>';
    $('colReady').innerHTML = cols.ready.map(ticket).join('') || '<p class="empty">Nothing waiting to be served.</p>';
    $('nNew').textContent = cols.new.length;
    $('nPrep').textContent = cols.prep.length;
    $('nReady').textContent = cols.ready.length;

    // Average prep time today: from reaching the kitchen to Ready
    const today = BB.ymd();
    const times = all.filter(o => BB.ymd(new Date(o.createdAt)) === today).map(o => {
      const r = o.statusLog.find(s => s.status === 'ready');
      return r ? (new Date(r.at) - new Date(startedAt(o))) / 60000 : null;
    }).filter(x => x !== null);
    const avg = times.length ? (times.reduce((a, b) => a + b, 0) / times.length).toFixed(1) + ' min' : '–';
    const servedToday = all.filter(o => o.status === 'completed' && BB.ymd(new Date(o.createdAt)) === today).length;
    $('stats').innerHTML = `<span>In queue <b>${live.length}</b></span><span>Avg prep today <b>${avg}</b></span><span>Done today <b>${servedToday}</b></span>`;

    // Recently finished, so a mistake can be recalled
    const recent = all.filter(o => o.status === 'completed').sort((a, b) => b.statusLog.at(-1).at.localeCompare(a.statusLog.at(-1).at)).slice(0, 6);
    $('recent').innerHTML = recent.length ? `<span>Recently done:</span>${recent.map(o => `<button type="button" data-recall="${o.id}" title="Recall to Ready">#${o.orderNo.slice(-4)} ↺</button>`).join('')}` : '<span>Finished orders will appear here.</span>';

    if (lastNewCount !== null && cols.new.length > lastNewCount) beep();
    lastNewCount = cols.new.length;
  }

  // ---- Ticket actions ----
  document.querySelector('.board').addEventListener('click', (e) => {
    const card = e.target.closest('.tk'); if (!card) return;
    const o = BB.orders.get(card.dataset.id);
    const item = e.target.closest('li[data-line]');
    if (item) { toggleItem(o.id, Number(item.dataset.line)); render(); return; }
    const b = e.target.closest('button[data-act]'); if (!b) return;
    const act = b.dataset.act;
    if (act === 'start') { BB.orders.update(o.id, { status: 'preparing', kitchenBy: user.name }); BB.audit.log('Started preparing', o.orderNo); }
    if (act === 'ready') { BB.orders.update(o.id, { status: 'ready' }); BB.audit.log('Marked ready', o.orderNo); }
    if (act === 'back') BB.orders.update(o.id, { status: o.paidAt ? 'paid' : 'awaiting_payment' });
    if (act === 'recall') BB.orders.update(o.id, { status: 'preparing' });
    if (act === 'done') { BB.orders.update(o.id, { status: 'completed' }); BB.audit.log('Completed order', `${o.orderNo} · ${o.type}`); }
    check();
  });
  $('recent').addEventListener('click', (e) => {
    const b = e.target.closest('button[data-recall]'); if (!b) return;
    const o = BB.orders.get(b.dataset.recall);
    BB.orders.update(o.id, { status: 'ready' });
    BB.audit.log('Recalled order', o.orderNo);
    check();
  });

  // Timers tick every second without redrawing the whole board
  setInterval(() => {
    document.querySelectorAll('.tk-time').forEach(el => {
      const t = elapsed(el.dataset.start);
      el.textContent = t.text;
      el.classList.toggle('warn', t.min >= 10 && t.min < 15);
      el.classList.toggle('late', t.min >= 15);
    });
  }, 1000);

  // ---- Sound for new orders (browsers only allow it after a click) ----
  let sound = false, ctx = null;
  $('soundBtn').addEventListener('click', () => {
    sound = !sound;
    if (sound && !ctx) { try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { sound = false; } }
    $('soundBtn').textContent = sound ? 'Sound on' : 'Sound off';
    $('soundBtn').classList.toggle('on', sound);
    $('soundBtn').setAttribute('aria-pressed', String(sound));
    if (sound) beep();
  });
  function beep() {
    if (!sound || !ctx) return;
    [0, .18].forEach(d => {
      const osc = ctx.createOscillator(), g = ctx.createGain();
      osc.frequency.value = 880; g.gain.value = .15;
      osc.connect(g); g.connect(ctx.destination);
      osc.start(ctx.currentTime + d); osc.stop(ctx.currentTime + d + .12);
    });
  }

  $('fsBtn').addEventListener('click', () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen().catch(() => {});
  });

  // ---- Sold-out drawer ----
  function renderAvail() {
    $('availList').innerHTML = D.categories.map(c => `
      <h3>${esc(c.name)}</h3>
      ${D.items.filter(i => i.cat === c.id).map(i => {
        const avail = !BB.menu.isSoldOut(i);
        return `<label class="avail${avail ? '' : ' off'}"><span>${esc(i.name)}${avail ? '' : ' · sold out'}</span>
          <span class="toggle"><input type="checkbox" data-item="${i.id}" ${avail ? 'checked' : ''} aria-label="${esc(i.name)} available"><span></span></span></label>`;
      }).join('')}`).join('');
  }
  $('availList').addEventListener('change', (e) => {
    const item = D.items.find(i => i.id === e.target.dataset.item);
    if (!item) return;
    BB.menu.setSoldOut(item, !e.target.checked);
    renderAvail();
  });
  const openDrawer = (open) => { $('drawer').hidden = !open; $('drawerBack').hidden = !open; if (open) renderAvail(); };
  $('soldOutBtn').addEventListener('click', () => openDrawer(true));
  $('drawerClose').addEventListener('click', () => openDrawer(false));
  $('drawerBack').addEventListener('click', () => openDrawer(false));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') openDrawer(false); });

  // Redraw when orders or ticked items change (any tab)
  let last = '';
  function check() {
    let raw = '';
    try { raw = (localStorage.getItem('bb_orders') || '') + (localStorage.getItem('bb_kdsDone') || ''); } catch (e) { /* storage blocked */ }
    if (raw !== last) { last = raw; render(); }
  }
  window.addEventListener('storage', check);
  setInterval(check, 2000);
  check();
})();
};

/* ===== inventory/ingredients ===== */
BBViews['inventory/ingredients'] = function () {
(function () {
  const user = BBS.init(['inventory'], 'ingredients');
  if (!user) return;
  const I = BB.inventory;
  const $ = (id) => document.getElementById(id);
  const esc = BBC.esc;
  const LEVEL = { ok: ['In stock', 'chip-green'], low: ['Low', 'chip-caramel'], out: ['Out of stock', 'chip-red'] };
  const TYPE = { SALE: 'Used in order', RETURN: 'Returned (cancel/void)', PURCHASE: 'Received (PO)', WASTAGE: 'Wastage', ADJUST: 'Stock count' };
  let tab = location.hash === '#low' ? 'low' : 'all';

  function costText(c, unit) { return '₱' + (c < 1 ? c.toFixed(3) : c.toFixed(2)) + '/' + unit; }

  function render() {
    const list = I.ingredients();
    const low = list.filter(i => I.level(i) === 'low').length;
    const out = list.filter(i => I.level(i) === 'out').length;
    const value = list.reduce((n, i) => n + Math.max(0, i.stock) * i.cost, 0);
    $('kpis').innerHTML = `
      <div class="kpi"><small>Ingredients tracked</small><strong>${list.length}</strong></div>
      <div class="kpi${low ? ' warn' : ''}"><small>Low stock</small><strong>${low}</strong></div>
      <div class="kpi${out ? ' alert' : ''}"><small>Out of stock</small><strong>${out}</strong></div>
      <div class="kpi"><small>Stock value</small><strong>${BB.peso(value, true)}</strong></div>`;

    const tabs = [['all', 'All', list.length], ['low', 'Low or out', low + out], ['ok', 'In stock', list.length - low - out]];
    $('tabs').innerHTML = tabs.map(([id, l, n]) => `<button type="button" data-tab="${id}" class="${id === tab ? 'on' : ''}">${l}<span class="n">${n}</span></button>`).join('');

    const cats = [...new Set(list.map(i => i.cat))];
    const curCat = $('cat').value;
    $('cat').innerHTML = '<option value="">All categories</option>' + cats.map(c => `<option${c === curCat ? ' selected' : ''}>${esc(c)}</option>`).join('');
    $('catList').innerHTML = cats.map(c => `<option value="${esc(c)}">`).join('');

    const q = $('search').value.trim().toLowerCase();
    const rows = list.filter(i =>
      (tab === 'all' || (tab === 'low' ? I.level(i) !== 'ok' : I.level(i) === 'ok')) &&
      (!curCat || i.cat === curCat) && (!q || i.name.toLowerCase().includes(q)));

    $('rows').innerHTML = rows.map(i => {
      const lv = I.level(i);
      const pct = Math.max(0, Math.min(100, i.stock / (i.reorder * 2 || 1) * 100));
      const sup = I.supplier(i.supplier);
      return `<tr>
        <td class="name-cell"><b>${esc(i.name)}</b><small>${esc(i.cat)} · ${(n => n ? `used in ${n} item${n === 1 ? '' : 's'}` : 'used in add-ons')(I.usedIn(i.id).length)}</small></td>
        <td><div class="lvl"><span class="num">${I.fmt(i.stock, i.unit)}</span><span class="lvl-bar"><i class="${lv}" style="width:${pct}%"></i></span></div></td>
        <td class="r num">${I.fmt(i.reorder, i.unit)}</td>
        <td class="r num">${BB.peso(Math.max(0, i.stock) * i.cost, true)}<small class="mono">${costText(i.cost, i.unit)}</small></td>
        <td class="sup-cell" title="${sup ? esc(sup.name) : ''}">${sup ? esc(sup.name) : '<span class="muted">None</span>'}</td>
        <td><span class="chip ${LEVEL[lv][1]}">${LEVEL[lv][0]}</span></td>
        <td class="r" style="white-space:nowrap"><button class="btn btn-ghost btn-sm" data-hist="${i.id}">History</button> <button class="btn btn-ghost btn-sm" data-edit="${i.id}">Edit</button></td>
      </tr>`;
    }).join('') || '<tr><td colspan="7" class="empty-row">No ingredients match.</td></tr>';
  }

  $('tabs').addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) { tab = b.dataset.tab; render(); } });
  $('cat').addEventListener('change', render);
  $('search').addEventListener('input', render);

  // ---- Add / edit ----
  let editing = null;
  $('eSupplier').innerHTML = '<option value="">None</option>' + I.suppliers().map(s => `<option value="${s.id}">${esc(s.name)}</option>`).join('');
  function openEdit(id) {
    editing = id ? I.ing(id) : null;
    $('eTitle').textContent = editing ? 'Edit ' + editing.name : 'Add ingredient';
    $('eName').value = editing ? editing.name : '';
    $('eCat').value = editing ? editing.cat : '';
    $('eUnit').value = editing ? editing.unit : 'g';
    $('eUnit').disabled = !!editing; // changing units would break recipes
    $('eReorder').value = editing ? editing.reorder : '';
    $('eReorderQty').value = editing ? editing.reorderQty : '';
    $('eCost').value = editing ? editing.cost : '';
    $('eSupplier').value = editing ? editing.supplier || '' : '';
    $('eStockWrap').hidden = !!editing;
    $('eStock').value = 0;
    $('eErr').hidden = true;
    $('editBack').hidden = false;
    $('eName').focus();
  }
  $('addBtn').addEventListener('click', () => openEdit(null));
  $('editForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = $('eName').value.trim(), cat = $('eCat').value.trim();
    const reorder = parseFloat($('eReorder').value), reorderQty = parseFloat($('eReorderQty').value), cost = parseFloat($('eCost').value);
    let err = '';
    if (!name) err = 'Enter a name.';
    else if (!cat) err = 'Enter a category.';
    else if (!(reorder >= 0) || !(reorderQty > 0)) err = 'Enter a reorder level and a reorder quantity greater than zero.';
    else if (!(cost >= 0)) err = 'Enter the cost per unit.';
    else if (!editing && I.ingredients().some(i => i.name.toLowerCase() === name.toLowerCase())) err = `${name} already exists.`;
    if (err) { $('eErr').textContent = err; $('eErr').hidden = false; return; }

    const list = I.ingredients();
    if (editing) {
      const ing = list.find(i => i.id === editing.id);
      Object.assign(ing, { name, cat, reorder, reorderQty, cost, supplier: $('eSupplier').value });
      I.saveIngredients(list);
      BB.audit.log('Edited ingredient', name);
    } else {
      const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString(36);
      list.push({ id, name, cat, unit: $('eUnit').value, stock: 0, reorder, reorderQty, cost, supplier: $('eSupplier').value });
      I.saveIngredients(list);
      const opening = parseFloat($('eStock').value) || 0;
      if (opening) I.move(id, opening, 'ADJUST', '', 'Opening stock');
      BB.audit.log('Added ingredient', name);
    }
    $('editBack').hidden = true;
    BBC.toast('Saved ' + name);
    render();
  });

  // ---- History ----
  function openHist(id) {
    const ing = I.ing(id);
    const moves = I.movements().filter(m => m.ing === id).reverse().slice(0, 40);
    const used = I.usedIn(id);
    $('hTitle').textContent = ing.name;
    $('histBody').innerHTML = `
      <div class="toolbar"><span class="chip ${LEVEL[I.level(ing)][1]}">${LEVEL[I.level(ing)][0]}</span>
        <span>On hand <b>${I.fmt(ing.stock, ing.unit)}</b> · reorder at ${I.fmt(ing.reorder, ing.unit)}</span></div>
      <div><div class="lbl" style="margin-bottom:6px">Used in</div><div class="used">${used.length ? used.map(m => `<span class="chip chip-muted">${esc(m.name)}</span>`).join('') : '<span class="muted">Add-ons only, or not in any recipe yet</span>'}</div></div>
      <div class="tbl-wrap" style="border:1px solid var(--line);border-radius:8px">
        <table class="tbl"><thead><tr><th>When</th><th>What</th><th>Reference</th><th class="r">Change</th><th class="r">Balance</th><th>By</th></tr></thead>
        <tbody>${moves.length ? moves.map(m => `<tr>
          <td>${BB.dateTime(m.at)}</td><td>${TYPE[m.type] || m.type}${m.note ? `<small>${esc(m.note)}</small>` : ''}</td>
          <td class="mono" style="font-size:.8rem">${esc(m.ref)}</td>
          <td class="r num ${m.qty > 0 ? 'mv-in' : 'mv-out'}">${m.qty > 0 ? '+' : ''}${I.fmt(m.qty, ing.unit)}</td>
          <td class="r num">${I.fmt(m.after, ing.unit)}</td><td>${esc(m.user)}</td></tr>`).join('')
          : '<tr><td colspan="6" class="empty-row">No stock movements yet. Paid orders, deliveries and wastage will show here.</td></tr>'}</tbody></table>
      </div>`;
    $('histBack').hidden = false;
  }

  $('rows').addEventListener('click', (e) => {
    const h = e.target.closest('[data-hist]'); if (h) return openHist(h.dataset.hist);
    const ed = e.target.closest('[data-edit]'); if (ed) openEdit(ed.dataset.edit);
  });

  document.querySelectorAll('.modal-back').forEach(back => {
    back.addEventListener('click', (e) => { if (e.target === back || e.target.closest('[data-close]')) back.hidden = true; });
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') document.querySelectorAll('.modal-back').forEach(b => { b.hidden = true; }); });

  // Refresh when stock changes in another tab (e.g. a customer pays)
  window.addEventListener('storage', (e) => { if (e.key === 'bb_ingredients') render(); });
  setInterval(render, 10000);
  render();
})();
};

/* ===== inventory/alerts ===== */
BBViews['inventory/alerts'] = function () {
(function () {
  const user = BBS.init(['inventory'], 'alerts');
  if (!user) return;
  const I = BB.inventory;
  const D = BB_DATA;
  const esc = BBC.esc;

  function render() {
    const list = I.ingredients();
    const flagged = list.filter(i => I.level(i) !== 'ok');
    const openPOs = I.purchaseOrders().filter(p => p.status === 'draft' || p.status === 'sent');
    const onOrder = (ingId) => openPOs.find(p => p.items.some(x => x.ing === ingId));

    // Menu items that can't be sold because of stock
    const blocked = D.items.map(it => ({ it, short: I.shortFor(it) })).filter(x => x.short.length);

    let html = '';
    if (blocked.length) {
      html += `<section class="impact">
        <h2>${blocked.length} menu item(s) unavailable to customers</h2>
        <div class="chips">${blocked.map(b => `<span class="chip">${esc(b.it.name)} · needs ${b.short.map(id => esc(I.ing(id).name)).join(', ')}</span>`).join('')}</div>
        <span class="hint" style="color:var(--ink)">These show as Sold out on the customer menu and the POS until the stock is received.</span>
      </section>`;
    }

    if (!flagged.length) {
      html += `<div class="panel all-good"><h2>All stocked up</h2><p class="muted">No ingredient is at or below its reorder level.</p></div>`;
      document.getElementById('body').innerHTML = html;
      return;
    }

    // Group by supplier
    const groups = {};
    flagged.forEach(i => { (groups[i.supplier || 'none'] = groups[i.supplier || 'none'] || []).push(i); });

    html += Object.keys(groups).map(sid => {
      const sup = I.supplier(sid);
      const items = groups[sid].sort((a, b) => a.stock / a.reorder - b.stock / b.reorder);
      const needPO = items.filter(i => !onOrder(i.id));
      const est = needPO.reduce((n, i) => n + i.reorderQty * i.cost, 0);
      return `<section class="panel">
        <div class="sup-head">
          <div><h2>${sup ? esc(sup.name) : 'No supplier set'}</h2>
            <small>${sup ? `${esc(sup.contact)} · ${esc(sup.phone)} · delivers in about ${sup.leadDays} day(s)` : 'Assign a supplier in Ingredients'}</small></div>
          ${sup && needPO.length ? `<a class="btn btn-primary btn-sm" href="inventory.html?view=purchase-orders&supplier=${sid}&items=${needPO.map(i => i.id).join(',')}">Create purchase order · ${BB.peso(est, true)}</a>` : sup ? '<span class="chip chip-gcash">All on order</span>' : ''}
        </div>
        <div class="tbl-wrap"><table class="tbl">
          <thead><tr><th>Ingredient</th><th>On hand</th><th class="r">Reorder at</th><th class="r">Suggested order</th><th class="r">Est. cost</th><th>Status</th></tr></thead>
          <tbody>${items.map(i => {
            const lv = I.level(i);
            const po = onOrder(i.id);
            const pct = Math.max(0, Math.min(100, i.stock / (i.reorder * 2 || 1) * 100));
            return `<tr>
              <td><b>${esc(i.name)}</b>${po ? `<small class="onorder">On order: ${po.poNo} (${po.status === 'draft' ? 'draft' : 'sent'})</small>` : ''}</td>
              <td><div class="lvl"><span class="num">${I.fmt(i.stock, i.unit)}</span><span class="lvl-bar"><i class="${lv}" style="width:${pct}%"></i></span></div></td>
              <td class="r num">${I.fmt(i.reorder, i.unit)}</td>
              <td class="r num">${I.fmt(i.reorderQty, i.unit)}</td>
              <td class="r num">${BB.peso(i.reorderQty * i.cost, true)}</td>
              <td><span class="chip ${lv === 'out' ? 'chip-red' : 'chip-caramel'}">${lv === 'out' ? 'Out of stock' : 'Low'}</span></td>
            </tr>`;
          }).join('')}</tbody>
        </table></div>
      </section>`;
    }).join('');

    document.getElementById('body').innerHTML = html;
  }

  window.addEventListener('storage', (e) => { if (e.key === 'bb_ingredients' || e.key === 'bb_purchaseOrders') render(); });
  setInterval(render, 10000);
  render();
})();
};

/* ===== inventory/suppliers ===== */
BBViews['inventory/suppliers'] = function () {
(function () {
  const user = BBS.init(['inventory'], 'suppliers');
  if (!user) return;
  const I = BB.inventory;
  const $ = (id) => document.getElementById(id);
  const esc = BBC.esc;

  function render() {
    const q = $('search').value.trim().toLowerCase();
    const ings = I.ingredients();
    const pos = I.purchaseOrders();
    const list = I.suppliers().filter(s => {
      if (!q) return true;
      const supplies = ings.filter(i => i.supplier === s.id).map(i => i.name.toLowerCase()).join(' ');
      return (s.name + ' ' + s.contact + ' ' + supplies).toLowerCase().includes(q);
    });

    $('sups').innerHTML = list.map(s => {
      const supplies = ings.filter(i => i.supplier === s.id);
      const open = pos.filter(p => p.supplier === s.id && (p.status === 'draft' || p.status === 'sent'));
      const spent = pos.filter(p => p.supplier === s.id && p.status === 'received').reduce((n, p) => n + p.items.reduce((m, x) => m + (x.received != null ? x.received : x.qty) * x.cost, 0), 0);
      const needs = supplies.filter(i => I.level(i) !== 'ok');
      return `<article class="panel panel-pad sup">
        <div class="sup-top"><h2>${esc(s.name)}</h2>${open.length ? `<span class="chip chip-gcash">${open.length} open PO</span>` : ''}</div>
        <dl>
          <dt>Contact</dt><dd>${esc(s.contact)}</dd>
          <dt>Phone</dt><dd class="mono" style="font-size:.82rem">${esc(s.phone)}</dd>
          <dt>Email</dt><dd>${esc(s.email)}</dd>
          <dt>Address</dt><dd>${esc(s.address)}</dd>
          <dt>Lead time</dt><dd>${s.leadDays} day(s) · ${esc(s.terms)}</dd>
          <dt>Received</dt><dd>${BB.peso(spent, true)} in purchase orders</dd>
        </dl>
        <div><div class="hint" style="margin-bottom:4px">Supplies ${supplies.length} ingredient(s)</div>
          <div class="supplies">${supplies.map(i => `<span class="chip ${I.level(i) === 'ok' ? '' : I.level(i)}">${esc(i.name)}</span>`).join('') || '<span class="muted">None assigned yet</span>'}</div></div>
        <div class="sup-foot">
          <a class="btn btn-primary btn-sm" href="inventory.html?view=purchase-orders&supplier=${s.id}${needs.length ? '&items=' + needs.map(i => i.id).join(',') : ''}">New purchase order${needs.length ? ` (${needs.length} low)` : ''}</a>
          <button class="btn btn-ghost btn-sm" type="button" data-edit="${s.id}">Edit</button>
        </div>
      </article>`;
    }).join('') || '<p class="muted">No suppliers match.</p>';
  }

  let editing = null;
  function openEdit(id) {
    editing = id ? I.supplier(id) : null;
    $('eTitle').textContent = editing ? 'Edit supplier' : 'Add supplier';
    $('eName').value = editing ? editing.name : '';
    $('eContact').value = editing ? editing.contact : '';
    $('ePhone').value = editing ? editing.phone : '';
    $('eEmail').value = editing ? editing.email : '';
    $('eAddress').value = editing ? editing.address : '';
    $('eLead').value = editing ? editing.leadDays : 2;
    $('eTerms').value = editing ? editing.terms : 'COD';
    $('eErr').hidden = true;
    $('editBack').hidden = false;
    $('eName').focus();
  }
  $('addBtn').addEventListener('click', () => openEdit(null));
  $('sups').addEventListener('click', (e) => { const b = e.target.closest('[data-edit]'); if (b) openEdit(b.dataset.edit); });

  $('editForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const rec = {
      name: $('eName').value.trim(), contact: $('eContact').value.trim(), phone: $('ePhone').value.trim(),
      email: $('eEmail').value.trim(), address: $('eAddress').value.trim(),
      leadDays: Math.max(0, parseInt($('eLead').value, 10) || 0), terms: $('eTerms').value
    };
    let err = '';
    if (!rec.name) err = 'Enter the business name.';
    else if (!rec.contact || !rec.phone) err = 'Enter a contact person and phone number.';
    else if (rec.email && !/^\S+@\S+\.\S+$/.test(rec.email)) err = 'That email address doesn’t look right.';
    if (err) { $('eErr').textContent = err; $('eErr').hidden = false; return; }

    const list = I.suppliers();
    if (editing) Object.assign(list.find(s => s.id === editing.id), rec);
    else list.push(Object.assign({ id: 's' + Date.now().toString(36) }, rec));
    I.saveSuppliers(list);
    BB.audit.log(editing ? 'Edited supplier' : 'Added supplier', rec.name);
    $('editBack').hidden = true;
    BBC.toast('Saved ' + rec.name);
    render();
  });

  document.querySelectorAll('.modal-back').forEach(back => {
    back.addEventListener('click', (e) => { if (e.target === back || e.target.closest('[data-close]')) back.hidden = true; });
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') document.querySelectorAll('.modal-back').forEach(b => { b.hidden = true; }); });
  $('search').addEventListener('input', render);
  render();
})();
};

/* ===== inventory/purchase-orders ===== */
BBViews['inventory/purchase-orders'] = function () {
(function () {
  const user = BBS.init(['inventory'], 'po');
  if (!user) return;
  const I = BB.inventory;
  const $ = (id) => document.getElementById(id);
  const esc = BBC.esc;
  const p2 = (n) => BB.peso(n, true);
  const STATUS = { draft: ['Draft', 'chip-muted'], sent: ['Sent', 'chip-gcash'], received: ['Received', 'chip-green'], cancelled: ['Cancelled', 'chip-red'] };
  const dateOnly = (iso) => new Date(iso).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' });
  const poTotal = (po) => po.items.reduce((n, x) => n + (po.status === 'received' && x.received != null ? x.received : x.qty) * x.cost, 0);
  const overdue = (po) => po.status === 'sent' && po.expectedAt && new Date(po.expectedAt) < new Date(new Date().toDateString());
  let tab = 'open';

  function render() {
    const pos = I.purchaseOrders();
    const open = pos.filter(p => p.status === 'draft' || p.status === 'sent');
    const month = new Date().getMonth();
    const receivedMonth = pos.filter(p => p.status === 'received' && new Date(p.receivedAt).getMonth() === month);
    $('kpis').innerHTML = `
      <div class="kpi"><small>Open orders</small><strong>${open.length}</strong></div>
      <div class="kpi"><small>Value on order</small><strong>${p2(open.reduce((n, p) => n + poTotal(p), 0))}</strong></div>
      <div class="kpi${pos.some(overdue) ? ' alert' : ''}"><small>Overdue deliveries</small><strong>${pos.filter(overdue).length}</strong></div>
      <div class="kpi"><small>Received this month</small><strong>${p2(receivedMonth.reduce((n, p) => n + poTotal(p), 0))}</strong></div>`;

    const tabs = [['open', 'Open', open.length], ['received', 'Received', pos.filter(p => p.status === 'received').length], ['cancelled', 'Cancelled', pos.filter(p => p.status === 'cancelled').length], ['all', 'All', pos.length]];
    $('tabs').innerHTML = tabs.map(([id, l, n]) => `<button type="button" data-tab="${id}" class="${id === tab ? 'on' : ''}">${l}<span class="n">${n}</span></button>`).join('');

    const rows = pos.filter(p => tab === 'all' || (tab === 'open' ? open.includes(p) : p.status === tab)).slice().reverse();
    $('rows').innerHTML = rows.map(p => {
      const sup = I.supplier(p.supplier);
      const names = p.items.map(x => (I.ing(x.ing) || { name: x.ing }).name);
      return `<tr>
        <td><b class="mono">${p.poNo}</b><small>by ${esc(p.createdBy || '')}</small></td>
        <td>${sup ? esc(sup.name) : '—'}</td>
        <td>${esc(names.slice(0, 3).join(', '))}${names.length > 3 ? ` +${names.length - 3} more` : ''}</td>
        <td>${dateOnly(p.createdAt)}</td>
        <td>${p.expectedAt ? dateOnly(p.expectedAt) : '—'}${overdue(p) ? '<small style="color:var(--danger)">Overdue</small>' : ''}${p.receivedAt ? `<small>Received ${dateOnly(p.receivedAt)}</small>` : ''}</td>
        <td class="r num">${p2(poTotal(p))}</td>
        <td><span class="chip ${STATUS[p.status][1]}">${STATUS[p.status][0]}</span></td>
        <td class="r"><button class="btn ${p.status === 'sent' ? 'btn-primary' : 'btn-ghost'} btn-sm" data-view="${p.id}">${p.status === 'sent' ? 'Receive' : 'View'}</button></td>
      </tr>`;
    }).join('') || `<tr><td colspan="8" class="empty-row">${tab === 'open' ? 'No open purchase orders. Low-stock alerts can create one for you.' : 'Nothing here yet.'}</td></tr>`;
  }
  $('tabs').addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) { tab = b.dataset.tab; render(); } });

  // ---- New PO ----
  $('nSupplier').innerHTML = I.suppliers().map(s => `<option value="${s.id}">${esc(s.name)}</option>`).join('');
  function ingOptions(supplierId, selected) {
    const ings = I.ingredients();
    const mine = ings.filter(i => i.supplier === supplierId), other = ings.filter(i => i.supplier !== supplierId);
    const opt = (i) => `<option value="${i.id}" ${i.id === selected ? 'selected' : ''}>${esc(i.name)}${I.level(i) !== 'ok' ? ' (low)' : ''}</option>`;
    return `<optgroup label="From this supplier">${mine.map(opt).join('')}</optgroup><optgroup label="Other ingredients">${other.map(opt).join('')}</optgroup>`;
  }
  function lineRow(ingId, qty) {
    const ing = I.ing(ingId) || I.ingredients()[0];
    return `<tr>
      <td><select class="input" data-f="ing">${ingOptions($('nSupplier').value, ing.id)}</select></td>
      <td><div class="qty-cell"><input class="input" data-f="qty" type="number" min="0" step="any" value="${qty != null ? qty : ing.reorderQty}"><span data-f="unit">${ing.unit}</span></div></td>
      <td class="cost-cell"><input class="input" data-f="cost" type="number" min="0" step="0.001" value="${ing.cost}"></td>
      <td class="r num" data-f="amt"></td>
      <td><button type="button" class="rm-line" aria-label="Remove line">×</button></td>
    </tr>`;
  }
  function recalc() {
    let total = 0;
    $('nLines').querySelectorAll('tr').forEach(tr => {
      const amt = (parseFloat(tr.querySelector('[data-f="qty"]').value) || 0) * (parseFloat(tr.querySelector('[data-f="cost"]').value) || 0);
      tr.querySelector('[data-f="amt"]').textContent = p2(amt);
      total += amt;
    });
    $('nTotal').textContent = p2(total);
  }
  function setExpected() {
    const sup = I.supplier($('nSupplier').value);
    const d = new Date(Date.now() + (sup ? sup.leadDays : 2) * 86400000);
    $('nExpected').value = d.toISOString().slice(0, 10);
  }
  function openNew(supplierId, ingIds) {
    $('nSupplier').value = supplierId || I.suppliers()[0].id;
    setExpected();
    const ids = ingIds && ingIds.length ? ingIds : I.ingredients().filter(i => i.supplier === $('nSupplier').value && I.level(i) !== 'ok').map(i => i.id);
    const start = ids.length ? ids : [(I.ingredients().find(i => i.supplier === $('nSupplier').value) || I.ingredients()[0]).id];
    $('nLines').innerHTML = start.map(id => lineRow(id)).join('');
    $('nNotes').value = '';
    $('nErr').hidden = true;
    recalc();
    $('newBack').hidden = false;
  }
  $('newBtn').addEventListener('click', () => openNew());
  $('nSupplier').addEventListener('change', () => {
    setExpected();
    $('nLines').querySelectorAll('[data-f="ing"]').forEach(sel => { const v = sel.value; sel.innerHTML = ingOptions($('nSupplier').value, v); });
  });
  $('addLine').addEventListener('click', () => {
    const first = I.ingredients().find(i => i.supplier === $('nSupplier').value) || I.ingredients()[0];
    $('nLines').insertAdjacentHTML('beforeend', lineRow(first.id));
    recalc();
  });
  $('nLines').addEventListener('change', (e) => {
    if (e.target.dataset.f === 'ing') {
      const ing = I.ing(e.target.value);
      const tr = e.target.closest('tr');
      tr.querySelector('[data-f="unit"]').textContent = ing.unit;
      tr.querySelector('[data-f="cost"]').value = ing.cost;
      tr.querySelector('[data-f="qty"]').value = ing.reorderQty;
    }
    recalc();
  });
  $('nLines').addEventListener('input', recalc);
  $('nLines').addEventListener('click', (e) => { if (e.target.closest('.rm-line')) { e.target.closest('tr').remove(); recalc(); } });

  $('newForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const status = (e.submitter && e.submitter.dataset.status) || 'draft';
    const items = [...$('nLines').querySelectorAll('tr')].map(tr => ({
      ing: tr.querySelector('[data-f="ing"]').value,
      qty: parseFloat(tr.querySelector('[data-f="qty"]').value) || 0,
      cost: parseFloat(tr.querySelector('[data-f="cost"]').value) || 0
    }));
    let err = '';
    if (!items.length) err = 'Add at least one ingredient.';
    else if (items.some(x => x.qty <= 0)) err = 'Every line needs a quantity greater than zero.';
    else if (new Set(items.map(x => x.ing)).size !== items.length) err = 'The same ingredient is listed twice. Combine them into one line.';
    else if (!$('nExpected').value) err = 'Choose an expected delivery date.';
    if (err) { $('nErr').textContent = err; $('nErr').hidden = false; return; }

    const po = {
      id: 'po' + Date.now(), poNo: BB.nextNumber('PO'), supplier: $('nSupplier').value, status,
      createdAt: new Date().toISOString(), expectedAt: new Date($('nExpected').value + 'T09:00').toISOString(),
      createdBy: user.name, notes: $('nNotes').value.trim(), items
    };
    const list = I.purchaseOrders();
    list.push(po);
    I.savePOs(list);
    BB.audit.log('Created purchase order', `${po.poNo} · ${I.supplier(po.supplier).name} · ${p2(poTotal(po))} · ${status}`);
    $('newBack').hidden = true;
    BBC.toast(`${po.poNo} ${status === 'sent' ? 'sent' : 'saved as draft'}`);
    tab = 'open';
    history.replaceState(null, '', location.pathname + '?view=purchase-orders');
    render();
  });

  // ---- View / receive ----
  let viewing = null;
  function openView(id) {
    viewing = I.purchaseOrders().find(p => p.id === id);
    const p = viewing;
    const sup = I.supplier(p.supplier);
    const receiving = p.status === 'sent';
    $('vTitle').textContent = `${p.poNo} · ${STATUS[p.status][0]}`;
    $('vBody').innerHTML = `
      <div class="po-meta">
        <span>Supplier</span><span>${sup ? esc(sup.name) : '—'}</span>
        <span>Contact</span><span>${sup ? esc(sup.contact + ' · ' + sup.phone) : '—'}</span>
        <span>Created</span><span>${BB.dateTime(p.createdAt)}</span>
        <span>Expected</span><span>${p.expectedAt ? dateOnly(p.expectedAt) : '—'}</span>
        ${p.receivedAt ? `<span>Received</span><span>${BB.dateTime(p.receivedAt)}</span><span>By</span><span>${esc(p.receivedBy || '')}</span>` : ''}
      </div>
      ${p.notes ? `<p class="hint">Notes: ${esc(p.notes)}</p>` : ''}
      ${receiving ? '<p class="hint">Check the delivery and enter what actually arrived. Stock goes up by the received quantity.</p>' : ''}
      <div class="tbl-wrap" style="border:1px solid var(--line);border-radius:8px">
        <table class="tbl lines-tbl"><thead><tr><th>Ingredient</th><th class="r">Ordered</th>${receiving || p.status === 'received' ? '<th>Received</th>' : ''}<th class="r">Unit cost</th><th class="r">Amount</th></tr></thead>
        <tbody>${p.items.map((x, idx) => {
          const ing = I.ing(x.ing) || { name: x.ing, unit: '' };
          return `<tr><td>${esc(ing.name)}</td><td class="r num">${I.fmt(x.qty, ing.unit)}</td>
            ${receiving ? `<td><div class="qty-cell"><input class="input" type="number" min="0" step="any" data-rcv="${idx}" value="${x.qty}" aria-label="Received ${esc(ing.name)}"><span>${ing.unit}</span></div></td>` : p.status === 'received' ? `<td class="num">${I.fmt(x.received != null ? x.received : x.qty, ing.unit)}</td>` : ''}
            <td class="r mono" style="font-size:.82rem">₱${x.cost}</td><td class="r num">${p2((p.status === 'received' && x.received != null ? x.received : x.qty) * x.cost)}</td></tr>`;
        }).join('')}</tbody></table>
      </div>
      <div class="po-total"><span>Total</span><span>${p2(poTotal(p))}</span></div>
      <p class="err-msg" id="vErr" hidden></p>`;

    const foot = ['<button type="button" class="btn btn-ghost" data-close>Close</button>'];
    if (p.status === 'draft') foot.unshift('<button type="button" class="btn btn-danger" data-act="cancel">Cancel PO</button>'), foot.push('<button type="button" class="btn btn-primary" data-act="send">Mark as sent</button>');
    if (p.status === 'sent') foot.unshift('<button type="button" class="btn btn-danger" data-act="cancel">Cancel PO</button>'), foot.push('<button type="submit" class="btn btn-primary">Receive into stock</button>');
    $('vFoot').innerHTML = foot.join('');
    $('viewBack').hidden = false;
  }
  $('rows').addEventListener('click', (e) => { const b = e.target.closest('[data-view]'); if (b) openView(b.dataset.view); });

  function updatePO(patch) {
    const list = I.purchaseOrders();
    const p = list.find(x => x.id === viewing.id);
    Object.assign(p, patch);
    I.savePOs(list);
    return p;
  }
  $('vFoot').addEventListener('click', (e) => {
    const b = e.target.closest('[data-act]'); if (!b) return;
    if (b.dataset.act === 'send') { updatePO({ status: 'sent', sentAt: new Date().toISOString() }); BB.audit.log('Sent purchase order', viewing.poNo); BBC.toast(`${viewing.poNo} marked as sent`); }
    if (b.dataset.act === 'cancel') {
      if (b.dataset.confirm !== 'yes') { b.dataset.confirm = 'yes'; b.textContent = 'Click again to cancel PO'; return; }
      updatePO({ status: 'cancelled' }); BB.audit.log('Cancelled purchase order', viewing.poNo); BBC.toast(`${viewing.poNo} cancelled`);
    }
    $('viewBack').hidden = true;
    render();
  });
  $('viewForm').addEventListener('submit', (e) => {
    e.preventDefault();
    if (viewing.status !== 'sent') return;
    const rcv = [...$('vBody').querySelectorAll('[data-rcv]')].map(inp => parseFloat(inp.value));
    if (rcv.some(v => !(v >= 0))) { $('vErr').textContent = 'Enter the received quantity for every line (0 if it didn’t arrive).'; $('vErr').hidden = false; return; }
    const items = viewing.items.map((x, i) => Object.assign({}, x, { received: rcv[i] }));
    updatePO({ status: 'received', receivedAt: new Date().toISOString(), receivedBy: user.name, items });
    // Stock in, and keep the latest cost per unit on the ingredient
    items.forEach(x => {
      if (x.received > 0) I.move(x.ing, x.received, 'PURCHASE', viewing.poNo, I.supplier(viewing.supplier).name);
      const list = I.ingredients(); const ing = list.find(i => i.id === x.ing);
      if (ing && x.cost) { ing.cost = x.cost; I.saveIngredients(list); }
    });
    const short = items.filter(x => x.received < x.qty).length;
    BB.audit.log('Received purchase order', `${viewing.poNo}${short ? ` · ${short} line(s) short` : ''}`);
    $('viewBack').hidden = true;
    BBC.toast(`${viewing.poNo} received into stock`);
    render();
  });

  document.querySelectorAll('.modal-back').forEach(back => {
    back.addEventListener('click', (e) => { if (e.target === back || e.target.closest('[data-close]')) back.hidden = true; });
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') document.querySelectorAll('.modal-back').forEach(b => { b.hidden = true; }); });

  render();
  // Opened from Low-stock alerts or Suppliers: start a prefilled PO
  const params = new URLSearchParams(location.search);
  if (params.get('supplier')) openNew(params.get('supplier'), (params.get('items') || '').split(',').filter(id => I.ing(id)));
})();
};

/* ===== inventory/wastage ===== */
BBViews['inventory/wastage'] = function () {
(function () {
  const user = BBS.init(['inventory'], 'wastage');
  if (!user) return;
  const I = BB.inventory;
  const D = BB_DATA;
  const $ = (id) => document.getElementById(id);
  const esc = BBC.esc;
  const p2 = (n) => BB.peso(n, true);
  let range = 'week';

  // ---- Select options ----
  function ingOptionsHtml() {
    const cats = [...new Set(I.ingredients().map(i => i.cat))];
    return cats.map(c => `<optgroup label="${esc(c)}">${I.ingredients().filter(i => i.cat === c).map(i => `<option value="${i.id}">${esc(i.name)}</option>`).join('')}</optgroup>`).join('');
  }
  $('wIng').innerHTML = ingOptionsHtml();
  $('cIng').innerHTML = ingOptionsHtml();
  $('wItem').innerHTML = D.categories.map(c => `<optgroup label="${esc(c.name)}">${D.items.filter(i => i.cat === c.id).map(i => `<option value="${i.id}">${esc(i.name)}</option>`).join('')}</optgroup>`).join('');
  $('wReason').innerHTML = D.wasteReasons.map(r => `<option>${esc(r)}</option>`).join('');

  const kind = () => document.querySelector('input[name="wKind"]:checked').value;

  // What the wastage would remove from stock
  function wasteUsage() {
    const qty = parseFloat($('wQty').value) || 0;
    if (kind() === 'ing') return qty ? { [$('wIng').value]: qty } : {};
    return qty ? I.usageForLine({ itemId: $('wItem').value, qty, options: [] }) : {};
  }

  function updateW() {
    const isItem = kind() === 'item';
    $('wIngWrap').hidden = isItem;
    $('wItemWrap').hidden = !isItem;
    $('wUnit').textContent = isItem ? 'pcs' : I.ing($('wIng').value).unit;
    $('wQty').step = isItem ? '1' : 'any';
    const use = wasteUsage();
    const ids = Object.keys(use);
    const cost = ids.reduce((n, id) => n + use[id] * I.ing(id).cost, 0);
    $('wPreview').innerHTML = ids.length
      ? ids.map(id => { const g = I.ing(id); return `<span>${esc(g.name)}: −${I.fmt(use[id], g.unit)} <span class="muted">(${I.fmt(g.stock, g.unit)} → ${I.fmt(g.stock - use[id], g.unit)})</span></span>`; }).join('') + `<span>Cost of wastage: <b>${p2(cost)}</b></span>`
      : '<span class="muted">Enter a quantity to see the stock change and cost.</span>';
  }
  function updateC() {
    const g = I.ing($('cIng').value);
    $('cUnit').textContent = g.unit;
    const v = $('cQty').value;
    if (v === '') { $('cPreview').innerHTML = `<span>System stock: <b>${I.fmt(g.stock, g.unit)}</b></span>`; return; }
    const diff = (parseFloat(v) || 0) - g.stock;
    $('cPreview').innerHTML = `<span>System stock: <b>${I.fmt(g.stock, g.unit)}</b></span>
      <span>Difference: <b class="${diff >= 0 ? 'var-pos' : 'var-neg'}">${diff >= 0 ? '+' : ''}${I.fmt(diff, g.unit)}</b> (${p2(Math.abs(diff) * g.cost)})</span>`;
  }
  $('wForm').addEventListener('input', updateW);
  $('wForm').addEventListener('change', updateW);
  $('cForm').addEventListener('input', updateC);
  $('cForm').addEventListener('change', updateC);

  $('wForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const use = wasteUsage();
    const qty = parseFloat($('wQty').value) || 0;
    if (!(qty > 0)) { $('wErr').textContent = 'Enter a quantity greater than zero.'; $('wErr').hidden = false; return; }
    if (kind() === 'item' && !Number.isInteger(qty)) { $('wErr').textContent = 'Enter a whole number of menu items.'; $('wErr').hidden = false; return; }
    $('wErr').hidden = true;
    const reason = $('wReason').value, note = $('wNote').value.trim();
    const item = kind() === 'item' ? D.items.find(i => i.id === $('wItem').value) : null;
    const ref = item ? `${qty} × ${item.name}` : '';
    Object.keys(use).forEach(id => I.move(id, -use[id], 'WASTAGE', ref, [reason, note].filter(Boolean).join(' · ')));
    BB.audit.log('Logged wastage', `${item ? ref : I.fmt(qty, I.ing($('wIng').value).unit) + ' ' + I.ing($('wIng').value).name} · ${reason}`);
    BBC.toast('Wastage recorded');
    $('wQty').value = ''; $('wNote').value = '';
    updateW(); updateC(); render();
  });

  $('cForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const v = $('cQty').value;
    if (v === '' || !(parseFloat(v) >= 0)) { $('cErr').textContent = 'Enter the counted quantity (0 if there is none).'; $('cErr').hidden = false; return; }
    $('cErr').hidden = true;
    const g = I.ing($('cIng').value);
    const diff = BB.round2(parseFloat(v) - g.stock);
    if (diff === 0) { BBC.toast('Count matches the system. Nothing to change.'); return; }
    I.move(g.id, diff, 'ADJUST', '', 'Physical count');
    BB.audit.log('Stock count', `${g.name}: ${I.fmt(g.stock, g.unit)} → ${I.fmt(parseFloat(v), g.unit)}`);
    BBC.toast(`${g.name} corrected by ${diff > 0 ? '+' : ''}${I.fmt(diff, g.unit)}`);
    $('cQty').value = '';
    updateC(); updateW(); render();
  });

  // ---- KPIs + history ----
  function inRange(iso) {
    const d = new Date(iso), now = new Date();
    if (range === 'today') return d.toDateString() === now.toDateString();
    if (range === 'week') return now - d < 7 * 86400000;
    return true;
  }
  function render() {
    const moves = I.movements().filter(m => m.type === 'WASTAGE' || m.type === 'ADJUST');
    const week = moves.filter(m => Date.now() - new Date(m.at) < 7 * 86400000);
    const wasteWeek = week.filter(m => m.type === 'WASTAGE');
    const wasteCost = wasteWeek.reduce((n, m) => n + m.cost, 0);
    const byIng = {};
    wasteWeek.forEach(m => { byIng[m.ing] = (byIng[m.ing] || 0) + m.cost; });
    const top = Object.keys(byIng).sort((a, b) => byIng[b] - byIng[a])[0];
    const adjNet = week.filter(m => m.type === 'ADJUST').reduce((n, m) => n + (m.qty > 0 ? m.cost : -m.cost), 0);
    $('kpis').innerHTML = `
      <div class="kpi${wasteCost ? ' warn' : ''}"><small>Wastage cost (7 days)</small><strong>${p2(wasteCost)}</strong></div>
      <div class="kpi"><small>Wastage entries (7 days)</small><strong>${wasteWeek.length}</strong></div>
      <div class="kpi"><small>Most wasted (by cost)</small><strong style="font-size:1.05rem">${top ? esc(I.ing(top).name) : '—'}</strong></div>
      <div class="kpi"><small>Count adjustments (7 days)</small><strong>${adjNet >= 0 ? '+' : '−'}${p2(Math.abs(adjNet))}</strong></div>`;

    $('tabs').innerHTML = [['today', 'Today'], ['week', 'Last 7 days'], ['all', 'All']].map(([id, l]) => `<button type="button" data-r="${id}" class="${id === range ? 'on' : ''}">${l}</button>`).join('');
    const rows = moves.filter(m => inRange(m.at)).reverse();
    $('rows').innerHTML = rows.map(m => {
      const g = I.ing(m.ing) || { name: m.ing, unit: '' };
      return `<tr>
        <td>${BB.dateTime(m.at)}</td>
        <td><span class="chip ${m.type === 'WASTAGE' ? 'chip-red' : 'chip-gcash'}">${m.type === 'WASTAGE' ? 'Wastage' : 'Count'}</span></td>
        <td>${esc(g.name)}${m.ref ? `<small>${esc(m.ref)}</small>` : ''}</td>
        <td class="r num ${m.qty > 0 ? 'var-pos' : 'var-neg'}">${m.qty > 0 ? '+' : ''}${I.fmt(m.qty, g.unit)}</td>
        <td class="r num">${p2(m.cost)}</td>
        <td>${esc(m.note)}</td>
        <td>${esc(m.user)}</td>
      </tr>`;
    }).join('') || '<tr><td colspan="7" class="empty-row">No wastage or stock counts recorded in this period.</td></tr>';
  }
  $('tabs').addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) { range = b.dataset.r; render(); } });

  updateW(); updateC(); render();
})();
};

/* ===== admin/dashboard ===== */
BBViews['admin/dashboard'] = function () {
(function () {
  const user = BBS.init(['admin'], 'dashboard');
  if (!user) return;
  const $ = (id) => document.getElementById(id);
  const esc = BBC.esc;
  const p0 = (n) => BB.peso(Math.round(n));
  const COLORS = { GCASH: 'var(--pay-gcash)', CASH: 'var(--pay-cash)', MAYA: 'var(--pay-maya)' };
  const NAMES = { GCASH: 'GCash', CASH: 'Cash', MAYA: 'Maya' };
  const h = new Date().getHours();
  $('greet').textContent = `Good ${h < 12 ? 'morning' : h < 18 ? 'afternoon' : 'evening'}, ${user.name.split(' ')[0]}`;

  const dayStart = (offset) => { const d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() - offset); return d; };
  const sum = (list, f) => list.reduce((n, x) => n + f(x), 0);

  function delta(now, before) {
    if (!before) return '';
    if (!now) return '<span class="hint">No paid orders yet today</span>';
    const pct = Math.round((now - before) / before * 100);
    return `<span class="delta ${pct >= 0 ? 'up' : 'down'}">${pct >= 0 ? '▲' : '▼'} ${Math.abs(pct)}% vs this time last week</span>`;
  }

  function render() {
    const today = BB.history.sales(dayStart(0), dayStart(-1));
    // Same weekday last week, up to the same time of day, so the comparison is fair mid-shift
    const lastWeek = BB.history.sales(dayStart(7), new Date(Date.now() - 7 * 86400000));
    const salesT = sum(today, o => o.total), salesLW = sum(lastWeek, o => o.total);
    const discT = sum(today, o => o.discount);
    $('kpis').innerHTML = `
      <div class="kpi"><small>Sales today</small><strong>${BB.peso(salesT, true)}</strong>${delta(salesT, salesLW)}</div>
      <div class="kpi"><small>Paid orders today</small><strong>${today.length}</strong>${delta(today.length, lastWeek.length)}</div>
      <div class="kpi"><small>Average order</small><strong>${BB.peso(today.length ? salesT / today.length : 0, true)}</strong><span class="hint">Same time last week ${BB.peso(lastWeek.length ? salesLW / lastWeek.length : 0, true)}</span></div>
      <div class="kpi"><small>Discounts given today</small><strong>${BB.peso(discT, true)}</strong><span class="hint">Vouchers, senior/PWD, points</span></div>`;

    // 14-day sales
    const days = [];
    for (let i = 13; i >= 0; i--) {
      const list = BB.history.sales(dayStart(i), dayStart(i - 1));
      const d = dayStart(i);
      days.push({
        label: d.toLocaleDateString('en-PH', { month: 'short', day: 'numeric' }),
        value: sum(list, o => o.total),
        tip: `<b>${d.toLocaleDateString('en-PH', { weekday: 'short', month: 'short', day: 'numeric' })}</b><span>${BB.peso(sum(list, o => o.total), true)} · ${list.length} orders</span>`
      });
    }
    BBChart.bars($('salesChart'), days, { format: (v, axis) => axis ? '₱' + (v >= 1000 ? Math.round(v / 1000) + 'k' : v) : BB.peso(v, true), highlight: 13, axisLabel: 'Daily sales for the last 14 days' });

    // Payment mix
    const mix = (list) => ['GCASH', 'CASH', 'MAYA'].map(m => ({ label: NAMES[m], color: COLORS[m], value: sum(list.filter(o => o.method === m), o => o.total) }));
    const last30 = BB.history.sales(dayStart(30), dayStart(-1));
    BBChart.share($('mix30'), mix(last30), p0);
    if (today.length) BBChart.share($('mixToday'), mix(today), p0);
    else $('mixToday').innerHTML = '<p class="hint">No paid orders yet today.</p>';

    // Orders by hour (avg over last 7 days)
    const week = BB.history.sales(dayStart(7), dayStart(0));
    const hours = [];
    for (let hr = 7; hr <= 21; hr++) {
      const n = week.filter(o => new Date(o.paidAt).getHours() === hr).length / 7;
      hours.push({ label: (hr % 12 || 12) + (hr < 12 ? 'a' : 'p'), value: Math.round(n * 10) / 10, tip: `<b>${hr % 12 || 12}:00 ${hr < 12 ? 'AM' : 'PM'}</b><span>${n.toFixed(1)} orders per day</span>` });
    }
    const peak = hours.reduce((a, b, i) => b.value > hours[a].value ? i : a, 0);
    BBChart.bars($('hourChart'), hours, { height: 180, highlight: peak, format: (v) => String(Math.round(v)), axisLabel: 'Average orders per hour' });

    // Best sellers
    const counts = {};
    week.concat(today).forEach(o => o.items.forEach(l => {
      const c = counts[l.itemId] = counts[l.itemId] || { name: l.name, qty: 0, revenue: 0 };
      c.qty += l.qty; c.revenue += l.unitPrice * l.qty;
    }));
    const top = Object.values(counts).sort((a, b) => b.qty - a.qty).slice(0, 6);
    const maxQ = top.length ? top[0].qty : 1;
    $('best').innerHTML = top.map((t, i) => `<li><span class="n">${i + 1}</span><b>${esc(t.name)}</b><span class="v">${t.qty} sold · ${p0(t.revenue)}</span><span class="meter"><i style="width:${t.qty / maxQ * 100}%"></i></span></li>`).join('');

    // Needs attention
    const I = BB.inventory;
    const unpaid = BB.orders.list().filter(BB.orders.unpaid).length;
    const kitchen = BB.orders.list().filter(o => ['paid', 'preparing'].includes(o.status)).length;
    const low = I.ingredients().filter(i => I.level(i) !== 'ok');
    const blocked = BB_DATA.items.filter(i => BB.menu.isSoldOut(i));
    const openPO = I.purchaseOrders().filter(p => p.status === 'sent' || p.status === 'draft').length;
    $('attn').innerHTML = `
      <li><a href="cashier.html?view=orders"><span>Orders waiting for payment</span><span class="chip ${unpaid ? 'chip-red' : 'chip-green'}">${unpaid}</span></a></li>
      <li><a href="kitchen.html"><span>Orders in the kitchen</span><span class="chip chip-gcash">${kitchen}</span></a></li>
      <li><a href="inventory.html?view=alerts"><span>Ingredients low or out${low.length ? `<small class="hint" style="display:block">${esc(low.slice(0, 4).map(i => i.name).join(', '))}${low.length > 4 ? '…' : ''}</small>` : ''}</span><span class="chip ${low.length ? 'chip-caramel' : 'chip-green'}">${low.length}</span></a></li>
      <li><a href="admin.html?view=menu"><span>Menu items sold out${blocked.length ? `<small class="hint" style="display:block">${esc(blocked.map(i => i.name).join(', '))}</small>` : ''}</span><span class="chip ${blocked.length ? 'chip-red' : 'chip-green'}">${blocked.length}</span></a></li>
      <li><a href="inventory.html?view=purchase-orders"><span>Open purchase orders</span><span class="chip chip-gcash">${openPO}</span></a></li>`;

    // Activity
    const feed = BB.audit.list().slice(-8).reverse();
    $('feed').innerHTML = feed.length ? feed.map(a => `<li><span><b>${esc(a.action)}</b><small>${esc(a.detail)} · ${esc(a.user)}</small></span><time>${BBS.ago(a.at)}</time></li>`).join('') : '<li class="hint">No activity yet.</li>';
  }

  render();
  BBS.onOrdersChange(render);
  window.addEventListener('resize', () => { clearTimeout(window._rz); window._rz = setTimeout(render, 200); });
})();
};

/* ===== admin/reports ===== */
BBViews['admin/reports'] = function () {
(function () {
  const user = BBS.init(['admin'], 'reports');
  if (!user) return;
  const D = BB_DATA, I = BB.inventory;
  const $ = (id) => document.getElementById(id);
  const esc = BBC.esc;
  const p2 = (n) => BB.peso(n, true);
  const sum = (list, f) => list.reduce((n, x) => n + f(x), 0);
  const NAMES = { GCASH: 'GCash', CASH: 'Cash', MAYA: 'Maya' };
  const COLORS = { GCASH: 'var(--pay-gcash)', CASH: 'var(--pay-cash)', MAYA: 'var(--pay-maya)' };
  const TABS = [['sales', 'Sales summary'], ['items', 'Best sellers'], ['usage', 'Ingredient usage'], ['waste', 'Wastage'], ['payments', 'Payment records']];
  let tab = (location.hash || '#sales').slice(1);
  let csv = []; // rows for the export button

  const startOf = (d) => { d = new Date(d); d.setHours(0, 0, 0, 0); return d; };
  const addDays = (d, n) => new Date(d.getTime() + n * 86400000);
  const isoDay = (d) => d.toISOString().slice(0, 10);
  const fmtDay = (d) => d.toLocaleDateString('en-PH', { weekday: 'short', month: 'short', day: 'numeric' });

  // Default custom range = last 7 days
  $('to').value = isoDay(new Date());
  $('from').value = isoDay(addDays(new Date(), -6));

  function period() {
    const today = startOf(new Date());
    const v = $('range').value;
    if (v === 'today') return [today, addDays(today, 1)];
    if (v === 'yesterday') return [addDays(today, -1), today];
    if (v === '7') return [addDays(today, -6), addDays(today, 1)];
    if (v === '30') return [addDays(today, -29), addDays(today, 1)];
    if (v === 'month') return [new Date(today.getFullYear(), today.getMonth(), 1), addDays(today, 1)];
    const f = startOf(new Date($('from').value + 'T00:00')), t = addDays(startOf(new Date($('to').value + 'T00:00')), 1);
    return f < t ? [f, t] : [t, f];
  }

  function table(head, rows, foot, alignRight) {
    const r = (i) => alignRight && alignRight.includes(i) ? ' class="r num"' : '';
    return `<div class="tbl-wrap"><table class="tbl"><thead><tr>${head.map((h, i) => `<th${r(i)}>${h}</th>`).join('')}</tr></thead>
      <tbody>${rows.length ? rows.map(row => `<tr>${row.map((c, i) => `<td${r(i)}>${c}</td>`).join('')}</tr>`).join('') : `<tr><td colspan="${head.length}" class="empty-row">No data in this period.</td></tr>`}</tbody>
      ${foot ? `<tfoot><tr>${foot.map((c, i) => `<td${r(i)}>${c}</td>`).join('')}</tr></tfoot>` : ''}</table></div>`;
  }

  function render() {
    $('fromWrap').hidden = $('toWrap').hidden = $('range').value !== 'custom';
    $('tabs').innerHTML = TABS.map(([id, l]) => `<button type="button" data-tab="${id}" class="${id === tab ? 'on' : ''}">${l}</button>`).join('');
    const [from, to] = period();
    $('rangeText').textContent = `${fmtDay(from)} – ${fmtDay(addDays(to, -1))}`;
    const withSample = $('sample').checked;
    const sales = BB.history.sales(from, to, withSample);
    ({ sales: renderSales, items: renderItems, usage: renderUsage, waste: renderWaste, payments: renderPayments })[tab](sales, from, to, withSample);
  }

  // ---- Sales summary ----
  function renderSales(sales, from, to) {
    const gross = sum(sales, o => o.subtotal + o.deliveryFee), disc = sum(sales, o => o.discount), net = sum(sales, o => o.total);
    const vatable = net / 1.12;
    let html = `<div class="kpis">
      <div class="kpi"><small>Gross sales</small><strong>${p2(gross)}</strong></div>
      <div class="kpi"><small>Discounts</small><strong>−${p2(disc)}</strong></div>
      <div class="kpi"><small>Net sales</small><strong>${p2(net)}</strong><span class="hint">VAT included: ${p2(net - vatable)}</span></div>
      <div class="kpi"><small>Orders · average</small><strong>${sales.length}</strong><span class="hint">${p2(sales.length ? net / sales.length : 0)} per order</span></div></div>`;

    // Daily rows
    const days = [];
    for (let d = new Date(from); d < to; d = addDays(d, 1)) {
      const list = sales.filter(o => new Date(o.paidAt) >= d && new Date(o.paidAt) < addDays(d, 1));
      days.push({ d: new Date(d), list });
    }
    html += `<section class="panel panel-pad"><h2>Net sales per day</h2><div id="dayChart"></div></section>`;
    html += `<div class="two">
      <section class="panel panel-pad"><h2>By payment method</h2><div id="mix"></div></section>
      <section class="panel panel-pad"><h2>By order type and discounts</h2>${table(['', 'Orders', 'Net sales'],
        [['Dine-in', 'dine-in'], ['Take-out', 'take-out'], ['Delivery', 'delivery']].map(([l, t]) => { const x = sales.filter(o => o.type === t); return [l, x.length, p2(sum(x, o => o.total))]; })
          .concat(['Senior/PWD', 'Voucher', 'Points'].map(k => { const x = sales.filter(o => o.discountType === k); return [`${k} discount`, x.length, '−' + p2(sum(x, o => o.discount))]; })), null, [1, 2])}</section></div>`;
    const rows = days.map(({ d, list }) => [fmtDay(d), list.length, p2(sum(list, o => o.subtotal + o.deliveryFee)), '−' + p2(sum(list, o => o.discount)), p2(sum(list, o => o.total)),
      ...['GCASH', 'CASH', 'MAYA'].map(m => p2(sum(list.filter(o => o.method === m), o => o.total)))]);
    html += `<section class="panel"><div class="panel-head"><h2>Daily breakdown</h2></div>${table(['Date', 'Orders', 'Gross', 'Discounts', 'Net', 'GCash', 'Cash', 'Maya'], rows.slice().reverse(),
      ['Total', sales.length, p2(gross), '−' + p2(disc), p2(net), ...['GCASH', 'CASH', 'MAYA'].map(m => p2(sum(sales.filter(o => o.method === m), o => o.total)))], [1, 2, 3, 4, 5, 6, 7])}</section>`;
    $('out').innerHTML = html;

    BBChart.bars($('dayChart'), days.map(({ d, list }) => ({ label: d.toLocaleDateString('en-PH', { month: 'short', day: 'numeric' }), value: sum(list, o => o.total), tip: `<b>${fmtDay(d)}</b><span>${p2(sum(list, o => o.total))} · ${list.length} orders</span>` })),
      { format: (v, axis) => axis ? '₱' + (v >= 1000 ? Math.round(v / 1000) + 'k' : v) : p2(v), axisLabel: 'Net sales per day' });
    BBChart.share($('mix'), ['GCASH', 'CASH', 'MAYA'].map(m => ({ label: NAMES[m], color: COLORS[m], value: sum(sales.filter(o => o.method === m), o => o.total) })), p2);
    csv = [['Date', 'Orders', 'Gross', 'Discounts', 'Net', 'GCash', 'Cash', 'Maya']].concat(days.map(({ d, list }) => [isoDay(d), list.length, sum(list, o => o.subtotal + o.deliveryFee).toFixed(2), sum(list, o => o.discount).toFixed(2), sum(list, o => o.total).toFixed(2),
      ...['GCASH', 'CASH', 'MAYA'].map(m => sum(list.filter(o => o.method === m), o => o.total).toFixed(2))]));
  }

  // ---- Best sellers ----
  function renderItems(sales) {
    const map = {};
    sales.forEach(o => o.items.forEach(l => {
      const it = D.items.find(i => i.id === l.itemId);
      const m = map[l.itemId] = map[l.itemId] || { name: l.name, cat: it ? (D.categories.find(c => c.id === it.cat) || { name: '—' }).name : 'Removed item', qty: 0, rev: 0 };
      m.qty += l.qty; m.rev += l.unitPrice * l.qty;
    }));
    const list = Object.values(map).sort((a, b) => b.qty - a.qty);
    const totalRev = sum(list, x => x.rev) || 1, maxQ = list.length ? list[0].qty : 1;
    const cats = {};
    list.forEach(x => { cats[x.cat] = cats[x.cat] || { qty: 0, rev: 0 }; cats[x.cat].qty += x.qty; cats[x.cat].rev += x.rev; });
    $('out').innerHTML = `<div class="two">
      <section class="panel"><div class="panel-head"><h2>Items</h2><span class="hint">Ranked by quantity sold</span></div>
        ${table(['#', 'Item', 'Category', 'Sold', '', 'Revenue', 'Share'], list.map((x, i) => [i + 1, `<b>${esc(x.name)}</b>`, esc(x.cat), x.qty, `<div class="inline-meter"><i style="width:${x.qty / maxQ * 100}%"></i></div>`, p2(x.rev), `<span class="pct">${(x.rev / totalRev * 100).toFixed(1)}%</span>`]), null, [3, 5, 6])}</section>
      <section class="panel"><div class="panel-head"><h2>Categories</h2></div>
        ${table(['Category', 'Sold', 'Revenue', 'Share'], Object.keys(cats).sort((a, b) => cats[b].rev - cats[a].rev).map(c => [esc(c), cats[c].qty, p2(cats[c].rev), `<span class="pct">${(cats[c].rev / totalRev * 100).toFixed(1)}%</span>`]), ['Total', sum(list, x => x.qty), p2(totalRev), '100%'], [1, 2, 3])}</section></div>`;
    csv = [['Rank', 'Item', 'Category', 'Qty sold', 'Revenue']].concat(list.map((x, i) => [i + 1, x.name, x.cat, x.qty, x.rev.toFixed(2)]));
  }

  // ---- Ingredient usage (from recipes of what was sold) ----
  function renderUsage(sales) {
    const use = {};
    sales.forEach(o => o.items.forEach(l => { const u = I.usageForLine(l); for (const k in u) use[k] = (use[k] || 0) + u[k]; }));
    const rows = Object.keys(use).map(id => { const g = I.ing(id) || { name: id, unit: '', cost: 0, cat: '' }; return { g, qty: use[id], cost: use[id] * g.cost }; }).sort((a, b) => b.cost - a.cost);
    const totalCost = sum(rows, r => r.cost), net = sum(sales, o => o.total);
    $('out').innerHTML = `<div class="kpis">
        <div class="kpi"><small>Ingredient cost of sales</small><strong>${p2(totalCost)}</strong></div>
        <div class="kpi"><small>Net sales</small><strong>${p2(net)}</strong></div>
        <div class="kpi${net && totalCost / net > 0.35 ? ' warn' : ''}"><small>Food cost %</small><strong>${net ? (totalCost / net * 100).toFixed(1) : 0}%</strong><span class="hint">Target: 30–35%</span></div>
        <div class="kpi"><small>Ingredients used</small><strong>${rows.length}</strong></div></div>
      <section class="panel"><div class="panel-head"><h2>Usage by ingredient</h2><span class="hint">Calculated from each item’s recipe, sizes and add-ons</span></div>
        ${table(['Ingredient', 'Category', 'Used', 'Cost', 'Share of cost'], rows.map(r => [`<b>${esc(r.g.name)}</b>`, esc(r.g.cat), I.fmt(r.qty, r.g.unit), p2(r.cost), `<span class="pct">${(r.cost / (totalCost || 1) * 100).toFixed(1)}%</span>`]), ['Total', '', '', p2(totalCost), '100%'], [2, 3, 4])}</section>`;
    csv = [['Ingredient', 'Category', 'Quantity used', 'Unit', 'Cost']].concat(rows.map(r => [r.g.name, r.g.cat, r.qty.toFixed(2), r.g.unit, r.cost.toFixed(2)]));
  }

  // ---- Wastage ----
  function renderWaste(sales, from, to, withSample) {
    const real = I.movements().filter(m => m.type === 'WASTAGE');
    const all = (withSample ? BB.history.sampleWastage() : []).concat(real).filter(m => { const t = new Date(m.at); return t >= from && t < to; });
    const total = sum(all, m => m.cost);
    const byReason = {};
    all.forEach(m => { const r = (m.note || 'Other').split(' · ')[0]; byReason[r] = (byReason[r] || 0) + m.cost; });
    const byIng = {};
    all.forEach(m => { byIng[m.ing] = byIng[m.ing] || { qty: 0, cost: 0 }; byIng[m.ing].qty += -m.qty; byIng[m.ing].cost += m.cost; });
    const net = sum(sales, o => o.total);
    $('out').innerHTML = `<div class="kpis">
        <div class="kpi${total ? ' warn' : ''}"><small>Wastage cost</small><strong>${p2(total)}</strong></div>
        <div class="kpi"><small>Entries</small><strong>${all.length}</strong></div>
        <div class="kpi"><small>Wastage as % of sales</small><strong>${net ? (total / net * 100).toFixed(2) : 0}%</strong></div>
        <div class="kpi"><small>Top reason</small><strong style="font-size:1rem">${esc(Object.keys(byReason).sort((a, b) => byReason[b] - byReason[a])[0] || '—')}</strong></div></div>
      <div class="two">
        <section class="panel"><div class="panel-head"><h2>By ingredient</h2></div>${table(['Ingredient', 'Wasted', 'Cost'], Object.keys(byIng).sort((a, b) => byIng[b].cost - byIng[a].cost).map(id => { const g = I.ing(id) || { name: id, unit: '' }; return [esc(g.name), I.fmt(byIng[id].qty, g.unit), p2(byIng[id].cost)]; }), null, [1, 2])}</section>
        <section class="panel"><div class="panel-head"><h2>By reason</h2></div>${table(['Reason', 'Cost'], Object.keys(byReason).sort((a, b) => byReason[b] - byReason[a]).map(r => [esc(r), p2(byReason[r])]), ['Total', p2(total)], [1])}</section></div>
      <section class="panel"><div class="panel-head"><h2>Entries</h2></div>${table(['When', 'Ingredient', 'Qty', 'Cost', 'Reason', 'By'], all.slice().sort((a, b) => b.at.localeCompare(a.at)).map(m => { const g = I.ing(m.ing) || { name: m.ing, unit: '' }; return [BB.dateTime(m.at), esc(g.name), I.fmt(-m.qty, g.unit), p2(m.cost), esc(m.note), esc(m.user)]; }), null, [2, 3])}</section>`;
    csv = [['Date', 'Ingredient', 'Quantity', 'Unit', 'Cost', 'Reason', 'By']].concat(all.map(m => { const g = I.ing(m.ing) || { name: m.ing, unit: '' }; return [m.at, g.name, (-m.qty), g.unit, m.cost.toFixed(2), m.note, m.user]; }));
  }

  // ---- Payment records (real only) ----
  function renderPayments(sales, from, to) {
    const list = BB.payments.list().filter(p => { const t = new Date(p.paidAt); return t >= from && t < to; }).reverse();
    const paid = list.filter(p => p.status === 'PAID');
    $('out').innerHTML = `<p class="sample-note">Payment records are the real ones saved by this demo (sample history has no reference numbers).</p>
      <div class="kpis">${['GCASH', 'CASH', 'MAYA'].map(m => `<div class="kpi"><small>${NAMES[m]}</small><strong>${p2(sum(paid.filter(p => p.method === m), p => p.amount))}</strong><span class="hint">${paid.filter(p => p.method === m).length} payment(s)</span></div>`).join('')}
        <div class="kpi${list.length - paid.length ? ' alert' : ''}"><small>Voided</small><strong>${list.length - paid.length}</strong></div></div>
      <section class="panel">${table(['Reference no.', 'Order', 'Method', 'Amount', 'Status', 'Paid at', 'Received by'],
        list.map(p => [`<span class="mono">${p.referenceNo}</span>`, `<span class="mono">${p.orderNo}</span>`, NAMES[p.method], p2(p.amount), `<span class="chip ${p.status === 'PAID' ? 'chip-green' : 'chip-red'}">${p.status}</span>`, BB.dateTime(p.paidAt), esc(p.receivedBy || 'Self-service (QR)')]),
        ['Total paid', '', '', p2(sum(paid, p => p.amount)), '', '', ''], [3])}</section>`;
    csv = [['Reference', 'Order', 'Method', 'Amount', 'Status', 'Paid at', 'Received by']].concat(list.map(p => [p.referenceNo, p.orderNo, p.method, p.amount.toFixed(2), p.status, p.paidAt, p.receivedBy || 'Self-service (QR)']));
  }

  // ---- Events ----
  $('tabs').addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) { tab = b.dataset.tab; history.replaceState(null, '', '#' + tab); render(); } });
  ['range', 'from', 'to', 'sample'].forEach(id => $(id).addEventListener('change', render));
  $('exportBtn').addEventListener('click', () => {
    const text = csv.map(r => r.map(c => { const s = String(c == null ? '' : c); return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; }).join(',')).join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob(['﻿' + text], { type: 'text/csv' }));
    const [from, to] = period();
    a.download = `brew-bite-${tab}-${isoDay(from)}-to-${isoDay(addDays(to, -1))}.csv`;
    document.body.appendChild(a); a.click(); a.remove();
    BB.audit.log('Exported report', `${TABS.find(t => t[0] === tab)[1]} · ${$('rangeText').textContent}`);
  });
  window.addEventListener('resize', () => { clearTimeout(window._rz); window._rz = setTimeout(render, 200); });
  if (!TABS.some(t => t[0] === tab)) tab = 'sales';
  render();
})();
};

/* ===== admin/menu ===== */
BBViews['admin/menu'] = function () {
(function () {
  const user = BBS.init(['admin'], 'menu');
  if (!user) return;
  const D = BB_DATA, I = BB.inventory;
  const $ = (id) => document.getElementById(id);
  const esc = BBC.esc;
  let cat = 'all';

  // Recipe cost of one Medium / single serving
  const recipeCost = (item) => { const u = I.usageForLine({ itemId: item.id, qty: 1, options: [] }); return Object.keys(u).reduce((n, k) => n + u[k] * ((I.ing(k) || { cost: 0 }).cost), 0); };
  const sizeGroup = (item) => (item.options || []).find(g => g.id === 'size');

  function availability(item) {
    const o = BB.menu.overrides();
    if (item.id in o) return o[item.id] ? 'off' : 'on';
    return 'auto';
  }

  function render() {
    $('tabs').innerHTML = [['all', 'All', D.items.length]].concat(D.categories.map(c => [c.id, c.name, D.items.filter(i => i.cat === c.id).length]))
      .map(([id, l, n]) => `<button type="button" data-cat="${id}" class="${id === cat ? 'on' : ''}">${esc(l)}<span class="n">${n}</span></button>`).join('');
    const q = $('search').value.trim().toLowerCase();
    const rows = D.items.filter(i => (cat === 'all' || i.cat === cat) && (!q || i.name.toLowerCase().includes(q)));
    $('rows').innerHTML = rows.map(i => {
      const cost = recipeCost(i);
      const margin = i.price ? (i.price - cost) / i.price * 100 : 0;
      const sg = sizeGroup(i);
      const opts = (i.options || []).map(g => g.id === 'size' ? `Size (L +₱${g.choices[1].price})` : `${g.name} (${g.choices.length})`).join(' · ');
      const av = availability(i);
      const soldNow = BB.menu.isSoldOut(i);
      return `<tr>
        <td><div class="item-cell"><span class="sw" style="background:linear-gradient(135deg, ${i.tone[0]}, ${i.tone[1]})"></span><span><b>${esc(i.name)}</b>${(i.tags || []).map(t => ` <span class="chip ${t === 'New' ? 'chip-green' : 'chip-gold'}">${t}</span>`).join('')}<small>${esc(i.desc)}</small></span></div></td>
        <td>${esc((D.categories.find(c => c.id === i.cat) || { name: '—' }).name)}</td>
        <td class="r num price-cell"><b>${BB.peso(i.price)}</b>${sg ? `<small>Large ${BB.peso(i.price + sg.choices[1].price)}</small>` : ''}</td>
        <td><small style="color:var(--ink)">${esc(opts) || '<span class="muted">None</span>'}</small></td>
        <td class="r num">${D.recipes[i.id] && D.recipes[i.id].length ? BB.peso(cost, true) : '<a href="admin.html?view=recipes&item=' + i.id + '">Add recipe</a>'}</td>
        <td class="r num ${margin >= 65 ? 'margin-good' : 'margin-low'}">${D.recipes[i.id] ? margin.toFixed(0) + '%' : '—'}</td>
        <td><select class="input avail-sel" data-avail="${i.id}" aria-label="Availability of ${esc(i.name)}">
            <option value="auto" ${av === 'auto' ? 'selected' : ''}>Auto (by stock)</option>
            <option value="on" ${av === 'on' ? 'selected' : ''}>Always available</option>
            <option value="off" ${av === 'off' ? 'selected' : ''}>Sold out</option>
          </select><small class="${soldNow ? 'margin-low' : ''}">${soldNow ? 'Hidden from ordering' : 'On sale'}</small></td>
        <td class="r"><button class="btn btn-ghost btn-sm" data-edit="${i.id}">Edit</button></td>
      </tr>`;
    }).join('') || '<tr><td colspan="8" class="empty-row">No items match.</td></tr>';
  }

  $('tabs').addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) { cat = b.dataset.cat; render(); } });
  $('search').addEventListener('input', render);
  $('rows').addEventListener('change', (e) => {
    const sel = e.target.closest('[data-avail]'); if (!sel) return;
    const item = D.items.find(i => i.id === sel.dataset.avail);
    const o = BB.menu.overrides();
    if (sel.value === 'auto') delete o[item.id]; else o[item.id] = sel.value === 'off';
    BB.set('soldOut', o);
    BB.audit.log('Changed availability', `${item.name} · ${sel.options[sel.selectedIndex].text}`);
    render();
  });

  // ---- Item editor ----
  let editing = null;
  $('iTpl').innerHTML = Object.keys(D.optionTemplates).map(k => `<option value="${k}">${esc(D.optionTemplates[k].label)}</option>`).join('');
  function openItem(id) {
    editing = id ? D.items.find(i => i.id === id) : null;
    $('iCat').innerHTML = D.categories.map(c => `<option value="${c.id}">${esc(c.name)}</option>`).join('');
    $('iTitle').textContent = editing ? 'Edit ' + editing.name : 'Add menu item';
    $('iName').value = editing ? editing.name : '';
    $('iCat').value = editing ? editing.cat : (cat !== 'all' ? cat : D.categories[0].id);
    $('iPrice').value = editing ? editing.price : '';
    $('iDesc').value = editing ? editing.desc : '';
    $('tBest').checked = !!(editing && (editing.tags || []).includes('Best seller'));
    $('tNew').checked = editing ? (editing.tags || []).includes('New') : true;
    const sg = editing ? sizeGroup(editing) : null;
    $('iLargeWrap').hidden = !!editing && !sg;
    $('iLarge').value = sg ? sg.choices[1].price : 20;
    $('iTplWrap').hidden = !!editing;
    $('iDelete').hidden = !editing;
    $('iDelete').dataset.confirm = '';
    $('iDelete').textContent = 'Remove from menu';
    $('iRecipeHint').innerHTML = editing ? `Ingredients for this item are set in <a href="admin.html?view=recipes&item=${editing.id}">Recipes &amp; costing</a>.` : 'After saving, add the recipe in Recipes & costing so stock is deducted when it sells.';
    $('iErr').hidden = true;
    updateLargeVisibility();
    $('itemBack').hidden = false;
    $('iName').focus();
  }
  function updateLargeVisibility() {
    if (editing) return;
    const tpl = D.optionTemplates[$('iTpl').value];
    $('iLargeWrap').hidden = !tpl.groups.some(g => g.id === 'size');
  }
  $('iTpl').addEventListener('change', updateLargeVisibility);
  $('addBtn').addEventListener('click', () => openItem(null));
  $('rows').addEventListener('click', (e) => { const b = e.target.closest('[data-edit]'); if (b) openItem(b.dataset.edit); });

  $('itemForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = $('iName').value.trim(), price = parseFloat($('iPrice').value), large = parseFloat($('iLarge').value);
    let err = '';
    if (!name) err = 'Enter the item name.';
    else if (!(price > 0)) err = 'Enter a price greater than zero.';
    else if (!$('iLargeWrap').hidden && !(large >= 0)) err = 'Enter how much Large adds (0 if the same price).';
    else if (D.items.some(i => i.name.toLowerCase() === name.toLowerCase() && i !== editing)) err = `${name} is already on the menu.`;
    if (err) { $('iErr').textContent = err; $('iErr').hidden = false; return; }

    const items = JSON.parse(JSON.stringify(D.items));
    const tags = [$('tBest').checked && 'Best seller', $('tNew').checked && 'New'].filter(Boolean);
    if (editing) {
      const it = items.find(i => i.id === editing.id);
      const changes = [];
      if (it.price !== price) changes.push(`price ${BB.peso(it.price)} → ${BB.peso(price)}`);
      if (it.name !== name) changes.push(`renamed from ${it.name}`);
      Object.assign(it, { name, cat: $('iCat').value, price, desc: $('iDesc').value.trim(), tags });
      const sg = sizeGroup(it);
      if (sg && sg.choices[1].price !== large) { changes.push(`Large +₱${sg.choices[1].price} → +₱${large}`); sg.choices[1].price = large; }
      BB.audit.log('Edited menu item', `${name}${changes.length ? ' · ' + changes.join(', ') : ''}`);
    } else {
      const groups = JSON.parse(JSON.stringify(D.optionTemplates[$('iTpl').value].groups));
      const sg = groups.find(g => g.id === 'size');
      if (sg) sg.choices[1].price = large;
      const tones = { coffee: ['#7A4A26', '#C99467'], noncoffee: ['#3F6B3A', '#A9C98A'], milktea: ['#9A7A4E', '#E3CFA6'], frappe: ['#3A2418', '#7F5641'], meals: ['#8A3B22', '#E09A63'], pastries: ['#B07A2E', '#F2D49B'] };
      items.push({ id: name.toLowerCase().replace(/[^a-z0-9]+/g, '') + Date.now().toString(36).slice(-3), cat: $('iCat').value, name, price, desc: $('iDesc').value.trim(), tone: tones[$('iCat').value] || ['#4A5B50', '#A9B8AE'], tags, options: groups });
      BB.audit.log('Added menu item', `${name} · ${BB.peso(price)}`);
    }
    BB.admin.save('items', items);
    $('itemBack').hidden = true;
    BBC.toast('Saved ' + name);
    render();
  });

  $('iDelete').addEventListener('click', () => {
    const b = $('iDelete');
    if (b.dataset.confirm !== 'yes') { b.dataset.confirm = 'yes'; b.textContent = 'Click again to remove'; return; }
    BB.admin.save('items', D.items.filter(i => i.id !== editing.id));
    BB.audit.log('Removed menu item', editing.name);
    $('itemBack').hidden = true;
    BBC.toast(`${editing.name} removed from the menu`);
    render();
  });

  // ---- Categories ----
  function renderCats() {
    $('catList').innerHTML = D.categories.map((c, idx) => {
      const n = D.items.filter(i => i.cat === c.id).length;
      return `<div class="cat-row"><input class="input" value="${esc(c.name)}" data-rename="${c.id}" aria-label="Category name">
        <span class="hint">${n} item(s)</span>
        <button type="button" class="btn btn-ghost btn-sm" data-del="${c.id}" ${n ? 'disabled title="Move or remove its items first"' : ''}>Delete</button></div>`;
    }).join('');
  }
  $('catsBtn').addEventListener('click', () => { renderCats(); $('cErr').hidden = true; $('catBack').hidden = false; });
  $('catList').addEventListener('change', (e) => {
    const inp = e.target.closest('[data-rename]'); if (!inp || !inp.value.trim()) return;
    const cats = D.categories.map(c => c.id === inp.dataset.rename ? Object.assign({}, c, { name: inp.value.trim() }) : c);
    BB.admin.save('categories', cats);
    BB.audit.log('Renamed category', inp.value.trim());
    render();
  });
  $('catList').addEventListener('click', (e) => {
    const b = e.target.closest('[data-del]'); if (!b || b.disabled) return;
    const c = D.categories.find(x => x.id === b.dataset.del);
    BB.admin.save('categories', D.categories.filter(x => x.id !== c.id));
    BB.audit.log('Deleted category', c.name);
    if (cat === c.id) cat = 'all';
    renderCats(); render();
  });
  $('catForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = $('newCat').value.trim();
    if (!name) return;
    if (D.categories.some(c => c.name.toLowerCase() === name.toLowerCase())) { $('cErr').textContent = `${name} already exists.`; $('cErr').hidden = false; return; }
    BB.admin.save('categories', D.categories.concat({ id: name.toLowerCase().replace(/[^a-z0-9]+/g, '') + Date.now().toString(36).slice(-3), name, icon: 'cup' }));
    BB.audit.log('Added category', name);
    $('newCat').value = ''; $('cErr').hidden = true;
    renderCats(); render();
  });

  document.querySelectorAll('.modal-back').forEach(back => {
    back.addEventListener('click', (e) => { if (e.target === back || e.target.closest('[data-close]')) back.hidden = true; });
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') document.querySelectorAll('.modal-back').forEach(b => { b.hidden = true; }); });
  render();
})();
};

/* ===== admin/recipes ===== */
BBViews['admin/recipes'] = function () {
(function () {
  const user = BBS.init(['admin'], 'recipes');
  if (!user) return;
  const D = BB_DATA, I = BB.inventory;
  const $ = (id) => document.getElementById(id);
  const esc = BBC.esc;
  const p2 = (n) => BB.peso(n, true);
  let current = new URLSearchParams(location.search).get('item') || D.items[0].id;

  const isDrink = (it) => D.drinkCats.includes(it.cat);
  const hasSize = (it) => (it.options || []).some(g => g.id === 'size');
  function costOf(itemId, large) {
    const u = I.usageForLine({ itemId, qty: 1, options: large ? [{ groupId: 'size', id: 'l' }] : [] });
    return Object.keys(u).reduce((n, k) => n + u[k] * ((I.ing(k) || { cost: 0 }).cost), 0);
  }

  function renderList() {
    $('ilist').innerHTML = D.categories.map(c => {
      const items = D.items.filter(i => i.cat === c.id);
      if (!items.length) return '';
      return `<h4>${esc(c.name)}</h4>` + items.map(i => {
        const has = (D.recipes[i.id] || []).length;
        const m = has ? (i.price - costOf(i.id)) / i.price * 100 : null;
        return `<button type="button" data-id="${i.id}" class="${i.id === current ? 'on' : ''}"><b>${esc(i.name)}</b><span class="m ${m == null ? 'bad' : m >= 65 ? 'good' : 'bad'}">${m == null ? 'No recipe' : m.toFixed(0) + '%'}</span><small>${BB.peso(i.price)} · cost ${has ? p2(costOf(i.id)) : '—'}</small></button>`;
      }).join('');
    }).join('');
  }

  function ingOptions(sel) {
    const cats = [...new Set(I.ingredients().map(i => i.cat))];
    return cats.map(c => `<optgroup label="${esc(c)}">${I.ingredients().filter(i => i.cat === c).map(i => `<option value="${i.id}" ${i.id === sel ? 'selected' : ''}>${esc(i.name)} (${i.unit})</option>`).join('')}</optgroup>`).join('');
  }
  function lineRow(r, sizeable) {
    const g = I.ing(r[0]) || I.ingredients()[0];
    return `<tr><td><select class="input" data-f="ing">${ingOptions(g.id)}</select></td>
      <td><div class="q"><input class="input" data-f="qty" type="number" min="0" step="any" value="${r[1]}"><span data-f="unit">${g.unit}</span></div></td>
      <td>${sizeable ? `<input type="checkbox" data-f="scale" ${r[2] ? 'checked' : ''} aria-label="Scales with Large" style="width:18px;height:18px;accent-color:var(--accent-strong)">` : '<span class="muted">—</span>'}</td>
      <td class="r num" data-f="cost"></td><td><button type="button" class="rm" aria-label="Remove ingredient">×</button></td></tr>`;
  }

  function readLines() {
    return [...$('lines').querySelectorAll('tr')].map(tr => {
      const sc = tr.querySelector('[data-f="scale"]');
      const r = [tr.querySelector('[data-f="ing"]').value, parseFloat(tr.querySelector('[data-f="qty"]').value) || 0];
      if (sc && sc.checked) r.push(1);
      return r;
    });
  }

  function openItem(id) {
    current = id;
    const it = D.items.find(i => i.id === id);
    if (!it) return;
    history.replaceState(null, '', '?view=recipes&item=' + id);
    $('title').textContent = it.name;
    $('sub').textContent = `${(D.categories.find(c => c.id === it.cat) || { name: '' }).name} · ${BB.peso(it.price)}${hasSize(it) ? ` · Large ${BB.peso(it.price + it.options.find(g => g.id === 'size').choices[1].price)}` : ''}`;
    $('scaleHead').hidden = !hasSize(it);
    $('lines').innerHTML = (D.recipes[id] || []).map(r => lineRow(r, hasSize(it))).join('');
    $('cupNote').textContent = isDrink(it) ? 'A 12 oz or 16 oz cup and a lid are added automatically for drinks.' : '';
    $('err').hidden = true;
    recalc();
    renderList();
  }

  function recalc() {
    const it = D.items.find(i => i.id === current);
    const lines = readLines();
    $('lines').querySelectorAll('tr').forEach((tr, idx) => {
      const g = I.ing(lines[idx][0]);
      tr.querySelector('[data-f="unit"]').textContent = g.unit;
      tr.querySelector('[data-f="cost"]').textContent = p2(lines[idx][1] * g.cost);
    });
    // Cost from the edited lines (not saved yet)
    const cost = (large) => {
      let c = lines.reduce((n, r) => n + (r[2] && large ? r[1] * D.largeFactor : r[1]) * I.ing(r[0]).cost, 0);
      if (isDrink(it)) c += I.ing(large ? 'cup16' : 'cup12').cost + I.ing('lid').cost;
      return c;
    };
    const cell = (label, price, c) => { const m = (price - c) / price * 100; return `<div><small>${label}</small><strong>${p2(c)}</strong><span class="${m >= 65 ? 'good' : 'bad'}" style="font-size:.84rem">Food cost ${(c / price * 100).toFixed(1)}% · margin ${p2(price - c)}</span></div>`; };
    let html = cell(hasSize(it) ? 'Medium cost' : 'Cost per serving', it.price, cost(false));
    if (hasSize(it)) html += cell('Large cost', it.price + it.options.find(g => g.id === 'size').choices[1].price, cost(true));
    else html += `<div><small>Price</small><strong>${BB.peso(it.price)}</strong><span class="hint">Aim for food cost under 35%</span></div>`;
    $('costs').innerHTML = html;
  }

  $('ilist').addEventListener('click', (e) => { const b = e.target.closest('button[data-id]'); if (b) openItem(b.dataset.id); });
  $('lines').addEventListener('input', recalc);
  $('lines').addEventListener('change', recalc);
  $('lines').addEventListener('click', (e) => { if (e.target.closest('.rm')) { e.target.closest('tr').remove(); recalc(); } });
  $('addLine').addEventListener('click', () => {
    const it = D.items.find(i => i.id === current);
    $('lines').insertAdjacentHTML('beforeend', lineRow([I.ingredients()[0].id, 0, hasSize(it) ? 1 : 0], hasSize(it)));
    recalc();
  });
  $('revert').addEventListener('click', () => openItem(current));

  $('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const lines = readLines();
    let err = '';
    if (!lines.length) err = 'Add at least one ingredient so stock is deducted when this item sells.';
    else if (lines.some(r => !(r[1] > 0))) err = 'Every ingredient needs a quantity greater than zero.';
    else if (new Set(lines.map(r => r[0])).size !== lines.length) err = 'An ingredient is listed twice. Combine them into one line.';
    if (err) { $('err').textContent = err; $('err').hidden = false; return; }
    const it = D.items.find(i => i.id === current);
    const recipes = Object.assign({}, D.recipes, { [current]: lines });
    BB.admin.save('recipes', recipes);
    BB.audit.log('Updated recipe', `${it.name} · ${lines.length} ingredient(s) · cost ${p2(costOf(current))}`);
    $('err').hidden = true;
    BBC.toast('Recipe saved for ' + it.name);
    renderList();
  });

  // Add-on costing (read-only)
  const allChoices = {};
  D.items.forEach(i => (i.options || []).forEach(g => g.choices.forEach(ch => { allChoices[g.id + ':' + ch.id] = ch; })));
  $('addons').innerHTML = Object.keys(D.optionRecipes).map(key => {
    const r = D.optionRecipes[key], ch = allChoices[key];
    if (!ch) return '';
    let uses, cost;
    if (r.replace) { const g = I.ing(r.replace[1]); uses = `Replaces ${I.ing(r.replace[0]).name.toLowerCase()} with ${g.name.toLowerCase()}`; cost = 180 * (g.cost - I.ing(r.replace[0]).cost); }
    else { uses = r.add.map(([id, q]) => `${I.fmt(q, I.ing(id).unit)} ${I.ing(id).name.toLowerCase()}`).join(', '); cost = r.add.reduce((n, [id, q]) => n + q * I.ing(id).cost, 0); }
    const m = ch.price ? (ch.price - cost) / ch.price * 100 : 0;
    return `<tr><td><b>${esc(ch.name)}</b></td><td>${esc(uses)}${r.replace ? '<small>Cost shown for 180 ml of milk</small>' : ''}</td><td class="r num">${BB.peso(ch.price)}</td><td class="r num">${p2(cost)}</td><td class="r num ${m >= 60 ? 'good' : 'bad'}">${m.toFixed(0)}%</td></tr>`;
  }).join('');

  openItem(D.items.some(i => i.id === current) ? current : D.items[0].id);
})();
};

/* ===== admin/promos ===== */
BBViews['admin/promos'] = function () {
(function () {
  const user = BBS.init(['admin'], 'promos');
  if (!user) return;
  const D = BB_DATA;
  const $ = (id) => document.getElementById(id);
  const esc = BBC.esc;

  const describe = (v) => v.kind === 'percent' ? `${v.value}% off${v.max ? ` (max ${BB.peso(v.max)})` : ''}` : v.kind === 'fixed' ? `${BB.peso(v.value)} off` : 'Free delivery';

  function render() {
    const used = BB.orders.list().filter(o => o.voucher && o.paidAt && o.status !== 'voided');
    $('rows').innerHTML = D.vouchers.map(v => {
      const u = used.filter(o => o.voucher.code === v.code);
      return `<tr>
        <td><b class="mono">${esc(v.code)}</b><small>${esc(v.label)}</small></td>
        <td>${describe(v)}</td>
        <td class="r num">${v.minSpend ? BB.peso(v.minSpend) : 'None'}</td>
        <td class="r num">${u.length}</td>
        <td class="r num">${BB.peso(u.reduce((n, o) => n + o.voucher.amount, 0), true)}</td>
        <td><label class="switch"><input type="checkbox" data-toggle="${esc(v.code)}" ${v.active ? 'checked' : ''} aria-label="${esc(v.code)} active"><span></span></label></td>
        <td class="r"><button class="btn btn-ghost btn-sm" data-edit="${esc(v.code)}">Edit</button></td>
      </tr>`;
    }).join('') || '<tr><td colspan="7" class="empty-row">No vouchers yet.</td></tr>';

    const cur = D.promo.code;
    $('bCode').innerHTML = D.vouchers.filter(v => v.active).map(v => `<option ${v.code === cur ? 'selected' : ''}>${esc(v.code)}</option>`).join('');
  }

  function preview() { $('bPreview').innerHTML = `<span>${esc($('bText').value || '…')}. Use code at checkout.</span><code>${esc($('bCode').value || '—')}</code>`; }
  $('bText').value = D.promo.text;
  $('bannerForm').addEventListener('input', preview);
  $('bannerForm').addEventListener('change', preview);
  $('bannerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    if (!$('bText').value.trim() || !$('bCode').value) { BBC.toast('Enter banner text and pick an active voucher.'); return; }
    BB.admin.save('promo', Object.assign({}, D.promo, { text: $('bText').value.trim(), code: $('bCode').value }));
    BB.audit.log('Updated promo banner', `${$('bText').value.trim()} · ${$('bCode').value}`);
    BBC.toast('Banner saved');
  });

  $('rows').addEventListener('change', (e) => {
    const t = e.target.closest('[data-toggle]'); if (!t) return;
    const list = D.vouchers.map(v => v.code === t.dataset.toggle ? Object.assign({}, v, { active: t.checked }) : v);
    BB.admin.save('vouchers', list);
    BB.audit.log(t.checked ? 'Activated voucher' : 'Deactivated voucher', t.dataset.toggle);
    render(); preview();
  });

  // ---- Editor ----
  let editing = null;
  function syncKind() {
    const k = $('vKind').value;
    $('vValueWrap').hidden = k === 'delivery';
    $('vMaxWrap').hidden = k !== 'percent';
    $('vValueLbl').textContent = k === 'percent' ? 'Percent off' : 'Amount off ₱';
  }
  $('vKind').addEventListener('change', syncKind);
  function openV(code) {
    editing = code ? D.vouchers.find(v => v.code === code) : null;
    $('vTitle').textContent = editing ? 'Edit ' + editing.code : 'New voucher';
    $('vCode').value = editing ? editing.code : '';
    $('vCode').disabled = !!editing;
    $('vKind').value = editing ? editing.kind : 'percent';
    $('vValue').value = editing ? editing.value : '';
    $('vMax').value = editing && editing.max ? editing.max : '';
    $('vMin').value = editing ? editing.minSpend : 0;
    $('vLabel').value = editing ? editing.label : '';
    $('vDelete').hidden = !editing;
    $('vDelete').dataset.confirm = ''; $('vDelete').textContent = 'Delete';
    $('vErr').hidden = true;
    syncKind();
    $('vBack').hidden = false;
    (editing ? $('vValue') : $('vCode')).focus();
  }
  $('addBtn').addEventListener('click', () => openV(null));
  $('rows').addEventListener('click', (e) => { const b = e.target.closest('[data-edit]'); if (b) openV(b.dataset.edit); });

  $('vForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const code = $('vCode').value.trim().toUpperCase().replace(/\s+/g, '');
    const kind = $('vKind').value;
    const value = kind === 'delivery' ? 0 : parseFloat($('vValue').value);
    const max = kind === 'percent' && $('vMax').value ? parseFloat($('vMax').value) : undefined;
    const minSpend = parseFloat($('vMin').value) || 0;
    let err = '';
    if (!/^[A-Z0-9]{4,16}$/.test(code)) err = 'Use 4 to 16 letters or numbers for the code, no spaces.';
    else if (!editing && D.vouchers.some(v => v.code === code)) err = `${code} already exists.`;
    else if (kind !== 'delivery' && !(value > 0)) err = 'Enter the discount amount.';
    else if (kind === 'percent' && value > 50) err = 'Percent vouchers are capped at 50% off.';
    if (err) { $('vErr').textContent = err; $('vErr').hidden = false; return; }
    const rec = { code, kind, value, max, minSpend, active: editing ? editing.active : true };
    rec.label = $('vLabel').value.trim() || describe(rec);
    const list = editing ? D.vouchers.map(v => v.code === code ? rec : v) : D.vouchers.concat(rec);
    BB.admin.save('vouchers', list);
    BB.audit.log(editing ? 'Edited voucher' : 'Created voucher', `${code} · ${describe(rec)}${minSpend ? ' · min ' + BB.peso(minSpend) : ''}`);
    $('vBack').hidden = true;
    BBC.toast('Saved ' + code);
    render(); preview();
  });

  $('vDelete').addEventListener('click', () => {
    const b = $('vDelete');
    if (D.promo.code === editing.code) { $('vErr').textContent = 'This code is on the promo banner. Pick a different banner code first.'; $('vErr').hidden = false; return; }
    if (b.dataset.confirm !== 'yes') { b.dataset.confirm = 'yes'; b.textContent = 'Click again to delete'; return; }
    BB.admin.save('vouchers', D.vouchers.filter(v => v.code !== editing.code));
    BB.audit.log('Deleted voucher', editing.code);
    $('vBack').hidden = true;
    render(); preview();
  });

  document.querySelectorAll('.modal-back').forEach(back => {
    back.addEventListener('click', (e) => { if (e.target === back || e.target.closest('[data-close]')) back.hidden = true; });
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') document.querySelectorAll('.modal-back').forEach(b => { b.hidden = true; }); });
  render(); preview();
})();
};

/* ===== admin/loyalty ===== */
BBViews['admin/loyalty'] = function () {
(function () {
  const user = BBS.init(['admin'], 'loyalty');
  if (!user) return;
  const D = BB_DATA;
  const $ = (id) => document.getElementById(id);
  const esc = BBC.esc;

  function members() {
    const mobiles = new Set(Object.keys(D.loyalty.members || {}).concat(Object.keys(BB.get('loyalty', {}))));
    const orders = BB.orders.list().filter(o => o.customer && o.customer.mobile);
    orders.forEach(o => mobiles.add(o.customer.mobile));
    return [...mobiles].map(m => {
      const rec = BB.loyalty.member(m) || { name: '', points: 0 };
      const mine = orders.filter(o => o.customer.mobile === m && o.paidAt && o.status !== 'voided');
      const last = mine.map(o => o.paidAt).sort().pop();
      return { mobile: m, name: rec.name || (mine[0] && mine[0].customer.name) || '', points: rec.points, orders: mine.length, spent: mine.reduce((n, o) => n + o.total, 0), last };
    }).sort((a, b) => b.points - a.points);
  }

  function render() {
    const list = members();
    const real = BB.orders.list().filter(o => o.paidAt && o.status !== 'voided');
    const earned = real.reduce((n, o) => n + (o.pointsEarned || 0), 0);
    const redeemed = real.reduce((n, o) => n + (o.pointsUsed || 0), 0);
    const outstanding = list.reduce((n, m) => n + Math.max(0, m.points), 0);
    $('kpis').innerHTML = `
      <div class="kpi"><small>Members</small><strong>${list.length}</strong></div>
      <div class="kpi"><small>Points outstanding</small><strong>${outstanding}</strong><span class="hint">Worth ${BB.peso(outstanding)} in discounts</span></div>
      <div class="kpi"><small>Points earned (demo orders)</small><strong>${earned}</strong></div>
      <div class="kpi"><small>Points redeemed (demo orders)</small><strong>${redeemed}</strong></div>`;

    $('sPeso').value = D.loyalty.pesoPerPoint;
    $('sMin').value = D.loyalty.minRedeem;
    rule();

    const q = $('search').value.trim().toLowerCase();
    const rows = list.filter(m => !q || m.mobile.includes(q) || m.name.toLowerCase().includes(q));
    $('rows').innerHTML = rows.map(m => `<tr>
      <td><b>${esc(m.name || 'No name given')}</b></td>
      <td class="mono" style="font-size:.84rem">${m.mobile.slice(0, 4)} ${m.mobile.slice(4, 7)} ${m.mobile.slice(7)}</td>
      <td class="r num"><b>${m.points}</b></td>
      <td class="r num">${BB.peso(Math.max(0, m.points))}</td>
      <td class="r num">${m.orders}</td>
      <td class="r num">${BB.peso(m.spent, true)}</td>
      <td>${m.last ? BB.dateTime(m.last) : '<span class="muted">Sample member</span>'}</td>
      <td class="r"><button class="btn btn-ghost btn-sm" data-adj="${m.mobile}">Adjust</button></td>
    </tr>`).join('') || '<tr><td colspan="8" class="empty-row">No members match.</td></tr>';
  }

  function rule() {
    const peso = parseInt($('sPeso').value, 10) || D.loyalty.pesoPerPoint, min = parseInt($('sMin').value, 10) || D.loyalty.minRedeem;
    $('rule').innerHTML = `A ₱500 order earns <b>${Math.floor(500 / peso)} points</b>. Each point is ₱1 off. Customers can use points once they have <b>${min}</b>. That gives back about <b>${(100 / peso).toFixed(1)}%</b> of what they spend.`;
  }
  $('setForm').addEventListener('input', rule);
  $('setForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const peso = parseInt($('sPeso').value, 10), min = parseInt($('sMin').value, 10);
    if (!(peso >= 1) || !(min >= 1)) { BBC.toast('Enter whole numbers of 1 or more.'); return; }
    BB.admin.save('loyaltyConfig', { pesoPerPoint: peso, minRedeem: min });
    BB.audit.log('Changed loyalty settings', `1 point per ₱${peso} · redeem from ${min} points`);
    BBC.toast('Loyalty settings saved');
    render();
  });
  $('search').addEventListener('input', render);

  let adjusting = null;
  $('rows').addEventListener('click', (e) => {
    const b = e.target.closest('[data-adj]'); if (!b) return;
    adjusting = members().find(m => m.mobile === b.dataset.adj);
    $('aInfo').textContent = `${adjusting.name || adjusting.mobile} has ${adjusting.points} points.`;
    $('aPts').value = ''; $('aErr').hidden = true;
    $('aBack').hidden = false; $('aPts').focus();
  });
  $('aForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const pts = parseInt($('aPts').value, 10);
    if (!pts) { $('aErr').textContent = 'Enter a number of points other than zero.'; $('aErr').hidden = false; return; }
    if (adjusting.points + pts < 0) { $('aErr').textContent = `They only have ${adjusting.points} points.`; $('aErr').hidden = false; return; }
    BB.loyalty.add(adjusting.mobile, adjusting.name, pts);
    BB.audit.log('Adjusted loyalty points', `${adjusting.name || adjusting.mobile} · ${pts > 0 ? '+' : ''}${pts} · ${$('aReason').value}`);
    $('aBack').hidden = true;
    BBC.toast('Points updated');
    render();
  });

  document.querySelectorAll('.modal-back').forEach(back => {
    back.addEventListener('click', (e) => { if (e.target === back || e.target.closest('[data-close]')) back.hidden = true; });
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') document.querySelectorAll('.modal-back').forEach(b => { b.hidden = true; }); });
  render();
})();
};

/* ===== admin/users ===== */
BBViews['admin/users'] = function () {
(function () {
  const user = BBS.init(['admin'], 'users');
  if (!user) return;
  const D = BB_DATA;
  const $ = (id) => document.getElementById(id);
  const esc = BBC.esc;
  const ROLES = BBS.ROLE_NAME;

  function lastLogin(u) {
    const a = BB.audit.list().filter(x => x.action === 'Logged in' && x.user === u.name).pop();
    return a ? BB.dateTime(a.at) : '<span class="muted">Never in this demo</span>';
  }

  function render() {
    $('rows').innerHTML = D.users.map(u => `<tr>
      <td><div class="who"><span class="avatar">${esc(u.name.split(' ').map(s => s[0]).slice(0, 2).join(''))}</span><span><b>${esc(u.name)}</b>${u.id === user.id ? '<small>You</small>' : ''}</span></div></td>
      <td class="mono" style="font-size:.85rem">${esc(u.username)}</td>
      <td>${ROLES[u.role]}</td>
      <td><span class="chip ${u.active === false ? 'chip-red' : 'chip-green'}">${u.active === false ? 'Disabled' : 'Active'}</span></td>
      <td>${lastLogin(u)}</td>
      <td class="r"><button class="btn btn-ghost btn-sm" data-edit="${u.id}">Edit</button></td>
    </tr>`).join('');

    const perms = [
      ['Take QR orders from customers', 1, 1, 0, 0],
      ['Point of sale and taking payments', 1, 1, 0, 0],
      ['Senior/PWD discounts, cancel and void orders', 1, 1, 0, 0],
      ['Kitchen display, mark items sold out', 1, 0, 1, 0],
      ['Ingredients, suppliers, purchase orders, wastage', 1, 0, 0, 1],
      ['Dashboard and reports', 1, 0, 0, 0],
      ['Menu, prices, recipes, promos, loyalty', 1, 0, 0, 0],
      ['Users and audit logs', 1, 0, 0, 0]
    ];
    const count = (r) => D.users.filter(u => u.role === r && u.active !== false).length;
    $('matrix').innerHTML = `<thead><tr><th>Can…</th>${['admin', 'cashier', 'kitchen', 'inventory'].map(r => `<th>${ROLES[r]}<small style="display:block;font-family:var(--body);text-transform:none;letter-spacing:0">${count(r)} active</small></th>`).join('')}</tr></thead>
      <tbody>${perms.map(p => `<tr><td>${p[0]}</td>${p.slice(1).map(v => `<td>${v ? '<span class="yes" aria-label="Yes">✓</span>' : '<span class="no" aria-label="No">—</span>'}</td>`).join('')}</tr>`).join('')}</tbody>`;
  }

  let editing = null;
  $('uRole').innerHTML = Object.keys(ROLES).map(r => `<option value="${r}">${ROLES[r]}</option>`).join('');
  function openU(id) {
    editing = id ? D.users.find(u => u.id === id) : null;
    $('uTitle').textContent = editing ? 'Edit ' + editing.name : 'Add user';
    $('uName').value = editing ? editing.name : '';
    $('uUser').value = editing ? editing.username : '';
    $('uRole').value = editing ? editing.role : 'cashier';
    $('uPass').value = '';
    $('uPassLbl').textContent = editing ? 'New password (leave blank to keep)' : 'Password';
    $('uActive').checked = editing ? editing.active !== false : true;
    const self = editing && editing.id === user.id;
    $('uRole').disabled = self; $('uActive').disabled = self;
    $('uErr').hidden = true;
    $('uBack').hidden = false;
    $('uName').focus();
  }
  $('addBtn').addEventListener('click', () => openU(null));
  $('rows').addEventListener('click', (e) => { const b = e.target.closest('[data-edit]'); if (b) openU(b.dataset.edit); });

  $('uForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = $('uName').value.trim(), username = $('uUser').value.trim().toLowerCase(), role = $('uRole').value, pass = $('uPass').value, active = $('uActive').checked;
    let err = '';
    if (!name) err = 'Enter the person’s full name.';
    else if (!/^[a-z0-9._]{3,20}$/.test(username)) err = 'Username: 3 to 20 lowercase letters, numbers, dots or underscores.';
    else if (D.users.some(u => u.username === username && u !== editing)) err = `${username} is already taken.`;
    else if (!editing && pass.length < 6) err = 'Password must be at least 6 characters.';
    else if (editing && pass && pass.length < 6) err = 'New password must be at least 6 characters.';
    else if (editing && editing.role === 'admin' && (role !== 'admin' || !active) && D.users.filter(u => u.role === 'admin' && u.active !== false).length < 2) err = 'Keep at least one active admin.';
    if (err) { $('uErr').textContent = err; $('uErr').hidden = false; return; }

    let list;
    if (editing) {
      list = D.users.map(u => u.id !== editing.id ? u : Object.assign({}, u, { name, username, role: editing.id === user.id ? u.role : role, active: editing.id === user.id ? true : active }, pass ? { password: pass } : {}));
      const changes = [];
      if (editing.role !== role && editing.id !== user.id) changes.push(`role ${ROLES[editing.role]} → ${ROLES[role]}`);
      if ((editing.active !== false) !== active && editing.id !== user.id) changes.push(active ? 'enabled' : 'disabled');
      if (pass) changes.push('password reset');
      BB.audit.log('Edited user', `${name}${changes.length ? ' · ' + changes.join(', ') : ''}`);
    } else {
      list = D.users.concat({ id: 'u' + Date.now().toString(36), name, username, password: pass, role, active });
      BB.audit.log('Added user', `${name} · ${ROLES[role]}`);
    }
    BB.admin.save('users', list);
    $('uBack').hidden = true;
    BBC.toast('Saved ' + name);
    render();
  });

  document.querySelectorAll('.modal-back').forEach(back => {
    back.addEventListener('click', (e) => { if (e.target === back || e.target.closest('[data-close]')) back.hidden = true; });
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') document.querySelectorAll('.modal-back').forEach(b => { b.hidden = true; }); });
  render();
})();
};

/* ===== admin/audit ===== */
BBViews['admin/audit'] = function () {
(function () {
  const user = BBS.init(['admin'], 'audit');
  if (!user) return;
  const $ = (id) => document.getElementById(id);
  const esc = BBC.esc;
  let limit = 100;

  // Group actions into areas so the owner can filter, e.g. everything about money
  function area(action) {
    const a = action.toLowerCase();
    if (/void|cancel|discount|adjusted loyalty/.test(a)) return ['Needs review', 'risk'];
    if (/payment|counter order|exported/.test(a)) return ['Sales', 'money'];
    if (/stock|wastage|purchase|ingredient|supplier/.test(a)) return ['Inventory', 'stock'];
    if (/preparing|ready|completed|recalled|sold out|available/.test(a)) return ['Kitchen', ''];
    if (/logged/.test(a)) return ['Login', ''];
    return ['Settings', 'admin'];
  }

  function filtered() {
    const range = $('fRange').value, ar = $('fArea').value, us = $('fUser').value, q = $('fText').value.trim().toLowerCase();
    const now = Date.now();
    return BB.audit.list().filter(a => {
      const t = new Date(a.at).getTime();
      if (range === 'today' && new Date(a.at).toDateString() !== new Date().toDateString()) return false;
      if (range === '7' && now - t > 7 * 86400000) return false;
      if (ar && area(a.action)[0] !== ar) return false;
      if (us && a.user !== us) return false;
      if (q && !(a.action + ' ' + a.detail + ' ' + a.user).toLowerCase().includes(q)) return false;
      return true;
    }).reverse();
  }

  function render() {
    const all = BB.audit.list();
    const curA = $('fArea').value, curU = $('fUser').value;
    $('fArea').innerHTML = '<option value="">All areas</option>' + ['Needs review', 'Sales', 'Kitchen', 'Inventory', 'Settings', 'Login'].map(a => `<option ${a === curA ? 'selected' : ''}>${a}</option>`).join('');
    $('fUser').innerHTML = '<option value="">Everyone</option>' + [...new Set(all.map(a => a.user))].sort().map(u => `<option ${u === curU ? 'selected' : ''}>${esc(u)}</option>`).join('');

    const rows = filtered();
    $('count').textContent = `${rows.length} entr${rows.length === 1 ? 'y' : 'ies'}`;
    $('rows').innerHTML = rows.slice(0, limit).map(a => {
      const [name, cls] = area(a.action);
      return `<tr>
        <td style="white-space:nowrap">${BB.dateTime(a.at)}</td>
        <td><b>${esc(a.user)}</b><small>${esc(BBS.ROLE_NAME[a.role] || 'Customer')}</small></td>
        <td><span class="chip area-chip ${cls}">${name}</span></td>
        <td>${esc(a.action)}</td>
        <td>${esc(a.detail)}</td>
      </tr>`;
    }).join('') || '<tr><td colspan="5" class="empty-row">No entries match these filters.</td></tr>';
    $('moreWrap').hidden = rows.length <= limit;
  }

  ['fRange', 'fArea', 'fUser'].forEach(id => $(id).addEventListener('change', () => { limit = 100; render(); }));
  $('fText').addEventListener('input', () => { limit = 100; render(); });
  $('more').addEventListener('click', () => { limit += 100; render(); });
  $('exportBtn').addEventListener('click', () => {
    const rows = [['Date', 'User', 'Role', 'Area', 'Action', 'Details']].concat(filtered().map(a => [a.at, a.user, a.role, area(a.action)[0], a.action, a.detail]));
    const text = rows.map(r => r.map(c => { const s = String(c == null ? '' : c); return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; }).join(',')).join('\n');
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob(['﻿' + text], { type: 'text/csv' }));
    link.download = `brew-bite-audit-${BB.ymd()}.csv`;
    document.body.appendChild(link); link.click(); link.remove();
  });
  window.addEventListener('storage', (e) => { if (e.key === 'bb_audit') render(); });
  render();
})();
};

/* ===== Theme: light / dark ===== */
// The saved choice wins; otherwise follow the device. Dark mode is switched on module by module
// as each one is polished for the new palette.
window.BBTheme = (function () {
  const READY = ['index', 'home', 'login', 'customer', 'cashier', 'kitchen', 'inventory', 'admin'];
  // The kitchen wall screen keeps its own setting and starts dark
  const isKitchen = () => document.body.dataset.module === 'kitchen';
  const KEY = () => isKitchen() ? 'bbThemeKitchen' : 'bbTheme'; // not "bb_" so Reset demo data keeps it
  const saved = () => { try { return localStorage.getItem(KEY()); } catch (e) { return null; } };
  const system = () => window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const supported = () => READY.includes(document.body.dataset.module);
  const current = () => supported() ? (saved() || (isKitchen() ? 'dark' : system())) : 'light';
  function apply() {
    document.documentElement.dataset.theme = current();
    document.querySelectorAll('[data-theme-toggle]').forEach(b => {
      const dark = current() === 'dark';
      b.setAttribute('aria-pressed', String(dark));
      b.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
      b.title = dark ? 'Light mode' : 'Dark mode';
    });
  }
  function toggle() {
    try { localStorage.setItem(KEY(), current() === 'dark' ? 'light' : 'dark'); } catch (e) { /* storage blocked */ }
    apply();
  }
  document.addEventListener('click', (e) => { if (e.target.closest('[data-theme-toggle]')) toggle(); });
  if (window.matchMedia) matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => { if (!saved()) apply(); });
  return { apply, toggle, current, supported };
})();

/* ===== Boot: show the screen named in ?view= (or the module's first screen) ===== */
(function () {
  const mod = document.body.dataset.module;
  BBTheme.apply();
  const tpls = [...document.querySelectorAll('template[data-view]')];
  if (!mod || !tpls.length) return;
  const want = new URLSearchParams(location.search).get('view');
  const tpl = tpls.find(t => t.dataset.view === want) || tpls.find(t => t.hasAttribute('data-default'));
  const view = tpl.dataset.view;
  document.title = tpl.dataset.title;
  (tpl.dataset.bodyClass || '').split(' ').filter(Boolean).forEach(c => document.body.classList.add(c));
  document.body.classList.add('v-' + mod + '-' + view);
  document.body.insertBefore(tpl.content.cloneNode(true), document.body.querySelector('script'));
  BBViews[mod + '/' + view]();
  BBTheme.apply(); // label any theme toggle the screen just rendered
  // The screen is drawn after load, so jump to #section links ourselves
  if (location.hash.length > 1) { const target = document.getElementById(decodeURIComponent(location.hash.slice(1))); if (target) target.scrollIntoView(); }
})();
