import { useState } from 'react'
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react'
import { GlassCard } from '../components/GlassCard'
import { ALBUMS } from '../data/albums'
import { POSTS } from '../data/posts'
import type { Navigate, Lang } from '../types'
import { isColorDark, lightenColor } from '../utils/colors';


export function BlogPage({ navigate, lang }: { navigate: Navigate; lang: Lang }) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const usedCategories = Array.from(new Set(POSTS.map(p => p.category)))
  const filtered = activeCategory ? POSTS.filter(p => p.category === activeCategory) : POSTS

  const t = {
    tagLbl: lang === 'es' ? 'Bitácora' : 'Journal',
    title: 'Blog',
    allBtn: lang === 'es' ? 'Todos' : 'All',
    viewAlbum: lang === 'es' ? 'Ver álbum' : 'View album',
    readMore: lang === 'es' ? 'Leer artículo' : 'Read article'
  }

  return (
    <div style={{ minHeight: '100vh', padding: '96px 24px 80px', maxWidth: 860, margin: '0 auto' }} className='select-none'>
      {/* Etiqueta superior */}
      <p className="text-[10px] tracking-[0.45em] text-white/25 uppercase mb-4">
        {t.tagLbl}
      </p>

      {/* Título */}
      <h1 className="font-['Raleway'] font-black text-[clamp(3rem,8vw,7rem)] tracking-[-0.01em] mb-12">
        {t.title}
      </h1>

      {/* Filtros de Categorías */}
      <div className="flex flex-wrap gap-2 mb-12">
        <button
          onClick={() => setActiveCategory(null)}
          className={`
            text-[11px] px-4 py-1.5 rounded-full cursor-pointer transition-all duration-300 
            tracking-[0.05em] border ease-out
            /* Efecto de elevación e iluminación al hacer hover */
            hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)]
            ${!activeCategory 
              ? 'bg-white/14 border-white/20 text-white shadow-md' 
              : 'bg-white/4 border-white/8 text-white/45 hover:bg-white/10 hover:border-white/20'
            }
          `}
        >
          {t.allBtn}
        </button>

        {usedCategories.map((cat) => {
          const rel = ALBUMS.find((a) => a.title === cat);
          const isActive = activeCategory === cat;
          
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(isActive ? null : cat)}
              className={`
                text-[11px] px-4 py-1.5 rounded-full cursor-pointer max-w-[180px] 
                overflow-hidden text-ellipsis whitespace-nowrap transition-all duration-300 
                tracking-[0.05em] border ease-out
                /* Efecto de elevación e iluminación al hacer hover */
                hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)]
              `}
              style={{
                // Fondo: iluminado al hacer hover, opaco al estar activo
                backgroundColor: isActive 
                  ? (rel ? `${rel.color}47` : 'rgba(99,58,237,0.28)') 
                  : 'rgba(255,255,255,0.04)',
                // Borde
                borderColor: isActive 
                  ? (rel ? `${rel.color}80` : 'rgba(99,58,237,0.5)') 
                  : 'rgba(255,255,255,0.08)',
                // Color de texto
                color: isActive 
                  ? (rel ? rel.color : '#c4b5fd') 
                  : 'rgba(255,255,255,0.45)',
              }}
              // El evento onMouseEnter permite aplicar el color del álbum al hacer hover
              onMouseEnter={(e) => {
                if (!isActive && rel) {
                  e.currentTarget.style.backgroundColor = `${rel.color}15`;
                  e.currentTarget.style.borderColor = `${rel.color}40`;
                  e.currentTarget.style.color = rel.color;
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.45)';
                }
              }}
            >
              {cat.length > 22 ? cat.slice(0, 20) + '…' : cat}
            </button>
          );
        })}
      </div>

      {/* Listado de Artículos */}
      <div className="flex flex-col gap-4">
        {filtered.map((post) => {
          const rel = post.albumId ? ALBUMS.find((a) => a.id === post.albumId) : null;
          const accentColor = rel ? rel.color : '#a855f7';
          const isDark = rel ? isColorDark(rel.color) : false;

          return (
            <GlassCard
              key={post.id}
              onClick={() => navigate('post-detail', post)}
              className="p-7 rounded-3xl cursor-pointer transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl hover:bg-white/5 border border-white/5"
            >
              <div className="flex items-start gap-5">
                {rel && (
                  <div 
                    className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: `${rel.color}30` }}
                  >
                    <img 
                      src={rel.cover} 
                      alt={rel.title} 
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} 
                    />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="mb-2.5">
                  <span 
                    className="inline-block text-[11px] px-3 py-1 rounded-full tracking-[0.05em] max-w-[220px] truncate border"
                    style={{
                      backgroundColor: rel ? `${rel.color}25` : 'rgba(255, 255, 255, 0.1)',
                      // Si es oscuro, usamos lightenColor para obtener una versión clara del color original
                      color: rel 
                        ? (isDark ? lightenColor(rel.color, 0.40) : rel.color) 
                        : 'rgba(255, 255, 255, 0.7)', 
                        
                      borderColor: rel ? `${rel.color}40` : 'rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    {post.category}
                  </span>
                  </div>

                  <h2 className="font-raleway font-bold text-[20px] mb-2.5 text-white">
                    {post.title[lang as keyof typeof post.title]}
                  </h2>
                  
                  <p className="text-[15px] text-white/50 leading-7 mb-5">
                    {post.excerpt[lang as keyof typeof post.excerpt]}
                  </p>

                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1.5 text-[11px] text-white/25">
                        <Calendar size={11} /> {post.date}
                      </span>
                      <span className="flex items-center gap-1.5 text-[11px] text-white/25">
                        <Clock size={11} /> {post.readTime}
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      {rel && (
                        <button
                          onClick={(e) => { e.stopPropagation(); navigate('album-detail', rel); }}
                          className="flex items-center gap-1 text-[12px] bg-transparent border-none cursor-pointer transition-colors duration-200"
                          style={{ 
                            // Si el color es oscuro, lo aclaramos un poco para que se vea bien de entrada
                            color: isColorDark(rel.color) ? lightenColor(rel.color, 0.3) : `${rel.color}99` 
                          }}
                          onMouseEnter={(e) => {
                            // Al hacer hover, usamos el color original pero más claro
                            e.currentTarget.style.color = lightenColor(rel.color, 0.5);
                          }}
                          onMouseLeave={(e) => {
                            // Al salir, volvemos al estado inicial
                            e.currentTarget.style.color = isColorDark(rel.color) ? lightenColor(rel.color, 0.2) : `${rel.color}99`;
                          }}
                        >
                          <ArrowRight size={11} /> {t.viewAlbum}
                        </button>
                      )}

                      <span className="inline-flex items-center gap-2 text-[12px] font-bold text-white bg-white/8 px-4 py-2 rounded-full border border-white/12 hover:bg-white/15 transition-colors">
                        <BookOpen size={11} color={accentColor} /> {t.readMore}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  )
}