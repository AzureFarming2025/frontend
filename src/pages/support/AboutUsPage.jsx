// AboutUsPage.tsx
import { Card, Button, Avatar } from "react-daisyui";

const GALLERY_IMAGES = [
  {
    src: "https://source.unsplash.com/600x400/?plants,nature",
    alt: "Plants growing",
  },
  {
    src: "https://source.unsplash.com/600x400/?greenhouse,growth",
    alt: "Healthy plants",
  },
  {
    src: "https://source.unsplash.com/600x400/?leaf,nature",
    alt: "Closeup leaves",
  },
  {
    src: "https://source.unsplash.com/600x400/?farm,miniature",
    alt: "Miniature farmers",
  },
];

export default function AboutUsPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-16">
      {/* Hero Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="space-y-4">
          <span className="text-sm text-yellow-600 font-semibold uppercase">
            Official smart discovery program
          </span>
          <h1 className="text-4xl font-bold leading-tight">
            Grow smart, anywhere<br /> with <span className="text-primary">AzureFarming</span>
          </h1>
          <p className="text-gray-500">
            A smart farm solution that helps anyone grow crops easily – even with no
            farming experience. Control your planter, monitor it remotely, and
            enjoy emotional healing along the way.
          </p>
          {/* <div className="flex gap-4">
            <Button color="primary">Request Demo</Button>
            <Button color="ghost">Learn More</Button>
          </div> */}
        </div>
        <div className="relative">
          <Avatar
            src="https://source.unsplash.com/400x400/?smartphone,farm"
            alt="App preview"
            size="md"
            className="rounded-xl shadow-lg"
          />
          <div className="absolute top-4 right-4 bg-white shadow-md rounded-lg px-4 py-2 text-sm">
            <p className="font-bold text-lg">$230</p>
            <p className="text-green-500 text-xs">+5.39%</p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="bg-yellow-50 p-6">
          <h2 className="text-xl font-bold mb-2">Feature benefits</h2>
          <p className="text-sm mb-4 text-gray-600">
            With AzureFarming, you’ll never forget to care for your plants. The smart
            system handles watering, light, and nutrients for you.
          </p>
          <ul className="text-sm space-y-2">
            <li>🌱 Auto watering system</li>
            <li>🌤️ Light and climate monitoring</li>
            <li>📱 Remote control from app</li>
          </ul>
        </Card>

        <Card className="bg-green-50 p-6">
          <h2 className="text-xl font-bold mb-2">Feature benefits</h2>
          <p className="text-sm mb-4 text-gray-600">
            You don’t have to be an expert. The system guides you and rewards you
            for simple actions.
          </p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs">Success rate</p>
              <p className="text-lg font-bold">+25%</p>
            </div>
            <div>
              <p className="text-xs">Avg missions done</p>
              <p className="text-lg font-bold">125</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Detailed Feature List */}
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Why AzureFarming?</h2>
          <div className="space-y-4">
            <div>
              <p className="font-semibold">1. Urban farming is possible</p>
              <p className="text-sm text-gray-500">
                You can easily grow plants indoors or on your balcony.
              </p>
            </div>
            <div>
              <p className="font-semibold">2. No worries for beginners!</p>
              <p className="text-sm text-gray-500">
                The system manages temperature, humidity, and nutrients for you.
              </p>
            </div>
            <div>
              <p className="font-semibold">3. Smart care system</p>
              <p className="text-sm text-gray-500">
                No need to worry if you forget to water – we’ve got you covered.
              </p>
            </div>
            <div>
              <p className="font-semibold">4. Real-time growth monitoring</p>
              <p className="text-sm text-gray-500">
                Check your plant's condition at a glance and take action through the app.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {GALLERY_IMAGES.map((img, idx) => (
            <Avatar
              key={idx}
              src={img.src}
              alt={img.alt}
              size="md"
              className="rounded-xl object-cover"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
