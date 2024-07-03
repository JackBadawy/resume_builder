"use client";
import HeaderComp from "./Components/HeaderComp";
import ResumeWorkspace from "./Containers/ResumeWorkspace";
import Providers from "./Context/Providers";

export default function Home() {
  return (
    <Providers>
      <HeaderComp title="Resume Builder" />
      <ResumeWorkspace />
    </Providers>
  );
}
