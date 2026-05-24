import { useState } from 'react';
import Groupes from '../components/Groupes'
import Lists from '../components/Lists'
import { Boxes, User, Users } from 'lucide-react';
import useDataStore from '../store/dataStore';
import toast from 'react-hot-toast';


function Admin() {
    const error = useDataStore(state => state.error)
    const [selectedLists, setSelectedLists] = useState<'lists' | 'groupes'>('lists');
    const [maxMembers, setMaxMembers] = useState(2);
    const generateGroups = useDataStore((state) => state.generateGroups);
    
  return (
    <main className="container mx-auto lg:px-7.5 py-6 px-4 min-h-screen">
      {error && toast.error(error)}
        <h1 className="text-3xl font-bold text-center mt-10">Gestion des groupes </h1>

        <div className='max-w-200 mx-auto my-10'>
            <div className='flex gap-2 '>
                <button onClick={() => setMaxMembers(2)} className={`flex cursor-pointer flex-1 text-xl font-medium gap-2 py-3 px-4 bg-white items-center rounded-lg border  ${maxMembers == 2 ? 'border-primary' : 'border-black/10' }`}><Users /> 2 </button>
                <button onClick={() => setMaxMembers(3)} className={`flex cursor-pointer flex-1 text-xl font-medium gap-2 py-3 px-4 bg-white items-center rounded-lg border  ${maxMembers == 3 ? 'border-primary' : 'border-black/10' }`}><Users /> 3 </button>
                <button onClick={() => setMaxMembers(4)} className={`flex cursor-pointer flex-1 text-xl font-medium gap-2 py-3 px-4 bg-white items-center rounded-lg border  ${maxMembers == 4 ? 'border-primary' : 'border-black/10' }`}><Users /> 4 </button>
                <button onClick={() => setMaxMembers(5)} className={`flex cursor-pointer flex-1 text-xl font-medium gap-2 py-3 px-4 bg-white items-center rounded-lg border  ${maxMembers == 5 ? 'border-primary' : 'border-black/10' }`}><Users /> 5 </button>
            </div>
            <button onClick={() => generateGroups(maxMembers)} className='bg-primary mt-3 hover:bg-primary-dark cursor-pointer px-5 py-4 w-full rounded-lg text-white font-medium text-xl border border-black/50 flex gap-4 items-center justify-center'>Generer les groupes <Boxes /></button>
        </div>
              <section className='my-6'>
                <div className="flex ">
                    <button className={`flex-1 rounded-l-lg transition  h-12 cursor-pointer  font-medium text-xl  flex items-center justify-center gap-3 ${selectedLists == 'lists' ? 'bg-primary text-white' : 'bg-primary/20 text-primary'}`} onClick={() => setSelectedLists("lists")}>
                        <User />
                        Listes
                    </button>
                    <button className={`flex-1 h-12 rounded-r-lg transition cursor-pointer font-medium text-xl flex items-center justify-center gap-3 ${selectedLists == 'groupes' ? 'bg-primary text-white' : 'bg-primary/20 text-primary'}`} onClick={() => setSelectedLists("groupes")}>
                        <Users />
                        Groupes
                    </button>
                </div>
                {
                    selectedLists == 'lists' 
                    ? (
                        <Lists />
                    )
                    : (
                        <Groupes />
                    )
                }
            </section>
    </main>
  )
}

export default Admin