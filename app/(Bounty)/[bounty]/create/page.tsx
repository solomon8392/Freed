"use client";
import Button from "@/library/components/atoms/Button";
import Input from "@/library/components/molecules/Input";
import { useReducer } from "react";

export interface NewFundPool {
  tokenAmount: number;
  tokenStake: number;
  registrationStart: number;
  registrationEnd: number;
}

// TODO: Ensure the dates passed should be a time in the future.
const initialState = {
  tokenAmount: 0,
  tokenStake: 0,
  registrationStart: Math.floor(new Date().getTime() / 1000), // Convert to Unix timestamp already in UTC
  registrationEnd: Math.floor(new Date().getTime() / 1000), // Convert to Unix timestamp already in UTC
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
    registrationStart:
      update.registrationStart === undefined
        ? current.registrationStart
        : update.registrationStart || Math.floor(new Date().getTime() / 1000),
    registrationEnd:
      update.registrationEnd === undefined
        ? current.registrationEnd
        : update.registrationEnd || Math.floor(new Date().getTime() / 1000),
  };
};

const page = () => {
  const [values, updateValues] = useReducer(stateReducer, initialState);

  const handleBountyCreation = () => {};

  return (
    <div className="flex flex-col gap-8 p-4 bg-white rounded-lg relative after:absolute after:-z-[10] after:inset-0 after:content-[''] after:bg-[#ffffff87] after:backdrop-blur-sm after:translate-x-[-8px] after:translate-y-[8px] after:rounded-lg w-[450px] min-h-96">
      <div className="flex flex-col text-[#2D2D2C]">
        <h3 className=" text-lg font-bold">Create A Bounty</h3>
        <p className=" text-xs">Welcome to the Bounty Creation page. Here, you can create a new bounty by providing the necessary details. If you need any help, feel free to reach out to us.</p>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <Input
            label={"Bounty Prize"}
            type="text"
            value={values.tokenAmount.toString()}
            onChange={(e) =>
              updateValues({ tokenAmount: parseFloat(e.target.value) })
            }
          />
          <Input
            label={"Tokens Staked"}
            type="text"
            value={values.tokenStake.toString()}
            onChange={(e) =>
              updateValues({ tokenStake: parseFloat(e.target.value) })
            }
          />
        </div>
        <Input
          type="datetime-local"
          label={"Registration Begins"}
          value={
            isNaN(values.registrationStart)
              ? ""
              : new Date(
                  values.registrationStart * 1000 -
                    new Date().getTimezoneOffset() * 60000 // Convert Unix timestamp already in UTC to milliseconds and factor in timezone
                )
                  .toISOString()
                  .substring(0, 16)
          }
          onChange={
            (e) =>
              updateValues({
                registrationStart: Math.floor(
                  new Date(e.target.value).getTime() / 1000
                ),
              }) // Convert to Unix timestamp
          }
        />
        <Input
          type="datetime-local"
          label={"Submission Deadline"}
          value={
            isNaN(values.registrationEnd)
              ? ""
              : new Date(
                  values.registrationEnd * 1000 -
                    new Date().getTimezoneOffset() * 60000 // Convert Unix timestamp already in UTC to milliseconds and factor in timezone
                )
                  .toISOString()
                  .substring(0, 16)
          }
          onChange={
            (e) =>
              updateValues({
                registrationEnd: Math.floor(
                  new Date(e.target.value).getTime() / 1000
                ),
              }) // Convert to Unix timestamp
          }
        />
      </div>
      <Button
        className="w-full max-w-[480px]"
        text={"Create Bounty"}
        handleClick={handleBountyCreation}
      />
    </div>
  );
};

export default page;
