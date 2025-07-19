import getAuthToken from "@storage/getAuthToken";
import saveAuthToken from "@storage/saveAuthToken";
import axios, { AxiosInstance, AxiosError } from "axios";

//Caso de token expirado ou invalido. Deslogar o usuário
type SignOut = () => void;

type PromisseType = {
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
}

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOut) => () => void;
}

const api = axios.create({
  baseURL: "http://192.168.100.41:3333",
  timeout: 6000,
}) as APIInstanceProps;

let failedQueue: PromisseType[] = [];
let isRefreshing = false;

api.registerInterceptTokenManager = (signOut) => {
  const interceptTokenManager = api.interceptors.response.use(
    (response) => response,
    async (requestError) => {   
      //401	Erro de autenticação na api.
      if(requestError?.response?.status === 401){
        if(requestError.response.data?.message === "token.expired" || requestError.response.data?.message === "token.invalid"){
          const { refresh_token } = await getAuthToken();

          if(!refresh_token){
            signOut();
            return Promise.reject(requestError);
          }

          const originalRequestConfig = requestError.config;

          if(isRefreshing){
            return new Promise((resolve, reject) => {
              failedQueue.push({
                onSuccess: (token: string) => {
                  originalRequestConfig.headers = { "Authorization": `Bearer ${token}` };
                  resolve(api(originalRequestConfig));
                },
                onFailure: (error: AxiosError) => {
                  reject(error);
                }
              });
            });
          }

          isRefreshing = true;

          return new Promise(async (resolve, reject) => {
            try {
              const { data } = await api.post<{ token: string }>("/sessions/refresh-token", { refresh_token });
              await saveAuthToken(data.token, refresh_token);

              if(originalRequestConfig.data){
                originalRequestConfig.data = JSON.parse(originalRequestConfig.data);
              }

              originalRequestConfig.headers = { "Authorization": `Bearer ${data.token}` };
              api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

              failedQueue.forEach((request) => {
                request.onSuccess(data.token);
              });

              resolve(api(originalRequestConfig));
            } catch (error: any) {
              failedQueue.forEach((request) => {
                request.onFailure(error);
              });
              
              signOut();
              reject(error);
            } finally {
              isRefreshing = false;
              failedQueue = [];
            }
          });
        }

        signOut();
      }  
      
      //Caso não seja um erro relacionado ao Token
      if(requestError.response && requestError.response.data){
        return Promise.reject(new Error(requestError.response.data.message));
      } else {
        return Promise.reject(requestError);
      }   
    }
  ); 

  return () => {
    //O método eject serve para remover um interceptador previamente registrado.
    api.interceptors.response.eject(interceptTokenManager);
  }
}

export default api;