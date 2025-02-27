// app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";
import ClientHeader from "./components/ClientHeader"; // Directly import the client header
import FAQAccordion from "./components/FAQAccordion";

export const metadata = {
  title: "Spring Money",
  description: "Elegant financial planning with modern, responsive design",
};

const Footer = () => (
  <footer className="bg-[#272B2A] py-10">
    <div className="container mx-auto px-4">
      {/* FAQ Accordion remains intact */}
      <FAQAccordion />
      {/* Footer Main Grid */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-semibold text-[#fcfffe]">Download the app</h3>
          {/* Placeholder for app download links */}
          <p className="mt-2 text-sm text-[#fcfffe]">Coming Soon</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-[#fcfffe]">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <a href="/blogs" className="text-white hover:underline">
                Blogs
              </a>
            </li>
            <li>
              <a href="/services" className="text-white hover:underline">
                Services
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-[#fcfffe]">Office Address</h3>
          <p className="mt-2 text-sm text-[#fcfffe]">
            5th Floor, MIT TBI, Kashyap Building,
            <br />
            MIT WPU Campus, Rambaug Colony,
            <br />
            Kothrud, Pune, Maharashtra 411038
          </p>
        </div>
      </div>
      {/* Bottom Row */}
      <div className="mt-8 border-t border-gray-700 pt-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-white">
          © {new Date().getFullYear()} by 2AN Technologies Private Limited
        </p>
        <div className="flex gap-4 mt-2 md:mt-0">
            <a href="https://www.spring.money/privacy-policy" className="text-white hover:underline" target="_blank" rel="noopener noreferrer">
            Privacy Policy
            </a>
          <a href="https://www.spring.money/terms-of-service" className="text-white hover:underline" target="_blank" rel="noopener noreferrer">
            Terms of Service
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Ensure proper scaling on mobile devices */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      {/* Global body styles: using our off‑white (#fcfffe) background and dark text (#272B2A) */}
      <body className="font-sans antialiased bg-[#fcfffe] text-[#272B2A]">
        <ClientHeader />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
