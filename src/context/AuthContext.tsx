'use client'
import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "@/services/firebaseService";
import { TUser } from "@/types/User";
import { UserService } from "@/services/userService";

const AuthContext = createContext(
  {} as {
    user: TUser | null;
    googleSignIn: () => Promise<any>;
    logOut: () => void;
  }
);

export const AuthContextProvider = ({ invites = [], users = [], children }: { invites: string[], users: TUser[], children: React.ReactNode }) => {
  const [user, setUser] = useState<TUser | null>(null);

  const googleSignIn = (): Promise<TUser> => {
    const signInPromise: Promise<TUser> = new Promise((resolve, reject) => {
      const provider = new GoogleAuthProvider();
      const result = signInWithPopup(auth, provider);
      result.then((res) => {
        const { user: currentUser } = res;

        if (!invites.find(invite => invite === currentUser.email)) {
          console.log('user not invited')
          reject('user not invited')
          return
        }

        const userRegistered = users.find(_user => _user.email === currentUser.email)
        // check if user is in database
        if (!userRegistered) {
          UserService.newUser({
            uid: currentUser.uid,
            email: currentUser.email!,
            displayName: currentUser.displayName!,
            role: 'user',
            avatar: currentUser.photoURL || '',
          }).then((res) => {
            console.log('user added in database', res)
            setUser(res);
            resolve(res);
          })
        } else {
          console.log('user already in database')
          setUser(userRegistered);
          resolve(userRegistered);
        }
      }).catch((err) => {
        console.log(err);
        reject(err);
      })
    });

    return signInPromise;
  };

  const logOut = () => {
    signOut(auth).then(() => {
      setUser(null);
    });
  };

  return (
    <AuthContext.Provider value={{ user, googleSignIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};