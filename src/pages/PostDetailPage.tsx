import { ChevronLeft, Calendar, Clock, ArrowRight } from 'lucide-react'
import { ALBUMS } from '../data/albums'
import { GlassCard } from '../components/GlassCard'
import type { Navigate, Lang, PostData } from '../types'
import { RichText } from '../components/RichText'

export function PostDetailPage({ post, navigate, lang }: { post: PostData; navigate: Navigate; lang: Lang }) {
  // Buscamos si el post pertenece a un álbum para heredar sus colores o carátula
  const rel = post.albumId ? ALBUMS.find(a => a.id === post.albumId) : null
  const accentColor = rel ? rel.color : '#a855f7' // Morado por defecto si no tiene álbum

  const t = {
    back: lang === 'es' ? 'Volver al Blog' : 'Back to Journal',
    viewAlbum: lang === 'es' ? 'Ver álbum relacionado' : 'View related album',
    }

  return (
    <div style={{ minHeight: '100vh', position: 'relative', paddingBottom: 96 }}>
      {/* Fondo ambiental suave basado en el color del álbum si existe */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: `radial-gradient(circle at 50% 15%, ${accentColor}15, #020008 70%)`
      }} />

      {/* Botón Flotante Volver */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: 760, margin: '0 auto', padding: '48px 24px 0' }}>
        <button
          onClick={() => navigate('blog')}
          className="inline-flex items-center gap-1.5 text-xs text-white/50 tracking-[0.04em] transition-all duration-200 ease-out hover:text-white hover:-translate-x-1"
        >
          <ChevronLeft size={16} /> {t.back}
        </button>
      </div>

      {/* Contenedor Editorial Principal */}
      <article style={{ position: 'relative', zIndex: 2, maxWidth: 760, margin: '36px auto 0', padding: '0 24px' }}>
        
        {/* Cabecera del Artículo */}
        <header style={{ marginBottom: 48, borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: 36 }}>
          <div className="mb-4">
            <span 
              className="inline-block text-[10px] px-3 py-1 rounded-full tracking-[0.08em] uppercase border"
              style={{ 
                background: `${accentColor}18`, 
                color: accentColor, 
                borderColor: `${accentColor}38` 
              }}
            >
              {post.category}
            </span>
          </div>

          <h1 className="font-raleway font-black text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.15] tracking-tighter mb-5 text-white"
          style={{fontFamily: 'Raleway, sans-serif'}}>
            {post.title[lang]}
          </h1>

          <div className="flex items-center gap-5 text-xs text-white/35">
            <span className="flex items-center gap-1.5">
              <Calendar size={13} style={{ color: accentColor }} /> {post.date}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} style={{ color: accentColor }} /> {post.readTime}
            </span> 
          </div>
        </header>

        {/* Cuerpo del Artículo */}
        <RichText
        content={post.content[lang]}
        accentColor={accentColor}
        />

        {/* Tarjeta de Enlace Rápido al Álbum (Si el post habla de un disco) */}
        {rel && (
          <GlassCard className="mt-16 p-6 rounded-[20px] flex items-center gap-5">
            <img
              src={rel.cover}
              alt={rel.title}
              className="w-[72px] h-[72px] rounded-[14px] object-cover flex-shrink-0 onerror:hidden"
              // Nota: Tailwind no tiene una clase 'onerror:hidden'. 
              // Puedes mantener el onError si es necesario, o usar una lógica más limpia en React:
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            
            <div className="flex-1">
              <span 
                className="text-[10px] tracking-[0.2em] uppercase" 
                style={{ color: rel.color }}
              >
                {rel.era[lang as Lang]}
              </span>
              <h4 className="font-raleway text-lg font-bold mt-1 text-white">
                {rel.title}
              </h4>
            </div>
          
            <button
              onClick={() => navigate('album-detail', rel)}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold text-white transition-transform duration-200 hover:scale-105 flex-shrink-0"
              style={{ background: rel.color }}
            >
              {t.viewAlbum} <ArrowRight size={14} />
            </button>
          </GlassCard>
        )}
      </article>
    </div>
  )
}