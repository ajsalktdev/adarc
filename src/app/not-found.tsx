import Wrapper from "@/components/includes/Wrapper";
import NotFoundComponent from "@/components/error-pages/NotFoundComponent";

export default function NotFound() {
	return (
		<div>
			<Wrapper className="h-[90vh] flex justify-center">
				<NotFoundComponent />
			</Wrapper>
		</div>
	);
}
