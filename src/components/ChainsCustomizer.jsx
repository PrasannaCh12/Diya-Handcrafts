import React from 'react';
import MasterCategoryCustomizer, { MasterDetailsModal } from './MasterCategoryCustomizer';

export const CHAIN_PRODUCTS = [
  {
    id: 'chain-04',
    name: 'Customized Name Chain - Gold Finish',
    icon: '📿',
    category: '📿 CUSTOMIZED CHAINS COLLECTION',
    shortDesc: 'Artisanal customized chain with personalized name pendant in rich gold finish.',
    description: 'Artisanal customized chain crafted with high-precision laser engraving and anti-tarnish materials.',
    image: '/custom_chain_01.jpg'
  },
  {
    id: 'chain-05',
    name: 'Initial Heart Pendant Chain - Rose Gold',
    icon: '📿',
    category: '📿 CUSTOMIZED CHAINS COLLECTION',
    shortDesc: 'Delicate heart pendant chain personalized with custom initial engraving.',
    description: 'Artisanal customized chain crafted with high-precision laser engraving and anti-tarnish materials.',
    image: '/custom_chain_02.jpg'
  },
  {
    id: 'chain-06',
    name: 'Custom Date & Coordinate Locket Chain',
    icon: '📿',
    category: '📿 CUSTOMIZED CHAINS COLLECTION',
    shortDesc: 'Elegant bar locket chain customized with special date and coordinates.',
    description: 'Artisanal customized chain crafted with high-precision laser engraving and anti-tarnish materials.',
    image: '/custom_chain_03.jpg'
  },
  {
    id: 'chain-07',
    name: 'Double Layered Pearl Name Necklace',
    icon: '📿',
    category: '📿 CUSTOMIZED CHAINS COLLECTION',
    shortDesc: 'Sophisticated double-layer chain with freshwater pearl accents and custom lettering.',
    description: 'Artisanal customized chain crafted with high-precision laser engraving and anti-tarnish materials.',
    image: '/custom_chain_04.jpg'
  },
  {
    id: 'chain-08',
    name: 'Lakshmi Coin Traditional Temple Chain',
    icon: '📿',
    category: '📿 CUSTOMIZED CHAINS COLLECTION',
    shortDesc: 'Handcrafted traditional temple chain with intricate Lakshmi coin motif.',
    description: 'Artisanal customized chain crafted with high-precision laser engraving and anti-tarnish materials.',
    image: '/custom_chain_05.jpg'
  }
];

export const ChainsDetailsModal = (props) => (
  <MasterDetailsModal
    {...props}
    hidePrices={true}
    hideWhatsApp={true}
    hideExtraOptions={true}
  />
);

const ChainsCustomizer = ({ onSelectProduct }) => {
  return (
    <MasterCategoryCustomizer
      subtitle="📿 PERSONALIZED JEWELRY STUDIO"
      title="Customized Chains & Pendants"
      description="Explore our handcrafted red coral temple chains, black crystal bead neckpieces, ruby & emerald Kundan chokers, double-layer pearl drops, and gold Lakshmi coin chains."
      products={CHAIN_PRODUCTS}
      hidePrices={true}
      hideWhatsAppInModal={true}
      hideOptionsInModal={true}
      onSelectProduct={onSelectProduct}
    />
  );
};

export default ChainsCustomizer;
