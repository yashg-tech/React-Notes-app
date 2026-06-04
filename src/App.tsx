import { useState, useEffect } from "react"



const App  = () => {

  
  const [title, setTitle] = useState('')
  const [details,setDetails] = useState('')
  const [task, setTask] = useState<{title:string,details:string}[]>(() => {
    const savedNotes = localStorage.getItem("notes")

    if (savedNotes){
      return JSON.parse(savedNotes)
    }
    return[]
  })
  const [search, setSearch] = useState("")
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const[isEditing, setIsEditing] = useState(false)


  const submitHandler = (e) =>{
    e.preventDefault() 
    
    const copyTask = [...task];

if (isEditing && editIndex !== null) {
  copyTask[editIndex] = { title, details };
  setIsEditing(false);
  setEditIndex(null);
} else {
  copyTask.push({ title, details });
}

setTask(copyTask);

    setTitle('')
    setDetails('')
  }

  const deleteNote =(idx)=>{
    const copyTask = [...task];
    
    copyTask.splice(idx,1)

    setTask(copyTask)

  }

  const editNote = (idx:number) =>{
    setTitle(task[idx].title)
    setDetails(task[idx].details)

    setEditIndex(idx)
    setIsEditing(true)

  
  }

  const filteredNotes = task.filter((note) =>
  note.title.toLowerCase().includes(search.toLowerCase())
)

  useEffect(() =>{
    localStorage.setItem("notes",JSON.stringify(task))

},[task])
  return (
    <div className='h-screen lg:flex text-black bg-white'>
    <form onSubmit={(e)=>{

      submitHandler(e)
    }} className='flex gap-4 lg:w-1/2 flex-col items-start p-10  '>
       <h1 className='text-4xl font-bold text-black'>Add Notes</h1>

         <input 
        type="text" 
        placeholder='Enter Notes Heading' 
        className='px-5 w-full font-medium py-2 border-2 outline-none rounded'
        value={title}
        onChange={(e)=>{
          setTitle(e.target.value)
        }}
        />

        <textarea
        className='px-5 w-full font-medium h-32 py-2 flex items-start flex-row border-2 outline-none rounded'
        placeholder='Write Details here'
        value={details}
        onChange={(e)=>{
          setDetails(e.target.value)
        }}
        
         />

         <button
         type="submit"
          className='bg-black  active:scale-95 font-medium w-full outline-none  text-white px-5 py-2 rounded'
          >
            Add Note</button>
       
      </form>
      
      <div className='lg:w-1/2 lg:border-l-2 p-8 bg-gray-700'>

  {/* Heading + Search */}
  <div className='flex items-center justify-between mb-5'>
    <h1 className='text-4xl font-bold text-white whitespace-nowrap'>
      Recent Notes
    </h1>

    <input
      type="text"
      placeholder="🔍 Search Notes..."
      value={search}
      onChange={(e) => {
        setSearch(e.target.value)
      }}
      className="w-60 px-3 py-2 rounded-lg border border-gray-300 bg-white text-black shadow-md outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Notes */}
  <div className='flex gap-5 flex-wrap items-start justify-start mt-5 h-full overflow-auto'>
    {filteredNotes.map(function (elem, idx) {

      return (
        <div
          key={idx}
          className="flex  flex-col items-start relative h-52 w-40 bg-cover rounded-2xl py-5 pb-5 px-4 bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf3bUzcfjXEgpNynCGXAL2naN49al7QDepIQ&s')]"
        >
          <h3 className='leading-tight text-xl font-bold wrap-break-word mb-3'>
            {elem.title}
          </h3>

          <p className=" mt-2 font-medium text-sm wrap-break-word overflow-hidden ">
            {elem.details}
          </p>
            

          <button 
          onClick={() => editNote(idx)}
          className="w-full mt-auto cursor-pointer active:scale-95 bg-blue-500 rounded-xl font-bold text-white">
            Edit</button>
            

          <button
            onClick={() => {
              deleteNote(idx)
            }}
            className='w-full mt-auto cursor-pointer active:scale-95 bg-red-500 rounded-xl font-bold text-white'
          >
            Delete
          </button>
       
        </div>
      )
     

    })}
  </div>
</div>
</div>

  )
}


export default App