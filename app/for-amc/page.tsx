// app/for-amc/page.tsx
import React from 'react';

const amcServices = [
  {
    id: 1,
    title: 'Stocks',
    description: 'Seamless integration enabling efficient stock investments with minimal hassle.',
  },
  {
    id: 2,
    title: 'Mutual Funds (NFT, FT)',
    description: 'Robust tools to manage your mutual fund investments with real-time updates and efficiency.',
  },
  {
    id: 3,
    title: 'Multi AA',
    description: 'Advanced analytics for comprehensive account aggregation, helping you make data-driven decisions.',
  },
  {
    id: 4,
    title: 'KYC Process',
    description: 'Streamlined KYC processes that expedite onboarding and ensure compliance.',
  },
  {
    id: 5,
    title: 'KYC Verification',
    description: 'Secure and compliant KYC verification specially designed for mutual funds.',
  },
  {
    id: 6,
    title: 'CAMS || CAS',
    description: 'Real-time data on mutual fund portfolio holdings for accurate and timely insights.',
  },
  {
    id: 7,
    title: 'Mutual Funds (NFT, FT)',
    description: 'Efficient processing for mutual fund transactions ensuring quick settlements.',
  },
  {
    id: 8,
    title: 'Mutual Funds (NFT, FT)',
    description: 'Centralized management platform for all your mutual fund data and activities.',
  },
  {
    id: 9,
    title: 'Mutual Funds (NFT, FT)',
    description: 'Robust trading and management tools designed specifically for NSE mutual fund operations.',
  },
  {
    id: 10,
    title: 'Digital Agreement',
    description: 'Secure digital agreements and documentation to streamline legal processes.',
  },
  {
    id: 11,
    title: 'Aadhar eKYC, PAN eKYC',
    description: 'Fast, reliable digital KYC services that simplify verification processes.',
  },
  {
    id: 12,
    title: 'Signzy',
    description: 'Cutting-edge digital verification solutions to modernize your compliance procedures.',
  },
  {
    id: 13,
    title: 'Credit Report Soft Pull',
    description: 'Comprehensive, non-intrusive credit reporting services to gauge customer creditworthiness.',
  },
];

export default function ForAmcPage() {
  return (
    <div className="space-y-16">
      {/* Hero / Intro */}
      <section className="bg-gradient-to-r from-[#FCFFEE] to-[#CAEF7D] py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1B1F13] mb-4">
        Enterprise Solutions for Asset Management Companies
        </h1>
        <p className="text-lg md:text-xl text-[#1B1F13] max-w-3xl mx-auto">
          Empower your organization by leveraging our digital solutions to drive growth, streamline operations, and enhance your brand credibility.
        </p>
      </section>

      {/* Introduction to AMC Solutions */}
      <section className="container mx-auto px-4 py-8">
        <p className="text-lg text-center max-w-3xl mx-auto text-[#1B1F13]">
          Our suite of solutions is designed to address the unique challenges faced by Asset Management Companies.
          From efficient KYC processes to comprehensive data management and cutting-edge digital verification,
          our offerings enable you to deliver enhanced services to your investors.
        </p>
      </section>

      {/* AMC Services Cards */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-[#1B1F13] mb-8">
          Our Solutions for AMCs
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {amcServices.map((service) => (
            <div key={service.id} className="bg-white p-6 rounded-md shadow hover:shadow-2xl transition">
              <h3 className="text-2xl font-semibold text-[#1B1F13] mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Our AMC Solutions */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-[#1B1F13] mb-8">
          Why Choose Our AMC Solutions?
        </h2>
        <div className="space-y-6 max-w-3xl mx-auto text-lg text-[#1B1F13]">
          <p>
            Our solutions are built with precision and industry expertise, ensuring that your processes are streamlined and compliant.
            We focus on providing secure, efficient, and innovative services that allow you to concentrate on your core business.
          </p>
          <p>
            Whether it’s robust data management or seamless digital verification, our tools are designed to enhance operational efficiency,
            reduce turnaround times, and improve the overall customer experience.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-4 py-16 text-center">
        <a
          href="https://wa.me/your-phone-number"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#1B1F13] text-[#FCFFEE] px-8 py-3 rounded-md hover:bg-[#CAEF7D] transition"
        >
          Get in touch
        </a>
      </section>
    </div>
  );
}
