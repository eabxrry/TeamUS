import { useNavigate } from "react-router-dom";

function Error() {
    const navigate = useNavigate();
  return (
    <main className="flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-2xl font-bold text-center mt-10">404 - Page Not Found</h1>
        <p className="text-center mt-4">Désolé, la page que vous recherchez n'existe pas.</p>
        <button onClick={() => navigate('/')} className="block cursor-pointer mx-auto mt-4 bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark">Retour à l'accueil</button>
    </main>
  )
}

export default Error