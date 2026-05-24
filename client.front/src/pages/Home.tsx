import { SendHorizontal, User, Users } from "lucide-react";
import { useState } from "react";
import Lists from "../components/Lists";
import Groupes from "../components/Groupes";
import useDataStore from "../store/dataStore";
import { COLOR_CLASSES } from "../utils/color";
import toast from "react-hot-toast";
const COLORS = [
  "blue",
  "green",
  "purple",
  "orange",
  "red",
  "pink",
  "teal",
  "yellow",
] as const;



function Home() {
  const error = useDataStore(state => state.error)
  const addStudent = useDataStore((state) => state.addStudent);
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedLists, setSelectedLists] = useState('lists');
    const [userData, setUserData] = useState({
        fullname: '',
        color: selectedColor
    }) 

  
    

  return (
    <main className="min-h-screen container mx-auto lg:px-7.5">
      {error && toast.error(error)}
      <h1 className="text-3xl font-bold text-center mt-10">
        Bienvenue sur Team<span className="text-primary">US</span>
      </h1>

      <section className="my-10">
        <div className="flex flex-col max-w-200 mx-auto">
          <input
            type="text"
            value={userData.fullname}
            placeholder="john doe"
            className="border border-primary rounded-md px-4 h-12 w-full"
            onChange={(e) => setUserData({...userData, fullname: e.target.value})}
          />
          <div className="flex gap-3 my-3 flex-wrap justify-center">
            {COLORS.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setSelectedColor(color)}
                className={`
                  w-9 h-9 rounded-full
                  cursor-pointer
                  ${COLOR_CLASSES[color].solid}
                  border-2
                  ${
                    selectedColor === color
                      ? "border-black ring-2 ring-black scale-110"
                      : "border-white"
                  }
                  transition
                `}
              />
            ))}
          </div>

          <button
            onClick={() => addStudent({ name: userData.fullname, color: selectedColor })}
            disabled={!selectedColor || userData.fullname.trim() == ''}
            className={`
              px-4 py-3 font-medium rounded-md mt-4
              flex items-center justify-between
              cursor-pointer
              transition
              ${
                selectedColor
                  ? "bg-primary text-white hover:bg-primary-dark"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }
            `}
          >
            Envoyer <SendHorizontal />
          </button>
        </div>
      </section>

      <section>
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
  );
}

export default Home;
