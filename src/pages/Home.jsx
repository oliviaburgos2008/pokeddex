import { useDispatch } from "react-redux"
import { setTrainerName } from "../store/slices/trainerName.slice"
import { useNavigate } from "react-router-dom"

const Home = () => {

   const dispatch = useDispatch()
   const navigate = useNavigate()


    const handleSubmit = (e) => {
        e.preventDefault()
         dispatch(setTrainerName(e.target.trainerName.value))
         navigate("/pokedex")
    }

  return (
    <main className="h-screen grid grid-rows-[1fr,_auto]">
          <section className="grid place-content-center text-center">
            <div>
                <div>
                    <img src="/images/logo.png" alt="" />
                </div>
                <h3 className="text-4xl text-red-500 font-bold">¡Hi Coach!</h3>
                <p className="text-2xl text-slate-500  font-bold">To start, give me your name</p>
                <form onSubmit={handleSubmit} className="flex gap-0">
                    <input name="trainerName" 
                    className="shadow appearance-none w-full py-2 px-4 text-gray-700 
                    leading-tight focus:outline-none focus:shadow-outline" 
                    type="text"
                     placeholder="Your name..."
                     required
                     />
                    <button className="bg-red-500 hover:bg-red-700 text-white
                     font-bold  px-16  border-red-700">Search</button>
                </form>
            </div>
          </section>
        <footer >
          <div className="bg-red-600 h-16"></div>
          <div className="bg-black h-12 relative">
            <div className="h-[70px] w-[70px] bg-white border-8 border-black 
            rounded-full absolute left-1/2 -translate-x-1/2 -translate-y-1/2 
            grid place-content-center">
         <div className="w-9 h-9 rounded-full bg-slate-700 border-[6px] border-black"></div>

             </div>
             
          </div>

        </footer>
    </main>
  )
}
export default Home