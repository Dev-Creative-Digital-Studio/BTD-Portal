interface StatsCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  change: {
    value: string;
    trend: "up" | "down";
  };
}

export function StatsCard({ icon, title, value, change }: StatsCardProps) {
  return (
    <div className="rounded-lg border bg-white p-4">
      <div className="flex items-center gap-4">
        <div className="p-2 bg-[#00BFA6]/10 rounded-lg">{icon}</div>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
          <p
            className={cn(
              "text-xs",
              change.trend === "up" ? "text-green-600" : "text-red-600"
            )}
          >
            {change.trend === "up" ? "↑" : "↓"} {change.value}
          </p>
        </div>
      </div>
    </div>
  );
}
