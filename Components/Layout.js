import Nav from "@/Components/Nav";
import { useSession, signIn, signOut } from "next-auth/react"

export default function Layout({children}) {
  const { data: session } = useSession();
  if (!session){
    return (
    <div className={'bg-blue-900 w-screen h-screen flex items-center' }>
      <div className="text-center w-full ">
        <button onClick={() => signIn('google')} className="bg-white p-2 px-4 rounded-lg">Login with Google</button>
      </div>
    </div>
    );
  }
  return(
    <div className="bg-[#AC3520] min-h-screen flex">
      <Nav/>
      <div className="text-black bg-white flex-grow mt-2 mr-2 rounded-lg p-4">
        {children}
      </div>
    </div>
    
  );
}
