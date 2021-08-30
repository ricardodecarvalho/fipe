const Fipe = ({
  isFetching,
  error,
  handleTipos,
  marcas,
  handleMarcas,
  modelos,
  handleModelos,
  anos,
  handleAnos,
  result
}) => {
  return (
    <>

      <div className='row'>
        <div className='col-md-12'>
          <select name='tipo' className='form-select form-select-lg mb-3' onChange={handleTipos}>
            <option value=''>Selecione o tipo de veículo</option>
            <option value='carros'>Carros e utilitários pequenos</option>
            <option value='motos'>Motos</option>
            <option value='caminhoes'>Caminhões e micro-ônibus</option>
          </select>
        </div>
      </div>

      {marcas.length > 0 && (
        <div className='row'>
          <div className='col-md-12'>
            <select name='marca' className='form-select form-select-lg mb-3' onChange={handleMarcas}>
              <option value=''>Marcas</option>
              {marcas.map(({ nome, codigo }) => (
                <option key={codigo} value={codigo}>
                  {nome}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {modelos.length > 0 && (
        <div className='row'>
          <div className='col-md-12'>
            <select name='modelo' className='form-select form-select-lg mb-3' onChange={handleModelos}>
              <option value=''>Modelos</option>
              {modelos.map(({ nome, codigo }) => (
                <option key={codigo} value={codigo}>
                  {nome}
                </option>
              ))}
            </select>
          </div>
        </div>)}

      {anos.length > 0 && (
        <div className='row'>
          <div className='col-md-12'>
            <select name='ano' className='form-select form-select-lg mb-3' onChange={handleAnos}>
              <option value=''>Anos</option>
              {anos.map(({ nome, codigo }) => (
                <option key={codigo} value={codigo}>
                  {nome}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {!isFetching && Object.keys(result).length > 0 && (
        <div className='row'>
          <div className='col-md-12'>
            {Object.keys(result).map((value, index) => (
              <p key={index} className='card-text lead'>{value}: <strong>{result[value]}</strong></p>
            ))}
          </div>
        </div>
      )}

      {isFetching && (
        <div className='row'>
          <div className='col-md-12'>
            <p className='placeholder-glow'>
              <span className='placeholder col-12 placeholder-lg' />
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className='row'>
          <div className='col-md-12'>
            <div className='alert alert-danger' role='alert'>
              {error}
            </div>
          </div>
        </div>
      )}

    </>
  )
}

export default Fipe
