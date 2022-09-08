import { Button } from "@material-tailwind/react";
import { Link } from "@remix-run/react";

export default function AdminIndexRoute() {
   return (
      <ul className="flex flex-col gap-4 w-full">
         <li>
            <Link to="new">
               <Button className="hover:bg-green-500 flex flex-row gap-1" fullWidth>
               <svg fill="white" xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 50 50"><path d="M22.5 38V25.5H10v-3h12.5V10h3v12.5H38v3H25.5V38Z"/></svg>
               <p className="self-center">Crea Un Nuovo Post</p>
               </Button>
            </Link>
         </li>
         <li>
            <Link to="list">
               <Button className="hover:bg-green-500 flex flex-row gap-1" fullWidth>
                  <svg fill="white" xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 50 50"><path d="M8.55 39q-1.05 0-1.8-.725T6 36.55q0-1.05.75-1.8t1.8-.75q1 0 1.725.75.725.75.725 1.8 0 1-.725 1.725Q9.55 39 8.55 39ZM16 38v-3h26v3ZM8.55 26.5q-1.05 0-1.8-.725T6 24q0-1.05.75-1.775.75-.725 1.8-.725 1 0 1.725.75Q11 23 11 24t-.725 1.75q-.725.75-1.725.75Zm7.45-1v-3h26v3ZM8.5 14q-1.05 0-1.775-.725Q6 12.55 6 11.5q0-1.05.725-1.775Q7.45 9 8.5 9q1.05 0 1.775.725Q11 10.45 11 11.5q0 1.05-.725 1.775Q9.55 14 8.5 14Zm7.5-1v-3h26v3Z"/></svg>
                  <p className="self-center">Mostra la lista dei Post</p>
               </Button>
            </Link>
         </li>
      </ul>
   )
}