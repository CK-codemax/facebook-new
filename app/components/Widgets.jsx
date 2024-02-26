import Contact from "./Contact"

const contacts = [{src : 'https://dailypost.ng/wp-content/uploads/2021/02/davido-1200x899.jpg', name : 'David Adeleke',},
{src : 'https://dailypost.ng/wp-content/uploads/2020/06/Wizkid.jpg', name : 'Wizkid Balogun',},
{src : 'https://dailypost.ng/wp-content/uploads/2023/01/Collage-Maker-31-Jan-2023-04.01-PM.jpg', name : 'Ayra Star',},
{src : 'https://dailypost.ng/wp-content/uploads/2023/01/Tems-1424x802-1.jpg', name : 'Tems Opeyemi',},
{src : 'https://dailypost.ng/wp-content/uploads/2023/05/Rema.jpg', name : 'Rema',},
{src : 'https://dailypost.ng/wp-content/uploads/2023/04/Victony.jpg', name : 'Victony',},
{src : 'https://dailypost.ng/wp-content/uploads/2021/08/Osimhen-1.jpg', name : 'Victor Osimhen',},
{src : 'https://dailypost.ng/wp-content/uploads/2022/11/iwobi.jpg', name : 'Alex Iwobi',},
{src : 'https://dailypost.ng/wp-content/uploads/2023/07/Johnny-Drille.jpg', name : 'Johnny Drille',},
{src : 'https://dailypost.ng/wp-content/uploads/2015/10/Genevieve-Nnaji-1200x783.png', name : 'Genevieve Nnaji',},
{src : 'https://dailypost.ng/wp-content/uploads/2024/01/MixCollage-15-Jan-2024-08-59-AM-8391.jpg', name : 'Funke Akindele',},
{src : 'https://dailypost.ng/wp-content/uploads/2023/08/Deyemi-Okanlawon-Net-Worth-And-Biography.jpg', name : 'Deyemi Okanlawon',},
{src : 'https://dailypost.ng/wp-content/uploads/2023/05/Tinubu-4-1200x900-1-1.jpg', name : 'Bola Tinubu',},
{src : 'https://dailypost.ng/wp-content/uploads/2023/01/Peter-Obi.jpg', name : 'Peter Obi',},
{src : 'https://dailypost.ng/wp-content/uploads/2022/01/teni.jpg', name : 'Teniola',},
]



export default function Widgets(){

return(
<div className='hidden border-black lg:flex h-screen scrollbar-hide overflow-y-auto flex-col w-60 border-2 p-2 pt-4'>


{contacts.map((contact) => <Contact key={contact.src} src={contact.src} name={contact.name} />)}
</div>
)}