import BountyCard from "../molecules/BountyCard";

const AllBounties = () => {
  const data = [
    {
      avatarURL: "",
      name: "Dreampiper",
      title: "Test",
      poolFundId: 1,
      active: false,
      bountySize: 1,
      bountyToken: "Sol"
    },
    {
      avatarURL: "",
      name: "Dreampiper",
      title: "Test",
      poolFundId: 1,
      active: false,
      bountySize: 1,
      bountyToken: "Sol"
    },
    {
      avatarURL: "",
      name: "Dreampiper",
      title: "Test",
      poolFundId: 1,
      active: false,
      bountySize: 1,
      bountyToken: "Sol"
    },
    {
      avatarURL: "",
      name: "Dreampiper",
      title: "Test",
      poolFundId: 1,
      active: false,
      bountySize: 1,
      bountyToken: "Sol"
    },
    {
      avatarURL: "",
      name: "Dreampiper",
      title: "Test",
      poolFundId: 1,
      active: false,
      bountySize: 1,
      bountyToken: "Sol"
    },
  ];
  return (
    <div className=" flex-1 h-full border-r border-r-[#e4e5e6] pr-4">
      <p className=" font-medium border-b py-4 border-b-[#e4e5e6]">
        All Bounties!
      </p>
      <div className="flex flex-col gap-4 mx-auto p-4 w-[800px]">
        {data.map((prop, i) => (
          <BountyCard key={i} {...prop} />
        ))}
      </div>
    </div>
  );
};

export default AllBounties;
