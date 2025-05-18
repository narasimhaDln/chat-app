export const mockUsers = [
  {
    id: 'user-1',
    username: 'memequeen',
    email: 'queen@memes.com',
    password: 'password123', // In a real app, passwords would be hashed
    displayName: 'Meme Queen',
    avatarUrl: 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'I make the internet laugh daily. Meme enthusiast and creator of viral content.',
    createdAt: '2023-01-15T12:00:00Z',
    badges: ['Meme Maestro', '10k Views Club', 'First Viral Post'],
    stats: {
      totalMemes: 42,
      totalUpvotes: 15230,
      totalViews: 53900
    }
  },
  {
    id: 'user-2',
    username: 'dankmemer',
    email: 'dank@memes.com',
    password: 'password123',
    displayName: 'Dank Memer',
    avatarUrl: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Bringing you the dankest memes since 2015. Quality over quantity.',
    createdAt: '2023-02-20T14:30:00Z',
    badges: ['Weekly Winner', 'Trending Tag Creator'],
    stats: {
      totalMemes: 28,
      totalUpvotes: 9845,
      totalViews: 31200
    }
  },
  {
    id: 'user-3',
    username: 'memelord',
    email: 'lord@memes.com',
    password: 'password123',
    displayName: 'Meme Lord',
    avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Professional meme connoisseur. My memes will make your day better.',
    createdAt: '2023-03-10T09:15:00Z',
    badges: ['Consistent Creator', 'Comment King'],
    stats: {
      totalMemes: 35,
      totalUpvotes: 12100,
      totalViews: 42500
    }
  }
];

export const memeTemplates = [
  {
    id: 'template-1',
    name: 'Drake Hotline Bling',
    url: 'https://i.imgflip.com/30b1gx.jpg',
    popularity: 95
  },
  {
    id: 'template-2',
    name: 'Distracted Boyfriend',
    url: 'https://i.imgflip.com/1ur9b0.jpg',
    popularity: 90
  },
  {
    id: 'template-3',
    name: 'Two Buttons',
    url: 'https://i.imgflip.com/1g8my4.jpg',
    popularity: 85
  },
  {
    id: 'template-4',
    name: 'Change My Mind',
    url: 'https://i.imgflip.com/24y43o.jpg',
    popularity: 80
  },
  {
    id: 'template-5',
    name: 'Surprised Pikachu',
    url: 'https://i.imgflip.com/2kbn1e.jpg',
    popularity: 88
  },
  {
    id: 'template-6',
    name: 'Expanding Brain',
    url: 'https://i.imgflip.com/1jwhww.jpg',
    popularity: 75
  },
  {
    id: 'template-7',
    name: 'Woman Yelling at Cat',
    url: 'https://i.imgflip.com/345v97.jpg',
    popularity: 93
  },
  {
    id: 'template-8',
    name: 'Disaster Girl',
    url: 'https://i.imgflip.com/23ls.jpg',
    popularity: 86
  },
  {
    id: 'template-9',
    name: 'Hide the Pain Harold',
    url: 'https://i.imgflip.com/gk5el.jpg',
    popularity: 89
  },
  {
    id: 'template-10',
    name: 'Doge',
    url: 'https://i.imgflip.com/4t0m5.jpg',
    popularity: 92
  },
  {
    id: 'template-11',
    name: 'Roll Safe Think About It',
    url: 'https://i.imgflip.com/1h7in3.jpg',
    popularity: 84
  },
  {
    id: 'template-12',
    name: 'One Does Not Simply',
    url: 'https://i.imgflip.com/1bij.jpg',
    popularity: 87
  },
  {
    id: 'template-13',
    name: 'Success Kid',
    url: 'https://i.imgflip.com/1bhk.jpg',
    popularity: 82
  },
  {
    id: 'template-14',
    name: 'Confused Math Lady',
    url: 'https://i.imgflip.com/1otk96.jpg',
    popularity: 91
  },
  {
    id: 'template-15',
    name: 'Distracted Girlfriend',
    url: 'https://i.imgflip.com/1ur9b0.jpg',
    popularity: 83
  },
  {
    id: 'template-16',
    name: 'Evil Kermit',
    url: 'https://i.imgflip.com/1e7ql7.jpg',
    popularity: 81
  },
  {
    id: 'template-17',
    name: 'This Is Fine Dog',
    url: 'https://i.imgflip.com/wxica.jpg',
    popularity: 94
  },
  {
    id: 'template-18',
    name: 'Crying Cat',
    url: 'https://i.imgflip.com/2p3dw0.jpg',
    popularity: 85
  },
  {
    id: 'template-19',
    name: 'Debugging Programmer',
    url: 'https://i.imgflip.com/9vct.jpg',
    popularity: 96
  },
  {
    id: 'template-22',
    name: 'Code Review Feedback',
    url: 'https://i.imgflip.com/579q9h.jpg',
    popularity: 90
  },
  {
    id: 'template-23',
    name: 'My Code vs. Stack Overflow',
    url: 'https://learncodingusa.com/wp-content/uploads/2023/09/Top-30-Coding-Memes-That-Every-Developer-Can-Relate-To.jpeg',
    popularity: 91
  },
  {
    id: 'template-24',
    name: 'Code Review Feedback',
    url: 'https://cdn.pixabay.com/photo/2024/05/20/13/28/ai-generated-8775232_1280.png',
    popularity: 90
  },
  
  
];

export const mockMemes = [
  {
    id: 'meme-1',
    title: 'When the code finally works',
    imageUrl: 'https://images.pexels.com/photos/1174122/pexels-photo-1174122.jpeg?auto=compress&cs=tinysrgb&w=600',
    topText: 'When your code',
    bottomText: 'Finally works',
    creatorId: 'user-1',
    creatorUsername: 'memequeen',
    createdAt: '2023-06-15T08:20:00Z',
    votes: { upvotes: 426, downvotes: 12 },
    views: 1892,
    comments: [
      {
        id: 'comment-1',
        userId: 'user-2',
        username: 'dankmemer',
        text: 'Story of my life 😂',
        createdAt: '2023-06-15T09:35:00Z'
      },
      {
        id: 'comment-2',
        userId: 'user-3',
        username: 'memelord',
        text: 'That feeling when you find the missing semicolon...',
        createdAt: '2023-06-15T10:12:00Z'
      }
    ],
    tags: ['coding', 'relatable', 'programming']
  },
  {
    id: 'meme-2',
    title: 'Monday Mornings',
    imageUrl: 'https://images.pexels.com/photos/7163694/pexels-photo-7163694.jpeg?auto=compress&cs=tinysrgb&w=600',
    topText: 'Me on Monday',
    bottomText: 'After the weekend',
    creatorId: 'user-2',
    creatorUsername: 'dankmemer',
    createdAt: '2023-06-14T15:45:00Z',
    votes: { upvotes: 387, downvotes: 21 },
    views: 1537,
    comments: [
      {
        id: 'comment-3',
        userId: 'user-1',
        username: 'memequeen',
        text: 'I feel personally attacked 🤣',
        createdAt: '2023-06-14T16:30:00Z'
      }
    ],
    tags: ['monday', 'work', 'relatable', 'weekend']
  },
  {
    id: 'meme-3',
    title: 'Pizza Time',
    imageUrl: 'https://images.pexels.com/photos/2471171/pexels-photo-2471171.jpeg?auto=compress&cs=tinysrgb&w=600',
    topText: 'When someone says',
    bottomText: 'Let\'s order pizza',
    creatorId: 'user-3',
    creatorUsername: 'memelord',
    createdAt: '2023-06-13T19:10:00Z',
    votes: { upvotes: 512, downvotes: 8 },
    views: 2103,
    comments: [
      {
        id: 'comment-4',
        userId: 'user-2',
        username: 'dankmemer',
        text: 'Pizza is love, pizza is life',
        createdAt: '2023-06-13T20:25:00Z'
      },
      {
        id: 'comment-5',
        userId: 'user-1',
        username: 'memequeen',
        text: 'Pineapple belongs on pizza. Change my mind.',
        createdAt: '2023-06-13T21:05:00Z'
      },
      {
        id: 'comment-6',
        userId: 'user-3',
        username: 'memelord',
        text: 'Controversial but brave!',
        createdAt: '2023-06-13T21:30:00Z'
      }
    ],
    tags: ['food', 'pizza', 'mood']
  },
  {
    id: 'meme-4',
    title: 'Gaming All Night',
    imageUrl: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=600',
    topText: 'Just one more game',
    bottomText: '3 hours later...',
    creatorId: 'user-1',
    creatorUsername: 'memequeen',
    createdAt: '2023-06-12T22:30:00Z',
    votes: { upvotes: 478, downvotes: 15 },
    views: 1954,
    comments: [
      {
        id: 'comment-7',
        userId: 'user-3',
        username: 'memelord',
        text: 'Every. Single. Time.',
        createdAt: '2023-06-12T23:45:00Z'
      }
    ],
    tags: ['gaming', 'latenight', 'relatable']
  },
  {
    id: 'meme-5',
    title: 'Diet Plans',
    imageUrl: 'https://images.pexels.com/photos/1132558/pexels-photo-1132558.jpeg?auto=compress&cs=tinysrgb&w=600',
    topText: 'My diet plan',
    bottomText: 'Reality',
    creatorId: 'user-2',
    creatorUsername: 'dankmemer',
    createdAt: '2023-06-11T14:15:00Z',
    votes: { upvotes: 405, downvotes: 18 },
    views: 1782,
    comments: [
      {
        id: 'comment-8',
        userId: 'user-1',
        username: 'memequeen',
        text: 'The struggle is real 😅',
        createdAt: '2023-06-11T15:20:00Z'
      },
      {
        id: 'comment-9',
        userId: 'user-3',
        username: 'memelord',
        text: 'This is why I don\'t make diet plans anymore',
        createdAt: '2023-06-11T16:35:00Z'
      }
    ],
    tags: ['food', 'diet', 'relatable', 'funny']
  }
];

export const aiSuggestedCaptions = [
  {
    topText: "Trying to eat healthy",
    bottomText: "Accidentally orders a large pizza"
  },
  {
    topText: "When you finally understand the code",
    bottomText: "It stops working again"
  },
  {
    topText: "When the professor says 'no extensions'",
    bottomText: "Me submitting it 1 minute late anyway"
  },
  {
    topText: "Monday motivation",
    bottomText: "Still lying in bed at 10 AM"
  },
  {
    topText: "Downloading one more app",
    bottomText: "Phone storage full"
  },
  {
    topText: "Studying all night",
    bottomText: "The question is from the only page I skipped"
  },
  {
    topText: "Trying to focus at work",
    bottomText: "Brain: let's replay that awkward moment from 2012"
  },
  {
    topText: "When autocorrect changes 'lol' to 'LOL'",
    bottomText: "Now I sound insane"
  },
  {
    topText: "Opening the fridge for the 10th time",
    bottomText: "Still nothing new in there"
  },
  {
    topText: "When you say 'I'm fine'",
    bottomText: "But you're listening to sad music in the dark"
  },
  {
    topText: "Why go to therapy",
    bottomText: "When you can just start a podcast"
  },
  {
    topText: "Gym membership in January",
    bottomText: "Canceling it in February"
  },
  {
    topText: "Buying a new notebook",
    bottomText: "Just to never use it again after page 2"
  },
  {
    topText: "Laptop fan turns on",
    bottomText: "Flight mode activated"
  },
  {
    topText: "When the code finally works",
    bottomText: "But you don't know why"
  },
  {
    topText: "Having 1000 unread emails",
    bottomText: "Still refreshing Gmail like it’s fun"
  },
  {
    topText: "Asking for help online",
    bottomText: "Realizing I made a typo in the first line"
  },
  {
    topText: "New Year's resolution",
    bottomText: "Lasted 3 days"
  },
  {
    topText: "Takes a break for 5 minutes",
    bottomText: "3 hours later…"
  },
  {
    topText: "Trying to save money",
    bottomText: "‘Treat yourself’ every other day"
  },
  {
    topText: "When the group chat says 'let’s meet at 6'",
    bottomText: "I start getting ready at 6"
  },
  {
    topText: "That one drawer in the house",
    bottomText: "Full of everything and nothing"
  },
  {
    topText: "Set 10 alarms",
    bottomText: "Still oversleep"
  },
  {
    topText: "Updating software",
    bottomText: "Regretting it immediately"
  },
  {
    topText: "Getting 1 notification",
    bottomText: "It's just battery low"
  },
  {
    topText: "When you're trying to be productive",
    bottomText: "But end up reorganizing your desktop instead"
  },
  {
    topText: "When the internet goes down for 5 minutes",
    bottomText: "Time to rethink my life choices"
  },
  {
    topText: "Googles one error",
    bottomText: "Ends up rewriting the whole codebase"
  },
  {
    topText: "That moment when you hit 'Reply All'",
    bottomText: "Instant regret"
  },
  {
    topText: "Takes one online course",
    bottomText: "Now I'm a certified expert in my head"
  },
  {
    topText: "Every time I open a new tab",
    bottomText: "Forget what I came for"
  },
  {
    topText: "When Spotify plays your favorite song",
    bottomText: "And you're suddenly in a music video"
  },
  {
    topText: "‘Quick question’ from the boss",
    bottomText: "Lasts 45 minutes"
  },
  {
    topText: "Drinks water once",
    bottomText: "Health guru now"
  },
  {
    topText: "One unread message",
    bottomText: "Me ignoring it for 3 days"
  },
  {
    topText: "When the Zoom call ends",
    bottomText: "And you stare into the void"
  },
  {
    topText: "Trying to relax on the weekend",
    bottomText: "But deadlines say no"
  },
  {
    topText: "Buys a fancy planner",
    bottomText: "Never opens it again"
  },
  {
    topText: "When you hear 'Let's circle back on that'",
    bottomText: "Translation: Never talking about this again"
  },
  {
    topText: "Phone battery at 1%",
    bottomText: "Suddenly becomes a survival game"
  },
  {
    topText: "Googles symptoms once",
    bottomText: "Now I have 4 terminal illnesses"
  },
  {
    topText: "Accidentally clicks on ‘update now’",
    bottomText: "There goes my afternoon"
  },
  {
    topText: "Sets 3 alarms for the morning",
    bottomText: "Still snoozes all of them"
  },
  {
    topText: "Takes notes in class",
    bottomText: "Can’t read them later"
  },
  {
    topText: "Online shopping at 3 AM",
    bottomText: "Immediate buyer's remorse"
  },
  {
    topText: "Watches one DIY video",
    bottomText: "Thinks I can renovate the whole house"
  },
  {
    topText: "Tries to take a nap",
    bottomText: "Brain starts replaying every embarrassing moment"
  },
  {
    topText: "When you open a group chat",
    bottomText: "200 new messages and none of them make sense"
  },
  {
    topText: "Trying to eat one chip",
    bottomText: "Finishes the whole bag"
  },
  {
    topText: "Says 'I'm going to bed early tonight'",
    bottomText: "Still scrolling at 2 AM"
  }

];

export const popularTags = [
  { name: 'relatable', count: 245 },
  { name: 'funny', count: 198 },
  { name: 'gaming', count: 156 },
  { name: 'food', count: 134 },
  { name: 'coding', count: 122 },
  { name: 'monday', count: 89 },
  { name: 'weekend', count: 76 },
  { name: 'work', count: 65 }
];