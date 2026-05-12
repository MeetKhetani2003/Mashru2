export interface Product {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  image: string;
  features: string[];
  specifications: { label: string; value: string }[];
  varieties: string[];
}

export const products: Product[] = [
  {
    id: '1',
    slug: 'groundnuts-peanuts',
    title: "Groundnuts (Peanuts)",
    category: "Oilseeds",
    description: "Our premier specialty. Sourcing the finest bold and java varieties for national industrial demand.",
    longDescription: "Groundnuts are the cornerstone of J J & Co.'s heritage. We specialize in procurement and grading of premium varieties, ensuring high oil content and strict moisture control. Our expertise in the groundnut market allows us to provide industrial buyers with consistent quality throughout the harvest season.",
    image: "/images/products-bg.jpg",
    features: ["Bold & Java varieties", "Strict moisture control", "High oil content assurance", "Aflatoxin-aware sourcing"],
    specifications: [
      { label: "Moisture", value: "8% - 10% Max" },
      { label: "Oil Content", value: "48% - 50%" },
      { label: "Admixture", value: "1% Max" },
      { label: "Damaged/Split", value: "2% Max" }
    ],
    varieties: ["Bold", "Java", "G20", "TLG"]
  },
  {
    id: '2',
    slug: 'premium-wheat',
    title: "Premium Wheat",
    category: "Grains",
    description: "High-grade Lokwan and Tukdi varieties essential for the flour milling and food industries.",
    longDescription: "We trade in the highest quality wheat varieties sourced from the fertile regions of Gujarat. Our focus is on protein content and cleanliness, providing a reliable supply chain for flour mills, biscuit manufacturers, and bulk food processors.",
    image: "/images/pulses-bg.jpg",
    features: ["Machine cleaned lots", "High protein content", "Consistent grain size", "Milling quality focus"],
    specifications: [
      { label: "Variety", value: "Lokwan / Tukdi" },
      { label: "Moisture", value: "12% Max" },
      { label: "Foreign Matter", value: "0.5% Max" },
      { label: "Gluten Content", value: "9% - 11%" }
    ],
    varieties: ["Lokwan", "Tukdi", "Sharbati"]
  },
  {
    id: '3',
    slug: 'chickpeas-chana',
    title: "Chickpeas (Chana)",
    category: "Pulses",
    description: "Superior quality pulses rigorously checked for size, color, and polish for wholesale markets.",
    longDescription: "Our chickpeas are selected for their uniform size and excellent cooking qualities. We serve the national pulses market, ensuring that our procurement processes maintain the nutritional value and appearance of the produce from farm to warehouse.",
    image: "/images/hero-bg.jpg",
    features: ["Uniform grain size", "Minimal breakage", "Rich natural color", "Polished varieties"],
    specifications: [
      { label: "Moisture", value: "10% Max" },
      { label: "Admixture", value: "1% Max" },
      { label: "Damaged Kernels", value: "2% Max" },
      { label: "Purity", value: "99% Min" }
    ],
    varieties: ["Desi Chana", "Kabuli Chana"]
  },
  {
    id: '4',
    slug: 'castor-seeds',
    title: "Castor Seeds",
    category: "Oilseeds",
    description: "Industrial-grade castor seeds with high yield potential for oil extraction units.",
    longDescription: "Gujarat is a global hub for castor production. We facilitate the procurement of industrial-grade castor seeds, matching the high-volume needs of oil extraction units with consistent quality and reliable delivery timelines.",
    image: "/images/trust-bg.jpg",
    features: ["High oil yield", "Cleaned seed lots", "Bulk volume support", "Industrial grade focus"],
    specifications: [
      { label: "Oil Content", value: "47% Min" },
      { label: "Moisture", value: "7% Max" },
      { label: "Foreign Matter", value: "2% Max" },
      { label: "F.F.A.", value: "2% Max" }
    ],
    varieties: ["Standard Industrial"]
  }
];
