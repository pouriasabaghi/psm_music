import { MdPlayArrow, MdPause, MdSkipNext } from "react-icons/md";
import headphoneImg from "../assets/img/headphone.png";

function AppFooter() {
  return (
    <div className="fixed bottom-0 z-10 flex h-14 w-full max-w-[450px] items-center bg-dark px-3">
      <div className="flex w-full rounded-3xl bg-dark-50 py-1 pe-5">
        <div className="animate-spin-slow rounded-full bg-dark-200 shadow-[0_0_0_2px_#131319,_0_0_0_4px_#676789,_0_0_0_6px_#131319]">
          <img className="h-10 w-10" src={headphoneImg} alt="" />
        </div>
        <div className="flex flex-col ps-4">
          <span className="text-sm font-bold">Mard tanhay shab</span>
          <span className="text-xs">Habib</span>
        </div>

        <div className="ms-auto flex items-center gap-4">
          <div className="flex items-center justify-center">
            <svg
              className="absolute cursor-pointer text-white"
              width="25"
              height="25"
            >
              <circle
                cx="12.5"
                cy="12.5"
                r="11.5"
                stroke="gray"
                strokeWidth="1"
                fill="none"

              />
              <circle
                cx="12.5"
                cy="12.5"
                r="10.5"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
                strokeDasharray="100 100"
                strokeDashoffset="30"
              />
            </svg>
            <MdPlayArrow size={20} className="cursor-pointer text-white" />
            <MdPause size={20} className="hidden cursor-pointer text-white" />
          </div>
          <MdSkipNext size={20} className="cursor-pointer text-white" />
        </div>
      </div>
    </div>
  );
}

export default AppFooter;
