// import { useState } from "react";
// import docimg from "../assets/doc_image.png";
// import { Transition } from "@headlessui/react";
// import { useNavigate } from "react-router-dom";
// import InputField from "../utils/InputField.jsx";

// export default function Sign({ username, setUsername, setLoggedin }) {
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [email, setEmail] = useState("");
//   const [signingIn, setSigningIn] = useState(true);
//   const navigate = useNavigate();

//   function handleSubmit(e) {
//     if (signingIn) {
//       fetch("http://localhost:3000/api/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           username: username,
//           password: password,
//         }),
//         credentials: "include",
//       })
//         .then((res) => {
//           if (res.status !== 200) {
//             alert("Username or Password is incorrect");
//             return;
//           }
//           return res.json();
//         })
//         .then((data) => {
//           console.log(data);
//           localStorage.setItem("username", username);
//           localStorage.setItem("jwtKey", data.token);
//           setLoggedin(true);
//           navigate("/view");
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     } else {
//       fetch("http://localhost:3000/api/auth/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           username,
//           email,
//           password,
//         }),
//       })
//         .then((res) => {
//           if (res.status !== 200) {
//             alert("Username or Password is incorrect");
//             return;
//           }
//           return res.json();
//         })
//         .then((data) => {
//           console.log(data);
//           localStorage.setItem("username", username);
//           localStorage.setItem("jwtKey", data.token);
//           setLoggedin(true);
//           navigate("/view");
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }
//   }

//   return (
//     <div className="bg-[#f0f4f9] h-screen flex justify-center items-center">
//       <div
//         className={`transition-all duration-[600ms] bg-white w-9/12 rounded-3xl flex space-between ${
//           signingIn ? "h-3/6" : "h-4/6"
//         }`}
//       >
//         <div className="w-1/2 p-8 flex flex-col">
//           <img
//             src={docimg}
//             alt="Docs"
//             width={50}
//             height={50}
//             className="mb-6"
//           />
//           <h1 className='text-4xl text-black font-["Product_sans"]'>Sign in</h1>
//           <p className="text-black mt-4">Continue to Docs</p>
//         </div>
//         <div className="w-1/2 p-4 flex flex-col justify-center items-center">
//           <div className="flex flex-col flex-1 w-full justify-center mr-6">
//             <Transition
//               show={!signingIn}
//               enter="transition-opacity duration-500"
//               enterFrom="opacity-0"
//               enterTo="opacity-100"
//               leave="transition-opacity duration-500"
//               leaveFrom="opacity-100"
//               leaveTo="opacity-0"
//             >
//               <InputField
//                 value={email}
//                 setValue={setEmail}
//                 label="Email"
//                 type="email"
//               />
//             </Transition>
//             <div>
//               <InputField
//                 value={username}
//                 setValue={setUsername}
//                 label="Username"
//                 type="text"
//               />
//             </div>
//             <div>
//               <InputField
//                 value={password}
//                 setValue={setPassword}
//                 label="Password"
//                 type="password"
//               />
//             </div>
//             <Transition
//               show={!signingIn}
//               enter="transition-opacity duration-500"
//               enterFrom="opacity-0"
//               enterTo="opacity-100"
//               leave="transition-opacity duration-500"
//               leaveFrom="opacity-100"
//               leaveTo="opacity-0"
//             >
//               <InputField
//                 value={confirmPassword}
//                 setValue={setConfirmPassword}
//                 label="Confirm Password"
//                 type="password"
//               />
//             </Transition>
//           </div>

//           <div className="flex justify-end w-full">
//             <button
//               onClick={() => {
//                 setSigningIn(!signingIn);
//               }}
//               className="text-blue-600 bg-white mr-6 self-end px-4 py-2 mb-4 rounded-3xl hover:bg-slate-100"
//             >
//               {signingIn ? "Create an account" : "Already have an account"}
//             </button>
//             <button
//               onClick={handleSubmit}
//               className="hover:bg-[#0e4eb5] self-end text-white px-4 py-2 mb-4 mr-4 rounded-3xl shadow-md bg-[#0b57d0]"
//             >
//               {signingIn ? "Sign in" : "Sign up"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import docimg from "../assets/doc_image.png";
import { Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import InputField from "../utils/InputField.jsx";
import { useToast } from "../utils/useToast.jsx"; // ADDED

export default function Sign({ username, setUsername, setLoggedin }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [signingIn, setSigningIn] = useState(true);
  const navigate = useNavigate();
  const showToast = useToast(); // ADDED

  function handleSubmit(e) {
    if (signingIn) {
      fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
        credentials: "include",
      })
        .then(async (res) => {
          // MODIFIED: Added async
          if (res.status !== 200) {
            const errorText = await res.text(); // ADDED: Read error body
            showToast(
              errorText || "Username or Password is incorrect",
              "error"
            ); // MODIFIED: Use toast
            return;
          }
          return res.json();
        })
        .then((data) => {
          if (!data) return; // ADDED: Check if data exists
          console.log(data);
          localStorage.setItem("username", username);
          localStorage.setItem("jwtKey", data.token);
          setLoggedin(true);
          showToast(`Welcome back, ${username}!`, "success"); // ADDED: Success toast
          navigate("/view");
        })
        .catch((err) => {
          console.log(err);
          showToast("Network error occurred during sign in.", "error"); // ADDED: Network error toast
        });
    } else {
      fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      })
        .then(async (res) => {
          // MODIFIED: Added async
          if (res.status !== 200) {
            const errorText = await res.text(); // ADDED: Read error body
            showToast(errorText || "Registration failed.", "error"); // MODIFIED: Use toast
            return;
          }
          return res.json();
        })
        .then((data) => {
          if (!data) return; // ADDED: Check if data exists
          console.log(data);
          localStorage.setItem("username", username);
          localStorage.setItem("jwtKey", data.token);
          setLoggedin(true);
          showToast(`Account created for ${username}!`, "success"); // ADDED: Success toast
          navigate("/view");
        })
        .catch((err) => {
          console.log(err);
          showToast("Network error occurred during registration.", "error"); // ADDED: Network error toast
        });
    }
  }

  return (
    <div className="bg-[#f0f4f9] h-screen flex justify-center items-center">
      <div
        className={`transition-all duration-[600ms] bg-white w-9/12 rounded-3xl flex space-between ${
          signingIn ? "h-3/6" : "h-4/6"
        }`}
      >
        <div className="w-1/2 p-8 flex flex-col">
          <img
            src={docimg}
            alt="Docs"
            width={50}
            height={50}
            className="mb-6"
          />
          <h1 className='text-4xl text-black font-["Product_sans"]'>Sign in</h1>
          <p className="text-black mt-4">Continue to Docs</p>
        </div>
        <div className="w-1/2 p-4 flex flex-col justify-center items-center">
          <div className="flex flex-col flex-1 w-full justify-center mr-6">
            <Transition
              show={!signingIn}
              enter="transition-opacity duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <InputField
                value={email}
                setValue={setEmail}
                label="Email"
                type="email"
              />
            </Transition>
            <div>
              <InputField
                value={username}
                setValue={setUsername}
                label="Username"
                type="text"
              />
            </div>
            <div>
              <InputField
                value={password}
                setValue={setPassword}
                label="Password"
                type="password"
              />
            </div>
            <Transition
              show={!signingIn}
              enter="transition-opacity duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <InputField
                value={confirmPassword}
                setValue={setConfirmPassword}
                label="Confirm Password"
                type="password"
              />
            </Transition>
          </div>

          <div className="flex justify-end w-full">
            <button
              onClick={() => {
                setSigningIn(!signingIn);
              }}
              className="text-blue-600 bg-white mr-6 self-end px-4 py-2 mb-4 rounded-3xl hover:bg-slate-100"
            >
              {signingIn ? "Create an account" : "Already have an account"}
            </button>
            <button
              onClick={handleSubmit}
              className="hover:bg-[#0e4eb5] self-end text-white px-4 py-2 mb-4 mr-4 rounded-3xl shadow-md bg-[#0b57d0]"
            >
              {signingIn ? "Sign in" : "Sign up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
