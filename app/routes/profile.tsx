import { useState, useEffect } from "react";
import { useOptionalUser } from "~/utils";
import type { LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, NavLink } from "@remix-run/react";
import * as React from "react";
import { getUserId } from "~/session.server";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Avatar,
  Input,
} from "@material-tailwind/react";

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);
  if (!userId) return redirect("/login");
  return json({});
}

export default function Profile() {
  const user = useOptionalUser();
  const [interruttore, setInterruttore] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState("");
  const [, setUrl] = useState("");

  useEffect(() => {
    if (!selectedFile) {
      setPreview("");
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  function menuButtonFunc(e: any) {
    const currentState = interruttore;
    setInterruttore(!currentState);
  }

  const onSelectFile = (event: any) => {
    console.log(event.target.files[0]);
    if (!event.target.files || event.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(event.target.files[0]);
    var newUrls = "";
    const data = new FormData();
    data.append("file", event.target.files[0]);
    data.append("cloud_name", "rominafabi");
    data.append("api_key", "461394729712458");
    data.append("upload_preset", "w9f1lowf");
    data.append("api_secret", "ce-8hPUwIxncvf4X_voE73_1z94");
    fetch("https://api.cloudinary.com/v1_1/deioa0qvg/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        newUrls = data.url;
        console.log("the URL of profilePic is : ", newUrls);
        setUrl(data.url);
      })
      .catch((err) => console.log(err));
    setUrl(newUrls);
  };

  const activeClassName =
    "font-sans text-xl md:text-2xl lg:text-3xl text-gray-900";
  const disabledClassName =
    "font-sans text-xl md:text-2xl lg:text-3xl text-gray-800";
  return (
    <main className="h-full max-w-full">
      <header className="container-fluid z-10 fixed w-full">
        <nav className="light:bg-gray-900 rounded border-gray-200 bg-white px-2 py-2.5 sm:px-4">
          <div className="container mx-auto flex flex-wrap items-center justify-between">
            <a href="https://rominafabi.it/" className="flex items-center">
              <img
                src="https://res.cloudinary.com/rominafabi/image/upload/v1661661724/Logo_RF_PNG_blirwa.png"
                className="h-12 lg:h-20"
                alt="Romina Fabi Logo"
              />
            </a>
            <div className="flex flex-row ">
              <div className="flex flex-row space-x-4">
                {user!.email === "rominafabibusiness@gmail.com" ? (
                  <p></p>
                ) : null}

                <Menu>
                  <MenuHandler>
                    <Button variant="gradient" color="green" className="">
                      <div className="flex flex-row">
                        <img
                          src={user?.userPic}
                          alt="Profile of the User"
                          className="h-12 rounded-full border-2 border-gray-400"
                        />
                      </div>
                    </Button>
                  </MenuHandler>
                  <MenuList className="divide-y-2">
                    <MenuItem disabled className="text-green-900">
                      {user?.email}
                    </MenuItem>
                    <MenuItem disabled>Profilo</MenuItem>
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
                {user!.email === "rominafabibusiness@gmail.com" ? (
                  <Link
                    to="/stesa/admin/new"
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
              <button
                onClick={menuButtonFunc}
                data-collapse-toggle="navbar-default"
                type="button"
                className="light:text-black-400 light:hover:bg-gray-700 light:focus:ring-gray-600 ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                aria-controls="navbar-default"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!interruttore ? (
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
          {interruttore ? (
            <div
              className="container mx-auto min-h-screen w-full bg-white md:pt-5 z-10"
              id="navbar-default"
            >
              <ul className="light:bg-white mt-4 flex flex-col rounded-lg bg-white p-4 md:mt-0 md:border-0 md:bg-white md:text-sm md:font-medium">
                <li>
                  <NavLink
                    to="/"
                    style={{
                      backgroundImage: `url(https://res.cloudinary.com/rominafabi/image/upload/v1661854382/viva-luna-studios-y3qrbAgm7q8-unsplash_v5qhd4.jpg)`,
                    }}
                    className={`relative my-5 block h-40 rounded-3xl bg-cover pr-4 text-white text-gray-700 shadow-md grayscale duration-200 hover:text-gray-700 hover:shadow-lg hover:grayscale-0 md:bg-transparent md:text-green-700 `}
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
                    to="/stese-mensili"
                    className="relative my-5 block h-40 rounded-3xl bg-cover pr-4 text-gray-700 shadow-md grayscale duration-200 hover:text-gray-700 hover:shadow-lg hover:grayscale-0 dark:text-gray-400 dark:hover:text-white md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
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
                    className="relative my-5 block h-40 rounded-3xl bg-cover pr-4 text-gray-700 shadow-md grayscale duration-200 hover:text-gray-700 hover:shadow-lg hover:grayscale-0 dark:text-gray-400 dark:hover:text-white md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
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
      {/* --- FINE DELL'HEADER --- */}
      <section className="container grid content-center h-full z-0">
        <div className="">
          <Form className="container mx-auto px-4 flex w-full flex-col justify-center gap-4">
              <label className="flex justify-center">
                <input
                  className="hidden"
                  id="file_input"
                  accept=".jpg, .png, .gif, .jpeg"
                  type="file"
                  onChange={onSelectFile}
                />
                {selectedFile ? (
                  <Avatar
                    src={preview}
                    alt={`avatar`}
                    size="xxl"
                    className="shadow-md shadow-gray-400"
                  />
                ) : (
                  <Avatar
                    src={user?.userPic}
                    alt={`avatar`}
                    size="xxl"
                    className="shadow-md shadow-gray-400"
                  />
                )}
              </label>
            <div className="max-w-xl flex justify-center flex-col mx-auto gap-4">
               <Input size="lg" label="E-Mail" color="green">
               </Input>
               <Input size="lg" label="Password" color="green">
               </Input>
            </div>
            <div className="mx-auto">
               <Button color="green">
                  Salva Modifiche
               </Button>
            </div>
          </Form>
        </div>
      </section>
    </main>
  );
}
