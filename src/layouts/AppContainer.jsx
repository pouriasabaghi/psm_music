function AppContainer({children}) {
  return (
    <main className="max-w-[450px] m-auto flex  min-h-screen">
      {children}
    </main>
  );
}

export default AppContainer;