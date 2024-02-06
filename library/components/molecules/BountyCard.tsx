import Image from "next/image";
import Link from "next/link";

interface IBountyCard {
  avatarURL: string;
  name: string;
  title: string;
  poolFundId: number;
  active: boolean;
  bountySize: number;
  bountyToken: string;
}

const BountyCard = (prop: IBountyCard) => {
  return (
    <Link
      className="flex justify-between items-center p-4 bg-white rounded-md border-2 border-[#95B4FF] hover:border-[#E1C8FF] relative after:absolute after:-z-10 after:inset-0 after:content-[''] after:bg-[#4D4D4D] after:translate-x-[-8px] after:translate-y-[8px] after:rounded-md"
      href={`/pools/${prop.poolFundId}`}
    >
      <div className="flex gap-4">
        <Image
          src={prop.avatarURL ? prop.avatarURL : "/repo-default.svg"}
          alt={prop.title}
          width={64}
          height={64}
        />
        <div className=" flex flex-col">
          <p className="truncate max-w-[20ch]">{prop.title}</p>
          <p className=" text-sm text-[#767b82]">{prop.name}</p>
          <div className=" flex gap-8 items-center font-light">
            {/* {card.closing && (
              <p className=" text-xs text-[#767b82] border-r border-r-[#e4e5e6] pr-8">
                closing in {card.closing} days
              </p>
            )} */}
            {prop.active ? (
              <p className=" text-green-500 text-xs">open</p>
            ) : (
              <p className=" text-pink-600 text-xs">closed</p>
            )}
          </div>
        </div>
      </div>
      <p className="text-lg font-medium min">
        {prop.bountySize} {prop.bountyToken}{" "}
      </p>
    </Link>
  );
};

export default BountyCard;
