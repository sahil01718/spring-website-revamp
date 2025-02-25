// app/page.tsx
import React from "react";
import Link from "next/link";

/*
  Carousel Component:
  A simple horizontal scrolling container that displays its children inline.
  The "animate-autoScroll" class (defined in globals.css) creates an infinite auto-scroll.
*/
const Carousel = ({ children }: { children: React.ReactNode }) => (
  <div className="relative overflow-hidden">
    <div className="flex space-x-4 animate-autoScroll">
      {children}
    </div>
  </div>
);

/*
  Professional Solutions Array:
  Data for the "Who We Serve" section.
*/
const professionalSolutions = [
  { id: 1, title: "Young Professionals", tagline: "Start Strong, Stay Ahead!", description: "Tailored strategies for early career growth and smart investments." },
  { id: 2, title: "MBA Graduates", tagline: "Smart Money Moves for Smart MBAs!", description: "Optimize high-income potential with strategic planning and tax-efficient investments." },
  { id: 3, title: "IT Professionals", tagline: "Maximize Earnings, Build Wealth Like a Pro!", description: "Diversified investment strategies and ESOP planning to secure financial independence." },
  { id: 4, title: "Doctors & Medical Professionals", tagline: "You Care for Patients, We Care for Your Wealth!", description: "Structured roadmaps for managing loans, optimizing taxes, and planning retirement." },
  { id: 5, title: "Lawyers & Legal Professionals", tagline: "Win in Court, Win with Your Money!", description: "Manage irregular income and tax liabilities with strategic investment plans." },
  { id: 6, title: "Armed Forces & Government Officials", tagline: "Secure Your Future While Serving the Nation!", description: "Pension maximization, tax-efficient investments, and real estate advisory." },
  { id: 7, title: "Professional Athletes", tagline: "Short Careers, Lifelong Wealth!", description: "Wealth preservation, passive income, and tax-efficient plans for long-term security." },
  { id: 8, title: "Startup Founders & Entrepreneurs", tagline: "Scale Your Startup, Scale Your Wealth!", description: "Structured wealth-building plans balancing reinvestment and long-term planning." },
  { id: 9, title: "Engineers & Architects", tagline: "Design the Future, Build Your Wealth!", description: "Optimizing tax strategies and planning for early retirement with tailored investments." },
  { id: 10, title: "Teachers & Professors", tagline: "Shape Minds, Secure Your Future!", description: "Smart savings, side-income strategies, and pension planning for educators." },
  { id: 11, title: "Media & Creative Professionals", tagline: "Transform Creativity into Wealth!", description: "Manage irregular income with smart tax planning and secure investment strategies." },
  { id: 12, title: "Freelancers & Consultants", tagline: "From Irregular Income to Consistent Wealth!", description: "Income stabilization and tax-efficient financial roadmaps for independent professionals." },
  { id: 13, title: "Real Estate Agents & Investors", tagline: "Build Properties, Build Your Empire!", description: "Optimize commissions and create diversified portfolios for sustained wealth." },
  { id: 14, title: "Finance Experts", tagline: "Optimize Your Finances!", description: "Customized strategies for financial professionals to manage and grow wealth." },
  { id: 15, title: "Government Officials", tagline: "Secure Your Future!", description: "Tailored plans focusing on pension maximization and secure investments." },
];

/*
  Our Team Array:
  Contains data for team members: image, name, and designation.
  Update the image paths and details as needed.
*/
const teamMembers = [
  { id: 1, name: "Alice Johnson", designation: "CEO", image: "/images/team1.jpg" },
  { id: 2, name: "Bob Smith", designation: "CFO", image: "/images/team2.jpg" },
  { id: 3, name: "Carol Davis", designation: "COO", image: "/images/team3.jpg" },
  { id: 4, name: "David Lee", designation: "CTO", image: "/images/team4.jpg" },
  { id: 5, name: "Eva Green", designation: "CMO", image: "/images/team5.jpg" },
];

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-[#CAEF7D] to-[#FCFFEE] py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1B1F13] mb-4">
            Welcome to Spring Money
          </h1>
          <p className="text-lg md:text-xl text-[#1B1F13] mb-8">
            Experience innovative, tailored, and comprehensive financial planning for every stage of your life.
          </p>
          <Link
            href="/services"
            className="inline-block bg-[#1B1F13] text-[#FCFFEE] px-8 py-3 rounded-md hover:bg-[#CAEF7D] transition"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* WHO WE SERVE SECTION (Infinite Carousel for Professional Solutions) */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#1B1F13] mb-8">Who We Serve</h2>
        <Carousel>
          {/* Duplicate array for infinite scroll */}
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
        </Carousel>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#1B1F13] mb-8">Real People. Real Results.</h2>
        <p className="text-lg md:text-xl text-center text-[#1B1F13] mb-8">
          Don't just take our word for it – see the success stories from our clients.
        </p>
        <div className="overflow-x-auto whitespace-nowrap scroll-smooth py-4">
          {/* Testimonial Card 1 */}
          <div className="inline-block bg-white rounded-md p-4 shadow mx-2 w-80">
            <div className="relative pb-[56.25%] mb-4">
              <iframe
                src="https://www.youtube.com/embed/VIDEO_ID1" // Replace with your actual video ID
                title="Testimonial 1"
                className="absolute top-0 left-0 w-full h-full rounded-md"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="text-center text-[#1B1F13] text-sm">
              "Spring Money transformed my financial future."
            </p>
          </div>
          {/* Testimonial Card 2 */}
          <div className="inline-block bg-white rounded-md p-4 shadow mx-2 w-80">
            <div className="relative pb-[56.25%] mb-4">
              <iframe
                src="https://www.youtube.com/embed/VIDEO_ID2" // Replace with your actual video ID
                title="Testimonial 2"
                className="absolute top-0 left-0 w-full h-full rounded-md"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="text-center text-[#1B1F13] text-sm">
              "Expert advice that makes a real difference."
            </p>
          </div>
        </div>
      </section>

      {/* TOOLS SECTION */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1B1F13] mb-4">
            Smart Financial Tools
          </h1>
          <p className="text-lg md:text-xl text-[#1B1F13] mb-8">
            Unlock powerful financial calculators designed to simplify investment, tax, and retirement planning.
          </p>
          <Link
            href="/tools"
            className="inline-block bg-[#1B1F13] text-[#FCFFEE] px-8 py-3 rounded-md hover:bg-[#CAEF7D] transition"
          >
            Explore Financial Tools
          </Link>
        </div>
      </section>

      {/* MISSION & VISION SECTION */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-[#1B1F13] mb-8">Our Mission & Vision</h2>
        <p className="text-lg text-center max-w-3xl mx-auto mb-8">
          Spring Money is built on the belief that expert financial advice should be accessible to everyone.
          We bridge the gap between you and SEBI-registered advisors, ensuring that financial planning is simple,
          transparent, and effective.
        </p>
        <div className="overflow-x-auto whitespace-nowrap scroll-smooth py-4">
          <div className="flex space-x-4">
            <div className="inline-block bg-white rounded-md p-6 shadow mx-2 w-64">
              <img src="/images/mission1.jpg" alt="Expert Guidance" className="w-full h-40 object-cover rounded-md mb-2" />
              <p className="text-center text-sm text-[#1B1F13]">Expert Guidance</p>
            </div>
            <div className="inline-block bg-white rounded-md p-6 shadow mx-2 w-64">
              <img src="/images/mission2.jpg" alt="Innovative Solutions" className="w-full h-40 object-cover rounded-md mb-2" />
              <p className="text-center text-sm text-[#1B1F13]">Innovative Solutions</p>
            </div>
            <div className="inline-block bg-white rounded-md p-6 shadow mx-2 w-64">
              <img src="/images/mission3.jpg" alt="Long-Term Planning" className="w-full h-40 object-cover rounded-md mb-2" />
              <p className="text-center text-sm text-[#1B1F13]">Long-Term Planning</p>
            </div>
          </div>
        </div>
      </section>

      {/* OUR TEAM SECTION */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-[#1B1F13] mb-8">Our Team</h2>
        <p className="text-lg text-center max-w-3xl mx-auto mb-8">
          Meet the experts behind Spring Money, dedicated to providing clear, unbiased financial guidance.
        </p>
        <div className="overflow-x-auto whitespace-nowrap scroll-smooth py-4">
          <div className="flex space-x-4">
            {/* Team Member Card 1 */}
            <div className="inline-block bg-white rounded-md shadow mx-2 w-64 p-6">
              <img src="/images/team1.jpg" alt="Alice Johnson" className="w-full h-40 object-cover rounded-md mb-4" />
              <h3 className="text-xl font-semibold text-center text-[#1B1F13]">Alice Johnson</h3>
              <p className="text-center text-sm text-gray-700">CEO</p>
            </div>
            {/* Team Member Card 2 */}
            <div className="inline-block bg-white rounded-md shadow mx-2 w-64 p-6">
              <img src="/images/team2.jpg" alt="Bob Smith" className="w-full h-40 object-cover rounded-md mb-4" />
              <h3 className="text-xl font-semibold text-center text-[#1B1F13]">Bob Smith</h3>
              <p className="text-center text-sm text-gray-700">CFO</p>
            </div>
            {/* Team Member Card 3 */}
            <div className="inline-block bg-white rounded-md shadow mx-2 w-64 p-6">
              <img src="/images/team3.jpg" alt="Carol Davis" className="w-full h-40 object-cover rounded-md mb-4" />
              <h3 className="text-xl font-semibold text-center text-[#1B1F13]">Carol Davis</h3>
              <p className="text-center text-sm text-gray-700">COO</p>
            </div>
            {/* Team Member Card 4 */}
            <div className="inline-block bg-white rounded-md shadow mx-2 w-64 p-6">
              <img src="/images/team4.jpg" alt="David Lee" className="w-full h-40 object-cover rounded-md mb-4" />
              <h3 className="text-xl font-semibold text-center text-[#1B1F13]">David Lee</h3>
              <p className="text-center text-sm text-gray-700">CTO</p>
            </div>
            {/* Team Member Card 5 */}
            <div className="inline-block bg-white rounded-md shadow mx-2 w-64 p-6">
              <img src="/images/team5.jpg" alt="Eva Green" className="w-full h-40 object-cover rounded-md mb-4" />
              <h3 className="text-xl font-semibold text-center text-[#1B1F13]">Eva Green</h3>
              <p className="text-center text-sm text-gray-700">CMO</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
