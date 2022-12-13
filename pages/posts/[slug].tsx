import { GetStaticPaths, GetStaticProps } from "next";

import data from "../../api/blog.json";

import { Post } from "../../api/blog";
import { PostComponent } from "../../components/Post";

function getAllPostSlugs() {
  const postSlugs = data.posts.map((post) => post.slug);

  return postSlugs.map((slug) => {
    return {
      params: {
        slug: slug.replace(/\.md$/, ""),
      },
    };
  });
}

export default function SinglePostPage({ postData }: { postData: Post }) {
  const { imageUrl, slug, title, excerpt, categories } = postData;

  const mapCategoryIdsToNames = (categoryIds: number[]) => {
    return categoryIds
      .map((categoryId) => data.categories.find((el) => el.id == categoryId))
      .filter((el) => Boolean(el));
  };

  return (
    <PostComponent postData={postData} />
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log("BBBBBBBBBBBBBB");
  const postSlug = params?.slug as string;
  const postData = data.posts.find((post) => post.slug === postSlug);

  console.log("AAA", postSlug);

  return {
    props: {
      postData,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const postSlugs = getAllPostSlugs();

  console.log("postIds", postSlugs);

  return {
    paths: postSlugs,
    fallback: false,
  };
};
