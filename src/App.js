import { useState } from 'react'
import './App.css'

const initialState = {
  isFetching: false,
  error: '',
  tipo: '',
  marcas: [],
  marca: '',
  modelos: [],
  modelo: '',
  anos: [],
  valor: {}
}

const fetchData = async ({ endpoint }) => {
  const apiUrl = 'https://parallelum.com.br/fipe/api/v1'
  const response = await fetch(`${apiUrl}/${endpoint}`, {
    'Content-Type': 'application/json'
  })

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`
    throw new Error(message)
  }

  const json = await response.json()
  return json
}

function App () {
  const [
    { isFetching, error, tipo, marcas, marca, modelos, modelo, anos, valor },
    setState
  ] = useState(initialState)

  const getMarcas = (value) => {
    return fetchData({
      endpoint: `${value}/marcas`
    })
  }

  const getModelos = (value) => {
    return fetchData({
      endpoint: `${tipo}/marcas/${value}/modelos`
    })
  }

  const getAnos = (value) => {
    return fetchData({
      endpoint: `${tipo}/marcas/${marca}/modelos/${value}/anos`
    })
  }

  const getValor = (value) => {
    return fetchData({
      endpoint: `${tipo}/marcas/${marca}/modelos/${modelo}/anos/${value}`
    })
  }

  const handleTipos = (e) => {
    const { name, value } = e.target

    if (value === '') {
      setState(initialState)
      return false
    }

    setState((state) => ({
      ...state,
      [name]: value,
      isFetching: true,
      error: ''
    }))

    getMarcas(value)
      .then((response) => {
        setState((state) => ({
          ...state,
          isFetching: false,
          marcas: response
        }))
      })
      .catch((error) => {
        setState((state) => ({
          ...state,
          isFetching: false,
          error: error.message
        }))
      })
  }

  const handleMarcas = (e) => {
    const { name, value } = e.target

    if (value === '') {
      setState((state) => ({
        ...state,
        isFetching: false,
        error: '',
        marcas: [],
        marca: '',
        modelos: [],
        modelo: '',
        anos: [],
        valor: {}
      }))
      return false
    }

    setState((state) => ({
      ...state,
      [name]: value,
      isFetching: true,
      error: ''
    }))

    getModelos(value)
      .then((response) => {
        setState((state) => ({
          ...state,
          isFetching: false,
          modelos: response.modelos
        }))
      })
      .catch((error) => {
        setState((state) => ({
          ...state,
          isFetching: false,
          error: error.message
        }))
      })
  }

  const handleModelos = (e) => {
    const { name, value } = e.target

    if (value === '') {
      setState((state) => ({
        ...state,
        isFetching: false,
        error: '',
        modelos: [],
        modelo: '',
        anos: [],
        valor: {}
      }))
      return false
    }

    setState((state) => ({
      ...state,
      [name]: value,
      isFetching: true,
      error: ''
    }))

    getAnos(value)
      .then((response) => {
        setState((state) => ({
          ...state,
          isFetching: false,
          anos: response
        }))
      })
      .catch((error) => {
        setState((state) => ({
          ...state,
          isFetching: false,
          error: error.message
        }))
      })
  }

  const handleAnos = (e) => {
    const { value } = e.target

    if (value === '') {
      setState((state) => ({
        ...state,
        isFetching: false,
        error: '',
        anos: [],
        valor: {}
      }))
      return false
    }

    setState((state) => ({
      ...state,
      isFetching: true,
      error: ''
    }))

    getValor(value)
      .then((response) => {
        setState((state) => ({
          ...state,
          isFetching: false,
          valor: response
        }))
      })
      .catch((error) => {
        setState((state) => ({
          ...state,
          isFetching: false,
          error: error.message
        }))
      })
  }

  return (
    <div className='App'>
      <header className='App-header'>
        {isFetching && <p>Loading...</p>}

        {error && <p>{error}</p>}

        <select name='tipo' onChange={handleTipos}>
          <option value=''>Selecione</option>
          <option value='carros'>Carros</option>
          <option value='motos'>Motos</option>
          <option value='caminhoes'>Caminhões</option>
        </select>

        {marcas.length > 0 && (
          <select name='marca' onChange={handleMarcas}>
            <option value=''>Marcas</option>
            {marcas.map(({ nome, codigo }) => (
              <option key={codigo} value={codigo}>
                {nome}
              </option>
            ))}
          </select>
        )}

        {modelos.length > 0 && (
          <select name='modelo' onChange={handleModelos}>
            <option value=''>Modelos</option>
            {modelos.map(({ nome, codigo }) => (
              <option key={codigo} value={codigo}>
                {nome}
              </option>
            ))}
          </select>
        )}

        {anos.length > 0 && (
          <select name='ano' onChange={handleAnos}>
            <option value=''>Anos</option>
            {anos.map(({ nome, codigo }) => (
              <option key={codigo} value={codigo}>
                {nome}
              </option>
            ))}
          </select>
        )}

        {Object.keys(valor).length > 0 && (
          <code>{JSON.stringify(valor, null, 4)}</code>
        )}
      </header>
    </div>
  )
}

export default App
