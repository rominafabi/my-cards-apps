import { Form, Link, NavLink, useLoaderData } from "@remix-run/react";
import { useOptionalUser } from "~/utils";
import { getStesa } from "~/models/stesa.server";
import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { useState, Fragment } from "react";
import { hasUserVisited } from "~/utils/cookies";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Dialog,
  DialogHeader,
  DialogFooter,
  DialogBody,
  Typography,
} from "@material-tailwind/react";

type LoaderData = {
  stesa: Awaited<ReturnType<typeof getStesa>>;
};

export const loader: LoaderFunction = async () => {
  const stesa = await getStesa();

  return json<LoaderData>({ stesa });
};



export function date() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { stesa } = useLoaderData() as unknown as LoaderData;
  const data = stesa[0].dataCreazione;
  /*   data.setHours(data.getHours() - 5);
  const isodata = data.toISOString(); */
  var date = new Date(data);
  var newdate =
    date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
  return newdate;
}

export default function Index() {
  const [ginos, setGino] = useState(false);
  const [open, setOpen] = useState(false);

  const user = useOptionalUser();
  const { stesa, b } = useLoaderData() as unknown as LoaderData;
  const data = date();
  const titolo = stesa[0].titolo;
  const isAdmin = user?.isAdmin

  const handleOpen = () => setOpen(!open);

  function menuButtonFunc(e: any) {
    const currentState = ginos;
    setGino(!currentState);
    console.log("fino", b);
  }

  const activeClassName =
    "font-sans text-xl md:text-2xl lg:text-3xl text-gray-700";
  const disabledClassName =
    "font-sans text-xl md:text-2xl lg:text-3xl text-gray-500";

  return (
    <div className="h-full">
      <header className="container-fluid z-1 fixed w-full shadow-md z-20">
        <nav className="light:bg-gray-900 rounded border-gray-200 bg-white px-2 py-2.5 sm:px-4">
          <div className="container mx-auto flex flex-wrap items-center justify-between">
            <a href="https://rominafabi.it/" className="flex items-center">
              <img
                src="https://res.cloudinary.com/rominafabi/image/upload/v1661661724/Logo_RF_PNG_blirwa.png"
                className="h-12 lg:h-20"
                alt="Romina Fabi Logo"
              />
              {/*         <span className="self-center text-lg font-semibold whitespace-nowrap light:text-black uppercase">Letture delle carte</span>
               */}{" "}
            </a>
            <div className="flex flex-row ">
              {user ? (
                <div className="flex flex-row space-x-4">
                  <Menu>
                    <MenuHandler>
                      <Button
                        variant="gradient"
                        color="green"
                        size="sm"
                        className=""
                      >
                        <div className="flex flex-row">
                          <img
                            src={user?.userPic}
                            alt="Profile of the User"
                            className="h-12 rounded-full border-2 border-gray-400"
                          />
                        </div>
                      </Button>
                    </MenuHandler>
                    <MenuList className="divide-y">
                      <MenuItem disabled className="border-b-2 text-green-900">
                        {user?.email}
                      </MenuItem>
                      <NavLink to="/profile" prefetch="intent">
                        <MenuItem>Profilo</MenuItem>
                      </NavLink>
                      <Form action="/logout" method="post">
                        <Button
                          color="red"
                          variant="text"
                          type="submit"
                          fullWidth
                        >
                          Logout
                        </Button>
                      </Form>
                    </MenuList>
                  </Menu>
                  {isAdmin ? (
                    <Link
                      to="/admin"
                      data-collapse-toggle="navbar-default"
                      className="light:text-black-400 light:hover:bg-gray-700 light:focus:ring-gray-600 ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                      aria-controls="navbar-default"
                      aria-expanded="false"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="35"
                        width="35"
                        viewBox="0 0 50 50"
                        fill="#6b7280"
                      >
                        <path d="M22.5 38V25.5H10v-3h12.5V10h3v12.5H38v3H25.5V38Z"></path>
                      </svg>
                    </Link>
                  ) : null}
                </div>
              ) : null}
              <button
                onClick={menuButtonFunc}
                data-collapse-toggle="navbar-default"
                type="button"
                className="light:text-black-400 light:hover:bg-gray-700 light:focus:ring-gray-600 ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                aria-controls="navbar-default"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!ginos ? (
                  <svg
                    className="h-6 w-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="23"
                    height="23"
                    viewBox="0 0 50 50"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                )}
              </button>
            </div>
          </div>
          {ginos ? (
            <div
              className="container mx-auto min-h-screen w-full bg-white md:pt-5"
              id="navbar-default"
            >
              <ul className="light:bg-white mt-4 flex flex-col rounded-lg bg-white p-4 md:mt-0 md:border-0 md:bg-white md:text-sm md:font-medium">
                <li>
                  <NavLink
                    style={{
                      backgroundImage: `url(https://res.cloudinary.com/rominafabi/image/upload/v1661854382/viva-luna-studios-y3qrbAgm7q8-unsplash_v5qhd4.jpg)`,
                    }}
                    to="/"
                    onClick={menuButtonFunc}
                    className={`relative my-5 block h-40 rounded-3xl bg-cover pr-4 text-white shadow-md grayscale-0 duration-500 hover:text-gray-700 hover:shadow-lg md:bg-transparent md:text-green-700 `}
                    aria-current="page"
                    end
                  >
                    {({ isActive }) => (
                      <div className="grid h-full w-2/4 content-center rounded-l-3xl bg-white pl-3 text-black md:w-2/5">
                        <span
                          className={
                            isActive ? activeClassName : disabledClassName
                          }
                        >
                          Stesa Giornaliera
                        </span>
                      </div>
                    )}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    style={{
                      backgroundImage: `url(https://res.cloudinary.com/rominafabi/image/upload/v1661876918/pexels-roman-odintsov-11760488_dyqpjv.jpg)`,
                      backgroundPosition: `left 0% bottom 45%`,
                    }}
                    to="/stesa-mensile"
                    prefetch="intent"
                    className="relative my-5 block h-40 rounded-3xl bg-cover pr-4 text-gray-700 shadow-md grayscale duration-500 hover:text-gray-700 hover:shadow-lg hover:grayscale-0 dark:text-gray-400 dark:hover:text-white md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
                  >
                    {({ isActive }) => (
                      <div className="grid h-full w-2/4 content-center rounded-l-3xl bg-white pl-3 text-black md:w-2/5">
                        <span
                          className={
                            isActive ? activeClassName : disabledClassName
                          }
                        >
                          Stesa Mensile
                        </span>
                      </div>
                    )}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    style={{
                      backgroundImage: `url(https://res.cloudinary.com/rominafabi/image/upload/v1661870715/annie-spratt-mppDYKjJ7II-unsplash_hpo6ez.jpg)`,
                      backgroundPosition: `25% 75%`,
                    }}
                    to="/stesa-annuale"
                    prefetch="intent"
                    className="relative my-5 block h-40 rounded-3xl bg-cover pr-4 text-gray-700 shadow-md grayscale duration-500 hover:text-gray-700 hover:shadow-lg hover:grayscale-0 dark:text-gray-400 dark:hover:text-white md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
                  >
                    {({ isActive }) => (
                      <div className="grid h-full w-2/4 content-center rounded-l-3xl bg-white pl-3 text-black md:w-2/5">
                        <span
                          className={
                            isActive ? activeClassName : disabledClassName
                          }
                        >
                          Stesa Annuale
                        </span>
                      </div>
                    )}
                  </NavLink>
                </li>
              </ul>
            </div>
          ) : null}
        </nav>
      </header>

      <main className="h-full bg-[url('../assets/images/sfondo.jpeg')] pt-20 lg:pt-32">
        <div className="container mx-auto max-w-screen-md pt-1">
        <Typography variant="h1" color="gray" className="mt-6 text-center text-2xl md:text-4xl lg:text-5xl break-words md:mb-2">
              {titolo ? titolo : "Energie Generali"}
            </Typography>
            <Typography variant="h4" className="text-center pb-5 text-lg md:text-2xl lg:text-3xl" color="gray">{data}</Typography>
          <Fragment>
            <img
              className="h-full w-full cursor-pointer md:rounded-3xl md:object-contain"
              src={stesa[0].immagine}
              alt={stesa[0].titolo}
              onClick={handleOpen}
            />
            <Dialog
              open={open}
              handler={handleOpen}
              size="xxl"
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0.9, y: -100 },
              }}
            >
              <DialogHeader className="flex justify-center max-w-full">
                {stesa[0].titolo}
              </DialogHeader>
              <img src={stesa[0].immagine} alt={stesa[0].titolo} />
              <DialogFooter>
                <Button
                  variant="text"
                  color="red"
                  onClick={handleOpen}
                  className="mr-1"
                >
                  <span>Cancel</span>
                </Button>
                <Button variant="gradient" color="green" onClick={handleOpen}>
                  <span>Confirm</span>
                </Button>
              </DialogFooter>
            </Dialog>
          </Fragment>
        </div>
        <div className="mx-auto max-w-screen-md py-5">
          <article>
            <DialogBody divider className="font-sans text-base ">
              <Typography variant="paragraph">
              {stesa[0].contenuto}
              </Typography>
            </DialogBody>
          </article>
          <article className="my-4">
            <Typography variant="h2" color="gray" className="my-6 text-center text-2xl md:text-4xl lg:text-5xl" >
              Energie Femminili
            </Typography>
            <img
              className="my-4 h-full w-full cursor-pointer md:rounded-3xl md:object-contain"
              src={stesa[0].femminilePic}
              alt={`energie femminili del ${data}`}
              onClick={handleOpen}
            />

            <DialogBody divider>
              <Typography variant="paragraph">
                {stesa[0].femminile}
              </Typography>
            </DialogBody>
          </article>
          <article className="my-4">
            <Typography variant="h2" color="gray" className="my-6 text-center text-2xl md:text-4xl lg:text-5xl">
              Energie Maschili
            </Typography>
            <img
              className="my-4 h-full w-full cursor-pointer md:rounded-3xl md:object-contain"
              src={stesa[0].maschilePic}
              alt={`energie maschili del ${data}`}
              onClick={handleOpen}
            />

            <DialogBody divider>
              <Typography variant="paragraph">
              {stesa[0].maschile}
              </Typography>
            </DialogBody>
          </article>
        </div>
      </main>
    </div>
  );
}
