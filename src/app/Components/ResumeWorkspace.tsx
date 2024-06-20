//consider moving to containers folder if rendering lots of components
//consider removing outer container
//bg-green-500

import TestContent from "./TestContent";

const ResumeWorkspace = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="h-a4 w-a4 border-2 border-amber-500 relative">
        <TestContent color="bg-green-500" top="top-10" left="left-10" />
        <TestContent color="bg-red-600" top="top-60" left="left-80" />
      </div>
    </div>
  );
};

export default ResumeWorkspace;
