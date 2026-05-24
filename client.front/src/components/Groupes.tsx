import { Trash, Users } from 'lucide-react';
import { COLOR_CLASSES } from '../utils/color';
import Card from './Card';
import useDataStore from '../store/dataStore';
import { useAdminStore } from '../store/adminStore';


function Groupes() {
  const authenticated = useAdminStore((state) => state.authenticated);
  const groupes = useDataStore((state) => state.groups);
  const handleDelete = useDataStore((state) => state.handleDelete)
  return (
    <>
      {groupes.map((groupe) => (
        <div key={groupe._id} className="mt-6">
          <h1 className="text-lg font-medium pl-3 border-l-4 items-center border-primary flex gap-1 "><Users /> {groupe.name} 
          {
            authenticated && (
              <span onClick={() => handleDelete(`api/groupes/${groupe._id}`)} className="ml-4 flex h-8 w-8 bg-red-200 hover:bg-red-300 cursor-pointer items-center justify-center rounded-lg border border-red-400/50">
                <Trash size={18} color="red" />
              </span>
            )
          }
      </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
            {groupe.membres.map((membre) => (
              <Card
               studentId={membre._id}
                key={membre._id}
                name={membre.name}
                color={COLOR_CLASSES[membre.color as keyof typeof COLOR_CLASSES] }
              />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

export default Groupes;
