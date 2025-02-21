import { Song } from '../types';

export const songs: Song[] = [
  {
    id: '1',
    title: 'Clair de Lune',
    artist: 'Claude Debussy',
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Clair_de_Lune_-_Claude_Debussy.ogg',
    hints: [
      'This piece was composed in 1890',
      'The composer was French',
      'The title means "Moonlight" in French',
      'Part of the Suite bergamasque',
    ],
  },
  {
    id: '2',
    title: 'Für Elise',
    artist: 'Ludwig van Beethoven',
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Fur_Elise_by_Beethoven.ogg',
    hints: [
      'Composed in 1810',
      'The composer was German',
      'One of the most popular piano pieces ever written',
      'Named after a mysterious woman',
    ],
  },
  {
    id: '3',
    title: 'Gymnopédie No. 1',
    artist: 'Erik Satie',
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Erik_Satie_-_gymnopedia_no.1.ogg',
    hints: [
      'Composed in 1888',
      'The composer was French',
      'Known for its gentle, melancholic melody',
      'Part of a set of three compositions',
    ],
  },
  {
    id: '4',
    title: 'Nocturne in E-flat major, Op. 9 No. 2',
    artist: 'Frédéric Chopin',
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Chopin_Nocturne_Op.9_No.2.ogg',
    hints: [
      'Composed between 1830-1832',
      'The composer was Polish',
      'One of the most famous nocturnes ever written',
      'Known for its romantic and dreamy melody',
    ],
  },
  {
    id: '5',
    title: 'The Blue Danube',
    artist: 'Johann Strauss II',
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/The_Blue_Danube.ogg',
    hints: [
      'Composed in 1866',
      'The composer was Austrian',
      'Named after Europe\'s second-longest river',
      'One of the most famous waltzes ever written',
    ],
  },
  {
    id: '6',
    title: 'Rondo Alla Turca',
    artist: 'Wolfgang Amadeus Mozart',
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Mozart_-_Turkish_March.ogg',
    hints: [
      'Composed in 1783',
      'The composer was Austrian',
      'Also known as the Turkish March',
      'Final movement of Piano Sonata No. 11',
    ],
  },
];