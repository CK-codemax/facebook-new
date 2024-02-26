import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Widgets from "./components/Widgets";


export default function page() {
  return(
     
   <>
     <Header />
        <main className="flex">
        <Sidebar />
        <Widgets />
        </main>
   </>
  )
}
