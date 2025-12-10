import '@solana/wallet-adapter-react-ui/styles.css'; // This first
import "./globals.css";
import { ThemeProvider } from "@/ui/theme-provider"
import { Toaster } from '@/components/ui/sonner';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import WalletContextProvider from '@/components/connectionProvider';
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const network = WalletAdapterNetwork.Devnet;
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
          <WalletContextProvider >
            {children}
            <Toaster richColors position="top-center" />
          </WalletContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
