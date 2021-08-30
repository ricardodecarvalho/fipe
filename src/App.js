import { useState } from 'react'

import Fipe from './Fipe'
import './App.css'

/*
todo:
- change title e meta tags
- dark mode
*/

const initialState = {
  isFetching: false,
  error: '',
  tipo: '',
  marcas: [],
  marca: '',
  modelos: [],
  modelo: '',
  anos: [],
  result: {}
}

const apiUrl = 'https://parallelum.com.br/fipe/api/v1'

const fetchData = async ({ endpoint }) => {
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
    { isFetching, error, tipo, marcas, marca, modelos, modelo, anos, result },
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

  const getResult = (value) => {
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
      error: '',
      marcas: [],
      marca: '',
      modelos: [],
      modelo: '',
      anos: [],
      result: {}
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
        result: {}
      }))
      return false
    }

    setState((state) => ({
      ...state,
      [name]: value,
      isFetching: true,
      error: '',
      modelos: [],
      modelo: '',
      anos: [],
      result: {}
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
        result: {}
      }))
      return false
    }

    setState((state) => ({
      ...state,
      [name]: value,
      isFetching: true,
      error: '',
      anos: [],
      result: {}
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
        result: {}
      }))
      return false
    }

    setState((state) => ({
      ...state,
      isFetching: true,
      error: ''
    }))

    getResult(value)
      .then((response) => {
        setState((state) => ({
          ...state,
          isFetching: false,
          result: response
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
    <div className='container-full mt-3'>
      <div className='row'>
        <div className='col-md-6 col-xs-12 mx-auto'>
          <div className='card'>
            <h5 className='card-header'>Tabela Fipe</h5>
            <div className='card-body'>
              <h5 className='card-title'>Preço médio de veículos</h5>
              <p className='card-text'>
                Formulário simples para consulta de preço médio de veículos.
              </p>
              <p className='card-text'>
                Este não é um canal oficial de indice e indicadores, também não
                temos nenhuma relação com{' '}
                <a
                  target='_blank'
                  rel='noreferrer'
                  href='https://veiculos.fipe.org.br/'
                >
                  https://veiculos.fipe.org.br/
                </a>
                .
              </p>
              <p className='card-text'>
                Utilizamos a api{' '}
                <a
                  target='_blank'
                  rel='noreferrer'
                  href='https://parallelum.com.br/fipe/'
                >
                  https://parallelum.com.br/fipe/
                </a>
              </p>
              <Fipe
                isFetching={isFetching}
                error={error}
                handleTipos={handleTipos}
                marcas={marcas}
                handleMarcas={handleMarcas}
                modelos={modelos}
                handleModelos={handleModelos}
                anos={anos}
                handleAnos={handleAnos}
                result={result}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
