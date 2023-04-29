import React, { useCallback, useEffect, useState } from "react";

/**
 *
 * @param {any} element could be ref or current
 * @param {number} dividend number to divide the screen. Default 1
 * @returns
 */
const useIsOnScreen = (element, dividend = 1) => {
  const [visible, setVisible] = useState(false);

  const onScroll = useCallback(
    (e) => {
      let rect = undefined;
      if (element !== null) {
        if (element && element.current)
          rect = element.current.getBoundingClientRect();
        else rect = element.getBoundingClientRect();
      }
      if (rect) setVisible(rect.top <= window.innerHeight / dividend);
    },
    [setVisible, element]
  );

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  return visible;
};

export default useIsOnScreen;
