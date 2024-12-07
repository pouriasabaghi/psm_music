function OfflineStatus({ isOffline }) {
  if (isOffline)
    return (
      <div className="absolute top-0 flex h-6 w-full items-center justify-center bg-red-700/90 text-xs font-bold">
        <span>You are offline</span>
      </div>
    );

  if (!isOffline) return null;
}

export default OfflineStatus;
