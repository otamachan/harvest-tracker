import { useState, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

interface User {
  username: string;
  loginTime: number;
}

export function useAuth() {
  const [user, setUser] = useLocalStorage<User | null>('authUser', null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (!user) return false;
    
    // 24時間でセッション期限切れ
    const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24時間
    const now = Date.now();
    const isExpired = (now - user.loginTime) > SESSION_DURATION;
    
    if (isExpired) {
      setUser(null);
      return false;
    }
    
    return true;
  });

  const login = useCallback((username: string, password: string): boolean => {
    // 簡単な認証ロジック（実際の本番環境では適切な認証システムを使用）
    const validCredentials = [
      { username: 'admin', password: 'harvest2025' },
      { username: 'farmer', password: 'veggie123' }
    ];

    const isValid = validCredentials.some(
      cred => cred.username === username && cred.password === password
    );

    if (isValid) {
      const userData: User = {
        username,
        loginTime: Date.now()
      };
      setUser(userData);
      setIsAuthenticated(true);
      return true;
    }

    return false;
  }, [setUser]);

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
  }, [setUser]);

  return {
    isAuthenticated,
    user,
    login,
    logout
  };
}