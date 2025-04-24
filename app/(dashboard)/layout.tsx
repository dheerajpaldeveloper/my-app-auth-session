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
    <html >
      <body>
        <div  className='flex gap-2 m-2'>

          <div className="border-2">
            <SideBar />
          </div>

          <div >
            <div className="border-2" ><Header  /></div>
            
            <div className="border-2" >
              {children}
            </div>
          </div>

        </div>
        
        
      </body>
    </html>
  );
}
