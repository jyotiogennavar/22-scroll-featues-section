import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const FeaturesSection = () => {
  return (
    <>
      <Wrapper>
        <span>Scroll Down</span>
      </Wrapper>
      <SwapColumnFeatures />
      <Wrapper>
        <span>Scroll Up</span>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 10rem;
  background-color: #000;
  color: #fff;

  span {
    font-size: 2rem;
  }
`;

const SwapColumnFeatures = () => {
  const [featureInView, setFeatureInView] = useState(features[0]);

  return (
    <Container>
      <SlidingFeatureDisplay featureInView={featureInView} />

      {/* Offsets the height of SlidingFeatureDisplay so that it renders on top of Content to start */}
      <FeaturesContainer />

      {features.map((s) => (
        <Content
          key={s.id}
          featureInView={s}
          setFeatureInView={setFeatureInView}
          {...s}
        />
      ))}
    </Container>
  );
};

const Container = styled.section`
  position: relative;
  margin: 0 auto;
  max-width: 82%;

  background-color:  rgba(255, 224, 218, 1) 47%;

  font-family: "Inter", sans-serif;
`;

const FeaturesContainer = styled.div`
  margin-top: -100vh;
  display: none;

  @media (min-width: 48rem) {
    display: block;
  }
`;

const SlidingFeatureDisplay = ({ featureInView }) => {
  return (
    <SlidingFeatureContainer 
    style={{
      justifyContent:
        featureInView.contentPosition === 
        "l" ? "flex-end" : "flex-start",
    }}
    contentPosition={featureInView.contentPosition}>
      <MotionContainer
        layout
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
      >
        <ExampleFeature featureInView={featureInView} />
      </MotionContainer>
    </SlidingFeatureContainer>
  );
};

const SlidingFeatureContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  display: none;
  height: 100vh;
  width: 100%;
  align-items: center;
  pointer-events: none;

  @media (min-width: 48rem) {
    display: flex;
  }
`;

const MotionContainer = styled(motion.div)`
  width: 60%;
  border-radius: 1rem;
  padding: 2rem;
`;

const Content = ({ setFeatureInView, featureInView }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "-150px",
  });

  useEffect(() => {
    if (isInView) {
      setFeatureInView(featureInView);
    }
  }, [isInView, setFeatureInView, featureInView]);

  return (
    <StyledSection contentPosition={featureInView.contentPosition} ref={ref}>
      <StyledGrid>
        <StyledMotionDiv
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <StyledTitle>{featureInView.title}</StyledTitle>
          <StyledDescription>{featureInView.description}</StyledDescription>
        </StyledMotionDiv>
        <StyledMotionBlock
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        ></StyledMotionBlock>
      </StyledGrid>
    </StyledSection>
  );
};

const StyledMotionBlock = styled(motion.div)`
  margin-top: 2rem;
  display: block;

  @media (min-width: 768px) {
    display: none;
  }
`;

const StyledSection = styled.section`
  position: relative;
  z-index: 0;
  display: flex;
  justify-content: ${({ contentPosition }) =>
    contentPosition === "l" ? "flex-start" : "flex-end"};

  @media (min-width: 48rem) {
    height: 100vh;
  }
`;

const StyledGrid = styled.div`
  display: grid;
  height: 100%;
  width: 100%;
  place-content: center;
  padding: 5rem;

  @media (min-width: 48rem) {
    width: 43%;
  }
`;

const StyledMotionDiv = styled(motion.div)`
  opacity: 0;
  transform: translateY(25px);
`;

const StyledTitle = styled.p`
 font-family: "Roboto Slab", serif;
  margin-top: 0.75rem;
  font-size: 3rem;
  font-weight: 700;
`;

const StyledDescription = styled.p`
  color: #718096;
`;

const ExampleFeature = ({ featureInView }) => {
  return <StyledDiv></StyledDiv>;
};

const StyledDiv = styled.div`
  position: relative;
  height: 24rem;
  width: 100%;
  border-radius: 1rem;
  background-image: url(https://images.pexels.com/photos/6767772/pexels-photo-6767772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1);
  background-size: cover;
  background-position: center;
  box-shadow: 0 0 24px 0 rgba(0, 0, 0, 0.1);
`;

const features = [
  {
    id: 1,
    title: "🌿 Natural",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor iusto quaerat qui",
    contentPosition: "r",
  },
  {
    id: 2,
    title: "✨ Effective",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor iusto quaerat qui",
    contentPosition: "l",
  },
  {
    id: 3,
    title: "🐰 Cruelty Free",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor iusto quaerat qui",
    contentPosition: "r",
  },
  {
    id: 4,
    title: "🌱 Vegan",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor iusto quaerat qui",
    contentPosition: "l",
  },
];
export default FeaturesSection;
