import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { findStesa } from "~/models/stesa.server";
import { DialogBody, Typography } from "@material-tailwind/react";
import {marked} from "marked"
import invariant from "tiny-invariant";

type LoaderData = {
   stesa: Awaited<ReturnType<typeof findStesa>>
   contenuto: string
   femminile: string
   maschile: string
}

export const loader: LoaderFunction = async ({ params }) => {
  const { id } = params;
  invariant(id, 'id is required')
  const stesa = await findStesa(id);
  invariant(stesa, `stesa non trovata: ${id}`)
  const contenuto = marked(stesa.contenuto)
  const femminile = marked(stesa.femminile)
  const maschile = marked(stesa.maschile)
  return json<LoaderData>({ stesa , contenuto, femminile, maschile });
};
export default function StesaRoute() {
  const { stesa, contenuto, femminile, maschile } = useLoaderData();
  return (
    <main>
      <h1>{stesa.titolo}</h1>
      <h3>{stesa.dataCreazione}</h3>
      <img
        src={stesa.immagine}
        alt={`${stesa.titolo} - ${stesa.dataCreazione}`}
      />
      <DialogBody divider>
        <div dangerouslySetInnerHTML={{__html: contenuto}}/>
      </DialogBody>
      <h2>Energia Femminile</h2>
      <img
        src={stesa.femminilePic}
        alt={`Energia femminile del ${stesa.dataCreazione}`}
      />
      <DialogBody divider>
      <div dangerouslySetInnerHTML={{__html: femminile}}/>
      </DialogBody>
      <h2>Energia Maschile</h2>
      <img
        src={stesa.maschilePic}
        alt={`Energia maschile del ${stesa.dataCreazione}`}
      />
      <DialogBody divider>
        <Typography><div dangerouslySetInnerHTML={{__html: maschile}}/></Typography>
      </DialogBody>
    </main>
  );
}
