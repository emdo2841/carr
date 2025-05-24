// import React, { useState } from 'react';

// function Counter() {
//   const [count, setCount] = useState(0);

//   return (
//     <div style={{ textAlign: 'center', marginTop: '2rem' }}>
//           <h2>Count: {count}</h2>
//           <h3>{setCount}</h3>
//           <h3>{ count}</h3>
//       <button onClick={() => setCount(count - 1)} style={{ marginRight: '1rem' }}>
//         ➖ Decrement
//       </button>
//       <button onClick={() => setCount(count + 1)}>
//         ➕ Increment
//       </button>
//     </div>
//   );
// }

// export default Counter;

import react, { useState } from "react"

const Counter = () => {
    const[ count, setCount] = useState(0)



    return (
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <h2>Count: {count}</h2>
        <button
          onClick={() => setCount(count - 1)}
          style={{ marginRight: "1rem" }}
        >
          ➖ Decrement
        </button>
        <button
          onClick={() => setCount(count + 1)}
          style={{ marginRight: "1rem" }}
        >
          {" "}
          ➕ Increment{" "}
        </button>
      </div>
    );
}

export default Counter