type HR = {
  "Moderate Risk": number;
  Healthy: number;
  "Caution Needed": number;
  Unknown: number;
  "High Risk": number;
};

type Props = {
  data: HR;
  title: string;
};

export default function DependencyRow({ data, title }: Props) {
  return (
    <div className="space-y-2">
      <div className="text-sm font-medium text-gray-600">{title}</div>
      <div className="grid grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">
            {data.Healthy}
          </div>
          <div className="text-sm text-gray-600">Healthy</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-600">
            {data["Moderate Risk"]}
          </div>
          <div className="text-sm text-gray-600">Moderate Risk</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600">
            {data["High Risk"]}
          </div>
          <div className="text-sm text-gray-600">High Risk</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-600">
            {data["Unknown"]}
          </div>
          <div className="text-sm text-gray-600">Unknown</div>
        </div>
      </div>
    </div>
  );
}
