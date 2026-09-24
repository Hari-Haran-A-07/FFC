export interface FAQItem {
  question: string;
  answer: string;
  category: 'customizer' | 'ordering' | 'delivery' | 'ingredients';
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'How does the "Make Your Chicken" customizer work?',
    answer: 'Make Your Chicken is our proprietary 6-step interactive food creation lab. You select your chicken base cut (strips, wings, burger fillet, popcorn, or bone-in pieces), choose your preferred crunch texture, select custom seasonings and spice heat levels (Mild to Fire Zone), and pair with artisan dipping sauces. We fry every custom recipe fresh to order!',
    category: 'customizer',
  },
  {
    question: 'Can I customize the exact spice level?',
    answer: 'Absolutely! We offer 5 precision heat levels ranging from Level 01 (Mild aromatic warmth) up to Level 05 (Fire Zone with real Ghost Pepper extract). Our kitchens measure the spice dusting in grams to match your exact heat tolerance.',
    category: 'customizer',
  },
  {
    question: 'How do you keep the chicken crispy during delivery?',
    answer: 'We use custom-engineered vented thermodynamic boxes that allow moisture and steam to escape while trapping convective heat. This prevents the crispy crust from getting soggy on the bike ride to your doorstep.',
    category: 'delivery',
  },
  {
    question: 'Can I order for both Delivery and Store Pickup?',
    answer: 'Yes! Toggle between "Delivery" and "Pickup" anytime at the top of the page or in checkout. Store pickup orders are timed so your food is lifted from the fryer within 3 minutes of your arrival.',
    category: 'ordering',
  },
  {
    question: 'Can I save my custom chicken creation and reorder it?',
    answer: 'Yes! Every creation receives a unique ID (e.g., FFC-CREATE-48291). You can save it to your FFC account, bookmark the generated configuration link, or share it on WhatsApp/Instagram so your friends can order your exact formula.',
    category: 'customizer',
  },
  {
    question: 'What is the 24-hour buttermilk brine method?',
    answer: 'Every cut of 100% antibiotic-free chicken undergoes a 24-hour immersion in sea-salted buttermilk infused with bay leaves, garlic, and cracked peppercorns. This denatures the proteins to guarantee maximum succulence and moisture retention when deep-fried at 175°C.',
    category: 'ingredients',
  },
  {
    question: 'How can I track my live order status?',
    answer: 'Once your order is placed, you are automatically redirected to our real-time interactive tracking page. You can watch the 6 stages in real-time: Order Received -> Kitchen Started -> Frying Oil Phase -> Packing -> Out for Delivery -> Delivered.',
    category: 'delivery',
  },
  {
    question: 'Are there vegetarian options available?',
    answer: 'Yes! We feature the 100% Vegetarian Crispy Paneer Fire Stacker burger, Molten Mozzarella Cheese Bites, and seasoned crinkle cut fries prepared in dedicated vegetarian fryers.',
    category: 'ingredients',
  },
];
