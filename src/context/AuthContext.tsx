'use client'
import { useContext, createContext, useState } from "react";
import { TUser } from "@/types/User";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth, firestore } from "@/services/firebaseService";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

const AuthContext = createContext(
  {} as {
    user: TUser | null;
    setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
    loading: boolean;
    logged: boolean;
    handleSignIn: () => void;
    handleLogOut: () => void;
  }
);

interface IAuthContextProviderProps {
  users: TUser[];
  invites: string[];
  children: React.ReactNode;
}

export const AuthContextProvider = ({ users, invites, children }: IAuthContextProviderProps) => {
  const [user, setUser] = useState<TUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [logged, setLogged] = useState(false);
  const router = useRouter();

  const handleSignIn = () => {
    setLoading(true);

    const provider = new GoogleAuthProvider();
    const result = signInWithPopup(auth, provider);

    result.then(async (res) => {
      const { user: currentUser } = res;

      if (!invites.find((invite: string) => invite === currentUser.email)) {
        console.log('user not invited')
        setLoading(false);
        return
      }

      const userRegistered = users.find(_user => _user.email === currentUser.email)
      // check if user is in database
      if (!userRegistered) {
        const users = await getDocs(collection(firestore, 'users'))
        const usersData = users.docs.map((users: { data: () => any; }) => users.data()) as TUser[];

        if (usersData.some((user) => user.email === currentUser.email)) {
          console.log("User already exists");
        } else {

          const newUser = {
            uid: currentUser.uid,
            email: currentUser.email!,
            displayName: currentUser.displayName!,
            role: 'user' as 'user' | 'admin',
            avatar: currentUser.photoURL || '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }

          await setDoc(doc(firestore, "users", newUser.uid), {
            ...newUser,
          })
            .then(() => {
              console.log('user added in database', res)
              setUser(newUser);
            })
            .catch(() => {
              console.log('error adding user in database')
            });
        }
      } else {
        console.log('user already in database')
        setUser(userRegistered);
      }

      console.log('user logged in', res)

      if (userRegistered?.role === 'admin') {
        router.push('/admin')
      } else {
        router.push('/profile')
      }
      setLoading(false);
      setLogged(true);
    }).catch((err) => {
      console.log(err);
      setLoading(false);
      setLogged(false);
    })
  };

  const handleLogOut = () => {
    setLoading(true);

    signOut(auth).then(() => {
      console.log('user logged out')
      setLoading(false);
      setLogged(false);
      setUser(null);
      router.push('/login');
    });
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logged, handleSignIn, handleLogOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};