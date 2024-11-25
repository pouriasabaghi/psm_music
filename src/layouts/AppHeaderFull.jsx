function AppHeaderFull({ children, startEl, endEl }) {
  return (
    <header className="mb-5 grid h-[70px] grid-cols-12 items-center gap-x-4 bg-dark-900 px-5 pb-5 pt-5">
      <div className="col-span-2">{startEl}</div>

      <h6 className="col-span-8 mx-auto text-lg font-bold"> {children}</h6>

      <div className="col-span-2 text-end">{endEl} </div>
    </header>
  );
}


export default AppHeaderFull;
