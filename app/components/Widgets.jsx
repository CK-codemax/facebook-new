import { contacts } from "../src/contacts"
import Contact from "./Contact"





export default function Widgets(){

return(
<div className='hidden lg:flex h-screen scrollbar-hide overflow-y-auto flex-col w-60 p-2 pt-4'>


{contacts.map((contact) => <Contact key={contact.src} src={contact.src} name={contact.name} />)}
</div>
)}