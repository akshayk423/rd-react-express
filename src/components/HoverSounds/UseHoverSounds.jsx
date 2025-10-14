import { useRef } from "react";

function useHoverSounds(hover1, hover2, hover3) {
  const sounds = useRef([
    new Audio(hover1),
    new Audio(hover2),
    new Audio(hover3),
  ]);
  const lastPlayed = useRef(0);
  const isPlaying = useRef(false);

  const playRandomSound = () => {
    const now = Date.now();

    if (now - lastPlayed.current < 250 || isPlaying.current) return;

    lastPlayed.current = now;
    const randomIndex = Math.floor(Math.random() * sounds.current.length);
    const audio = sounds.current[randomIndex];

    // Reset to start before playing
    try {
      audio.currentTime = 0;
      isPlaying.current = true;

      audio.play().catch(() => {
        isPlaying.current = false;
      });

      audio.onended = () => {
        isPlaying.current = false;
      };
    } catch (error) {
      isPlaying.current = false;
    }
  };

  return playRandomSound;
}

export default useHoverSounds;
