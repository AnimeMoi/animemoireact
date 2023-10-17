import { SourceProvider } from "./context/SourceContext";
import { GlobalProvider } from "./context/store";
import { quicksand } from "./font";
import "./globals.css";

export const metadata = {
	title: "AnimeMoi",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={quicksand.className}>
			<body>
				<GlobalProvider>
					<SourceProvider>{children}</SourceProvider>
				</GlobalProvider>
			</body>
		</html>
	);
}
