import { fetchWithoutToken, fetchWithToken } from "../../helpers/fetch";


describe('Pruebas en Fetch', () => {

    // Inicializar la variable del token.
    let token = '';

    test('Deberia de realizar el fetch sin token', async () => {

        // 1. Crea las credenciales para autentificar
        const userCredentials = {
            email: "qbixmex@gmail.com",
            password: "password"
        };

        // 2. Realizar la petición asíncrona a la función fetchWithoutToken
        //    con los argumentos necesarios
        const response = await fetchWithoutToken("auth", userCredentials, "POST");

        // 3. Se espera que la respuesta sea una instancia de Response
        //    y que sea verdadera. (Nota: instanceof es propio de Javascript)
        expect( response instanceof Response ).toBe(true);

        // 4. Almacena la respuesta en json en una variable body
        const body = await response.json();

        // 5. Se espera que dentro del objeto body su propiedad ok sea verdadero
        //    Reviza con console.log(body) para ve que nos regresa el objeto body.
        expect( body.ok ).toBe( true );

        // 6. Almacenar el token del body a la variable inicializada al comienzo
        token = body.token;

    });

    test('Deberia de realizar el fetch con token', async () => {

        // 1. Almacenar el token en el localStorage
        localStorage.setItem('token', token);

        // 2. Realizar la petición asíncrona a la función fetchWithToken
        //    con los argumentos necesarios
        const response = await fetchWithToken("events", {}, "GET");

        // 3. Se espera que dentro del objeto body su propiedad ok sea verdadero
        //    Reviza con console.log(body) para ve que nos regresa el objeto body.
        const body = await response.json();

        // 4. Se espera que dentro del objeto body su propiedad ok sea verdadero
        //    Reviza con console.log(body) para ve que nos regresa el objeto body.
        expect(body.ok).toBe(true);

    });
    
})
