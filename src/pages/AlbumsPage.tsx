import { Album, Play } from 'lucide-react'
import { ALBUMS } from '../data/albums'
import type { Navigate, Lang, AlbumData } from '../types'
import { isColorDark, lightenColor } from '../utils/colors';

export function AlbumsPage({ navigate, lang }: { navigate: Navigate; lang: Lang }) {
  const t = {
    tagLbl: lang === 'es' ? 'Discografía' : 'Discography',
    title: lang === 'es' ? 'Álbumes & Eras' : 'Albums & Eras',
    explore: lang === 'es' ? 'EXPLORAR' : 'EXPLORE'
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 max-w-[1200px] mx-auto select-none">
      <p className="text-[10px] tracking-[0.45em] text-white/25 uppercase mb-4">
        {t.tagLbl}
      </p>
      
      <h1 style={{ fontFamily: 'Raleway, sans-serif', letterSpacing: '-0.01em'}}
      className="font-raleway font-[950] text-[clamp(3rem,8vw,7rem)] mb-16">
        {t.title}
      </h1>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-6">
        {ALBUMS.map((album: AlbumData) => {
          // Evaluamos si el color principal del álbum es oscuro (usando la función isColorDark) -> da tipo bool
          const isDark = isColorDark(album.color);

          // Si es oscuro (true), aclaramos el fondo ('30' vs '14') y ponemos el texto blanco
          // Sino (false), fondo estandar ('14') y texto estandar (negro)
          const tagStyle = {
            backgroundColor: isDark ? `${album.color}30` : `${album.color}14`,
            color: isDark ? lightenColor(album.color, 0.40) : `${album.color}cc`,
            borderColor: isDark ? `${album.color}45` : 'transparent',
          };

          const getEraTagStyle = (isDark: boolean, color: string) => ({
            backgroundColor: 'rgba(0,0,0,0.65)',
            borderColor: isDark ? `${color}66` : 'rgba(255,255,255,0.1)',
            color: isDark ? lightenColor(album.color, 0.40) : color,
          });

          return (
            <button
              key={album.id}
              onClick={() => navigate('album-detail', album)}
              className="bg-transparent border-none cursor-pointer text-left p-0 transition-transform duration-300 ease-out hover:-translate-y-1.5"
            >
              <div 
                className="relative rounded-[24px] overflow-hidden mb-[14px] aspect-square border group"
                style={{
                  background: `linear-gradient(135deg, ${album.color}28, #000018)`,
                  borderColor: `${album.color}20`,
                }}
              >
                <img
                  src={album.cover}
                  alt={album.title}
                  className="w-full h-full object-cover block transition-transform duration-600 ease group-hover:scale-105"
                  onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                />
                
                {/* Overlay (Se activa con el hover del padre gracias a 'group') */}
                <div className="absolute inset-0 bg-black/55 backdrop-blur-[3px] flex flex-col items-center justify-center gap-2 opacity-0 transition-opacity duration-250 group-hover:opacity-100">
                  <Play size={28} className="text-white" />
                  <span className="text-[10px] tracking-[0.3em] text-white/80">
                    {t.explore}
                  </span>
                </div>
                
                {/* Era Tag con ajuste dinámico */}
                <div 
                  className="absolute top-3 right-3 text-[9px] px-[10px] py-1 rounded-full tracking-[0.06em] backdrop-blur-[10px] border"
                  // Uso getEraTagStyle que devuelve css (dependiendo si es oscuro o no)
                  style={getEraTagStyle(isDark, album.color)}
                >
                  {album.era[lang]}
                </div>
              </div>

              <p className="font-raleway font-bold text-base text-white mb-1 overflow-hidden text-ellipsis whitespace-nowrap">
                {album.title}
              </p>
              <p className="text-[13px] text-white/28 mb-2">
                {album.year}
              </p>
              
              {/* Tags del álbum con ajuste dinámico de color */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {album.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="text-[10px] px-2 py-[2px] rounded-full border tracking-wide" style={tagStyle}>
                    {tag}
                  </span>
                ))}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}