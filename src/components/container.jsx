export default function Container({children}) {
    return (
        <div className="max-w mx-auto px-4 py-6  rounded-lg">
            {children}
        </div>
    );

}