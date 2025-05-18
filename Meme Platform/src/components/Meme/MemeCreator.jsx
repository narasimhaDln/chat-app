import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Wand2, Image as ImageIcon, X, Plus, Tag, Save, Send } from 'lucide-react';
import { useMeme } from '../../context/MemeContext';
import { aiSuggestedCaptions, memeTemplates } from '../../data/mockData';
import { Toast } from '../UI/Toast';

const MemeCreator = () => {
  const navigate = useNavigate();
  const { createMeme } = useMeme();
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);
  
  const [title, setTitle] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [showTemplates, setShowTemplates] = useState(false);
  const [showToast, setShowToast] = useState({ show: false, message: '', type: 'success' });
  const [fontOptions, setFontOptions] = useState({
    family: 'Impact',
    size: 40,
    color: '#ffffff',
    outline: '#000000',
    align: 'center'
  });
  const [isPublishing, setIsPublishing] = useState(false);
  
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      setShowToast({
        show: true,
        message: 'Please upload an image file',
        type: 'error'
      });
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(file);
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };
  
  const handleTemplateSelect = (template) => {
    console.log('Selected template:', template);
    
    // Create a new image to preload the template
    const img = new Image();
    
    // Set up CORS handling for remote images
    img.crossOrigin = 'anonymous';
    
    // Handle loading success
    img.onload = () => {
      console.log('Template image loaded successfully');
      // Use a proxy for external images to avoid CORS issues
      const imageUrl = template.url.startsWith('http') && !template.url.includes('imgflip.com') 
        ? `https://corsproxy.io/?${encodeURIComponent(template.url)}`
        : template.url;
      
      setImagePreview(imageUrl);
      setSelectedImage(imageUrl);
    setShowTemplates(false);
    };
    
    // Handle loading error
    img.onerror = (error) => {
      console.error('Failed to load template image:', error);
      setShowToast({
        show: true,
        message: 'Failed to load template image. Please try another one.',
        type: 'error'
      });
    };
    
    // Start loading the image - use a CORS proxy for external images
    if (template.url.startsWith('http') && !template.url.includes('imgflip.com')) {
      img.src = `https://corsproxy.io/?${encodeURIComponent(template.url)}`;
    } else {
      img.src = template.url;
    }
  };
  
  const handleAddTag = () => {
    const normalizedTag = tagInput.trim().toLowerCase();
    if (normalizedTag && !tags.includes(normalizedTag) && tags.length < 5) {
      setTags([...tags, normalizedTag]);
      setTagInput('');
    }
  };
  
  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };
  
  const getAICaptionSuggestions = () => {
    const randomIndex = Math.floor(Math.random() * aiSuggestedCaptions.length);
    const suggestion = aiSuggestedCaptions[randomIndex];
    
    setTopText(suggestion.topText);
    setBottomText(suggestion.bottomText);
    
    setShowToast({
      show: true,
      message: 'AI caption generated!',
      type: 'success'
    });
  };
  
  const generateMemeImage = async () => {
    return new Promise((resolve, reject) => {
      try {
        // Make sure canvas exists
        if (!canvasRef.current) {
          console.error('Canvas reference is null');
          reject(new Error('Canvas reference is null'));
          return;
        }

      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = new Image();
        
        // Set up image loading error handling
        img.onerror = () => {
          console.error('Failed to load image from:', imagePreview);
          
          // Create a placeholder for the failed image
          canvas.width = 800;
          canvas.height = 600;
          
          // Fill with a gradient background
          const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
          gradient.addColorStop(0, '#4a148c');
          gradient.addColorStop(1, '#7b1fa2');
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          // Add error text
          ctx.font = '30px Arial';
          ctx.fillStyle = 'white';
          ctx.textAlign = 'center';
          ctx.fillText('Image could not be loaded', canvas.width/2, canvas.height/2 - 30);
          ctx.fillText('Your meme was saved with text only', canvas.width/2, canvas.height/2 + 30);
          
          // Add the top and bottom text with selected formatting
          if (topText) {
            // Configure text rendering based on font options
            ctx.textAlign = fontOptions.align;
            ctx.font = `bold ${fontOptions.size}px ${fontOptions.family}`;
            ctx.fillStyle = fontOptions.color;
            ctx.strokeStyle = fontOptions.outline;
            ctx.lineWidth = fontOptions.size / 15;
            
            ctx.textBaseline = 'top';
            ctx.strokeText(topText.toUpperCase(), canvas.width / 2, 20);
            ctx.fillText(topText.toUpperCase(), canvas.width / 2, 20);
          }
          
          if (bottomText) {
            // Configure text rendering based on font options
            ctx.textAlign = fontOptions.align;
            ctx.font = `bold ${fontOptions.size}px ${fontOptions.family}`;
            ctx.fillStyle = fontOptions.color;
            ctx.strokeStyle = fontOptions.outline;
            ctx.lineWidth = fontOptions.size / 15;
            
            ctx.textBaseline = 'bottom';
            ctx.strokeText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 20);
            ctx.fillText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 20);
          }
          
          // Convert to data URL and resolve
          setTimeout(() => {
            try {
              const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
              resolve(dataUrl);
            } catch (err) {
              console.error('Error creating data URL for placeholder:', err);
              reject(err);
            }
          }, 100);
        };
      
      img.onload = () => {
          // Set canvas dimensions based on loaded image
        const aspectRatio = img.width / img.height;
        canvas.width = 800;
          canvas.height = Math.round(800 / aspectRatio);
          
          // Clear any previous content
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        
          // Draw the image
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
          // Configure text rendering based on font options
        ctx.textAlign = fontOptions.align;
          ctx.font = `bold ${fontOptions.size}px ${fontOptions.family}`;
        ctx.fillStyle = fontOptions.color;
        ctx.strokeStyle = fontOptions.outline;
        ctx.lineWidth = fontOptions.size / 15;
        
          // Add top text if it exists
        if (topText) {
          ctx.textBaseline = 'top';
          ctx.strokeText(topText.toUpperCase(), canvas.width / 2, 20);
          ctx.fillText(topText.toUpperCase(), canvas.width / 2, 20);
        }
        
          // Add bottom text if it exists
        if (bottomText) {
          ctx.textBaseline = 'bottom';
          ctx.strokeText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 20);
          ctx.fillText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 20);
        }
        
          // Give a small delay to ensure canvas rendering is complete
          setTimeout(() => {
            try {
              // Get the data URL
              const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
              console.log('Meme image created successfully');
              resolve(dataUrl);
            } catch (err) {
              console.error('Error creating data URL:', err);
              reject(err);
            }
          }, 100);
        };
        
        // Handle CORS for remote images
        img.crossOrigin = 'anonymous';
        
        console.log('Loading image from:', imagePreview);
        // Use a CORS proxy for external images
        if (imagePreview.startsWith('http') && !imagePreview.includes('imgflip.com') && !imagePreview.includes('corsproxy.io')) {
          img.src = `https://corsproxy.io/?${encodeURIComponent(imagePreview)}`;
        } else {
      img.src = imagePreview;
        }
      } catch (error) {
        console.error('Error in generateMemeImage:', error);
        reject(error);
      }
    });
  };
  
  const handlePublishMeme = async () => {
    if (!title) {
      setShowToast({
        show: true,
        message: 'Please add a title for your meme',
        type: 'error'
      });
      return;
    }
    
    if (!imagePreview) {
      setShowToast({
        show: true,
        message: 'Please select an image or choose from templates',
        type: 'error'
      });
      return;
    }
    
    setIsPublishing(true);
    
    try {
      const memeImageUrl = await generateMemeImage();
      console.log('Generated meme image URL:', memeImageUrl ? 'Successfully generated' : 'Failed to generate');
      
      const memeData = {
        title,
        imageUrl: memeImageUrl,
        topText,
        bottomText,
        tags
      };
      
      console.log('Sending meme data:', memeData);
      
      const result = await createMeme(memeData);
      console.log('Create meme result:', result);
      
      if (result && result.success) {
        setShowToast({
          show: true,
          message: 'Meme published successfully!',
          type: 'success'
        });
        setTimeout(() => {
        navigate(`/meme/${result.meme.id}`);
        }, 500);
      } else {
        throw new Error(result?.error || 'Unknown error occurred');
      }
    } catch (error) {
      console.error("Error publishing meme:", error);
      setShowToast({
        show: true,
        message: 'Failed to publish meme. Please try again.',
        type: 'error'
      });
    } finally {
      setIsPublishing(false);
    }
  };
  
  const handleSaveAsDraft = () => {
    setShowToast({
      show: true,
      message: 'Meme saved as draft',
      type: 'success'
    });
  };
  
  useEffect(() => {
    if (showToast.show) {
      const timer = setTimeout(() => {
        setShowToast({ ...showToast, show: false });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);
  
  // Make sure the canvas is ready for rendering the meme
  useEffect(() => {
    if (canvasRef.current && imagePreview) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        const aspectRatio = img.width / img.height;
        canvas.width = 800;
        canvas.height = 800 / aspectRatio;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
      
      img.src = imagePreview;
    }
  }, [imagePreview]);
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Create Your Meme</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Preview */}
        <div className="space-y-6">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 flex flex-col items-center justify-center min-h-[400px]">
            {imagePreview ? (
              <div className="relative w-full">
                <canvas 
                  ref={canvasRef} 
                  className="hidden"
                />
                <div className="relative">
                  <div className="absolute top-0 left-0 bg-purple-600 text-white text-xs px-2 py-1 rounded-tr-md rounded-bl-md z-10">
                    Meme Preview
                  </div>
                  <img 
                    src={imagePreview} 
                    alt="Meme preview" 
                    className="w-full rounded-lg"
                  />
                  {topText && (
                    <div className="absolute top-0 left-0 right-0 text-center p-2 bg-black bg-opacity-40">
                      <p 
                        className="text-white font-bold uppercase tracking-wider"
                        style={{ 
                          fontFamily: fontOptions.family,
                          fontSize: `${fontOptions.size}px`,
                          color: fontOptions.color,
                          textShadow: fontOptions.outline === '#000000' ? 
                            '-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000' :
                            `-2px -2px 0 ${fontOptions.outline}, 2px -2px 0 ${fontOptions.outline}, -2px 2px 0 ${fontOptions.outline}, 2px 2px 0 ${fontOptions.outline}`,
                          textAlign: fontOptions.align,
                          lineHeight: '1.2'
                        }}
                      >
                        {topText}
                      </p>
                    </div>
                  )}
                  {bottomText && (
                    <div className="absolute bottom-0 left-0 right-0 text-center p-2 bg-black bg-opacity-40">
                      <p 
                        className="text-white font-bold uppercase tracking-wider"
                        style={{ 
                          fontFamily: fontOptions.family,
                          fontSize: `${fontOptions.size}px`,
                          color: fontOptions.color,
                          textShadow: fontOptions.outline === '#000000' ? 
                            '-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000' :
                            `-2px -2px 0 ${fontOptions.outline}, 2px -2px 0 ${fontOptions.outline}, -2px 2px 0 ${fontOptions.outline}, 2px 2px 0 ${fontOptions.outline}`,
                          textAlign: fontOptions.align,
                          lineHeight: '1.2'
                        }}
                      >
                        {bottomText}
                      </p>
                    </div>
                  )}
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-md">
                    Text will be embedded in image
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedImage(null);
                    setImagePreview('');
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors duration-200"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="mb-4 text-gray-500 dark:text-gray-400">
                  <ImageIcon size={64} />
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Select an image or choose from templates
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => fileInputRef.current.click()}
                    className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
                  >
                    <Upload size={18} className="mr-2" />
                    Upload Image
                  </button>
                  <button
                    onClick={() => setShowTemplates(true)}
                    className="flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200"
                  >
                    <ImageIcon size={18} className="mr-2" />
                    Templates
                  </button>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            )}
          </div>
          
          {showTemplates && (
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Choose a Template
                </h3>
                <button
                  onClick={() => setShowTemplates(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {memeTemplates.map((template) => (
                  <div 
                    key={template.id}
                    onClick={() => handleTemplateSelect(template)}
                    className="cursor-pointer rounded-lg overflow-hidden border-2 border-transparent hover:border-purple-500 transition-all duration-200"
                  >
                    <img 
                      src={template.url} 
                      alt={template.name} 
                      className="w-full h-24 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Right Column - Form */}
        <div className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Meme Title <span className="text-xs text-gray-500">(only for identifying your meme, not shown on the image)</span>
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your meme a catchy title (not shown on the meme)"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              maxLength={100}
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              The title helps others find your meme but won't appear on the image itself.
            </p>
          </div>
          
          {/* Top Text */}
          <div>
            <label htmlFor="topText" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Top Text <span className="text-xs text-gray-500">(will be embedded in your meme)</span>
            </label>
            <input
              type="text"
              id="topText"
              value={topText}
              onChange={(e) => setTopText(e.target.value)}
              placeholder="Add text to the top of your meme"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          {/* Bottom Text */}
          <div>
            <label htmlFor="bottomText" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Bottom Text <span className="text-xs text-gray-500">(will be embedded in your meme)</span>
            </label>
            <input
              type="text"
              id="bottomText"
              value={bottomText}
              onChange={(e) => setBottomText(e.target.value)}
              placeholder="Add text to the bottom of your meme"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          {/* AI Caption Generator */}
          <div>
            <button
              onClick={getAICaptionSuggestions}
              className="flex items-center w-full justify-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:from-purple-700 hover:to-pink-600 transition-colors duration-200"
            >
              <Wand2 size={18} className="mr-2" />
              Generate AI Caption
            </button>
          </div>
          
          {/* Text Formatting */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Text Formatting
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="fontFamily" className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                  Font
                </label>
                <select
                  id="fontFamily"
                  value={fontOptions.family}
                  onChange={(e) => setFontOptions({...fontOptions, family: e.target.value})}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="Impact">Impact</option>
                  <option value="Arial">Arial</option>
                  <option value="Comic Sans MS">Comic Sans</option>
                  <option value="Helvetica">Helvetica</option>
                  <option value="Times New Roman">Times New Roman</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="fontSize" className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                  Size
                </label>
                <select
                  id="fontSize"
                  value={fontOptions.size}
                  onChange={(e) => setFontOptions({...fontOptions, size: Number(e.target.value)})}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="30">Small</option>
                  <option value="40">Medium</option>
                  <option value="50">Large</option>
                  <option value="60">Extra Large</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="textColor" className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                  Text Color
                </label>
                <div className="flex items-center">
                <input
                  type="color"
                  id="textColor"
                  value={fontOptions.color}
                  onChange={(e) => setFontOptions({...fontOptions, color: e.target.value})}
                    className="w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                />
                  <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">{fontOptions.color}</span>
                </div>
              </div>
              
              <div>
                <label htmlFor="outlineColor" className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                  Outline Color
                </label>
                <div className="flex items-center">
                <input
                  type="color"
                  id="outlineColor"
                  value={fontOptions.outline}
                  onChange={(e) => setFontOptions({...fontOptions, outline: e.target.value})}
                    className="w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                  />
                  <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">{fontOptions.outline}</span>
                </div>
              </div>
              
              <div className="col-span-2">
                <label htmlFor="textAlign" className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                  Text Alignment
                </label>
                <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setFontOptions({...fontOptions, align: 'left'})}
                    className={`flex-1 py-2 px-4 ${fontOptions.align === 'left' ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300' : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                  >
                    Left
                  </button>
                  <button
                    type="button"
                    onClick={() => setFontOptions({...fontOptions, align: 'center'})}
                    className={`flex-1 py-2 px-4 ${fontOptions.align === 'center' ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300' : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                  >
                    Center
                  </button>
                  <button
                    type="button"
                    onClick={() => setFontOptions({...fontOptions, align: 'right'})}
                    className={`flex-1 py-2 px-4 ${fontOptions.align === 'right' ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300' : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                  >
                    Right
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tags (up to 5)
            </label>
            <div className="flex space-x-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                placeholder="Add tags"
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={handleAddTag}
                disabled={!tagInput || tags.length >= 5}
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-purple-600 text-white disabled:bg-purple-400 disabled:cursor-not-allowed"
              >
                <Plus size={20} />
              </button>
            </div>
            
            {/* Tags Display */}
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag, index) => (
                <div 
                  key={index}
                  className="flex items-center px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full"
                >
                  <Tag size={14} className="mr-1" />
                  <span>{tag}</span>
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 text-purple-700 dark:text-purple-300 hover:text-purple-900 dark:hover:text-purple-100"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4">
            <button
              onClick={handleSaveAsDraft}
              className="flex items-center justify-center px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              <Save size={18} className="mr-2" />
              Save as Draft
            </button>
            <button
              onClick={handlePublishMeme}
              disabled={!title || !imagePreview || isPublishing}
              className="flex-1 flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-purple-400 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isPublishing ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Publishing...
                </span>
              ) : (
                <>
                  <Send size={18} className="mr-2" />
                  Publish Meme
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {showToast.show && (
        <Toast 
          message={showToast.message} 
          type={showToast.type} 
        />
      )}
    </div>
  );
};

export default MemeCreator;