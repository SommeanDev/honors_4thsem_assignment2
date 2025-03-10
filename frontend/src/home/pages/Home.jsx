import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/posts`);
        setPosts(response.data.posts);
        setTotalPages(response.data.totalPages);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container px-4 mx-auto">
      <h2 className="my-8 text-3xl font-bold">Recent Posts</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div key={post.id} className="p-6 bg-white rounded-md shadow-md">
            {post.image && (
              <img src={post.image} alt={post.title} className="object-cover w-full h-40 mb-4 rounded-md" />
            )}
            <h3 className="mb-2 text-lg font-semibold">{post.title}</h3>
            <p className="mb-4 text-gray-600">{post.content.substring(0, 100)}...</p>
            <a href={`/posts/${post.id}`} className="text-blue-500 hover:underline">
              Read more
            </a>
            <div className="flex items-center justify-between mt-4">
              <p className="text-gray-500">{post.author}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-4 py-2 mr-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="mx-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-4 py-2 ml-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PostList;
