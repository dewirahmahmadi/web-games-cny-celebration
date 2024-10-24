import Image from 'next/image';

export default function ChineseNewYearContent({ sections }) {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center my-8 text-yellow-300">
        Happy Chinese New Year! <span className="text-white">恭喜发财</span>
      </h1>
      
      <div className="text-center mb-8">
        <p className="text-xl text-white">
          Celebrate the Year of the {new Date().getFullYear() - 1959}
        </p>
      </div>

      <div className="flex justify-center mb-12">
        <Image
          src="/chinese-new-year.png"
          alt="Chinese New Year Decoration"
          width={300}
          height={300}
          className="rounded-full border-4 border-yellow-300"
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {sections.map((section, index) => (
          <div
            key={index}
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-red-700"
          >
            <h2 className="mb-3 text-2xl font-semibold text-yellow-300">
              {section.title}{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm text-white">
              {section.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
