import { createContext, useState } from 'react';

// AuthContext 생성
export const AuthContext = createContext();

// AuthProvider 컴포넌트
export const AuthProvider = ({ children }) => {
  const [memberId, setMemberId] = useState(null);
  const [username, setUsername] = useState('');

  return (
    <AuthContext.Provider
      value={{ memberId, setMemberId, username, setUsername }}
    >
      {children}
    </AuthContext.Provider>
  );
};
