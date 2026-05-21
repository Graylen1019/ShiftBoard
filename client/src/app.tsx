import { Navbar } from "./components/navbar/navbar";

function App() {
  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col">
      <Navbar />
      <main className="flex-1 overflow-auto">
      </main>
    </div>
  );
}

export default App;
