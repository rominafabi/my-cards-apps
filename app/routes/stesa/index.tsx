import { Typography } from "@material-tailwind/react";
import { Link, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node"
import { getStesaList } from "~/models/stesa.server";

type LoaderData = {
   stese: Awaited<ReturnType<typeof getStesaList>>
}
export const loader : LoaderFunction = async () => {
  const stese = await getStesaList();
  return json<LoaderData>({ stese });
};
export default function SteseRoute() {
  const { stese } = useLoaderData() as LoaderData;
  return (
    <main>
      <Typography>Johnss</Typography>
      <ul>
         {stese.map((stesa) => (
            <li key={stesa.id}>
               <Link to={stesa.id}>
                  <Typography>{stesa.titolo}</Typography>
               </Link>
            </li>
         ))}
      </ul>
    </main>
  );
}
