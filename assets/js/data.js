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
    { id: 'taro', cat: 'milktea', name: 'Taro Milk Tea', price: 130, desc: 'Creamy taro root with jasmine tea.', tone: ['#7E6A9E', '#CFC3E6'], soldOut: true, options: [size(20), sugar, teaAddons] },

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
    categories,
    items
  };
})();
