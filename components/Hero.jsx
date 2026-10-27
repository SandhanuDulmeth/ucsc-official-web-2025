import ParallaxImages from "./helpers/ParallaxImages";
import TextReveal from "./helpers/TextReveal";

const Hero = () => {
  return (
    <main className="h-[300vh] relative">
      <div className="sticky top-0 hero">
        <h1 className="uppercase font-semibold md:text-9xl text-4xl text-primary-white w-full absolute bottom-32 md:bottom-0 z-10 px-6 md:px-12 hero-text">
          <span className="inline-block overflow-hidden">
            <TextReveal className="mr-8" selector="heading-1" delay={1.6}>
              welcome to
            </TextReveal>
          </span>

          <br />

          <span className="inline-block overflow-hidden">
            <TextReveal className="mr-8" selector="heading-2" delay={1.75}>
              ieee ucsc
            </TextReveal>
          </span>
        </h1>

        <div className="relative h-screen w-full overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload
            className="absolute top-0 left-0 h-full w-full object-cover brightness-50"
          >
            <source src="/hero.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <ParallaxImages />
    </main>
  );
};

export default Hero;
