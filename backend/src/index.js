import dotenv from 'dotenv'
dotenv.config({
  path: '../.env',
})
import connectDB from './db/index.js'
import app from './app.js'

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8080, () => {
      console.log(
        `connection successfull!! server is running at port ${process.env.PORT}`
      )
    })
  })
  .catch((error) => {
    console.log('server error', error)
  })
