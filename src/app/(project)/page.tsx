import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Landig page</h1>
      <Link href="/login">
      <button>
        login
        </button>
        </Link>
      
    </div>
  );
}
