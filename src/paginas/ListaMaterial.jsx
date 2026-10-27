
import { useApi } from '/src/api.js';
import './ListaMaterial.css';

function ListaMaterial() {
  const {
    datos: materiales,
    cargando,
    error,
  } = useApi('/api/materiales');

  return (
    <div className="contenido-pagina">
      <h2>Lista de Materiales de Estudio</h2>

      {cargando && (
        <p className="sinMaterial">
          Cargando materiales desde la base de datos...
        </p>
      )}

      {error && (
        <p className="sinMaterial" style={{ color: 'red' }}>
          Error: {error}
        </p>
      )}

      {!cargando &&
        !error &&
        (!materiales || materiales.length === 0) && (
          <p className="sinMaterial">
            Aún no hay materiales subidos.
          </p>
        )}

      {!cargando && !error && materiales?.length > 0 && (
        <div className="gridMateriales">
          {materiales.map((material) => {
            const archivo = material.imagen || material.archivo;

            const esImagen =
              archivo &&
              /\.(jpg|jpeg|png|gif|webp|svg|bmp)(\?.*)?$/i.test(archivo);

            return (
              <div key={material.id} className="tarjeta">
                <span className="etiquetaNivel">
                  {material.categoria}
                </span>

                <h3>{material.nombre}</h3>

                {archivo ? (
                  <div className="contenidoArchivo">
                    {esImagen && (
                      <a
                        href={archivo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={archivo}
                          alt={material.nombre}
                          className="imagenMaterial"
                        />
                      </a>
                    )}

                    <a
                      href={archivo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="enlaceArchivo"
                    >
                      {esImagen
                        ? 'Ver imagen completa'
                        : 'Abrir material'}
                    </a>
                  </div>
                ) : (
                  <p className="sinMaterial">
                    No hay ningún archivo disponible.
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ListaMaterial;