import bgImage from "@/assets/auth-bg.png";
import illustration from "@/assets/auth-illustration.png";

export default function AuthSidePanel() {
  return (
    <div
    // was h-full b4
      className="h-screen w-full bg-cover bg-center"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center text-white lg:py-16 md:py-24">
        {/* Heading */}
        <p className="text-4xl font-extrabold leading-snug max-w-lg">
          Seamless, Convenient Banking for everyone.
        </p>

        {/* Illustration */}
        <div className="mt-auto w-full">
          <img
            src={illustration}
            alt="Login Illustration"
            className="max-w-[440px] w-full mx-auto"
          />
        </div>
      </div>
    </div>
  );
}
