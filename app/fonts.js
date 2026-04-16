import { Urbanist , Inter } from "next/font/google";

export const urbanist = Urbanist({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-urbanist",
})

export const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-inter",
})