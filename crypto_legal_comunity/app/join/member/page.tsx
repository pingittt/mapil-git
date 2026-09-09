import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionMark from "@/components/ui/SectionMark";
import MemberForm from "./MemberForm";

export default function JoinMemberPage() {
  return (
    <>
      <Navbar />
      <main id="top">
        <section className="relative overflow-hidden pt-24 pb-20 md:pt-28 md:pb-28">
          <Container>
            <div className="mx-auto max-w-2xl">
              <Reveal>
                <SectionMark clause="Ps. 09" label="Join sebagai Member" />
              </Reveal>

              <Reveal delay={0.1}>
                <h1 className="font-display mt-8 text-3xl leading-[1.1] tracking-tight text-paper sm:text-5xl">
                  Join sebagai Member
                </h1>
              </Reveal>

              <Reveal delay={0.18}>
                <p className="mt-5 text-balance-pretty text-[15px] leading-relaxed text-mute sm:text-base">
                  Daftarkan diri kamu untuk menjadi bagian dari komunitas kami.
                </p>
              </Reveal>

              <Reveal delay={0.25} className="mt-12">
                <div className="border border-surface-2 bg-surface/40 p-6 sm:p-8">
                  <MemberForm />
                </div>
              </Reveal>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
