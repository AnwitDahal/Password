import { useCallback, useEffect, useState, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  const [lengthp, setLength] = useState(6);
  const [number, setNumber] = useState(false);
  const [special, setSpecial] = useState(false);
  const [password, setPassword] = useState("");
  const [copydone,setCopyDone]=useState("Copy")

  //useRef hook
  const passwordRef = useRef();

  const passwordGen = useCallback(() => {
    let pass = "";
    let string = "ABCDEFGHIJKLMNOPQRSTUWVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) {
      string += "0123456789";
    }
    if (special) {
      string += "!@#$%^&*()_+=~-*/";
    }
    for (let i = 1; i <= lengthp; i++) {
      let char = Math.floor(Math.random() * string.length + 1);
      pass += string.charAt(char);
    }

    setPassword(pass);
  }, [lengthp, number, special, setPassword,setCopyDone]);

  const copyToClipBoard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 14);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGen();
    setCopyDone('Copy');
  }, [lengthp, number, special, passwordGen]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg p-4  text-orange-500 bg-gray-700 my-6">
        <h1 className="text-white text-center my-3">Password Generator</h1>
        <div className="flex shadow-white rounded-lg overflow-hidden">
          <input
            type="text"
            value={password}
            className="outline-none w-full px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
            <button
              className="outline-none bg-blue-600 text-white px-3 py-0.5 shrink-0 active:bg-blue-800 hover:bg-blue-700"
              onClick={()=>{
                copyToClipBoard()
                setCopyDone(('Copied'))
              }}
              
            >
              {copydone}
            </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={14}
              value={lengthp}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length:{lengthp}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={number}
              id="NumberInput"
              onChange={() => {
                setNumber((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={special}
              id="SpecInput"
              onChange={() => {
                setSpecial((prev) => !prev);
              }}
            />
            <label htmlFor="SpecInput">S. Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
