import Link from "next/link";


export default function page() {
  return(
    <div>
    <p>welcome to my facebook clone</p>
    <p>LET US SEE</p>
   <Link href={'/api/auth/signin/google'}>SIGNIN</Link>
  </div>
    
  )
}
