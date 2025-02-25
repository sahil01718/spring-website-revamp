// app/blogs/page.tsx
import React from 'react';

export default function BlogsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center text-[#1B1F13] mb-8">
        Our Blogs
      </h1>
      {/* Container for the embedded blog */}
      <div className="w-full min-h-screen md:min-h-[90vh]">
        <iframe
          src="https://www.springmoneywix.com/post/the-journey-to-financial-peace-of-mind-shailesh-mahajan-x-ns-wealth-solution" // Replace with your Wix blog URL
          title="Wix Blog"
          className="w-full h-full border-0"
          style={{ minHeight: '90vh' }}
        />
      </div>
    </div>
  );
}
