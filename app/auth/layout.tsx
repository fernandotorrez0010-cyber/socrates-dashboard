import { AuthProvider } from "@/context/AuthContext";
import "../globals.css";
import { UserProvider } from "@/context/UserContext";

import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Socrates Investments | Auth",
	description: "Socrates Investments - Live Future trading, AI Bot and Signals",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<AuthProvider>
				<UserProvider>
					<body>{children}</body>
				</UserProvider>
			</AuthProvider>
		</html>
	);
}
