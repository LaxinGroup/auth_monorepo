import './globals.css';

export const metadata = {
  title: 'Auth Demo',
  description: 'Next.js + Express + Neon + JWT',
};

export default function RootLayout({ children }) {
  return (
    // Add data-theme="dark" right here!
    <html lang="en" data-theme="dark">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

