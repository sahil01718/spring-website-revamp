// components/ClientHeader.tsx
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
};

const NavLink = ({ href, children }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={`transition-colors px-2 py-1 ${
        isActive
          ? "text-[#108e66] font-bold border-b-2 border-[#108e66]"
          : "text-[#272B2A] font-normal"
      } hover:text-[#108e66]`}
    >
      {children}
    </Link>
  );
};

const ClientHeader = () => (
  <header className="bg-[#fcfffe] shadow-md border-b border-b-[#108e66]">
    <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
      {/* Site Logo/Title */}
      <div className="text-2xl font-bold text-[#272B2A]">
        <Link href="/">Spring Money</Link>
      </div>
      {/* Navigation Links */}
      <nav className="mt-4 md:mt-0">
        <ul className="flex flex-col md:flex-row gap-4 text-center">
          <li>
            <NavLink href="/">Home</NavLink>
          </li>
          <li>
            <NavLink href="/services">Financial Planning</NavLink>
          </li>
          <li>
            <NavLink href="/tools">Tools</NavLink>
          </li>
          <li>
            <NavLink href="/for-ria">For RIA</NavLink>
          </li>
          <li>
            <NavLink href="/for-amc">For AMC</NavLink>
          </li>
        </ul>
      </nav>
      {/* CTA Button */}
      <div className="mt-4 md:mt-0">
        <a
          href="https://wa.me/your-phone-number" // Replace with your actual WhatsApp link
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#108e66] text-[#fcfffe] px-6 py-2 rounded-md hover:bg-[#fcfffe] hover:text-[#108e66] border border-[#108e66] transition"
        >
          Get in touch
        </a>
      </div>
    </div>
  </header>
);

export default ClientHeader;
