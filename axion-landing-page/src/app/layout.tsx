import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'glightbox/dist/css/glightbox.css'

const playflair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playflair-display',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: "Axion",
  description: "For a healthier future.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playflair.variable} antialiased`}
      >
        {children}
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossOrigin="anonymous"></script>
      </body>
    </html>
  );
}
