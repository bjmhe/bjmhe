export interface Crate {
    id: string,
    name: string,
    updated_at: string,
    versions: null,
    keywords: null,
    categories: null,
    badges: string[],
    created_at: string,
    downloads: number,
    recent_downloads: number,
    default_version: string,
    num_versions: number,
    yanked: boolean,
    max_version: string,
    newest_version: string,
    max_stable_version: string,
    description: string,
    homepage: string,
    documentation: null,
    repository: string,
    links: {
        version_downloads: string,
        versions: string,
        owners: string,
        owner_team: string,
        owner_user: string,
        reverse_dependencies: string
    },
    exact_match: boolean,
    trustpub_only: boolean
}

export interface Meta {
    total: number,
    next_page: null,
    prev_page: null
}