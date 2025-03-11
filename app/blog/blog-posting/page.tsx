"use client";
import React, { useEffect, useState } from "react";

interface BlogPostPageProps {
  readonly BlogData: string;
}

interface BlogState {
  BlogData: string | undefined;
}

export default function BlogPostPage(props: BlogPostPageProps) {
  const [BlogData, setBlogData] = useState<BlogState["BlogData"]>();

  useEffect(() => {
    setBlogData(props.BlogData);
  }, [props.BlogData]);
  return (
    <div className="p-[60px]">
      <div className="h-[2000px]  w-full  rounded border border-solid border-gray-300  shadow-sm ">
        {BlogData && (
          <iframe
            src={`https://nikhil460.wixsite.com/springcomingsoon/post/${BlogData}`}
            title="Embedded content"
            style={{ width: "100%", height: "100%", border: "none" }}
            allowFullScreen
            // frameBorder="0"
          />
        )}
      </div>
    </div>
  );
}
