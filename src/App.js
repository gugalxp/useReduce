import React, { useEffect, useReducer } from 'react';

const initialState = { loading: true, data: null, error: null };

function reducer(state, action) {
  switch (action.type) {
    case 'fetchData':
      return { ...state, loading: true };
    case 'fetchDataSuccess':
      return { ...state, loading: false, data: action.payload, error: null };
    case 'fetchDataError':
      return { ...state, loading: false, data: null, error: action.payload };
    default:
      throw new Error();
  }
}

function fetchData() {
  return new Promise((resolve, reject) => {
    // Lógica assíncrona simulada (por exemplo, uma chamada a uma API)
    setTimeout(() => {
      const randomData = Math.random();
      if (randomData > 0.5) {
        resolve(randomData);
      } else {
        reject(new Error('Erro ao buscar os dados.'));
      }
    }, 1000);
  });
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: 'fetchData' });

    fetchData()
      .then((data) => {
        console.log(data);
        dispatch({ type: 'fetchDataSuccess', payload: data });
      })
      .catch((error) => {
        dispatch({ type: 'fetchDataError', payload: error });
      });
  }, []);

  if (state.loading) {
    return <div>Carregando...</div>;
  }

  if (state.error) {
    return <div>Erro: {state.error.message}</div>;
  }

  return <div>Dados: {state.data}</div>;
}

export default App;
