import { MoveRight } from 'lucide-react';

export default function Arrow() {
  return (
    <div className="flex justify-end absolute right-3 bottom-11 z-10">
      <div className="text-orange-500 group-hover:translate-x-1 transition-transform duration-200 absolute ">
        <MoveRight className="w-7 h-10" />
      </div>
    </div>
  );
}
