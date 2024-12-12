import ComoFuncionaHero from "../components/shared/ComoFuncionaHero";
import Faq from "../components/shared/Faq";

const ComoFunciona = () => {
  return (
    <div className="grid-container-home">
      <section className="comofunciona">
        <ComoFuncionaHero />
        <Faq/>
      </section>
    </div>
  );
};

export default ComoFunciona;
