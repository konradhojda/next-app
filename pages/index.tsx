import { useMemo, useState } from "react";
import { Posts } from "../api/blog";
import data from "../api/blog.json";
import { Pagination } from "../components/Pagination";
import { Post } from "../components/Post";

const PAGE_SIZE = 3;
export default function Home() {
  const { categories, posts } = data;
  const [blogPosts, setBlogPosts] = useState<Posts[]>(posts);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const onPageChange = (value: number) => {
    return value > 0 && value < blogPosts.length && setCurrentPage(value);
  };

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PAGE_SIZE;
    const lastPageIndex = firstPageIndex + PAGE_SIZE;
    return blogPosts.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  return (
    <div className="flex w-full flex-col max-w-[1200px] mx-auto items-center">
      <div className="flex gap-6 mb-5">
        {currentTableData.map((post) => (
          <Post post={post} key={post.title} />
        ))}
      </div>
      <Pagination
        totalCount={blogPosts.length}
        pageSize={PAGE_SIZE}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </div>
  );
}
