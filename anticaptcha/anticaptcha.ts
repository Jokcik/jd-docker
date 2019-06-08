import {AntiCaptcha} from "./api/AntiCaptcha";

export class AnticaptchaClient {
  private antiCaptchaAPI = new AntiCaptcha("d0fdf956e529acab766c261c8cd53ea0");

  async createTaskImage(data: string) {
    if (await !this.antiCaptchaAPI.isBalanceGreaterThan(10)) {
      // You can dispatch a warning using mailer or do whatever.
      console.warn("Take care, you're running low on money !")
    }

    // const data = "data:image/jpg;base64,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";
    let base64Data = data.replace(/^data:image\/jpg;base64,/, "");
    base64Data += base64Data.replace('+', ' ');

    const taskId = await this.antiCaptchaAPI.createTaskImage(base64Data);

    return await this.antiCaptchaAPI.getTaskResult(taskId);
  }
}

