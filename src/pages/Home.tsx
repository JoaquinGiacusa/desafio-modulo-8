import React, { useState, useEffect, useContext, Suspense } from "react";
//import { MyContext } from "../index";

function Home() {
  const [data, setData] = useState(null);
  //const value = useContext(MyContext);
  //console.log(value);

  return (
    <div>
      <h3>Hace tu busqueda</h3>
    </div>
  );
}

export { Home };

// import React, { useState, useEffect } from "react";

// import { Link } from "react-router-dom";

// function App() {
//   return (
//     <div>
//       Home
//       <Link to="/">Link a pagina 2</Link>
//     </div>
//   );
// }

// export { App };
