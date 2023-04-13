// import React from 'react';
// import { FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
// import { useState } from 'react';
// import app from '../firebase/firebase.init';




// const auth = getAuth(app)

// const Home = () => {
//   const [user, setUser] = useState({})
//   console.log(user)
//   const provider = new GoogleAuthProvider()
//   const faceBookProvider = new FacebookAuthProvider();
//   const githubProvider = new GithubAuthProvider();

//   const handleGoogle = () => {
//     signInWithPopup(auth, provider)
//       .then(result => {
//         const use = result.user;
//         setUser(use)
//       })
//       .catch(error => {
//         console.error(error)
//       })
//   }
//   const handleFacebook = () => {
//     signInWithPopup(auth, faceBookProvider)
//       .then(result => {
//         const use = result.user;
//         setUser(use)
//       })
//       .catch(error => {
//         console.error(error)
//       })
//   }
//   const handleGithub = () => {
//     signInWithPopup(auth, githubProvider)
//       .then(result => {
//         const use = result.user;
//         setUser(use)
//       })
//       .catch(error => {
//         console.error(error)
//       })
//   }

//   const handleSignOut = () => {
//     signOut(auth)
//       .then(() => {
//         setUser({})
//       })
//       .catch(error => {
//         console.error(error)
//       })
//   }
//   return (
//     <div className='App'>
//       {
//         user.uid ? <button onClick={handleSignOut}>sign out</button>
//           :
//           <div>
//             <button onClick={handleGoogle}>google</button>
//             <button onClick={handleFacebook}>faceBook</button>
//             <button onClick={handleGithub}>github</button>
//           </div>
//       }

//       <h2>{user.displayName}</h2>
//       <img src={user.photoURL} alt="" />
//     </div>
  
// );
// };

// export default Home;