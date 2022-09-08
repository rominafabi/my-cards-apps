import {
  Alert,
  Avatar,
  Button,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { Form, useActionData } from "@remix-run/react";
import { useOptionalUser } from "~/utils";
import { json, redirect } from "@remix-run/node";
import type { LoaderArgs, ActionFunction } from "@remix-run/node";
import { getUserId } from "~/session.server";
import {
  getUserById,
  updateCredenziali,
  updateMail,
  updatePassword,
  updateProfileMail,
  updateProfilePic,
  updateUser,
} from "~/models/user.server";

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);
  const user = await getUserById(userId!);
  if (!userId) return redirect("/login");
  return json({});
}

export const action: ActionFunction = async ({ request }) => {
  const userId = await getUserId(request);
  const user = await getUserById(userId!);
  const formData = await request.formData();
  const newMail = formData.get("newMail");
  const newProfilePic = formData.get("newImmagine");
  const newPassword = formData.get("newPassword");

  if (newMail && !newProfilePic && !newPassword) {
    await updateMail(newMail, user?.id);
  }

  if (newProfilePic && !newMail && !newPassword ) {
    await updateProfilePic(newProfilePic, user?.id);
  }

  if (newMail && newProfilePic && !newPassword ) {
   await updateProfileMail(newMail,newProfilePic,user.id)
  }

  if(newPassword && !newProfilePic && !newMail) {
   await updatePassword(newPassword, user?.id)
   return redirect("/")
  }

  if(newPassword && newProfilePic && !newMail) {
   await updatePassword(newPassword, user?.id)
   await updateProfilePic(newProfilePic, user?.id);
  }

  if(newPassword && newMail && !newProfilePic) {
   await updateMail(newMail, user?.id);
   await updatePassword(newPassword, user?.id)
  }

  if(newPassword && newMail && newProfilePic) {
   await updateCredenziali(user?.id, newMail, newPassword, newProfilePic)
  }

  return redirect("/")
};

export default function ProfiloAmministrazioneRoute() {
  const user = useOptionalUser();
  const actionData = useActionData();
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (!selectedFile) {
      setPreview("");
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = async (event: any) => {
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
    await fetch("https://api.cloudinary.com/v1_1/deioa0qvg/upload", {
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

  return (
    <div className="h-full w-full">
      <Typography variant="h1" color="gray" className="border-b-2 text-2xl md:text-3xl lg:text-4xl">
        Impostazioni del profilo
      </Typography>
      <section className="grid h-[calc(100vh-125px)] content-center">
        <div className="">
          <Form
            className="container mx-auto my-auto flex h-full w-full flex-col justify-center gap-4"
            reloadDocument
            method="post"
            encType="multipart/form-data"
          >
            <label className="flex justify-center cursor-pointer">
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
            <div className="mx-auto flex max-w-xl flex-col justify-center gap-4">
              <Input
                size="lg"
                label="E-Mail"
                color="green"
                type="email"
                name="newMail"
              ></Input>
              <Input
                size="lg"
                label="Nuova Password"
                color="green"
                type="password"
                name="newPassword"
              ></Input>
              <input
                type="text"
                id="newImmagine"
                name="newImmagine"
                className="hidden"
                defaultValue={url}
              ></input>
            </div>
            <div className="mx-auto">
              <Button color="green" type="submit">
                Salva Modifiche
              </Button>
            </div>
          </Form>
        </div>
      </section>
    </div>
  );
}
