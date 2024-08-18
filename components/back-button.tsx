import Link from "next/link";

export default function BackButton() {
    return (
        <Link
            className="cursor-pointer absolute top-5 left-5 px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200"
            href="/"
        >
            Back to menu
        </Link>
    )
}