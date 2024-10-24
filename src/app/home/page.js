import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="container mx-auto px-4 p-8">
      <h1 className="text-4xl font-bold text-center my-8 text-yellow-300">
        Happy Chinese New Year! <span className="text-white">恭喜发财</span>
      </h1>
      
      <div className="text-center mb-8 animate-slideInRight">
        <p className="text-xl text-white">
          Celebrate the Year of the {new Date().getFullYear() - 1959}
        </p>
      </div>

      <div className="flex justify-center mb-12 animate-bounce">
        <Image
          src="/chinese-new-year.png"
          alt="Chinese New Year Decoration"
          width={400}
          height={400}
          className="rounded-full border-4 border-yellow-300"
        />
      </div>

      <div className="mt-16 grid md:grid-cols-2 gap-8">
        <div className="bg-red-700 rounded-lg p-6 text-center animate-slideInLeft">
          <h2 className="text-2xl font-bold text-yellow-300 mb-4">Play Snake Game</h2>
          <p className="text-white mb-4">Challenge yourself with our festive Snake game! Guide the snake to collect lucky red envelopes and grow longer.</p>
          <Link href="/snake-game" className="bg-yellow-300 text-red-700 font-bold py-2 px-4 rounded hover:bg-yellow-400 transition duration-300">
            Start Game
          </Link>
        </div>
        
        <div className="bg-red-700 rounded-lg p-6 text-center animate-slideInRight">
          <h2 className="text-2xl font-bold text-yellow-300 mb-4">Design Your Room</h2>
          <p className="text-white mb-4">Decorate your virtual room with traditional Chinese New Year ornaments and create a festive atmosphere!</p>
          <Link href="/design-room" className="bg-yellow-300 text-red-700 font-bold py-2 px-4 rounded hover:bg-yellow-400 transition duration-300">
            Start Designing
          </Link>
        </div>
      </div>
    </div>
  );
}
