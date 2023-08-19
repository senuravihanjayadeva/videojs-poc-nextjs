import Link from "next/link";

const pendingItems = [
  "Frame by Frame",
  "Setting",
  "In Screen Navigation",
  "Timestamp",
  "Clips",
  "Concept Check (Internal and External)",
];
function Features() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Features List</h1>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-green-600">
            Completed
          </h3>
          <li>
            <Link href="/">Play-Pause</Link>
          </li>
          <li>
            <Link href="/">Mute-Unmute</Link>
          </li>
          <li>
            <Link href="/">Full Screen</Link>
          </li>
          <li>
            <Link href="/">Speed Control</Link>
          </li>
          <li>
            <Link href="/">Redition Control</Link>
          </li>
          <li>
            <Link href="/"> Multi Language Support</Link>
          </li>
          <li>
            <Link href="/annotation">Annotation</Link>
          </li>
          <li>
            <Link href="/playlist">Playlist</Link>
          </li>
          <li>
            <Link href="/audio">Audio Player</Link>
          </li>
          <li>
            <Link href="/">Chaptering</Link>
          </li>
          <li>
            <Link href="/hoverover">Hover the credit line</Link>
          </li>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2 text-orange-600">
            Pending
          </h3>
          <ul>
            {pendingItems.map((item, index) => (
              <li key={index} className="mb-2">
                <span className="font-semibold">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Features;
