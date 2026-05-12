import { Handshake, Users, Scale, TrendingUp, Coins, Wheat, Truck, Globe, BookOpen } from 'lucide-react';
import React from 'react';

export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  iconName: string;
  benefits: string[];
  process: { step: string; desc: string }[];
}

export const services: Service[] = [
  {
    id: '1',
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
    id: '2',
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
    id: '3',
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
    id: '4',
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
    id: '5',
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
    id: '6',
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
