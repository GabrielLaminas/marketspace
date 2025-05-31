import { useContext, useEffect } from "react";
import { Center } from "@/components/ui/center";
import { AuthContext } from "@context/AuthContext";

export default function SignOut() {
  const { signOut } = useContext(AuthContext);

  async function handleSignOut(){
    await signOut();
  }

  useEffect(() => {
    handleSignOut();
  }, [])

  return (
    <Center />
  );
}
