import axios from "axios";
import fs from "node:fs";
import type { Crate, Meta, GetCratesParams } from "./type";

const getCrates = async ({
  page,
  per_page,
  sort,
  user_id,
}: GetCratesParams) => {
  const url = `https://crates.io/api/v1/crates?page=${page}&per_page=${per_page}&sort=${sort}&user_id=${user_id}`;

  return await axios.get<{
    crates: Array<Crate>;
    meta: Meta;
  }>(url);
};

const getAllCrates = async (userId: number) => {
  const crateList: Crate[] = [];
  let page = 1;

  // Paginate through all crates for the user
  while (true) {
    const { data } = await getCrates({
      page,
      per_page: 10,
      sort: "alpha",
      user_id: userId,
    });

    const { crates, meta } = data;
    crateList.push(...crates);

    if (meta.next_page) {
      page = meta.next_page;
    } else {
      break;
    }
  }

  return crateList;
};

const buildCratesTable = (crates: Crate[]) => {
  const header =
    "|package|introduction|total downloads|commit activity|\n|---|---|---|---|";

  const rows = crates.map((crate) => {
    const baseUrl =
      crate.homepage ||
      (crate.repository
        ? crate.repository.replace(/\.git$/, "")
        : `https://crates.io/crates/${crate.name}`);

    let commitActivityBadge = "";
    try {
      const url = new URL(baseUrl);
      if (url.hostname === "github.com") {
        const [owner, repo] = url.pathname.replace(/^\/+/, "").split("/");
        if (owner && repo) {
          commitActivityBadge = `![GitHub commit activity](https://img.shields.io/github/commit-activity/m/${owner}/${repo})`;
        }
      }
    } catch {
      // ignore URL parse errors and leave commitActivityBadge empty
    }

    const downloadsBadge = `![](https://img.shields.io/crates/d/${crate.name})`;
    const intro = (crate.description || "").replace(/\r?\n/g, " ");

    return `|[@${crate.name}](${baseUrl})|${intro}|${downloadsBadge}|${commitActivityBadge}|`;
  });

  return [header, ...rows].join("\n");
};

const updateReadmeWithTable = (table: string) => {
  const readmePath = "README.md";
  const readme = fs.readFileSync(readmePath, "utf-8");

  const section = `<!--START_SECTION:crates-->\n\n${table}\n\n<!--END_SECTION:crates-->`;
  const updated = readme.replace(
    /<!--START_SECTION:crates-->[\s\S]*?<!--END_SECTION:crates-->/,
    section,
  );

  fs.writeFileSync(readmePath, updated);
};

const main = async () => {
  const crateList = await getAllCrates(335369);

  // Generate markdown table and update README
  const table = buildCratesTable(crateList);
  updateReadmeWithTable(table);

  // Also print to console for quick copy/paste if needed
  console.log(table);
};

main();
