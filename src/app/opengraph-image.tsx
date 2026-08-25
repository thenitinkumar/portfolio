import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          background: '#0a0a0a',
          padding: '80px 96px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Monogram */}
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            background: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 40,
          }}
        >
          <span style={{ color: '#0a0a0a', fontSize: 22, fontWeight: 700, letterSpacing: '-0.03em' }}>
            nk.
          </span>
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            marginBottom: 16,
          }}
        >
          Nitin Kumar R
        </div>

        {/* Role line */}
        <div
          style={{
            fontSize: 28,
            color: '#71717a',
            fontWeight: 400,
            letterSpacing: '-0.01em',
          }}
        >
          Backend Engineer · Deloitte
        </div>

        {/* Domain */}
        <div
          style={{
            position: 'absolute',
            bottom: 64,
            right: 96,
            fontSize: 18,
            color: '#3f3f46',
            letterSpacing: '0.02em',
          }}
        >
          nitinkumar.dev
        </div>
      </div>
    ),
    { ...size }
  )
}
