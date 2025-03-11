"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface PageProps {
  params: { slug: string };
}

const BlogPost = () => {
  const params = useParams();
  const [BlogData, setBlogData] = useState<string>();

  useEffect(() => {
    if (params?.slug) {
      setBlogData(params.slug as string);
    }
  }, [params]);

  return (
    <div className="p-[60px]">
      <div className="h-[2000px]  w-full  rounded border border-solid border-gray-300  shadow-sm ">
        {BlogData && (
          <iframe
            src={`https://nikhil460.wixsite.com/springcomingsoon/post/${BlogData}`}
            title="Embedded content"
            style={{ width: "100%", height: "100%", border: "none" }}
            allowFullScreen
          />
        )}
      </div>
    </div>
  );
};

export default BlogPost;
