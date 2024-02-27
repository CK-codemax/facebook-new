import Feed from "./components/Feed";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Widgets from "./components/Widgets";


export default function page() {
  return(
     
   <>
     <Header />
        <main className="bg-gray-100 flex">
        <Sidebar />
        <Feed />
        <Widgets />
        </main>
   </>
  )
}
