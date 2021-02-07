export interface IList<T> {
    total_count: number;
    incomplete_results: boolean;
    items: T[];
}

export interface IGitHubRepo {
    id: number;
    name: string;
    stargazers_count: number;
}
