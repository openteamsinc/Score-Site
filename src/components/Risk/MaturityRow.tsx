type M = {
  Mature: number;
  Unknown: number;
  Legacy: number;
  Experimental: number;
};
type Props = {
  data: M;
  title: string;
};

export default function MaturityRow({ data, title }: Props) {
  return (
    <div className="space-y-2">
      <div className="text-sm font-medium text-gray-600">{title}</div>
      <div className="grid grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{data.Mature}</div>
          <div className="text-sm text-gray-600">Mature</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">
            {data.Experimental}
          </div>
          <div className="text-sm text-gray-600">Experimental</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-600">{data.Legacy}</div>
          <div className="text-sm text-gray-600">Legacy</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-600">{data.Unknown}</div>
          <div className="text-sm text-gray-600">Unknown</div>
        </div>
      </div>
    </div>
  );
}
