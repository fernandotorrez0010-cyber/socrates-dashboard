import { AuthProvider } from "@/context/AuthContext";
import { UserProvider } from "@/context/UserContext";

export const metadata = {
	title: "Socrates Investments | Auth",
	description: "Socrates Investments - Live Future trading, AI Bot and Signals",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<AuthProvider>
			<UserProvider>
				{children}
			</UserProvider>
		</AuthProvider>
	);
}
