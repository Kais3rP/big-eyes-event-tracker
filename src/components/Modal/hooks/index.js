import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export const useFadingModal = () => {
  const modalRef = useRef();
  const [modal, setModal] = useState({ visible: false, title: "", body: "" });
  useEffect(() => {
    gsap.set(modalRef.current, { opacity: 0 });
    if (!modal.title || !modal.body) return;
    gsap
      .timeline()
      .to(modalRef.current, {
        opacity: 1,
        zIndex: 10,
        duration: 0.5,
        ease: "linear",
      })
      .to(modalRef.current, { opacity: 0, zIndex: 0, duration: 0.5 }, ">+=2");
  }, [modal]);

  return { modalRef, modal, setModal };
};
