import type { Track, TrackId } from './types';

// Tracks are presented like "sets" / albums: each has generative cover art.
export const TRACKS: Track[] = [
  {
    id: 'internet',
    name: 'The Internet',
    tagline: 'How a click crosses the planet',
    description:
      'Clients, servers, requests and the plumbing — DNS, IP addresses, HTTP — that moves every byte you see.',
    unlockLevel: 1,
    cover: ['#FF5A1F', '#FFB800'],
    pattern: 'orbit',
  },
  {
    id: 'web',
    name: 'How Websites Work',
    tagline: 'From markup to moving parts',
    description:
      'HTML, CSS, JavaScript and the DOM — the three languages of the browser and how pages come alive.',
    unlockLevel: 1,
    cover: ['#3D8BFF', '#22D3EE'],
    pattern: 'grid',
  },
  {
    id: 'programming',
    name: 'Programming Fundamentals',
    tagline: 'The grammar every language shares',
    description:
      'Variables, functions, conditions, loops and data — the handful of ideas that all software is built from.',
    unlockLevel: 2,
    cover: ['#2BD97C', '#0F766E'],
    pattern: 'stripes',
  },
  {
    id: 'ai',
    name: 'AI & Modern Software',
    tagline: 'What is actually inside the chatbot',
    description:
      'Models, tokens, prompts, embeddings and agents — demystified without the hype.',
    unlockLevel: 3,
    cover: ['#B57BFF', '#FF5AA8'],
    pattern: 'waves',
  },
  {
    id: 'apis',
    name: 'APIs & Integrations',
    tagline: 'How software talks to software',
    description:
      'Endpoints, methods, status codes, JSON and webhooks — the contracts that let apps plug into each other.',
    unlockLevel: 3,
    cover: ['#FFB800', '#FF5A1F'],
    pattern: 'rings',
  },
  {
    id: 'data',
    name: 'Databases & Data',
    tagline: 'Where everything is remembered',
    description:
      'Tables, rows, keys, queries and transactions — how apps store information so it is still there tomorrow.',
    unlockLevel: 4,
    cover: ['#22D3EE', '#3D8BFF'],
    pattern: 'blocks',
  },
  {
    id: 'architecture',
    name: 'Software Architecture',
    tagline: 'How the big pieces fit',
    description:
      'Services, modules, auth, encryption and the trade-offs behind how real systems are shaped.',
    unlockLevel: 5,
    cover: ['#FF4D6A', '#B57BFF'],
    pattern: 'diagonal',
  },
  {
    id: 'workflow',
    name: 'Developer Workflow',
    tagline: 'How code gets shipped',
    description:
      'Git, branches, pull requests, tests, CI/CD and deployments — the daily life of a software team.',
    unlockLevel: 6,
    cover: ['#E5E5E0', '#7A7A80'],
    pattern: 'dots',
  },
];

export const TRACK_BY_ID: Record<TrackId, Track> = Object.fromEntries(
  TRACKS.map((t) => [t.id, t]),
) as Record<TrackId, Track>;
