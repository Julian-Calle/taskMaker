import React from 'react';
import decodeTokenData from '../utils/decodeTokenData.js';
import { useState } from 'react';
import { login } from '../../https/users';
import { useHistory } from 'react-router-dom';
// 1 Creamos el contexto y exportamos para usar en el hook
export const AuthContext = React.createContext();
const AuthContextProvider = AuthContext.Provider;

// 2 Recuperamos el token del localStorage
const token = localStorage.getItem('token');
const tokenObject = decodeTokenData(token);

// 3 Creamos un custom provider
export function AuthProvider({ children }) {
  const [userData, setUserData] = useState(tokenObject);
  const [isUserLogged, setIsUserLogged] = useState(!!tokenObject);
  const history = useHistory();

  // Método para hacer log in desde los componentes
  const signIn = async (email, password) => {
    const loginData = await login(email, password);

    if (loginData.status === 'error') {
      return loginData;
    }
    const tokenObject = decodeTokenData(loginData);
    setUserData(tokenObject);
    setIsUserLogged(true);
    localStorage.setItem('token', loginData);
    history.push('/');
    return tokenObject;
  };

  //Método para hacer logout
  const signOut = async () => {
    localStorage.removeItem('token');
    history.push('/');
  };

  // 4 devolvemos el provider metiendole dentro los children
  return (
    <AuthContextProvider
      value={{
        signIn,
        signOut,
        userData,
        isUserLogged,
        history,
      }}
    >
      {children}
    </AuthContextProvider>
  );
}
