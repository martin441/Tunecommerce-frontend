// // import PrivateRoute from "../../routes/index.js";
// import { Link } from "react-router-dom";
// //import { useSelector } from "react-redux";
// import styles from "../css/ProfilePage.module.css";
// const ProfilePage = () => {
//   // const user = useSelector((store) => store.user);
//   // console.log("user", user);
//   return (
//     <>
//       {/* <div
//         style={{
//           position: "absolute",
//           borderRadius: "5px",
//           left: "20vw",
//           top: "10vh",
//           width: "60vw",
//           height: "10vh",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",

//           backgroundSize: "80vw",
//         }}
//       >
//         <div className={styles.misdatos}>
//           <h1>Mi perfil</h1>
//           <div className={styles.label}>foto de perfil</div>
//           <div className={styles.label}>Nombre de usuario: </div>
//           <div className={styles.label}>Nombre</div>
//           <div className={styles.label}>Apellido</div>
//           <div className={styles.label}>Mail</div>
//           <div className={styles.label}>Dirección</div>
//           <div className={styles.label}>Nº teléfono</div>
//         </div>
//       </div> */}
//       <Link to="/">Volver a inicio</Link>

//       <div className={styles.profile}>
//         <div className={styles.avatar}></div>
//         <div className={styles.caja}>
//           <div className={styles.name}>Nombre de usuario</div>
//           <button className={styles.button}>Editar</button>
//         </div>
//         {/* {<div className={styles.name}>Nombre de usuario</div>} */}
//         {/* {<div className={styles.bio}>biografia</div>} */}
//         {/* {<button className={styles.button}>Editar perfil</button>} */}
//       </div>
//     </>
//   );
// };

// export default ProfilePage;

// // export default function Profile() {
// //     const products = useSelector(store => store.carousel.products)
// //     let { token } = useSelector(store => store?.auth)
// //     const user = useSelector(store => store.user.user)
// //     const dispatch = useDispatch()
// //     const [buyer, setBuyer] = useState({})

// //     const data = async() =>{
// //         let headers = {headers: {'Authorization':`Bearer ${token}`}}
// //         try{
// //             const response = await axios.get("http://localhost:8080/api/buyer", headers)
// //             setBuyer(response.data.response)
// //         }
// //         catch(error){
// //             console.log(error);
// //         }
// //     }

// //     console.log(buyer)
// //     useEffect(() => {
// //         dispatch(get_one(token))
// //         dispatch(get_carousel())
// //         data()
// //     },[])

import React, { useState } from "react";
import styles from "../css/ProfilePage.module.css";

function ProfilePage() {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("firstName");
  const [lastName, setLastName] = useState("lastName");
  const [address, setAddress] = useState("address");
  const [phoneNumber, setPhoneNumber] = useState("phoneNumber");
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    username: "usuario",
    name: "Nombre",
    lastName: "Apellido",
    address: "Dirección",
    phone: "Número de teléfono",
  });
  function handleSave(newProfileData) {
    setProfileData(newProfileData);
    setIsEditing(false);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave({
      username,
      firstName,
      lastName,
      address,
      phoneNumber,
    });
  };

  return (
    // <form className={styles.profileform} onSubmit={handleSubmit}>
    //   <label>
    //     Nombre de usuario:
    //     <input
    //       type="text"
    //       value={username}
    //       onChange={(event) => setUsername(event.target.value)}
    //     />
    //   </label>
    //   <label>
    //     Nombre:
    //     <input
    //       type="text"
    //       value={firstName}
    //       onChange={(event) => setFirstName(event.target.value)}
    //     />
    //   </label>
    //   <label>
    //     Apellido:
    //     <input
    //       type="text"
    //       value={lastName}
    //       onChange={(event) => setLastName(event.target.value)}
    //     />
    //   </label>
    //   <label>
    //     Dirección:
    //     <input
    //       type="text"
    //       value={address}
    //       onChange={(event) => setAddress(event.target.value)}
    //     />
    //   </label>
    //   <label>
    //     Número de teléfono:
    //     <input
    //       type="text"
    //       value={phoneNumber}
    //       onChange={(event) => setPhoneNumber(event.target.value)}
    //     />
    //   </label>
    //   <div className={styles.buttoncontainer}>
    //     <button type="submit">Guardar</button>
    //     <button type="button" onClick={onCancel}>
    //       Cancelar
    //     </button>
    //   </div>
    // </form>
    //2
    // <div>
    //   {isEditing ? (
    //     <ProfileForm
    //       profileData={profileData}
    //       onSave={handleSave}
    //     />
    //   ) : (
    //     <div>
    //       <h2>{profileData.username}</h2>
    //       <p>{profileData.name} {profileData.lastName}</p>
    //       <p>{profileData.address}</p>
    //       <p>{profileData.phone}</p>
    //       <button onClick={() => setIsEditing(true)}>Editar perfil</button>
    //     </div>
    //   )}
    // </div>
    //3
    <div className={styles.profilecontainer}>
      <h2 className={styles.username}>usuario</h2>
      <div className={styles.profileinfo}>
        <p className={styles.name}>Nombre: Nombre</p>
        <p className={styles.lastname}>Apellido: Apellido</p>
        <p className={styles.address}>Dirección: Dirección</p>
        <p className={styles.phone}>Número de teléfono: Número de teléfono</p>
      </div>
    </div>
  );
}

export default ProfilePage;
