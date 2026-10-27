import TeamMembers from "@/components/helpers/TeamMembers";
import { prevOfficers } from "@/utils";
import React from "react";

const page = () => {
  return (
    <main className="py-24">
      <h1 className="px-4 md:px-20 text-3xl md:text-5xl text-secondary-blue font-semibold text-center">
        Previous Officers
      </h1>

      <div>
        {prevOfficers.map(({ year, officers }) => (
          <div key={year}>
            <TeamMembers title={year} members={officers} />
          </div>
        ))}
      </div>
    </main>
  );
};

export default page;
