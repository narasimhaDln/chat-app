import React from 'react';
import MemeCreator from '../components/Meme/MemeCreator';

const CreatePage = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create a Meme</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Upload an image or choose from our templates to create your masterpiece
        </p>
      </div>
      
      <MemeCreator />
    </div>
  );
};

export default CreatePage;