interface ScoreCardProps {
  title: string;
  points: string;
  color: string;
}

export default function ScoreCard({ title, points, color }: ScoreCardProps) {
  return (
    <div className="rounded-lg bg-white shadow-sm border border-blue-100 p-4 transition-all hover:shadow-md overflow-hidden relative">
      <div className={`absolute inset-0 w-1 ${color}`}></div>
      <div className="pl-2">
        <h3 className="font-medium text-gray-700">{title}</h3>
        <div className="mt-2 flex items-center">
          <span
            className={`text-2xl font-bold ${color.replace("bg-", "text-")}`}
          >
            {points}
          </span>
          <span className="ml-1 text-sm text-gray-500">puntos</span>
        </div>
      </div>
    </div>
  );
}
