import type {Metadata} from "next";
import MainForm from "@/components/Form/MainForm";

export const metadata: Metadata = {
  title: "React19 + Next 15+ Form",
  description: "For your use 😎",
};

export default function Home() {

    return (
        <div className="container mx-auto h-screen flex items-center justify-center font-[family-name:var(--font-geist-sans)]">
            <main className="flex items-center justify-center w-full">
                <MainForm />
            </main>
        </div>
    );
}
