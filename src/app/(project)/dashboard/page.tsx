import { handleAuth } from "@/app/actions/handle-auth"
import { auth } from "@/app/lib/auth"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function Dashboard() {
  //we are in the server-side
  const session = await auth()

  if(!session) {
  redirect("/login")
  }

  return (
  <div className="flex flex-col gap-4 h-screen justify-center items-center">
    <h1 className="text-4xl font-bold">
      Protected Dashboard
    </h1>
    <p>{session?.user?.email ? `Hello ${session?.user?.email} `: "User not signed in"}</p>
    {
      session && (
        <form action={(handleAuth)}>
          <button className="rounded-md border px-4 py-2 cursor-pointer" type="submit">Logout</button>
        </form>
      )
    }
  <Link href="/payments">
  Payments</Link>
  </div>
  )
}