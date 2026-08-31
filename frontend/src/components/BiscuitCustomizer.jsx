import React from 'react';
import MasterCategoryCustomizer, { MasterDetailsModal } from './MasterCategoryCustomizer';

export const BISCUIT_VARIETIES = [
  {
    id: 'bsc-ragi',
    name: 'Ragi Biscuits',
    icon: '🍫',
    category: '🍪 GOURMET BAKERY COLLECTION',
    shortDesc: 'Nutritious finger millet biscuits made with pure jaggery, whole grains, and 100% maida-free ingredients.',
    detailedDesc: 'Crafted with organic finger millet (Ragi), whole wheat flour, and pure cow ghee, sweetened naturally with organic jaggery. Rich in calcium and iron, these tea-time biscuits offer a wholesome crunchy bite.',
    ingredients: 'Organic Ragi (Finger Millet), Whole Wheat Flour, Organic Jaggery, Pure Cow Ghee, Green Cardamom, Milk Powder.',
    allergens: '100% Maida-Free & Eggless. Contains Dairy & Gluten.',
    packSizes: ['Small', 'Medium', 'Large', 'Custom'],
    packagingOptions: ['Regular Box', 'Gift Box', 'Premium Box', 'Custom'],
    ribbonColors: ['Gold', 'Pink', 'Red', 'Blue', 'Custom'],
    customizationOptions: ['Personalized message', 'Gift theme', 'Custom packaging', 'Quantity'],
    storageInstructions: 'Store in an airtight container in a cool, dry place. Best enjoyed fresh within 45 days.',
    desc: 'Nutritious finger millet biscuits made with pure jaggery, whole grains, and 100% maida-free ingredients. Freshly baked for a healthy snack.',
    image: '/ragi_biscuits.jpg'
  },
  {
    id: 'bsc-wheat',
    name: 'Wheat Biscuits',
    icon: '🌾',
    category: '🍪 GOURMET BAKERY COLLECTION',
    shortDesc: 'Stone-ground whole wheat baked fresh with pure cow ghee and raw brown sugar for a rich crunchy bite.',
    detailedDesc: 'Traditional stone-ground whole wheat cookies slow-baked in small batches using pure churned cow ghee and raw unrefined brown sugar. Delivers a heartwarming nutty aroma and delicate crispness.',
    ingredients: 'Stone-ground Whole Wheat Flour, Pure Cow Ghee, Raw Brown Sugar, Milk Powder, Cardamom.',
    allergens: 'Eggless. Contains Gluten & Dairy.',
    packSizes: ['Small', 'Medium', 'Large', 'Custom'],
    packagingOptions: ['Regular Box', 'Gift Box', 'Premium Box', 'Custom'],
    ribbonColors: ['Gold', 'Pink', 'Red', 'Blue', 'Custom'],
    customizationOptions: ['Personalized message', 'Gift theme', 'Custom packaging', 'Quantity'],
    storageInstructions: 'Keep sealed in a cool dry pantry away from moisture.',
    desc: 'Stone-ground whole wheat baked fresh with pure cow ghee and raw brown sugar for a rich crunchy bite.',
    image: '/wheat_biscuits.jpg'
  },
  {
    id: 'bsc-oats',
    name: 'Oats Biscuits',
    icon: '🥣',
    category: '🍪 GOURMET BAKERY COLLECTION',
    shortDesc: 'Rolled oats & raw wildflower honey crunchy tea biscuits rich in dietary fiber and wholesome energy.',
    detailedDesc: 'Healthy rolled oats blended with raw wildflower honey, whole wheat, and golden flaxseeds. Slow-roasted to create a high-fiber, low-calorie gourmet cookie for health-conscious tea lovers.',
    ingredients: 'Rolled Oats, Whole Wheat Flour, Wildflower Honey, Pure Cow Ghee, Flaxseeds, Natural Vanilla.',
    allergens: 'Eggless & High Fiber. Contains Gluten & Dairy.',
    packSizes: ['Small', 'Medium', 'Large', 'Custom'],
    packagingOptions: ['Regular Box', 'Gift Box', 'Premium Box', 'Custom'],
    ribbonColors: ['Gold', 'Pink', 'Red', 'Blue', 'Custom'],
    customizationOptions: ['Personalized message', 'Gift theme', 'Custom packaging', 'Quantity'],
    storageInstructions: 'Store in an airtight jar in a cool, dry place.',
    desc: 'Rolled oats & raw wildflower honey crunchy tea biscuits rich in dietary fiber and wholesome energy.',
    image: '/oats_biscuits.jpg'
  },
  {
    id: 'bsc-millet',
    name: 'Millet Biscuits',
    icon: '🌿',
    category: '🍪 GOURMET BAKERY COLLECTION',
    shortDesc: 'Multi-millet roasted crunch with natural aromatic cardamom, organic jaggery, and zero refined sugar.',
    detailedDesc: 'Power-packed blend of foxtail millet, pearl millet (bajra), and sorghum flour infused with aromatic green cardamom pods and organic brown jaggery. 100% refined sugar-free.',
    ingredients: 'Foxtail Millet, Bajra Millet, Whole Wheat, Organic Jaggery, Cow Ghee, Green Cardamom.',
    allergens: 'Refined Sugar Free & Eggless. Contains Dairy & Gluten.',
    packSizes: ['Small', 'Medium', 'Large', 'Custom'],
    packagingOptions: ['Regular Box', 'Gift Box', 'Premium Box', 'Custom'],
    ribbonColors: ['Gold', 'Pink', 'Red', 'Blue', 'Custom'],
    customizationOptions: ['Personalized message', 'Gift theme', 'Custom packaging', 'Quantity'],
    storageInstructions: 'Keep in a cool dry place in an airtight container.',
    desc: 'Multi-millet roasted crunch with natural aromatic cardamom, organic jaggery, and zero refined sugar.',
    image: '/millet_biscuits.jpg'
  },
  {
    id: 'bsc-butter',
    name: 'Butter Biscuits',
    icon: '🧈',
    category: '🍪 GOURMET BAKERY COLLECTION',
    shortDesc: 'Classic European melt-in-mouth pure butter shortbread cookies with a rich silky vanilla finish.',
    detailedDesc: 'Authentic melt-in-mouth butter cookies prepared with 100% pure unsalted creamery butter and pure vanilla bean extract. Rich, golden, and delicate with a crumbly buttery texture.',
    ingredients: 'Unsalted Pure Butter, Whole Wheat Flour, Fine Sugar, Pure Vanilla Extract.',
    allergens: 'Contains Dairy & Gluten.',
    packSizes: ['Small', 'Medium', 'Large', 'Custom'],
    packagingOptions: ['Regular Box', 'Gift Box', 'Premium Box', 'Custom'],
    ribbonColors: ['Gold', 'Pink', 'Red', 'Blue', 'Custom'],
    customizationOptions: ['Personalized message', 'Gift theme', 'Custom packaging', 'Quantity'],
    storageInstructions: 'Store in a cool place away from sunlight.',
    desc: 'Classic European melt-in-mouth pure butter shortbread cookies with a rich silky vanilla finish.',
    image: '/butter_biscuits.jpg'
  },
  {
    id: 'bsc-almond',
    name: 'Almond Biscuits',
    icon: '🥜',
    category: '🍪 GOURMET BAKERY COLLECTION',
    shortDesc: 'Sliced golden roasted California almonds baked into crisp butter shortbread cookies.',
    detailedDesc: 'Generously loaded with hand-sliced California almonds and aromatic nutmeg, these golden butter biscuits offer an exquisite nut-crusted crunch in every bite.',
    ingredients: 'California Almond Flakes, Pure Ghee, Wheat Flour, Sugar, Nutmeg, Vanilla.',
    allergens: 'Contains Tree Nuts & Dairy.',
    packSizes: ['Small', 'Medium', 'Large', 'Custom'],
    packagingOptions: ['Regular Box', 'Gift Box', 'Premium Box', 'Custom'],
    ribbonColors: ['Gold', 'Pink', 'Red', 'Blue', 'Custom'],
    customizationOptions: ['Personalized message', 'Gift theme', 'Custom packaging', 'Quantity'],
    storageInstructions: 'Store in an airtight container to preserve nut crispness.',
    desc: 'Sliced golden roasted California almonds baked into crisp butter shortbread cookies.',
    image: '/almond_biscuits.jpg'
  }
];

export const BiscuitDetailsModal = MasterDetailsModal;

const BiscuitCustomizer = ({ onSelectProduct }) => {
  return (
    <MasterCategoryCustomizer
      subtitle="🍪 GOURMET BAKERY STUDIO"
      title="Customize Your Homemade Biscuits"
      description="Build your bespoke box of fresh, eggless, 100% maida-free cookies baked with pure cow ghee, whole grains, and natural sweeteners. Select your favorite variety and personalized gift box."
      products={BISCUIT_VARIETIES}
      onSelectProduct={onSelectProduct}
    />
  );
};

export default BiscuitCustomizer;
