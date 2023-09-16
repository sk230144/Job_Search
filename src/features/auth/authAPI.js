// A mock function to mimic making an async request for data
export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/users', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: { 'content-type': 'application/json' }
    })
    const data = await response.json()
    resolve({ data })
  }
  );
}



// export function checkUser(loginInfo) {
//   return new Promise(async (resolve, reject) =>
//     {
//       try{
//         const response = await fetch('http://localhost:8080/users', {
//         method:'POST',
//         body: JSON.stringify(loginInfo),
//         headers:{'content-type':'application/json'}
//       });
//       if(response.ok){
//         const data = await response.json();
//         resolve({ data});
//       } else{
//         const error = await response.json();
//         reject(error);
//       }

//       } catch(error) {
//         reject(error);
//       }
//    });
// }


export function checkUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    const email = loginInfo.email;
    const password = loginInfo.password;
    const response = await fetch('http://localhost:8080/users?email=' + email)
    const data = await response.json()
    if (data.length) {
      if (password === data[0].password) {
        resolve({ data: data[0] })
      }
      else {
        reject({ message: "wrong credentials" })
      }
    } else {
      reject({ message: 'user not found' })
    }
  });
}

export function updateUser(update) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/users/'+update.id, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: { 'content-type': 'application/json' }
    })
    const data = await response.json()
    resolve({ data })
  }
  );
}


export function signOut(userId) {
  return new Promise(async (resolve) => {

    resolve({ data: 'success' })
  });
}



