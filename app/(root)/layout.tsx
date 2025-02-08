import MoblieNavbar from "@/components/MoblieNavbar";
import SideBar from "@/components/SideBar";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = {firstName: 'Nikhil', lastName:'JSM'}; 

  return (
    <main className="flex h-screen w-full font-inter">
        <SideBar user={loggedIn}/>
        <div className="flex size-full flex-col">
          <div className="root-layout">
            <Image src="/icons/logo.svg" width={30} height={30} alt="logo"/>
            <div>
              <MoblieNavbar user={loggedIn}/>
            </div>
          </div>
        </div>
        {children}
    </main>
  );
}
