import styles from "components/style.module.css";
import { useWindowSize } from "hooks";
import Window from "components/Window/Window";
import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";
import { useStore } from "store";
import IntroModal from "components/IntroModal/IntroModal";

function App() {
  const { width } = useWindowSize();
  const { events } = useStore();

  return (
    <div className={styles.container}>
      <IntroModal />
      <Header />
      {events.map((event) => (
        <Window key={event.label} event={event} width={width} />
      ))}
      <Footer />
    </div>
  );
}

export default App;
