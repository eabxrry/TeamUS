import { User, Trash } from "lucide-react";
import useDataStore from "../store/dataStore";
import { useAdminStore } from "../store/adminStore";

type ColorClass = {
  solid: string;
  light: string;
  text: string;
  border: string;
};

type CardProps = {
  color: ColorClass;
  name: string;
  studentId?: string;
};

function Card({ color, name, studentId }: CardProps) {
  const authenticated = useAdminStore((state) => state.authenticated);
  const handleDelete = useDataStore((state) => state.handleDelete);
  return (
    <div
      className={`flex items-center gap-4 ${color.light} border ${color.border} ${color.text} rounded-md px-3 py-2 font-medium`}
    >
      <User />
      <p className="flex-1">{name}</p>
      {
        authenticated && (
          <span onClick={() => handleDelete(`api/students/${studentId}`)} className="flex h-10 w-10 bg-red-200 hover:bg-red-300 cursor-pointer items-center justify-center rounded-lg border border-red-400/50">
            <Trash color="red" />
          </span>
        )}
    </div>
  );
}

export default Card;
