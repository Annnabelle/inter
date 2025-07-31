import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

const SESSION_DURATION_MS = 30 * 60 * 1000; // 30 минут
const WARNING_DURATION_MS = 5 * 60 * 1000; // 5 минут (можно оставить как есть)

export function useSessionTimeout(setShowWarning: (v: boolean) => void) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = () => {
      const sessionStart = localStorage.getItem('sessionStart');
      if (sessionStart) {
        const now = Date.now();
        const elapsed = now - parseInt(sessionStart, 10);
        const timeLeft = SESSION_DURATION_MS - elapsed;

        if (timeLeft <= 0) {
          localStorage.clear();
          dispatch(logout());
          navigate('/');
        } else if (timeLeft <= WARNING_DURATION_MS) {
          setShowWarning(true);
        }
      }
    };

    const interval = setInterval(checkSession, 60 * 1000); 
    checkSession(); 

    return () => clearInterval(interval);
  }, [dispatch, navigate, setShowWarning]);
}

