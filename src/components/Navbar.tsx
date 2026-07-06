import { useState, useCallback, useRef } from 'react'
import { Home, User,
  Music2, Disc3,
  BookOpen,
  // Globe
} from 'lucide-react'

import { ALBUMS, BUBBLE_POS } from '../data/albums'
import type { Page, Navigate, Lang } from '../types'

interface NavbarProps {
  page: Page
  navigate: Navigate
  lang: Lang
  setLang: (lang: Lang) => void
}

// 2. Diccionario de traducciones para los ítems
const TRANSLATIONS = {
  en: {
    home: 'Home',
    about: 'About',
    albums: 'Albums',
    music: 'Music',
    blog: 'Blog',
  },
  es: {
    home: 'Inicio',
    about: 'Sobre mí',
    albums: 'Álbumes',
    music: 'Música',
    blog: 'Blog',
  },
}

export function Navbar({ page, navigate, lang, setLang }: NavbarProps) {
  const [albumsHovered, setAlbumsHovered] = useState(false)
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const onEnter = useCallback(() => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current)
    setAlbumsHovered(true)
  }, [])

  const onLeave = useCallback(() => {
    leaveTimer.current = setTimeout(() => setAlbumsHovered(false), 220)
  }, [])

  // Mapeamos los labels de forma dinámica basándonos en el idioma actual
  const navItems = [
    { id: 'home' as Page, label: TRANSLATIONS[lang].home, Icon: Home },
    { id: 'about' as Page, label: TRANSLATIONS[lang].about, Icon: User },
    { id: 'albums' as Page, label: TRANSLATIONS[lang].albums, Icon: Disc3, hasPopup: true },
    { id: 'music' as Page, label: TRANSLATIONS[lang].music, Icon: Music2 },
    { id: 'blog' as Page, label: TRANSLATIONS[lang].blog, Icon: BookOpen },
  ]

  const isAlbumsActive = page === 'albums' || page === 'album-detail'

  // Función para alternar el idioma
  // const toggleLanguage = () => {
  //   setLang(lang === 'en' ? 'es' : 'en')
  // }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 28,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
      }}
    >
        {/* Pop-up de burbujas de Álbumes */}
        {albumsHovered && (
        <div
          style={{ position: 'absolute', bottom: '100%', left: '50%', width: 0, height: 0 }}
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
        >
            {ALBUMS.map((album, i) => (
            <button
              key={album.id}
              title={album.title}
              onClick={() => {
                navigate('album-detail', album)
                setAlbumsHovered(false)
              }}
              style={{
                position: 'absolute',
                width: 58,
                height: 58,
                left: BUBBLE_POS[i].x - 29,
                top: BUBBLE_POS[i].y - 29,
                borderRadius: '50%',
                overflow: 'hidden',
                border: `2px solid ${album.color}60`,
                background: `${album.color}30`,
                backgroundImage: `url(${album.cover})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                cursor: 'pointer',
                animation: `bubbleRise 0.38s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.045}s both`,
                transition: 'transform 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease',
                boxShadow: `0 0 20px ${album.color}40`,
              }}
              onMouseEnter={e => {
                ;(e.currentTarget as HTMLElement).style.transform = 'scale(1.18)'
                ;(e.currentTarget as HTMLElement).style.borderColor = album.color
                ;(e.currentTarget as HTMLElement).style.boxShadow = `0 0 28px ${album.color}80`
              }}
              onMouseLeave={e => {
                ;(e.currentTarget as HTMLElement).style.transform = 'scale(1)'
                ;(e.currentTarget as HTMLElement).style.borderColor = `${album.color}60`
                ;(e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${album.color}40`
              }}
            />
          ))}
        </div>
        )}

        {/* Contenedor principal de la barra de navegación */}
        <div
        style={{
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        padding: '10px 14px',
        borderRadius: 9999,
        background: 'rgba(8, 4, 20, 0.50)',
        backdropFilter: 'blur(28px) saturate(180%)',
        WebkitBackdropFilter: 'blur(28px) saturate(180%)',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 8px 40px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.08)',
        }}
        >
          {navItems.map(({ id, label, Icon, hasPopup }) => {
          const active = page === id || (hasPopup && isAlbumsActive)
          return (
              <div
              key={id}
              style={{ position: 'relative' }}
              onMouseEnter={hasPopup ? onEnter : undefined}
              onMouseLeave={hasPopup ? onLeave : undefined}
              >
              <button
                  onClick={() => navigate(id)}
                  style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 4,
                  padding: '8px 14px',
                  borderRadius: 9999,
                  background: active ? 'rgba(255,255,255,0.1)' : 'transparent',
                  color: active ? '#fff' : 'rgba(255,255,255,0.38)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'color 0.2s, background 0.2s',
                  }}
                  onMouseEnter={e => {
                  if (!active) (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)'
                  }}
                  onMouseLeave={e => {
                  if (!active) (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.38)'
                  }}
              >
                  <Icon size={17} />
                  <span style={{ fontSize: 10, letterSpacing: '0.06em', fontWeight: 500 }}>
                  {label}
                  </span>
              </button>
              </div>
          )
          })}

          {/* Divisor vertical */}
          {/* <div
          style={{
              width: 1,
              height: 28,
              backgroundColor: 'rgba(255,255,255,0.12)',
              margin: '0 4px',
          }}
          /> */}

          {/* 3. Selector de Idioma (Píldora ES / EN) */}
          {/* <button
          onClick={toggleLanguage}
          title={lang === 'en' ? 'Cambiar a Español' : 'Switch to English'}
          style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              padding: '8px 12px',
              borderRadius: 9999,
              background: 'transparent',
              color: 'rgba(255,255,255,0.5)',
              border: 'none',
              cursor: 'pointer',
              transition: 'color 0.2s, background 0.2s',
          }}
          onMouseEnter={e => {
              ;(e.currentTarget as HTMLElement).style.color = '#fff'
              ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)'
          }}
          onMouseLeave={e => {
              ;(e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)'
              ;(e.currentTarget as HTMLElement).style.background = 'transparent'
          }}
          >
          <Globe size={17} />
          <span style={{ fontSize: 10, letterSpacing: '0.08em', fontWeight: 600 }}>
              {lang.toUpperCase()}
          </span>
          </button> */}

        </div>
    </div>
    )
}