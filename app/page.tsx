import React from 'react';
import Link from 'next/link';

/*
  Carousel Component:
  A simple horizontal scrolling container that displays its children in a single line.
  The "animate-autoScroll" class (defined in globals.css) creates a continuous, infinite scroll.
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
  Contains data for each professional category. Ensure that the text wraps correctly.
*/
const professionalSolutions = [
  {
    id: 1,
    title: 'Individuals',
    tagline: 'Tailored plans for your journey',
    description: 'Personalized planning to grow your wealth and secure your future.',
  },
  {
    id: 2,
    title: 'NRIs',
    tagline: 'Seamless cross-border finance',
    description: 'Solutions to manage finances across borders with ease.',
  },
  {
    id: 3,
    title: 'Corporates',
    tagline: 'Boost employee wellness',
    description: 'Comprehensive financial wellness programs for your workforce.',
  },
  {
    id: 4,
    title: 'Doctors',
    tagline: 'Secure your future',
    description: 'Structured financial roadmaps for medical professionals.',
  },
  {
    id: 5,
    title: 'Lawyers',
    tagline: 'Smart money strategies',
    description: 'Tailored plans to manage irregular income and optimize taxes.',
  },
  {
    id: 6,
    title: 'Athletes',
    tagline: 'Lifelong wealth',
    description: 'Wealth preservation and passive income strategies for a secure future.',
  },
  {
    id: 7,
    title: 'Entrepreneurs',
    tagline: 'Scale your wealth',
    description: 'Strategic planning to balance business growth with personal wealth.',
  },
  {
    id: 8,
    title: 'Engineers',
    tagline: 'Design your future',
    description: 'Optimized investment strategies for engineers and architects.',
  },
  {
    id: 9,
    title: 'Teachers',
    tagline: 'Secure financial futures',
    description: 'Smart savings, side-income strategies, and pension planning for educators.',
  },
  {
    id: 10,
    title: 'Media Professionals',
    tagline: 'Transform creativity into wealth',
    description: 'Tailored financial planning for creatives and content makers.',
  },
  {
    id: 11,
    title: 'Freelancers',
    tagline: 'Consistent wealth',
    description: 'Income stabilization and tax-efficient strategies for independent professionals.',
  },
  {
    id: 12,
    title: 'Real Estate Agents',
    tagline: 'Build your empire',
    description: 'Optimize commissions and manage diversified investment portfolios.',
  },
  {
    id: 13,
    title: 'Finance Experts',
    tagline: 'Optimize your finances',
    description: 'Customized financial strategies for professionals in finance.',
  },
  {
    id: 14,
    title: 'Government Officials',
    tagline: 'Secure your future',
    description: 'Tailored plans focusing on pension maximization and secure investments.',
  },
  {
    id: 15,
    title: 'MBA Graduates',
    tagline: 'Smart money moves',
    description: 'Strategic planning and tax-efficient investments to maximize high-income potential.',
  },
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

      {/* WHO WE SERVE SECTION (Professional Solutions Carousel) */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#1B1F13] mb-8">Who We Serve</h2>
        {/* Duplicate the array for infinite scroll effect */}
        <Carousel>
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
        <h2 className="text-3xl font-bold text-center text-[#1B1F13] mb-8">Testimonials</h2>
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

      {/* MISSION & VISION SECTION */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-[#1B1F13] mb-8">Our Mission & Vision</h2>
        <p className="text-lg text-center max-w-3xl mx-auto mb-8">
          We bridge the gap between you and SEBI-registered experts, delivering clear, unbiased financial guidance to empower your future.
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
    </div>
  );
}
