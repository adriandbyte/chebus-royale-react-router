interface RuleCardProps {
  number: string;
  title: string;
  content: string;
}

export default function RuleCard({ number, title, content }: RuleCardProps) {
  return (
    <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 transition-all hover:shadow-md">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
          {number}
        </div>
        <div>
          <h3 className="text-base font-semibold text-blue-800 mb-1">
            {title}
          </h3>
          <p className="text-sm text-blue-700">{content}</p>
        </div>
      </div>
    </div>
  );
}
