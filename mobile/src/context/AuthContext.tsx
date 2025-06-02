import { createContext, ReactNode, useState, SetStateAction, Dispatch, useEffect } from "react";
import { UserDTO, UserSignInDTO } from "@dtos/User";
import { FieldSignUpProps } from "@screens/SignUp";
import api from "@services/api";

import saveUserStorage from "@storage/saveUserStorage";
import getUserStorage from "@storage/getUserStorage";
import removeUserStorage from "@storage/removeUserStorage";

import saveAuthToken from "@storage/saveAuthToken";
import removeAuthToken from "@storage/removeAuthToken";
import getAuthToken from "@storage/getAuthToken";

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

  //funcção para salvar tanto o user quanto o token.
  function userAndTokenUpdate(userData: UserDTO, token: string){
    //anexar a informação do token no cabeçalho
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(userData);
  }

  async function signIn(email: string, password: string){
    try {
      const { data } = await api.post<UserSignInDTO>("/sessions/", { email, password }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if(data.token && data.user.id){
        setLoading(true);
        await saveAuthToken(data.token);
        await saveUserStorage(data.user);        

        userAndTokenUpdate(data.user, data.token);       
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
      await removeAuthToken();
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function getDataUserStorage(){
    try {
      setLoading(true);
      const tokenUser = await getAuthToken();
      const userLogged = await getUserStorage();      

      if(tokenUser && userLogged){
        userAndTokenUpdate(userLogged, tokenUser);
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getDataUserStorage();
  }, []);

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