import Link from "next/link";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Widgets from "./components/Widgets";
import AuthProvider from "./context/AuthProvider";


export default function page() {
  return(
     
   <AuthProvider>
     <Header />
        <main className="flex">
        <Sidebar />
        <Widgets />
        </main>
   </AuthProvider>
  )
}
