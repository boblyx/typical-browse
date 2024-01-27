/**
 * Laptop Test Suite
 * @author Bob Lee
 */

const fs = require('fs');

const TEST_FOLDER = 'C:/tmp/LaptopTestSuite'
const LOG_FOLDER = 'C:/tmp/LaptopTestSuite/Logs'

let browser_options = {
  headless: false
  ,executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
  ,defaultViewport:null
}
let browse_links = [
  "https://blog.whatsapp.com/"
  ,"https://duckduckgo.com/?va=h&t=hb&q=today%27s+top+news&iar=news&ia=news"
  ,"https://en.wikinews.org/wiki/Main_Page"
  ,"https://en.wikipedia.org/wiki/Main_Page"
  ,"https://github.com/"
  ,"https://huggingface.co/"
  ,"https://imgur.com/"
  ,"https://news.google.com/"
  ,"https://openai.com/blog"
  ,"https://sg.news.yahoo.com/"
  ,"https://shopee.sg/"
  ,"https://twitter.com/x"
  ,"https://weather.com/"
  ,"https://www.amazon.com/"
  ,"https://www.apple.com/"
  ,"https://www.bing.com/news/search?q=top"
  ,"https://www.hardwarezone.com.sg/home"
  ,"https://www.imdb.com/"
  ,"https://www.linkedin.com/"
  ,"https://www.pinterest.com/"
  ,"https://www.reddit.com/?feed=home"
  ,"https://www.singpass.gov.sg/main/"
  ,"https://www.tiktok.com/en/"
  ,"https://www.twitch.tv/"
  ,"https://www.youtube.com/shorts"
]

let video_link = "https://www.youtube.com/watch?v=QCL7VXuO35g";

const puppeteer = require('puppeteer');


function setTerminalTitle(title)
{
  process.stdout.write(
    String.fromCharCode(27) + "]0;" + title + String.fromCharCode(7)
  );
}

async function run_video(){
  let b_opt = browser_options
  let video_folder = TEST_FOLDER+"/video";
  makedirs(video_folder);
  b_opt["args"] = [`--user-data-dir=${video_folder}`, '--window-position=0,0', '--window-size=960,1080'];
  const browser = await puppeteer.launch(b_opt);
  const page = await browser.newPage();
  if(true){
    try{
    await page.goto(video_link, {timeout:0});
    const play = await page.$('.ytp-large-play-button');
      await play.click();
    }catch(err){
      console.log(err);
    }
    await new Promise(r=>{setTimeout(r, 30000)});
  }
}

async function run_browse(){
  let b_opt = browser_options
  let browse_folder = TEST_FOLDER + "/browse"
  makedirs(browse_folder)
  b_opt["args"] = [`--user-data-dir=${browse_folder}`, '--window-position=960,0', '--window-size=960,1080'];
  const browser = await puppeteer.launch(b_opt)
  const page = await browser.newPage();
  await page.goto(browse_links[0]);
  while(true){
  for (let i =0; i < browse_links.length; i++){
    let link = browse_links[i];
    try{
      await page.goto(link, {timeout: 0});
    }catch(err){
      console.log(err);
    }
    await new Promise(r=>{setTimeout(r, 10000)});
  }
    await new Promise(r=>{setTimeout(r, 10000)});
  }
}

const DURATION = 1000;

function logTime(callback){
  function tick(){
    var now = Date.now();
    callback(now);
    setTimeout(tick, DURATION - (now % DURATION));
  }
  tick();
}

function makedirs(folder){
  try{
    fs.mkdirSync(folder);
  }catch(err){

  };
}
setTerminalTitle("Typical Browsing Test Suite.")
console.log("Running Typical Browsing Test Suite!");
makedirs(LOG_FOLDER);
makedirs('C:/tmp');
makedirs(TEST_FOLDER);

console.log("Starting video browser!");
run_video();
console.log("Starting surfing browser!");
run_browse();
console.log(`Check Duration at ${LOG_FOLDER}`);
console.log("Press CTRL+C to stop the test!");
let start_time = Date.now();
let written = false;
let log_file = LOG_FOLDER+`/Log-${String(Date.now())}.txt`;
logTime( (ms) => {
  let out_text = 'Time Elapsed: ' + String(((ms - start_time)/3600000).toFixed(7)) + ' hours' 
  console.log(out_text);
  if(written == false){
    fs.writeFileSync(log_file, out_text+"\n");
    written = true;
  }else{
    fs.appendFileSync(log_file, out_text+"\n");
  }
});

