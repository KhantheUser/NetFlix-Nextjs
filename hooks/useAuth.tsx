import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/router";
import {
  useMemo,
  useState,
  createContext,
  useContext,
  ReactNode,
  useEffect,
} from "react";
interface AuthProviderProps {
  children: ReactNode;
}
interface IAuth {
  user: User | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  loading: boolean;
}
const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  error: null,
  loading: false,
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [initialLoading, setInitialLoading] = useState(true);
  const signUp = async (email: string, password: string) => {
    setLoading(loading);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      router.push("/");
      setLoading(false);
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      setLoading(false);
    }
  };
  const signIn = async (email: string, password: string) => {
    setLoading(loading);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      router.push("/");
      setLoading(false);
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      setLoading(false);
    }
  };
  const logout = async () => {
    setLoading(true);
    await signOut(auth);
    setUser(null);
    setLoading(false);
  };
  const memoedValue = useMemo(
    () => ({ user, signUp, signIn, error, loading, logout }),
    [user, loading, error]
  );
  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // Logged in...
          setUser(user);
          setLoading(false);
        } else {
          // Not logged in...
          setUser(null);
          setLoading(true);
          router.push("/login");
        }

        setInitialLoading(false);
      }),
    [auth]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
