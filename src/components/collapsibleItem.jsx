import { useState } from "react";


function CollapsibleItem({ title, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-2">
      <button
        className="flex justify-between w-full text-left text-md font-semibold py-2"
        onClick={() => setOpen(!open)}
      >
        {title}
        <span>{open ? "−" : "+"}</span>
      </button>
      <div className={`transition-all duration-300 ease-in-out ${open ? "max-h-96" : "max-h-0 overflow-hidden"}`}>
        <div className="text-gray-600 mt-2">{children}</div>
      </div>
    </div>
  );
}

export default CollapsibleItem