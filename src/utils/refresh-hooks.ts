import { useEffect } from "react";
import { useState } from "react";
export function useRefresh():[boolean,Function]{
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {}, [refresh]);
  const changeRefresh = () => {
    setRefresh((refresh) => {
      return !refresh;
    });
  };
  return [refresh,changeRefresh];
};
