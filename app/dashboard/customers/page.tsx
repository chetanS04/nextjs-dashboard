import React from 'react';

const Page = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-white-500 to-purple-600">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-sm">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Developed by</h1>
        <p className="text-2xl text-gray-700 font-semibold">Chetan Sharma</p>
        <div className="mt-6">
          <a
            href="https://github.com/chetanS04"
            className="inline-block bg-gradient-to-r from-purple-500 to-blue-500 text-blue font-semibold py-2 px-6 rounded-lg shadow-md hover:from-blue-500 hover:to-purple-500 hover:shadow-lg transition duration-300 ease-in-out"
          >
            Know More
          </a>
        </div>
      </div>
    </div>
  );
};

export default Page;
