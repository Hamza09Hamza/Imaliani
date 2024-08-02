import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Roboto } from 'next/font/google'
import {Abril_Fatface} from 'next/font/google'
 
export const roboto = Roboto({
  weight: ['400','300'],
  subsets: ['latin'],
  variable: '--font-roboto',

})

export const abrilFatface = Abril_Fatface({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-Abril',

});

const inter = Inter({ 
  weight: '400',
subsets: ['latin'],
variable: '--font-inter', });

export const metadata: Metadata = {
  title: "Imaliani craft studio",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable} ${abrilFatface.variable} `}>
      <body >{children}</body>
    </html>
  );
}
