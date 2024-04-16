import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { redirect } from "next/navigation";
import Side from "./Side";

const Page = () => {
  const { getUser } = getKindeServerSession();
  const user = getUser();

  if (!user || !user.id) redirect("/auth-callback?origin=dashboard");
  console.log(user);
  return (
    <div>
      <Side  user={user}/>
    </div>
  );
};

export default Page;
