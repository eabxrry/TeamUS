import axios from 'axios';
import { KeyRound, User } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAdminStore } from '../store/adminStore';

function Login() {
  const isLoggedIn = useAdminStore((state) => state.isLoggedIn);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await axios.post("/api/auth/login", { username, password });
      toast.success("You are now logged in");
      await isLoggedIn(); // Update the authenticated state in adminStore
      navigate("/admin");
    } catch (err) {
      toast.error("Login failed");
    }
  };

  return (
    <main className='container mx-auto lg:px-7.5 py-6 px-4 min-h-[calc(100vh-170px)] flex items-center justify-center'>
      <section className='w-full max-w-200 py-6 px-3 rounded-lg bg-primary/10 border border-primary/20'>
        <h1 className='text-center text-3xl font-bold my-2'>Se connecter</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div className='mb-4 mt-5'>
            <label className='flex items-center mb-2 gap-2 text-lg font-medium' htmlFor="username"><User /> USERNAME</label>
            <input
              className='bg-white w-full p-2 rounded border border-gray-300 outline-0'
              type="text"
              id="username"
              name="username"
              placeholder='your username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className='mb-4'>
            <label className='flex items-end mb-2 gap-2 text-lg font-medium' htmlFor="password"><KeyRound /> PASSWORD</label>
            <input
              className='bg-white w-full p-2 rounded border border-gray-300 outline-0'
              type="password"
              id="password"
              name="password"
              placeholder='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className='mt-2'>
            <button
              type="submit"
              className='bg-primary hover:bg-primary-dark cursor-pointer text-white px-4 py-2 rounded w-full text-xl font-medium'
            >
              Login
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default Login;
