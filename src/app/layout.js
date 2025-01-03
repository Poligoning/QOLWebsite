import { Comfortaa } from 'next/font/google';
import './globals.css';

const comfortaa = Comfortaa({
  variable: '--font-comfortaa',
  subsets: ['latin'],
});

export const metadata = {
  title: 'QOL Website',
  description: 'idk yet tbh lolll',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${comfortaa.variable} antialiased`}>{children}</body>
    </html>
  );
}
