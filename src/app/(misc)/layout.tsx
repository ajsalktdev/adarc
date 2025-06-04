"use client"
import Wrapper from "@/components/includes/Wrapper";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const pathname = usePathname()
    const formattedTitle = pathname
        ? decodeURIComponent(pathname.replace(/\//g, " ").replace(/-/g, " ").trim())
        : "";

    // Capitalize the first letter of each word in the formattedTitle
    const capitalizedTitle = formattedTitle
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    return (
        <div>
            <Wrapper className="max-sm:pt-[150px]">
                <div className="w-full h-[72px] bg-[#FFF9EBE5] relative overflow-hidden mb-4 rounded-[6px] px-6 flex justify-start items-center">
                    <h2 className="rubik_medium text-[24px] z-10">{capitalizedTitle}</h2>
                    <div className="absolute right-[-200px] top-1/2 transform -translate-y-1/2 flex justify-center items-center">
                        <div className="w-[360px] h-[360px] rounded-full z-[1] bg-[#FFF3D7] flex justify-center items-center">
                            <div className="w-[280px] h-[280px] rounded-full bg-[#FFEDC2] z-[2] flex justify-center items-center">
                                <div className="w-[200px] h-[200px] rounded-full bg-[#FFE099] z-[3]"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <section>
                    {children}
                </section>
            </Wrapper>
        </div>
    );
}
