require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { urlencoded } = require('body-parser');
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
// Basic Configuration
const port = process.env.PORT || 3000;
app.use(cors());
app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});
let shortUrl=[]
let originalurls=[]
// Your first API endpoint
app.post('/api/shorturl', (req, res) =>{
  let url=req.body.url
  let n=originalurls.indexOf(url)
  if(!url.includes("https://") && !url.includes("http://")){
    return res.json({error:"invalid URL"})
  }
  if(n<0){
    originalurls.push(url)
    shortUrl.push(originalurls.length)
    return res.json({original_url:url,
      short_url:shortUrl.length-1
    })
  }
});
app.get('/api/shorturl/:shortUrl',(req,res)=>{
  let shortUrls=parseInt(req.params.shortUrl)
  let n=shortUrl.indexOf(shortUrls)
  if(n<0)
  {return   res.json({error:"aucune original url"})}
  res.redirect(originalurls[n])
})
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
