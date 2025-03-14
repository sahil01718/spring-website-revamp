import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="bg-[#272B2A] flex flex-col items-center">
      <div className="px-4 md:max-xl:px-[60px] w-full max-w-screen-xl">
        <div className="flex flex-col lg:flex-row items-center text-center lg:text-start justify-between py-8 border border-b-[#fcfffe8a] border-r-0 border-l-0">
          <div>
            <span className="text-[#FCFFFE] text-sm font-medium mb-2">
              Download the app
            </span>
            <div className="flex gap-4 mb-4 mt-2 lg:mt-0">
              <Link
                href={
                  "https://play.google.com/store/apps/details?id=com.spring.money"
                }
              >
                <Image
                  src={"/footer/play-store.svg"}
                  width={160}
                  height={40}
                  alt="play store image"
                />
              </Link>
              <Link
                href={"https://apps.apple.com/in/app/spring-money/id1660751993"}
              >
                <Image
                  src={"/footer/app-store.svg"}
                  width={160}
                  height={40}
                  alt="app store image"
                />
              </Link>
            </div>
            <span className="text-[#FCFFFE] text-sm font-medium mb-2">
              Our Socials
            </span>
            <div className="flex gap-4 justify-center lg:justify-start">
              <Link href={"https://wa.me/+918668484607"}>
                <Image
                  src={"/footer/whatsapp.svg"}
                  width={32}
                  height={32}
                  alt="WhatsApp social media icon"
                />
              </Link>
              <Link href={"https://www.instagram.com/springmoneyapp/"}>
                <Image
                  src={"/footer/instagram.svg"}
                  width={32}
                  height={32}
                  alt="Instagram social media icon"
                />
              </Link>
              <Link href={"https://www.linkedin.com/company/springmoney/"}>
                <Image
                  src={"/footer/linkedin.svg"}
                  width={32}
                  height={32}
                  alt="LinkedIn social media icon"
                />
              </Link>
              <Link href={"https://www.youtube.com/@springmoney"}>
                <Image
                  src={"/footer/youtube.svg"}
                  width={32}
                  height={32}
                  alt="YouTube social media icon"
                />
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-8 lg:mt-0">
            <span className="text-[#fcfffe8a] text-base font font-medium">
              Quick Links
            </span>
            <Link href={"/blog"} className="text-[#FCFFFE] text-sm font-normal">
              Blogs
            </Link>
            <Link
              href={"/tools"}
              className="text-[#FCFFFE] text-sm font-normal"
            >
              Tools
            </Link>
            <Link
              href={"/for-ria"}
              className="text-[#FCFFFE] text-sm font-normal"
            >
              For RIA
            </Link>
            <Link
              href={"/for-amc"}
              className="text-[#FCFFFE] text-sm font-normal"
            >
              For AMC
            </Link>
            <Link
              href={"/services"}
              className="text-[#FCFFFE] text-sm font-normal"
            >
              Financial Planning
            </Link>
          </div>
          <div className="hidden lg:flex flex-col gap-2">
            <span className="text-[#fcfffe8a] text-base font font-medium">
              Read Blogs About
            </span>
            <span className="text-[#FCFFFE] text-sm font-normal">Topic 1</span>
            <span className="text-[#FCFFFE] text-sm font-normal">Topic 2</span>
            <span className="text-[#FCFFFE] text-sm font-normal">Topic 3</span>
            <span className="text-[#FCFFFE] text-sm font-normal">Topic 4</span>
          </div>
        </div>
        <div className="py-8 flex flex-col gap-4 items-center text-center">
          <span className="text-[#fcfffe8a] text-sm font-normal">
            Office Address: 5th Floor, MIT TBI, Kashyap Building, MIT WPU
            Campus, Rambaug Colony, Kothrud, Pune, Maharashtra 411038
          </span>
          <div className="flex flex-col-reverse lg:flex-row gap-2 lg:gap-4">
            <span className="text-[#fcfffe8a] text-xs font-medium">
              © 2023 by 2AN Technologies Private Limited
            </span>
            <Link
              className="text-[#FCFFFE] text-xs font-semibold"
              href={"https://www.spring.money/privacy-policy"}
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </Link>
            <Link
              href={"https://www.spring.money/terms-of-service"}
              className="text-[#FCFFFE] text-xs font-semibold"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
