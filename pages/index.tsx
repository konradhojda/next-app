import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";

import { Post } from "../api/blog";
import data from "../api/blog.json";
import { Pagination } from "../components/Pagination";
import { POSTS_SIZE } from "../utils/const";

export default function Home() {
  const { posts } = data;

  const [blogPosts, setBlogPosts] = useState<Post[]>(posts);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(
    undefined
  );
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    const updatedPosts = posts.filter((post) => {
      if (!selectedCategory) {
        return post.title.includes(filterValue);
      }

      return (
        post.title.includes(filterValue) &&
        post.categories.includes(selectedCategory)
      );
    });
    setCurrentPage(1);

    setBlogPosts(updatedPosts)
  }, [filterValue, selectedCategory])

  const onPageChange = (value: number) => {
    return value > 0 && value < blogPosts.length && setCurrentPage(value);
  };



  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setFilterValue(value);

  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.currentTarget.value);
    setSelectedCategory(value || undefined);
  };

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * POSTS_SIZE;
    const lastPageIndex = firstPageIndex + POSTS_SIZE;

    return blogPosts.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, blogPosts]);

  const postTotalCount = useMemo(() => {
    return Math.ceil(blogPosts.length / 3);
  }, [blogPosts]);

  return (
    <div className="flex w-full flex-col xl:max-w-[1200px] mx-auto items-center p-6 xl:p-0">
      <div className="flex flex-col xl:flex-row gap-6 mb-5 w-full mt-4">
        {!Boolean(currentTableData.length) && (
          <p>There are no posts with selected filters</p>
        )}
        {currentTableData.map((post) => (
          <div
            key={post.title}
            className="flex flex-col items-centerborder-radius-3
       shadow-[0px_4px_10px_rgba(0,0,0,0.15)] xl:w-1/3"
          >
            <Link href={`/posts/${post.slug}`}>
              <img src={post.imageUrl} className="h-[200px] w-full" />
              <div className="p-4 w-full flex justify-center items-center h-[100px]">
                <h3 className="text-[14px] text-center">{post.title}</h3>
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
        pageSize={POSTS_SIZE}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </div>
  );
}
