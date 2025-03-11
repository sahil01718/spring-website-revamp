'use server'
import BlogPostPage from "../blog-posting/page";

interface PageProps {
    params: {
        slug: string;
    };
}

const BlogPost = async ({params}: PageProps) => {
    return (<BlogPostPage BlogData={params.slug} />)
}

export default BlogPost;
