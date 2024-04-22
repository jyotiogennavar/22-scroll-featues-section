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
      <FeaturesContainer/>

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
  max-width: 80%;

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
    <SlidingFeatureContainer>
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
  justify-content: ${({ contentPosition }) =>
    contentPosition === "l" ? "flex-end" : "flex-start"};

  @media (min-width: 48rem) {
    display: flex;
  }
  `;


const MotionContainer = styled(motion.div)`
  display: flex;
  height: fit-content;
  width: 60%;
  border-radius: 1rem;
  padding: 2rem;
`;

const Content = ({ setFeatureInView, featureInView }) => {

  const ref = useRef(null);
  const isInView = useInView(ref, {
    rootMargin: "-150px 0px",
  });

  useEffect(() => {
    if (isInView) {
      setFeatureInView(featureInView);
    }
  }, [isInView]);

  return (
    <StyledSection contentPosition={featureInView.contentPosition} ref={ref}>
    <StyledGrid>
      <StyledMotionDiv
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <StyledSpan>{featureInView.callout}</StyledSpan>
        <StyledTitle>{featureInView.title}</StyledTitle>
        <StyledDescription>{featureInView.description}</StyledDescription>
      </StyledMotionDiv>
      <StyledMotionDiv
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="mt-8 block md:hidden"
      >
        <ExampleFeature featureInView={featureInView} />
      </StyledMotionDiv>
    </StyledGrid>
  </StyledSection>
  )
}

const StyledSection = styled.section`
  position: relative;
  z-index: 0;
  display: flex;
  justify-content: ${({ contentPosition }) =>
    contentPosition === "l" ? "flex-start" : "flex-end"};
  height: fit-content;
  
  @media (min-width: 48rem) {
    height: 100vh;
  }
`;

const StyledGrid = styled.div`
  display: grid;
  height: 100%;
  width: 100%;
  place-content: center;
  padding: 4rem; 
  
  @media (min-width: 48rem) {
    width: 40%; 
    padding: 4rem 8rem; 
  }
`;

const StyledMotionDiv = styled(motion.div)`
  opacity: 0;
  transform: translateY(25px);
`;

const StyledSpan = styled.span`
  border-radius: 9999px;
  background-color: #4f46e5; 
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: #fff; 
`;

const StyledTitle = styled.p`
  margin-top: 0.75rem;
  font-size: 3rem;
  font-weight: 700; 
`;

const StyledDescription = styled.p`
  color: #718096;
`;

const ExampleFeature = ({ featureInView }) => {
  return (
    <StyledDiv>
    <StyledFlex>
      <StyledCircle style={{ backgroundColor: '#f56565' }} /> 
      <StyledCircle style={{ backgroundColor: '#f6e05e' }} /> 
      <StyledCircle style={{ backgroundColor: '#48bb78' }} /> 
    </StyledFlex>
    <div style={{ padding: '0.5rem' }}> 
      <StyledP>
        <StyledSpanOne>~</StyledSpanOne> Show a part of your product that explains what
        <StyledInlineBlock>"{featureInView.title}"</StyledInlineBlock> means.
      </StyledP>
    </div>
  </StyledDiv>
  )
}

const StyledDiv = styled.div`
  position: relative;
  height: 24rem; 
  width: 100%;
  border-radius: 1rem;
  background-color: #4a5568; 
  box-shadow: 0 0 24px 0 rgba(0,0,0,0.1); 
`;

const StyledFlex = styled.div`
  display: flex;
  width: 100%;
  gap: 0.375rem; 
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem; 
  background-color: #2d3748; 
  padding: 0.75rem;
`;

const StyledCircle = styled.div`
  height: 0.75rem; 
  width: 0.75rem; 
  border-radius: 50%;
`;

const StyledP = styled.p`
  font-family: monospace; 
  font-size: 0.875rem; 
  color: #a0aec0; 
`;

const StyledSpanOne = styled.span`
  color: #48bb78; 
`;

const StyledInlineBlock = styled.span`
  display: inline-block;
  border-radius: 0.25rem; 
  background-color: #6b46c1;
  padding: 0.25rem 0.5rem;
  font-weight: 600; 
`;


const features = [
  {
    id: 1,
    callout: "Get noticed",
    title: "It's simple",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor iusto quaerat qui, illo incidunt suscipit fugiat distinctio officia earum eius quae officiis quis harum animi.",
    contentPosition: "r",
  },
  {
    id: 2,
    callout: "Find people",
    title: "They're all here",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor iusto quaerat qui, illo incidunt suscipit fugiat distinctio officia earum eius quae officiis quis harum animi.",
    contentPosition: "l",
  },
  {
    id: 3,
    callout: "Have fun",
    title: "Let's party",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor iusto quaerat qui, illo incidunt suscipit fugiat distinctio officia earum eius quae officiis quis harum animi.",
    contentPosition: "r",
  },
  {
    id: 4,
    callout: "Get paid",
    title: "Cha-ching!",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor iusto quaerat qui, illo incidunt suscipit fugiat distinctio officia earum eius quae officiis quis harum animi.",
    contentPosition: "l",
  },
];
export default FeaturesSection;
