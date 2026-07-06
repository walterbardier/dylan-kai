import { Play, ArrowRight, Calendar, Clock } from 'lucide-react'
import { GlassCard } from '../components/GlassCard'
import { ALBUMS } from '../data/albums'
import { POSTS } from '../data/posts'
import type { Navigate, Lang } from '../types'

export function HomePage({ navigate, lang }: { navigate: Navigate; lang: Lang }) {
  const marqueeItems = ['AMBIENT', 'ELECTRONIC', 'COSMIC', 'EXPERIMENTAL', 'ALT-POP', 'CINEMATIC', 'INDIE', 'LO-FI', 'PRODUCER', 'MONTEVIDEO']

  const t = {
    location: 'Fray Bentos · Uruguay',
    subtitle: lang === 'es' ? 'Artista · Productor · Músico' : 'Artist · Producer · Musician',
    listen: lang === 'es' ? 'Escuchar Ahora' : 'Listen Now',
    albumsBtn: lang === 'es' ? 'Álbumes' : 'Albums',
    scroll: 'SCROLL',
    latestLbl: lang === 'es' ? 'Último Lanzamiento' : 'Latest Release',
    exploreAlbum: lang === 'es' ? 'Explorar Álbum' : 'Explore Album',
    discography: lang === 'es' ? 'Discografía' : 'Discography',
    viewAll: lang === 'es' ? 'Ver Todos' : 'View All',
    quote: lang === 'es' 
      ? 'Cada álbum es el génesis de un Big Bang — un estallido que prolonga mi universo y fecunda galaxias donde habito, simultáneamente, en cada una de sus estrellas.' 
      : 'Each album is the genesis of a Big Bang — an explosion that expands my universe and gives birth to new galaxies, where I dwell in every one of them simultaneously.',
    blogLbl: lang === 'es' ? 'Desde el Blog' : 'From the Blog',
    allPosts: lang === 'es' ? 'Todos los artículos' : 'All Posts'
  }

  const latestAlbum = ALBUMS[7] || ALBUMS[ALBUMS.length - 1]

  return (
    <div>
      <section
        style={{
          minHeight: '100vh', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{
            position: 'absolute', top: '30%', left: '40%',
            width: 700, height: 700, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,58,237,0.22) 0%, transparent 70%)',
            filter: 'blur(40px)',
            animation: 'nebulaDrift 18s ease-in-out infinite',
          }} />
          <div style={{
            position: 'absolute', top: '50%', right: '20%',
            width: 400, height: 400, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(244,63,94,0.12) 0%, transparent 70%)',
            filter: 'blur(50px)',
            animation: 'nebulaDrift 24s ease-in-out infinite reverse',
          }} />
          <div style={{
            position: 'absolute', bottom: '20%', left: '15%',
            width: 300, height: 300, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(34,211,238,0.1) 0%, transparent 70%)',
            filter: 'blur(50px)',
            animation: 'nebulaDrift 30s ease-in-out infinite',
          }} />
        </div>

        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 24px' }}>
          <p className="text-[11px] tracking-[0.45em] text-white/30 uppercase mb-9 font-normal">
            {t.location}
          </p>

          <h1 style={{fontFamily: 'Raleway, sans-serif'}}
          className="font-black text-[clamp(3.5rem,13vw,13rem)] tracking-[0.1em] leading-none mb-7 bg-clip-text text-transparent bg-gradient-to-br from-white via-[#c4b5fd] to-[#93c5fd]">
            DYLAN KAI
          </h1>

          <p className="text-white/40 text-[14px] tracking-[0.3em] mb-[52px] font-light">
            {t.subtitle}
          </p>

          <div className="flex items-center justify-center gap-3">
            {/* Botón Principal (Listen) */}
            <button
              onClick={() => navigate('music')}
              className="flex items-center gap-2 px-7 py-3 rounded-full bg-[rgba(99,58,237,0.35)] backdrop-blur-md border border-[rgba(99,58,237,0.5)] text-white text-[13px] tracking-[0.08em] transition-all duration-200 hover:scale-[1.04] hover:shadow-[0_0_32px_rgba(99,58,237,0.5)]"
            >
              <Play size={13} fill="currentColor" /> {t.listen}
            </button>

            {/* Botón Secundario (Albums) */}
            <button
              onClick={() => navigate('albums')}
              className="flex items-center gap-2 px-7 py-3 rounded-full bg-white/[0.05] backdrop-blur-md border border-white/[0.12] text-white/60 text-[13px] tracking-[0.08em] transition-colors duration-200 hover:text-white hover:border-white/25"
            >
              {t.albumsBtn} <ArrowRight size={13} />
            </button>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/[0.18]">
          <span className="text-[9px] tracking-[0.5em] uppercase">
            {t.scroll}
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/20 to-transparent" />
        </div>
      </section>

      <div className="overflow-hidden py-7 border-y border-white/[0.05]">
        <div className="flex w-max">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span 
              key={i} 
              className="px-8 text-[11px] tracking-[0.4em] text-white/20 font-semibold"
            >
              {item} <span className="text-white/[0.08] ml-8">·</span>
            </span>
          ))}
        </div>
      </div>

      {latestAlbum && (
        <section className="py-24 px-6 max-w-[1100px] mx-auto">
          <p className="text-[10px] tracking-[0.45em] text-white/25 uppercase mb-12">
            {t.latestLbl}
          </p>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-16 items-center">
            {/* Columna de la Imagen */}
            <div className="relative max-w-[380px]">
              <div 
                className="absolute inset-[-24px] rounded-[32px] blur-[60px] opacity-[0.18]"
                style={{ background: latestAlbum.color }}
              />
              <div 
                className="relative rounded-[28px] overflow-hidden aspect-square border"
                style={{ 
                  background: `linear-gradient(135deg, ${latestAlbum.color}30, #000018)`,
                  borderColor: `${latestAlbum.color}25` 
                }}
              >
                <img
                  src={latestAlbum.cover} 
                  alt={latestAlbum.title}
                  className="w-full h-full object-cover"
                  onError={e => e.currentTarget.style.display = 'none'}
                />
              </div>
            </div>

            {/* Columna de Información */}
            <div>
              <span className="text-[10px] tracking-[0.35em] text-white/25 uppercase">
                {latestAlbum.era[lang]}
              </span>
              
              <h2 className="font-raleway font-black text-[clamp(2.5rem,5vw,4rem)] mt-2.5 mb-3 tracking-tight text-white"
              style={{fontFamily: 'Raleway, sans-serif'}}>
                {latestAlbum.title}
              </h2>

              <p className="text-white/25 text-[13px] mb-5">{latestAlbum.year}</p>

              <p className="text-white/60 leading-[1.75] mb-7 text-[15px]">
                {latestAlbum.description[lang]}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {latestAlbum.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="text-[11px] px-3 py-1 rounded-full border tracking-[0.06em]"
                    style={{ 
                      background: `${latestAlbum.color}18`,
                      color: latestAlbum.color,
                      borderColor: `${latestAlbum.color}35`
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Botón Explorar */}
              <button
                onClick={() => navigate('album-detail', latestAlbum)}
                className="flex items-center gap-2 text-[13px] tracking-[0.06em] transition-[gap] duration-200 hover:gap-3.5"
                style={{ color: latestAlbum.color }}
              >
                {t.exploreAlbum} <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </section>
      )}

      <section className="px-6 pb-24 max-w-[1100px] mx-auto">
        <div className="flex items-center justify-between mb-10">
          <p className="text-[10px] tracking-[0.45em] text-white/25 uppercase">
            {t.discography}
          </p>
          <button
            onClick={() => navigate('albums')}
            className="flex items-center gap-1.5 text-[11px] tracking-[0.1em] text-white/30 transition-colors hover:text-white/60"
          >
            {t.viewAll} <ArrowRight size={11} />
          </button>
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5">
          {ALBUMS.slice(0, 4).map(album => (
            <button
              key={album.id}
              onClick={() => navigate('album-detail', album)}
              className="group text-left p-0 border-none bg-transparent cursor-pointer"
            >
              <div 
                className="relative rounded-[20px] overflow-hidden aspect-square mb-3 border transition-all"
                style={{ 
                  background: `linear-gradient(135deg, ${album.color}25, #000018)`,
                  borderColor: `${album.color}18`
                }}
              >
                <img
                  src={album.cover} 
                  alt={album.title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                  onError={e => e.currentTarget.style.display = 'none'}
                />
              </div>
              <p className="text-[13px] font-semibold text-white mb-0.5 truncate">
                {album.title}
              </p>
              <p className="text-[11px] text-white/28">
                {album.year}
              </p>
            </button>
          ))}
        </div>
      </section>

      <section className="py-[72px] px-6 max-w-[720px] mx-auto text-center border-y border-white/[0.05]">
        <p className="text-[72px] text-white/[0.04] font-serif leading-none -mb-6">
          &ldquo;
        </p>
        
        <p className="font-raleway font-light text-[clamp(1.3rem,3vw,2rem)] leading-[1.65] text-white/65"
        style={{fontFamily: 'Raleway, sans-serif', fontStyle: 'italic'}}>
          {t.quote}
        </p>

        <p className="mt-6 text-[12px] tracking-[0.3em] text-white/[0.22]">
          — Dylan Kai
        </p>
      </section>

      <section className="py-20 px-6 max-w-[1100px] mx-auto">
        <div className="flex items-center justify-between mb-10">
          <p className="text-[10px] tracking-[0.45em] text-white/25 uppercase">
            {t.blogLbl}
          </p>
          <button
            onClick={() => navigate('blog')}
            className="flex items-center gap-1.5 text-[11px] text-white/30 transition-colors hover:text-white/60"
          >
            {t.allPosts} <ArrowRight size={11} />
          </button>
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
          {POSTS.slice(0, 3).map((post) => {
            const rel = post.albumId ? ALBUMS.find((a) => a.id === post.albumId) : null;
            
            // Acceso seguro a los datos según el idioma
            const title = post.title[lang as Lang];
            const excerpt = post.excerpt[lang as Lang];

            return (
              <GlassCard
                key={post.id}
                // 'group' permite que los hijos reaccionen al hover del padre
                className="group p-6 rounded-[20px] cursor-pointer transition-transform duration-300 hover:-translate-y-2"
                onClick={() => navigate('blog')}
              >
                {/* Badge de Categoría */}
                <span
                  className="inline-block text-[10px] px-[10px] py-[3px] rounded-full mb-4 tracking-[0.05em] truncate border transition-colors"
                  style={{
                    background: rel ? `${rel.color}18` : 'rgba(255,255,255,0.07)',
                    color: rel ? rel.color : 'rgba(255,255,255,0.45)',
                    borderColor: rel ? `${rel.color}35` : 'rgba(255,255,255,0.1)',
                  }}
                >
                  {post.category}
                </span>

                {/* Título con efecto al hacer hover sobre la tarjeta */}
                <h3 className="font-raleway font-bold text-[15px] mb-2.5 text-white transition-colors duration-300 group-hover:text-blue-300">
                  {title}
                </h3>

                {/* Excerpt con line-clamp */}
                <p className="text-[13px] text-white/42 leading-relaxed mb-4 line-clamp-2">
                  {excerpt}
                </p>

                <div className="flex items-center gap-3 text-[11px] text-white/22">
                  <span className="flex items-center gap-1">
                    <Calendar size={10} /> {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={10} /> {post.readTime}
                  </span>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </section>
    </div>
  )
}