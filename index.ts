import axios from "axios";
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

const main = async () => {
    const { data } = await getCrates({
        page: 1,
        per_page: 10,
        sort: "alpha",
        user_id: 335369,
      });
    console.log(data);
}

main();
