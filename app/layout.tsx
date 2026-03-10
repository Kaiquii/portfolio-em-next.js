import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import ThemeProvider from "./components/ThemeProvider";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Portfólio - Kaiqui Dev",
  description: "Desenvolvedor Full Stack apaixonado por tecnologia",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Kaiqui Dev",
  },
};

export const viewport: Viewport = {
  themeColor: "#d12f7a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className="scroll-smooth dark">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
        />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                let theme = localStorage.getItem('theme-storage');
                if (theme) {
                  theme = JSON.parse(theme).state.theme;
                  if (theme === 'light') document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className={`${poppins.variable} antialiased bg-gray-50 text-black dark:bg-black dark:text-white`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}