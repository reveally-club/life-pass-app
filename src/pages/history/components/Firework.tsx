export default function Firework() {
  const emojiArray = ["👏", "🔥", "🎫", "❤️", "🎫", "👏", "🔥"];

  return (
    <div className="emoji-firework">
      {emojiArray.map((data, index) => (
        <div className="emoji" key={index}>
          {data}
        </div>
      ))}
    </div>
  );
}
