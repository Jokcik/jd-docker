import {CustomRequest} from "./utils/request";
import {SendCoupon} from "./jd/sendCoupon";
import {Utils} from "./utils/utils";

const resultData = {
  key: "155861718209077c",
  start: 1560000567787,
  captchaStart: 1560000567787,
  accounts: [
    '_gcl_au=1.1.1128261840.1558856697; _ga=GA1.2.879515545.1558856697; eptCur=%7B%22currency%22%3A%22RUB%22%7D; locale=ru; _ym_uid=1558856697579677624; _ym_d=1558856697; open_id=xE32B5u2buapAT9%2FhQOXn1suVr1HocrsrJgxgrZWzYI%3D; crossLogin=1; _ga=GA1.3.879515545.1558856697; ept_username=Pronin; _fbp=fb.1.1558943040563.110291458; cto_lwid=60fed552-8275-4602-a78b-f9959e442fff; TrackID=1YeqArbuGXzh6MTtWIutEJ_dUK4rc5XaAvZy8BUIpEe8k5vBTgI7GRBPecrom2CVZ3Q4qcp-XbGSPU_rd3p0kxL931jXR_4RwvjRrQIignQE; pin=ept_KaLPRwBvZzIx; pinid=3647463; ept.ceshi5.com=36C9C92150E3AAE68A1D19B3B63672389FB522390254C3BF01BA8B1EFA1401B903C28FD5952FB594BD2AE343479CD26249A7DD333118C07BE797B7E260E2B72F0232AA3A783ABE7E02FEAEAAA0BD7C771BDBF17FCB97EA3B4CB896B274BE0FD46FA6577E18DE241CD4EEF24EE162851B0DAA69E19179B9C883733A4DAF3582198C25A9BCF5ADE91B3F0431882D6E9C8B5153F7EBEB224F0E7C2ED3EDF3210B6603061179C263E6958F2DFD1E22C5401ECA7C6306A9588446E30FC640B68BCFB3; loggedIn=1; eptEmail=wxvvt167@mail.ru; eptCountry=%7B%22id%22%3A2285%7D; _gid=GA1.2.1212411115.1559927817; __jdc=198920361; __cps=eyJzaXRlIjoicnUiLCJ1aWQiOiJBRDEyMiIsInNvdXJjZSI6Imh0dHA6Ly9jcHMuamQucnUvdW5pb24vY2xpY2s%2FdXRtX3NvdXJjZT1hZG1pdGFkX3J1JnV0bV9tZWRpdW09YWZmaWxpYXRlJnV0bV9jYW1wYWlnbj0xMTIzMiZhZG1pdGFkX3VpZD0yOTEyNjhlZjY0MGIxYmI0Mjk1YzUwMGY4YTNkOTBkOCZwPWV5SnNhVzVySWpvaWFIUjBjSE02THk5M2QzY3VhbVF1Y25VdmMyRnNaUzl3WXk4MExWbGxZWEl0UVc1dWFYWmxjbk5oY25rdFUyRnNaVjlxWTBaVE1ETndkekZ5TlZkUUxtaDBiV3dpTENKMGVYQmxJam9pTVNJc0luVnBaQ0k2SWtGRU1USXlJaXdpYzJsMFpTSTZJbkoxSWl3aWRYUnRYM052ZFhKalpTSTZJbUZrYldsMFlXUmZjblVpTENKMWRHMWZiV1ZrYVhWdElqb2lZV1ptYVd4cFlYUmxJbjAlM0QiLCJhZG1pdGFkX3VpZCI6IjI5MTI2OGVmNjQwYjFiYjQyOTVjNTAwZjhhM2Q5MGQ4IiwidHlwZSI6IjEifQ%3D%3D; __jda=198920361.15588566969831267637829.1558856697.1559339951.1559403677.7; __jdv=198920361%7CAD122%7C11232%7Caffiliate%7Cnot%20set%7C1559998231484; AKA_A2=A; _ym_isad=1; _ym_visorc_37688905=w; __jdb=198920361.4.15588566969831267637829|7.1559403677; _dc_gtm_UA-63283849-1=1',
  ],
};

(async () => {
  const request = new CustomRequest({}, false);
  const result = await request.get("https://delivery-club.store/api/jd");
  const data = result.data.response;
  data.accounts = JSON.parse(<string>data.accounts);
  data.start = new Date(data.start);
  data.captchaStart = new Date(data.captchaStart);

  const utils = new Utils();
  const sendCoupon = new SendCoupon(data.key, data.start, data.captchaStart, data.accounts);
  await sendCoupon.run(utils.getArg("useTor", false), utils.getArg("count", 1));

  process.exit();
})();
