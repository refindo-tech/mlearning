import dynamic from "next/dynamic"; // Imports dynamic from Next.js for dynamic component loading

// Defines the Home component, which is the main page component
export default function Home() {
    // Dynamically imports the TextEditor component from "./Components/TextEditor/TextEditor"
    const TextEditor = dynamic(
        () => import("@/components/Quill"), // Path to the TextEditor component file
        {
            ssr: false, // Disables server-side rendering (SSR) for this component
        }
    );

    // Renders the Home component
    return (
        <div>
            <TextEditor /> {/* Renders the dynamically imported TextEditor component */}
        </div>
    );
}