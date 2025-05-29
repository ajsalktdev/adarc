import Wrapper from "@/components/includes/Wrapper"
import SideBar from "./_components/SideBar"
import TopNavigation from "./_components/TopNavigation"

export default function MyAcountLayout({
    children,
}: {
    children: React.ReactNode
}) {
    
    return (
        <Wrapper className="pr-0 max-sm:pt-[140px]">
            <div className='flex w-full   '>
                <div className="w-[20%] max-lg:w-[22%] max-[850px]:w-auto z-30 top-[170px] h-full mb-5 sticky ">
                    <SideBar />
                </div>
                <div className="flex-1 ">
                    <TopNavigation/>
                    {children}
                </div>
            </div>
        </Wrapper>

    )
}