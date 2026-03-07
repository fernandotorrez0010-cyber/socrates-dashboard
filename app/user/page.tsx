import Dashboard from "@/components/Dashboard/Dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Socrates Investments | Dashboard",
	description: "Socrates Investments - Live Future trading, AI Bot and Signals",
};

export default function Home() {
	return (
		<>
			<Dashboard />
		</>
	);
}
