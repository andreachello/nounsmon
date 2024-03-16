import { useEventsListeners } from "../../../../lib/utils/events";

import { UIBase } from "../UI";
import { Audios } from "../../../../lib/constants/assets";
import { UIEvents } from "../../../../lib/constants/events";
import { useUIStore } from "../../../../lib/stores/ui";
import { getAudioConfig } from "../../../../lib/utils/audio";

export const Battle = ({ game }: UIBase) => {
  const UIStore = useUIStore();

  useEventsListeners(
    [
      {
        name: UIEvents.EXIT,
        callback: () => {
          if (UIStore.battle.isOpen) {
            game.sound.stopAll();
            game.sound.play(Audios.PALLET_TOWN, getAudioConfig());
            game.scene.stop("Battle").start("World", {
              facingDirection: void 0,
              startPosition: void 0,
            });
            useUIStore.getState().toggleBattle();
          }
        },
      },
    ],
    [UIStore.battle.isOpen],
  );

  return (
    <div
      className="battle_menu"
      style={{
        display: UIStore.battle.isOpen ? "block" : "none",
      }}
    >
      <h1 style={{ textAlign: "center" }}>WIP. Press ESC to exit battle.</h1>
    </div>
  );
};
