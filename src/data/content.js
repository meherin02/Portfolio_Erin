// All portfolio content lives here. Edit this file to update the site.

export const site = {
  url: 'https://portfoliomeherin.vercel.app',
  title: 'Meherin Jahan | Full-Stack MERN Developer',
  description:
    "Explore Meherin Jahan's developer portfolio, featuring web development projects, technical skills, and experience in building modern web applications.",
};

export const profile = {
  name: 'Meherin Jahan',
  role: 'Full-Stack MERN Developer',
  status: 'Open to opportunities',
  intro:
    "I'm a fourth-year Computer Science and Engineering student and an early-career MERN developer. I enjoy solving problems and turning ideas into websites people can use.",
  about: [
    'I like taking a problem apart and building something that makes it easier to solve. That is what drew me to web development: every project starts with something that is awkward to do by hand and ends with a small, working product.',
    "I'm learning full-stack development through hands-on projects, from a workout planner to a platform for finding volunteer events. Each project gives me a chance to try something new and get better at building for the web.",
    'My toolkit centers on the MERN stack — React and Next.js on the frontend, Node and Express behind it, MongoDB underneath. I care about the details users feel: responsive layouts, clear interfaces, and data that flows cleanly from server to screen.',
  ],
  education: {
    field: 'Computer Science & Engineering',
    detail: 'Fourth-year undergraduate',
  },
  location: 'Bangladesh',
  portrait: { src: '/meherin-jahan.jpg', position: '50% 45%', alt: 'Portrait of Meherin Jahan' },
  email: 'meherjan0201@gmail.com',
  github: 'https://github.com/meherin02',
  linkedin: 'https://www.linkedin.com/in/meherin-jahan',
  resume: 'https://drive.google.com/file/d/1Ft6RJDhgbKGiB5BimMErOjOMLmjoB8Te/view?usp=drivesdk',
  // Set to true only when the Express + MongoDB contact API (server.js) is
  // running behind this site. Otherwise the form falls back to the visitor's
  // own email client via a pre-filled mailto link.
  contactForm: false,
};

// Rotating hero phrases — kept grounded in the real projects below.
export const heroPhrases = [
  'full-stack web apps',
  'REST APIs with Node and Express',
  'data-driven interfaces',
  'responsive React UIs',
];

export const skillGroups = [
  { title: 'Frontend', skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML5', 'CSS3'] },
  { title: 'Backend & APIs', skills: ['Node.js', 'Express', 'BetterAuth', 'REST APIs'] },
  { title: 'Databases & Services', skills: ['MongoDB', 'Supabase'] },
  { title: 'Languages', skills: ['JavaScript', 'TypeScript', 'Python'] },
  { title: 'Tools & Platforms', skills: ['Git', 'GitHub', 'Vite', 'Vercel'] },
];

// Categories must stay in sync with the filter list in Projects.jsx.
export const projectCategories = ['All', 'Full-Stack', 'Frontend', 'Data Viz'];

export const projects = [
  {
    slug: 'community-events',
    title: 'Community Events',
    category: 'Full-Stack',
    role: 'Full-stack project',
    summary:
      'A volunteering platform where people can discover, organize, and join local community service events.',
    features: [
      'Find upcoming volunteering opportunities.',
      'Create and manage community service events.',
      'Register to join an event through the platform.',
    ],
    image: '/project-screenshots/community-events.png',
    imageAlt: 'Community Events homepage with links to find and organize volunteer events',
    stack: ['Next.js', 'Express', 'MongoDB', 'BetterAuth'],
    problem:
      'Help people find local volunteering opportunities and give organizers a place to manage their events.',
    approach:
      'A responsive Next.js frontend connects to an Express and MongoDB API for event management and registrations.',
    live: 'https://communityevents-mauve.vercel.app/',
    source: 'https://github.com/meherin02/b14_a8_client_meherin',
  },
  {
    slug: 'terrapulse-ai',
    title: 'TerraPulse AI',
    category: 'Data Viz',
    role: 'Team project',
    summary:
      'A Team Neurastra project that uses NASA POWER data to explore how air temperatures around Dhaka have changed over time.',
    features: [
      'Compare air temperature and precipitation trends across locations in Bangladesh.',
      'Choose the location, variable, and range of years to investigate.',
      'Review trend estimates, confidence intervals, and explanations alongside the charts.',
    ],
    image: '/project-screenshots/terrapulse-ai.png',
    imageAlt: 'TerraPulse AI trend explorer showing investigation filters and statistical results',
    stack: ['NASA POWER data', 'Data visualization'],
    problem: 'Make long-term temperature records easier to explore and interpret.',
    approach:
      'The prototype lets users compare time periods through interactive charts, trend estimates, and explanations of statistical uncertainty.',
    live: 'https://terrapulseaiteamneurastra.vercel.app/',
    source: 'https://github.com/meherin02/terrapulse_ai_team_neurastra',
  },
  {
    slug: 'fitlog',
    title: 'FitLog',
    category: 'Frontend',
    role: 'Web development project',
    summary:
      'A responsive workout planner for browsing exercises, building a daily routine, and tracking completed sets.',
    features: [
      'Browse a library of twelve lifts organized around major muscle groups.',
      'Save exercises and add them to a daily workout plan.',
      'Log sets and track what you have completed.',
    ],
    image: '/project-screenshots/fitlog.png',
    imageAlt: 'FitLog workout planner homepage and exercise library',
    stack: ['Next.js', 'Tailwind CSS'],
    problem: 'Give people one place to choose exercises and keep track of a workout.',
    approach: 'The exercise library feeds into a daily planner so users can pick lifts and log sets as they train.',
    live: 'https://b14a6meherin.vercel.app/',
    source: 'https://github.com/meherin02/B14_A6_Meherin',
  },
  {
    slug: 'bazardor',
    title: 'BazarDor',
    category: 'Frontend',
    role: 'Web development project',
    summary:
      'A Bengali-language grocery price tracker for checking essentials and comparing prices across markets.',
    features: [
      'Browse grocery categories and prices in Bangla.',
      'Filter products and sort by price.',
      'Compare listings across markets and see which prices moved up or down.',
    ],
    image: '/project-screenshots/bazardor.png',
    imageAlt: 'BazarDor homepage showing grocery categories and prices in Bangla',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase'],
    problem: 'Make everyday grocery prices easier to look up and compare in Bangla.',
    approach: 'Shoppers can filter products by category, sort by price, and compare market listings.',
    live: 'https://b14-assignment7-meherin.vercel.app/',
    source: 'https://github.com/meherin02/b14_assignment7_meherin',
  },
];
