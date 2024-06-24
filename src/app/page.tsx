"use client";
import HeaderComp from "./Components/HeaderComp";
import ResumeWorkspace from "./Containers/ResumeWorkspace";
import { SectionsProvider } from "./Context/SectionsContext";

export default function Home() {
  return (
    <div>
      <SectionsProvider>
        <HeaderComp title="Resume Builder" />
        <ResumeWorkspace />
      </SectionsProvider>
    </div>
  );
}
