export const profile = {
  name: 'Your name',
  role: 'Full-stack web developer',
  headline: 'I build web apps from UI to database.',
  intro: 'Explore how I approach interfaces, APIs, and the data that connects them.',
  about: '',
  portrait: { src: '', position: '50% 45%', alt: 'Professional headshot' },
  email: '',
  github: '',
  linkedin: '',
  resume: '',
  contactForm: false,
};

export const projects = [
  {
    slug: 'task-board', title: 'Task Board', sample: true,
    summary: 'An illustrative workflow for organizing tasks and tracking progress.',
    role: 'Sample full-stack case study', stack: ['React', 'Express', 'MongoDB'],
    visual: ['Plan', 'In progress', 'Done'],
    problem: 'Show a team what needs attention and what has already shipped.',
    approach: 'Model each task as a document with a title and a status. Update the board after the API confirms the change.',
    outcome: 'Add your own results and screenshots here.',
    trace: [
      ['UI', 'The visitor moves a task to Done.'],
      ['API', 'The server validates the requested status change.'],
      ['Database', 'The task document is updated.'],
      ['Response', 'The UI receives the updated task and redraws the board.'],
    ],
  },
  {
    slug: 'metrics-dashboard', title: 'Metrics Dashboard', sample: true,
    summary: 'An illustrative dashboard for comparing activity across time periods.',
    role: 'Sample full-stack case study', stack: ['React', 'Node.js', 'MongoDB'],
    visual: ['Activity', 'Trends', 'Breakdown'],
    problem: 'Make activity trends easy to compare at a glance.',
    approach: 'Return aggregated counts from the API and display the selected period in the dashboard.',
    outcome: 'Add your own results and screenshots here.',
  },
];
