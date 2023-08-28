const app = require('./app')
const sequelize = require('./config/db.config')

const PORT = process.env.PORT || 3000

async function bootstrap() {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => {
            console.log(`Server start on port ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }

}

bootstrap()