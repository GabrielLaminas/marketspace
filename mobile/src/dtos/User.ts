interface UserDTO {
  avatar: string; 
  created_at: string; 
  email: string; 
  id: string; 
  name: string; 
  tel: string; 
  updated_at: string;
  size_active_ad?: number;
}

interface UserSignInDTO {
  refresh_token: string; 
  token: string; 
  user: UserDTO;
}

export { UserSignInDTO, UserDTO }