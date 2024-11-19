import Link from "next/link";

const HomePage: React.FC = () => {
  return (
    <main className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-5">
        <Link href={'/first-assignment'} className="bg-black text-white rounded-lg px-4 py-2">
          First Assignment
        </Link>

        <Link href={'/second-assignment'} className="bg-black text-white rounded-lg px-4 py-2">
          Second Assignment
        </Link>
      </div>
    </main>
  )
}

export default HomePage;
