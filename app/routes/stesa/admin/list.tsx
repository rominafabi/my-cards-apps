import {
  Typography,
  IconButton,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import type { LoaderFunction, LoaderArgs, ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Link, useLoaderData, Form } from "@remix-run/react";
import { deleteStesa, getStesaList } from "~/models/stesa.server";

type LoaderData = {
  stese: Awaited<ReturnType<typeof getStesaList>>;
};

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  const stese = await getStesaList();
  return json<LoaderData>({ stese });
};

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const stesaId = formData.get("getIdStesa");
  const data = stesaId;

  await deleteStesa(data);

  return redirect("/stesa/admin/list");
}

export function date() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { stese } = useLoaderData() as unknown as LoaderData;

  const data = stese[0].dataCreazione;
  /*   data.setHours(data.getHours() - 5);
   const isodata = data.toISOString(); */
  var date = new Date(data);
  var newdate =
    date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
  return newdate;
}

export default function ListSteseRoute() {
  const { stese } = useLoaderData() as unknown as LoaderData;
  const data = date();

  return (
    <div className="flex h-full flex-row w-full" id="list-item-container">
      {/*-- CONTENITORE BOTTONE BACK -- */}
      <div className=" h-0 md:h-full md:border-r-2 md:pr-4 hidden md:flex">
        <Link to="../">
          <IconButton ripple={true} className="invisible md:visible hover:bg-red-900">
            <svg className="invisible md:visible"
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              width="24"
              viewBox="0 0 30 50"
              fill="white"
            >
              <path d="M20 44 0 24 20 4l2.8 2.85L5.65 24 22.8 41.15Z" className="invisible md:visible"/>
            </svg>
          </IconButton>
        </Link>
      </div>
      {/*-- CONTENITORE LISTA STESE -- */}
      <div className="md:grid h-fit w-full text-2xl">
         {/*-- CONTENITORE DEL TITOLO E DEL BUTTON BACK --*/}
         <div id="titolo-contenitore" className="flex flex-row gap-4 md:gap-0 md:pb-1">
            <Link to="../">
               <IconButton ripple={true} className="visible md:invisible hover:bg-red-900">
                  <svg className="visible md:invisible"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  width="24"
                  viewBox="0 0 30 50"
                  fill="white"
                  >
                  <path d="M20 44 0 24 20 4l2.8 2.85L5.65 24 22.8 41.15Z" className="visible md:invisible"/>
                  </svg>
               </IconButton>
            </Link>
         <Typography variant="h1" className="text-2xl text-gray-700 grid content-center">
            Lista delle stese
         </Typography>
         </div>
         {/*-- UNORDERED LIST DELLE STESE E BOX GENERALE --*/} 
        <ul className="grid grid-cols-1 md:grid-rows-auto h-full md:grid-cols-2 md:gap-4 lg:grid-col-3">
          {/*-- MAP DELLE CARD DELLE STESE --*/}
          {stese.map((stesa) => (
            <Card className="m-6 h-fit w-full" key={stesa.id}>
              <Link to={`/stesa/${stesa.id}`}>
                <CardHeader color="blue" className="relative">
                  <img
                    src={
                      !stesa.immagine
                        ? "https://res.cloudinary.com/rominafabi/image/upload/v1662308376/Default%20Items/FTJd7SMXEAAT4Sb_yopswp.jpg"
                        : stesa.immagine
                    }
                    alt={`stesa del giorno - ${data}`}
                    className="h-fit w-full"
                  />
                </CardHeader>
                <CardBody className="max-h-24 text-center">
                  <Typography variant="h5" className="mb-2 max-h-24">
                    {`Stesa del giorno - ${data}`}
                  </Typography>
                </CardBody>
              </Link>
              <CardFooter
                divider
                className="flex h-14 items-center justify-between py-3"
              >
                <Typography variant="small" color="gray">
                  {!stesa.titolo ? null : data}
                </Typography>
                <div className="flex flex-row gap-2">
                <Form method="post">
                  <input
                    type="text"
                    name="getIdStesa"
                    defaultValue={stesa.id}
                    className="hidden"
                  />
                  <IconButton color="red" id={stesa.id} type="submit" className="hover:bg-rose-900">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="white"
                      height="24"
                      width="24"
                      viewBox="0 0 50 50"
                      className="hover:fill-gray-200"
                    >
                      <path d="M13.05 42q-1.25 0-2.125-.875T10.05 39V10.5H8v-3h9.4V6h13.2v1.5H40v3h-2.05V39q0 1.2-.9 2.1-.9.9-2.1.9Zm21.9-31.5h-21.9V39h21.9Zm-16.6 24.2h3V14.75h-3Zm8.3 0h3V14.75h-3Zm-13.6-24.2V39Z" />
                    </svg>
                  </IconButton>
                </Form>
                <Link to={`/stesa/admin/${stesa.id}`}>
                <IconButton className="hover:bg-amber-900">
                  <svg fill="white" className="hover:fill-gray-200" xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 50 50"><path d="M24 42v-3.55l10.8-10.8 3.55 3.55L27.55 42ZM6 31.5v-3h15v3Zm34.5-2.45-3.55-3.55 1.45-1.45q.4-.4 1.05-.4t1.05.4l1.45 1.45q.4.4.4 1.05t-.4 1.05ZM6 23.25v-3h23.5v3ZM6 15v-3h23.5v3Z"/></svg>
                </IconButton>
                </Link>
                </div>
              </CardFooter>
            </Card>
          ))}
        </ul>
      </div>
    </div>
  );
}
