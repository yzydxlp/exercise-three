import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
console.log(subscribeWithSelector);
export default create(
  subscribeWithSelector((set) => {
    return {
      blocksCount: 10,
      blockSeed: 0,
      phase: "ready",
      start: () => {
        set((state) => {
          if (state.phase === "ready") {
            return { phase: "playing" };
          }
          return {};
        });
      },
      restart: () => {
        set((state) => {
          if (state.phase === "playing" || state.phase === "ended") {
            return { phase: "ready", blockSeed: Math.random() };
          }
          return {};
        });
      },
      end: () => {
        set((state) => {
          if (state.phase === "playing") {
            return { phase: "ended" };
          }
          return {};
        });
      },
    };
  })
);
