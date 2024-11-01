import { createClient } from "@/prismicio";
import React from "react";

export default async function Footer() {
  const client = createClient();
  const settings = await client.getSingle("settings");
  const footer = await client.getSingle("footer_navigation");
  return <div className="h-screen">Footer</div>;
}
