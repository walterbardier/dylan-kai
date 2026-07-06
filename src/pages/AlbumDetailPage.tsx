import { useState } from 'react'
import { ChevronLeft, Plus, Video, FileText, Info, X, Play, Loader2 } from 'lucide-react'
import { GlassCard } from '../components/GlassCard'
import { POSTS } from '../data/posts'
import { SONG_DETAILS } from '../data/songDetails'
import type { AlbumData, Navigate, Lang } from '../types'
import { isColorDark, lightenColor } from '../utils/colors';


export function AlbumDetailPage({ album, navigate, lang }: { album: AlbumData; navigate: Navigate; lang: Lang }) {
  const [saveHovered, setSaveHovered] = useState(false)
  
  // Estado para controlar el modal
  const [activeModal, setActiveModal] = useState<{ title: string; type: 'lyrics' | 'info'; content: string } | null>(null)
  // Estado para el indicador de carga cuando consultamos la API
  const [isLoadingModal, setIsLoadingModal] = useState(false)

  const relatedPosts = POSTS.filter(p => p.albumId === album.id)
  const playTextColor = (album.id === 3 || isColorDark(album.color)) ? '#ffffff' : '#000000'

  const t = {
    back: lang === 'es' ? 'Volver' : 'Back',
    play: lang === 'es' ? 'Reproducir' : 'Play',
    about: lang === 'es' ? 'Sobre el Proyecto' : 'About the Release',
    tracks: lang === 'es' ? 'Canciones & Tracklist' : 'Tracks & Tracklist',
    yearLbl: lang === 'es' ? 'Año de Lanzamiento' : 'Year Released',
    tracksLbl: lang === 'es' ? 'Canciones' : 'Tracks',
    imagesLbl: lang === 'es' ? 'Imágenes' : 'Images',
    gallery: lang === 'es' ? 'Galería Visual' : 'Visual Gallery',
    blog: lang === 'es' ? 'Notas y Artículos' : 'Notes & Articles',
    lyricsLbl: lang === 'es' ? 'Letra de la canción' : 'Song Lyrics',
    infoLbl: lang === 'es' ? 'Sobre la canción' : 'Song Info',
    loading: lang === 'es' ? 'Buscando letra en Genius...' : 'Fetching lyrics from Genius...',
    notFound: lang === 'es' ? 'No se encontró la letra para esta canción.' : 'Lyrics not found for this song.',
    geniusBtn: lang === 'es' ? 'Explorar en Genius' : 'Explore on Genius'
  }

  // Función asíncrona para buscar letras en nuestra API de Genius
  const handleOpenLyrics = async (songTitle: string) => {
    setIsLoadingModal(true)
    setActiveModal({
      title: songTitle,
      type: 'lyrics',
      content: ''
    })
  
    try {
      // 1. Configuramos una URL base dinámica.
      // Si usas Vite es import.meta.env.VITE_API_URL, si es Next/CRA es process.env.NEXT_PUBLIC_API_URL
      // Para pruebas locales directas con tu server.js, le ponemos por defecto 'http://localhost:8443'
      const baseUrl = import.meta.env?.VITE_API_URL || 'http://localhost:3001';

      // 2. Apuntamos a la URL completa del servidor local/producción
      const response = await fetch(
        `${baseUrl}/api/lyrics?track=${encodeURIComponent(songTitle)}&artist=${encodeURIComponent("Dylan Kai")}`
      )
  
      const data = await response.json()
  
      if (response.ok) {
        setActiveModal({
          title: songTitle,
          type: 'lyrics',
          content: data.lyrics
        })
      } else {
        setActiveModal({
          title: songTitle,
          type: 'lyrics',
          content: data.error || t.notFound
        })
      }
    } catch (error) {
      console.error("Error conectando a la API:", error);
      setActiveModal({
        title: songTitle,
        type: 'lyrics',
        content: t.notFound
      })
    } finally {
      setIsLoadingModal(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      {/* Sección Hero */}
      <section style={{ position: 'relative', height: '75vh', display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: `linear-gradient(135deg, ${album.color}20, #030012 85%)`,
          }} />
          <img
            src={album.bg} alt=""
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.50 }}
            onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #020008 0%, rgba(2,0,8,0.6) 40%, transparent 100%)' }} />
        </div>

        <div style={{
          position: 'absolute', top: '30%', left: '30%',
          width: 500, height: 500, borderRadius: '50%',
          background: `radial-gradient(circle, ${album.color}15, transparent 70%)`,
          filter: 'blur(50px)', pointerEvents: 'none',
        }} />

        <button
          onClick={() => navigate('albums')}
          style={{
            position: 'absolute', top: 32, left: 24,
            display: 'flex', alignItems: 'center', gap: 6,
            fontSize: 12, color: 'rgba(255,255,255,0.5)',
            background: 'none', border: 'none', cursor: 'pointer',
            transition: 'all 0.2s ease', zIndex: 2,
          }}
          onMouseEnter={e => { 
            const target = e.currentTarget as HTMLElement
            target.style.color = '#fff'
            target.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={e => { 
            const target = e.currentTarget as HTMLElement
            target.style.color = 'rgba(255,255,255,0.5)'
            target.style.transform = 'translateY(0)'
          }}
        >
          <ChevronLeft size={15} /> {t.back}
        </button>

        <div style={{ position: 'relative', zIndex: 2, padding: '0 24px 56px', maxWidth: 1100, margin: '0 auto', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 36, flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flexShrink: 0 }}>
              {/* Color del Álbum */}
              <div style={{
                position: 'absolute', inset: -15, borderRadius: 32,
                background: album.color, filter: 'blur(45px)', opacity: 0.20,
              }} />
              {/* Portada del Álbum */}
              <div style={{
                position: 'relative', width: 240, height: 240,
                borderRadius: 24, overflow: 'hidden',
                background: `linear-gradient(135deg, ${album.color}40, #000018)`,
                border: '1px solid rgba(255,255,255,0.15)',
                boxShadow: `0 20px 50px rgba(0,0,0,0.5)`,
              }}>
                <img src={album.cover} alt={album.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} />
              </div>
            </div>

            {/* Títutlo del Álbum */}
            <div style={{ paddingBottom: 6, flex: 1 }}>
              <span style={{ fontSize: 10, color: 'rgba(255, 255, 255, 0.46)', letterSpacing: '0.35em', textTransform: 'uppercase' }}>
                {album.era[lang]} · {album.year}
              </span>
              <h1 style={{
                fontFamily: 'Raleway, sans-serif', 
                fontWeight: 900,
                // Si el título supera los 25 caracteres, reducimos el tamaño máximo del clamp:
                fontSize: album.title.length > 25 
                  ? 'clamp(1.7rem, 3.8vw, 3.1rem)' 
                  : 'clamp(2.2rem, 6vw, 4.8rem)',
                lineHeight: 1.1, // FUNDAMENTAL: Evita separaciones verticales gigantes entre líneas
                letterSpacing: '-0.01em', 
                marginTop: 8, 
                marginBottom: 6,
                maxWidth: 700,
              }}>
                {album.title}
              </h1>
              
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginBottom: 24 }}>Dylan Kai</p>
              
              {/* Botón Play */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <button style={{
                  display: 'flex', alignItems: 'center', gap: 7,
                  padding: '12px 28px', borderRadius: 9999,
                  background: album.color, color: playTextColor,
                  fontSize: 13, fontWeight: 700, border: 'none', cursor: 'pointer',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: `0 8px 20px ${album.color}30`
                }}
                  onMouseEnter={e => { 
                    const target = e.currentTarget as HTMLElement
                    target.style.opacity = '0.88'
                    target.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={e => { 
                    const target = e.currentTarget as HTMLElement
                    target.style.opacity = '1'
                    target.style.transform = 'translateY(0)'
                  }}
                >
                  <Play size={15} fill="currentColor" /> {t.play}
                </button>

                {/* Botón Video */}
                <a
                  href={album.youtubeLink || '#'}
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: 42, height: 42, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.14)',
                    color: 'rgba(255,255,255,0.75)', textDecoration: 'none',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                  onMouseEnter={e => { 
                    const target = e.currentTarget as HTMLElement
                    target.style.color = '#fff'
                    target.style.borderColor = album.color
                    target.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={e => { 
                    const target = e.currentTarget as HTMLElement
                    target.style.color = 'rgba(255,255,255,0.75)'
                    target.style.borderColor = 'rgba(255,255,255,0.14)'
                    target.style.transform = 'translateY(0)'
                  }}
                >
                  <Video size={17} />
                </a>

                {/* Contenedor Desplegable con Plataformas a Color */}
                <div 
                  style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                  onMouseEnter={() => setSaveHovered(true)}
                  onMouseLeave={() => setSaveHovered(false)}
                >
                  {/* Botón Principal '+' con estilo cristal */}
                  <div
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      width: 42, height: 42, borderRadius: '50%',
                      background: saveHovered ? album.color : 'rgba(255,255,255,0.07)',
                      color: saveHovered ? playTextColor : 'rgba(255,255,255,0.75)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.14)',
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)', // Efecto rebote suave
                      transform: saveHovered ? 'rotate(45deg) scale(1.05)' : 'rotate(0deg) scale(1)',
                      zIndex: 2 // Asegura que quede por encima de los botones mientras salen
                    }}
                  >
                    <Plus size={18} />
                  </div>

                  {/* Contenedor de iconos que se desliza desde el '+' */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      maxWidth: saveHovered ? 120 : 0,
                      transition: 'max-width 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    {/* Botón de Spotify (Sale primero desde la izquierda) */}
                    <a
                      href={album.spotifyLink || '#'}
                      target="_blank" rel="noopener noreferrer"
                      title="Escuchar en Spotify"
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        width: 42, height: 42, borderRadius: '50%',
                        background: '#1DB954',
                        color: '#ffffff',
                        boxShadow: '0 4px 12px rgba(29, 185, 84, 0.3)',
                        textDecoration: 'none',
                        flexShrink: 0,
                        // ESTADO DE ANIMACIÓN DESDE EL '+':
                        opacity: saveHovered ? 1 : 0,
                        transform: saveHovered 
                          ? 'translateX(0) scale(1)' 
                          : 'translateX(-25px) scale(0.5)',
                        pointerEvents: saveHovered ? 'auto' : 'none',
                        transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        transitionDelay: saveHovered ? '0.05s' : '0s' // Retraso al salir
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.72 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                      </svg>
                    </a>

                    {/* Botón de Apple Music (Sale justo detrás de Spotify) */}
                    <a
                      href={(album as any).appleLink || '#'}
                      target="_blank" rel="noopener noreferrer"
                      title="Escuchar en Apple Music"
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        width: 42, height: 42, borderRadius: '50%',
                        background: '#FA243C',
                        color: '#ffffff',
                        boxShadow: '0 4px 12px rgba(250, 36, 60, 0.3)',
                        textDecoration: 'none',
                        flexShrink: 0,
                        // ESTADO DE ANIMACIÓN DESDE EL '+':
                        opacity: saveHovered ? 1 : 0,
                        transform: saveHovered 
                          ? 'translateX(0) scale(1)' 
                          : 'translateX(-40px) scale(0.5)',
                        pointerEvents: saveHovered ? 'auto' : 'none',
                        transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        transitionDelay: saveHovered ? '0.1s' : '0s' // Retraso mayor para dar efecto cascada
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.35c.64-.78 1.08-1.88.96-2.98-.94.04-2.08.63-2.74 1.41-.58.68-.99 1.81-.85 2.89 1.05.08 2.13-.54 2.63-1.32"/>
                      </svg>
                    </a>
                  
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contenedor Principal */}
      <div style={{ padding: '72px 24px 80px', maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 72 }}>
        
        {/* Descripción */}
        <section>
          <p style={{ fontSize: 10, letterSpacing: '0.45em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', marginBottom: 20 }}>
            {t.about}
          </p>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, maxWidth: 680, marginBottom: 24 }}>
            {album.description[lang]}
          </p>

          {/* Contenedor Flex: Tags a la izquierda y Botón de Genius a la derecha */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            flexWrap: 'wrap', 
            gap: 16 
          }}>
            {/* Lista de Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {album.tags.map(tag => {
                // Evaluamos si el color principal del álbum es oscuro
                const isDark = isColorDark(album.color);

                return (
                  <span key={tag} style={{
                    fontSize: 11, 
                    padding: '5px 14px', 
                    borderRadius: 9999,
                    background: isDark ? `${album.color}35` : `${album.color}18`, 
                    color: isDark ? '#ffffff' : album.color,
                    border: isDark ? `1px solid ${album.color}55` : `1px solid ${album.color}38`, 
                    letterSpacing: '0.06em',
                    transition: 'all 0.2s ease',
                  }}>
                    {tag}
                  </span>
                );
              })}
            </div>

            {/* Botón Explorar en Genius */}
            <a
              href={(album as any).geniusLink || `https://genius.com/search?q=${encodeURIComponent(album.title + ' Dylan Kai')}`}
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 18px',
                borderRadius: 9999,
                background: 'rgba(255, 255, 255, 0.06)',
                color: '#ffff64', // Amarillo característico de Genius
                border: '1px solid rgba(255, 255, 100, 0.25)',
                backdropFilter: 'blur(10px)',
                fontSize: 12,
                fontWeight: 700,
                textDecoration: 'none',
                letterSpacing: '0.04em',
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
              }}
              onMouseEnter={e => {
                const target = e.currentTarget as HTMLElement;
                target.style.background = '#ffff64';
                target.style.color = '#000000';
                target.style.transform = 'translateY(-2px)';
                target.style.boxShadow = '0 6px 20px rgba(255, 255, 100, 0.3)';
              }}
              onMouseLeave={e => {
                const target = e.currentTarget as HTMLElement;
                target.style.background = 'rgba(255, 255, 255, 0.06)';
                target.style.color = '#ffff64';
                target.style.transform = 'translateY(0)';
                target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
              }}
            >
              {/* Logo Oficial de Genius en SVG */}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.15 17.85H8.7V6.15h2.15v11.7zm4.45 0h-2.15V6.15h2.15v11.7z" opacity="0.1" />
                <path d="M11.996 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm-2.82 17.54H6.84V6.46h2.336v11.08zm6.648 0h-2.336V6.46h2.336v11.08z" />
              </svg>
              <span>{t.geniusBtn}</span>
            </a>
          </div>
        </section>

        {/* Panel Estadístico */}
        <section>
          {(() => {
            // 1. Detectamos si el color del álbum es oscuro
            const isDark = isColorDark(album.color);
            // 2. Si es oscuro, los números serán más claros; si es claro, usan el color original
            const valColor = isDark ? lightenColor(album.color, 0.3) : album.color;

            return (
              <div style={{
                padding: '36px 40px', borderRadius: 28,
                // Si es oscuro, le damos un fondo apenas más luminoso ('18' en vez de '0e') para compensar
                background: isDark ? `${album.color}20` : `${album.color}0e`,
                border: isDark ? `1px solid ${album.color}35` : `1px solid ${album.color}22`,
                backdropFilter: 'blur(20px)',
                display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 24, textAlign: 'center',
              }}>
                {[
                  [String(album.year), t.yearLbl],
                  [String((album.songs || []).length), t.tracksLbl],
                  [String((album.gallery || []).length), t.imagesLbl],
                ].map(([val, label]) => (
                  <div key={label}>
                    <p style={{ 
                      fontFamily: 'Raleway, sans-serif', 
                      fontWeight: 800, 
                      fontSize: 36, 
                      color: valColor, // <--- Aquí aplicamos el color aclarado o el original
                      marginBottom: 6,
                      // Opcional pro: le damos un brillo/sombra sutil al número si es blanco para que resalte aún más
                      // textShadow: isDark ? `0 0 16px ${album.color}` : 'none'
                    }}>
                      {val}
                    </p>
                    <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{label}</p>
                  </div>
                ))}
              </div>
            );
          })()}
        </section>

        {/* Tracklist con Botones Dinámicos */}
        <section>
          <p style={{ fontSize: 10, letterSpacing: '0.45em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', marginBottom: 20 }}>{t.tracks}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {(album.songs || []).map((song, i) => {
              const songData = SONG_DETAILS?.[song as keyof typeof SONG_DETAILS]?.[lang]
              const hasInfo = Boolean(songData?.info?.trim())

              return (
                <div
                  key={song}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 16,
                    padding: '14px 18px', borderRadius: 16,
                    border: '1px solid rgba(255,255,255,0.04)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
                >
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)', width: 28, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 500, fontSize: 14 }}>{song}</p>
                    <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>{album.title}</p>
                  </div>

                  <div style={{ display: 'flex', gap: 8 }}>
                    {/* Botón de Letra: Ahora SIEMPRE disponible y gatilla la búsqueda en Genius */}
                    <button
                      title={t.lyricsLbl}
                      onClick={() => handleOpenLyrics(song)}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        width: 36, height: 36, borderRadius: '50%',
                        background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.7)',
                        border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={e => {
                        const target = e.currentTarget as HTMLElement
                        target.style.background = album.color
                        target.style.color = playTextColor
                        target.style.transform = 'scale(1.08)'
                      }}
                      onMouseLeave={e => {
                        const target = e.currentTarget as HTMLElement
                        target.style.background = 'rgba(255,255,255,0.06)'
                        target.style.color = 'rgba(255,255,255,0.7)'
                        target.style.transform = 'scale(1)'
                      }}
                    >
                      <FileText size={16} />
                    </button>

                    {/* Botón de Información (sigue tomándolo del archivo estático .ts si existe) */}
                    {hasInfo && (
                      <button
                        title={t.infoLbl}
                        onClick={() => setActiveModal({ title: song, type: 'info', content: songData!.info! })}
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          width: 36, height: 36, borderRadius: '50%',
                          background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.7)',
                          border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={e => {
                          const target = e.currentTarget as HTMLElement
                          target.style.background = album.color
                          target.style.color = playTextColor
                          target.style.transform = 'scale(1.08)'
                        }}
                        onMouseLeave={e => {
                          const target = e.currentTarget as HTMLElement
                          target.style.background = 'rgba(255,255,255,0.06)'
                          target.style.color = 'rgba(255,255,255,0.7)'
                          target.style.transform = 'scale(1)'
                        }}
                      >
                        <Info size={16} />
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Galería Adaptativa */}
        {album.gallery && album.gallery.length > 0 && (
          <section>
            <p style={{ fontSize: 10, letterSpacing: '0.45em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', marginBottom: 20 }}>{t.gallery}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
              {album.gallery.map((imgUrl, i) => (
                <div
                  key={i}
                  style={{
                    aspectRatio: '1', borderRadius: 18, overflow: 'hidden',
                    background: `linear-gradient(${i * 50 + 100}deg, ${album.color}15, rgba(0,0,24,0.95))`,
                    border: '1px solid rgba(255,255,255,0.08)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)' }}
                >
                  <img 
                    src={imgUrl} alt={`Gallery ${i + 1}`} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} 
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Blog Relacionado */}
        {relatedPosts.length > 0 && (
          <section>
            <p style={{ fontSize: 10, letterSpacing: '0.45em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', marginBottom: 20 }}>{t.blog}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
              {relatedPosts.map(post => (
                <GlassCard
                  key={post.id}
                  style={{ padding: 24, borderRadius: 20, cursor: 'pointer', transition: 'transform 0.2s ease' }}
                  onClick={() => navigate('blog')}
                >
                  <h3
                    style={{
                      fontFamily: 'Raleway, sans-serif',
                      fontWeight: 700,
                      fontSize: 15,
                      marginBottom: 10,
                    }}
                  >
                    {/* Si idioma es español, entonces ... sino ... */}
                    {lang === 'es' ? post.title[lang] : post.title[lang]}
                  </h3>

                  <p
                    style={{
                      fontSize: 13,
                      color: 'rgba(255,255,255,0.45)',
                      lineHeight: 1.7,
                      marginBottom: 16,
                    }}
                  >
                    {/* Si idioma es español, entonces ... sino ... */}
                    {lang === 'es' ? post.excerpt[lang] : post.excerpt[lang]}
                  </p>
                  <div style={{ display: 'flex', gap: 12, fontSize: 11, color: 'rgba(255,255,255,0.22)' }}>
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                </GlassCard>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Modal Adaptativo con Estado de Carga (Spinner) */}
      {activeModal && (
        <div 
          onClick={() => !isLoadingModal && setActiveModal(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0, 0, 0, 0.82)', backdropFilter: 'blur(10px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24
          }}
        >
          <div 
            onClick={e => e.stopPropagation()}
            style={{
              background: '#080811',
              border: `1px solid ${album.color}40`,
              boxShadow: `0 25px 70px rgba(0,0,0,0.85)`,
              borderRadius: 24,
              padding: '32px 36px',
              width: '100%',
              maxWidth: 580,
              maxHeight: '82vh',
              display: 'flex', flexDirection: 'column',
              position: 'relative'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div>
                <span style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: album.color }}>
                  {activeModal.type === 'lyrics' ? t.lyricsLbl : t.infoLbl}
                </span>
                <h3 style={{ fontFamily: 'Raleway, sans-serif', fontSize: 22, fontWeight: 800, marginTop: 4 }}>
                  {activeModal.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                style={{
                  background: 'rgba(255,255,255,0.08)', border: 'none',
                  color: '#fff', width: 34, height: 34, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={16} />
              </button>
            </div>

            <div style={{ overflowY: 'auto', paddingRight: 10 }}>
              {isLoadingModal ? (
                /* Estado visual de carga */
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 0', gap: 16 }}>
                  <style>
                    {`@keyframes spin { 100% { transform: rotate(360deg); } }`}
                  </style>
                  <Loader2 size={32} color={album.color} style={{ animation: 'spin 1s linear infinite' }} />
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em' }}>{t.loading}</p>
                </div>
              ) : (
                /* Contenido ya cargado */
                <p style={{
                  whiteSpace: 'pre-line',
                  fontSize: 14.5, color: 'rgba(255,255,255,0.78)',
                  lineHeight: 1.85, margin: 0
                }}>
                  {activeModal.content}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}