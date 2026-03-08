import React from 'react';

interface HeatmapData {
  date: string;
  value: number;
}

interface HeatmapProps {
  data: HeatmapData[];
}

const weekdayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthLabels = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const intensityColors: Record<number, string> = {
  0: 'bg-gray-200',
  1: 'bg-green-200',
  2: 'bg-green-400',
  3: 'bg-green-600',
  4: 'bg-green-800',
};

const Heatmap: React.FC<HeatmapProps> = ({ data }) => {
  const dateMap = new Map(data.map((d) => [d.date, d.value]));

  const today = new Date();
  const startDate = new Date();
  startDate.setFullYear(today.getFullYear() - 1);

  const allDates: Date[] = [];

  const d = new Date(startDate);

  while (d <= today) {
    allDates.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }

  // Pad beginning so grid always starts on Sunday
  const firstDay = allDates[0].getDay();

  for (let i = 0; i < firstDay; i++) {
    allDates.unshift(null as unknown as Date);
  }

  const weeks: (Date | null)[][] = [];

  for (let i = 0; i < allDates.length; i += 7) {
    weeks.push(allDates.slice(i, i + 7));
  }

  return (
    <div className='flex flex-col'>
      {/* Month labels */}
      <div className='flex ml-8 space-x-1 mb-1'>
        {weeks.map((week, i) => {
          const firstValidDate = week.find((d) => d !== null);

          if (!firstValidDate) return <div key={i} className='w-5' />;

          const month = firstValidDate.getMonth();

          const prevWeek = weeks[i - 1]?.find((d) => d !== null);

          const prevMonth = prevWeek?.getMonth();

          return (
            <div key={i} className='w-5 text-xs text-center'>
              {month !== prevMonth ? monthLabels[month] : ''}
            </div>
          );
        })}
      </div>

      <div className='flex'>
        {/* Weekday labels */}
        <div className='flex flex-col mr-2 gap-1'>
          {weekdayLabels.map((day) => (
            <div key={day} className='h-5 text-xs flex items-center'>
              {day}
            </div>
          ))}
        </div>

        {/* Heatmap grid */}
        <div className='flex space-x-1'>
          {weeks.map((week, i) => (
            <div key={i} className='flex flex-col space-y-1'>
              {week.map((date, j) => {
                if (!date) {
                  return (
                    <div key={j} className='w-5 h-5 rounded-sm bg-gray-100' />
                  );
                }

                const dateStr = date.toISOString().slice(0, 10);

                const value = dateMap.get(dateStr) ?? 0;

                const color = intensityColors[value] ?? intensityColors[0];

                return (
                  <div key={j} className='relative group'>
                    {/* square */}
                    <div
                      className={`w-5 h-5 rounded-sm ${color} cursor-pointer`}
                    />

                    {/* animated tooltip */}
                    <div
                      className='
          pointer-events-none
          absolute
          bottom-8
          left-1/2
          -translate-x-1/2
          opacity-0
          scale-95
          group-hover:opacity-100
          group-hover:scale-100
          transition
          duration-150
          ease-out
          z-50
        '
                    >
                      <div className='bg-gray-900 text-white text-xs px-3 py-2 rounded shadow-lg whitespace-nowrap'>
                        <div className='font-medium'>{date.toDateString()}</div>

                        <div className='text-gray-300'>Intensity: {value}</div>
                      </div>

                      {/* tooltip arrow */}
                      <div className='absolute left-1/2 -translate-x-1/2 top-full w-2 h-2 bg-gray-900 rotate-45 -mt-1' />
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Heatmap;
