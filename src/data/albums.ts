import type { AlbumData } from '../types'

export const BUBBLE_POS = [
  { x: -148, y: -54 },
  { x: -120, y: -100 },
  { x: -78, y: -136 },
  { x: -28, y: -154 },
  { x: 28, y: -154 },
  { x: 78, y: -136 },
  { x: 120, y: -100 },
  { x: 148, y: -54 },
]

export const ALBUMS: AlbumData[] = [
  {
    id: 1, title: 'SPACE CLUB', year: 2022,
    cover: '../../public/images/album-1/album-1.jpg', bg: '../../public/images/album-1/album-1-bg.jpeg',
    era: {
      en: 'Neon Memories of Youth',
      es: 'Recuerdos Neon de la Juventud'
    },
    color: '#ff85dc',
    description: {
      en: "Written and produced by Dylan Kai starting at age 18, 'SPACE CLUB' is a conceptual debut exploring adolescence, love, loss, and the confusing transition into adulthood. Driven by emotional therapy, it contrasts melancholic shadows on tracks like '(DON'T BE SCARED)' with innocent tones on 'Hey!', reflecting the pressure of lost youth and finding purpose.",
      es: "Escrito y producido por Dylan Kai a partir de sus 18 años, 'SPACE CLUB' es un debut conceptual sobre la adolescencia, el amor, la pérdida y la confusa transición a la adultez. Nacido como terapia emocional, contrasta sombras melancólicas en temas como '(DON'T BE SCARED)' con tonos inocentes en 'Hey!', reflejando la presión de perder la juventud y la búsqueda de un propósito."
    },
    songs: [
      'Sixteen', 'Nobody Knows', 'Hey!', 'Falling', 'On The Top',
      'Ridiculous', "(DON'T BE SCARED)", "God's Things", 'Popstar', 'Honestly... How Ironic'
    ],
    tags: ['dream pop', 'nostalgia', 'cosmic'],

    gallery: [
      '../../public/images/album-1/album-1-bg.jpeg',
      '../../public/images/album-1/gallery-1.jpg',
      '../../public/images/album-1/gallery-2.png',
      '../../public/images/album-1/gallery-3.png',
      '../../public/images/album-1/gallery-4.png',
      '../../public/images/album-1/gallery-5.png',
      '../../public/images/album-1/gallery-6.png',
      '../../public/images/album-1/gallery-7.png',
      '../../public/images/album-1/gallery-8.png',
      '../../public/images/album-1/gallery-9.png',
      '../../public/images/album-1/gallery-10.png',
      '../../public/images/album-1/gallery-11.png',
      '../../public/images/album-1/gallery-12.png',
    ],
    spotifyLink: 'https://spotify.com/...',
    appleMusicLink: 'https://apple.com/...',
    youtubeLink: 'https://youtube.com/...',
  },
  {
    id: 2, title: 'Serial Killer', year: 2023,
    cover: '../../public/images/album-2/album-2.jpg', bg: '../../public/images/album-2/album-2-bg.jpg',
    era: {
      en: 'The Decay of Holy City',
      es: 'La Decadecia de Ciudad Santa'
    },
    color: '#f43f5e',
    description: {
      en: "Defined as 'a dramatic play that tells the story of this character through music', Serial Killer inquires about mental health while navigating a decadent city. Moving through alternative pop, it reflects on the fragility of life and habits, serving as a reminder of what lights our flame amidst the dark.",
      es: "Definido como 'una obra dramática que cuenta la historia de este personaje a través de la música', Serial Killer indaga en la salud mental recorriendo una ciudad decadente. Moviéndose por el pop alternativo, reflexiona sobre la fragilidad de la vida y los hábitos, recordando qué enciende nuestra llama en medio de la oscuridad."
    },
    songs: [
      'Be Free', 'Counter Strike', 'Serial Killer', 'Wasteland', 'Summertime',
      'You', 'Tripping To You', 'Throw It Up', 'Hope was worth it',
      '(porque estamos solos) - Interlude', 'Holy City', 'Dark Emotions',
      'Wallet', 'Lemonade', 'Icy', 'Melodramatic Flashes', 'AW'
    ],
    tags: ['alt-pop', 'dark', 'mental health'],

    gallery: [
      '../../public/images/album-2/album-2-bg.jpg',
      '../../public/images/album-2/gallery-1.jpg',
      '../../public/images/album-2/gallery-2.jpg',
      '../../public/images/album-2/gallery-3.jpg',
      '../../public/images/album-2/gallery-4.jpg',
      '../../public/images/album-2/gallery-5.jpg',
      '../../public/images/album-2/gallery-6.jpg',
      '../../public/images/album-2/gallery-7.jpg',
      '../../public/images/album-2/gallery-8.jpg',
      '../../public/images/album-2/gallery-9.jpg',
      '../../public/images/album-2/gallery-10.jpg',
    ],
    spotifyLink: 'https://spotify.com/...',
    appleMusicLink: 'https://apple.com/...',
    youtubeLink: 'https://youtube.com/...',
  },
  {
    id: 3, title: "Sally's Seams", year: 2023,
    cover: '../../public/images/album-3/album-3.jpg', bg: '../../public/images/album-3/album-3-bg.jpg',
    era: {
      en: 'Lessons from the Tower',
      es: 'Lecciones de la Torre'
    },
    color: '#101010',
    description: {
      en: "Deeply inspired by Sally from The Nightmare Before Christmas as a symbolic alter ego, this indie/folk project explores identity, emotional confinement, and vulnerability. Functioning as the reverse of Serial Killer, its raw, autumn-leaf texture reveals the 'seams'—the visible scars that break us yet keep us stitched together.",
      es: "Inspirado profundamente en Sally de The Nightmare Before Christmas como un alter ego simbólico, este proyecto indie/folk explora la identidad, el encierro emocional y la vulnerabilidad. Funcionando como el reverso de Serial Killer, su textura cruda otoñal muestra las 'costuras': las cicatrices visibles que nos rompen y a la vez nos mantienen unidos."
    },
    songs: [
      'Soft Atmosphere', 'The Tea', "Sally's Seams", "Money, Rage But I'm Sweet",
      'Open Road', 'Plaza Constitución', "Life isn't hard", 'Tell Me What You Want',
      'Van Gogh', 'Aquatic'
    ],
    tags: ['indie folk', 'alt rock', 'autumn'],

    gallery: [
      '../../public/images/album-3/album-3-bg.jpg',
      '../../public/images/album-3/gallery-1.jpg',
      '../../public/images/album-3/gallery-2.jpg',
      '../../public/images/album-3/gallery-3.jpg',
      '../../public/images/album-3/gallery-4.jpg',
      '../../public/images/album-3/gallery-5.jpg',
      '../../public/images/album-3/gallery-6.jpg',
      '../../public/images/album-3/gallery-7.jpg',
      '../../public/images/album-3/gallery-8.jpg',
      '../../public/images/album-3/gallery-9.jpg',
      '../../public/images/album-3/gallery-10.jpg',
      '../../public/images/album-3/gallery-11.jpg',
      '../../public/images/album-3/gallery-12.jpg',
      '../../public/images/album-3/gallery-13.jpg',
    ],
    spotifyLink: 'https://spotify.com/...',
    appleMusicLink: 'https://apple.com/...',
    youtubeLink: 'https://youtube.com/...',
  },
  {
    id: 4, title: 'Summer breeze guide me through these empty streets', year: 2024,
    cover: '../../public/images/album-4/album-4.jpg', bg: '../../public/images/album-4/album-4-bg.jpg',
    era: {
      en: 'Echoes of Fragmented Worlds',
      es: 'Ecos de Mundos Fragmentados'
    },
    color: '#383b90',
    description: {
      en: "Marking a bold evolution into dance-pop, house, and hints of techno, this album documents a profound personal deconstruction. It follows the journey of Dylan Kai as a ghost coming to terms with death and identity, dropping fear-driven facades to deliver a hypnotic, philosophical love letter to transformation and life.",
      es: "Marcando una audaz evolución hacia el dance-pop, el house y destellos de techno, este álbum documenta una profunda deconstrucción personal. Sigue el viaje de Dylan Kai como un fantasma aceptando la muerte y la identidad, dejando atrás personajes construidos por el miedo en una carta de amor filosófica a la transformación y la vida."
    },
    songs: [
      'Summer breeze guide me through these empty streets', 'make me dance', 'MOVIES',
      'estás? goodbye', 'toma todo de mí', 'TRUE ROMANCE', 'BAE!!!!', 'O.V.N.I',
      "i'm the god", 'toy solo en lo frío', 'find your way', '21NGULAR',
      'trust me again', 'fate', 'remember...'
    ],
    tags: ['dance pop', 'house', 'transformation'],

    gallery: [
      '../../public/images/album-4/album-4-bg.jpg',
      '../../public/images/album-4/gallery-1.jpg',
      '../../public/images/album-4/gallery-2.jpg',
      '../../public/images/album-4/gallery-3.jpg',
      '../../public/images/album-4/gallery-4.jpg',
      '../../public/images/album-4/gallery-5.jpg',
      '../../public/images/album-4/gallery-6.jpg',
      '../../public/images/album-4/gallery-7.png',
      '../../public/images/album-4/gallery-8.jpg',
      '../../public/images/album-4/gallery-9.jpg',
      '../../public/images/album-4/gallery-10.jpg',
      '../../public/images/album-4/gallery-11.png',
      '../../public/images/album-4/gallery-12.jpg',
      '../../public/images/album-4/gallery-13.png',
      '../../public/images/album-4/gallery-14.png',
      '../../public/images/album-4/gallery-15.jpg',
      '../../public/images/album-4/gallery-16.png',
      '../../public/images/album-4/gallery-17.png',
      '../../public/images/album-4/gallery-18.png',
      '../../public/images/album-4/gallery-19.png',
    ],
    spotifyLink: 'https://spotify.com/...',
    appleMusicLink: 'https://apple.com/...',
    youtubeLink: 'https://youtube.com/...',
  },
  {
    id: 5, title: 'Towa', year: 2026,
    cover: '../../public/images/album-5/album-5.jpg', bg: '../../public/images/album-5/album-5-bg.jpg',
    era: {
      en: 'Fragments of Eternity',
      es: 'Fragmentos de la Eternidad'
    },
    color: '#bfa5ff',
    description: {
      en: "A sister album to Summer Breeze..., Towa steps into a dreamscape suspended between time and memory. Born from pure subconscious meditative solitude, it blends tropical rhythms, ethereal guitars, and lavender-hued light to observe existence and self-love stripped of external beliefs.",
      es: "Álbum hermano de Summer Breeze..., Towa adentra al oyente en un paisaje onírico suspendido entre el tiempo y la memoria. Nacido de la soledad meditativa del subconsciente, entrelaza ritmos tropicales, guitarras etéreas y una luz color lavanda para cuestionar la existencia y el amor propio sin barreras externas."
    },
    songs: [
      'play pretend', 'declassified', 'waterproof', 'pretty naughty', 'take me away',
      'all over my body', 'Towa', 'my way', 'so dope', "you won't find that",
      'lose control', 'you never listened to me'
    ],
    tags: ['alternative', 'sexual', 'meditation'],

    gallery: [
      '../../public/images/album-5/album-5-bg.jpg',
      '../../public/images/album-5/gallery-1.jpg',
      '../../public/images/album-5/gallery-2.jpg',
      '../../public/images/album-5/gallery-3.jpg',
      '../../public/images/album-5/gallery-4.jpg',
      '../../public/images/album-5/gallery-5.jpeg',
      '../../public/images/album-5/gallery-6.jpg',
      '../../public/images/album-5/gallery-7.jpeg',
      '../../public/images/album-5/gallery-8.png',
      '../../public/images/album-5/gallery-9.jpg',
      '../../public/images/album-5/gallery-10.jpg',
      '../../public/images/album-5/gallery-11.jpg',
      '../../public/images/album-5/gallery-12.jpg',
      '../../public/images/album-5/gallery-13.jpg',
      '../../public/images/album-5/gallery-14.jpg',
    ],
    spotifyLink: 'https://spotify.com/...',
    appleMusicLink: 'https://apple.com/...',
    youtubeLink: 'https://youtube.com/...',
  },
  {
    id: 6, title: 'cinephile', year: 2026,
    cover: '../../public/images/album-6/album-6.jpg', bg: '../../public/images/album-6/album-6-bg.jpg',
    era: {
      en: 'The Broken Tape',
      es: 'La Cinta Rota'
    },
    color: '#919191',
    description: {
      en: "A profoundly visual project using cinema as a metaphor for escapism. It questions what happens when we prefer living inside the structured script of a film over reality's chaos. Tracks like 'cut the film' act as a director's call to stop acting, face our relationships, and distinguish genuine life from constructed fiction.",
      es: "Un proyecto profundamente visual que usa el cine como metáfora del escapismo. Cuestiona qué pasa cuando preferimos vivir dentro del guion estructurado de una película antes que en el caos de la realidad. Temas como 'cut the film' funcionan como la orden de un director para dejar de actuar y distinguir la vida real de la ficción."
    },
    songs: [
      'fireflies', 'bluest nights', 'i surrender', 'lost in the fog', 'treacherous tide',
      "what's a car for if there's nowhere to go?", "don't lie", 'to hold a man like me',
      'who hurt you like this', 'cut the film', "love me 'til i die", 'complementary'
    ],
    tags: ['synth pop', 'alt rock', 'escapism'],

    gallery: [
      '../../public/images/album-6/album-6-bg.jpg',
      '../../public/images/album-6/gallery-1.png',

    ],
    spotifyLink: 'https://spotify.com/...',
    appleMusicLink: 'https://apple.com/...',
    youtubeLink: 'https://youtube.com/...',
  },
  {
    id: 7, title: 'DIVINE LAW', year: 2027,
    cover: '../../public/images/album-7/album-7.jpeg', bg: '../../public/images/album-7/album-7-bg.jpg',
    era: {
      en: 'The Fallen Primordial',
      es: 'El Caido Primordial'
    },
    color: '#4f6c33',
    description: {
      en: "A therapeutic mythological epic set in a world punished by its gods. It narrates the legend of Dylan Kai—The Primordial Fallen—a demigod cast from the heavens into earthly waters by his father. His fall triggers a prophecy: not a final doom, but a rebellion to confront his lineage and birth the rebirth of a New Arcadia.",
      es: "Una epopeya mitológica terapéutica ambientada en un mundo castigado por sus dioses. Narra la leyenda de Dylan Kai —El Caído Primigenio—, un semidiós arrojado de los cielos a las aguas terrenales por su padre. Su caída activa una profecía: no un final destruido, sino una rebelión para reclamar justicia divina y forjar la Nueva Arcadia."
    },
    songs: [
      'Arcadia', 'call me Aphrodite', 'divine law', 'Sodom',
      'chameleon', 'malakos', 'Himeros', '⚖︎', 'should\'ve left', 'eschaton',
    ],
    tags: ['dark ambient', 'drone', 'rebirh', 'mythology'],
    
    gallery: [
      '../../public/images/album-7/album-7-bg.jpg',
      '../../public/images/album-7/gallery-1.jpg',
    ],
    spotifyLink: 'https://spotify.com/...',
    appleMusicLink: 'https://apple.com/...',
    youtubeLink: 'https://youtube.com/...',
  },
  {
    id: 8, title: '5 0 3', year: 2027,
    cover: '../../public/images/album-8/album-8.jpg', bg: '../../public/images/album-8/album-8-bg.jpg',
    era: {
      en: 'ERROR: 5 0 3 Simulation',
      es: 'ERROR: Simulación 5 0 3'
    },
    color: '#44447f',
    description: {
      en: "An existential sci-fi metaphor paralleling an AI discovering it lives inside simulation 5 0 3 with the real-world experience of moving out alone into apartment 503. As familiar routines vanish and memories feel programmed, the album asks the ultimate independence question: If my past was built by surroundings, who am I when starting from zero?",
      es: "Una metáfora existencial de ciencia ficción que compara a una IA descubriendo que vive en la simulación 5 0 3 con la experiencia real de mudarse al apartamento 503. A medida que las rutinas desaparecen, el álbum plantea la gran pregunta de la independencia: Si mi pasado lo construyó mi entorno, ¿quién soy al empezar de cero?"
    },
    songs: [
      "it's clear why", "the main course", "neo-realities", "h.e.a.r.t", "what am i now?", "is it for them?", 
      "to the sky", "mine", "bac bitch look", "walls of a simulation", "shot shot shot", "moving on",
    ],
    tags: ['dance pop', 'sci-fi', 'existential', 'identity'],

    gallery: [
      '../../public/images/album-8/album-8-bg.jpg',
      '../../public/images/album-8/gallery-1.jpg',
      '../../public/images/album-8/gallery-2.jpg',
      '../../public/images/album-8/gallery-3.jpg',
      '../../public/images/album-8/gallery-4.jpg',
      '../../public/images/album-8/gallery-5.jpg',
      '../../public/images/album-8/gallery-6.jpg',
      '../../public/images/album-8/gallery-7.jpg',
      '../../public/images/album-8/gallery-8.jpg',
      '../../public/images/album-8/gallery-9.jpg',
      '../../public/images/album-8/gallery-10.jpg',
    ],
    spotifyLink: 'https://spotify.com/...',
    appleMusicLink: 'https://apple.com/...',
    youtubeLink: 'https://youtube.com/...',
  },
]
