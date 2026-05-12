import mongoose from 'mongoose';
import connectDB from '../lib/db';
import Service from '../models/Service';
import Product from '../models/Product';
import Testimonial from '../models/Testimonial';

const services = [
  {
    slug: 'commission-agency',
    title: "Commission Agency",
    description: "Our core service. Actively facilitating transparent trades between farmers and industrial buyers.",
    longDescription: "As licensed agricultural commission agents at the Junagadh Mandi, we provide a regulated and secure platform for agricultural trade. We specialize in bringing the highest quality farm produce directly to bulk industrial buyers, ensuring that every transaction is rooted in transparency, accurate weighing, and guaranteed payment security.",
    iconName: "Handshake",
    benefits: [
      "Transparent auction-based selling",
      "Guaranteed payment security for farmers",
      "Accurate, certified weighing processes",
      "Full compliance with APMC regulations"
    ],
    process: [
      { step: "Lot Arrival", desc: "Farm produce arrives at our dedicated mandi platform." },
      { step: "Official Grading", desc: "Unbiased assessment of moisture and quality parameters." },
      { step: "Competitive Bidding", desc: "Auctioning the lot to secure the top market rate." },
      { step: "Secure Settlement", desc: "Same-day documentation and payment processing." }
    ]
  },
  {
    slug: 'quality-assessment',
    title: "Quality Assessment",
    description: "Expert evaluation of groundnuts, grains, and pulses using decades of market wisdom.",
    longDescription: "Value in agriculture is determined by quality. We provide professional grading services that go beyond visual inspection. Our team utilizes moisture meters and physical grading protocols to provide an accurate 'grade' for every lot, ensuring buyers get exactly what they pay for and sellers get the true value of their harvest.",
    iconName: "Scale",
    benefits: [
      "Scientific moisture level testing",
      "Accurate size-grading for groundnuts",
      "Purity and admixture checks for grains",
      "Official grading certificates for buyers"
    ],
    process: [
      { step: "Representative Sampling", desc: "Drawing samples from across the entire lot." },
      { step: "Lab Analysis", desc: "Testing for moisture, damage, and foreign matter." },
      { step: "Certification", desc: "Issuing a grade report that determines trade value." }
    ]
  },
  {
    slug: 'market-guidance',
    title: "Market Guidance",
    description: "Actionable intelligence on price trends and the best strategic timing for your trades.",
    longDescription: "The agricultural market never sleeps. We provide our partners with a strategic edge by offering real-time Mandi updates and deep price-trend analysis. Our guidance helps farmers decide when to sell and enables industrial buyers to time their procurement for maximum efficiency and cost-effectiveness.",
    iconName: "TrendingUp",
    benefits: [
      "Daily Mandi price updates via direct alerts",
      "Harvest-season supply and demand forecasting",
      "Regional and national market trend analysis",
      "Expert advice on long-term storage vs. immediate sale"
    ],
    process: [
      { step: "Trend Monitoring", desc: "Tracking regional and national trading patterns." },
      { step: "Expert Synthesis", desc: "Applying 45+ years of experience to current data." },
      { step: "Direct Advisory", desc: "Personalized updates for our network of partners." }
    ]
  },
  {
    slug: 'market-network',
    title: "Market Network",
    description: "Connecting local produce to national industrial demand through our elite trade circles.",
    longDescription: "J J & Co. acts as a bridge between the fertile fields of Saurashtra and the massive industrial demand of national markets. Our extensive network of over 400 clients includes major oil mills, exporters, and food processing units, ensuring your produce has the widest possible reach and the highest potential value.",
    iconName: "Globe",
    benefits: [
      "Access to national industrial buyers",
      "Direct links to major exporters and processors",
      "Multi-regional trade opportunities",
      "High-volume procurement capabilities"
    ],
    process: [
      { step: "Network Matching", desc: "Identifying the right buyer for specific produce types." },
      { step: "Strategic Linkage", desc: "Facilitating the connection between parties." },
      { step: "Execution", desc: "Finalizing trades within our trusted network." }
    ]
  },
  {
    slug: 'bulk-procurement',
    title: "Bulk Procurement",
    description: "Specialized sourcing solutions for industrial units, oil mills, and exporters.",
    longDescription: "For our industrial partners, we handle the heavy lifting of procurement. Whether you need 100 tons of high-oil content groundnuts or massive quantities of premium wheat, we manage the sourcing, grading, and accumulation from multiple sellers to meet your specific quality and volume requirements.",
    iconName: "Wheat",
    benefits: [
      "Large-scale volume accumulation",
      "Specific quality parameter matching",
      "Cost-efficient bulk negotiation",
      "Single-point procurement management"
    ],
    process: [
      { step: "Requirement Analysis", desc: "Defining volume and quality specifications." },
      { step: "Active Sourcing", desc: "Procuring directly from the mandi floor." },
      { step: "Consolidation", desc: "Managing multiple lots into a single bulk order." }
    ]
  },
  {
    slug: 'logistics-coordination',
    title: "Logistics Coordination",
    description: "Streamlined weighing, packaging, and transport from the mandi to your destination.",
    longDescription: "Trade doesn't end at the auction. We provide comprehensive logistics support to ensure that your commodities are handled with care from the moment they are sold. We coordinate accurate weighing, professional labor for bagging and loading, and reliable transport partners to move goods to your warehouse or factory.",
    iconName: "Truck",
    benefits: [
      "Certified and accurate weighing labor",
      "High-quality packaging and bagging services",
      "Coordination with reliable transport networks",
      "Timely dispatch and movement tracking"
    ],
    process: [
      { step: "Loading Prep", desc: "Organizing labor and packaging materials." },
      { step: "Weight Verification", desc: "Final weighing in the presence of parties." },
      { step: "Dispatch", desc: "Loading and coordinating with transport vehicles." }
    ]
  }
];

const products = [
  {
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

const testimonials = [
  {
    quote: "Finding a commission agent who understands the critical balance of oil-content and moisture in groundnuts is rare. J J & Co. has been our backbone for sourcing for over two decades.",
    author: "Dharmesh Savaliya",
    company: "Savaliya Oil Industries",
    initial: "D",
    rating: 5,
    date: "1 month ago",
    partnerSince: "2002",
    volume: "3,500 MT/Year",
    location: "Gondal, Gujarat"
  },
  {
    quote: "For international shipments, quality consistency is non-negotiable. Their HPS (Hand Picked Selected) grading process is the best in the Saurashtra region. Extremely reliable.",
    author: "Hardik Vora",
    company: "Vora Global Exports",
    initial: "H",
    rating: 5,
    date: "2 months ago",
    partnerSince: "2010",
    volume: "8,000 MT/Year",
    location: "Mudra Port, GJ"
  },
  {
    quote: "As a national trader, I need an agent who can handle massive volumes without compromising on the mandi transparency. J J & Co. delivers excellence in every auction.",
    author: "S. K. Verma",
    company: "Verma Agri Logistics",
    initial: "S",
    rating: 5,
    date: "3 weeks ago",
    partnerSince: "2014",
    volume: "12,000 MT/Year",
    location: "Indore, MP"
  },
  {
    quote: "Many agents only look at their commission, but Ramnikbhai and his team treat farmers like family. They always ensure we get the best market price for our hard-earned harvest.",
    author: "Bhikhubhai Ramjibhai",
    company: "Progressive Farmer Union",
    initial: "B",
    rating: 5,
    date: "4 months ago",
    partnerSince: "1988",
    volume: "Farmer Network",
    location: "Junagadh, Gujarat"
  }
];

async function seed() {
  await connectDB();
  
  console.log('Clearing existing data...');
  await Service.deleteMany({});
  await Product.deleteMany({});
  await Testimonial.deleteMany({});
  
  console.log('Seeding services...');
  await Service.insertMany(services);
  
  console.log('Seeding products...');
  await Product.insertMany(products);
  
  console.log('Seeding testimonials...');
  await Testimonial.insertMany(testimonials);
  
  console.log('Seeding complete!');
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
