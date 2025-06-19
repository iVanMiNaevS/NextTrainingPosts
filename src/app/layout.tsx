import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Posts page",
	description: "this is posts page",
};

type linksInHeader = {
	name: string;
	href: string;
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const links: linksInHeader[] = [
		{name: "posts", href: "/"},
		{name: "about", href: "/about"},
		{name: "profile", href: "/profile"},
	];
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<header>
					<div className="logo">logo</div>
					<nav>
						{links.map((link) => {
							return (
								<Link key={link.href} href={link.href}>
									{link.name}
								</Link>
							);
						})}
					</nav>
				</header>
				<main>
					<div className="container">{children}</div>
				</main>
			</body>
		</html>
	);
}
