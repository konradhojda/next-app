import Link from "next/link";

import { Post } from "../api/blog";
import data from "../api/blog.json";

interface IPost {
  postData: Post;
}

export const PostComponent = ({ postData }: IPost) => {
  const { imageUrl, slug, title, excerpt, categories } = postData;

  const mapCategoryIdsToNames = (categoryIds: number[]) => {
    return categoryIds
      .map((categoryId) => data.categories.find((el) => el.id == categoryId))
      .filter((el) => Boolean(el));
  };

  return (
    <div className="flex w-full flex-col max-w-[1200px] mx-auto items-center p-6 xl:p-0">
      <div
        className="flex flex-col items-centerborder-radius-3
  shadow-[0px_4px_10px_rgba(0,0,0,0.15)] rounded"
      >
        <img src={imageUrl} className="mb-3" />
        <div className="px-4 pb-3 w-full">
          <h3 className="text-[14px] mb-3 text-center">{title}</h3>
          <p className="text-[14px] mb-3">{excerpt}</p>
          <ul className="text-xs text-fuchsia-400 text-center w-full mb-3 text-[18px] flex flex-col gap-4 pt-4">
            {mapCategoryIdsToNames(categories).map((cat) => {
              if (cat) {
                return <li key={cat?.id}>{cat?.name}</li>;
              }
            })}
          </ul>
        </div>
      </div>
      <Link href={`/`} className="mt-5 bg-blue-600 p-3 text-white rounded">
        go back
      </Link>
    </div>
  );
};
