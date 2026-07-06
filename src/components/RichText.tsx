// import React from 'react';

interface RichTextProps {
  content: string;
  accentColor: string;
}

function parseInline(text: string) {
  // **bold**
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // *italic*
  text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // _italic_
  text = text.replace(/_(.*?)_/g, '<em>$1</em>');

  return text;
}

export function RichText({ content, accentColor }: RichTextProps) {
  const blocks = content.split('\n\n');

  return (
    <div
      style={{
        fontSize: 17,
        lineHeight: 1.95,
        color: 'rgba(255,255,255,.82)',
      }}
    >
      {blocks.map((block, index) => {

        const text = block.trim();

        // --------------------------
        // H1
        // --------------------------

        if (text.startsWith('# ')) {
          return (
            <h1
              key={index}
              style={{
                fontFamily: 'Raleway',
                fontWeight: 800,
                fontSize: 42,
                lineHeight: 1.2,
                marginTop: 70,
                marginBottom: 24,
                color: '#fff'
              }}
            >
              {text.slice(2)}
            </h1>
          );
        }

        // --------------------------
        // H2
        // --------------------------

        if (text.startsWith('## ')) {
          return (
            <h2
              key={index}
              style={{
                fontFamily: 'Raleway',
                fontWeight: 700,
                fontSize: 30,
                marginTop: 56,
                marginBottom: 18,
                color: '#fff'
              }}
            >
              {text.slice(3)}
            </h2>
          );
        }

        // --------------------------
        // H3
        // --------------------------

        if (text.startsWith('### ')) {
          return (
            <h3
              key={index}
              style={{
                fontFamily: 'Raleway',
                fontWeight: 700,
                fontSize: 22,
                marginTop: 40,
                marginBottom: 16,
                color: '#fff'
              }}
            >
              {text.slice(4)}
            </h3>
          );
        }

        // --------------------------
        // Quote
        // --------------------------
        // > Quote...

        if (text.startsWith('>')) {
          return (
            <blockquote
              key={index}
              style={{
                margin: '42px 0',
                paddingLeft: 28,
                borderLeft: `4px solid ${accentColor}`,
                color: 'rgba(255,255,255,.75)',
                fontFamily: 'Cormorant Garamond',
                fontSize: 25,
                fontStyle: 'italic',
                lineHeight: 1.8,
              }}
            >
              {text.replace(/^>\s*/, '')}
            </blockquote>
          );
        }

        // --------------------------
        // Horizontal rule
        // --------------------------

        if (text === '---') {
          return (
            <hr
              key={index}
              style={{
                margin: '60px 0',
                border: 0,
                borderTop: '1px solid rgba(255,255,255,.08)'
              }}
            />
          );
        }

        // --------------------------
        // Caption
        // --------------------------
        // ![ ]

        if (text.startsWith('![') && text.endsWith(']')) {
          return (
            <div
              key={index}
              style={{
                textAlign: 'center',
                fontSize: 13,
                color: 'rgba(255,255,255,.4)',
                marginTop: -10,
                marginBottom: 42,
                letterSpacing: '.05em'
              }}
            >
              {text.slice(2, -1)}
            </div>
          );
        }

        // --------------------------
        // Image
        // --------------------------
        // [[image:../../public/images/album-5/gallery-9.jpg|waterproof - Single]]
        if (text.startsWith('[[image:') && text.endsWith(']]')) {
          const raw = text.slice(8, -2);
          const parts = raw.split('|');
        
          let align = 'center';
          let width = '100%';
          let src = '';
          let caption = '';
        
          if (parts.length === 4) {
            [align, width, src, caption] = parts;
            width += '%';
          } else {
            [src, caption] = parts;
          }
        
          return (
            <figure
              key={index}
              style={{
                width,
                float: align === 'right' ? 'right' : align === 'left' ? 'left' : 'none',
                margin:
                  align === 'right'
                    ? '12px 0 24px 32px'
                    : align === 'left'
                    ? '12px 32px 24px 0'
                    : '52px auto',
              }}
            >
              <img
                src={src.trim()}
                alt={caption}
                style={{
                  width: '100%',
                  display: 'block',
                  borderRadius: 18,
                }}
              />
        
              {caption && (
                <figcaption
                  style={{
                    marginTop: 10,
                    textAlign: 'center',
                    fontSize: 13,
                    color: 'rgba(255,255,255,.45)',
                  }}
                >
                  {caption}
                </figcaption>
              )}
            </figure>
          );
        }

        // --------------------------
        // Normal paragraph
        // --------------------------

        return (
          <p
            key={index}
            style={{
              marginBottom: 30
            }}
            dangerouslySetInnerHTML={{
              __html: parseInline(text)
            }}
          />
        );

      })}
    </div>
  );
}