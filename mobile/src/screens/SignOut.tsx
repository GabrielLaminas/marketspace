import { useContext, useEffect } from "react";
import { Center } from "@/components/ui/center";
import { AuthContext } from "@context/AuthContext";
import { useToast } from "@/components/ui/toast";
import CustomToast from "@components/CustomToast";

export default function SignOut() {
  const { signOut } = useContext(AuthContext);

  const toast = useToast();

  async function handleSignOut(){
    try {
      await signOut();
    } catch (error) {
      if(error instanceof Error){
        toast.show({
          id: "error-sign-out",
          placement: "top",
          duration: 5000,
          containerStyle: { marginTop: 48 },
          render: ({ id }) => (
            <CustomToast 
              id={id}
              title="Deslogar da conta"
              action="error"
              message={error.message}
            />
          )
        })
      }
    }
  }

  useEffect(() => {
    handleSignOut();
  }, [])

  return (
    <Center />
  );
}
