import styles from "components/style.module.css";
import { useWindowSize } from "hooks";
import Window from "components/Window/Window";
import Header from "components/Header/Header";
import { useEffect } from "react";
import { events } from "data";
import Footer from "components/Footer/Footer";

function App() {
  const { width } = useWindowSize();

  useEffect(() => {
    window.addEventListener("notificationclick", (e) => {
      console.log(e);
    });
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      {events.map((event) => (
        <Window key={event.label} event={event} width={width} />
      ))}
      <Footer />
    </div>
  );
}

export default App;
