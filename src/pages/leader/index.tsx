import { useState } from "react";
import Layout from "../common/Layout";
import LeaderBoard from "../components/LeaderBoard";

export default function Leader() {
  return (
    <Layout>
      <section className="flex flex-col w-full items-center">
        <article className="mt-10 flex flex-col w-full items-center">
          <LeaderBoard />
        </article>
      </section>
    </Layout>
  );
}
