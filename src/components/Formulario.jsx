import React from 'react'
import { firebase } from '../firebase'


const Formulario = () => {
    const [nombres, setNombres] = React.useState('')
    const [apellidos, setApellidos] = React.useState('')
    const [celular, setCelular] = React.useState('')
    const [direccion, setDireccion] = React.useState('')
    const [correo, setCorreo] = React.useState('')
    const [pais, setPais] = React.useState('')
    const [edad, setEdad] = React.useState('')
    const [lista, setLista] = React.useState([])
    const [id, setId] = React.useState('')
    const [edicion, setEdicion] = React.useState(false)
    const [error, setError] = React.useState(null)
    const [cantN, setCantN] = React.useState(0)
    const [numN, setNumN] = React.useState(0)
    const [valEdad, setValEdad] = React.useState(0)

    React.useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const db = firebase.firestore()
                const data = await db.collection('datos').get()
                const arrayData = data.docs.map(item => (
                    {
                        id: item.id, ...item.data()
                    }
                ))

                setLista(arrayData)

            } catch (error) {
                console.log(error)
            }
        }

        obtenerDatos();
    })


    const guardar = async (e) => {
        e.preventDefault()

        if (!nombres.trim()) {
            setError('Ingrese todos los datos')
            return
        }

        if (!apellidos.trim()) {
            setError('Ingrese todos los datos')
            return
        }

        if (!celular.trim()) {
            setError('Ingrese todos los datos')
            return
        }

        if (!direccion.trim()) {
            setError('Ingrese todos los datos')
            return
        }

        if (!correo.trim()) {
            setError('Ingrese todos los datos')
            return
        }

        if (!pais.trim()) {
            setError('Ingrese todos los datos')
            return
        }

        if (!edad.trim()) {
            setError('Ingrese todos los datos')
            return
        }
        
        if (celular.length != 10) {
            setCantN('El numero de celular debe tener 10 digitos')
        }

        if (celular < 0) {
            setNumN('No se aceptan numeros negativos')
        }


        if (edad < 0 || edad > 110) {
            setValEdad('Edad invalida')
        }

        try {
            const db = firebase.firestore()
            const newData = {
                name: nombres,
                lastName: apellidos,
                cel: celular,
                direction: direccion,
                email: correo,
                country: pais,
                age: edad
            }

            await db.collection('datos').add(newData)

            setLista([
                ...lista,
                {
                    name: nombres, lastName: apellidos, cel: celular, direction: direccion,
                    email: correo, country: pais, age: edad
                }
            ])

            e.target.reset()
            setNombres('')
            setApellidos('')
            setCelular('')
            setDireccion('')
            setCorreo('')
            setPais('')
            setEdad('')
            setError(null)
        } catch (error) {
            console.log(error)
        }

    }

    const editar = item => {
        setNombres(item.name)
        setApellidos(item.lastName)
        setCelular(item.cel)
        setDireccion(item.direction)
        setCorreo(item.email)
        setPais(item.country)
        setEdad(item.age)
        setEdicion(true)
        setId(item.id)
    }

    const editarDatos = async e => {
        e.preventDefault()

        if (!nombres.trim()) {
            setError('Ingrese todos los datos')
            return
        }

        if (!apellidos.trim()) {
            setError('Ingrese todos los datos')
            return
        }

        if (!celular.trim()) {
            setError('Ingrese todos los datos')
            return
        }

        if (!direccion.trim()) {
            setError('Ingrese todos los datos')
            return
        }

        if (!correo.trim()) {
            setError('Ingrese todos los datos')
            return
        }

        if (!pais.trim()) {
            setError('Ingrese todos los datos')
            return
        }

        if (!edad.trim()) {
            setError('Ingrese todos los datos')
            return
        }

        if (celular.length != 10) {
            setCantN('El numero de celular debe tener 10 digitos')
        }

        if (celular < 0) {
            setNumN('No se aceptan numeros negativos')
        }


        if (edad < 0 || edad > 110) {
            setValEdad('Edad invalida')
        }

        try {
            const db = firebase.firestore()
            await db.collection('datos').doc(id).update({
                name: nombres,
                lastName: apellidos,
                cel: celular,
                direction: direccion,
                email: correo,
                country: pais,
                age: edad
            })

            const arrayEditado = lista.map(
                item => item.id === id ? {
                    id: id, name: nombres, lastName: apellidos, cel: celular, direction: direccion,
                    email: correo, country: pais, age: edad
                } : item
            )

            setLista(arrayEditado)
            setNombres('')
            setApellidos('')
            setId('')
            setCelular('')
            setDireccion('')
            setCorreo('')
            setPais('')
            setEdad('')
            setEdicion(false)
            setError(null)

        } catch (error) {
            console.log(error)
        }


    }

    const eliminar = async id => {
        try {
            const db = firebase.firestore()
            await db.collection('datos').doc(id).delete()
            const aux = lista.filter(item => item.id !== id)
            setLista(aux)
        } catch (error) {
            console.log(error)
        }


    }

    const cancelar = () => {
        setEdicion(false)
        setId('')
        setNombres('')
        setApellidos('')
        setCelular('')
        setCorreo('')
        setPais('')
        setEdad('')
        setDireccion('')
        setError(null)
    }

    return (
        <div className='container mt-5'>
            <div className='row'>
                    <div class="card-center">
                        <h3 className="card-header bg-primary text-center text-white">{edicion ? 'Editar' : 'Agregar'}</h3>
                        <div class="card-body">
                            <form onSubmit={edicion ? editar : guardar}>
                                <div className="row">
                                    <div className="col-4">
                                        <label>Nombres:</label>
                                        <input
                                            className='form-control mb-2'
                                            type="text"
                                            placeholder='Ingrese los nombres'
                                            onChange={(e) => setNombres(e.target.value)}
                                            value={nombres}
                                        />
                                    </div>
                                    <div className="col-4">
                                    <label>Apellidos:</label>
                                        <input
                                        className='form-control mb-2'
                                        placeholder='Ingrese los apellidos'
                                        type="text"
                                        onChange={(e) => setApellidos(e.target.value)}
                                        value={apellidos}
                                    /></div>
                                    <div className="col-4">
                                    <label>Celular:</label>
                                        <input pattern='"^[0-9]+"'
                                        className='form-control mb-2'
                                        placeholder='Ingrese el numero de celular'
                                        type="number"
                                        onChange={(e) => setCelular(e.target.value)}
                                        value={celular}
                                        />{
                                        cantN ? <span className='text-danger'>{cantN}</span> : null
                                    }
                                    <br/>{
                                        numN ? <span className='text-danger'>{numN}</span> : null
                                    }</div>
                                </div>

                                <div className="row">
                                    <div className="col-4">
                                    <label>Dirección:</label>
                                        <input
                                            className='form-control mb-2'
                                            placeholder='Ingrese la direccion'
                                            type="text"
                                            onChange={(e) => setDireccion(e.target.value)}
                                            value={direccion}
                                        />
                                    </div>
                                    <div className="col-4">
                                    <label>Correo:</label>
                                        <input
                                            className='form-control mb-2'
                                            placeholder='Ingrese el Email'
                                            type="text"
                                            onChange={(e) => setCorreo(e.target.value)}
                                            value={correo}
                                        />
                                    </div>
                                    <div className="col-4">
                                    <label>Pais:</label>
                                        <input
                                            className='form-control mb-2'
                                            placeholder='Ingrese el pais'
                                            type="text"
                                            onChange={(e) => setPais(e.target.value)}
                                            value={pais}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                    <label>Edad:</label>
                                        <input
                                            className='form-control mb-2'
                                            placeholder='Ingrese la edad'
                                            type="number"
                                            onChange={(e) => setEdad(e.target.value)}
                                            value={edad}
                                        />{
                                            valEdad ? <span className='text-danger'>{valEdad}</span> : null
                                        }
                                    </div>
                                </div>
                                {
                                    error ? <span className='text-danger'>{error}</span> : null
                                }
                                <br />
                                {
                                    edicion ?
                                        (
                                            <>
                                                <button
                                                    className='btn btn-warning btn-block'
                                                    type='submit'
                                                >Editar</button>
                                                <button
                                                    className='btn btn-dark btn-block mx-2'
                                                    onClick={() => cancelar()}
                                                >Cancelar</button>
                                            </>
                                        )
                                        :
                                        
                                        <button
                                            className='btn btn-primary btn-block'
                                            type='submit'
                                        >Agregar</button>

                                }
                            </form>
                        </div>
                    </div>

                    <h4 className='text-center'>PERSONAS</h4>
                    <ul className='list-group'>
                        {
                            lista.map(item => (
                                <li className='list-group-item' key={item.id}>
                                    <span className='lead'>
                                        <b>Nombres: </b>{item.name}
                                        <br /><b>Apellidos: </b>{item.lastName}
                                        <br /><b>Celular: </b> {item.cel}
                                        <br /><b>Direccion: </b> {item.direction}
                                        <br /><b>Correo: </b> {item.email}
                                        <br /><b>Pais: </b> {item.country}
                                        <br /><b>Edad: </b> {item.age}
                                    </span>
                                    <button className='btn btn-danger btn-sm float-end mx-2' onClick={() => eliminar(item.id)}>
                                        Eliminar
                                    </button>
                                    <button className='btn btn-warning btn-sm float-end' onClick={() => editar(item)}>
                                        Editar
                                    </button>
                                </li>
                            ))
                        }
                    </ul>
            </div>
        </div>
    )
}


export default Formulario
