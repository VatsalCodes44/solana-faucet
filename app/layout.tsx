import '@solana/wallet-adapter-react-ui/styles.css'; // This first
import "./globals.css";
import { ThemeProvider } from "@/ui/theme-provider"
import { Toaster } from '@/components/ui/sonner';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={` antialiased`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            
          {children}
           <Toaster richColors position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
