// app/blogs/page.tsx
import React from 'react';
import Link from 'next/link';

const blogPosts = [
  {
    id: 1,
    title: 'Understanding the Basics of Financial Planning',
    excerpt: 'Learn the fundamental principles of financial planning—from budgeting to investing—and discover how to make smarter financial decisions.',
    slug: 'financial-planning-basics',
    date: '2025-02-01',
  },
  {
    id: 2,
    title: 'Top 5 Financial Tools You Need in 2025',
    excerpt: 'Discover our selection of the most effective financial calculators that help you manage your money with ease.',
    slug: 'top-5-financial-tools-2025',
    date: '2025-01-15',
  },
  {
    id: 3,
    title: 'How to Choose the Right Financial Advisor',
    excerpt: 'Get insights on what to look for when selecting a financial advisor, with tips and tricks from industry experts.',
    slug: 'choosing-right-financial-advisor',
    date: '2025-01-05',
  },
];

export default function BlogsPage() {
  return (
    <div className="container mx-auto px-4 py-16 space-y-12">
      <h1 className="text-4xl font-bold text-center text-[#1B1F13] mb-8">Our Blogs</h1>
      <div className="space-y-8">
        {blogPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-md shadow p-6 hover:shadow-xl transition">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-[#1B1F13]">{post.title}</h2>
                <p className="text-sm text-gray-500 mb-2">{new Date(post.date).toLocaleDateString()}</p>
                <p className="text-lg text-[#1B1F13]">{post.excerpt}</p>
              </div>
              <div className="mt-4 md:mt-0">
                <Link
                  href={`/blogs/${post.slug}`}
                  className="inline-block bg-[#1B1F13] text-[#FCFFEE] px-6 py-2 rounded-md hover:bg-[#CAEF7D] transition"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
