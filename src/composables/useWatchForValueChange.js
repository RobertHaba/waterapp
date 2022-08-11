export function useWatchForValueChange(newVal, oldVal) {
  return newVal !== oldVal ? true : false;
}
export function useCheckForLogChanges(logs) {
  return logs.find((item) => item.status === true) ? true : false;
}
export function useAddChangeLog(changesLog, elID, newVal, oldVal) {
  const index = changesLog.findIndex((item) => item.id === elID);
  if (index === -1) {
    changesLog.push({
      id: elID,
      status: useWatchForValueChange(newVal, oldVal),
    });
  } else {
    changesLog[index].status = useWatchForValueChange(newVal, oldVal);
  }
  console.log(changesLog);
  return changesLog;
}
