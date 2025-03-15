"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { PacmanLoader } from "react-spinners";

interface PageProps {
  params: { slug: string };
}

const BlogPost = () => {
  const params = useParams();
  const [BlogData, setBlogData] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (params?.slug) {
      setBlogData(params.slug as string);
    }
  }, [params]);

  return (
    <div className="p-4 md:p-[60px] relative">
      {isLoading && (
        <div className="absolute flex left-1/2">
          <PacmanLoader color="#108e66" size={50} />
        </div>
      )}
      <div className="h-[2000px]  w-full  rounded border border-solid border-gray-300  shadow-sm ">
        {BlogData && (
          <iframe
            src={`https://nikhil460.wixsite.com/springcomingsoon/post/${BlogData}`}
            title="Embedded content"
            style={{ width: "100%", height: "100%", border: "none" }}
            allowFullScreen
            onLoad={() => setIsLoading(false)}
          />
        )}
      </div>
    </div>
  );
};

export default BlogPost;
