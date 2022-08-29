const { HTTP_PORT: PORT } = process.env

export class Server {
    app: any
    constructor(app: any) {
        this.app = app
    }

    start() {
        this._serverListen(this.app)
    }

    _serverListen(app: any) {
        app.listen(
            PORT,
            console.log(`Server started at ${PORT}`)
        )
    }
}
