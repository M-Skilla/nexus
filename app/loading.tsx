import Image from "next/image";

const Loading = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="flex flex-col items-center">
        <div className="animate-pulse">
          <Image
            src="/favicon.ico"
            alt="Application Logo"
            width={100}
            height={100}
            className="rounded-full"
          />
        </div>
        <p className="mt-4 animate-pulse text-lg font-semibold text-white">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loading;
