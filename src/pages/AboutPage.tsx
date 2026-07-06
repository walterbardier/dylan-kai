// import { User } from 'lucide-react'
import { GlassCard } from '../components/GlassCard'
import type { Lang } from '../types'

export function AboutPage({ lang }: { lang: Lang }) {
  const t = {
    tagLbl: lang === 'es' ? 'Sobre mí' : 'About',
    albumsLbl: lang === 'es' ? 'Álbumes' : 'Albums',
    activeLbl: lang === 'es' ? 'Activo desde' : 'Active Since',
    originLbl: lang === 'es' ? 'Origen' : 'Origin',
    bio: lang === 'es' ? [
      'Dylan Kai es un artista y productor independiente radicado en Montevideo, Uruguay. Su música existe en la intersección del pop electrónico, ambient y alternativo — un sonido que es profundamente personal y deliberadamente difícil de categorizar.',
      'Ha lanzado ocho proyectos desde 2021, cada uno con una identidad sónica distintiva pero unificados por un compromiso con la atmósfera, la emoción y el detalle. Desde la energía cósmica y de club en SPACE CLUB hasta la quietud meditativa de Towa, su rango habla de un artista en constante diálogo con su mundo interior.',
      'Su trabajo comienza con un solo concepto — una palabra, una sensación, un elemento visual — que se expande hacia un universo sonoro. Álbumes como cinephile y DIVINE LAW demuestran su capacidad conceptual, mientras que proyectos como Sally\'s Seams revelan una voz mucho más íntima y confesional.',
      'Dylan Kai produce, escribe y graba de forma 100% independiente, creando música que se siente artesanal y meditada en cada paso del proceso.'
    ] : [
      'Dylan Kai is an independent artist and producer based in Montevideo, Uruguay. His music exists at the intersection of electronic, ambient, and alternative pop — a sound that is deeply personal and deliberately difficult to categorize.',
      'Since 2021, he has released eight projects, each distinct in sonic identity yet unified by a commitment to atmosphere, emotion, and detail. From the cosmic club energy of SPACE CLUB to the meditative stillness of Towa, his range speaks to an artist constantly in dialogue with his inner world.',
      'His work begins with a single concept — a word, a feeling, a visual — that expands into a sonic universe. Albums like cinephile and DIVINE LAW demonstrate his capacity for conceptual depth, while projects like Sally\'s Seams reveal a more intimate, confessional voice.',
      'Dylan Kai produces, writes, and records entirely independently — creating music that feels handcrafted and deliberate at every step.'
    ],
    tags: lang === 'es' 
      ? ['Electrónica', 'Ambient', 'Pop Alt', 'Experimental', 'Cinemático', 'Lo-Fi', 'Indie', 'Productor']
      : ['Electronic', 'Ambient', 'Alt-Pop', 'Experimental', 'Cinematic', 'Lo-Fi', 'Indie', 'Producer']
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 max-w-[1000px] mx-auto">
      <p className="text-[10px] tracking-[0.45em] text-white/25 uppercase mb-4">
        {t.tagLbl}
      </p>
      
      <h1 className="font-black text-[clamp(3rem,8vw,7rem)] tracking-[-0.01em] mb-16" style={{ fontFamily: 'Raleway, sans-serif'}}>
        Dylan Kai
      </h1>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[60px] items-start">
        <div>
          <div 
            className="aspect-[3/4] rounded-[28px] overflow-hidden mb-6 border border-white/[0.07] flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, rgba(99,58,237,0.25), rgba(34,211,238,0.1), rgba(0,0,28,0.9))'
            }}
          >
            {/* <User size={72} style={{ color: 'rgba(255,255,255,0.07)' }} /> */}

            <img
              src="/images/profile/profile-1.jpg"
              alt="Dylan Kai"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[['8', t.albumsLbl], ['2021', t.activeLbl], ['URY', t.originLbl]].map(([val, label]) => (
              <GlassCard 
                key={label} 
                className="p-4 px-2 rounded-2xl text-center"
              >
                <p className="font-raleway font-extrabold text-[22px] text-white mb-1" style={{ fontFamily: 'Raleway, sans-serif'}}>
                  {val}
                </p>

                <p className="text-[11px] text-white/30 tracking-[0.06em]">
                  {label}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5 text-white/60 leading-[1.8] text-[15px]">
          {t.bio.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}

          <div className="flex flex-wrap gap-2 pt-3">
            {t.tags.map(tag => (
              <span 
                key={tag} 
                className="text-[11px] px-[14px] py-[5px] rounded-full bg-white/[0.05] border border-white/[0.09] text-white/50 tracking-[0.06em]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}