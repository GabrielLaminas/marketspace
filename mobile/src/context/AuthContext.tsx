import { createContext, ReactNode, useState, SetStateAction, Dispatch } from "react";
import { UserDTO, UserSignInDTO } from "@dtos/User";
import { FieldSignUpProps } from "@screens/SignUp";
import api from "@services/api";

type AuthContextProps = {
  user: UserDTO | {};
  setUser: Dispatch<SetStateAction<UserDTO>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;

  signIn: (email: string, password: string) => Promise<void>;
  signUp: (data: FieldSignUpProps, avatar: any) => Promise<void>;
  signOut: () => Promise<void>;
}

type AuthContextProviderProps = {
  children: ReactNode
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

function AuthContextProvider({ children }: AuthContextProviderProps){
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserDTO | {}>({} as UserDTO);
  
  async function signIn(email: string, password: string){
    try {
      setLoading(false);
      setLoading(true);
      const { data } = await api.post<UserSignInDTO>("/sessions/", { email, password }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if(data.user.id){
        setUser(data.user);
      }
    } catch (error) {
      throw error;     
    } finally {
      setLoading(false);
    }
  }

  async function signUp(data: FieldSignUpProps, avatar: any){
    try {
      setLoading(false);
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
    setUser({});
  }

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      loading,
      setLoading,
      signIn,
      signUp,
      signOut
    }}>
      { children }
    </AuthContext.Provider>
  )
}

export { AuthContextProvider, AuthContext };