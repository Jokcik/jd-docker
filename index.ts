import {CustomRequest} from "./utils/request";
import {SendCoupon} from "./jd/sendCoupon";
import {Utils} from "./utils/utils";

const resultData = {
  key: "155861718209077c",
  start: 1560000567787,
  captchaStart: 1560000567787,
  accounts: [
    '_gcl_au=1.1.1128261840.1558856697; _ga=GA1.2.879515545.1558856697; eptCur=%7B%22currency%22%3A%22RUB%22%7D; locale=ru; _ym_uid=1558856697579677624; _ym_d=1558856697; open_id=xE32B5u2buapAT9%2FhQOXn1suVr1HocrsrJgxgrZWzYI%3D; __jdc=198920361; 3AB9D23F7A4B3C9B=EREGJGEKAJYMUPJAYWJ2YGYCGSKFD4UNSB63CPYT45QRL3K3OD7CC45VA6IHEZFHVS5MCL5LKF4JN3Z5E7IWDAX2ZA; _fbp=fb.1.1558943040563.110291458; cto_lwid=60fed552-8275-4602-a78b-f9959e442fff; TrackID=1YeqArbuGXzh6MTtWIutEJ_dUK4rc5XaAvZy8BUIpEe8k5vBTgI7GRBPecrom2CVZ3Q4qcp-XbGSPU_rd3p0kxL931jXR_4RwvjRrQIignQE; eptCountry=%7B%22id%22%3A2285%7D; __cps=eyJzaXRlIjoicnUiLCJ1aWQiOiJBRDEyMiIsInNvdXJjZSI6Imh0dHA6Ly9jcHMuamQucnUvdW5pb24vY2xpY2s%2FdXRtX3NvdXJjZT1hZG1pdGFkX3J1JnV0bV9tZWRpdW09YWZmaWxpYXRlJnV0bV9jYW1wYWlnbj0xMTIzMiZhZG1pdGFkX3VpZD0yOTEyNjhlZjY0MGIxYmI0Mjk1YzUwMGY4YTNkOTBkOCZwPWV5SnNhVzVySWpvaWFIUjBjSE02THk5M2QzY3VhbVF1Y25VdmMyRnNaUzl3WXk4MExWbGxZWEl0UVc1dWFYWmxjbk5oY25rdFUyRnNaVjlxWTBaVE1ETndkekZ5TlZkUUxtaDBiV3dpTENKMGVYQmxJam9pTVNJc0luVnBaQ0k2SWtGRU1USXlJaXdpYzJsMFpTSTZJbkoxSWl3aWRYUnRYM052ZFhKalpTSTZJbUZrYldsMFlXUmZjblVpTENKMWRHMWZiV1ZrYVhWdElqb2lZV1ptYVd4cFlYUmxJbjAlM0QiLCJhZG1pdGFkX3VpZCI6IjI5MTI2OGVmNjQwYjFiYjQyOTVjNTAwZjhhM2Q5MGQ4IiwidHlwZSI6IjEifQ%3D%3D; __jdv=198920361%7CAD122%7C11232%7Caffiliate%7Cnot%20set%7C1559998231484; __jda=198920361.15588566969831267637829.1558856697.1559403677.1560069010.8; _gid=GA1.2.1334673219.1560523239; _ym_isad=1; AKA_A2=A; pin=ept_EjMOsxaQFJno; pinid=3918447; ept.ceshi5.com=9C43AEEFAC78008D8EDAC3C51546822DAF9B82FC5496AEE7CEB5A1DDD732177D2BE4E815AAAE19C460CFC52D00FE50D4B514CD450865A0C25DE04586C9DD1B67E4BE6836382824D8DDD8147B2EBA54F8580D2DCCDE677AF9FA2EB8D9B21F71803BA847ABB4E1109CD2B2F147ABD41373DDB96F1BD76650096DA7837A94A1400063AC6CCC64DD2F400FA447A2117C38380056086C6B4DAB01CD080CB6D2CD7C8293BF28D186F1A176E2A731F9A9DA47237D6BB2E55701817C30A91DFAA3751105C1B0F4E33CC1BA48F5F93EF2B53D2114; loggedIn=1; eptEmail=samarinmarc@malign.ru; crossLogin=1; ept_username=EjMOsxaQFJno; __jda=198920361.15588566969831267637829.1558856697.1559403677.1560069010.8; __jdc=198920361; __jdb=198920361.7.15588566969831267637829|8.1560069010; RT="sl=6&ss=1560578052654&tt=16529&obo=0&sh=1560578987665%3D6%3A0%3A16529%2C1560578805437%3D5%3A0%3A13610%2C1560578754624%3D4%3A0%3A11556%2C1560578730974%3D3%3A0%3A8184%2C1560578527589%3D2%3A0%3A5260&dm=jd.ru&si=7587fa98-5515-4b44-aeab-f34d770f3613&bcn=%2F%2F0211c83c.akstat.io%2F"'
  ],
};

(async () => {
  const request = new CustomRequest({}, false);
  const result = await request.get("https://delivery-club.store/api/jd");
  const data = result.data.response;
  // const data = resultData;
  data.start = new Date(data.start);
  data.captchaStart = new Date(data.captchaStart);

  const accounts = data.accounts;
  data.accounts = [];
  for (let i = 0; i < 30; ++i) {
    data.accounts.push(getRandom(accounts));
  }


  const utils = new Utils();
  const sendCoupon = new SendCoupon(data.key, data.start, data.captchaStart, data.accounts);
  await sendCoupon.run(utils.getArg("useTor", false), utils.getArg("count", 1));

  process.exit();
})();


function getRandom(items: any[]) {
  return items[Math.floor(Math.random()*items.length)];
}
