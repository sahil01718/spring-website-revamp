// app/services/page.tsx
import React from 'react';
import Link from 'next/link';

// Data for core financial services (simplified and refined)
const financialServices = [
  {
    id: 1,
    title: 'Personalized Wealth Planning',
    description:
      'Customized plans that align with your income and lifestyle for long-term financial success.',
  },
  {
    id: 2,
    title: 'Tax Optimization & Salary Structuring',
    description:
      'Smart strategies to minimize your tax burden while optimizing your salary components.',
  },
  {
    id: 3,
    title: 'Investment & Portfolio Diversification',
    description:
      'Maximize returns through diversified investments across various asset classes.',
  },
];

// Data for professional solutions (customer profiles)
// Ensure that you have at least 15 items here.
const professionalSolutions = [
  {
    id: 1,
    title: 'Young Professionals',
    tagline: 'Start Strong, Stay Ahead!',
    description:
      'Tailored financial strategies for early career growth and smart investments.',
  },
  {
    id: 2,
    title: 'MBA Graduates',
    tagline: 'Smart Money Moves for Smart MBAs!',
    description:
      'Optimize your high-income potential with strategic planning and tax-efficient investments.',
  },
  {
    id: 3,
    title: 'IT Professionals',
    tagline: 'Maximize Earnings, Build Wealth Like a Pro!',
    description:
      'Diversified investment strategies and ESOP planning to secure financial independence.',
  },
  {
    id: 4,
    title: 'Doctors & Medical Professionals',
    tagline: 'You Care for Patients, We Care for Your Wealth!',
    description:
      'Structured roadmaps for managing student loans, optimizing taxes, and planning retirement.',
  },
  {
    id: 5,
    title: 'Lawyers & Legal Professionals',
    tagline: 'Win in Court, Win with Your Money!',
    description:
      'Manage irregular income and tax liabilities with strategic investment plans.',
  },
  {
    id: 6,
    title: 'Armed Forces & Government Officials',
    tagline: 'Secure Your Future While Serving the Nation!',
    description:
      'Focused on pension maximization, tax-efficient investments, and real estate advisory.',
  },
  {
    id: 7,
    title: 'Professional Athletes',
    tagline: 'Short Careers, Lifelong Wealth!',
    description:
      'Wealth preservation, passive income, and tax-efficient plans to secure your future beyond your career.',
  },
  {
    id: 8,
    title: 'Chartered Accountants & Finance Professionals',
    tagline: 'Optimize Your Finances, Just as You Do for Others!',
    description:
      'Balancing earnings with tax optimization and diversified investment strategies for finance experts.',
  },
  {
    id: 9,
    title: 'Startup Founders & Entrepreneurs',
    tagline: 'Scale Your Startup, Scale Your Wealth!',
    description:
      'Structured wealth-building plans that balance reinvestment with long-term financial planning.',
  },
  {
    id: 10,
    title: 'Engineers & Architects',
    tagline: 'Design the Future, Build Your Wealth!',
    description:
      'Optimizing tax strategies and planning for early retirement with tailored investment structures.',
  },
  {
    id: 11,
    title: 'Teachers & Professors',
    tagline: 'Shape Minds, Secure Your Future!',
    description:
      'Structured savings, side-income strategies, and pension planning for educators.',
  },
  {
    id: 12,
    title: 'Media & Creative Professionals',
    tagline: 'Transform Creativity into Wealth!',
    description:
      'Managing irregular income with smart tax planning and secure long-term financial strategies.',
  },
  {
    id: 13,
    title: 'Freelancers & Consultants',
    tagline: 'From Irregular Income to Consistent Wealth!',
    description:
      'Income stabilization, tax-efficient savings, and comprehensive financial roadmaps for independent professionals.',
  },
  {
    id: 14,
    title: 'Real Estate Agents & Investors',
    tagline: 'Build Properties, Build Your Empire!',
    description:
      'Optimize commissions, create diversified portfolios, and manage taxation smartly for sustained wealth creation.',
  },
  {
    id: 15,
    title: 'Business Owners & SME Operators',
    tagline: 'Run Your Business, Let Us Manage Your Wealth!',
    description:
      'Cash flow optimization, tax-saving strategies, and long-term investment plans for entrepreneurs.',
  },
];

/*
  Carousel Component:
  A simple horizontal scrolling container.
  The "animate-autoScroll" class is expected to be defined in globals.css:
  
  @keyframes autoScroll {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
  
  .animate-autoScroll {
    animation: autoScroll 30s linear infinite;
  }
*/
const Carousel = ({ children }: { children: React.ReactNode }) => (
  <div className="relative overflow-hidden">
    <div className="flex space-x-4 animate-autoScroll">
      {children}
    </div>
  </div>
);

export default function ServicesPage() {
  return (
    <div className="space-y-16">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-[#FCFFEE] to-[#CAEF7D] py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1B1F13] mb-4">
          Tailored Financial Solutions
        </h1>
        <p className="text-lg md:text-xl text-[#1B1F13] max-w-3xl mx-auto">
          Our SEBI-registered advisors craft personalized plans designed to address your unique financial challenges.
        </p>
      </section>

      {/* CORE FINANCIAL SERVICES SECTION */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-[#1B1F13] mb-8">
          Our Core Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {financialServices.map((service) => (
            <div
              key={service.id}
              className="bg-white p-6 rounded-md shadow hover:shadow-xl transition transform hover:scale-105"
            >
              <h3 className="text-2xl font-semibold text-[#1B1F13] mb-2">
                {service.title}
              </h3>
              <p className="text-gray-700">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROFESSIONAL SOLUTIONS CAROUSEL */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-[#1B1F13] mb-8">
          Our Solutions by Profession
        </h2>
        {/* Duplicate the array to achieve infinite scrolling */}
        <div className="relative overflow-hidden">
          <div className="flex space-x-4 animate-autoScroll">
            {professionalSolutions.concat(professionalSolutions).map((profile, index) => (
              <div
                key={index}
                className="flex-shrink-0 bg-white p-6 rounded-md shadow mx-2 w-64"
              >
                <h3 className="text-xl font-semibold text-[#1B1F13]">{profile.title}</h3>
                <p className="text-sm text-[#1B1F13] font-medium mt-1">{profile.tagline}</p>
                <p className="text-gray-700 mt-2 break-words">{profile.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO DO WE HELP SECTION */}
      <section className="bg-white py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#1B1F13] mb-8">
            Who Do We Help?
          </h2>
          <div className="space-y-4 max-w-3xl mx-auto text-lg text-[#1B1F13]">
            <p>
              We serve a diverse range of professionals—from young earners and IT experts to medical professionals, legal advisors, government officials, athletes, entrepreneurs, educators, creatives, and more.
              Our tailored solutions ensure that every financial plan is as unique as your career.
            </p>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE SPRING MONEY SECTION */}
      <section className="bg-gradient-to-r from-[#FCFFEE] to-[#CAEF7D] py-16 px-4 text-center">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-[#1B1F13] mb-8">Why Choose Spring Money?</h2>
          <p className="text-lg text-[#1B1F13] max-w-3xl mx-auto mb-8">
            Experience expert, tax-efficient financial planning tailored for you.
            We simplify complex financial decisions with clear, personalized strategies designed to build long-term wealth.
          </p>
          <a
            href="https://wa.me/your-phone-number" // Replace with your actual WhatsApp link
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#1B1F13] text-[#FCFFEE] px-8 py-3 rounded-md hover:bg-[#CAEF7D] transition"
          >
            Get in touch
          </a>
        </div>
      </section>
    </div>
  );
}
