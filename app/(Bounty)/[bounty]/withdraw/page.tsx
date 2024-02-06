"use client";
import Button from "@/lib/components/atoms/Button";
import Input from "@/lib/components/molecules/Input";
import { useReducer } from "react";

interface NewFundPool {
  tokenAmount: number;
}

const initialState = {
  tokenAmount: 0,
};

const stateReducer = (
  current: NewFundPool,
  update: Partial<NewFundPool>
): NewFundPool => {
  return {
    ...current,
    ...update,
    tokenAmount:
      update.tokenAmount === undefined
        ? current.tokenAmount
        : isNaN(current.tokenAmount)
        ? 0
        : update.tokenAmount || 0,
  };
};

const page = () => {
  const [values, updateValues] = useReducer(stateReducer, initialState);

  const handleTopUp = () => {};

  return (
    <div className="flex flex-col gap-8 p-4 bg-white rounded-lg relative after:absolute after:-z-[10] after:inset-0 after:content-[''] after:bg-[#ffffff87] after:backdrop-blur-sm after:translate-x-[-8px] after:translate-y-[8px] after:rounded-lg w-[450px]">
      <div className="flex flex-col text-[#2D2D2C]">
        <h3 className=" text-lg font-bold">Withdraw Funds</h3>
        <p className=" text-xs">Happy</p>
      </div>

      <div className="flex flex-col gap-4 w-full">
        <div className={"flex flex-col gap-2 w-full"}>
          <p className=" text-sm font-semibold text-[#2D2D2C]">
            Bounty Details
          </p>
          <ul className="flex flex-col bg-[#00000087] backdrop-blur-sm rounded-lg w-full text-white p-4">
            <li className="text-xs">Title: ""</li>
          </ul>
        </div>

      </div>

      <Button
        className="w-full max-w-[480px]"
        text={"Withdraw"}
        handleClick={handleTopUp}
      />
    </div>
  );
};

export default page;
