import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-red-700 text-white p-4 animate-fadeIn">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/home" className="text-2xl font-bold hover:text-yellow-300 transition-colors duration-300">
          Chinese New Year
        </Link>
        <ul className="flex space-x-4">
          <li><Link href="/home" className="hover:text-yellow-300 transition-colors duration-300">Home</Link></li>
          <li><Link href="/snake-game" className="hover:text-yellow-300 transition-colors duration-300">Snake Game</Link></li>
          <li><Link href="/design-room" className="hover:text-yellow-300 transition-colors duration-300">Design Room</Link></li>
        </ul>
      </nav>
    </header>
  );
}
