// app/for-ria/page.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface InfoCardProps {
  imageSrc?: string;
  alt?: string;
  title: string;
  description: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ imageSrc, alt, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">
      {imageSrc && (
        <div className="mb-4">
          <Image 
            src={imageSrc} 
            alt={alt || title} 
            width={400} 
            height={250} 
            className="rounded-md object-cover w-full h-40" 
          />
        </div>
      )}
      <h3 className="text-2xl font-semibold mb-2 text-[#272B2A]">{title}</h3>
      <p className="text-[#272B2A]">{description}</p>
    </div>
  );
};

export default function ForRiaPage() {
  return (
    <div className="space-y-16" style={{ backgroundColor: "#fcfffe", color: "#272B2A" }}>
      
      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-[#108e66]">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          The Digital Office for Financial Advisors
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto text-white">
          A Comprehensive Operating System for Financial Planning &amp; Advisory Services.
        </p>
        <div className="mt-8">
          <Link 
            href="/get-started" 
            className="inline-block bg-white text-[#108e66] px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition"
          >
            Get Started Now
          </Link>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">
          Challenges Faced by Financial Advisors
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <InfoCard 
            imageSrc="/images/challenge1.jpg"
            title="Fragmented Systems"
            description="Disjointed tools and systems create operational inefficiencies and drive up costs."
          />
          <InfoCard 
            imageSrc="/images/challenge2.jpg"
            title="Manual Processes"
            description="Time-consuming, error-prone tasks that drain valuable resources."
          />
          <InfoCard 
            imageSrc="/images/challenge3.jpg"
            title="Lack of Integration"
            description="Siloed systems hinder unified decision-making and effective client service."
          />
          <InfoCard 
            imageSrc="/images/challenge4.jpg"
            title="Compliance Burdens"
            description="Increasing regulatory demands add complexity and risk to daily operations."
          />
        </div>
      </section>

      {/* Solution Section */}
      <section className="bg-[#fcfffe] py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Introducing Our Digital Office for Financial Advisors
          </h2>
          <p className="text-lg text-center max-w-4xl mx-auto mb-12">
            Our solution centralizes every process a Financial Advisor requires into one platform. From client onboarding to portfolio analytics, task automation, and compliance tracking—experience streamlined workflows and superior client outcomes.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <InfoCard 
              imageSrc="/images/solution1.jpg"
              title="End-to-End Coverage"
              description="Manage all advisory functions from a single, unified platform."
            />
            <InfoCard 
              imageSrc="/images/solution2.jpg"
              title="Modular &amp; Scalable"
              description="A flexible solution that grows with your business needs."
            />
            <InfoCard 
              imageSrc="/images/solution3.jpg"
              title="Security &amp; Compliance"
              description="Robust encryption and compliance tracking for trusted operations."
            />
            <InfoCard 
              imageSrc="/images/solution4.jpg"
              title="Integrated Intelligence"
              description="Leverage real-time insights and automation for smarter decision-making."
            />
          </div>
        </div>
      </section>

      {/* ROI Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">
          Transforming Businesses &amp; Driving ROI
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <InfoCard 
            imageSrc="/images/roi1.jpg"
            title="40% Time Savings"
            description="Reduce administrative hours, letting you focus on strategy."
          />
          <InfoCard 
            imageSrc="/images/roi2.jpg"
            title="30% Cost Efficiency"
            description="Lower operational expenses through streamlined, automated processes."
          />
          <InfoCard 
            imageSrc="/images/roi3.jpg"
            title="50% Enhanced Trust"
            description="Improve client retention with secure, real-time insights and transparency."
          />
          <InfoCard 
            imageSrc="/images/roi4.jpg"
            title="Scalable Growth"
            description="A flexible platform designed to adapt to your evolving business needs."
          />
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-[#108e66] py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-4 text-white">
          Ready to Transform Your Advisory Business?
        </h2>
        <p className="text-lg max-w-3xl mx-auto mb-8 text-white">
          Experience the power of an integrated digital office designed exclusively for financial advisors.
        </p>
        <Link 
          href="https://wa.me/your-phone-number"
          className="inline-block bg-white text-[#108e66] px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition"
        >
          Get in Touch
        </Link>
      </section>
      
    </div>
  );
}
