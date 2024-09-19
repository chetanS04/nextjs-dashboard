import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';

// Children lets you manipulate and transform the JSX you received as the children prop.

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}

// That's right, the layout file is the best way to create a shared layout that all pages in your application can use.