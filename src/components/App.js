import logo from "assets/logo.svg";
import launchBanner from "assets/presale_end.webp";
import launchBannerMobile from "assets/presale_end_mobile.webp";
import amaBanner from "assets/ama.jpeg";
import amaBannerMobile from "assets/ama_mobile.jpeg";
import styles from "components/style.module.css";
import { useWindowSize } from "hooks";
import Window from "./Window/Window";

const events = [
  {
    label: "Launch date",
    banner: { desktop: launchBanner, mobile: launchBannerMobile },
    Overlay: null,
    endDateLabel: "3rd of June at xx:xx (UTC+0)",
    endDate: new Date("2023-06-03"),
  },
  {
    label: "AMA",
    banner: { desktop: amaBanner, mobile: amaBannerMobile },
    Overlay: null,
    endDateLabel: "Thursday, 6th of April at 14:00 (UTC+0)",
    endDate: new Date(2023, 3, 6, 14, 0), // months are 0 indexed
  },
];

function App() {
  const { width } = useWindowSize();

  return (
    <div className={styles.container}>
      <img src={logo} alt="" className={styles.logo} />
      {events.map((event) => (
        <Window key={event.label} event={event} width={width} />
      ))}
    </div>
  );
}

export default App;
