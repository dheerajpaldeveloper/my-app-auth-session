import "../globals.css";
import { isAuthenticated } from '@/app/utils/session';
import { redirect } from 'next/navigation';
import Header from "./components/header";
import SideBar from "./components/sidebar";





export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuth = await isAuthenticated();
  
  if (!isAuth) {
    redirect('/login');
  }

  return (

    <div className="h-screen flex">
    {/* LEFT */}
    <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-3">
  
      <SideBar />
    </div>
    {/* RIGHT */}
    <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] overflow-scroll flex flex-col">
      <Header />
      {children}
    </div>
  </div>

    //
   
        // <div  className='flex gap-2 m-2'>

        //   <div className="border-2">
        //     <SideBar />
        //   </div>

        //   <div >
        //     <div className="border-2" ><Header  /></div>
            
        //     <div className="border-2" >
        //       {children}
        //     </div>
        //   </div>

        // </div>
        

  );
}
