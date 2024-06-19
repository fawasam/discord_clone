import { auth, currentUser, redirectToSignIn } from "@clerk/nextjs/server";
import { db } from "./db";

export const initialProfile = async () => {
  const { userId } = auth();
  const user = await currentUser();

  console.log("====================================");
  console.log(user?.id);
  console.log("====================================");
  if (!user) {
    return auth().redirectToSignIn();
  }

  const profile = await db.profile.findUnique({
    where: {
      userId: user?.id,
    },
  });
  if (profile) {
    return profile;
  }

  const newProfile = await db.profile.create({
    data: {
      userId: user?.id,
      name: `${user?.firstName} ${user?.lastName}`,
      imageUrl: user?.imageUrl,
      email: user?.emailAddresses[0]?.emailAddress,
    },
  });

  return newProfile;
};