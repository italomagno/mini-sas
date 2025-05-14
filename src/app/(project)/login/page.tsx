import { handleAuth } from "@/app/actions/handle-auth";


export default function login() {
  return (<div className=" flex flex-col gap-6 items-center justify-center h-screen">
    <h1 className="text-4xl font-bold">Login</h1>
    <form
      action={handleAuth}
    >
      <button className="rounded-md border px-4 py-2 cursor-pointer" type="submit">Signin with Google</button>
    </form>
  </div>
)
}