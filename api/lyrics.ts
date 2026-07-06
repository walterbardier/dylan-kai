import type { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";
import * as cheerio from "cheerio";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  const track = String(req.query.track || "").trim();
  const artist = String(req.query.artist || "Dylan Kai").trim();

  if (!track) {
    return res.status(400).json({
      error: "Missing track parameter.",
    });
  }

  const token = process.env.GENIUS_ACCESS_TOKEN;

  if (!token) {
    console.error("GENIUS_ACCESS_TOKEN not configured.");
    return res.status(500).json({
      error: "Server configuration error.",
    });
  }

  try {
    // ----------------------------
    // Buscar canción en Genius
    // ----------------------------

    const searchResponse = await axios.get(
      "https://api.genius.com/search",
      {
        params: {
          q: `${track} ${artist}`,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const hits = searchResponse.data?.response?.hits ?? [];

    if (!hits.length) {
      return res.status(404).json({
        error: "Song not found.",
      });
    }

    console.log(
      "GENIUS RESULTS:",
      hits.map((h: any) => ({
        title: h.result.title,
        artist: h.result.primary_artist.name,
      }))
    );

    // Elegimos primero uno del artista correcto
    let song =
      hits.find((hit: any) => {
        const title = hit.result.title.toLowerCase();
        const artistName =
          hit.result.primary_artist.name.toLowerCase();

        return (
          title.includes(track.toLowerCase()) &&
          artistName.includes(artist.toLowerCase())
        );
      }) ??
      hits.find((hit: any) =>
        hit.result.title
          .toLowerCase()
          .includes(track.toLowerCase())
      ) ??
      hits[0];

    const songUrl = song.result.url;

    console.log("GENIUS URL:", songUrl);

    // ----------------------------
    // Descargar HTML
    // ----------------------------

    const page = await axios.get(songUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/137 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });

    const $ = cheerio.load(page.data);

    let lyrics = "";

    $('[data-lyrics-container="true"]').each((_, element) => {
      const html =
        $(element)
          .html()
          ?.replace(/<br\s*\/?>/gi, "\n") ?? "";

      const text = cheerio.load(html).text();

      lyrics += text + "\n\n";
    });

    lyrics = lyrics
      .replace(/\n{3,}/g, "\n\n")
      .trim();

    console.log("Lyrics length:", lyrics.length);

    if (!lyrics.length) {
      console.error("Lyrics container found but empty.");

      return res.status(404).json({
        error: "Lyrics not found.",
      });
    }

    return res.status(200).json({
      lyrics,
    });
  } catch (error: any) {
    console.error(error.response?.status);
    console.error(error.config?.url);
  
    return res.status(500).json({
      status: error.response?.status,
      url: error.config?.url,
      details: error.message,
    });
  }
}