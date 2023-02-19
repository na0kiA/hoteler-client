import React from "react";
import { ServiceRateType } from "types/types";

type PROPS = {
  rest: ServiceRateType;
  stay: ServiceRateType;
};

const ServiceList = ({ rest, stay }: PROPS) => {
  const isStayAtBusinessHourOrNot = (stay: ServiceRateType) => {
    if (typeof stay === "string") {
      return <p className="mt-2">{stay}</p>;
    } else {
      return (
        <div>
          <p className="font-thin mt-1">【{stay.plan}】</p>
          <>
            ¥{stay.rate} | {stay.startTime}
            時〜
            {stay.endTime}時
          </>
        </div>
      );
    }
  };

  const isRestAtBusinessHourOrNot = (rest: ServiceRateType) => {
    if (typeof rest === "string") {
      return <p className="mt-2">{rest}</p>;
    } else {
      return (
        <div>
          <p className="font-thin mt-1">【{rest.plan}】</p>
          <>
            ¥{rest.rate} | {rest.startTime}
            時〜
            {convertTwentyFourHour(rest.endTime)}時
          </>
        </div>
      );
    }
  };

  const convertTwentyFourHour = (time: number) => {
    if (Number(time) === 0) {
      return 24;
    } else {
      return time;
    }
  };

  return (
    <>
      <div className="text-sm font-mono">{isStayAtBusinessHourOrNot(stay)}</div>
      <div className="text-sm font-mono">{isRestAtBusinessHourOrNot(rest)}</div>
    </>
  );
};

export default ServiceList;
