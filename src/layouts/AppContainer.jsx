function AppContainer({children, classes}) {
  return (
    <main className={`max-w-[450px] m-auto   relative ${classes}`}>
      {children}
    </main>
  );
}

export default AppContainer;