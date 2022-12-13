import { Posts } from "../api/blog";

interface Props {
  post: Posts;
}
export const Post = ({ post }: Props) => {
  console.log(post.imageUrl);
  return (
    <div
      className="flex flex-col items-centerborder-radius-3
    shadow-[0px_4px_10px_rgba(0,0,0,0.15)] w-1/3"
    >
      <img src={post.imageUrl} className="mb-5 h-[200px] w-full" />
      <div className="px-4 pb-4 w-full">
        <p className="text-xs text-fuchsia-400 text-center w-full mb-3">
          {post.categories}
        </p>
        <h3 className="text-[14px] mb-3">{post.title}</h3>
        <p className="text-[14px]">{post.excerpt}</p>
      </div>
    </div>
  );
};
