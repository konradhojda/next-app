import Link from "next/link";
import React, { useMemo, useState } from "react";

import { Post } from "../api/blog";
import data from "../api/blog.json";
import { Pagination } from "../components/Pagination";

const PAGE_SIZE = 3;
export default function Home() {
  const { posts } = data;
  const [blogPosts, setBlogPosts] = useState<Post[]>(posts);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(
    undefined
  );
  const [filterValue, setFilterValue] = useState("");

  const onPageChange = (value: number) => {
    return value > 0 && value < blogPosts.length && setCurrentPage(value);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setFilterValue(value);

    const filteredPosts = filterPostsByTitle(value);
    setBlogPosts(filteredPosts);
    setCurrentPage(1);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.currentTarget.value);
    setSelectedCategory(value || undefined);

    if (!value) {
      setBlogPosts(posts);
      return;
    }

    const filteredPosts = filterPostsByCategory(value);
    setBlogPosts(filteredPosts);
    setCurrentPage(1);
  };

  const filterPostsByTitle = (search: string) => {
    return posts.filter((post) => post.title.includes(search));
  };

  const filterPostsByCategory = (category: number) => {
    return posts.filter((post) => post.categories.includes(category));
  };

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PAGE_SIZE;
    const lastPageIndex = firstPageIndex + PAGE_SIZE;

    return blogPosts.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, blogPosts]);

  const postTotalCount = useMemo(() => {
    return Math.ceil(blogPosts.length / 3);
  }, [blogPosts]);

  return (
    <div className="flex w-full flex-col max-w-[1200px] mx-auto items-center">
      <div className="flex gap-6 mb-5 mt-10">
        {!Boolean(currentTableData.length) && <p>There are no posts with selected filters</p>}
        {currentTableData.map((post) => (
          <div
            key={post.title}
            className="flex flex-col items-centerborder-radius-3
       shadow-[0px_4px_10px_rgba(0,0,0,0.15)] w-1/3"
          >
            <Link href={`/posts/${post.slug}`}>
              <img src={post.imageUrl} className="mb-5 h-[200px] w-full" />
              <div className="px-4 pb-4 w-full">
                <h3 className="text-[14px] mb-3">{post.title}</h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <label>Search posts by title:</label>
      <input
        className="shadow appearance-none border border-blue-500 rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        id="text"
        type="text"
        placeholder="type something"
        onChange={handleFilterChange}
        value={filterValue}
      />
      <label>Search posts by category id:</label>
      <input
        className="shadow appearance-none border border-blue-500 rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        id="number"
        type="number"
        placeholder="type something"
        onChange={handleCategoryChange}
        value={selectedCategory}
      />

      <Pagination
        totalCount={postTotalCount}
        pageSize={PAGE_SIZE}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </div>
  );
}
