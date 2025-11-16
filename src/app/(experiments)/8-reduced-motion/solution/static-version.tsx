import Image from "next/image";

import heroImage from "./assets/0001.webp";
import cameraImage from "./assets/0130.webp";
import wheelsImage from "./assets/0300.webp";

export function StaticVersion() {
  return (
    <div className="flex flex-col">
      <div className="h-screen w-full relative">
        <Image
          src={heroImage}
          alt="Perseverance rover"
          className="absolute inset-0"
        />
        <h1 className="uppercase absolute text-[8vw] w-full text-center -bottom-[0.1em] leading-none right-[0.05em] tracking-widest text-transparent bg-linear-to-t from-black/10 to-white to-70% bg-clip-text">
          Perseverance
        </h1>
      </div>
      <div className="h-screen w-full relative">
        <Image
          src={cameraImage}
          alt="Rover Cameras"
          className="absolute w-full h-full top-0 left-0 object-cover"
        />
        <div className="absolute top-1/2 -translate-y-1/2 right-8 max-w-full w-md text-white">
          <h2 className="text-5xl mb-2">Cameras</h2>
          <p className="text-balance">
            Mounted on the &quot;head&quot; of the rover&apos;s long-necked
            mast. The SuperCam on the Perseverance rover examines rocks and
            soils with a camera, laser, and spectrometers to seek chemical
            materials that could be related to past life on Mars.
          </p>
        </div>
      </div>
      <div className="h-screen w-full relative">
        <Image
          src={wheelsImage}
          alt="Rover Cameras"
          className="absolute w-full h-full top-0 left-0 object-cover"
        />
        <div className="absolute bottom-8 left-8 max-w-full w-lg text-white">
          <h2 className="text-5xl mb-2">Wheels</h2>
          <p className="text-balance">
            The wheels are made of aluminium, with cleats for traction and
            curved titanium spokes for springy support.
          </p>
        </div>
      </div>
    </div>
  );
}
