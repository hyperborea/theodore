import { Game } from "~/Game";

function App() {
  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col gap-8">
      <h1 className="text-4xl font-bold">
        Theorore's Epic Quest for all the Cakes
      </h1>

      <Game />
    </div>
  );
}

export default App;
