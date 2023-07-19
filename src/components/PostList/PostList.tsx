import axios from "axios";
import React, { useEffect, useState } from "react";
import PostCard from "../PostCard/PostCard";

interface PostsType {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const PostList = () => {
  const [posts, setPosts] = useState<PostsType[] | null>(null);

  const [search, setSearch] = useState<string>("");

  const API = "https://jsonplaceholder.typicode.com";
  const getPosts = async () => {
    try {
      const result = await axios(`${API}/posts?q=${search}`);
      setPosts(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    getPosts();
  }, [search]);

  return (
    <div>
      <input
        type="search"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {posts?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
