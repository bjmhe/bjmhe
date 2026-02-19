import axios from "axios";
import type { Crate, Meta } from "./type";

const getCrates = async () => {
    return await axios.get<{
        crates: Array<Crate>,
        meta: Meta
    }>(
        "https://crates.io/api/v1/crates?page=1&per_page=10&sort=alpha&user_id=335369",
        // {
        //     data: {
        //         page: 1,
        //         per_page: 10,
        //         sort: "alpha",
        //         user_id: 335369
        //     }
        // }
    )
}

const main = async () => {
    const { data } = await getCrates();
    console.log(data);
}

main();
