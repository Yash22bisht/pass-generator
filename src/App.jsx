import React, { useCallback, useEffect, useRef, useState } from "react";
import "./output.css";
function App() {
  const [pass, setpass] = useState("");
  const [length, setlength] = useState(8);
  const [num, setNum] = useState(false);
  const [char, setChar] = useState(false);
  var choice = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  const passref = useRef(null);

  const gen_pass = useCallback(() => {
    if (num) choice += "0123456789";
    if (char) choice += "!@#$%^&*";

    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * choice.length);
      password += choice[randomIndex];
    }
    return password;
  }, [length, num, char, setpass]);

  const copyPass = useCallback( async() => {
    await passref.current?.select();
    window.navigator.clipboard.writeText(pass);
    alert("Password copied to clipboard ");
  }, [pass]);

  useEffect(() => {
    let password = gen_pass();
    setpass(password);
  }, [char, length, num, gen_pass]);

  return (
    <div className="bg-zinc-800 w-screen h-screen flex justify-center p-10 ">
      <div className="space-y-5  flex flex-col w-[50vw] rounded-2xl bg-gray-800 h-[45vh] items-center py-6">
        <h1 className="text-4xl text-orange-500 font-bold ">
          Password Generator
        </h1>
        <div className="space-x-2">
          <input
            type="text"
            ref={passref}
            className="w-[30vw] h-10 p-4 rounded-md text-orange-500 font-bold text-lg"
            readOnly
            value={pass}
          />

          <button
            className="px-4 py-2 bg-cyan-500  border-white border-2 rounded-md hover:bg-cyan-700 hover:font-bold  "
            onClick={copyPass}
          >
            Copy{" "}
          </button>
        </div>
        <div className="space-x-2 text-white text-lg">
          <input
            type="range"
            min={8}
            max={30}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
              setlength(e.target.value);
            }}
          />
          <label className="text-white text-lg">{length} </label>
          <input
            type="checkbox"
            value={num}
            onChange={() => setNum((prevNum) => !prevNum)}
          />

          <label>Numbers</label>
          <input
            type="checkbox"
            value={char}
            onChange={() => setChar((prevChar) => !prevChar)}
          />
          <label>Special Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
