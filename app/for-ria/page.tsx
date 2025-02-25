// app/for-ria/page.tsx
import React from 'react';

export default function ForRiaPage() {
  return (
    <div className="space-y-16">
      {/* Hero / Intro */}
      <section className="bg-gradient-to-r from-[#CAEF7D] to-[#FCFFEE] py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1B1F13] mb-4">
          Partner with us as a Registered Investment Advisor
        </h1>
        <p className="text-lg md:text-xl text-[#1B1F13] max-w-3xl mx-auto">
          Expand your reach and connect with a wide audience seeking expert financial guidance. Join our trusted network of SEBI-registered advisors and gain access to advanced analytics and dedicated support.
        </p>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-[#1B1F13] mb-8">
          Why Partner With Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-md shadow hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold text-[#1B1F13] mb-3">Enhanced Visibility</h3>
            <p className="text-[#1B1F13]">
              Gain exposure to a targeted audience actively seeking financial expertise.
            </p>
          </div>
          <div className="bg-white p-8 rounded-md shadow hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold text-[#1B1F13] mb-3">Advanced Analytics</h3>
            <p className="text-[#1B1F13]">
              Leverage our cutting-edge tools to monitor client engagement and improve your offerings.
            </p>
          </div>
          <div className="bg-white p-8 rounded-md shadow hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold text-[#1B1F13] mb-3">Dedicated Support</h3>
            <p className="text-[#1B1F13]">
              Receive personalized assistance to grow your advisory business effectively.
            </p>
          </div>
          <div className="bg-white p-8 rounded-md shadow hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold text-[#1B1F13] mb-3">Seamless Integration</h3>
            <p className="text-[#1B1F13]">
              Easily integrate with our platform to showcase your services and attract new clients.
            </p>
          </div>
        </div>
      </section>

      {/* RIA Marketplace – Sample Profile Cards */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-[#1B1F13] mb-8">
          RIA Marketplace
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sample RIA Card 1 */}
          <div className="bg-white p-6 rounded-md shadow hover:shadow-2xl transition">
            <img src="/images/ria1.jpg" alt="RIA Profile 1" className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-2xl font-semibold text-[#1B1F13] mb-2">John Financials</h3>
            <p className="text-gray-600 mb-2">Retirement & Wealth Management Expert</p>
            <p className="text-gray-600">15+ years | SEBI Registered</p>
          </div>
          {/* Sample RIA Card 2 */}
          <div className="bg-white p-6 rounded-md shadow hover:shadow-2xl transition">
            <img src="/images/ria2.jpg" alt="RIA Profile 2" className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-2xl font-semibold text-[#1B1F13] mb-2">Secure Advisors</h3>
            <p className="text-gray-600 mb-2">Investment & Tax Planning Specialist</p>
            <p className="text-gray-600">15+ years | SEBI Registered</p>
          </div>
          {/* Sample RIA Card 3 */}
          <div className="bg-white p-6 rounded-md shadow hover:shadow-2xl transition">
            <img src="/images/ria3.jpg" alt="RIA Profile 3" className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-2xl font-semibold text-[#1B1F13] mb-2">WealthWise</h3>
            <p className="text-gray-600 mb-2">Comprehensive Financial Planning</p>
            <p className="text-gray-600">15+ years | SEBI Registered</p>
          </div>
          {/* Sample RIA Card 4 */}
          <div className="bg-white p-6 rounded-md shadow hover:shadow-2xl transition">
            <img src="/images/ria4.jpg" alt="RIA Profile 4" className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-2xl font-semibold text-[#1B1F13] mb-2">Future Focus</h3>
            <p className="text-gray-600 mb-2">Investment & Wealth Growth Strategists</p>
            <p className="text-gray-600">15+ years | SEBI Registered</p>
          </div>
          {/* Sample RIA Card 5 */}
          <div className="bg-white p-6 rounded-md shadow hover:shadow-2xl transition">
            <img src="/images/ria5.jpg" alt="RIA Profile 5" className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-2xl font-semibold text-[#1B1F13] mb-2">Prime Advisory</h3>
            <p className="text-gray-600 mb-2">Tailored Wealth & Retirement Solutions</p>
            <p className="text-gray-600">15+ years | SEBI Registered</p>
          </div>
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
