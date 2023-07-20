import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../utils/supabase";

interface Props {
  children: React.ReactNode;
}

type ContextProps = {
  isSignedIn: boolean;
  setIsSignedIn: React.Dispatch<React.SetStateAction<any>>;
};

const AuthContext = createContext<ContextProps>({
  isSignedIn: false,
  setIsSignedIn: () => {},
});

export default function AuthProvider({ children }: Props) {
  const session = supabase.auth.getSession();
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    async function handleSession() {
      const fulfilledSession = await session;

      // TODO: check if this is the optimal way of checking if signed in
      if (fulfilledSession?.data?.session?.access_token) {
        setIsSignedIn(true);
      } else {
        setIsSignedIn(false);
      }
    }

    handleSession();
  }, [session]);

  return (
    <AuthContext.Provider
      value={{
        isSignedIn,
        setIsSignedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
