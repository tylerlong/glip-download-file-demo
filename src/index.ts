import RingCentral from '@rc-ex/core';
import * as fs from 'fs';

const rc = new RingCentral({
  clientId: process.env.RINGCENTRAL_CLIENT_ID,
  clientSecret: process.env.RINGCENTRAL_CLIENT_SECRET,
  server: process.env.RINGCENTRAL_SERVER_URL,
});

const main = async () => {
  await rc.authorize({
    username: process.env.RINGCENTRAL_USERNAME!,
    extension: process.env.RINGCENTRAL_EXTENSION,
    password: process.env.RINGCENTRAL_PASSWORD!,
  });

  // download the file
  const r2 = await rc.get<Buffer>(
    // 'https://dl.mvp.ringcentral.com/file/1621786746890',
    'https://dl.mvp.ringcentral.com/file/1605543747594',
    undefined,
    {responseType: 'arraybuffer'}
  );
  console.log(r2.data.length);
  fs.writeFileSync('temp.png', r2.data);
  await rc.revoke();
};

main();
