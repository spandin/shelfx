import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShelfTime } from "@/store/slices/formSlice";

import { calcEndOfTermInfo, convertRuToUTC } from "@/lib/date";

export function EndOfTermWatcher(watch) {
  const dispatch = useDispatch();

  const { selectType } = useSelector((state) => state.form);
  useEffect(() => {
    const subscription = watch((value) => {
      selectType === "fullDate"
        ? dispatch(setShelfTime(convertRuToUTC(value?.date_2)))
        : dispatch(
            setShelfTime(calcEndOfTermInfo(value?.date_1, value?.date_2)),
          );
    });
    return () => subscription.unsubscribe();
  }, [watch, dispatch, selectType]);
}

// --------------------------------------------------------------------------------------------------------------------

import Moment from "react-moment";
import "moment/locale/ru";
Moment.globalLocale = "ru";

import { isValidDate } from "@/lib/date";

const EndOfTermInformer = () => {
  const { shelfTime } = useSelector((state) => state.form);
  return (
    <>
      {isValidDate(shelfTime) && (
        <Moment fromNow toNow>
          {shelfTime}
        </Moment>
      )}
    </>
  );
};

export { EndOfTermInformer };
