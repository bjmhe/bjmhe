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
}

const getAllCrates = async () => {
    const crateList = [];
    let page = 1;
    while (true) {
        const { data } = await getCrates({
            page,
            per_page: 10,
            sort: "alpha",
            user_id: 335369,
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
}

const main = async () => {
    const crateList = await getAllCrates();
    console.log(crateList);
    fs.writeFileSync("crates.json", JSON.stringify(crateList, null, 2));
}

main();
