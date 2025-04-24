import Link from 'next/link';
import React from 'react'
import * as Icons from "react-icons/fa";


function SideBar() {

    const menuItems = [
        {
          title: "Admin Portal",
          items: [
            {
              icon: <Icons.FaHome /> ,
              label: "Dashboard",
              href: "/",
            },
            {
              icon: <Icons.FaUsers />,
              label: "Users",
              href: "/list/teachers",
            },
            {
              icon: <Icons.FaAccessibleIcon />,
              label: "Support",
              href: "/list/students",
            },
            
            {
              icon: <Icons.FaWhmcs />,
              label: "Settings",
              href: "/settings",
            },
           
          ],
        }
      ];
  return (
    <div className="mt-3 text-sm">
    {menuItems.map((i) => (
      <div className="flex flex-col gap-2" key={i.title}>
        <span className="hidden lg:block text-black  my-4 text-4xl font-medium
 ">
          {i.title}
        </span>
        {i.items.map((item) => {
          if (item) {
            return (
              <Link
                href={item.href}
                key={item.label}
                className="flex items-center justify-center lg:justify-start gap-4 text-gray text-xl py-2 md:px-2 rounded-md hover:bg-lamaSkyLight"
              >
                {item.icon}
                <span className="hidden lg:block">{item.label}</span>
              </Link>
            );
          }
        })}
      </div>
    ))}
  </div>
  )
}

export default SideBar