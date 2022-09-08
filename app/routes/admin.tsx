import {
  Button,
  MobileNav,
  Typography,
  IconButton,
  Navbar,
} from "@material-tailwind/react";
import { Form, Link, NavLink, Outlet } from "@remix-run/react";
import type { LoaderArgs, LoaderFunction } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { getUserAdminId, getUserId } from "~/session.server";
import { useEffect, useState } from "react";

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  const userId = await getUserId(request);
  const isAdmin = await getUserAdminId(request);

  if (!userId) {
    return redirect("/login");
  }

  if (isAdmin === false) {
    return redirect("/");
  }

  return json(isAdmin);
};

export default function AmministrazioneIndexRoute() {
  const [openNav, setOpenNav] = useState(false);
  const [color, setColor] = useState("bg-white");

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const changeBgColor = {
    backgroundColor: "rgb(229 231 235)",
  };

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-1 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-bold"
      >
        <NavLink
          to="/admin"
          style={({ isActive }) => (isActive ? changeBgColor : null)}
          onClick={() => setOpenNav(!openNav)}
          end
        >
          <li
            id="bottone-menu-dashboard"
            className={`group flex h-full flex-row`}
          >
            <div className="mx-2 my-2 grid h-min w-min rounded-lg bg-purple-500 p-1 group-hover:bg-purple-900 ">
              <svg
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                width="24"
                viewBox="0 0 50 50"
              >
                <path d="M25.5 19.5V6H42v13.5ZM6 25.5V6h16.5v19.5ZM25.5 42V22.5H42V42ZM6 42V28.5h16.5V42Zm3-19.5h10.5V9H9ZM28.5 39H39V25.5H28.5Zm0-22.5H39V9H28.5ZM9 39h10.5v-7.5H9Zm10.5-16.5Zm9-6Zm0 9Zm-9 6Z" />
              </svg>
            </div>
            <div className="flex h-full w-full flex-row border-b-2 py-3">
              <Typography className="grid grow content-center font-medium">
                Dashboard
              </Typography>
              <div className="grid content-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="grey"
                  height="24"
                  width="24"
                  viewBox="0 0 50 50"
                >
                  <path d="m15.2 43.9-2.8-2.85L29.55 23.9 12.4 6.75l2.8-2.85 20 20Z" />
                </svg>
              </div>
            </div>
          </li>
        </NavLink>
        {/* BOTTONE - CREA NUOVA STESA - MENU MOBILE */}
        <Link to="new"
          onClick={() => setOpenNav(!openNav)}
        >
          <li id="bottone-menu-crea" className=" group flex h-full flex-row">
            <div className="mx-2 my-2 grid h-min w-min rounded-lg bg-blue-500 p-1 group-hover:bg-blue-900">
              <svg
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                width="24"
                viewBox="0 0 50 50"
              >
                <path d="M22.5 38V25.5H10v-3h12.5V10h3v12.5H38v3H25.5V38Z" />
              </svg>
            </div>
            <div className="flex h-full w-full flex-row border-b-2 py-3">
              <Typography className="grid grow content-center font-medium">
                Crea una nuova stesa
              </Typography>
              <div className="grid content-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="grey"
                  height="24"
                  width="24"
                  viewBox="0 0 50 50"
                >
                  <path d="m15.2 43.9-2.8-2.85L29.55 23.9 12.4 6.75l2.8-2.85 20 20Z" />
                </svg>
              </div>
            </div>
          </li>
        </Link>
        {/* BOTTONE LISTA DELLE STESE MENU MOBILE */}
        <Link to="lista"
          onClick={() => setOpenNav(!openNav)}
        >
          <li id="bottone-menu-lista" className=" group flex h-full flex-row">
            <div className="mx-2 my-2 grid h-min w-min rounded-lg bg-green-500 p-1 group-hover:bg-green-900">
              <svg
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                width="24"
                viewBox="0 0 50 50"
              >
                <path d="M8.55 39q-1.05 0-1.8-.725T6 36.55q0-1.05.75-1.8t1.8-.75q1 0 1.725.75.725.75.725 1.8 0 1-.725 1.725Q9.55 39 8.55 39ZM16 38v-3h26v3ZM8.55 26.5q-1.05 0-1.8-.725T6 24q0-1.05.75-1.775.75-.725 1.8-.725 1 0 1.725.75Q11 23 11 24t-.725 1.75q-.725.75-1.725.75Zm7.45-1v-3h26v3ZM8.5 14q-1.05 0-1.775-.725Q6 12.55 6 11.5q0-1.05.725-1.775Q7.45 9 8.5 9q1.05 0 1.775.725Q11 10.45 11 11.5q0 1.05-.725 1.775Q9.55 14 8.5 14Zm7.5-1v-3h26v3Z" />
              </svg>
            </div>
            <div className="flex h-full w-full flex-row border-b-2 py-3">
              <Typography className="grid grow content-center font-medium">
                Lista delle stese
              </Typography>
              <div className="grid content-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="grey"
                  height="24"
                  width="24"
                  viewBox="0 0 50 50"
                >
                  <path d="m15.2 43.9-2.8-2.85L29.55 23.9 12.4 6.75l2.8-2.85 20 20Z" />
                </svg>
              </div>
            </div>
          </li>
        </Link>
        {/* BOTTONE SETTINGS PROFILO MENU MOBILE*/}
        <Link to="profilo"
         onClick={() => setOpenNav(!openNav)}
        >
          <li id="bottone-menu-lista" className=" group flex h-full flex-row">
            <div className="mx-2 my-2 grid h-min w-min rounded-lg bg-yellow-700 p-1 group-hover:bg-yellow-900">
              <svg
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                width="24"
                viewBox="0 0 50 50"
              >
                <path d="M20 23.75q-3.3 0-5.4-2.1-2.1-2.1-2.1-5.4 0-3.3 2.1-5.4 2.1-2.1 5.4-2.1 3.3 0 5.4 2.1 2.1 2.1 2.1 5.4 0 3.3-2.1 5.4-2.1 2.1-5.4 2.1ZM4 39.8v-4.7q0-1.75.875-3.15T7.4 29.8q3.6-1.6 6.675-2.3 3.075-.7 5.925-.7h1.15q-.3.7-.45 1.375-.15.675-.25 1.625H20q-2.9 0-5.675.625T8.6 32.5q-.8.4-1.2 1.125Q7 34.35 7 35.1v1.7h13.45q.25.9.6 1.625t.85 1.375ZM33.35 42l-.5-3.3q-.85-.25-1.725-.725-.875-.475-1.475-1.075l-2.75.6-1.25-2.1L28 33.2q-.1-.45-.1-1.25t.1-1.25l-2.35-2.2 1.25-2.1 2.75.6q.6-.6 1.475-1.075.875-.475 1.725-.725l.5-3.3h2.7l.5 3.3q.85.25 1.725.725.875.475 1.475 1.075l2.75-.6 1.25 2.1-2.35 2.2q.1.45.1 1.25t-.1 1.25l2.35 2.2-1.25 2.1-2.75-.6q-.6.6-1.475 1.075-.875.475-1.725.725l-.5 3.3Zm1.35-6.05q1.8 0 2.9-1.1 1.1-1.1 1.1-2.9 0-1.8-1.1-2.9-1.1-1.1-2.9-1.1-1.8 0-2.9 1.1-1.1 1.1-1.1 2.9 0 1.8 1.1 2.9 1.1 1.1 2.9 1.1ZM20 20.75q1.95 0 3.225-1.275Q24.5 18.2 24.5 16.25q0-1.95-1.275-3.225Q21.95 11.75 20 11.75q-1.95 0-3.225 1.275Q15.5 14.3 15.5 16.25q0 1.95 1.275 3.225Q18.05 20.75 20 20.75Zm0-4.5Zm.45 20.55Z" />
              </svg>
            </div>
            <div className="flex h-full w-full flex-row border-b-2 py-3">
              <Typography className="grid grow content-center font-medium">
                Impostazioni Profilo
              </Typography>
              <div className="grid content-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="grey"
                  height="24"
                  width="24"
                  viewBox="0 0 50 50"
                >
                  <path d="m15.2 43.9-2.8-2.85L29.55 23.9 12.4 6.75l2.8-2.85 20 20Z" />
                </svg>
              </div>
            </div>
          </li>
        </Link>
        {/* BOTTONE LOG-OUT MENU MOBILE */}
        <Form action="/logout" method="post">
          <button type="submit" className=" group flex h-full w-full flex-row">
            <div className="mx-2 my-2 grid h-min w-min rounded-lg bg-orange-500 p-1 group-hover:bg-red-900">
              <svg
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                width="24"
                viewBox="0 0 50 50"
              >
                <path d="M9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h14.55v3H9v30h14.55v3Zm24.3-9.25-2.15-2.15 5.1-5.1h-17.5v-3h17.4l-5.1-5.1 2.15-2.15 8.8 8.8Z" />
              </svg>
            </div>
            <div className="flex h-full w-full flex-row border-b-2 py-3">
              <Typography className="grid grow content-center text-left font-medium">
                Logout
              </Typography>
              <div className="grid content-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="grey"
                  height="24"
                  width="24"
                  viewBox="0 0 50 50"
                >
                  <path d="m15.2 43.9-2.8-2.85L29.55 23.9 12.4 6.75l2.8-2.85 20 20Z" />
                </svg>
              </div>
            </div>
          </button>
        </Form>
      </Typography>
    </ul>
  );

  return (
    <div className="mx-auto h-screen max-h-full w-full max-w-full">
      <Navbar className="max-w-full py-2 lg:py-4">
        <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
          <Link to="/admin">
            <Typography
              variant="paragraph"
              className="mr-4 cursor-pointer py-1.5 font-medium"
            >
              <span>Pannello di controllo</span>
            </Typography>
          </Link>
          <div className="hidden">{navList}</div>
          <Link to="/">
            <Button
              variant="outlined"
              size="sm"
              className="hidden lg:inline-block"
              ripple={true}
            >
              <span className="flex flex-row justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="25"
                  width="25"
                  viewBox="0 0 52 52"
                  fill="#2096f3"
                >
                  <path d="M8 42V18L24.1 6 40 18v24H28.3V27.75h-8.65V42Zm3-3h5.65V24.75H31.3V39H37V19.5L24.1 9.75 11 19.5Zm13-14.65Z" />
                </svg>
                <Typography className="font-bold normal-case">
                  Pagina Principale
                </Typography>
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
              <span>Pagina Principale</span>
            </Button>
          </Link>
        </MobileNav>
      </Navbar>
      <main className="flex h-[calc(100vh-75px)] w-full flex-row">
        <nav className="hidden h-full w-1/4 flex-col bg-white shadow-lg lg:flex">
          <ul className="my-1 flex w-full grow flex-col ">
            <NavLink
              to="/admin"
              style={({ isActive }) => (isActive ? changeBgColor : undefined)}
              end
            >
              <li
                id="bottone-menu-dashboard"
                className={`group flex h-full flex-row`}
              >
                <div className="mx-2 my-2 grid h-min w-min rounded-lg bg-purple-500 p-1 group-hover:bg-purple-900 ">
                  <svg
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    width="24"
                    viewBox="0 0 50 50"
                  >
                    <path d="M25.5 19.5V6H42v13.5ZM6 25.5V6h16.5v19.5ZM25.5 42V22.5H42V42ZM6 42V28.5h16.5V42Zm3-19.5h10.5V9H9ZM28.5 39H39V25.5H28.5Zm0-22.5H39V9H28.5ZM9 39h10.5v-7.5H9Zm10.5-16.5Zm9-6Zm0 9Zm-9 6Z" />
                  </svg>
                </div>
                <div className="flex h-full w-full flex-row border-b-2 py-3">
                  <Typography className="grid grow content-center font-medium">
                    Dashboard
                  </Typography>
                  <div className="grid content-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="grey"
                      height="24"
                      width="24"
                      viewBox="0 0 50 50"
                    >
                      <path d="m15.2 43.9-2.8-2.85L29.55 23.9 12.4 6.75l2.8-2.85 20 20Z" />
                    </svg>
                  </div>
                </div>
              </li>
            </NavLink>
            <NavLink
              to="new"
              style={({ isActive }) => (isActive ? changeBgColor : undefined)}
            >
              <li
                id="bottone-menu-crea"
                className=" group flex h-full flex-row"
              >
                <div className="mx-2 my-2 grid h-min w-min rounded-lg bg-blue-500 p-1 group-hover:bg-blue-900">
                  <svg
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    width="24"
                    viewBox="0 0 50 50"
                  >
                    <path d="M22.5 38V25.5H10v-3h12.5V10h3v12.5H38v3H25.5V38Z" />
                  </svg>
                </div>
                <div className="flex h-full w-full flex-row border-b-2 py-3">
                  <Typography className="grid grow content-center font-medium">
                    Crea una nuova stesa
                  </Typography>
                  <div className="grid content-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="grey"
                      height="24"
                      width="24"
                      viewBox="0 0 50 50"
                    >
                      <path d="m15.2 43.9-2.8-2.85L29.55 23.9 12.4 6.75l2.8-2.85 20 20Z" />
                    </svg>
                  </div>
                </div>
              </li>
            </NavLink>
            <NavLink
              to="lista"
              style={({ isActive }) => (isActive ? changeBgColor : null)}
            >
              <li
                id="bottone-menu-lista"
                className=" group flex h-full flex-row"
              >
                <div className="mx-2 my-2 grid h-min w-min rounded-lg bg-green-500 p-1 group-hover:bg-green-900">
                  <svg
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    width="24"
                    viewBox="0 0 50 50"
                  >
                    <path d="M8.55 39q-1.05 0-1.8-.725T6 36.55q0-1.05.75-1.8t1.8-.75q1 0 1.725.75.725.75.725 1.8 0 1-.725 1.725Q9.55 39 8.55 39ZM16 38v-3h26v3ZM8.55 26.5q-1.05 0-1.8-.725T6 24q0-1.05.75-1.775.75-.725 1.8-.725 1 0 1.725.75Q11 23 11 24t-.725 1.75q-.725.75-1.725.75Zm7.45-1v-3h26v3ZM8.5 14q-1.05 0-1.775-.725Q6 12.55 6 11.5q0-1.05.725-1.775Q7.45 9 8.5 9q1.05 0 1.775.725Q11 10.45 11 11.5q0 1.05-.725 1.775Q9.55 14 8.5 14Zm7.5-1v-3h26v3Z" />
                  </svg>
                </div>
                <div className="flex h-full w-full flex-row border-b-2 py-3">
                  <Typography className="grid grow content-center font-medium">
                    Lista delle stese
                  </Typography>
                  <div className="grid content-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="grey"
                      height="24"
                      width="24"
                      viewBox="0 0 50 50"
                    >
                      <path d="m15.2 43.9-2.8-2.85L29.55 23.9 12.4 6.75l2.8-2.85 20 20Z" />
                    </svg>
                  </div>
                </div>
              </li>
            </NavLink>
            <NavLink
              to="profilo"
              style={({ isActive }) => (isActive ? changeBgColor : undefined)}
            >
              <li
                id="bottone-menu-lista"
                className=" group flex h-full flex-row"
              >
                <div className="mx-2 my-2 grid h-min w-min rounded-lg bg-yellow-700 p-1 group-hover:bg-yellow-900">
                  <svg
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    width="24"
                    viewBox="0 0 50 50"
                  >
                    <path d="M20 23.75q-3.3 0-5.4-2.1-2.1-2.1-2.1-5.4 0-3.3 2.1-5.4 2.1-2.1 5.4-2.1 3.3 0 5.4 2.1 2.1 2.1 2.1 5.4 0 3.3-2.1 5.4-2.1 2.1-5.4 2.1ZM4 39.8v-4.7q0-1.75.875-3.15T7.4 29.8q3.6-1.6 6.675-2.3 3.075-.7 5.925-.7h1.15q-.3.7-.45 1.375-.15.675-.25 1.625H20q-2.9 0-5.675.625T8.6 32.5q-.8.4-1.2 1.125Q7 34.35 7 35.1v1.7h13.45q.25.9.6 1.625t.85 1.375ZM33.35 42l-.5-3.3q-.85-.25-1.725-.725-.875-.475-1.475-1.075l-2.75.6-1.25-2.1L28 33.2q-.1-.45-.1-1.25t.1-1.25l-2.35-2.2 1.25-2.1 2.75.6q.6-.6 1.475-1.075.875-.475 1.725-.725l.5-3.3h2.7l.5 3.3q.85.25 1.725.725.875.475 1.475 1.075l2.75-.6 1.25 2.1-2.35 2.2q.1.45.1 1.25t-.1 1.25l2.35 2.2-1.25 2.1-2.75-.6q-.6.6-1.475 1.075-.875.475-1.725.725l-.5 3.3Zm1.35-6.05q1.8 0 2.9-1.1 1.1-1.1 1.1-2.9 0-1.8-1.1-2.9-1.1-1.1-2.9-1.1-1.8 0-2.9 1.1-1.1 1.1-1.1 2.9 0 1.8 1.1 2.9 1.1 1.1 2.9 1.1ZM20 20.75q1.95 0 3.225-1.275Q24.5 18.2 24.5 16.25q0-1.95-1.275-3.225Q21.95 11.75 20 11.75q-1.95 0-3.225 1.275Q15.5 14.3 15.5 16.25q0 1.95 1.275 3.225Q18.05 20.75 20 20.75Zm0-4.5Zm.45 20.55Z" />
                  </svg>
                </div>
                <div className="flex h-full w-full flex-row border-b-2 py-3">
                  <Typography className="grid grow content-center font-medium">
                    Impostazioni Profilo
                  </Typography>
                  <div className="grid content-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="grey"
                      height="24"
                      width="24"
                      viewBox="0 0 50 50"
                    >
                      <path d="m15.2 43.9-2.8-2.85L29.55 23.9 12.4 6.75l2.8-2.85 20 20Z" />
                    </svg>
                  </div>
                </div>
              </li>
            </NavLink>
          </ul>
          <Form action="/logout" method="post" className="hover:bg-gray-200">
            <button
              type="submit"
              id="bottone-menulg-logout"
              className=" group flex h-full w-full flex-row"
            >
              <div className="mx-2 my-2 grid h-min w-min rounded-lg bg-orange-500 p-1 group-hover:bg-red-900">
                <svg
                  fill="white"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  width="24"
                  viewBox="0 0 50 50"
                >
                  <path d="M9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h14.55v3H9v30h14.55v3Zm24.3-9.25-2.15-2.15 5.1-5.1h-17.5v-3h17.4l-5.1-5.1 2.15-2.15 8.8 8.8Z" />
                </svg>
              </div>
              <div className="flex h-full w-full flex-row border-t-2 py-3">
                <Typography className="grid grow content-center font-medium">
                  Logout
                </Typography>
                <div className="grid content-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="grey"
                    height="24"
                    width="24"
                    viewBox="0 0 50 50"
                  >
                    <path d="m15.2 43.9-2.8-2.85L29.55 23.9 12.4 6.75l2.8-2.85 20 20Z" />
                  </svg>
                </div>
              </div>
            </button>
          </Form>
        </nav>
        <section className="h-full w-full p-2">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
