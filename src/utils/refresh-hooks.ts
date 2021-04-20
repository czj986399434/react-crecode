import { useState } from "react";
export function useRefresh():[boolean,Function]{
  const [refreshFlag, setRefreshFlag] = useState(false);
  const refresh = () => {
    setRefreshFlag((refresh) => {
      return !refresh;
    });
  };
  return [refreshFlag,refresh];
};
