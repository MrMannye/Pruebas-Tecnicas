// Ejercicio: 1.1.1 - Callbacks
import net from 'node:net'
import fs from 'node:fs'

// Para resolver el ejercicio, necesitamos usar
// un callback para devolver el resultado de la funcion ya que al momento de hacer la ejecucion
// se recibe como parametro un callback
export const ping = (ip, callback) => {
    const startTime = process.hrtime()

    const client = net.connect({ port: 80, host: ip }, () => {
        client.end()
        callback(null, { time: process.hrtime(startTime), ip });
    })

    client.on('error', (err) => {
        // Pasar null o no pasar nada es lo mismo
        // ya que por defecto se enviara undefined
        callback(err, null);
    })
}

ping('manu.dev', (err, info) => {
    if (err) console.error(err)
    console.log(info)
})


// Ejericio 1.1.2 - Promises
export function obtenerDatosPromise(callback) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                resolve({ data: 'datos importantes' });
            } catch (error) {
                reject(error);
            }
        }, 2000);
    });
}

// Ejercicio 1.1.3 - Promises
// Los return no son validos ya que estan dentro de un callback 
// por lo que se debe usar el resolve o callback para devolver el resultado de la funcion procesarArchivo
// El SetTimeout no es necesario ya que no se esta esperando ningun tiempo para devolver el resultado
export function procesarArchivo(callback) {
    fs.readFile('input.txt', 'utf8', (error, contenido) => {
        if (error) {
            console.error('Error leyendo archivo:', error.message);
            callback(error);
        }
        const textoProcesado = contenido.toUpperCase();

        fs.writeFile('output.txt', textoProcesado, error => {
            if (error) {
                console.error('Error guardando archivo:', error.message);
                callback(error);
            }
            console.log('Archivo procesado y guardado con éxito');
            callback(null);
        });
    });
}
// Con Async/Await
export async function procesarArchivo2() {
    try {
        const contenido = await fs.promises.readFile('input.txt', 'utf8');
        const textoProcesado = contenido.toUpperCase();
        await fs.promises.writeFile('output.txt', textoProcesado);
        console.log('Archivo procesado y guardado con éxito');
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Ejercicio 1.1.4 - Lecutra de archivos
// JavaScript es monohilo. al momento de usar el await se puede seguir ejecutando el codigo
// mientras se espera la respuesta de la promesa o del await
export async function leerArchivos() {
    const archivo1 = await fs.promises.readFile('archivo1.txt', 'utf8');
    const archivo2 = await fs.promises.readFile('archivo2.txt', 'utf8');
    const archivo3 = await fs.promises.readFile('archivo3.txt', 'utf8');

    const message = [archivo1, archivo2, archivo3].filter(value => value !== undefined).join(' ');
    console.log(message);
}

leerArchivos();