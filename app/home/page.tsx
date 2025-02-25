// app/home/page.tsx
import React from 'react';

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero Section – Two-Column Layout with Gradient Overlay */}
      <section className="min-h-screen flex flex-col-reverse md:flex-row items-center bg-gradient-to-r from-[#FCFFEE] to-[#CAEF7D]">
        <div className="md:w-1/2 px-6 text-center md:text-left">
          <h1 className="text-5xl font-bold mb-4">
            Simple, Smart & Comprehensive Financial Planning for You!
          </h1>
          <p className="text-xl mb-6">
            At Spring Money, we simplify your financial journey with expert advice and personalized plans.
          </p>
          <div className="space-x-4">
            <a
              href="https://wa.me/your-phone-number"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1B1F13] text-[#FCFFEE] px-6 py-2 rounded-md hover:bg-[#CAEF7D] transition"
            >
              Get in touch
            </a>
            <a
              href="#learn-more"
              className="border border-[#1B1F13] text-[#1B1F13] px-6 py-2 rounded-md hover:bg-[#1B1F13] hover:text-[#FCFFEE] transition"
            >
              Learn More
            </a>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img src="/images/hero-illustration.png" alt="Family Illustration" className="w-3/4 md:w-full h-auto" />
        </div>
      </section>

      {/* Who We Serve */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Who We Serve</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center p-6 hover:shadow-lg transition">
            <img src="/icons/individuals.svg" alt="Individuals" className="w-16 h-16 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Individuals</h3>
            <p className="text-center text-gray-600">
              Personalized plans to help you achieve your financial dreams.
            </p>
          </div>
          <div className="flex flex-col items-center p-6 hover:shadow-lg transition">
            <img src="/icons/nris.svg" alt="NRIs" className="w-16 h-16 mb-4" />
            <h3 className="text-xl font-semibold mb-2">NRIs</h3>
            <p className="text-center text-gray-600">
              Seamless solutions for managing cross-border finances.
            </p>
          </div>
          <div className="flex flex-col items-center p-6 hover:shadow-lg transition">
            <img src="/icons/corporates.svg" alt="Corporates" className="w-16 h-16 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Corporates</h3>
            <p className="text-center text-gray-600">
              Financial wellness programs to boost employee productivity.
            </p>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">What We Do</h2>
        <p className="text-lg text-center max-w-2xl mx-auto">
          We connect you with SEBI-registered experts and craft personalized financial plans so you can make confident decisions for your future.
        </p>
      </section>

      {/* Our Plans */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Our Plans</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          <div className="flex flex-col items-center p-6 bg-white rounded-md shadow hover:shadow-xl transition">
            <span className="text-4xl">📌</span>
            <h3 className="text-2xl font-semibold mt-2">One-Time Plan</h3>
            <p className="mt-2 text-center text-gray-600">
              Ideal for immediate financial solutions.
            </p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white rounded-md shadow hover:shadow-xl transition">
            <span className="text-4xl">📌</span>
            <h3 className="text-2xl font-semibold mt-2">Comprehensive Plan</h3>
            <p className="mt-2 text-center text-gray-600">
              A complete roadmap for your long-term financial success.
            </p>
          </div>
        </div>
        <div className="text-center mt-8">
          <a
            href="https://wa.me/your-phone-number"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#1B1F13] text-[#FCFFEE] px-8 py-3 rounded-md hover:bg-[#CAEF7D] transition"
          >
            Get in touch
          </a>
        </div>
      </section>

      {/* Why Choose Spring Money */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Why Choose Spring Money?</h2>
        <div className="space-y-6 max-w-3xl mx-auto">
          <p className="text-lg"><strong>Trusted Experts, Certified by SEBI:</strong> Our professionals are rigorously selected to ensure you receive unbiased, expert advice.</p>
          <p className="text-lg"><strong>Personalized Financial Plans:</strong> We tailor our strategies to fit your unique goals and lifestyle.</p>
          <p className="text-lg"><strong>Simplicity & Clarity:</strong> Our approach breaks down complex financial concepts into actionable steps.</p>
          <p className="text-lg"><strong>Accessible for Everyone:</strong> Whether you’re new to investing or an experienced planner, our platform is built for you.</p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="p-6 bg-white rounded-md shadow">
            <div className="flex items-center mb-4">
              <img src="/images/user-1.jpg" alt="Amit R." className="w-12 h-12 rounded-full mr-4" />
              <div>
                <h3 className="text-lg font-semibold">Amit R.</h3>
                <p className="text-sm text-gray-500">IT Professional</p>
              </div>
            </div>
            <p className="text-gray-700">“Spring Money simplified my financial planning and gave me the confidence to secure my future.”</p>
          </div>
          <div className="p-6 bg-white rounded-md shadow">
            <div className="flex items-center mb-4">
              <img src="/images/user-2.jpg" alt="Priya S." className="w-12 h-12 rounded-full mr-4" />
              <div>
                <h3 className="text-lg font-semibold">Priya S.</h3>
                <p className="text-sm text-gray-500">Marketing Executive</p>
              </div>
            </div>
            <p className="text-gray-700">“Their clear, jargon-free advice transformed my approach to money management.”</p>
          </div>
        </div>
      </section>

      {/* Free Tools */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Master Your Finances with Free Tools</h2>
        <p className="text-lg text-center max-w-2xl mx-auto mb-8">
          Discover our suite of smart calculators that help you plan, track, and optimize your finances.
        </p>
        <div className="text-center">
          <a
            href="/tools"
            className="inline-block bg-[#1B1F13] text-[#FCFFEE] px-8 py-3 rounded-md hover:bg-[#CAEF7D] transition"
          >
            Explore All Calculators
          </a>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Our Mission & Vision</h2>
        <p className="text-lg text-center max-w-3xl mx-auto">
          Our mission is to deliver clear, unbiased financial guidance that empowers you to secure your future. By bridging the gap between you and SEBI-registered experts, we provide personalized advice when you need it.
        </p>
      </section>

      {/* Recognized & Featured */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Recognized & Featured In</h2>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="flex flex-col items-center">
            <img src="/images/logo1.png" alt="Logo 1" className="w-24 h-auto" />
            <p className="mt-2 text-sm text-[#1B1F13]">Credibility 1</p>
          </div>
          <div className="flex flex-col items-center">
            <img src="/images/logo2.png" alt="Logo 2" className="w-24 h-auto" />
            <p className="mt-2 text-sm text-[#1B1F13]">Credibility 2</p>
          </div>
          <div className="flex flex-col items-center">
            <img src="/images/logo3.png" alt="Logo 3" className="w-24 h-auto" />
            <p className="mt-2 text-sm text-[#1B1F13]">Credibility 3</p>
          </div>
          <div className="flex flex-col items-center">
            <img src="/images/logo4.png" alt="Logo 4" className="w-24 h-auto" />
            <p className="mt-2 text-sm text-[#1B1F13]">Credibility 4</p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">FAQs</h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          <div className="p-4 bg-[#CAEF7D] rounded-md shadow">
            <p className="font-semibold">How do I book a free consultation?</p>
            <p>Simply WhatsApp us, and our team will guide you step by step!</p>
          </div>
          <div className="p-4 bg-[#CAEF7D] rounded-md shadow">
            <p className="font-semibold">What if I don’t know which service I need?</p>
            <p>Just send us a message, and our experts will help you choose the right plan for your goals.</p>
          </div>
          <div className="p-4 bg-[#CAEF7D] rounded-md shadow">
            <p className="font-semibold">Is Spring Money’s advice unbiased?</p>
            <p>Absolutely! Our SEBI-registered experts provide transparent, independent guidance with no hidden agendas.</p>
          </div>
          <div className="p-4 bg-[#CAEF7D] rounded-md shadow">
            <p className="font-semibold">Do I have to pay for basic tools and resources?</p>
            <p>Not at all! Our calculators and educational resources are completely free.</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Be a Part of Spring Money’s Journey</h2>
        <p className="text-lg mb-8">Take the first step toward smarter financial decisions!</p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <a
            href="#plans"
            className="inline-block bg-[#1B1F13] text-[#FCFFEE] px-8 py-3 rounded-md hover:bg-[#CAEF7D] transition"
          >
            Get Started
          </a>
          <a
            href="https://wa.me/your-phone-number"
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
