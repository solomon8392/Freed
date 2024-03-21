



export default function WalletPage () {
    return(
        <div>
            <div>
                <h1 className="text-[#6A0572] text-[28px] font-sans font-bold">Your Wallet</h1>
            </div>
            <div>
                <h1 className="text-[#333333] text-[28px] font-sans font-bold">All Transaction Details</h1>
                <div>
                <div className="h-1 w-[30%] top-6 border-gray-300 bg-[gray]  relative " />
                <div className="flex justify-around border-b border-[#6A0572] relative">
                    <h1 className="text-[16px] text-[#6A0572] font-sans font-medium">Details</h1>
                    <h1 className="text-[16px] text-[#333333] font-sans font-normal">Sent</h1>
                    <h1 className="text-[16px] text-[#333333] font-sans font-normal">Recived</h1>
                    <h1 className="text-[16px] text-[#333333] font-sans font-semibold">Chain</h1>
                </div>
                </div>
            </div>
        </div>
    )
}