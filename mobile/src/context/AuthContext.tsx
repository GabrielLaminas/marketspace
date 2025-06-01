import { createContext, ReactNode, useState, SetStateAction, Dispatch, useEffect } from "react";
import { UserDTO, UserSignInDTO } from "@dtos/User";
import { FieldSignUpProps } from "@screens/SignUp";
import api from "@services/api";

import saveUserStorage from "@storage/saveUserStorage";
import getUserStorage from "@storage/getUserStorage";
import removeUserStorage from "@storage/removeUserStorage";

type AuthContextProps = {
  user: UserDTO;
  setUser: Dispatch<SetStateAction<UserDTO>>;
  loading: boolean;

  signIn: (email: string, password: string) => Promise<void>;
  signUp: (data: FieldSignUpProps, avatar: any) => Promise<void>;
  signOut: () => Promise<void>;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

function AuthContextProvider({ children }: AuthContextProviderProps){
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  
  async function signIn(email: string, password: string){
    try {
      const { data } = await api.post<UserSignInDTO>("/sessions/", { email, password }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if(data.user.id){
        setUser(data.user);
        await saveUserStorage(data);
      }
    } catch (error) {
      throw error;     
    } finally {
      setLoading(false);
    }
  }

  async function signUp(data: FieldSignUpProps, avatar: any){
    try {
      setLoading(true);
      const userFormData = new FormData();

      userFormData.append("avatar", avatar);
      userFormData.append("name", data.name);
      userFormData.append("email", data.email);
      userFormData.append("tel", data.tel);
      userFormData.append("password", data.password);

      await api.post("/users/", userFormData, { 
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function signOut(){
    try {
      setLoading(true);
      setUser({} as UserDTO);
      await removeUserStorage();    
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function getDataUserStorage(){
    try {
      setLoading(false);
      setLoading(true);
      const dataUser = await getUserStorage();
      if(dataUser){
        setUser(dataUser.user);
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getDataUserStorage();
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      loading,
      signIn,
      signUp,
      signOut
    }}>
      { children }
    </AuthContext.Provider>
  )
}

export { AuthContextProvider, AuthContext };