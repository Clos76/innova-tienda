
export default function PageLayout({ children }) {
  return (
    <>
      <div className="w-full min-h-screen flex flex-col justify-start overflow-x-hidden pt-[72px]">
        
          {children}
       
      </div>
    </>
  );
}
