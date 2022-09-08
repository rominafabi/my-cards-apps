import type { Password, User } from "@prisma/client";
import bcrypt from "bcryptjs";

import { prisma } from "~/db.server";

export type { User } from "@prisma/client";


export async function getUserById(id: User["id"]) {
  return prisma.user.findUnique({ where: { id } });
}

export async function getAdminById(id: User["id"]) {
  return prisma.user.findUnique({ where: { id },
  select: {
    isAdmin:true,
  } });
}

export async function getUserByEmail(email: User["email"]) {
  return prisma.user.findUnique({ where: { email }, select:{isAdmin: true} });
}

export async function createUser(email: User["email"], password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });
}

export async function updateUser(email: User["email"],password: string, userPic: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.user.update({
    where: { 
      email : email
    },
    data : {
      email: email,
      userPic : userPic,
      password : {
        update: hashedPassword,
      },
    },
  })
}

export async function updateCredenziali(id: User["id"],email: string,password: string, userPic: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.user.update({
    where: { 
      id : id
    },
    data : {
      email: email,
      userPic : userPic,
      password : {
        update: {
         hash: hashedPassword},
      },
    },
  })
}

export async function updatePassword(myId: string,password: string) {
  const hashedPassword = await bcrypt.hash(myId, 10);

  return prisma.user.update({
    where: { 
      id : password
    },
    data : {
      password : {
        update: {
          hash: hashedPassword,},
      },
    },
  })
}

export async function updateMail(email: string,id: User["id"] ) {
  return prisma.user.update({
    where: {
      id: id,
    },
    data: {
      email: email,
    }
  })
}

export async function updateProfilePic(userPic: string,id: User["id"] ) {
  return prisma.user.update({
    where: {
      id: id,
    },
    data: {
      userPic: userPic,
    }
  })
}

export async function updateProfileMail(userPic: string,email: string,id: User["id"] ) {
  return prisma.user.update({
    where: {
      id: id,
    },
    data: {
      userPic: userPic,
      email: email,
    }
  })
}

export async function deleteUserByEmail(email: User["email"]) {
  return prisma.user.delete({ where: { email } });
}

export async function verifyLogin(
  email: User["email"],
  password: Password["hash"]
) {
  const userWithPassword = await prisma.user.findUnique({
    where: { email },
    include: {
      password: true,
    },
  });

  if (!userWithPassword || !userWithPassword.password) {
    return null;
  }

  const isValid = await bcrypt.compare(
    password,
    userWithPassword.password.hash
  );

  if (!isValid) {
    return null;
  }

  const { password: _password, ...userWithoutPassword } = userWithPassword;

  return userWithoutPassword;
}
