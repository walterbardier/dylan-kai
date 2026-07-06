import 'dotenv/config'; // Carga tu .env
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import * as cheerio from 'cheerio';

const app = express();
app.use(cors());

const GENIUS_TOKEN = process.env.GENIUS_ACCESS_TOKEN;

// AÑADE ESTO PARA DEPURAR:
console.log("Token actual siendo usado:", GENIUS_TOKEN ? GENIUS_TOKEN.substring(0, 5) + "..." : "¡NULO!");

app.get('/api/lyrics', async (req, res) => {
    const { track, artist } = req.query;
    
    try {
        // 1. Buscar la canción
        const searchUrl = `https://api.genius.com/search?q=${encodeURIComponent(`${track} ${artist || 'Dylan Kai'}`)}`;
        const { data } = await axios.get(searchUrl, { 
            headers: { Authorization: `Bearer ${GENIUS_TOKEN}` } 
        });
        
        if (!data.response.hits.length) return res.status(404).json({ error: "No encontrada" });

        // 2. Scraping de la letra
        const path = data.response.hits[0].result.path;
        const { data: html } = await axios.get(`https://genius.com${path}`);
        const $ = cheerio.load(html);
        
        let lyrics = '';
        $('[data-lyrics-container="true"]').each((_, el) => {
            $(el).find('br').replaceWith('\n');
            lyrics += $(el).text() + '\n';
        });

        // 1. Si la canción tiene etiquetas como [Verse 1], [Intro] o [Chorus],
        // verificamos si hay basura antes del primer corchete '[' y la borramos.
        const primerCorchete = lyrics.indexOf('[');
        if (primerCorchete !== -1 && primerCorchete < 600) {
        const textoAnterior = lyrics.substring(0, primerCorchete);
        // Si el texto antes del primer corchete tiene palabras típicas de la interfaz de Genius:
        if (/Contributor|Translations|Lyrics|Read More|Español/i.test(textoAnterior)) {
            lyrics = lyrics.substring(primerCorchete);
        }
        }

        // 2. Limpieza de respaldo con Regex por si no hay corchetes
        lyrics = lyrics
        .replace(/^.*?Read More\s*/is, '') // Borra todo hasta "Read More" si sigue existiendo
        .replace(/\d*Embed$/, '') // A veces Genius pega la palabra "Embed" y un número al final
        .trim();

        
        res.json({ lyrics: lyrics.trim() });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error en el servidor" });
    }
});

app.listen(3001, () => console.log('Backend listo en http://localhost:3001'));