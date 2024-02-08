"use client";
import Button from "@/library/components/atoms/Button";
import Input from "@/library/components/molecules/Input";
import { useReducer } from "react";

export interface NewFundPool {
  registrationAddress: string;
  paymentAddress: string;
}

const initialState = {
  registrationAddress: "",
  paymentAddress: "",
};

const stateReducer = (
  current: NewFundPool,
  update: Partial<NewFundPool>
): NewFundPool => {
  return {
    ...current,
    ...update,
    // registrationAddress: undefined || "", // TODO: swap out undefined for the selected connected wallet
  };
};

const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [values, updateValues] = useReducer(stateReducer, initialState);

  const handleRegistration = () => {};

  const handleWalletConnect = () => {
    const address = "0x...."; // TODO: get address from wallet
    updateValues({ registrationAddress: address, paymentAddress: address });
  };

  return (
    <div className="flex flex-col gap-8 p-4 bg-white rounded-lg relative after:absolute after:-z-[10] after:inset-0 after:content-[''] after:bg-[#ffffff87] after:backdrop-blur-sm after:translate-x-[-8px] after:translate-y-[8px] after:rounded-lg w-[450px]">
      <div className="flex flex-col text-[#2D2D2C]">
        <h3 className=" text-lg font-bold">Register as a Bounty Creator</h3>
      </div>

      <div
        className="flex flex-col gap-4"
        style={{
          display:  "flex" 
        }}
      >
        <Input
          type="text"
          label="Wallet Address"
          value={values.registrationAddress}
          onChange={(e) =>
            updateValues({ registrationAddress: e.target.value })
          }
        />
        <Input
          type="text"
          label="Payment Address"
          value={values.paymentAddress}
          onChange={(e) => updateValues({ paymentAddress: e.target.value })}
        />
      </div>
      <Button
          className="w-full max-w-[480px]"
          text={"Register as bounty creator"}
          handleClick={handleRegistration}
        />

      {/* {values.registrationAddress ? (
        <Button
          className="w-full max-w-[480px]"
          text={"Register as bounty creator"}
          handleClick={handleRegistration}
        />
      ) : (
        <Button
          className="w-full max-w-[480px]"
          text={"Connect wallet"}
          handleClick={handleWalletConnect}
        />
      )} */}
    </div>
  );
};

export default page;
