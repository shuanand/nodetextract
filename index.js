const textract = require('textract');
const express = require('express')
const app = express()
const port = process.env.PORT||3000;

app.get('/', (req, res) => {

const pattern = /(?:(?:.*[.!?\|])|^)(.*?vegan.*?[.!?\|])/ig


   textract.fromUrl('https://www.wired.com/story/police-say-youtube-policies-motivated-shooter/', { preserveLineBreaks: true }, ( err, page ) => {
        if (err) {
          console.log(err)
          return
        }
      
        // check for index of word vegan in \n split string
        // if there is vegan in there, do regex, otherwise use whole string
        const context = page
          .split('\n')
          .filter(text => text.indexOf('vegan') > -1)
          .map(text => {
            const match = pattern.exec(text)
      
           return match ? match[1].trim() : text.trim()
          })
          res.status(200).json({ veganoccurance: context});
        return(console.log(context, context.length, '\n\n'))
      })
   

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })