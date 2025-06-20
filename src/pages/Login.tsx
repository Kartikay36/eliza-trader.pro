import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, Eye, EyeOff, Shield, AlertCircle, LogOut } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

interface UserInfo {
  userId: string;
  role: string;
}

interface FormData {
  userId: string;
  password: string;
}

interface LockoutData {
  lockUntil: number;
  attempts: number;
}

const authenticateUser = async (userId: string, password: string): Promise<string> => {
  try {
    const apiBase = import.meta.env.VITE_API_URL || '';
const response = await fetch(`${apiBase}/api/login`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, password }),
    });

    // Handle non-JSON responses
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      throw new Error(text || `Unexpected response (${response.status})`);
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || data.message || `Authentication failed (${response.status})`);
    }

    if (!data.token) {
      throw new Error('No authentication token received');
    }

    return data.token;
  } catch (error) {
    console.error('Authentication error:', error);
    // Handle HTML error pages
    if (error instanceof Error && error.message.includes('The page could not be found')) {
      throw new Error('API endpoint not found. Please check server configuration.');
    }
    throw error instanceof Error ? error : new Error('Authentication failed');
  }
};

const logoutUser = async (): Promise<void> => {
  try {
    const apiBase = import.meta.env.VITE_API_URL || '';
const response = await fetch(`${apiBase}/api/login`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    });
    
    if (!response.ok) {
      console.warn('Logout request failed');
    }
  } catch (error) {
    console.error('Logout error:', error);
    throw new Error('Logout failed');
  }
};

const Login = () => {
  const [formData, setFormData] = useState<FormData>({
    userId: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [isLocked, setIsLocked] = useState(false);
  const [lockTimeRemaining, setLockTimeRemaining] = useState(0);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({ userId: '', role: '' });
  
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    const userId = sessionStorage.getItem('userId');
    const userRole = sessionStorage.getItem('userRole');
    
    if (token && userId && userRole) {
      setIsLoggedIn(true);
      setUserInfo({ userId, role: userRole });
    }

    const lockoutData = localStorage.getItem('loginLockout');
    if (lockoutData) {
      try {
        const { lockUntil, attempts } = JSON.parse(lockoutData) as LockoutData;
        const now = Date.now();
        
        if (now < lockUntil) {
          setIsLocked(true);
          setLockTimeRemaining(Math.ceil((lockUntil - now) / 1000));
          setFailedAttempts(attempts);
        } else {
          localStorage.removeItem('loginLockout');
        }
      } catch {
        localStorage.removeItem('loginLockout');
      }
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isLocked && lockTimeRemaining > 0) {
      interval = setInterval(() => {
        setLockTimeRemaining(prev => {
          if (prev <= 1) {
            setIsLocked(false);
            localStorage.removeItem('loginLockout');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLocked, lockTimeRemaining]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleLockout = () => {
    const newAttempts = failedAttempts + 1;
    setFailedAttempts(newAttempts);

    if (newAttempts >= 3) {
      const lockUntil = Date.now() + 30000;
      localStorage.setItem('loginLockout', JSON.stringify({
        lockUntil,
        attempts: newAttempts
      }));
      setIsLocked(true);
      setLockTimeRemaining(30);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLocked) {
      setError(`Account locked. Try again in ${lockTimeRemaining} seconds.`);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const token = await authenticateUser(formData.userId, formData.password);

      localStorage.removeItem('loginLockout');
      sessionStorage.setItem('authToken', token);
      sessionStorage.setItem('userRole', 'admin');
      sessionStorage.setItem('userId', formData.userId);
      
      setIsLoggedIn(true);
      setUserInfo({ userId: formData.userId, role: 'admin' });
      setFailedAttempts(0);
    } catch (err) {
      handleLockout();
      
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Invalid credentials. Please check your username and password.';
      
      setError(
        typeof errorMessage === 'string' 
          ? errorMessage 
          : 'An unknown error occurred'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    
    try {
      await logoutUser();
      sessionStorage.removeItem('authToken');
      sessionStorage.removeItem('userRole');
      sessionStorage.removeItem('userId');
      
      setIsLoggedIn(false);
      setUserInfo({ userId: '', role: '' });
      setFormData({ userId: '', password: '' });
      setError('');
    } catch (error) {
      console.error('Logout failed:', error);
      setError(
        error instanceof Error 
          ? error.message 
          : 'Logout failed. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        <Navigation />
        
        <main className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
                Welcome Back!
              </h1>
              <p className="text-gray-400">
                You are successfully logged in
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
              <div className="text-center space-y-4">
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                  <div className="flex items-center justify-center space-x-3">
                    <Shield className="w-6 h-6 text-green-400" />
                    <div>
                      <h4 className="text-lg font-semibold text-green-300">Authentication Successful</h4>
                      <p className="text-sm text-green-200">User: {userInfo.userId}</p>
                      <p className="text-sm text-green-200">Role: {userInfo.role}</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  disabled={isLoading}
                  className="w-full py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 text-white"
                >
                  <LogOut className="w-5 h-5" />
                  <span>{isLoading ? 'Logging out...' : 'Logout'}</span>
                </button>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <button
                    onClick={() => navigate('/news')}
                    className="py-2 px-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-lg font-semibold transition-all duration-200 text-white"
                  >
                    News Panel
                  </button>
                  <button
                    onClick={() => navigate('/')}
                    className="py-2 px-4 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 rounded-lg font-semibold transition-all duration-200 text-white"
                  >
                    Home
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link
                to="/"
                className="text-sm text-blue-300 hover:text-blue-200 transition-colors duration-200"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      <Navigation />
      
      <main className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
              Admin Login
            </h1>
            <p className="text-gray-400">
              Access the Elizabeth Trader admin panel
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
            <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                   <h4 className="text-sm font-semibold text-blue-300 mb-1">Secure Login</h4>
                   <p className="text-xs text-blue-200">Credentials are stored securely on the server</p>
                </div>
              </div>
            </div>

            {isLocked && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <div>
                    <h4 className="text-sm font-semibold text-red-300">Account Locked</h4>
                    <p className="text-sm text-red-200">
                      Too many failed attempts. Try again in {lockTimeRemaining} seconds.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {failedAttempts > 0 && failedAttempts < 3 && !isLocked && (
              <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-3">
                  <AlertCircle className="w-5 h-5 text-yellow-400" />
                  <div>
                    <p className="text-sm text-yellow-200">
                      {3 - failedAttempts} attempts remaining before lockout
                    </p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="userId" className="block text-sm font-medium text-gray-300 mb-2">
                  Username or Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="userId"
                    name="userId"
                    value={formData.userId}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your username or email"
                    required
                    disabled={isLocked}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your password"
                    required
                    disabled={isLocked}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors"
                    disabled={isLocked}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
                  <p className="text-sm text-red-300">
                    {error}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || isLocked}
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 ${
                  isLoading || isLocked
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transform hover:scale-105'
                } text-white`}
              >
                {isLoading ? 'Signing In...' : isLocked ? `Locked (${lockTimeRemaining}s)` : 'Sign In'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link
                to="/"
                className="text-sm text-blue-300 hover:text-blue-200 transition-colors duration-200"
              >
                ← Back to Home
              </Link>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-400">
              This is a secure area. All access attempts are logged and monitored.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
