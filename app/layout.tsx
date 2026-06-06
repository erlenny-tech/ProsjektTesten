import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NAV Simuleringslab for sykefraværsoppfølging',
  description: 'MVP for å simulere regelendringer i NAVs sykefraværsoppfølging.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no">
      <body>{children}</body>
    </html>
  );
}
