// app/for-amc/page.tsx
import React from "react";
import Link from "next/link";

interface Service {
  id: number;
  title: string;
  description: string;
}

const investmentSolutions: Service[] = [
  {
    id: 1,
    title: "Stocks",
    description:
      "Seamless integration for efficient stock investments with minimal hassle.",
  },
  {
    id: 2,
    title: "Mutual Funds",
    description:
      "Robust tools to manage mutual fund investments with real-time updates and precision.",
  },
  {
    id: 3,
    title: "Multi AA",
    description:
      "Advanced analytics for comprehensive account aggregation and informed decision-making.",
  },
  {
    id: 4,
    title: "Mutual Funds Trading",
    description:
      "Efficient processing and trading tools designed specifically for NSE mutual fund operations.",
  },
];

const complianceSolutions: Service[] = [
  {
    id: 5,
    title: "KYC Process",
    description:
      "Streamlined KYC processes that expedite onboarding and ensure full regulatory compliance.",
  },
  {
    id: 6,
    title: "KYC Verification",
    description:
      "Secure and compliant digital KYC verification tailored for asset management.",
  },
  {
    id: 7,
    title: "Aadhar & PAN eKYC",
    description:
      "Fast and reliable digital KYC services that simplify customer verification.",
  },
  {
    id: 8,
    title: "Signzy Solutions",
    description:
      "Cutting-edge digital verification tools to modernize your compliance procedures.",
  },
];

const digitalServices: Service[] = [
  {
    id: 9,
    title: "CAMS || CAS",
    description:
      "Real-time insights on portfolio holdings to ensure accurate and timely reporting.",
  },
  {
    id: 10,
    title: "Digital Agreements",
    description:
      "Secure electronic agreements and documentation for streamlined legal processes.",
  },
  {
    id: 11,
    title: "Credit Report Soft Pull",
    description:
      "Comprehensive, non-intrusive credit reporting services to gauge client creditworthiness.",
  },
];

const ServiceCard: React.FC<Service> = ({ title, description }) => {
  return (
    <div className="bg-white p-6 rounded-md shadow hover:shadow-2xl transition transform hover:-translate-y-1">
      <h3 className="text-2xl font-semibold mb-2" style={{ color: "#1B1F13" }}>
        {title}
      </h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

export default function ForAmcPage() {
  return (
    <div className="space-y-16" style={{ backgroundColor: "#fcfffe", color: "#1B1F13" }}>
      
      {/* Hero / Intro Section */}
      <section className="py-20 px-4 text-center" style={{ backgroundColor: "#525ECC" }}>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          Enterprise Solutions for Asset Management Companies
        </h1>
        <p className="text-lg md:text-xl text-white max-w-3xl mx-auto">
          Empower your organization by leveraging our cutting-edge digital solutions to drive growth, streamline operations, and enhance brand credibility.
        </p>
      </section>

      {/* Introduction Section */}
      <section className="container mx-auto px-4 py-8" style={{ backgroundColor: "#f2f3fc" }}>
        <p className="text-lg text-center max-w-3xl mx-auto">
          Our suite of enterprise solutions is designed specifically for Asset Management Companies.
          Whether it’s efficient KYC processes, robust data management, or secure digital verification,
          we enable you to deliver superior services and maintain a competitive edge in a rapidly evolving market.
        </p>
      </section>

      {/* AMC Services – Grouped by Category */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Our AMC Solutions
        </h2>

        {/* Investment Solutions */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-6">
            Investment Solutions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {investmentSolutions.map((service) => (
              <ServiceCard key={service.id} {...service} />
            ))}
          </div>
        </div>

        {/* Compliance & Onboarding */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-6">
            Compliance &amp; Onboarding
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {complianceSolutions.map((service) => (
              <ServiceCard key={service.id} {...service} />
            ))}
          </div>
        </div>

        {/* Digital & Data Services */}
        <div>
          <h3 className="text-2xl font-bold mb-6">
            Digital &amp; Data Services
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {digitalServices.map((service) => (
              <ServiceCard key={service.id} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our AMC Solutions */}
      <section className="container mx-auto px-4 py-16" style={{ backgroundColor: "#f2f3fc" }}>
        <h2 className="text-3xl font-bold text-center mb-8">
          Why Choose Our AMC Solutions?
        </h2>
        <div className="space-y-6 max-w-3xl mx-auto text-lg">
          <p>
            Built with precision and deep industry expertise, our solutions are engineered to streamline your operations and ensure full compliance.
            With secure digital verification, real-time data insights, and efficient KYC processes, we empower you to focus on core business growth.
          </p>
          <p>
            Experience enhanced operational efficiency, reduced turnaround times, and a superior customer experience, all while maintaining strict regulatory standards.
          </p>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center" style={{ backgroundColor: "#525ECC" }}>
        <Link 
          href="https://wa.me/your-phone-number"
          className="inline-block text-white px-8 py-3 rounded-md font-semibold transition"
          style={{ backgroundColor: "#272B2A" }}
        >
          Get in touch
        </Link>
      </section>
    </div>
  );
}
