import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Roboto } from 'next/font/google'
import {Abril_Fatface} from 'next/font/google'
 
const roboto = Roboto({
  weight: ['400','300'],
  subsets: ['latin'],
  variable: '--font-roboto',

})

const abrilFatface = Abril_Fatface({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-Abril',

});


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
