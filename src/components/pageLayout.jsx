
export default function PageLayout({ children }) {
  return (
    <>
      <div className="w-full min-h-screen bg-[#231C1C] flex flex-col justify-start overflow-x-hidden ">
        
          {children}
       
      </div>
    </>
  );
}
