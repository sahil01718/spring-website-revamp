// app/layout.tsx
import './globals.css';
import Link from 'next/link';
import { ReactNode } from 'react';

// Metadata for SEO and browser info
export const metadata = {
  title: 'Spring Money',
  description: 'Elegant financial planning with modern, responsive design',
};

// Header component: responsive header with site title and navigation links (without Blogs)
const Header = () => {
  return (
    <header className="bg-white shadow-md border-b border-[#CAEF7D]">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
        {/* Site Title/Logo */}
        <div className="text-2xl font-bold text-[#1B1F13]">
          <Link href="/">Spring Money</Link>
        </div>
        {/* Navigation Links */}
        <nav className="mt-4 md:mt-0">
          <ul className="flex flex-col md:flex-row gap-2 md:gap-6 text-center">
            <li>
              <Link href="/" className="text-[#1B1F13] hover:text-[#CAEF7D]">
                Home
              </Link>
            </li>
            <li>
              <Link href="/services" className="text-[#1B1F13] hover:text-[#CAEF7D]">
                Services
              </Link>
            </li>
            <li>
              <Link href="/for-ria" className="text-[#1B1F13] hover:text-[#CAEF7D]">
                For RIA
              </Link>
            </li>
            <li>
              <Link href="/for-amc" className="text-[#1B1F13] hover:text-[#CAEF7D]">
                For AMC
              </Link>
            </li>
            <li>
              <Link href="/tools" className="text-[#1B1F13] hover:text-[#CAEF7D]">
                Tools
              </Link>
            </li>
          </ul>
        </nav>
        {/* CTA Button */}
        <div className="mt-4 md:mt-0">
          <a
            href="https://wa.me/your-phone-number" // Replace with your WhatsApp link
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1B1F13] text-[#FCFFEE] px-6 py-2 rounded-md hover:bg-[#CAEF7D] transition"
          >
            Get in touch
          </a>
        </div>
      </div>
    </header>
  );
};

// Footer component: includes additional navigation links including Blogs (only in footer)
const Footer = () => {
  return (
    <footer className="bg-[#1B1F13] text-[#FCFFEE] py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Spring Money. All rights reserved.
        </p>
        <div className="flex gap-4 mt-2 md:mt-0">
          <Link href="/blogs" className="hover:underline">
            Blogs
          </Link>
          <Link href="/services" className="hover:underline">
            Services
          </Link>
          <a
            href="https://twitter.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Twitter
          </a>
          <a
            href="https://facebook.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Facebook
          </a>
        </div>
      </div>
    </footer>
  );
};

// RootLayout wraps every page with Header and Footer.
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Ensures proper scaling on mobile devices */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="font-sans antialiased bg-[#FCFFEE] text-[#1B1F13]">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
