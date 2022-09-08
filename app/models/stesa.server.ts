import { prisma } from "~/db.server";
import type { User, Stesa } from "@prisma/client";

export type { Stesa } from "@prisma/client";

export async function countStese() {
  return await prisma.stesa.count()
}
export async function getLastStesaDate() {
  const thisDate = await prisma.stesa.findMany({
    select: {
      dataCreazione: true,
    },
    orderBy: {
      dataCreazione: 'desc',
    },
    take: 1,
  });
  return thisDate
}

export async function findStesa(id: string) {
  return await prisma.stesa.findUnique({
    where: {id}
  })
}

export function findStesa2({
  id,
  userId,
}: Pick<Stesa, "id"> & {
  userId: User["id"];
}) {
  return prisma.stesa.findFirst({
    select: { id: true, titolo: true, dataCreazione: true },
    where: { id, userId },
  });
}

export async function getStesaList() {
  return await prisma.stesa.findMany({
    select: {
      id: true,
      titolo:true,
      immagine:true,
      dataCreazione: true,
    }
  })
}

export async function getStesa() {
  const gino = await prisma.stesa.findMany({
   select:{
      titolo: true,
      immagine: true,
      contenuto: true,
      dataCreazione: true,
      femminile: true,
      femminilePic: true,
      maschile: true,
      maschilePic: true,
   },
   orderBy: {
      dataCreazione: 'desc',
    },
    take: 1,
  });
  return gino
}

export function createStesa(
  contenuto : string,
  titolo : string,
  immagine : string,
  femminile : string,
  femminilePic : string,
  maschile : string,
  maschilePic : string,
  userId : string
) {
  if(!titolo || titolo === ""){
    titolo = "";
  }
  return prisma.stesa.create({
    data: {
      titolo,
      contenuto,
      immagine,
      femminile,
      femminilePic,
      maschile,
      maschilePic,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
} 

export function deleteStesa(
  id: string,
) {
  return prisma.stesa.delete({
    where: {id},
  });
}