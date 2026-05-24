import useDataStore from '../store/dataStore';
import { COLOR_CLASSES } from '../utils/color';
import Card from './Card'




function Lists() {
  const students = useDataStore((state) => state.students);
  return (
    <div className="mt-6">
        <h1 className="text-lg font-medium pl-3 border-l-3 border-primary">{students.length} élèves sont dans la liste</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
          {students.map((student) => (
            <Card
              key={student._id}
              studentId={student._id}
              name={student.name}
              color={COLOR_CLASSES[student.color as keyof typeof COLOR_CLASSES] ?? COLOR_CLASSES['blue'] }
            />
          ))}
        </div>
    </div>
  )
}

export default Lists