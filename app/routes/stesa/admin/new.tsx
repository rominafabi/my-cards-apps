import {
  Typography,
  Input,
  Textarea,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
} from "@material-tailwind/react";
import { Form, Link } from "@remix-run/react";
import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Fragment, useEffect, useState } from "react";
import { createStesa } from "~/models/stesa.server";
import { requireUserId } from "~/session.server";
import {marked} from "marked"

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const formData = await request.formData();
  const titolo = formData.get("titolo");
  const immagine = formData.get("immagineString");
  const contenuto = formData.get("contenuto");
  const femminilePic = formData.get("femminileString");
  const femminile = formData.get("contenutoFemminile");
  const maschilePic = formData.get("maschileString");
  const maschile = formData.get("contenutoMaschile");

  await createStesa(
    contenuto,
    titolo,
    immagine,
    femminile,
    femminilePic,
    maschile,
    maschilePic,
    userId
  );
  return redirect("/");
};

export function date() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const data = Date.now();
  /*   data.setHours(data.getHours() - 5);
  const isodata = data.toISOString(); */
  var date = new Date(data);
  var newdate =
    date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
  return newdate;
}

export default function NewPostRoute() {
  const [url, setUrl] = useState("");
  const [femminileUrl, femminileUrlPic] = useState("");
  const [maschileUrl, maschileUrlPic] = useState("");
  const [open, setOpen] = useState(false);
  const [titolo, setTitolo] = useState("");
  const [contenuto, setContenuto] = useState("");
  const [contenutoFemminile, setContenutoFemminile] = useState("");
  const [contenutoMaschile, setContenutoMaschile] = useState("");
  const [resize, setResize] = useState(true)
  const [showed, isShowed] = useState(false)
  const [widthN, setWidth] = useState("w-full")

  useEffect(() => {

    window.addEventListener("resize",() => window.innerWidth >= 960 && setResize(true));
    window.addEventListener("resize",() => window.innerWidth <= 960 && setResize(false))
  }, []);

  const markedContenuto = marked(contenuto)
  const markedContenutoF = marked(contenutoFemminile)
  const markedContenutoM = marked(contenutoMaschile)
  const data = date();

  const handleOpen = () => setOpen(!open);

  const onSelectFile = (event: any) => {
    var immagine = (document.getElementById("immagine") as HTMLTextAreaElement)
      .value;
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
        immagine = data.url;
        console.log("l'URL della stesa è : ", newUrls);
        console.log("il value è:", immagine);
        setUrl(data.url);
      })
      .catch((err) => console.log(err));
    setUrl(newUrls);
    immagine = newUrls;
  };

  const onSelectFileFemminile = (event: any) => {
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
        console.log("L'URL della energia femminile : ", newUrls);
        femminileUrlPic(data.url);
      })
      .catch((err) => console.log(err));
    femminileUrlPic(newUrls);
  };

  const onSelectFileMaschile = (event: any) => {
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
        maschileUrlPic(data.url);
      })
      .catch((err) => console.log(err));
    maschileUrlPic(newUrls);
  };

  const getTitle = (event: any) => {
    setTitolo(event.target.value);
  };

  const getContenuto = (event: any) => {
    setContenuto(event.target.value);
  };

  const getContenutoFemminile = (event: any) => {
    setContenutoFemminile(event.target.value);
  };
  const getContenutoMaschile = (event: any) => {
    setContenutoMaschile(event.target.value);
  };

  const setShowedFunc = (event: any) => {
    isShowed(!showed)
    console.log(showed)
    if(showed===true){
      setWidth("w-1/2")
    }else if(showed===false){
      setWidth("w-full")
    }
  }

  return (
    <div className="md:flex md:flex-row gap-6 max-w-full max-h-[1800]">
      <Form
        className={` md:mx-5 w-full flex gap-4 flex-col overflow-x-none`}
        reloadDocument
        method="post"
        encType="multipart/form-data"
      >
        <div className="flex flex-row gap-4">
        <Link to="../">
         <IconButton ripple={true} className="hover:bg-red-900" id="back-button">
         <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 30 50" fill="white"><path d="M20 44 0 24 20 4l2.8 2.85L5.65 24 22.8 41.15Z"/></svg>
         </IconButton>
      </Link>
        <Typography variant="h2" className="grid content-center text-2xl text-gray-700">Crea una nuova stesa</Typography>
        </div>
        <DialogBody divider className="flex flex-col gap-2 max-h-[485px]">
        <Input
          label="Titolo della Stesa"
          type="text"
          name="titolo"
          id="titolo-stesa"
          onChange={getTitle}
        />
        <label className="flex flex-col">
          <p className="text-[#607d8b]">Seleziona Immagine della stesa</p>
          <div className="w-full">
          <label className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
            <span className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              <span className="font-medium text-gray-600">
                Drop files to Attach, or
                <span className="text-blue-600 underline"> browse</span>
              </span>
            </span>
                <input
                type="file"
                id="immagine"
                name="immagine"
                className="hidden"
                onChange={onSelectFile}
                required
              />
                <input
                type="text"
                name="immagineString"
                defaultValue={url}
                className="hidden"
                required
              />
            <input type="file" name="file_upload" className="hidden"/>
          </label>
          </div>
          
          
        </label>
        <Textarea
          label="Contenuto della stesa"
          id="contenuto"
          rows={10}
          name="contenuto"
          onChange={getContenuto}
          required
        />
        </ DialogBody>
        <DialogBody divider className="flex flex-col gap-2 max-h-[485px]">
        <label className="flex flex-col">
          <p className="text-[#607d8b]">
            Seleziona l'immagine delle energie femminili
          </p>
          <div className="w-full">
          <label className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
            <span className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              <span className="font-medium text-gray-600">
                Drop files to Attach, or
                <span className="text-blue-600 underline"> browse</span>
              </span>
            </span>
              <input
              type="file"
              id="femminilePic"
              name="femminilePic"
              className="hidden"
              onChange={onSelectFileFemminile}
              required
            />
              <input
              type="text"
              name="femminileString"
              defaultValue={femminileUrl}
              className="hidden"
              required
            />
            <input type="file" name="file_upload" className="hidden"/>
          </label>
          </div>
        </label>
        <Textarea
          label="Contenuto delle energie Femminili"
          id="contenutoFemminile"
          rows={10}
          name="contenutoFemminile"
          onChange={getContenutoFemminile}
          required
        />
        </DialogBody>
        <DialogBody divider className="flex flex-col gap-2 max-h-[485px]">
        <label className="flex flex-col">
          <p className="text-[#607d8b]">
            Seleziona l'immagine delle energie maschili
          </p>
          <div className="w-full">
          <label className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
            <span className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              <span className="font-medium text-gray-600">
                Drop files to Attach, or
                <span className="text-blue-600 underline"> browse</span>
              </span>
            </span>
              <input
              type="file"
              id="maschilePic"
              name="maschilePic"
              className="hidden"
              onChange={onSelectFileMaschile}
              required
              />
              <input
              type="text"
              name="maschileString"
              defaultValue={maschileUrl}
              className="hidden"
              required
              />
            <input type="file" name="file_upload" className="hidden"/>
          </label>
          </div>
        </label>
        <Textarea
          label="Contenuto della energie Maschili"
          id="contenutoMaschile"
          rows={10}
          name="contenutoMaschile"
          onChange={getContenutoMaschile}
          required
        />
        </DialogBody>
        <Button type="submit" className="w-full">
          Crea la stesa
        </Button>
        <Button type="button" className="md:inline-block w-full hidden"
        onClick={setShowedFunc}
        >
          Preview della Stesa
        </Button>
        <Fragment>
          <Button
            onClick={handleOpen}
            variant="gradient"
            className="flex w-full md:hidden"
          >
            Preview della Stesa
          </Button>
          <Dialog
            size="xxl"
            open={open}
            handler={handleOpen}
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0.9, y: -100 },
            }}
            className="h-full "
          >
            <div className="container mx-auto max-w-screen-md overflow-auto pt-1">
              <DialogHeader className="grid content-center">
                <Typography
                  className="mt-2 text-center text-xl md:text-2xl lg:text-3xl"
                  variant="h1"
                  color="gray"
                >
                  {titolo}
                </Typography>
              </DialogHeader>
              <img
                src={url}
                alt={`preview della stesa - ${titolo}`}
                className="my-4 h-full w-full md:rounded-3xl md:object-contain"
              />
              <DialogBody divider>
                <Typography>{contenuto}</Typography>
              </DialogBody>
              <Typography>Energie Femminili</Typography>
              <img
                src={femminileUrl}
                alt={`Energie femminili - ${titolo}`}
                className="my-4 h-full w-full md:rounded-3xl md:object-contain"
              />
              <DialogBody divider>
                <Typography>{contenutoFemminile}</Typography>
              </DialogBody>
              <img
                src={maschileUrl}
                alt={`Energie maschili - ${titolo}`}
                className="my-4 h-full w-full md:rounded-3xl md:object-contain"
              />
              <DialogBody divider>
                <Typography>{contenutoMaschile}</Typography>
              </DialogBody>
              <DialogFooter>
                <Button
                  variant="text"
                  color="red"
                  onClick={handleOpen}
                  className="mr-1"
                >
                  <span>Chiudi</span>
                </Button>
                {/* <Button variant="gradient" color="green" onClick={handleOpen}>
                <span>Confirm</span>
              </Button> */}
              </DialogFooter>
            </div>
          </Dialog>
        </Fragment>
      </Form>
      { showed ? (
      <div className={`h-0 md:h-auto hidden md:flex md:${widthN} md:overflow-y-auto mx-5`}>
      <main className="h-0 md:h-auto invisible md:visible container h-full md:max-w-screen-md ">
        <div className="h-0 md:h-auto invisible md:visible container md:mx-auto md:w-full md:pt-1">
        { resize ? (
          <div>
        <Typography variant="h1" color="gray" className="h-0 md:h-auto md:mt-6 text-center text-3xl md:text-4xl lg:text-5xl">
              {titolo ? titolo : "Energie Generali"}
            </Typography>
            <Typography variant="h4" className="container h-0 md:h-auto text-center md:pb-5 text-lg md:text-xl lg:text-2xl" color="gray">{data}</Typography>
          </div>
            ) : null }
            <img
              className="h-full w-full cursor-pointer md:rounded-3xl md:object-contain"
              src={url ? url : "https://res.cloudinary.com/rominafabi/image/upload/v1662308376/Default%20Items/FTJd7SMXEAAT4Sb_yopswp.jpg"}
              alt={`stesa tarologica - ${titolo}`}
              onClick={handleOpen}
            />
        </div>
        <div className="h-0 md:h-auto invisible md:visible mx-auto md:py-5">
          <article className="h-0 md:h-auto max-w-full">
            <DialogBody divider>
              <div className="max-w-full">
              <Typography variant="paragraph" className="h-0 md:h-auto break-words">
                { resize ? (<div dangerouslySetInnerHTML={{__html: markedContenuto}}/>) : null}
              </Typography>
              </div>
            </DialogBody>
          </article>
          <article className="md:my-4 h-0 md:h-auto" >
            <Typography variant="h2" color="gray" className="break-words h-0 md:h-auto md:my-6 text-center text-2xl md:text-3xl lg:text-4xl" >
              Energie Femminili
            </Typography>
            <img
              className="md:my-4 h-0 md:h-full w-full cursor-pointer md:rounded-3xl md:object-contain"
              src={femminileUrl ? femminileUrl : "https://res.cloudinary.com/rominafabi/image/upload/v1662308376/Default%20Items/FTJd7SMXEAAT4Sb_yopswp.jpg"}
              alt={`energie femminili - ${titolo}`}
              onClick={handleOpen}
            />

            <DialogBody divider>
              <div className="max-w-full">
                <Typography variant="paragraph" className="h-0 md:h-auto break-words">
                  { resize ? (<div dangerouslySetInnerHTML={{__html: markedContenutoF}}/>) : null}
                </Typography>
              </div>
            </DialogBody>
          </article>
          <article className="md:my-4 h-0 md:h-auto">
            <Typography variant="h2" color="gray" className="h-0 md:h-auto md:my-6 text-center text-2xl md:text-3xl lg:text-4xl">
              Energie Maschili
            </Typography>
            <img
              className="h-0 md:h-auto md:my-4 w-full cursor-pointer md:rounded-3xl md:object-contain"
              src={maschileUrl ? maschileUrl : "https://res.cloudinary.com/rominafabi/image/upload/v1662308376/Default%20Items/FTJd7SMXEAAT4Sb_yopswp.jpg"}
              alt={`energie maschili - ${titolo}`}
              onClick={handleOpen}
            />

            <DialogBody divider>
            <div className="max-w-full">
              <Typography variant="paragraph" className="invisible md:visible break-words h-0 md:h-auto">
              { resize ? (<div dangerouslySetInnerHTML={{__html: markedContenutoM}}/>) : null}
              </Typography>
              </div>
            </DialogBody>
          </article>
        </div>
      </main>
      </div>):null}
    </div>
  );
}
