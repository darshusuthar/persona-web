import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

// The card that shows up when the site link is shared (LinkedIn, X, WhatsApp, Slack…):
// Darshan's photo, name and title over the hero's soft colour pools.

export const alt = 'Darshan Suthar — A design leader who ships: craft, teams and strategy';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const NAME = 'Darshan Suthar';
const TITLE = 'A design leader who ships: craft, teams and strategy';
const SITE = 'darshansuthar.me';

export default async function Image() {
  const dir = join(process.cwd(), 'assets/og');
  const [photo, regular, medium, semibold] = await Promise.all([
    readFile(join(dir, 'portrait.jpg'), 'base64'),
    readFile(join(dir, 'Poppins-Regular.ttf')),
    readFile(join(dir, 'Poppins-Medium.ttf')),
    readFile(join(dir, 'Poppins-SemiBold.ttf')),
  ]);

  const blob = (left: number, top: number, d: number, color: string) => (
    <div
      style={{
        position: 'absolute',
        left,
        top,
        width: d,
        height: d,
        borderRadius: d,
        background: `radial-gradient(circle, ${color} 0%, rgba(255,255,255,0) 70%)`,
      }}
    />
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          background: '#ffffff',
          fontFamily: 'Poppins',
          color: '#111114',
        }}
      >
        {/* the hero's pastel colour pools */}
        {blob(-160, -220, 720, 'rgba(255,188,135,.55)')}
        {blob(300, 260, 680, 'rgba(165,150,255,.45)')}
        {blob(-120, 300, 560, 'rgba(150,225,200,.45)')}
        {blob(420, -260, 620, 'rgba(240,165,215,.40)')}
        {blob(760, 220, 640, 'rgba(140,190,255,.40)')}

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '0 0 0 80px',
            width: 700,
          }}
        >
          <div style={{ fontSize: 76, fontWeight: 600, letterSpacing: -2.5, lineHeight: 1.05 }}>{NAME}</div>
          <div style={{ fontSize: 34, fontWeight: 400, lineHeight: 1.35, marginTop: 24, color: '#3a3a42' }}>
            {TITLE}
          </div>
          <div style={{ fontSize: 24, fontWeight: 500, marginTop: 48, color: '#6b6b75' }}>{SITE}</div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, paddingRight: 70 }}>
          <img
            src={`data:image/jpeg;base64,${photo}`}
            width={400}
            height={478}
            style={{ borderRadius: 32, objectFit: 'cover', boxShadow: '0 30px 60px rgba(30,20,60,.18)' }}
          />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Poppins', data: regular, weight: 400, style: 'normal' },
        { name: 'Poppins', data: medium, weight: 500, style: 'normal' },
        { name: 'Poppins', data: semibold, weight: 600, style: 'normal' },
      ],
    }
  );
}
