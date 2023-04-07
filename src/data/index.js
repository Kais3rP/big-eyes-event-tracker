import launchBanner from "assets/presale_end.webp";
import launchBannerMobile from "assets/presale_end_mobile.webp";
import amaBanner from "assets/ama.jpeg";
import amaBannerMobile from "assets/ama_mobile.jpeg";

const now = new Date();
now.setSeconds(now.getSeconds() + 5);

export const events = [
  {
    id: 1,
    label: "Dummy test",
    banner: { desktop: launchBanner, mobile: launchBannerMobile },
    Overlay: null,
    endDateLabel: "",
    endDate: now,
    target: "https://bigeyes.space/",
  },
  {
    id: 2,
    label: "Launch date",
    banner: { desktop: launchBanner, mobile: launchBannerMobile },
    Overlay: null,
    endDateLabel: "3rd of June at xx:xx (UTC+0)",
    endDate: new Date("2023-06-03"),
    target: "https://bigeyes.space/",
  },
  {
    id: 3,
    label: "AMA",
    banner: { desktop: amaBanner, mobile: amaBannerMobile },
    Overlay: null,
    endDateLabel: "Thursday, 6th of April at 14:00 (UTC+0)",
    endDate: new Date(2023, 3, 6, 14, 0), // months are 0 indexed
    target: "https://t.me/BIGEYESOFFICIAL",
  },
];
