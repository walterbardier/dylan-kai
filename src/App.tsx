// src/App.tsx
import { useState, useCallback } from 'react'
import { StarField } from './components/StarField'
import { Navbar } from './components/Navbar'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { MusicPage } from './pages/MusicPage'
import { AlbumsPage } from './pages/AlbumsPage'
import { AlbumDetailPage } from './pages/AlbumDetailPage'
import { BlogPage } from './pages/BlogPage'
import { PostDetailPage } from './pages/PostDetailPage'

import type { Page, Navigate, AlbumData, PostData, Lang } from './types'

export default function App() {
  const [page, setPage] = useState<Page>('home')
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumData | null>(null)
  const [selectedPost, setSelectedPost] = useState<PostData | null>(null)
  const [lang, setLang] = useState<Lang>('en') // Estado global para el idioma

  // Función de navegación unificada
  const navigate: Navigate = useCallback((p, data) => {
    if (p === 'album-detail' && data) {
      setSelectedAlbum(data as AlbumData)
    } else if (p === 'post-detail' && data) {
      setSelectedPost(data as PostData)
    }
    
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div style={{ minHeight: '100vh', color: '#fff', overflowX: 'hidden', fontFamily: '"DM Sans", system-ui, sans-serif' }}>
      {/* Fondo de degradados fijos */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, #010006 0%, #050010 45%, #09001e 100%)' }} />
        <div style={{
          position: 'absolute', top: '20%', left: '25%',
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(79,46,209,0.18) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }} />
        <div style={{
          position: 'absolute', top: '65%', right: '20%',
          width: 450, height: 450, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '15%', left: '10%',
          width: 350, height: 350, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }} />
      </div>

      <StarField />

      {/* Globito flotante de idioma (Arriba a la derecha con estilo Glassmorphism del Navbar) */}
      <div style={{ position: 'fixed', top: 24, right: 28, zIndex: 100 }}>
        <button
          onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'rgba(255, 255, 255, 0.07)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.14)',
            borderRadius: '9999px',
            padding: '8px 16px',
            color: '#fff',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          onMouseEnter={e => {
            const target = e.currentTarget as HTMLElement
            target.style.background = 'rgba(255, 255, 255, 0.12)'
            target.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={e => {
            const target = e.currentTarget as HTMLElement
            target.style.background = 'rgba(255, 255, 255, 0.07)'
            target.style.transform = 'translateY(0)'
          }}
        >
          <span style={{ opacity: lang === 'es' ? 1 : 0.4 }}>ES</span>
          <span style={{ opacity: 0.3 }}>/</span>
          <span style={{ opacity: lang === 'en' ? 1 : 0.4 }}>EN</span>
        </button>
      </div>

      <main style={{ position: 'relative', zIndex: 1, paddingBottom: 140 }}>
        {page === 'home' && <HomePage navigate={navigate} lang={lang} />}
        {page === 'about' && <AboutPage lang={lang} />}
        {page === 'music' && <MusicPage navigate={navigate} lang={lang} />}
        {page === 'albums' && <AlbumsPage navigate={navigate} lang={lang} />}
        {page === 'album-detail' && selectedAlbum && (
          <AlbumDetailPage album={selectedAlbum} navigate={navigate} lang={lang} />
        )}
        {page === 'blog' && <BlogPage navigate={navigate} lang={lang} />}
        {page === 'post-detail' && selectedPost && (
          <PostDetailPage post={selectedPost} navigate={navigate} lang={lang} />
        )}
      </main>

      <Navbar page={page} navigate={navigate} lang={lang} setLang={setLang} />
    </div>
  )
}