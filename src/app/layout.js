import './globals.css';
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'robotlee10 // Portfolio',
  description: 'System Outpost Portfolio Matrix',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
        <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2" defer></script>
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
