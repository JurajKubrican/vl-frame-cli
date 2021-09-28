import jimp from "jimp";
import minimist from 'minimist'
import fs from 'fs'

const main = async () => {

  const args = minimist(process.argv.slice(2));

  const path = args._[0]??''
  if(!fs.existsSync(path) ){
    console.log(`file not found "${path}"`)
    return 
  }
  
  const profile = await jimp.read(path);

  const profileSize = {
    height: profile.getHeight(),
    width: profile.getWidth(),
  };

  const logo = await jimp.read("vl-logo.png");
  logo.scaleToFit(profileSize.width/3,profileSize.height/3)
  const logoSize = {
    height: logo.getHeight(),
    width: logo.getWidth(),
  };

  const result = profile.composite(
    logo,
    profileSize.width - logoSize.width,
    profileSize.height - logoSize.height
  );

  await result.writeAsync("./result.png");
};

main();
