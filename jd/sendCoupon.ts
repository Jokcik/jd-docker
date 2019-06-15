import {CustomRequest} from "../utils/request";
import jsonp from 'axios-jsonp-pro';
import {AnticaptchaClient} from "../anticaptcha/anticaptcha";
import {Utils} from "../utils/utils";

const anticaptcha = new AnticaptchaClient();
const utils = new Utils();

export class SendCoupon {
  constructor(private key: string,
              private start: number,
              private captchaStart: number,
              private accounts: string[]) {
  }

  public async run(useTor: boolean, countIterations: number) {
    const sendDate = new Date(this.start);
    const captchaDate = new Date(this.captchaStart);

    await utils.parallel(this.accounts.length, (async (start, end, part) => {
      await utils.sleep(+captchaDate - Date.now());
      let requests = [];
      let jsons = [];

      let count = countIterations;
      for (let i = 0; i < count; ++i) {
        let [ request, json ] = await getCaptcha(this.accounts[start], this.key, useTor).catch((e) => { console.log(e); count++; return []});
        if (request) {
          requests.push(request);
          jsons.push(json);
        }
      }

      console.log('start', start, requests.length);
      const startTime = +sendDate - Date.now();
      if (useTor) {
        await utils.sleep(startTime - utils.randomBetween(1800, 3000));
      } else {
        await utils.sleep(startTime - utils.randomBetween(300, 800));
      }
      console.log('end', start, requests.length);

      for (let i = 0; i < requests.length; ++i) {
        await sendKoupon(requests[i], jsons[i], this.key, this.accounts[start], useTor);
      }
    }), this.accounts.length);
  }
}

async function getCaptcha(cookie: string, key: string, useTor: boolean) {
  const request = new CustomRequest({ headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36' } }, useTor);
  request.cookie = cookie;

  const recaptcha = await jsonp.get(`https://async.joybuy.com/sendCoupon/captcha.html?callback=jQuery17208908459407835316_1559046132370&languageId=3&_=${Date.now()}`);
  const data = recaptcha.data;

  const match = data.match(/\({"code":"(.*)","src":"(.*)"}\)/);
  const uuid = match[1];
  const captchaSrc = match[2];

  const resultAnticaptcha = await anticaptcha.createTaskImage(captchaSrc);
  const code = resultAnticaptcha.solution.text;

  const json = {
    callback: "jQuery17208908459407835316_1559046132370",
    code: code,
    eid: "EREGJGEKAJYMUPJAYWJ2YGYCGSKFD4UNSB63CPYT45QRL3K3OD7CC45VA6IHEZFHVS5MCL5LKF4JN3Z5E7IWDAX2ZA",
    key: key,
    site: "RUSSIA",
    uuid: uuid,
    languageId: 3,
  };


  return [ request, json ];
}

async function sendKoupon(request: CustomRequest, json, key, cookie, useTor) {
  request.cookie = cookie;
  const sendDate = new Date().toISOString();
  const res = await request.get("https://async.joybuy.com/sendCoupon/submit.html?" +
    `callback=${json["callback"]}` +
    `&code=${json["code"]}` +
    `&eid=${json["eid"]}` +
    `&key=${json["key"]}` +
    `&site=${json["site"]}` +
    `&uuid=${json["uuid"]}` +
    `&languageId=${json["languageId"]}` +
    `&_=${Date.now()}`
  ).catch(error => error);

  const date = new Date().toISOString();
  await request.post(`https://delivery-club.store/api/jd`,  { key, data: (res.data || res.error), sendDate, date, cookie, tor: useTor  }, {}, "json", false);
  utils.appendSyncFile("jd/coupons.txt", `${key}; ${res.data}; ${date}; ${cookie}`);
}
