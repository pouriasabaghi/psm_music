function AppContentBox({ children }) {
  return (
    <div className="h-[calc(100vh-142px)] overflow-auto pb-16 lg:pb-0 px-5 pt-5 relative">
      {children}
    </div>
  );
}

export default AppContentBox;
