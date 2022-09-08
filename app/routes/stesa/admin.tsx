import { Button, MobileNav, Typography , IconButton, Navbar} from "@material-tailwind/react"
import { Link, Outlet, useLoaderData } from "@remix-run/react"
import type { LoaderArgs, LoaderFunction } from "@remix-run/node"
import { json, redirect } from "@remix-run/node";
import { getStesaList } from "~/models/stesa.server"
import { getUserId } from "~/session.server";
import { getAdminById } from "~/models/user.server";
import { useEffect, useState } from "react";

type LoaderData = {
   stese: Awaited<ReturnType<typeof getStesaList>>
}

export const loader: LoaderFunction = async({request}: LoaderArgs) => {
   const stese = await getStesaList()
   const userId = await getUserId(request);
   const isAdmin = await getAdminById(userId!)
   
   if (!userId){
   return redirect("/login");
   }

   if(isAdmin?.isAdmin === false){
   return redirect("/")
   }

   return json<LoaderData>({stese});
}


export default function AdminRoute() {
   const [openNav, setOpenNav] = useState(false);
   const { stese } = useLoaderData() as LoaderData;

   useEffect(() => {
      window.addEventListener(
        "resize",
        () => window.innerWidth >= 960 && setOpenNav(false)
      );
    }, []);

    const navList = (
      <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-bold hover:text-red-900"
        >
          <Link to="/profile" className="flex items-center">
            Profile
          </Link>
        </Typography>
      </ul>
    );

   return (
      <div className="mx-auto max-w-full h-full">
         <Navbar className="mx-auto max-w-full py-2 lg:py-4">
          <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
            <Typography
              variant="small"
              className="mr-4 cursor-pointer py-1.5 font-normal"
            >
              <span>Pannello di controllo</span>
            </Typography>
            <div className="hidden lg:block">{navList}</div>
              <Link to="/">
                <Button variant="gradient" size="sm" className="hidden lg:inline-block">
                  <span className="flex flex-row justify-center">                   
                    <svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 52 52" fill="white"><path d="M8 42V18L24.1 6 40 18v24H28.3V27.75h-8.65V42Zm3-3h5.65V24.75H31.3V39H37V19.5L24.1 9.75 11 19.5Zm13-14.65Z"/></svg>
                    <Typography className="font-bold">Homepage</Typography>
                  </span>
                </Button>
              </Link>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
            {openNav ? (
              <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
              </svg>
              ) : (
              <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
              </svg>
            )}
            </IconButton>
          </div>
          <MobileNav open={openNav}>
          {navList}
            <Link to="/">
              <Button variant="gradient" size="sm" fullWidth className="mb-2">
                <span>Homepage</span>
              </Button>
            </Link>
          </MobileNav>
        </Navbar>
        <div className="h-full contain w-full p-4">
          <nav className="col-span-2 md:col-span-1 bg-red-900 hidden">
            <ul>
              {stese.map((stesa) => (
              <li key={stesa.id}>
                <Link to={stesa.id}>
                  {stesa.titolo}
                </Link>
              </li>
              ))}
            </ul>
          </nav>
          <Outlet />
        </div>
      </div>
   )
}