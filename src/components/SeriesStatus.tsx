import { IconCheck } from './icon/IconCheck';
import { IconUpdating } from './icon/IconUpdating';

type SeriesStatusProps = {
  currentEp: number;
  totalEp: number;
};

export const SeriesStatus: React.FC<SeriesStatusProps> = ({ currentEp, totalEp }) => {
  return (
    <div className="w-full h-fit text-xs flex md:text-xs font-light justify-center md:justify-start">
      {currentEp >= totalEp ? (
        <div className="text-teal bg-teal-10 flex gap-2  w-fit h-fit px-4 py-2 items-center rounded-full">
          <IconCheck width={18} height={18} />
          <span>
            Đã hoàn thành: {currentEp}/{totalEp} tập
          </span>
        </div>
      ) : (
        <div className="text-orange bg-orange-10 flex gap-2  w-fit h-fit px-4 py-2 items-center rounded-full">
          <IconUpdating width={18} height={18} />
          <span>
            Đã chiếu: {currentEp}/{totalEp} tập
          </span>
        </div>
      )}
    </div>
  );
};
