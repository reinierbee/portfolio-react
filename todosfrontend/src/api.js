const APIURL = '/api/todos';


export async function getTodos(){
  return fetch(APIURL)
    .then(resp => {
      if(!resp.ok){
        if(resp.status >= 400 && resp.status < 500){
          return resp.json().then(data => {
              let err = {errMessage: data.message};
              throw err;
          })
        } else {
          let err = {errorMessage: 'Try again later, could not connect'};
          throw err;
        }
      }
      return resp.json();
    });
}

export async function createTodo(name){
    return fetch(APIURL,{
      method : 'POST',
      headers : new Headers({'Content-Type': 'application/json'}),
      body : JSON.stringify({name: name})
    })
    .then(resp => {
      if(!resp.ok){
        if(resp.status >= 400 && resp.status < 500){
          return resp.json().then(data => {
              let err = {errMessage: data.message};
              throw err;
          })
        } else {
          let err = {errorMessage: 'Try again later, could not connect'};
          throw err;
        }
      }
      return resp.json();
    });
}

export async function removeTodo(id){
  const deleteURL = `${APIURL}/${id}`

  return fetch(deleteURL,{
    method : 'DELETE'
  })
  .then(resp => {
    if(!resp.ok){
      if(resp.status >= 400 && resp.status < 500){
        return resp.json().then(data => {
            let err = {errMessage: data.message};
            throw err;
        })
      } else {
        let err = {errorMessage: 'Try again later, could not connect'};
        throw err;
      }
    }
    return resp.json();
  });
}

export async function updateTodo(todo){
  const updateURL = `${APIURL}/${todo._id}`;

  return fetch(updateURL,{
    method : 'PUT',
    headers : new Headers({'Content-Type': 'application/json'}),
    body : JSON.stringify({completed: !todo.completed})
  })
  .then(resp => {
    if(!resp.ok){
      if(resp.status >= 400 && resp.status < 500){
        return resp.json().then(data => {
            let err = {errMessage: data.message};
            throw err;
        })
      } else {
        let err = {errorMessage: 'Try again later, could not connect'};
        throw err;
      }
    }
    return resp.json();
  });
}
