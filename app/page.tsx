"use client";

import { cn } from "./utils";
import { useGamepad } from "./useGamepad";
import ErrorBoundary from "./ErrorBoundary";

export default function Home() {
  const { connected, buttons0, buttons1, buttons2, buttons3 } = useGamepad();

  return (
    <main className="flex flex-col gap-5 items-center justify-center">
      <p>Controller: {connected ? "Connected" : "Disconnected"}</p>

      {connected && (
        <ErrorBoundary>
          <div className="flex gap-5">
            <BuzzControlller buttons={buttons0} />
            <BuzzControlller buttons={buttons1} />
            <BuzzControlller buttons={buttons2} />
            <BuzzControlller buttons={buttons3} />
          </div>
        </ErrorBoundary>
      )}
    </main>
  );
}

const BuzzControlller = ({ buttons }) => {
  return (
    <div className="bg-gray-900 rounded-full p-5 pb-20">
      <BuzzButton
        active={buttons[0].pressed}
        className="bg-red-500 w-full h-auto aspect-square rounded-full"
      />
      <div className="mt-7 flex flex-col gap-3">
        <div className="px-3">
          <BuzzButton
            active={buttons[4].pressed}
            className="border-4 border-blue-400 w-32 h-10 rounded-xl"
          />
        </div>
        <div className="px-3">
          <BuzzButton
            active={buttons[3].pressed}
            className="border-4 border-orange-400 w-32 h-10 rounded-xl"
          />
        </div>
        <div className="px-3">
          <BuzzButton
            active={buttons[2].pressed}
            className="border-4 border-green-400 w-32 h-10 rounded-xl"
          />
        </div>
        <div className="px-3">
          <BuzzButton
            active={buttons[1].pressed}
            className="border-4 border-yellow-400 w-32 h-10 rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

const BuzzButton = ({
  active = false,
  className,
}: {
  active: boolean;
  className: string;
}) => {
  return (
    <button
      className={cn(
        className,
        active && "outline outline-offset-1 outline-white"
      )}
    />
  );
};
