import { useState, useEffect, useRef } from "react";
import isEqual from "lodash";

export const useGamepad = () => {
  const [gamepadInfo, setGamepadInfo] = useState({
    connected: false,
    buttons0: [],
    buttons1: [],
    buttons2: [],
    buttons3: [],
  });
  const interval = useRef();

  // Function to update gamepad state
  const updateGamepadState = () => {
    console.log("Updating gamepad state");
    const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
    const gamepad = gamepads[0]; // Assuming the first gamepad

    if (gamepad) {
      // if (gamepad.buttons.length !== 20)
      //   throw new Error("Unexpected number of buttons for Buzz controllers");

      const newGamepadInfo = {
        connected: true,
        buttons0: gamepad.buttons.slice(0, 5),
        buttons1: gamepad.buttons.slice(5, 10),
        buttons2: gamepad.buttons.slice(10, 15),
        buttons3: gamepad.buttons.slice(15, 20),
      };

      // Update state only if there's a change
      // console.log(!isEqual(newGamepadInfo.buttons, gamepadInfo.buttons));
      // if (
      //   newGamepadInfo.connected !== gamepadInfo.connected ||
      //   !isEqual(newGamepadInfo.buttons, gamepadInfo.buttons)
      // ) {
      setGamepadInfo(newGamepadInfo);
      // }
    } else {
      if (gamepadInfo.connected) {
        setGamepadInfo({
          connected: false,
          buttons0: [],
          buttons1: [],
          buttons2: [],
          buttons3: [],
        });
      }
    }
    interval.current = setInterval(updateGamepadState, 100);
  };

  useEffect(() => {
    const gamepadConnected = () => {
      console.log("Gamepad connected!");
      interval.current = setInterval(updateGamepadState, 100);
    };

    const gamepadDisconnected = () => {
      console.log("Gamepad disconnected!");
      setGamepadInfo({
        connected: false,
        buttons0: [],
        buttons1: [],
        buttons2: [],
        buttons3: [],
      });
      clearInterval(interval?.current);
    };

    window.addEventListener("gamepadconnected", gamepadConnected);
    window.addEventListener("gamepaddisconnected", gamepadDisconnected);

    return () => {
      window.removeEventListener("gamepadconnected", gamepadConnected);
      window.removeEventListener("gamepaddisconnected", gamepadDisconnected);
      clearInterval(interval?.current);
    };
  }, [gamepadInfo]);

  return gamepadInfo;
};
