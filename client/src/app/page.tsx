import NavBar from "@/components/NavBar";
import Landing from "./(nondashboard)/landing/page";

export default function Home() {
  return (
    <div className="h-full w-full">
      <NavBar />
      <main className={`h-full flex w-full flex-col`}>
        <Landing />
      </main>
    </div>
  );
}
