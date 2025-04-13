import Image from "next/image";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <div className="text-center mt-10">
        <h1 className="text-4xl font-bold">Welcome to Recipe Finder</h1>
        <p className="mt-4 text-lg">Find your favorite recipes easily!</p>
        <Image
          src="/public/recipe.jpg"
          alt="Recipe Image"
          width={500}
          height={300}
          className="rounded-lg mt-6"
        />  
      Recipe finder
      </div>
    </>
  );
}
