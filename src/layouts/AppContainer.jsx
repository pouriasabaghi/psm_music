function AppContainer({children, classes=''}) {
  return (
    <main className={`max-w-[450px] m-auto overflow-hidden  relative ${classes}`}>
      {children}
    </main>
  );
}

export default AppContainer;