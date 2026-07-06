import { Play, Headphones, ExternalLink } from 'lucide-react'
import { GlassCard } from '../components/GlassCard'
import { ALBUMS } from '../data/albums'
import type { Navigate, Lang } from '../types'

export function MusicPage({ navigate, lang }: { navigate: Navigate; lang: Lang }) {
  const platforms = [
    { name: 'Spotify', color: '#1DB954' },
    { name: 'Apple Music', color: '#FC3C44' },
    { name: 'SoundCloud', color: '#FF5500' },
    { name: 'YouTube Music', color: '#FF0000' },
    { name: 'Bandcamp', color: '#1da0c3' },
    { name: 'Tidal', color: '#00FFFF' },
  ]

  const t = {
    tagLbl: lang === 'es' ? 'Música' : 'Music',
    title: lang === 'es' ? 'Escuchar' : 'Listen',
    latestLbl: lang === 'es' ? 'Último Lanzamiento' : 'Latest Release',
    exploreBtn: lang === 'es' ? 'Explorar' : 'Explore',
    streamLbl: lang === 'es' ? 'Plataformas de Streaming' : 'Stream On',
    allSongsLbl: lang === 'es' ? 'Todas las Canciones' : 'All Tracks'
  }

  const latestAlbum = ALBUMS[7] || ALBUMS[ALBUMS.length - 1]

  return (
    <div style={{ minHeight: '100vh', padding: '96px 24px 80px', maxWidth: 860, margin: '0 auto' }} className='select-none'>
      <p style={{ fontSize: 10, letterSpacing: '0.45em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', marginBottom: 16 }}>{t.tagLbl}</p>
      <h1 style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 900, fontSize: 'clamp(3rem, 8vw, 7rem)', letterSpacing: '-0.01em', marginBottom: 64 }}>{t.title}</h1>

      {latestAlbum && (
        <GlassCard style={{ padding: 28, borderRadius: 24, marginBottom: 48, position: 'relative', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(circle at 80% 50%, ${latestAlbum.color}28, transparent 65%)`,
            pointerEvents: 'none',
          }} />
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
            <div style={{
              width: 88, height: 88, borderRadius: 18, overflow: 'hidden', flexShrink: 0,
              background: `linear-gradient(135deg, ${latestAlbum.color}35, #000018)`,
            }}>
              <img src={latestAlbum.cover} alt={latestAlbum.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} />
            </div>
            <div style={{ flex: 1, minWidth: 180 }}>
              <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: 6 }}>{t.latestLbl}</p>
              <h2 style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 800, fontSize: 24, marginBottom: 4 }}>{latestAlbum.title}</h2>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{latestAlbum.year}</p>
            </div>
            <button
              onClick={() => navigate('album-detail', latestAlbum)}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '10px 22px', borderRadius: 9999,
                background: `${latestAlbum.color}30`,
                border: `1px solid ${latestAlbum.color}50`,
                color: latestAlbum.color, fontSize: 13, cursor: 'pointer',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }}
            >
              <Play size={13} fill="currentColor" /> {t.exploreBtn}
            </button>
          </div>
        </GlassCard>
      )}

      <div style={{ marginBottom: 56 }}>
        <p style={{ fontSize: 10, letterSpacing: '0.45em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', marginBottom: 20 }}>{t.streamLbl}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
          {platforms.map(p => (
            <GlassCard
              key={p.name}
              style={{ padding: '14px 18px', borderRadius: 16, cursor: 'pointer', transition: 'border-color 0.2s' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Headphones size={16} style={{ color: p.color }} />
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', flex: 1 }}>{p.name}</span>
                <ExternalLink size={11} style={{ color: 'rgba(255,255,255,0.2)' }} />
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      <div>
        <p style={{ fontSize: 10, letterSpacing: '0.45em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', marginBottom: 20 }}>{t.allSongsLbl}</p>
        <div>
          {ALBUMS.flatMap(album =>
            (album.songs || []).map((song, i) => ({ song, album, key: `${album.id}-${i}` }))
          ).map(({ song, album, key }, idx) => (
            <div
              key={key}
              onClick={() => navigate('album-detail', album)}
              style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '12px 16px', borderRadius: 14,
                cursor: 'pointer', transition: 'background 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
            >
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', width: 24, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
                {String(idx + 1).padStart(2, '0')}
              </span>
              <div style={{
                width: 32, height: 32, borderRadius: 8, overflow: 'hidden', flexShrink: 0,
                background: `${album.color}30`,
              }}>
                <img src={album.cover} alt={album.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 13, fontWeight: 500, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{song}</p>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.28)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{album.title}</p>
              </div>
              <Play size={13} style={{ color: 'rgba(255,255,255,0.2)', flexShrink: 0 }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}