"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Header() {
  const { data } = useSession();

  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div className="p-5 shadow-sm flex justify-between">
      <div className="flex gap-20 items-center">
        <Image src="/logo.svg" alt="logo" width={150} height={50} />
        <div className="md:flex gap-10 font-semibold hidden">
          <Link href="/" className="hover:scale-105 hover:text-purple-600">
            Home
          </Link>
          <Link href="/search/Services" className="hover:scale-105 hover:text-purple-600">
            Services
          </Link>
          <Link href="/" className="hover:scale-105 hover:text-purple-600">
            About
          </Link>
        </div>
      </div>
      <div>
        {data?.user ? (
          <DropdownMenu> 
            <DropdownMenuTrigger asChild>
              <Image
                src={data.user.image}
                alt="user-image"
                height={35}
                width={35}
                className="rounded-full"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem><Link href="/mybooking">My Bookings</Link></DropdownMenuItem>
              <DropdownMenuItem onClick={()=>signOut()} >Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            className="bg-purple-700 hover:bg-purple-800"
            onClick={() => signIn("descope")}
          >
            Login / Sign Up
          </Button>
        )}
      </div>
    </div>
  );
}

export default Header;
