"use client";

interface ScheduleType {
  frequency: string;
  time: string;
  timezone: string;
  days: string[];
}

interface StepScheduleProps {
  schedule: ScheduleType;
  setSchedule: (schedule: ScheduleType) => void;
}

const timezones = [
  { value: "Asia/Calcutta", label: "Asia/Calcutta (UTC+5:30)" },
  { value: "Europe/London", label: "Europe/London (UTC+0:00)" },
  { value: "America/New_York", label: "America/New_York (UTC-5:00)" },
  { value: "America/Los_Angeles", label: "America/Los_Angeles (UTC-8:00)" },
  { value: "Asia/Tokyo", label: "Asia/Tokyo (UTC+9:00)" },
];

export default function StepSchedule({ schedule, setSchedule }: StepScheduleProps) {
  
  const updateSched = (key: keyof ScheduleType, val: any) => {
    setSchedule({ ...schedule, [key]: val });
  };

  const getPreviewText = () => {
    let freqText = schedule.frequency;
    if (schedule.frequency === "weekdays") freqText = "on weekdays";
    
    // Parse time for AM/PM format display
    const [h, m] = schedule.time.split(":");
    let hours = parseInt(h);
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 = 12
    const timeText = `${hours}:${m} ${ampm}`;

    return `⚡ Your agent will run ${freqText} at ${timeText} ${schedule.timezone.split('/')[1]?.replace('_', ' ') || ''}`;
  };

  const currentHour = schedule.time.split(":")[0];
  const currentMinute = schedule.time.split(":")[1];
  const isPM = parseInt(currentHour) >= 12;

  const handleHourChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let h = parseInt(e.target.value);
    if (isPM && h < 12) h += 12;
    if (!isPM && h === 12) h = 0;
    const hStr = h.toString().padStart(2, '0');
    updateSched("time", `${hStr}:${currentMinute}`);
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateSched("time", `${currentHour}:${e.target.value}`);
  };

  const handleAmPmToggle = (toPM: boolean) => {
    if (isPM === toPM) return;
    let h = parseInt(currentHour);
    if (toPM && h < 12) h += 12;
    if (!toPM && h >= 12) h -= 12;
    const hStr = h.toString().padStart(2, '0');
    updateSched("time", `${hStr}:${currentMinute}`);
  };

  // Convert 24h internal state to 12h for the dropdown
  const displayHour = parseInt(currentHour) % 12 || 12;

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-xl px-6">
        
        {/* Frequency */}
        <div className="mb-10">
          <h3 className="text-[13px] font-medium text-zinc-400 uppercase tracking-wider mb-3">
            How often?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: "daily", label: "Daily", sub: "Runs every day" },
              { id: "weekly", label: "Weekly", sub: "Runs once a week" },
              { id: "weekdays", label: "Weekdays", sub: "Mon–Fri only" },
            ].map((opt) => (
              <div
                key={opt.id}
                onClick={() => updateSched("frequency", opt.id)}
                className={`border rounded-xl p-4 cursor-pointer text-center transition-all ${
                  schedule.frequency === opt.id
                    ? "border-emerald-500/40 bg-emerald-500/5 shadow-sm"
                    : "bg-[#111111] border-white/[0.06] hover:border-white/[0.12]"
                }`}
              >
                <div className="text-[14px] font-medium text-zinc-100">{opt.label}</div>
                <div className="text-[12px] text-zinc-500 mt-1">{opt.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Time */}
        <div className="mb-10">
          <h3 className="text-[13px] font-medium text-zinc-400 uppercase tracking-wider mb-3">
            What time?
          </h3>
          <div className="flex items-center gap-3">
            {/* Hour select */}
            <div className="relative">
              <select
                value={displayHour}
                onChange={handleHourChange}
                className="appearance-none bg-[#1a1a1a] border border-white/[0.08] text-zinc-100 rounded-xl pl-4 pr-10 py-2.5 text-[14px] focus:outline-none focus:border-white/[0.2] transition-colors cursor-pointer"
              >
                {[...Array(12)].map((_, i) => (
                  <option key={i} value={i === 0 ? 12 : i}>
                    {(i === 0 ? 12 : i).toString().padStart(2, '0')}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-zinc-500">
                <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>

            <span className="text-zinc-500 font-bold">:</span>

            {/* Minute select */}
            <div className="relative">
              <select
                value={currentMinute}
                onChange={handleMinuteChange}
                className="appearance-none bg-[#1a1a1a] border border-white/[0.08] text-zinc-100 rounded-xl pl-4 pr-10 py-2.5 text-[14px] focus:outline-none focus:border-white/[0.2] transition-colors cursor-pointer"
              >
                {["00", "15", "30", "45"].map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-zinc-500">
                <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>

            {/* AM/PM toggle */}
            <div className="flex bg-[#1a1a1a] border border-white/[0.08] rounded-xl p-1 ml-2">
              <button
                onClick={() => handleAmPmToggle(false)}
                className={`px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors ${!isPM ? 'bg-zinc-800 text-zinc-100 shadow-sm' : 'text-zinc-600 hover:text-zinc-400'}`}
              >
                AM
              </button>
              <button
                onClick={() => handleAmPmToggle(true)}
                className={`px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors ${isPM ? 'bg-zinc-800 text-zinc-100 shadow-sm' : 'text-zinc-600 hover:text-zinc-400'}`}
              >
                PM
              </button>
            </div>
          </div>
        </div>

        {/* Timezone */}
        <div className="mb-10">
          <h3 className="text-[13px] font-medium text-zinc-400 uppercase tracking-wider mb-3">
            Timezone
          </h3>
          <div className="relative w-full max-w-sm">
            <select
              value={schedule.timezone}
              onChange={(e) => updateSched("timezone", e.target.value)}
              className="w-full h-11 appearance-none bg-[#1a1a1a] border border-white/[0.08] text-zinc-100 rounded-xl pl-4 pr-10 text-[14px] focus:outline-none focus:border-white/[0.2] transition-colors cursor-pointer"
            >
              {timezones.map(tz => (
                <option key={tz.value} value={tz.value}>{tz.label}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-zinc-500">
              <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>

        {/* Live Preview Banner */}
        <div className="bg-[#111111] border border-white/[0.06] rounded-xl p-4 text-center">
          <span className="text-[13px] text-zinc-300 font-medium">
            {getPreviewText()}
          </span>
        </div>

      </div>
    </div>
  );
}
