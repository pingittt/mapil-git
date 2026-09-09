import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Container from "@/components/ui/Container";
import MemberConfirmation from "./MemberConfirmation";

export default function JoinMemberConfirmationPage() {
  return (
    <>
      <Navbar />
      <main id="top">
        <section className="relative overflow-hidden pt-24 pb-20 md:pt-28 md:pb-28">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <MemberConfirmation />
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
