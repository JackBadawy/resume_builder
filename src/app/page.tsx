"use client";
import HeaderComp from "./Components/HeaderComp";
import ResumeWorkspace from "./Containers/ResumeWorkspace";
import Providers from "./Context/Providers";

export default function Home() {
  return (
    <Providers>
      <HeaderComp
        acronym="FFF"
        subheading="Recruitment"
        fullAcronymName="Fake Fake Fake"
      />
      <ResumeWorkspace />
    </Providers>
  );
}
