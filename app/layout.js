export const metadata = {
  title: 'Builder App',
  description: 'Next.js app scaffolded automatically',
};

import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
