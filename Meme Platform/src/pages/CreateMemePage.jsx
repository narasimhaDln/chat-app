import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { memeTemplates, aiSuggestedCaptions } from '../data/mockData';
import { useMeme } from '../context/MemeContext';
import { useUser } from '../context/UserContext';
import MemeCanvas from '../components/Meme/MemeCanvas';
import { AlertCircle, Save, Download, Share2 } from 'lucide-react';

const CreateMemePage = () => {
  const navigate = useNavigate();
  const { createMeme } = useMeme();
  const { currentUser, isAuthenticated } = useUser();
  const canvasRef = useRef(null);
  
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [suggestedCaptions, setSuggestedCaptions] = useState([]);
  
  useEffect(() => {
    // Get random suggested captions
    const getRandomCaptions = () => {
      const shuffled = [...aiSuggestedCaptions].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 5);
    };
    
    setSuggestedCaptions(getRandomCaptions());
  }, []);

  const applySuggestedCaption = (caption) => {
    if (caption.includes('|')) {
      const [top, bottom] = caption.split('|').map(text => text.trim());
      setTopText(top);
      setBottomText(bottom);
    } else {
      setTopText(caption);
      setBottomText('');
    }
  };
  
  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    // Clear the text fields when changing templates
    setTopText('');
    setBottomText('');
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      setError('You must be logged in to create memes.');
      return;
    }
    
    if (!selectedTemplate) {
      setError('Please select a meme template.');
      return;
    }
    
    if (!title.trim()) {
      setError('Please provide a title for your meme.');
      return;
    }
    
    setIsSubmitting(true);
    setError('');

    try {
      // Get the canvas element and convert to data URL
      const canvas = canvasRef.current;
      const dataUrl = canvas.toDataURL('image/png');
      
      // Process tags - convert comma-separated string to array and trim whitespace
      const tagsArray = tags.split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);
      
      // Create the meme object
      const memeData = {
        title,
        templateName: selectedTemplate.name,
        templateUrl: selectedTemplate.url,
        imageUrl: dataUrl, // The rendered meme image
        topText,
        bottomText,
        tags: tagsArray,
      };
      
      const result = await createMeme(memeData);
      
      if (result.success) {
        // Navigate to the meme detail page
        navigate(`/meme/${result.meme.id}`);
      } else {
        setError(result.message || 'Failed to create meme. Please try again.');
        setIsSubmitting(false);
      }
      
    } catch (error) {
      console.error('Error creating meme:', error);
      setError('An error occurred while creating your meme. Please try again.');
      setIsSubmitting(false);
    }
  };
  
  const handleDownload = () => {
    if (!selectedTemplate) {
      setError('Please select a meme template first.');
      return;
    }
    
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL('image/png');
    
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `meme-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Template Selection */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 h-fit md:sticky md:top-24">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Choose a Template</h2>
          <div className="grid grid-cols-2 gap-3 max-h-[70vh] overflow-y-auto pr-2">
            {memeTemplates.map((template) => (
              <div 
                key={template.id}
                onClick={() => handleTemplateSelect(template)}
                className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                  selectedTemplate?.id === template.id 
                    ? 'border-purple-500 shadow-md' 
                    : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="aspect-w-1 aspect-h-1 w-full">
                  <img 
                    src={template.url} 
                    alt={template.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-2">
                  <p className="text-xs text-gray-700 dark:text-gray-300 truncate">{template.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Middle Column - Meme Preview and Form */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 md:col-span-2">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Create Your Meme</h1>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg flex items-start">
              <AlertCircle size={20} className="mr-2 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
          
          <div className="mb-6 max-w-xl mx-auto">
            {selectedTemplate ? (
              <MemeCanvas
                template={selectedTemplate}
                topText={topText}
                bottomText={bottomText}
                ref={canvasRef}
              />
            ) : (
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center aspect-w-1 aspect-h-1 w-full">
                <p className="text-gray-500 dark:text-gray-400">Select a template to get started</p>
              </div>
            )}
          </div>
          
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Meme Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Give your meme a catchy title"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Top Text
                </label>
                <input
                  type="text"
                  value={topText}
                  onChange={(e) => setTopText(e.target.value)}
                  placeholder="Top text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Bottom Text
                </label>
                <input
                  type="text"
                  value={bottomText}
                  onChange={(e) => setBottomText(e.target.value)}
                  placeholder="Bottom text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="funny, coding, tech"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              {/* Suggested Captions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Feeling stuck? Try these AI-suggested captions:
                </label>
                <div className="flex flex-wrap gap-2">
                  {suggestedCaptions.map((caption, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => applySuggestedCaption(caption)}
                      className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-xs hover:bg-purple-200 dark:hover:bg-purple-800/50 transition-colors"
                    >
                      {caption.length > 30 ? `${caption.substring(0, 27)}...` : caption}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="pt-4 flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save size={18} className="mr-2" />
                  {isSubmitting ? 'Creating...' : 'Create Meme'}
                </button>
                
                <button
                  type="button"
                  onClick={handleDownload}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center"
                >
                  <Download size={18} className="mr-2" />
                  Download
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateMemePage; 