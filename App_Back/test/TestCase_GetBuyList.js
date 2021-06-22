import AxiosClient from '../src/shared/client/AxiosClient.js'
import ExpressServer from '../src/shared/server/ExpressServer.js'

async function main(){
    let server = await new ExpressServer().crearServidor(8000)
    let client = await new AxiosClient(`http://localhost:${server.port}/api`)

    
    const { data } = await client.getBuyList(1, 0)

    console.log(data)

    server.close()
}

main()

